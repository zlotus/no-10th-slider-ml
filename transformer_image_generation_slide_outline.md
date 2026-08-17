# 近十年 Transformer 与文图生成算法演进 —— Slide 细化大纲

> 目标：用约 20–25 页 Slide，讲清楚过去十年 Transformer 与文图生成的核心算法演进。
>
> 风格原则：
> - 少公式，多结构图、动画和直觉解释。
> - 每页尽量只讲一个核心概念。
> - 强调“为什么上一代方法不够 → 下一代方法解决了什么”。
> - Transformer 部分重点参考 `Transformer.pptx` 的讲解顺序、文字与图片。
> - 文图生成部分重点参考 `AI生图范式演进与里程碑论文解读` PDF 的讲解顺序、文字、论文图和案例。
> - 不机械复制原 PPT/PDF 页面布局，统一重构为本项目的视觉语言。

---

# 1. 封面

## 标题

**近十年 Transformer 与文图生成算法演进**

副标题可选：

> 从 Attention 到 Diffusion，再到多模态生成

## 视觉建议

用一条横向时间线建立全局视角：

```text
2017 Transformer
      ↓
2018 BERT
      ↓
2019 GPT-2
      ↓
2020 DDPM
      ↓
2021 CLIP
      ↓
2022 Stable Diffusion
      ↓
2023 DiT
      ↓
2024–2026 Flow / 多模态生成
```

这一页不讲细节，只告诉观众：

> 过去十年的生成式 AI，并不是突然出现的，而是两条技术路线不断演进、最终汇合的结果。

---

# 2. 为什么从 Transformer 开始讲

核心问题：

**为什么今天讲 AI 生成，绕不开 Transformer？**

## 内容

Transformer 最初用于 NLP：

```text
文本
 ↓
Transformer
 ↓
语言模型
```

后来逐渐扩展：

```text
语言
 ↓
视觉
 ↓
多模态
 ↓
图像生成
```

可以进一步画成：

```text
Text Token
Image Token
Audio Token
Video Token
        ↓
   Transformer
```

## 本页结论

> Transformer 从一种 NLP 模型架构，逐渐演化成了通用的信息处理骨架。

为后半部分埋下伏笔：

> 今天很多图像生成模型内部，也已经是 Transformer。

---

# 第一部分：Transformer

---

# 3. Transformer 之前：RNN / LSTM 如何处理序列

这一页不要深入 LSTM 门控公式，重点讲“顺序计算”。

## 示例

```text
我 → 喜 → 欢 → 人 → 工 → 智 → 能
```

RNN 的计算过程天然是：

```text
h₁ → h₂ → h₃ → h₄ → h₅ → h₆ → h₇
```

后一个状态依赖前一个状态。

因此，RNN/LSTM 有一个很重要的特征：

> **序列顺序天然写在计算过程里。**

“我”一定先于“喜”，“喜”一定先于“欢”。

模型无需额外告诉它：

```text
我 = position 1
喜 = position 2
欢 = position 3
```

因为时间步本身已经表达了位置。

## 代价

但这也带来了根本问题：

### 1. 无法充分并行

必须：

```text
t1 → t2 → t3 → t4 → ...
```

前一步没算完，后一步很难开始。

### 2. 长距离依赖困难

例如：

> “我昨天在会议上看到的那台服务器，虽然已经用了很多年，但它依然运行得非常稳定。”

“服务器”和“稳定”之间隔得很远。

RNN 需要经过很多状态传递，才能建立这种联系。

## 本页总结

> **RNN 用“时间上的顺序计算”同时承担了序列建模和位置信息表达。**

但代价是：

> **顺序和计算绑死，因此难以并行。**

---

# 4. Transformer：把“顺序”与“关系计算”解耦

这是 Transformer 部分的核心转折页。

## RNN 的做法

```text
我 → 喜 → 欢 → 人 → 工 → 智 → 能
```

依靠逐步传播建立关系。

## Transformer 的做法

Transformer 不再要求 token 一个一个处理。

先把整条序列放入矩阵：

```text
X =
[我
 喜
 欢
 人
 工
 智
 能]
```

生成：

