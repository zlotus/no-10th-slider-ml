# Phase 4：完成文图生成前半章（第 12～17 页）

请先完整阅读并遵守：

```text
AGENTS.md
transformer_image_generation_slide_outline.md
README.md
references/README.md
references/image-generation/reference-index.md
references/transformer/reference-index.md
```

继续保持 Phase 2 已确定的视觉体系、runtime 与动画语言，并承接 Phase 3 已完成的 Transformer 章节。

本阶段只完成：

> **文图生成部分前半章：第 12～17 页**

不要进入后续的 Latent Diffusion / DiT / Flow / 现代多模态生成系统总结页，不要自行进入 Phase 5。

---

## 1. 当前状态

截至 Phase 3，项目应已经具备：

- 封面
- Transformer 完整主线（第 2～11 页）
- 第 17 页 Diffusion 样板
- 稳定的 Slide runtime
- 统一的 Design System
- Transformer 侧的 Token / Matrix / QKV / Patch 等 ML 视觉模式

本阶段的任务，是把叙事从：

```text
Transformer 成为通用 Token 架构
```

自然过渡到：

```text
图像生成方法是如何一路演进到 Diffusion 的
```

并正式完成：

```text
12
13
14
15
16
17
```

其中第 17 页已有 Phase 2 样板，应保留其核心设计，只允许为整章一致性做小幅优化。

---

## 2. 本阶段总体叙事目标

这一章不能做成：

```text
VAE
GAN
Autoregressive
CLIP
Diffusion
```

这样的算法清单。

必须形成清晰的演进链：

```text
图像生成到底难在哪里
        ↓
VAE：先学一个可采样的潜空间
        ↓
GAN：生成质量大幅提升，但训练对抗且不稳定
        ↓
Autoregressive：把图像离散成 token，用 Transformer 顺序生成
        ↓
CLIP：文本和图像进入统一语义空间
        ↓
Diffusion：通过逐步去噪，更稳定地学习生成分布
```

看完第 17 页后，观众应清楚理解：

1. 为什么图像生成问题比文本分类更难；
2. 为什么 VAE / GAN / AR 都重要，但各有局限；
3. 为什么 Diffusion 最终成为主流路线；
4. 为什么文图生成会和 Transformer / 多模态表示重新汇合。

---

## 3. 参考资料使用

每页实现前先查：

```text
references/image-generation/reference-index.md
```

再查看索引指向的：

```text
references/image-generation/pages/
references/image-generation/media/
references/image-generation/text/
```

必要时也可回看：

```text
references/transformer/reference-index.md
```

以保持与 ViT / Token / Transformer 的连接。

优先利用原 PDF 中：

- 生成模型演进总览
- VAE 示意图
- GAN 对抗结构
- Autoregressive 图像 token 化
- CLIP 双塔 / 对比学习
- Diffusion forward / reverse process

相关讲解逻辑和高质量图示。

不要机械复制原 PDF 页面。

技术准确性优先于原资料原话。

---

## 4. 第 12 页：为什么图像生成比“看图分类”难得多

标题：

> **从“理解图像”到“生成图像”，难度为什么陡增？**

这是文图生成章节的开场页。

## 核心内容

对比：

```text
图像理解
→ 给定一张图，判断它是什么

图像生成
→ 从分布中产生一张“像真的”新图
```

建议用两个并列面板：

### 左侧：Recognition / Understanding

```text
Image → Label
```

### 右侧：Generation

```text
Noise / Latent / Condition → Image
```

强调右侧困难：

- 输出空间极高维；
- 一张图像有很多合理答案；
- 局部纹理与全局结构都要成立；
- 还要和文本条件对齐。

## 页面结论

> **理解是在已有图像上做判断；生成是在巨大可能空间里“造出一个合理答案”。**

## 动画建议

1. 先出现“看图分类”；
2. 再出现“生成图像”；
3. 逐条揭示生成更难的原因；
4. 最后抛出问题：我们该怎样学习一个“会出图”的分布？

---

## 5. 第 13 页：VAE — 先学一个可采样的潜空间

标题：

> **VAE：把图像压到一个可以采样的潜空间**

## 核心直觉

传统 Autoencoder：

```text
Image → Encoder → Latent → Decoder → Reconstruct Image
```

但普通 Autoencoder 的 latent space 不一定连续、可采样。

VAE 的关键改动：

```text
Encoder 不直接输出一个点
而是输出一个分布（μ, σ）
```

然后：

```text
z ~ N(μ, σ²)
```

再送入 Decoder。

## 页面应讲清的内容

### 1. 为什么要 latent space

高维像素空间太复杂，希望先学一个压缩表示。

### 2. 为什么要“可采样”

如果 latent space 足够连续、规整，就可以随机采样再解码出新图像。

### 3. KL 的直觉

不做公式推导，只解释：

> 训练时不仅要求重建图像，还要求 latent 分布不要太乱，要接近一个简单先验（如标准正态）。

## 页面结论

> **VAE 让“从潜空间采样再生成图像”成为可能。**

## 视觉建议

