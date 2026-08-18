# Phase 3：完成 Transformer 章节（第 2～11 页）

请先完整阅读并遵守：

```text
AGENTS.md
transformer_image_generation_slide_outline.md
README.md
references/README.md
references/transformer/reference-index.md
```

保持 Phase 2 已确定的视觉体系、runtime 与动画语言。

本阶段只完成：

> **Transformer 章节第 2～11 页**

不要进入 VAE / GAN / Diffusion 等文图生成主体，不要自行进入 Phase 4。

---

## 1. 当前状态

Phase 2 已经完成：

- 1920×1080 Slide Runtime
- 键盘切页与 Step reveal
- 深色网格视觉系统
- Transformer / Generation 双主题色
- `SlideFrame`
- ML 专用视觉组件
- 封面样板
- 第 4 页 Transformer 样板
- 第 17 页 Diffusion 样板

当前 registry 中已有：

```text
1   CoverSample
4   TransformerSample
17  DiffusionSample
```

本阶段补完整：

```text
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
```

其中第 4 页已有样板，应保留核心设计，只允许为章节一致性做小幅优化。

---

## 2. 总体叙事

Transformer 章节必须形成问题驱动链条：

```text
为什么 Transformer 重要
        ↓
RNN 如何表示顺序、又为何难并行
        ↓
Transformer 如何把顺序与关系计算解耦
        ↓
位置如何重新注入
        ↓
Attention 的直觉
        ↓
Q / K / V 的机制
        ↓
Multi-Head
        ↓
完整 Encoder / Decoder
        ↓
BERT / GPT / T5 分化
        ↓
ViT 与多模态
        ↓
进入文图生成
```

看完第 11 页后，观众应自然理解：

> Transformer 已经从 NLP 架构变成处理任意 token 的通用骨架，因此后半场图像生成与 Transformer 的合流是顺理成章的。

---

## 3. 参考资料使用

每页实现前先查：

```text
references/transformer/reference-index.md
```

再查看索引指向的：

```text
references/transformer/pages/
references/transformer/media/
references/transformer/text/
```

优先复用原 PPT 中：

- RNN 时间展开
- Encoder–Decoder
- Attention 权重变化
- Transformer 架构
- Self-Attention
- Q / K / V
- Multi-Head
- 位置编码

相关讲解逻辑和高质量素材。

不要机械复制原 PPT 页面。

技术准确性优先于原资料原话。

---

## 4. 第 2 页：为什么从 Transformer 开始讲

标题：

> **为什么从 Transformer 开始讲**

核心路径：

```text
NLP
 ↓
Transformer
 ↓
Language Model
 ↓
Vision
 ↓
Multimodal
 ↓
Image Generation
```

建议视觉做成逐步扩展的 token universe，而不是普通纵向流程图。

最终收束：

```text
Text Token
Image Token
Audio Token
Video Token
        ↓
   Transformer
```

页面结论：

> **Transformer 从一种 NLP 架构，逐渐演化成通用的信息处理骨架。**

建议 Step：

1. Text
2. Transformer
3. Language Model
4. Vision / ViT
5. Audio / Video / Multimodal
6. 突出 TOKEN

---

## 5. 第 3 页：Transformer 之前，RNN / LSTM 如何处理序列

标题：

> **Transformer 之前：顺序就是计算本身**

核心视觉：

```text
我 → 喜 → 欢 → 人 → 工 → 智 → 能
```

以及：

```text
h₁ → h₂ → h₃ → ... → h₇
```

强调：

> 后一个状态依赖前一个状态。

核心结论：

> **RNN 把“顺序”写进计算流程。**

然后展示两个问题：

### 串行依赖

```text
t₁ → t₂ → t₃ → ...
```

### 长距离依赖困难

用一个较长句子，将远距离相关词连接起来。

不要用大段文字。

优先参考 `reference-index.md` 中与 RNN / Seq2Seq 对应的页面。

页面底部：

> **顺序天然存在，但计算也被顺序锁住。**

---

## 6. 第 4 页：Transformer 把“顺序”与“关系计算”解耦

已有：

```text
src/slides/TransformerSample.tsx
```

保留：

- RNN → Transformer 对比
- `Q × Kᵀ`
- Attention Matrix
- 并行关系建模
- Position Encoding 与并行能力的因果分离

不得重做成完全不同的页面。

核心总结继续保持：

> **RNN：用时间传递位置。**  
> **Transformer：用位置编码描述位置，用矩阵乘法并行建模关系。**

---

## 7. 第 5 页：Position Encoding / RoPE

标题：

> **并行之后，顺序从哪里来？**

先展示问题：

```text
我 爱 你
```

vs

```text
你 爱 我
```

第一层：

```text
Token Embedding
      +
Position Encoding
      ↓
Transformer Input
```

明确：

> 2017 原始 Transformer 使用 Sinusoidal Positional Encoding。

