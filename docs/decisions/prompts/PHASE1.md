项目目标参考AGENTS.md，分阶段实施。

# Phase 1：参考资料预处理与索引

请先阅读并遵守项目根目录中的：

```text
AGENTS.md
transformer_image_generation_slide_outline.md
```

本阶段只做 **参考资料预处理与索引**，不要开始实现 Slide、UI、动画或前端框架。

---

## 当前项目结构

```text
.
├── AGENTS.md
├── transformer_image_generation_slide_outline.md
└── references/
    ├── AI生图范式演进与里程碑论文解读｜从VAE、GAN到 Diffusion、自回归.pdf
    └── Transformer.pptx
```

---

# 1. 本阶段目标

把两份原始参考资料整理成后续 Agent 可以稳定检索、查看、引用和复用的结构化资料库。

最终至少形成：

```text
references/
├── Transformer.pptx
├── AI生图范式演进与里程碑论文解读｜从VAE、GAN到 Diffusion、自回归.pdf
│
├── transformer/
│   ├── pages/
│   ├── media/
│   ├── text/
│   ├── raw/
│   └── reference-index.md
│
├── image-generation/
│   ├── pages/
│   ├── media/
│   ├── text/
│   └── reference-index.md
│
└── README.md
```

如有必要，可以新增：

```text
scripts/
```

用于放置可重复执行的预处理脚本。

---

# 2. 环境检查

先检查以下命令是否存在：

```text
unzip
libreoffice
pdfinfo
pdftotext
pdftoppm
pdfimages
```

其中：

```text
pdfinfo
pdftotext
pdftoppm
pdfimages
```

通常来自 `poppler-utils`。

如果缺少工具：

- 不要静默跳过；
- 明确汇报缺少哪些命令；
- 如当前环境允许安装，给出最小安装方案；
- 不要为了安装工具引入无必要的大型依赖。

---

# 3. 处理 Transformer.pptx

原始文件：

```text
references/Transformer.pptx
```

目标目录：

```text
references/transformer/
```

## 3.1 解压原始 PPTX

PPTX 本质是 ZIP。

将其内部结构完整解压到：

```text
references/transformer/raw/
```

重点保留：

```text
ppt/slides/
ppt/slides/_rels/
ppt/media/
```

不要修改、覆盖或删除原始 `Transformer.pptx`。

---

## 3.2 提取原始媒体素材

将 PPTX 中的图片等媒体整理到：

```text
references/transformer/media/
```

要求：

- 尽量保留原始格式；
- 尽量保留原始清晰度；
- 不要只保存页面截图而丢弃原始 media；
- 如能可靠建立 `slide → media` 对应关系，应记录下来。

---

## 3.3 按页提取文字

解析 PPTX XML，将每一页文字分别保存为 Markdown，例如：

```text
references/transformer/text/slide-001.md
references/transformer/text/slide-002.md
...
```

要求：

- 保留标题；
- 保留正文；
- 尽量保持页面中文字的合理阅读顺序；
- 不要只生成一个巨大的全文文本文件；
- 可以额外生成全文合并版，但逐页文件必须存在。

如果某页几乎没有文字，也保留对应页文件，并注明该页主要为视觉内容。

---

## 3.4 渲染每一页

使用 LibreOffice headless 将 PPTX 转为 PDF，再将 PDF 每页渲染为 PNG。

最终命名统一为：

```text
references/transformer/pages/slide-001.png
references/transformer/pages/slide-002.png
...
```

要求：

- 页面完整；
- 分辨率足够让后续模型识别文字、公式、结构图和 Attention 可视化；
- 不需要印刷级分辨率；
- 不要生成低清晰度缩略图替代完整页面。

中间 PDF 如需保留，应放在合理的中间产物目录，不要散落仓库根目录。

---

# 4. 处理 AI 生图 PDF

原始文件：

```text
references/AI生图范式演进与里程碑论文解读｜从VAE、GAN到 Diffusion、自回归.pdf
```

目标目录：

```text
references/image-generation/
```

---

## 4.1 获取 PDF 基本信息

使用 `pdfinfo` 获取至少：

- 总页数；
- 页面尺寸；
- PDF 基本元数据。

这些信息可以记录在索引或 README 中。

---

## 4.2 按页渲染

使用 `pdftoppm` 或等价可靠方式将 PDF 每页渲染为 PNG：

```text
references/image-generation/pages/page-001.png
references/image-generation/pages/page-002.png
...
```

要求：

- 页面完整；
- 文字可辨认；
- 论文图、模型结构图、时间线、生成效果对比可查看；
- 页码命名统一补零。

---

## 4.3 按页提取文字

优先使用 PDF 自带文本层，不要默认使用 OCR。

将文字按页保存：

```text
references/image-generation/text/page-001.md
references/image-generation/text/page-002.md
...
```

要求：

- 尽量保留标题和正文结构；
- 如果文本层存在乱码、断行错乱、阅读顺序异常，要在索引中标注；
- 不要为了“补齐”而凭空重写原文；
- 页面视觉内容应以 `pages/` 中完整页面 PNG 为权威参考。

---

## 4.4 提取 PDF 内嵌图片

使用 `pdfimages` 尽可能提取 PDF 内嵌图片到：

```text
references/image-generation/media/
```

注意：

PDF 中有些完整“图”可能由多个位图、矢量对象、文字和页面布局共同组成，因此：