- 左：Encoder / Decoder 流程
- 中：潜空间分布示意（云团 / 高斯）
- 右：采样点 → 生成结果

不要把这页做成满屏公式。

---

## 6. 第 14 页：GAN — 不再只求重建，而是追求“真假难辨”

标题：

> **GAN：生成器与判别器的对抗博弈**

## 核心直觉

```text
Generator
→ 试图伪造逼真图像

Discriminator
→ 试图区分真假
```

在对抗中，Generator 逐渐学会生成更真实的样本。

## 页面应讲清的内容

### 1. GAN 相比 VAE 的优势

- 图像更锐利；
- 视觉质量显著提升；
- 更能生成“看起来像真的”样本。

### 2. GAN 的代价

- 训练不稳定；
- 容易 mode collapse；
- Generator / Discriminator 需要微妙平衡；
- 很难做稳定的高质量文图生成基础设施。

## 页面结论

> **GAN 把图像生成质量拉高了，但训练过程像走钢丝。**

## 视觉建议

以对抗结构为页面中心：

```text
Noise → Generator → Fake Image
Real Image ───────────────┐
                          ↓
                    Discriminator
```

并在页面另一侧做：

```text
Pros / Cons
```

但不要做成普通优缺点表格。

可以用“生成质量提升”和“训练稳定性下降”的双向拉扯视觉。

---

## 7. 第 15 页：Autoregressive 图像生成 — 把图像也变成 Token

标题：

> **如果图像也能离散成 Token，我们就能像写句子一样“写图”**

这是承接 Transformer 章节的桥页之一。

## 核心内容

说明图像也可以先离散化表示，例如：

```text
Image
↓
Tokenizer / VQ-style codebook
↓
Discrete visual tokens
↓
Autoregressive Transformer
```

然后模型按顺序预测下一个 token，就像语言模型一样。

## 页面应讲清的内容

### 1. 为什么它很有吸引力

- 与 GPT 式自回归建模统一；
- Transformer 可以直接上场；
- 图像生成与语言建模出现统一范式。

### 2. 它的问题

- 序列很长；
- 采样慢；
- 局部 token 误差会逐步累积；
- 高分辨率图像成本高。

## 页面结论

> **Autoregressive 图像生成把“写文字”和“写图像”统一到了同一类序列建模问题。**

## 视觉建议

一定要做出“图像 → patch / token → sequence → next-token generation”的感觉。

不要只写文字解释。

可以与第 11 页 ViT 形成视觉呼应，但含义不同：

- ViT：为了理解图像，把图像变成 token；
- AR generation：为了生成图像，把图像 token 一个一个预测出来。

---

## 8. 第 16 页：CLIP — 文本和图像开始共享语义空间

标题：

> **CLIP：文图对齐，不是“先看图再分类”，而是进入共同语义空间**

这是文图生成章节的另一张关键桥梁页。

## 核心内容

展示：

```text
Text Encoder
Image Encoder
```

分别编码文本和图像，再通过对比学习把匹配的文图拉近、不匹配的推远。

## 页面应讲清的内容

### 1. CLIP 的意义

CLIP 本身不是生成模型，但它解决了非常关键的问题：

> 文本和图像如何在同一个语义空间里对齐。

### 2. 对后续生成模型的影响

一旦文本条件能被稳定表示，图像生成就不再只是“无条件出图”，而可以变成：

```text
Text Condition → Image
```

### 3. 与前半场的连接

这里要让观众感到：

```text
Transformer / Text Representation
            +
Vision Representation
            =
文图生成的条件能力开始成熟
```

## 页面结论

> **CLIP 不是负责“画图”，而是负责让模型真正理解“文字说的是什么图”。**

## 视觉建议

优先使用双塔结构：

```text
Text → Text Embedding
Image → Image Embedding
```

中间用相似度空间连接。

然后再在最后一步引出：

```text
Text Condition
↓
Image Generation
```

---

## 9. 第 17 页：Diffusion — 从噪声里一点一点恢复图像

已有：

```text
第 17 页 Diffusion 样板
```

应继续作为本章的收束页。

保留：

- forward process
- reverse process
- noise progression
- “不是一次画出来，而是逐步去噪”的核心结论

允许为整章一致性做轻微优化，但不要推翻 Phase 2 样板。

## 页面结论必须保持

> **模型不是一次“画出”图片，而是在学习如何让噪声逐步走向真实图像。**

---

## 10. 第 17 页前后的叙事连接

请确保前后页面在逻辑上自然过渡：

### 第 16 页结束

观众刚理解：

```text
Text / Image alignment
```

### 第 17 页开始

提出：

> 有了条件表达之后，接下来就是：怎样稳定地学习“从分布里生成图像”？

也就是说，第 17 页不是突然跳出，而是对前面：

- VAE 的潜空间
- GAN 的质量追求
- AR 的序列统一
- CLIP 的条件对齐

做一个“更稳定的新答案”。

---

## 11. 允许新增的视觉 Pattern

本阶段可以补充真正需要的可复用组件 / pattern，例如：