第二层讲 RoPE 直觉：

```text
Q₁ → rotate(position 1)
Q₂ → rotate(position 2)

K₁ → rotate(position 1)
K₂ → rotate(position 2)
```

再：

```text
Q_rope K_ropeᵀ
```

不要推导 RoPE 数学公式。

页面结论：

> **Attention 负责“谁和谁相关”，位置编码负责“它们在哪里、相隔多远”。**

---

## 8. 第 6 页：Attention 的直觉

标题：

> **Attention：让当前 token 主动寻找信息**

示例：

> 小明把苹果给了小红，因为她饿了。

突出：

```text
她
```

动态连接：

```text
小红
小明
苹果
饿了
```

线宽 / opacity 表示权重。

核心对比：

RNN：

> 信息逐步传过来。

Attention：

> 当前 token 直接去整段输入中寻找自己需要的信息。

可以吸收参考 PPT 中 Bahdanau Attention 的讲解方式，但不能混淆：

```text
RNN Encoder–Decoder Attention
```

与：

```text
Transformer Self-Attention
```

页面结论：

> **Attention 不是“记住所有历史”，而是按当前需求动态取信息。**

---

## 9. 第 7 页：Q / K / V 到底是什么

标题：

> **Q / K / V：看谁，以及拿什么**

建议使用检索直觉：

```text
Query
我在找什么？

Key
我是什么？

Value
我能提供什么？
```

示例：

```text
Query("她")
     ↓
与所有 Key 比较
     ↓
小红：高匹配
小明：低匹配
苹果：很低
```

公式可正式出现一次：

```text
Attention(Q,K,V)
=
softmax(QKᵀ / √d) V
```

不推导。

拆解为：

```text
QKᵀ
→ 看谁

softmax
→ 变成权重

× V
→ 拿信息
```

页面结论：

> **Q / K 决定“看谁”，V 决定“拿什么信息”。**

优先复用 Phase 2 已有 Token / TokenRow / AttentionMatrix，但不要复制第 4 页布局。

---

## 10. 第 8 页：Multi-Head Attention

标题：

> **一个关系不够：同时从多个视角看**

同一句话可能存在：

- 语法关系
- 指代关系
- 局部词组
- 长距离语义

可以展示同一 Token Row 的四个 Head：

```text
Head 1 · Syntax
Head 2 · Reference
Head 3 · Local
Head 4 · Long-range
```

每个 Head 用不同连线或 mini heatmap。

不要做成 8 个等权卡片。

页面结论：

> **Multi-Head Attention 让模型同时学习多种关系模式。**

注意只能说不同 Head “可能 / 往往学习不同关系”，不能暗示职责被人工固定。

---

## 11. 第 9 页：完整 Transformer — Encoder + Decoder

标题：

> **完整 Transformer：理解与生成**

必须查看经典 Transformer 架构参考图，但正式页建议重绘简化版：

```text
Input
 ↓
Encoder × N
 ↓
Representation
 ↓
Cross Attention
 ↓
Decoder × N
 ↓
Output
```

分三步解释：

### Encoder Self-Attention

输入内部互相理解。

### Masked Self-Attention

生成时不能偷看未来。

### Cross-Attention

Decoder 从 Encoder 输出中取信息。

可用翻译例子：

```text
I love AI
    ↓
我 → 喜 → 欢 → AI
```

页面结论：

> **原始 Transformer 是一个完整的“理解 + 生成”系统。**

---

## 12. 第 10 页：Transformer 分成三条路线

标题：

> **同一架构，分化出三条路线**

建议做分叉：

```text
             Transformer
                 │
       ┌─────────┼─────────┐
       │         │         │
 Encoder     Decoder    Encoder–Decoder
       │         │         │
     BERT       GPT        T5
```

分别标：

```text
Encoder-only
理解 / 表征
```

```text
Decoder-only
自回归生成
```

```text
Encoder–Decoder
Sequence-to-Sequence
```

最后高亮：

```text
GPT → LLM
```

但不要扩展成 LLM 历史页。

页面结论：

> **大多数主流自回归 LLM 沿着 Decoder-only Transformer 路线规模化。**

---

## 13. 第 11 页：ViT 与多模态

标题：

> **Transformer 走出 NLP：图像也可以是 Token**

核心视觉：

```text
Image
 ↓
Patchify
 ↓
Patch Tokens
 ↓
Transformer
```

建议做实际 patch grid 动画。

随后类比：

```text
Language:
Word / Subword → Token

Vision:
Image Patch → Token
```

再扩展：

```text
Text Token
Image Token
Audio Token
Video Token
        ↓
   Transformer
```

可同时参考：

```text
references/image-generation/reference-index.md
```

中 ViT 对应页面和原图。

页面结论：

> **Transformer 不是“处理文字的模型”，而是一种处理 Token 的通用模型。**

