# Phase 5：完成现代文图生成主线与全篇收束（第 18～25 页）

请先完整阅读并遵守：

```text
AGENTS.md
transformer_image_generation_slide_outline.md
README.md
references/README.md
references/image-generation/reference-index.md
references/transformer/reference-index.md
```

继续保持 Phase 2～4 已确定的视觉体系、runtime、颜色语义和动画语言。

本阶段完成：

> **第 18～25 页，并对整套 25 页 Slide 做一次全局收束与轻量统一检查**

这是内容实现的最后一个 Phase。

---

# 1. 当前状态

目前已完成：

```text
1      封面
2–11   Transformer 主线
12–17  文图生成前半章
```

当前叙事已经走到：

```text
CLIP
 ↓
文本与图像语义对齐
 ↓
Diffusion
 ↓
从噪声逐步恢复图像
```

Phase 5 要继续回答：

> Diffusion 为什么成为主流？  
> 为什么 Stable Diffusion 真正普及？  
> 文本到底怎样控制去噪？  
> 为什么生成骨干后来也 Transformer 化？  
> Flow 又在改变什么？  
> 今天的文图模型为什么已经是一个完整系统，而不是单个网络？

最终完成两条路线的合流：

```text
Transformer / Representation
             +
Diffusion / Flow / Generation
             ↓
Modern Multimodal Generative AI
```

---

# 2. 本阶段页面范围

完成：

```text
18  DDPM
19  Latent Diffusion / Stable Diffusion
20  Cross-Attention
21  Diffusion Transformer / DiT
22  Flow Matching / Rectified Flow
23  现代文图生成系统
24  十年演进时间线
25  最终总结
```

并保持：

```text
1～25
```

全部 registry 连续可播放。

---

# 3. 总体叙事

本阶段不要做成产品名列表。

必须形成：

```text
Diffusion 的直觉
↓
DDPM：把训练目标变得稳定而简单
↓
Latent Diffusion：不再在高维像素空间里昂贵去噪
↓
Stable Diffusion：让 Diffusion 真正工程化普及
↓
Cross-Attention：文本条件持续进入去噪过程
↓
DiT：连生成骨干也 Transformer 化
↓
Flow Matching / Rectified Flow：重新描述 Noise → Data 的路径
↓
现代系统：模型 + 数据 + 条件 + 对齐 + 推理
↓
两条技术路线最终汇合
```

---

# 4. 第 18 页：DDPM — 为什么 Diffusion 成为真正的拐点

标题：

> **DDPM：把“生成”变成一个稳定的去噪学习问题**

第 17 页已经讲了 Diffusion 的 forward / reverse 直觉。

本页不要重复“加噪 / 去噪是什么”。

重点解释：

> 为什么这套方法突然变得可训练、可规模化。

## 核心训练过程

视觉上展示：

```text
x₀
真实图像
 ↓
随机选择 timestep t
 ↓
加噪得到 xₜ
 ↓
Network(xₜ, t)
 ↓
预测加入的噪声 ε
```

再出现核心训练目标：

```text
|| ε - εθ(xₜ, t) ||²
```

不推导。

## 要讲清的直觉

训练时不用：

> 从纯噪声完整跑一遍到图像再算损失。

而是可以：

> 随机抽一个时间步，直接训练模型识别“这里面混进去了多少噪声”。

这使训练目标非常直接。

## 与 GAN 对比

可非常克制地出现：

```text
GAN
Generator ↔ Discriminator
Adversarial game

DDPM
Noisy sample → Predict noise
Simple regression objective
```

不是说 DDPM 一切都更好，而是强调：

> 训练稳定性与覆盖数据分布的能力是关键优势。

## 页面结论

> **GAN 学的是“骗过判别器”，DDPM 学的是“每一步该去掉多少噪声”。**

---

# 5. 第 19 页：Latent Diffusion / Stable Diffusion

标题：

> **Stable Diffusion：不在像素空间去噪，而是在潜空间里做**

这是整个文图章节的关键工程转折页。

## 核心问题

Pixel-space Diffusion：

```text
512 × 512 × 3
```

直接在高维像素上反复去噪，成本很高。

## Latent Diffusion

视觉流程：