```text
Q = XWq
K = XWk
V = XWv
```

然后一次性计算：

```text
Q("我 喜 欢 人 工 智 能")
            @
K("我 喜 欢 人 工 智 能")ᵀ
```

得到：

```text
7 × 7 Attention Matrix
```

可以画成：

```text
          K
       我 喜 欢 人 工 智 能
     ┌────────────────────
我   │
喜   │
欢 Q │
人   │
工   │
智   │
能   │
```

矩阵里的每一个格子都表示：

> 某个 token 与另一个 token 之间的关联程度。

因此：

> **所有 token 之间的两两关系，可以通过矩阵乘法并行计算。**

## 但出现了一个新问题

如果只做 Self-Attention：

```text
我 爱 你
```

和：

```text
你 爱 我
```

Transformer 本身并不会天然知道：

```text
“我”是在第 1 位
还是第 3 位
```

因为 Self-Attention 的关系计算本身不携带“时间步顺序”。

因此 Transformer 必须额外注入位置信息。

## 本页最重要的总结

> **RNN 把“顺序”写进计算流程；Transformer 把“顺序”从计算流程中拿出来，再通过位置编码显式注入。**

更短的版本：

> **RNN：用时间传递位置。**  
> **Transformer：用位置编码描述位置，用矩阵乘法并行建模关系。**

这一句建议作为页面底部的大字总结。

---

# 5. Position Encoding / RoPE：把顺序重新注入 Transformer

这一页承接上一页。

## 原始 Transformer

2017 年《Attention Is All You Need》采用的是：

```text
Token Embedding
       +
Sinusoidal Positional Encoding
       ↓
Transformer Input
```

也就是说：

> 在进入 Attention 之前，显式告诉模型每个 token 位于什么位置。

可以简单展示 Sin/Cos 波形，但不需要推导公式。

## 后来的位置编码

后续模型出现了：

- Learned Position Embedding
- Relative Position Encoding
- RoPE（Rotary Position Embedding）

## RoPE 的直觉

RoPE 不再简单地：

```text
token embedding + position embedding
```

而是根据 token 的位置，对 Q 和 K 进行旋转变换。

可以用极简动画：

```text
Q₁ = rotate(Q, position=1)
Q₂ = rotate(Q, position=2)
Q₃ = rotate(Q, position=3)

K₁ = rotate(K, position=1)
K₂ = rotate(K, position=2)
K₃ = rotate(K, position=3)
```

之后再计算：

```text
Q_rope K_ropeᵀ
```

于是 Attention Score 中就能够自然表达 token 之间的相对位置关系。

## 本页总结

> Self-Attention 负责“谁和谁相关”。

> Position Encoding / RoPE 负责“它们分别在哪里、相隔多远”。

---

# 6. Attention：让每个 token 主动查找自己需要的信息

这一页从矩阵计算转向直觉解释。

## 示例

> 小明把苹果给了小红，因为她饿了。

问题：

> “她”指的是谁？

模型处理“她”时，可以关注所有 token：

```text
她
├──────── 小红   0.72
├──── 小明       0.12
├── 苹果         0.03
└──── 饿了       0.13
```

## Attention 的直觉

RNN 的思路更像：

> 信息沿时间方向一级一级传过来。

Attention 的思路更像：

> 当前 token 直接去整句话里查找自己需要的信息。

## 本页结论

> Attention 的核心不是“记住前面的状态”，而是“当前 token 主动寻找与自己最相关的信息”。

---

# 7. Q / K / V 到底是什么

建议尽量参考原 Transformer PPT 中最直觉的解释方式。

可以采用“数据库查询”类比。

每个 token 会生成三个向量：

- **Query：我在找什么**
- **Key：我是什么**
- **Value：我能提供什么信息**

例如：

```text
Query("她")
      ↓
与所有 Key 比较
      ↓
小红 Key：高度匹配
小明 Key：低匹配
苹果 Key：几乎不匹配
```

然后根据匹配程度，对 Value 做加权汇总。

## 公式

全套 Transformer 部分可以只正式出现一次：

```text
Attention(Q,K,V)
=
softmax(QKᵀ / √d) V
```