最后一步作为 Phase 4 桥梁：

> **如果图像也能表示成 Token，我们是不是也能像生成文字一样生成图像？**

---

## 14. 允许新增的 ML 视觉 Pattern

本阶段可补充真正需要的组件，例如：

```text
AttentionLinks
PositionWave
RotaryPair
QKVFlow
HeadView
TransformerBlock
BranchDiagram
PatchGrid
ModalityToken
```

已有：

```text
Token
TokenRow
AttentionMatrix
ProcessArrow
NoiseFrame
```

适用时优先复用。

不要为 10 页制造几十个小组件。

---

## 15. 文件命名与 Registry

Phase 2 当前是：

```text
CoverSample.tsx
TransformerSample.tsx
DiffusionSample.tsx
```

进入正式章节后，可以合理重命名，例如：

```text
Slide01Cover.tsx
Slide02WhyTransformer.tsx
Slide03RNN.tsx
Slide04ParallelAttention.tsx
Slide05PositionEncoding.tsx
Slide06AttentionIntuition.tsx
Slide07QKV.tsx
Slide08MultiHead.tsx
Slide09EncoderDecoder.tsx
Slide10TransformerBranches.tsx
Slide11ViT.tsx
```

不是强制。

如果重命名，要保持 diff 清楚并更新 registry。

完成后 registry 至少包含：

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
17
```

第 17 页 Diffusion 样板暂时保留。

---

## 16. 动画原则

继续使用 Phase 2 已验证的语言：

```text
step reveal
focus / dim
fade
small translate
line draw
sequential highlight
matrix reveal
```

每页大约 4～9 个 Step，根据内容决定。

不要为了 Step 数量强行拆碎信息。

原则：

> 每一次按键都应该有明确的新信息出现。

---

## 17. 技术准确性检查

完成前逐页检查：

### RNN

不要说“RNN 完全没有长距离能力”。

应说长距离依赖更难学习和稳定传播。

### Self-Attention

Attention Matrix 不是人工定义的“语义关系表”。

### Position Encoding

必须区分：

```text
2017 Transformer → Sinusoidal Position Encoding
后续模型 → Learned / Relative / RoPE 等
```

### RoPE

不得声称：

> RoPE 让 Transformer 可以并行。

### Attention 历史

不得混淆 Bahdanau-style Encoder–Decoder Attention 与 Transformer Self-Attention。

### Multi-Head

不要声称某个 Head 被固定分配某种语义职责。

### GPT

不要绝对化为“所有现代 LLM 都完全一样”。

---

## 18. 来源标识

继续使用 Phase 2 的轻量 source label。

例如：

```text
VASWANI ET AL. · 2017
```

ViT：

```text
DOSOVITSKIY ET AL. · 2020
```

不要在主内容区放长 URL。

---

## 19. 本阶段禁止

不要：

- 开始 VAE
- 开始 GAN
- 开始 CLIP 正式页
- 开始 Diffusion 正式章节
- 开始 DiT / Flow
- 重做 Phase 2 Design System
- 大规模重构 runtime
- 删除第 17 页 Diffusion 样板
- 修改总体大纲
- 自行进入 Phase 4

如果 runtime 有小问题可以修，但不要借机重写架构。

---

## 20. 测试

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

检查：

1. 第 1～11 页连续播放
2. 每页 Step 前进 / 回退
3. URL hash
4. Home / End
5. 16:9 缩放
6. 全屏
7. Console
8. 图片 / SVG 路径
9. 页面标题与页码
10. 第 17 页样板仍可正常访问

---

## 21. Phase 3 验收标准

从第 1 页播放到第 11 页，应形成完整故事：

```text
Transformer 为什么重要
↓
RNN 为什么需要改变
↓
并行 Self-Attention
↓
Position
↓
Attention 直觉
↓
QKV
↓
Multi-Head
↓
Encoder / Decoder
↓
BERT / GPT / T5
↓
ViT
↓
Multimodal
```

视觉上：

- 明显属于 Phase 2 已确定的同一设计体系
- 不出现连续多页相同布局
- Matrix / Token / Path 等 ML 视觉模式得到真正使用
- 动画服务于讲解
- 每页有明确单一核心观点

---

## 22. 阶段结束汇报

完成 Phase 3 后停止，并汇报：

1. 新增了哪些正式 Slide
2. 第 4 页样板是否调整
3. 新增了哪些可复用 ML 组件
4. 每页主要参考了哪些 Phase 1 页面 / 素材
5. 是否发现并修正参考资料中的技术问题
6. Transformer 章节最终 Step 总数和节奏
7. `pnpm typecheck` 是否通过
8. `pnpm build` 是否通过
9. `pnpm visual:check` 是否通过
10. 当前已知问题
11. 希望用户重点验收哪些页面

**完成 Phase 3 后停止，不要自行进入 Phase 4。**