```text
LatentCloud
GaussianNode
AdversarialLoop
TokenizerStrip
VisualTokenSequence
ContrastivePair
EmbeddingSpace
SimilarityBridge
```

但继续遵守：

> 只有真正会重复使用且视觉规则稳定的结构，才值得抽象。

现有组件若适用应优先复用。

---

## 12. 文件与 Registry

完成后，演示 registry 至少应包含：

```text
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
```

页码要继续对应最终大纲页号。

不要因为阶段性实现而改掉页码体系。

---

## 13. 动画原则

继续保持 Phase 2 / Phase 3 已验证的动画语言：

```text
step reveal
focus / dim
fade
small translate
line draw
sequential highlight
matrix reveal
crossfade
image progression
trajectory draw
```

本阶段会比 Transformer 章节多使用：

- 图像序列
- 潜空间
- 对抗循环
- 语义桥接
- 连续过程

但整体动画风格不能脱离既有视觉系统。

原则：

> 每一步都应帮助观众理解“新方法为什么出现”，而不是单纯展示炫技动画。

---

## 14. 信息密度与版式原则

这几页很容易因为概念多而变成“算法百科”。

必须避免：

- 一页同时塞太多论文名；
- 用大段正文介绍损失函数；
- 把所有优缺点写成密密麻麻列表；
- 页面完全被卡片占满。

尽量通过：

- 结构图
- 潜空间示意
- 路径
- 图像条带
- token 序列
- 双塔编码器
- 对比关系

来表达。

---

## 15. 技术准确性特别检查

完成前逐页检查：

### VAE

不要把 VAE 说成“只是普通 Autoencoder 加一点随机噪声”。

要强调它学习的是可采样的潜变量分布。

### GAN

不要过度夸张为“GAN 完全无用”或“GAN 已经彻底过时”。

更准确的说法是：

> GAN 在生成质量上曾非常成功，但训练稳定性和可控性使其不适合作为后来主流文图生成基础框架。

### Autoregressive 图像生成

不要把所有图像 token 方法混成一个具体模型。

应强调这是一条“离散 token + 序列建模”的路线。

### CLIP

必须明确：

> CLIP 不是生成模型本身。

它的关键贡献是文图语义对齐。

### Diffusion

不要把 Diffusion 说成“直接在像素空间随机涂抹”。

应强调 forward / reverse 的分布学习直觉。

---

## 16. 来源标识

继续使用统一的轻量 source label。

例如可使用：

```text
KINGMA & WELLING · 2013
GOODFELLOW ET AL. · 2014
RADFORD ET AL. · 2021
HO ET AL. · 2020
```

不需要在正文里放长 URL。

---

## 17. 本阶段禁止

不要：

- 开始 Latent Diffusion 正式页
- 开始 Stable Diffusion 正式页
- 开始 DiT 正式页
- 开始 Flow Matching / Rectified Flow 正式页
- 开始最终总结 / 封底
- 重做 Phase 2 Design System
- 大规模重构 runtime
- 删除已有 Transformer 页面
- 删除第 17 页 Diffusion 样板
- 修改总体大纲
- 自行进入 Phase 5

如果发现小的 runtime / 样式问题可以修，但不要借机重写框架。

---

## 18. 测试

至少执行：

```bash
pnpm typecheck
pnpm build
```

如果已有：

```bash
pnpm visual:check
```

继续执行。

额外检查：

1. 第 1～17 页连续播放
2. 第 12～17 页每页 Step 前进 / 回退
3. URL hash
4. Home / End
5. 16:9 缩放
6. 全屏
7. Console
8. 图片 / SVG 路径
9. 文图章节的主题色是否统一
10. 第 11 页到第 12 页、以及第 16 页到第 17 页过渡是否自然

---

## 19. Phase 4 验收标准

从第 12 页播放到第 17 页，应形成完整故事：

```text
为什么图像生成更难
↓
VAE：潜空间
↓
GAN：质量 vs 稳定性
↓
Autoregressive：图像 token 化
↓
CLIP：文图语义对齐
↓
Diffusion：逐步去噪生成
```

视觉上：

- 明显属于 Phase 2 已确定的同一设计体系
- 与 Transformer 章节风格一致，但突出 generative/process 语义
- 不出现连续多页相同布局
- image / latent / sequence / alignment 等视觉模式真正被用起来
- 第 17 页样板仍是本章高潮页

---

## 20. 阶段结束汇报

完成 Phase 4 后停止，并汇报：

1. 新增了哪些正式 Slide
2. 第 17 页样板是否做了调整
3. 新增了哪些可复用生成模型视觉组件
4. 每页主要参考了哪些 Phase 1 页面 / 素材
5. 是否发现并修正参考资料中的技术问题
6. 文图前半章最终 Step 总数和节奏
7. `pnpm typecheck` 是否通过
8. `pnpm build` 是否通过
9. `pnpm visual:check` 是否通过
10. 当前已知问题
11. 希望用户重点验收哪些页面

**完成 Phase 4 后停止，不要自行进入 Phase 5。**