不做数学推导。

只解释：

```text
QKᵀ
=
谁应该关注谁
```

然后：

```text
× V
=
把真正有价值的信息取回来
```

## 本页总结

> **Q/K 决定“看谁”，V 决定“拿什么信息”。**

---

# 8. Multi-Head Attention：为什么需要多个头

一句话中的关系不止一种。

例如：

> The animal didn't cross the street because it was too tired.

模型可能需要同时理解：

- 主谓关系
- 指代关系
- 局部词组
- 长距离语义关系

可以画：

```text
Head 1：语法关系
Head 2：指代关系
Head 3：局部关系
Head 4：长距离语义
```

不同 Head 会学习不同的 Attention Pattern。

## 视觉素材

优先从参考 PPT 中寻找：

- Attention Heatmap
- 不同 Head 的关注模式
- 词与词之间的连线图

## 本页总结

> Multi-Head Attention 相当于让模型同时从多个“视角”理解同一段输入。

---

# 9. 完整 Transformer：Encoder + Decoder

建议直接使用经典 Transformer 架构图，优先参考原 PPT 中质量较好的版本。

左侧：

```text
Encoder × N
```

右侧：

```text
Decoder × N
```

主要解释三类 Attention。

## Encoder Self-Attention

输入内部所有 token 互相理解。

## Decoder Masked Self-Attention

生成时不能偷看未来。

例如：

```text
我 → 喜 → 欢 → ?
```

预测“欢”之后的 token 时，只能看到已经生成的内容。

## Cross Attention

Decoder 可以读取 Encoder 的输出。

翻译示例：

```text
I love AI
    ↓
 Encoder

 Decoder
    ↓
我 → 喜 → 欢 → AI
```

## 本页结论

> Transformer 最初并不是今天熟悉的“GPT”，而是一个完整的“理解 + 生成”架构。

---

# 10. Transformer 分裂成三条路线

画一个很清晰的分叉：

```text
             Transformer
                 │
       ┌─────────┼─────────┐
       │         │         │
Encoder-only  Decoder-only Encoder-Decoder
       │         │         │
      BERT      GPT       T5
```

## Encoder-only

代表：

- BERT

擅长：

- 分类
- 理解
- 表征学习

## Decoder-only

代表：

- GPT

擅长：

- 自回归生成

后来成为大语言模型主流。

## Encoder-Decoder

代表：

- 原始 Transformer
- T5

擅长：

- Translation
- Sequence-to-Sequence

## 本页结论

> 今天的大语言模型，本质上大多是 Transformer Decoder 的超大规模版本。

---

# 11. Transformer 走出 NLP：ViT 与多模态

Transformer 的输入本质上不是“单词”，而是 token。

## ViT

将图像切成 patch：

```text
Image
 ↓
16×16 Patches
 ↓
Patch Embedding
 ↓
Transformer
```

类比：

```text
NLP：
Word / Subword = Token

ViT：
Image Patch = Token
```

于是 Transformer 可以处理：

```text
Text Token
Image Token
Audio Token
Video Token
```

## 本页结论

> Transformer 不是“处理文字的模型”，而是一种处理 token 的通用模型。

## 过渡到后半部分

提出问题：

> 如果图像也能表示成 token，那么我们是不是也能像生成文字一样生成图片？

---

# 第二部分：文图生成

---

# 12. 图像生成到底在解决什么

给定：

> 一只宇航员猫站在月球上

希望模型完成：

```text
Text
 ↓
Image
```

这个任务本质上需要解决两个问题。

## 问题 1：图像怎么生成

如何从一个概率分布中得到真实、合理的新图片？

## 问题 2：文本如何控制图像

如何保证：

- 有猫
- 是宇航员
- 在月球
- 各元素之间关系正确

## 历史路线

```text
VAE
 ↓
GAN
 ↓
Autoregressive
 ↓
Diffusion
 ↓
Flow
```

这一页是文图生成部分的目录页。

---

# 13. VAE：学习一个可生成的潜空间

## 基本结构

```text
Image
 ↓
Encoder
 ↓
Latent z
 ↓
Decoder
 ↓
Image
```