> `pages/` 中的完整页面截图是权威视觉参考，`media/` 只是可复用原始素材补充。

不要假设 `pdfimages` 提取出的每个文件都对应一张完整的可直接使用的图。

---

# 5. 建立逐页语义索引

这是 Phase 1 最重要的产物。

分别生成：

```text
references/transformer/reference-index.md
references/image-generation/reference-index.md
```

不要只生成：

```text
第 1 页：标题
第 2 页：Attention
第 3 页：QKV
```

这种机械目录。

必须真正阅读：

- 每页提取文字；
- 每页完整页面 PNG；
- 必要时查看原始 media；

然后建立语义索引。

---

## 5.1 Transformer 索引建议格式

示例：

```md
## Slide 12

### 主题
Self-Attention / QKV

### 本页核心内容
- ...
- ...
- ...

### 重要视觉素材
- `pages/slide-012.png`
- `media/image17.png`

### 值得复用的讲解思路
- ...
- ...

### 可支持当前大纲
- 第 4 页：Transformer 并行关系计算
- 第 7 页：Q / K / V

### 备注
- 哪张图值得优先复用
- 哪部分文字表达特别清楚
- 是否存在过时或需要修正的表述
```

---

## 5.2 AI 生图索引建议格式

示例：

```md
## Page 35

### 主题
Latent Diffusion

### 本页核心内容
- ...

### 重要视觉素材
- ...

### 相关论文 / 模型
- ...

### 值得复用的讲解思路
- ...

### 可支持当前大纲
- 第 19 页：Stable Diffusion

### 备注
- ...
```

---

# 6. 索引必须映射到当前 Slide 大纲

阅读：

```text
transformer_image_generation_slide_outline.md
```

对每个有价值的参考页，尽量标注：

```text
最适合支持大纲中的哪一页 / 哪几个概念
```

最终希望形成：

```text
最终 Slide
    ↕
reference-index.md
    ↕
原始页面 PNG
    ↕
原始文字 / media
```

这样后续 Agent 实现某一页时，可以先查索引，再定位原始页面和素材。

---

# 7. 生成 references/README.md

创建：

```text
references/README.md
```

至少说明：

1. 两份原始资料分别是什么；
2. Phase 1 做了哪些预处理；
3. `pages/`、`media/`、`text/`、`raw/` 各自用途；
4. 后续 Agent 应如何查找资料；
5. 为什么完整页面 PNG 是重要视觉参考；
6. 什么情况下应优先复用 `media/` 原图；
7. 两个 `reference-index.md` 如何使用。

README 中应明确说明：

> 在设计任何具体 Slide 前，应先查询对应的 `reference-index.md`，再查看索引指向的完整页面和媒体素材，不要仅凭模型自身知识重新生成内容。

---

# 8. 允许编写辅助脚本

如果预处理过程适合自动化，可以创建：

```text
scripts/
```

例如：

```text
scripts/preprocess_transformer.py
scripts/preprocess_image_generation.sh
```

要求：

- 可重复执行；
- 尽量幂等；
- 使用项目相对路径；
- 不写死当前机器绝对路径；
- 不破坏原始文件；
- 失败时给出明确错误；
- 不静默吞掉异常。

如果需要 Python，优先使用标准库或轻量依赖。

---

# 9. 本阶段禁止事项

Phase 1 明确禁止：

- 不要开始开发 Slide 页面；
- 不要初始化复杂前端框架；
- 不要设计配色、字体、布局；
- 不要制作封面；
- 不要实现 Transformer 动画；
- 不要实现文图生成动画；
- 不要重写 `transformer_image_generation_slide_outline.md`；
- 不要删除或修改原始 PPTX / PDF；
- 不要把参考资料简单总结几段就宣布完成；
- 不要自行进入 Phase 2。

本阶段的核心目标是：

> **把非结构化参考资料变成后续 Agent 可以稳定利用的结构化知识库。**

---

# 10. 验收标准

完成后至少应满足：

```text
.
├── AGENTS.md
├── transformer_image_generation_slide_outline.md
├── references/
│   ├── Transformer.pptx
│   ├── AI生图范式演进与里程碑论文解读｜从VAE、GAN到 Diffusion、自回归.pdf
│   │
│   ├── transformer/
│   │   ├── pages/
│   │   ├── media/
│   │   ├── text/
│   │   ├── raw/
│   │   └── reference-index.md
│   │
│   ├── image-generation/
│   │   ├── pages/
│   │   ├── media/
│   │   ├── text/
│   │   └── reference-index.md
│   │
│   └── README.md
│
└── scripts/
    └── ...
```

---

# 11. 阶段结束时必须自检并汇报

完成后停止，并向我汇报：

1. Transformer PPT 一共多少页；
2. AI 生图 PDF 一共多少页；
3. 成功渲染了多少张页面 PNG；
4. 成功提取了多少个媒体文件；
5. 逐页文字提取是否存在乱码、缺失或顺序问题；
6. 两个 `reference-index.md` 是否覆盖全部页面；
7. 哪些参考页 / 素材最值得后续 Slide 优先复用；
8. 是否发现参考资料中存在明显过时或技术表述需要修正的内容；
9. 当前是否还有任何预处理问题需要在 Phase 2 前解决。

**完成 Phase 1 后停止，不要自行进入 Phase 2。**