```text
Image
 ↓
VAE Encoder
 ↓
Latent z
 ↓
Diffusion / Denoising
 ↓
Latent z'
 ↓
VAE Decoder
 ↓
Image
```

注意：

> 这里必须和第 13 页 VAE 形成明显的“伏笔回收”。

第 13 页讲：

```text
VAE → 可生成的潜空间
```

第 19 页讲：

```text
Diffusion → 在潜空间中运行
```

观众应该有“原来前面的 VAE 在这里重新出现”的感觉。

## Stable Diffusion 的意义

不要说：

> Stable Diffusion 发明了 Diffusion。

应表达：

> Latent Diffusion / Stable Diffusion 让高质量 Diffusion 在更低计算成本下变得实际可用，并形成强大的开源生态。

可以轻量出现：

```text
Consumer GPU
LoRA
ControlNet
Open ecosystem
```

但不要展开成生态介绍页。

## 页面结论

> **Stable Diffusion 的关键不是发明去噪，而是让去噪进入一个更便宜的潜空间。**

推荐最终结构句：

```text
Stable Diffusion
=
VAE
+
Latent Diffusion
+
Text Conditioning
```

---

# 6. 第 20 页：文本到底怎样进入 Diffusion

标题：

> **Prompt 不是“发给模型的一句话”，而是持续参与去噪的条件**

这是 Transformer 与 Diffusion 两条主线真正第一次强合流。

## 核心结构

```text
Prompt
 ↓
Text Encoder
 ↓
Text Embeddings
         │
         │ K / V
         ↓
Cross-Attention
         ↑
         │ Q
Image / Latent Features
```

应明确：

```text
Image / Latent Feature → Query
Text Feature → Key / Value
```

然后输出回到图像特征。

## 用一个 Prompt 举例

例如：

```text
"a red sports car in the snow"
```

逐步高亮：

```text
red
sports car
snow
```

同时在图像 / latent feature 区域高亮不同视觉区域或属性。

不要声称这是严格可解释的一一对应。

这是教学性直觉：

> 文本 token 在去噪的多个层级持续影响视觉特征。

## 核心结论

> **Prompt 不是一句“命令”，而是一组持续参与去噪过程的条件向量。**

## 视觉要求

这一页应该明显同时出现两条主色：

```text
Transformer / text → amber
Generation / latent → violet
```

并在 Cross-Attention 处汇合。

这是全套 Slide 第一次明显视觉合流。

---

# 7. 第 21 页：Diffusion Transformer / DiT

标题：

> **Diffusion Transformer：连生成骨干也开始 Transformer 化**

## 历史关系

经典 Diffusion / Stable Diffusion 早期主要使用：

```text
U-Net
```

作为去噪主干。

DiT 路线则把 noisy latent / image patches 转成 token 后交给 Transformer。

## 建议视觉

左：

```text
Classic Diffusion

Noisy Latent
 ↓
U-Net
 ↓
Noise / Velocity
```

右：

```text
DiT

Noisy Latent
 ↓
Patchify
 ↓
Tokens
 ↓
Transformer Blocks
 ↓
Noise / Velocity
```

然后视觉上让右侧逐渐占主导。

## 与前半场呼应

第 11 页：

```text
Image → Patch → Transformer
```

讲的是视觉理解。

第 21 页：

```text
Noisy Latent → Patch / Token → Transformer
```

讲的是生成。

要让观众意识到：

> Transformer 已经从“理解图像”走进“直接承担生成主干”。

## 可以提及的路线

轻量标注即可：

```text
DiT
PixArt
MMDiT
FLUX-style architectures
```

不要做产品清单。

## 页面结论

> **Transformer 从条件编码器，进一步走进了生成模型本体。**

---

# 8. 第 22 页：Flow Matching / Rectified Flow

标题：

> **从 Diffusion 到 Flow：不只学“怎么去噪”，而是学“怎么走过去”**

这页只讲直觉，不做数学课。

## Diffusion 视觉

可以画成：

```text
Noise
 ~~~弯曲、很多小步~~~
 Image
```

## Flow Matching

画成一个连续向量场：

```text
Noise  → → → →  Image
```

通过箭头 / trajectory 表示：

> 模型学习一个随时间变化的速度场。