核心思想：

> 不直接在像素空间里理解所有变化，而是学习一个更紧凑的潜空间。

例如：

```text
猫 ←──── latent space ────→ 狗
```

中间插值也应该对应合理图像。

## VAE 的贡献

- 学到了连续 latent space
- 可以从 latent space 中采样
- 建立了“压缩表示 + 生成”的统一框架

## 问题

- 图像容易模糊
- 高质量细节有限

## 本页伏笔

> 后来的 Stable Diffusion，会重新把 VAE 拿回来。

---

# 14. GAN：生成器与判别器的对抗

结构：

```text
Noise
 ↓
Generator
 ↓
Fake Image
        ↘
      Discriminator
        ↗
Real Image
```

## Generator

目标：

> 生成足以骗过判别器的图片。

## Discriminator

目标：

> 分辨真实图片与生成图片。

二者不断博弈。

## 优点

GAN 把生成图片的清晰度和真实感推到了很高水平。

代表：

- DCGAN
- StyleGAN

## 问题

- 训练不稳定
- Mode Collapse
- 分布覆盖不完整
- 条件控制困难

## 本页结论

> GAN 极大提升了生成质量，但训练过程非常“脆”。

---

# 15. 自回归图像生成：把图片也变成 token

Transformer 开始与图像生成正式汇合。

## 思路

把图片表示成离散 token：

```text
Image
 ↓
Tokenizer / VQ
 ↓
Image Tokens
```

然后像语言模型一样：

```text
x₁ → x₂ → x₃ → ... → xₙ
```

逐个预测。

## DALL·E 1 的关键思想

```text
Text Tokens
+
Image Tokens
 ↓
Transformer
```

于是：

> 文生图可以被转化为一个大型序列建模问题。

## 优点

统一、简单，天然兼容 Transformer。

## 问题

- 图像 token 数量巨大
- 自回归必须逐 token 生成
- 推理速度慢

## 本页结论

> 图像第一次真正被当成“另一种语言”来生成。

---

# 16. CLIP：让文字与图像进入同一个语义空间

## 结构

```text
Text Encoder
"A photo of a dog"
       ↓
   Text Vector
        ↘
       Similarity
        ↗
   Image Vector
       ↑
Image Encoder
```

训练时：

正确图文对：

```text
靠近
```

错误图文对：

```text
远离
```

最终得到：

```text
"dog"
   ↕
狗的视觉概念
```

## 意义

CLIP 让自然语言和视觉概念之间建立了强大的对齐关系。

这意味着：

> Prompt 可以真正成为控制图像生成的接口。

## 本页结论

> 文生图不仅需要“会画”，还需要“听懂你想画什么”。

---

# 17. Diffusion：从噪声里一点一点恢复图像

这是文图生成部分最重要的核心页之一。

## Forward Process

从真实图像开始不断加噪：

```text
清晰图片
→ 少量噪声
→ 更多噪声
→ ...
→ 纯高斯噪声
```

## Reverse Process

训练一个模型学会反过来：

```text
Noise
→ 去一点噪
→ 再去一点
→ ...
→ Image
```

## 核心直觉

不要一开始上公式。

重点解释：

> Diffusion 并不是直接“凭空画出一张图”。

而是在学习：

> **当前这团噪声，应该往哪个方向修改，才会越来越像真实图片。**

## 本页总结

> 图像生成被重新表述成了一个“逐步去噪”的过程。

---

# 18. DDPM：为什么 Diffusion 成为拐点

稍微深入一点技术细节。

## 训练

随机选择时间步：

```text
x₀
 ↓ 加噪
xₜ
```

模型输入：

```text
xₜ + timestep t
```

预测：

```text
εθ(xₜ,t)
```

即：

> 这张图里被加入了什么噪声？

Loss 可以简单出现：

```text
|| ε - εθ ||²
```

不展开推导。

## 优势

- 训练稳定
- Mode Coverage 好
- 生成质量高

## 缺点

推理慢：

```text
Noise
→ Step 100
→ Step 99
→ ...
→ Step 1
→ Image
```

## 本页结论

