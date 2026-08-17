# 参考资料库使用说明

本目录保存项目的两份原始参考资料及 Phase 1 生成的结构化预处理产物。

## 原始资料

- `Transformer.pptx`：19 页 Transformer 讲解 PPT，重点覆盖 FNN / RNN、Encoder–Decoder、Attention 的动机，以及向 Self-Attention / Transformer 的过渡。
- `AI生图范式演进与里程碑论文解读｜从VAE、GAN到 Diffusion、自回归.pdf`：47 页中文长文式 PDF，覆盖 VAE、GAN、ViT、CLIP、DDPM、GLIDE、LDM / Stable Diffusion、DALL·E 2、DiT、PixelCNN、VQ-VAE / VQGAN、DALL·E 1、VAR、LlamaGen 与部分厂商路线。

原始 PPTX 和 PDF 未被修改。`source-metadata.md` 中记录了源文件 SHA-256，便于复核完整性。

## Phase 1 产物

```text
references/
├── Transformer.pptx
├── AI生图范式演进与里程碑论文解读｜从VAE、GAN到 Diffusion、自回归.pdf
├── transformer/
│   ├── pages/                 # 19 张完整页面 PNG
│   ├── media/                 # PPTX 中的 6 个原始媒体文件
│   ├── text/                  # 19 个逐页 Markdown + all-slides.md
│   ├── raw/                   # PPTX ZIP 的完整解压结构
│   ├── intermediate/          # LibreOffice 生成的中间 PDF
│   ├── slide-media-map.md     # slide → 原始媒体关系
│   ├── source-metadata.md
│   └── reference-index.md     # 19 页人工语义索引
└── image-generation/
    ├── pages/                 # 47 张完整页面 PNG
    ├── media/                 # pdfimages 提取的 34 个内嵌文件
    ├── text/                  # 47 个逐页 Markdown + all-pages.md
    ├── page-media-map.md      # page → 内嵌媒体关系
    ├── pdfinfo.txt            # 完整 PDF 元数据
    ├── source-metadata.md
    └── reference-index.md     # 47 页人工语义索引
```

各目录用途：

- `pages/`：页面的完整静态视觉，是判断布局、公式、图文关系和复合图的权威参考。
- `media/`：尽量保留原始格式和清晰度的独立位图，适合裁切、重排或作为重绘依据。
- `text/`：按页提取的可检索文字；用于搜索概念、论文名和讲解表述，不能替代页面视觉。
- `raw/`：PPTX 的完整 ZIP 内容，包括 `ppt/slides/`、关系文件、主题、布局和原始媒体；用于追踪页面对象与素材来源。
- `intermediate/`：可重复生成的中间产物，不是新的内容来源。

## 后续 Agent 的推荐查找流程

在设计任何具体 Slide 前，应先查询对应的 `reference-index.md`，再查看索引指向的完整页面和媒体素材，不要仅凭模型自身知识重新生成内容。

建议按以下顺序工作：

1. 在 `transformer/reference-index.md` 或 `image-generation/reference-index.md` 中搜索大纲页号、概念或模型名。
2. 打开该条目列出的 `pages/*.png`，确认完整页面的上下文和视觉结构。
3. 需要高质量原图时，再打开条目列出的 `media/*`，并用 `slide-media-map.md` 或 `page-media-map.md` 复核来源页。
4. 同时阅读对应的 `text/*.md`，获取完整文字、论文名和页面中被动画/图像遮挡的文本。
5. 对索引 `备注` 中标出的过时、过度简化或未公开架构推断进行技术校正；不确定时回查论文或官方一手资料。
6. 最后再结合模型知识补充，并明确区分参考原图、自行重绘示意图和外部资料。

例如，实现大纲第 20 页 Cross-Attention 时，可先在 AI 生图索引定位 Page 20、23、24，再看 `pages/page-023.png` 的完整 LDM 结构与 `media/image-019.png` 原图，而不是只根据文本重画 Q/K/V。

## 为什么完整页面 PNG 是权威视觉参考

PPT/PDF 的完整页面可能由多个位图、矢量对象、公式、文字、透明遮罩和布局共同构成。`pdfimages` 提取出的单个文件可能只是遮罩或复合图的一部分；PPTX 的某些图也由形状而不是 `ppt/media` 组成。因此：

- 判断一张图表达什么、文字属于哪个结构、元素如何组合时，先看 `pages/`。
- 需要清晰裁切、去除原页面排版或重新组合时，再优先使用 `media/` 原图。
- 若 `media/` 不是完整图，以页面 PNG 为准，必要时基于论文官方图重新获取或准确重绘。

Transformer PPT 使用了分步动画。LibreOffice 静态导出可能只呈现某个构建状态：Slide 009、016 的 PNG 信息尤其少，Slide 001 也有动画对象叠合。索引已标注这些页面；应结合逐页文字、相邻页面和原始 PPTX 阅读。

## 文本提取质量

- Transformer：文字直接解析 PPTX XML，按标题优先、再按对象纵向/横向位置近似排序。逐页文件齐全，但动画出现顺序、SmartArt 内部语义和复杂组合对象不一定能由 XML 坐标完全恢复。
- AI 生图 PDF：优先使用 PDF 自带文本层并开启 `-layout`，中文可检索且未使用 OCR。原文存在少量零宽字符、自动换行和分栏阅读顺序问题；公式、图中文字和矢量内容可能不进入文本层。
- 任何提取文字与页面图冲突时，以完整页面 PNG 和原始文件为准；不要为了“补齐”而凭空改写原文。

## 重新生成

预处理脚本为 `../scripts/preprocess_references.py`。它使用项目相对路径，只重建两个生成目录内部的产物，不修改原始 PPTX / PDF，重复执行会得到相同命名结构。

```bash
python3 scripts/preprocess_references.py
```

默认以 180 DPI 渲染；可用 `--dpi` 调整，但脚本拒绝低于 120 DPI：

```bash
python3 scripts/preprocess_references.py --dpi 180
```

所需命令：`unzip`、`libreoffice`、`pdfinfo`、`pdftotext`、`pdftoppm`、`pdfimages`。后四项通常来自 `poppler-utils`。Debian / Ubuntu 的最小安装思路是仅补缺失包：

```bash
sudo apt-get install unzip libreoffice poppler-utils
```

脚本只使用 Python 标准库。LibreOffice 会使用隔离的临时用户配置目录，避免污染本机配置。

## 当前覆盖边界

- Transformer 资料没有提供足够的 Position Encoding / RoPE、标准 Q/K/V、Multi-Head、BERT/GPT 三路线等视觉素材。
- AI 生图资料没有实质讲解 Flow Matching / Rectified Flow。
- AI 生图 PDF Page 45–46 涉及 2025–2026 厂商产品和部分未公开架构推断。索引已将官方可核实节点与推断分开；后续制作时间线时仍须再次核验。

这些缺口不是预处理失败。Phase 2 之后若大纲需要，应按项目规则查可靠论文官方图或自行绘制准确示意图，并明确来源。