可以出现公式，但只作为标签：

```text
dx / dt = vθ(x, t)
```

不推导。

## Rectified Flow

核心直觉：

> 如果能让运输路径更直、更简单，就可能用更少的采样步数完成生成。

不要绝对声称所有 Rectified Flow 都必然比所有 Diffusion 更快、更好。

应表达：

> 这是现代生成模型中重要的发展方向之一，目标包括更简单的路径和更高效的采样。

## 页面结论

> **生成问题正在从“逐步去噪”，进一步抽象成“如何把一个分布运输到另一个分布”。**

---

# 9. 第 23 页：现代文图模型已经不是“一个网络”

标题：

> **今天的文图模型，已经是一整套生成系统**

这一页要把观众从“算法模块”拉到“现代系统”。

## 建议主流程

```text
User Prompt
 ↓
Prompt Rewrite / LLM
 ↓
Text / Multimodal Encoder
 ↓
Diffusion / Flow Transformer
 ↓
VAE Decoder
 ↓
Image
 ↓
Refiner / Upscaler / Post-process
```

然后在外围出现：

```text
Training Data
Synthetic Captions
Data Cleaning
Aesthetic Scoring
Human Preference
Prompt Following
Safety Alignment
Inference Optimization
```

不要把这些做成十几个相同卡片。

建议使用：

> 中央生成主链 + 周围训练 / 对齐 / 推理系统

的架构视觉。

## 核心观点

现代模型竞争不再只是：

```text
谁的 backbone 更强
```

而是：

```text
Model
+
Data
+
Alignment
+
Inference System
```

## 页面结论

> **现代文图生成的能力，来自“模型 + 数据 + 对齐 + 推理系统”的共同作用。**

---

# 10. 第 24 页：十年演进时间线

标题：

> **十年演进：两条路线，最终汇合**

这页不是普通 chronology。

要把整套演讲两条线同时画出来。

## 上轨：Transformer / Representation

```text
2017 Transformer
 ↓
2018 BERT
 ↓
2019 GPT-2
 ↓
2020 ViT
 ↓
2021 CLIP
 ↓
2023 DiT
 ↓
Multimodal Transformer
```

## 下轨：Generation

```text
2013 VAE
 ↓
2014 GAN
 ↓
Autoregressive
 ↓
2020 DDPM
 ↓
2022 Latent Diffusion
 ↓
2024+ Flow / Rectified Flow
```

## 汇合节点

重点突出：

```text
DALL·E
CLIP Conditioning
Cross-Attention
DiT / MMDiT
Modern Multimodal Generation
```

不要追求把所有论文年份都列全。

核心是：

> 两条路线什么时候开始互相影响，并最终汇合。

## 视觉要求

这是整套 Slide 最大的一张 timeline。

应充分利用：

- 两条主色
- route lines
- 节点 reveal
- convergence animation

建议最后一步让两条线真正汇成：

```text
MODERN GENERATIVE AI
```

---

# 11. 第 25 页：最终总结

标题可以非常简洁：

> **两条路线，走向同一个方向**

不要做“谢谢”页。

这是内容总结页。

## 左侧

```text
Transformer
```

关键词：

```text
Representation
Token
Attention
Information Interaction
```

一句话：

> **统一“信息如何表示、如何彼此交互”。**

## 右侧

```text
Diffusion / Flow
```

关键词：

```text
Noise
Distribution
Trajectory
Generation
```

一句话：

> **统一“样本如何从随机分布变成真实数据”。**

## 中央合流

```text
Multimodal Transformer
        +
Diffusion / Flow
        ↓
Modern Generative AI
```

最终大字结论：

> **Transformer 统一了“表示与信息交互”，Diffusion 与 Flow 统一了“生成过程”。**

可以再加一句较小的收尾：

> 过去十年，文字、图像、声音和视频正在变成同一种可表示、可理解、可生成的信息。

## 动画

建议：

1. 左侧 Transformer 路线出现；
2. 右侧 Diffusion / Flow 路线出现；
3. 两边核心词收束；
4. 两条路径汇入中央；
5. 最终结论出现。

这一页应该让观众有明显“闭环”感。

---

# 12. 允许新增的视觉 Pattern