> GAN 试图“一步生成”，Diffusion 则学习完整的“噪声 → 数据”反向过程。

---

# 19. Stable Diffusion：为什么 Diffusion 真正普及

传统 Diffusion 如果直接在像素空间工作：

```text
512 × 512 × 3
```

计算量非常高。

## Latent Diffusion

把 VAE 重新引入：

```text
Image
 ↓
VAE Encoder
 ↓
Latent
 ↓
Diffusion
 ↓
Latent
 ↓
VAE Decoder
 ↓
Image
```

Diffusion 不再处理原始像素，而是在压缩后的 Latent Space 工作。

## 优点

- 大幅降低计算量
- 消费级 GPU 也能运行
- 更容易开源和训练
- 促进 LoRA / ControlNet / 社区生态爆发

## 可以给出一个非常重要的结构总结

```text
Stable Diffusion
=
VAE
+
Diffusion
+
Text Conditioning
```

## 本页结论

> Stable Diffusion 的关键不是发明了 Diffusion，而是让 Diffusion 变得真正可用。

---

# 20. 文本如何进入 Diffusion：Cross-Attention

这一页是 Transformer 与 Diffusion 的真正汇合点。

## Prompt

例如：

> a red sports car in snow

首先：

```text
Text
 ↓
Text Encoder
 ↓
Text Embeddings
```

然后在图像生成网络内部进行 Cross-Attention。

可以类比 Transformer：

```text
Image Feature = Query

Text Feature =
Key + Value
```

于是：

```text
"red"
  ↓
颜色

"sports car"
  ↓
主体

"snow"
  ↓
环境
```

这些文本条件会持续参与每一步去噪。

## 非常适合作为本页大字标题

> **Prompt 不是一句“命令”，而是一组持续参与去噪过程的条件向量。**

---

# 21. Diffusion Transformer：连 U-Net 也开始 Transformer 化

经典 Stable Diffusion 的核心去噪网络主要是：

```text
U-Net
```

后来的趋势：

```text
DiT
=
Diffusion
+
Transformer
```

## 基本流程

```text
Noisy Latent
 ↓
Patchify
 ↓
Transformer Blocks
 ↓
Predict Noise / Velocity
```

## 为什么使用 Transformer

- 更容易 Scale Up
- 参数规模扩展更加直接
- 适合现有大模型训练基础设施
- 更容易与文本、多模态表示统一

## 代表性方向

可以点到为止：

- DiT
- PixArt
- MMDiT
- Flux 类架构

不需要变成产品罗列。

## 本页结论

> Transformer 从“生成模型的条件编码器”，进一步变成了生成模型本身。

---

# 22. 从 Diffusion 到 Flow Matching / Rectified Flow

这是近几年另一个重要范式变化。

## Diffusion 的视角

```text
Noise
 ~~~~~>
    ~~~~~>
       ~~~~~>
          Data
```

通过很多小步骤逐步逼近。

## Flow Matching 的视角

学习一个连续速度场：

```text
dx/dt = vθ(x,t)
```

不推公式，只解释：

> 在空间中的任意位置，模型直接预测“下一步应该往哪里走”。

## Rectified Flow

目标之一：

让 Noise → Data 的路径尽可能简单、直接。

视觉上可以对比：

### 弯曲路径

```text
Noise
 ~~~>
    ~~~>
       ~~~>
          Image
```

### 更直的路径

```text
Noise ─────────→ Image
```

## 潜在收益

- 更少采样步数
- 更快生成
- 与 Transformer 架构高度兼容

## 本页结论

> 生成模型正在从“学会去噪”，继续演化为“学会数据分布之间的运动路径”。

---

# 23. 现代文图模型已经不是“一个网络”

今天的文图模型通常是一整套系统。

可以画：

```text
Prompt
 ↓
LLM / Prompt Rewriter
 ↓
Text / Multimodal Encoder
 ↓
Diffusion / Flow Transformer
 ↓
VAE Decoder
 ↓
Image
 ↓
Upscaler / Refiner
```

背后还有：

- Caption 数据
- Synthetic Caption
- 数据清洗
- Aesthetic Scoring
- Human Preference
- Prompt Following
- Safety Alignment
- 后处理

