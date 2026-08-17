#!/usr/bin/env python3
"""Preprocess the two source references into page, media, and text assets.

Run from any directory. Outputs are rebuilt only inside
references/transformer/ and references/image-generation/; source files are
never modified.
"""

from __future__ import annotations

import argparse
import hashlib
import os
import re
import shutil
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path, PurePosixPath


ROOT = Path(__file__).resolve().parents[1]
REFERENCES = ROOT / "references"
PPTX = REFERENCES / "Transformer.pptx"
IMAGE_PDF = REFERENCES / "AI生图范式演进与里程碑论文解读｜从VAE、GAN到 Diffusion、自回归.pdf"
TRANSFORMER = REFERENCES / "transformer"
IMAGE_GENERATION = REFERENCES / "image-generation"

NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "pr": "http://schemas.openxmlformats.org/package/2006/relationships",
}


def fail(message: str) -> "NoReturn":
    raise SystemExit(f"error: {message}")


def run(command: list[str], *, cwd: Path | None = None, env: dict[str, str] | None = None) -> str:
    printable = " ".join(command)
    print(f"+ {printable}")
    result = subprocess.run(
        command,
        cwd=cwd,
        env=env,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    if result.returncode:
        detail = "\n".join(part for part in (result.stdout.strip(), result.stderr.strip()) if part)
        fail(f"command failed ({result.returncode}): {printable}\n{detail}")
    if result.stderr.strip():
        print(result.stderr.strip(), file=sys.stderr)
    return result.stdout


def require_tools() -> None:
    required = ("unzip", "libreoffice", "pdfinfo", "pdftotext", "pdftoppm", "pdfimages")
    missing = [tool for tool in required if shutil.which(tool) is None]
    if missing:
        fail(
            "missing required commands: "
            + ", ".join(missing)
            + ". On Debian/Ubuntu, install LibreOffice and poppler-utils as needed."
        )


def ensure_sources() -> None:
    missing = [str(path.relative_to(ROOT)) for path in (PPTX, IMAGE_PDF) if not path.is_file()]
    if missing:
        fail("missing source file(s): " + ", ".join(missing))


def reset_dir(path: Path) -> None:
    expected_parent = REFERENCES.resolve()
    resolved = path.resolve()
    if expected_parent not in resolved.parents:
        fail(f"refusing to rebuild output outside references/: {path}")
    if path.exists():
        shutil.rmtree(path)
    path.mkdir(parents=True)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def natural_number(path: Path) -> int:
    match = re.search(r"(\d+)$", path.stem)
    if not match:
        fail(f"cannot determine page number from {path}")
    return int(match.group(1))


def ppt_slide_paths(raw: Path) -> list[Path]:
    slides = list((raw / "ppt" / "slides").glob("slide[0-9]*.xml"))
    return sorted(slides, key=natural_number)


def shape_position(element: ET.Element) -> tuple[int, int]:
    off = element.find(".//a:xfrm/a:off", NS)
    if off is None:
        off = element.find(".//p:xfrm/a:off", NS)
    if off is None:
        return (10**18, 10**18)
    return (int(off.attrib.get("y", 10**18)), int(off.attrib.get("x", 10**18)))


def extract_slide_text(slide_xml: Path) -> tuple[str | None, list[str]]:
    root = ET.parse(slide_xml).getroot()
    tree = root.find(".//p:cSld/p:spTree", NS)
    if tree is None:
        return None, []

    blocks: list[tuple[bool, tuple[int, int], list[str]]] = []
    for element in list(tree):
        paragraphs: list[str] = []
        for paragraph in element.findall(".//a:p", NS):
            text = "".join(node.text or "" for node in paragraph.findall(".//a:t", NS)).strip()
            if text:
                paragraphs.append(text)
        if not paragraphs:
            continue
        placeholder = element.find(".//p:nvPr/p:ph", NS)
        placeholder_type = placeholder.attrib.get("type", "") if placeholder is not None else ""
        is_title = placeholder_type in {"title", "ctrTitle"}
        blocks.append((is_title, shape_position(element), paragraphs))

    blocks.sort(key=lambda item: (not item[0], item[1][0], item[1][1]))
    title: str | None = None
    body: list[str] = []
    for is_title, _position, paragraphs in blocks:
        if is_title and title is None:
            title = " ".join(paragraphs)
        else:
            body.extend(paragraphs)
    if title is None and body:
        title = body.pop(0)
    return title, body


def write_slide_text(slides: list[Path], destination: Path) -> None:
    merged: list[str] = ["# Transformer PPTX 逐页提取文字", ""]
    for slide in slides:
        number = natural_number(slide)
        title, body = extract_slide_text(slide)
        lines = [f"# Slide {number:03d}", ""]
        if title:
            lines.extend([f"## {title}", ""])
        if body:
            lines.extend(body)
        else:
            lines.append("_本页未提取到正文文字；请以完整页面 PNG 为权威视觉参考。_")
        lines.append("")
        content = "\n\n".join(line for line in lines if line != "") + "\n"
        (destination / f"slide-{number:03d}.md").write_text(content, encoding="utf-8")
        merged.extend([content.rstrip(), "", "---", ""])
    (destination / "all-slides.md").write_text("\n".join(merged).rstrip() + "\n", encoding="utf-8")


def copy_ppt_media(raw: Path, destination: Path) -> list[Path]:
    source = raw / "ppt" / "media"
    copied: list[Path] = []
    if source.is_dir():
        for path in sorted(source.iterdir(), key=lambda item: item.name):
            if path.is_file():
                target = destination / path.name
                shutil.copy2(path, target)
                copied.append(target)
    return copied


def slide_media_map(slides: list[Path], raw: Path) -> dict[int, list[str]]:
    mapping: dict[int, list[str]] = {}
    for slide in slides:
        number = natural_number(slide)
        rels = slide.parent / "_rels" / f"{slide.name}.rels"
        names: set[str] = set()
        if rels.is_file():
            for relationship in ET.parse(rels).getroot().findall("pr:Relationship", NS):
                target = relationship.attrib.get("Target", "")
                if "../media/" in target:
                    names.add(PurePosixPath(target).name)
        mapping[number] = sorted(names)
    return mapping


def write_media_map(mapping: dict[int, list[str]], destination: Path) -> None:
    lines = [
        "# Transformer slide → media 映射",
        "",
        "此映射来自 PPTX slide relationship XML，仅表示页面直接引用的 `ppt/media` 文件。",
        "由形状、文字或主题资源构成的视觉不会出现在这里。",
        "",
    ]
    for number in sorted(mapping):
        media = mapping[number]
        rendered = ", ".join(f"`media/{name}`" for name in media) if media else "无直接引用的媒体文件"
        lines.extend([f"- Slide {number:03d}: {rendered}", ""])
    destination.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def write_pdf_media_map(pdf: Path, media: Path, destination: Path, page_count: int) -> None:
    """Record the page for each file emitted by ``pdfimages -all``."""
    listing = run(["pdfimages", "-list", str(pdf)])
    mapping: dict[int, list[str]] = {number: [] for number in range(1, page_count + 1)}
    for line in listing.splitlines():
        fields = line.split()
        if len(fields) < 5 or not fields[0].isdigit() or not fields[1].isdigit():
            continue
        page = int(fields[0])
        image_number = int(fields[1])
        candidates = sorted(media.glob(f"image-{image_number:03d}.*"))
        if len(candidates) != 1:
            fail(
                f"could not map pdfimages entry {image_number} on page {page}: "
                f"found {len(candidates)} extracted files"
            )
        kind = fields[2]
        width, height = fields[3], fields[4]
        mapping[page].append(
            f"`media/{candidates[0].name}` ({kind}, {width}×{height})"
        )

    lines = [
        "# AI 生图 PDF page → media 映射",
        "",
        "此映射由 `pdfimages -list` 与 `pdfimages -all` 的编号对应关系生成。",
        "内嵌图可能只是完整图的一部分、遮罩或页面组合元素；完整页面 PNG 仍是权威视觉参考。",
        "",
    ]
    for number in range(1, page_count + 1):
        assets = mapping[number]
        rendered = ", ".join(assets) if assets else "无独立提取的内嵌位图"
        lines.extend([f"- Page {number:03d}: {rendered}", ""])
    destination.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def render_pdf(pdf: Path, destination: Path, prefix: str, dpi: int) -> int:
    with tempfile.TemporaryDirectory(prefix="reference-pages-") as temp_name:
        temp = Path(temp_name)
        run(["pdftoppm", "-png", "-r", str(dpi), str(pdf), str(temp / prefix)])
        generated = sorted(temp.glob(f"{prefix}-*.png"), key=natural_number)
        for index, source in enumerate(generated, start=1):
            shutil.move(str(source), destination / f"{prefix}-{index:03d}.png")
    return len(generated)


def pdf_page_count(pdf: Path) -> int:
    info = run(["pdfinfo", str(pdf)])
    match = re.search(r"^Pages:\s+(\d+)\s*$", info, re.MULTILINE)
    if not match:
        fail(f"could not read page count from {pdf}")
    return int(match.group(1))


def write_pdf_text(pdf: Path, destination: Path, page_count: int) -> None:
    merged = ["# AI 生图 PDF 逐页提取文字", ""]
    with tempfile.TemporaryDirectory(prefix="reference-text-") as temp_name:
        temp = Path(temp_name)
        for number in range(1, page_count + 1):
            output = temp / f"page-{number:03d}.txt"
            run(["pdftotext", "-f", str(number), "-l", str(number), "-layout", str(pdf), str(output)])
            raw_text = output.read_text(encoding="utf-8", errors="replace").replace("\f", "")
            lines = [line.rstrip() for line in raw_text.splitlines()]
            while lines and not lines[0].strip():
                lines.pop(0)
            while lines and not lines[-1].strip():
                lines.pop()
            body = "\n".join(lines).strip()
            if not body:
                body = "_本页未从 PDF 文本层提取到文字；请以完整页面 PNG 为权威视觉参考。_"
            content = f"# Page {number:03d}\n\n```text\n{body}\n```\n"
            (destination / f"page-{number:03d}.md").write_text(content, encoding="utf-8")
            merged.extend([content.rstrip(), "", "---", ""])
    (destination / "all-pages.md").write_text("\n".join(merged).rstrip() + "\n", encoding="utf-8")


def write_metadata() -> None:
    transformer_metadata = TRANSFORMER / "source-metadata.md"
    transformer_metadata.write_text(
        "# Transformer.pptx source metadata\n\n"
        f"- Source: `../Transformer.pptx`\n"
        f"- SHA-256: `{sha256(PPTX)}`\n"
        f"- Slides: {len(ppt_slide_paths(TRANSFORMER / 'raw'))}\n",
        encoding="utf-8",
    )
    info = run(["pdfinfo", str(IMAGE_PDF)])
    (IMAGE_GENERATION / "pdfinfo.txt").write_text(info, encoding="utf-8")
    (IMAGE_GENERATION / "source-metadata.md").write_text(
        "# AI 生图 PDF source metadata\n\n"
        f"- Source: `../{IMAGE_PDF.name}`\n"
        f"- SHA-256: `{sha256(IMAGE_PDF)}`\n"
        "- Full `pdfinfo` output: [`pdfinfo.txt`](pdfinfo.txt)\n",
        encoding="utf-8",
    )


def preprocess_transformer(dpi: int) -> tuple[int, int, int]:
    raw = TRANSFORMER / "raw"
    media = TRANSFORMER / "media"
    text = TRANSFORMER / "text"
    pages = TRANSFORMER / "pages"
    intermediate = TRANSFORMER / "intermediate"
    for path in (raw, media, text, pages, intermediate):
        reset_dir(path)

    with zipfile.ZipFile(PPTX) as archive:
        archive.extractall(raw)
    slides = ppt_slide_paths(raw)
    if not slides:
        fail("no slides found after extracting Transformer.pptx")
    copied_media = copy_ppt_media(raw, media)
    write_slide_text(slides, text)
    write_media_map(slide_media_map(slides, raw), TRANSFORMER / "slide-media-map.md")

    with tempfile.TemporaryDirectory(prefix="libreoffice-profile-") as profile_name:
        profile_root = Path(profile_name).resolve()
        profile_uri = (profile_root / "user").as_uri()
        runtime = profile_root / "runtime"
        config = profile_root / "config"
        cache = profile_root / "cache"
        for directory in (runtime, config, cache):
            directory.mkdir()
        runtime.chmod(0o700)
        office_env = os.environ.copy()
        office_env.update(
            {
                "XDG_RUNTIME_DIR": str(runtime),
                "XDG_CONFIG_HOME": str(config),
                "XDG_CACHE_HOME": str(cache),
                "SAL_USE_VCLPLUGIN": "svp",
            }
        )
        run(
            [
                "libreoffice",
                "--headless",
                f"-env:UserInstallation={profile_uri}",
                "--convert-to",
                "pdf",
                "--outdir",
                str(intermediate),
                str(PPTX),
            ],
            env=office_env,
        )
    rendered_pdf = intermediate / "Transformer.pdf"
    if not rendered_pdf.is_file():
        fail("LibreOffice did not create references/transformer/intermediate/Transformer.pdf")
    pdf_slides = pdf_page_count(rendered_pdf)
    if pdf_slides != len(slides):
        fail(f"PPTX XML has {len(slides)} slides, but rendered PDF has {pdf_slides} pages")
    rendered = render_pdf(rendered_pdf, pages, "slide", dpi)
    return len(slides), len(copied_media), rendered


def preprocess_image_generation(dpi: int) -> tuple[int, int, int]:
    media = IMAGE_GENERATION / "media"
    text = IMAGE_GENERATION / "text"
    pages = IMAGE_GENERATION / "pages"
    for path in (media, text, pages):
        reset_dir(path)

    count = pdf_page_count(IMAGE_PDF)
    write_pdf_text(IMAGE_PDF, text, count)
    rendered = render_pdf(IMAGE_PDF, pages, "page", dpi)
    run(["pdfimages", "-all", str(IMAGE_PDF), str(media / "image")])
    media_count = sum(1 for path in media.iterdir() if path.is_file())
    write_pdf_media_map(
        IMAGE_PDF,
        media,
        IMAGE_GENERATION / "page-media-map.md",
        count,
    )
    return count, media_count, rendered


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dpi", type=int, default=180, help="PNG rendering resolution (default: 180)")
    args = parser.parse_args()
    if args.dpi < 120:
        fail("DPI must be at least 120 so page text remains inspectable")

    require_tools()
    ensure_sources()
    TRANSFORMER.mkdir(parents=True, exist_ok=True)
    IMAGE_GENERATION.mkdir(parents=True, exist_ok=True)
    transformer = preprocess_transformer(args.dpi)
    image_generation = preprocess_image_generation(args.dpi)
    write_metadata()
    print(
        "done: "
        f"Transformer slides={transformer[0]}, media={transformer[1]}, PNG={transformer[2]}; "
        f"image-generation pages={image_generation[0]}, media={image_generation[1]}, PNG={image_generation[2]}"
    )


if __name__ == "__main__":
    main()