本阶段允许增加：

```text
NoisePredictor
LatentPipeline
CrossAttentionBridge
DiffusionBackboneCompare
VelocityField
FlowTrajectory
SystemPipeline
DualTrackTimeline
ConvergenceNode
```

但继续遵守：

> 先复用已有组件，再新增真正需要的 pattern。

特别优先复用：

- Token / TokenRow
- AttentionMatrix
- PatchGrid
- SceneImage
- ProcessArrow
- NoiseFrame
- SimilaritySpace
- 已有 Transformer / Generation 两套视觉语言

Phase 5 的关键不是组件数量，而是：

> **把前四个 Phase 建立的所有视觉语言真正汇合。**

---

# 13. 主题色使用

Phase 5 是双色开始大量合流的阶段。

继续保持：

```text
Amber / Gold
→ Transformer / representation / text condition

Violet
→ generation / latent / diffusion / flow
```

但注意：

- 第 18 / 19 页仍以 generation 色为主
- 第 20 页 Cross-Attention 开始双色并置
- 第 21 页 DiT 明显合流
- 第 22 页 Flow 仍以 generation 为主
- 第 23～25 页可以明显使用双色合流

不要整页铺双色渐变。

双色应表达“技术路线汇合”，不是装饰。

---

# 14. 文件与 Registry

完成后 registry 必须连续包含：

```text
1
2
3
...
25
```

并使用真实最终页码。

建议正式文件命名：

```text
Slide18DDPM.tsx
Slide19LatentDiffusion.tsx
Slide20CrossAttention.tsx
Slide21DiT.tsx
Slide22FlowMatching.tsx
Slide23ModernSystem.tsx
Slide24Timeline.tsx
Slide25Summary.tsx
```

不是强制，但应保持清楚一致。

---

# 15. 第 17 页 Diffusion 与第 18 页 DDPM 的边界

特别注意不要重复。

第 17 页回答：

> Diffusion 是什么？

核心是：

```text
Image ↔ Noise
Forward / Reverse
```

第 18 页回答：

> 它到底怎样训练？

核心是：

```text
随机 timestep
预测 ε
简单 regression objective
```

两页必须互补。

---

# 16. 第 19 页必须回收第 13 页 VAE

这是整套叙事一个非常重要的呼应。

第 13 页已经建立：

```text
VAE → latent space
```

第 19 页必须明确：

```text
这个潜空间后来成为 Latent Diffusion 降低成本的关键基础。
```

最好通过动画或视觉重现第 13 页的 latent 图形语言，让观众产生记忆连接。

---

# 17. 第 20 / 21 页必须回收 Transformer 章节

第 20 页：

```text
Q / K / V
Cross-Attention
```

应该让观众立刻想起第 7 页。

第 21 页：

```text
Patch / Token / Transformer
```

应该明显呼应第 11 页 ViT。

不要重新发明完全不同的视觉符号。

这两个页面是全篇结构闭环的关键。

---

# 18. 技术准确性特别检查

## DDPM

不要说：

> DDPM 首次发明 Diffusion。

应把它放在 diffusion probabilistic model 路线的关键现代突破语境。

## Noise prediction

不要暗示所有现代 Diffusion 永远只预测 ε。

可以表述：

> DDPM 经典形式常通过预测噪声 ε 训练；后续模型还有 x₀、v-prediction 等参数化方式。

不需要展开。

## Stable Diffusion

不要说：

> Stable Diffusion = 一个单独的 Diffusion 网络。

应明确它是组合系统。

## Text encoder

不要暗示所有现代文图模型都固定使用 CLIP。

可使用：

> text / multimodal encoder

更泛化的表达。

## Cross-Attention

教学示意可以用：

```text
Image Feature = Q
Text Feature = K/V
```

但不要声称现代所有架构每一层都严格使用完全相同结构。

## DiT

不要把：

> DiT

等同于：

> 所有现代文生图 Transformer。

它代表重要的 Transformer-based diffusion backbone 路线。

## Flow Matching

不要声称：

> Flow Matching 完全取代 Diffusion。

应表达为现代生成建模的重要发展路线。

## Rectified Flow

不要绝对化“永远直线、永远少步、永远更快”。

使用：