## 本页结论

> 文图生成已经从“模型结构竞争”，进入“模型 + 数据 + 对齐 + 推理系统”的竞争。

---

# 24. 十年演进时间线

建议做成整页横向时间轴。

```text
2013  VAE
2014  GAN

2017  Transformer

2018  BERT

2019  GPT-2

2020  DDPM
2020  ViT

2021  CLIP
2021  DALL·E

2022  Latent Diffusion
2022  Stable Diffusion

2023  DiT

2024+ MMDiT / Flow Matching / Rectified Flow

2025+
Unified Multimodal Generation
```

## 视觉结构

建议上下两条路线。

### 上方

```text
Transformer
→ BERT/GPT
→ ViT
→ Multimodal Transformer
→ DiT / MMDiT
```

### 下方

```text
VAE
→ GAN
→ Autoregressive
→ Diffusion
→ Latent Diffusion
→ Flow
```

然后重点标出几次“汇合”：

```text
DALL·E
Cross-Attention
DiT
Multimodal Generation
```

## 本页目的

让观众回过头看到：

> 前面的所有算法并不是孤立出现，而是在不断继承、组合。

---

# 25. 最终总结：两条路线走向同一个方向

最后一页只保留三个结论。

## 1. Transformer 解决“信息如何交互”

```text
token ↔ token
```

从：

```text
Text
```

扩展到：

```text
Image
Audio
Video
Multimodal
```

---

## 2. Diffusion / Flow 解决“样本如何生成”

```text
Noise
 ↓
Data
```

核心问题：

> 如何从一个简单分布稳定地走向真实数据分布。

---

## 3. 今天两者已经合流

```text
Multimodal Transformer
        +
Diffusion / Flow
        ↓
Modern Generative AI
```

## 最终收束语

> **Transformer 统一了“表示与信息交互”，Diffusion 与 Flow 统一了“生成过程”。**

进一步可以收束为：

> 过去十年的算法演进，本质上是在逐渐把文本、图像乃至更多模态，变成同一种可表示、可理解、可生成的信息。

---

# 页数压缩建议

当前详细版本约为 **25 页**。

如果最终演讲时间较短，希望控制在约 **20 页**，建议合并：

1. 第 6 + 7 页  
   `Attention 直觉 + Q/K/V`

2. 第 8 + 9 页  
   `Multi-Head + 完整 Transformer`

3. 第 10 + 11 页  
   `BERT/GPT 分支 + ViT/多模态`

4. 第 13 + 14 页  
   `VAE + GAN`

5. 第 21 + 22 页  
   `DiT + Flow Matching`

压缩后约 **20 页**。

---

# 内容制作原则

后续 Codex 实现时，建议遵循以下规则。

## Transformer 部分

优先参考：

```text
references/transformer/pages/
references/transformer/media/
references/transformer/text/
```

尤其寻找：

- RNN / LSTM 顺序计算示意图
- Self-Attention 结构图
- Q / K / V 图解
- Attention Matrix
- Multi-Head Attention 可视化
- Transformer Encoder / Decoder 原始架构图

---

## 文图生成部分

优先参考：

```text
references/image-generation/pages/
references/image-generation/images/
references/image-generation/text/
```

尤其寻找：

- VAE / GAN 模型结构图
- DALL·E / VQ-VAE 示意图
- CLIP 图文对齐图
- DDPM Forward / Reverse Process
- Diffusion 去噪过程图
- Latent Diffusion / Stable Diffusion 架构图
- Cross-Attention 结构图
- DiT / Flow Matching 论文图
- 各年代生成效果对比

---

# 视觉与讲解原则

整个 Slide 不要做成“论文罗列”。

始终采用：

```text
上一代的问题
      ↓
为什么需要新方法
      ↓
新方法的核心直觉
      ↓
它解决了什么
      ↓
还留下了什么问题
```

让下一页自然成为上一页问题的答案。

整套演讲真正需要讲清楚的不是：

> “这些论文分别做了什么。”

而是：

> **为什么算法会沿着这条路径一步一步演化到今天。**