> 目标是学习更简单、更直接的运输路径。

## Modern systems

避免绑定到具体厂商产品内部架构，除非参考资料有可靠公开来源。

---

# 19. 全局内容检查

完成 18～25 后，从头完整播放 1～25。

检查是否存在：

- 前后重复解释；
- 术语突然出现；
- 页面之间缺少过渡；
- 同一个概念前后名字不一致；
- Transformer 色与 Generation 色语义漂移；
- 结论句重复过多；
- 过多连续页面使用同一种布局。

只做必要的轻量调整。

不要借 Phase 5 大规模重做已验收页面。

---

# 20. 全局视觉检查

重点检查：

## Typography

- 标题大小是否一致
- 中文换行是否自然
- mono 标签是否统一
- source label 是否统一

## Spacing

- 页面安全边距
- 底部 takeaway
- 页码
- 图形与标题距离

## Animation

- Step 是否太碎
- 是否有按一下几乎看不出变化的 Step
- 是否有一次出现太多信息
- 回退是否正常

## Color

- Amber / Violet 是否保持语义
- Hybrid 页面是否克制
- 不要过多新增第三、第四色

---

# 21. 全局 runtime / 交互验收

完成后必须检查：

```text
1 → 25
```

连续播放。

至少测试：

```text
Space
ArrowLeft / ArrowRight
PageUp / PageDown
Home / End
F
Esc
页码跳转
URL hash
```

确保最终 `End` 到第 25 页，而不是旧的第 17 页。

---

# 22. 构建与 visual check

至少执行：

```bash
pnpm typecheck
pnpm build
```

并更新 / 扩展：

```bash
pnpm visual:check
```

使其至少覆盖：

- 第 1～25 页最终态
- 关键中间 Step
- 全章连续导航
- 3 种桌面窗口比例
- Console error
- failed network requests
- production build

不要把临时截图提交到 Git。

---

# 23. README / 项目文档

Phase 5 完成后更新 README，使其反映：

```text
完整 25 页演示已经实现
```

至少说明：

- 项目主题
- 启动方式
- 操作方式
- 代码结构
- Design System
- 两条主题色含义
- Reference 使用原则
- visual check

如果已有：

```text
docs/progress.md
docs/context.md
```

按当前项目约定更新最终状态。

不要写冗长总结文档。

---

# 24. 本阶段不要做

不要：

- 重写整个 runtime
- 换前端框架
- 重做已经验收的所有页面
- 加入后台 / CMS
- 加复杂 presenter mode
- 大量增加第三方动画库
- 把原始 PDF / PPTX 打进 bundle
- 把所有 reference 图片无差别复制到 assets
- 擅自扩展到 30～40 页
- 添加“产品榜单”式页面
- 把第 25 页变成普通“谢谢观看”

---

# 25. Phase 5 最终验收标准

最终应得到完整：

```text
01 封面

02–11
Transformer

12–17
早期图像生成 → Diffusion

18–22
DDPM → LDM → Cross-Attention → DiT → Flow

23
现代文图生成系统

24
十年技术时间线

25
两条路线汇合总结
```

整套播放下来应该只有一个故事：

```text
如何表示并交互信息
        +
如何生成数据
        ↓
现代多模态生成模型
```

而不是：

> 25 张独立算法介绍。

---

# 26. 阶段结束汇报

完成 Phase 5 后停止并汇报：

1. 新增了哪些 Slide；
2. 第 18～25 页各自核心视觉是什么；
3. 哪些页面回收了前面章节的视觉元素；
4. 新增了哪些可复用 pattern；
5. 使用了哪些 Phase 1 参考页面 / 素材；
6. 是否修正了任何技术表述；
7. 全套总 Step 数；
8. `pnpm typecheck` 是否通过；
9. `pnpm build` 是否通过；
10. `pnpm visual:check` 是否覆盖 1～25 页并通过；
11. 是否做了已验收页面的轻量调整；
12. 当前仍存在的已知问题；
13. 最希望用户重点验收的 3～5 张页面。

完成后不要继续自行增加新页面。

> **Phase 5 的目标不是“再加 8 张页面”，而是把前面建立的两条技术路线真正合流，并让整套 25 页演讲形成完整闭环。**
