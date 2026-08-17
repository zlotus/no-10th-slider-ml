# Transformer PPTX 逐页提取文字

# Slide 001

## 人话版

《Attention is all you need》论文解读

Transformer

架构介绍

---

# Slide 002

## 主线：创新为何能取得革命性突破？

-《Attention is All You Need》核心创新点： Transformer 架构和 Self-Attention自注意力机制

思路

以往模型的结构和处理逻辑，它们存在的问题/瓶颈——结构为何会导致瓶颈?

涉及1、2节：Introduction & Backgroud

论文中创新性提出的模型结构，这样的结构解决了什么问题，为什么可以解决？

核心：Transformer 架构和 Self-Attention自注意力机制

涉及3、4节：Model Architecture & Why Self-Attention

论文地址

https://arxiv.org/abs/1706.03762

---

# Slide 003

## Sequence Transduction Model 序列转导模型

什么是序列转导模型（Sequence Transduction Model）

——是处理序列数据的模型

序列数据：具有顺序关系的数据，每个元素的顺序对于数据的整体含义非常重要

典型的序列转导任务

文本翻译：翻译前的文本("How are you") -> 翻译后的文本（“你好吗？”）；

文本生成：用户的输入文本("How are you?")  -> AI生成的回复文本("I'm fine, thank you.")；

语音转文字：一个音频片段 -> 音频的文字转写；

---

# Slide 004

## Feedforward Neural Network（FNN）前馈神经网络

y

输出层

V

隐藏层

W

x

输入层

---

# Slide 005

## Feedforward Neural Network（FNN）前馈神经网络

为什么不适合序列转导任务？

输入：水是有毒的

步骤一：分词（Tokenization）

["水", "是", "有毒", "的"]

步骤二：词向量表示（Embedding）

"水"    → [0.2, -0.1,  0.3, 0.0]

"是"    → [0.0,  0.5, -0.2, 0.1]

"有毒"  → [0.9, -0.3,  0.4, 0.2]

"的"    → [0.1,  0.0,  0.0, 0.1]

步骤三：合并词向量（平均或拼接）

平均

完全丢掉了词语的顺序

拼接

FNN 需要固定维度的输入，对不同长度的句子处理效率低下

仍然会将句子视作一个整体来处理，无法理解真正的“谁先谁后”的关系；

---

# Slide 006

## Recurrent Neural Network (RNN) 循环神经网络

RNN 解决的问题：

能够建模词序：RNN 是按时间顺序（token 顺序）逐个处理输入的；

能够建模上下文依赖：RNN 是逐个喂入词语，并且会有“记忆”机制；

支持不定长输入：不再需要 FNN 那种固定长度的输入格式，句子多长都行；

Williams, R. J., & Zipser, D. (1989). A learning algorithm for continually running fully recurrent neural networks. Neural computation, 1(2), 270-280.

Elman, J. L. (1990). Finding structure in time. Cognitive science, 14(2), 179-211.

---

# Slide 007

## Recurrent Neural Network (RNN) 循环神经网络

ht = g(Wxt + Uht-1)

yt = g(Vht)

xt: t时间步的输入

ht: t时间步的状态

yt: t时间步的输出（也可能没有）

U, V, W: 权重矩阵

ht中的g：激活函数，如ReLU，sigmoid，用于引入非线性，增强表达能力；同时限制数值范围，避免梯度爆炸/消失。

yt中的g：视任务而定，比如如果是分类问题，可能是 softmax 函数，用于把输出转成概率分布。

y

x

W

V

输出层

h

U

隐藏层

输入层

---

# Slide 008

## Recurrent Neural Network (RNN) 循环神经网络

ht = g(Wxt + Uht-1)

yt = g(Vht)

爱

h2

y2

x2

love

水

h3

y3

x3

easy

W

V

courses

我

h1

y1

x1

I

xt: t时间步的输入

ht: t时间步的状态

yt: t时间步的输出（也可能没有）

U, V, W: 权重矩阵

ht中的g：激活函数，如ReLU，sigmoid，用于引入非线性，增强表达能力；同时限制数值范围，避免梯度爆炸/消失。

yt中的g：视任务而定，比如如果是分类问题，可能是 softmax 函数，用于把输出转成概率分布。

y3

V

V

V

h4

h0

……

U

U

U

U

W

W

W

x4

课

t3

t4

t1

t2

---

# Slide 009

## Encoder and Decoder 编码器 - 解码器结构

编码器 - 解码器结构解决的问题

支持输入输出不等长

Sutskever, I., Vinyals, O., & Le, Q. V. (2014). Sequence to sequence learning with neural networks. Advances in neural information processing systems, 27.

---

# Slide 010

## Encoder and Decoder 编码器 - 解码器结构

Encoder

Decoder

love

easy

courses

I

h0

h1

h3

s0

s1

s3

h2

s2

h4

C

爱

水

课

我

C：“上下文向量（context vector）”

它是对整个输入序列的语义编码，是一个固定长度的向量，涵盖了整个输入文本的语义信息。

最简单的编码方式：C = 最后一个时间步的隐藏状态输出(h4)

它将作为 Decoder 的输入，用于生成目标序列。

---

# Slide 011

## Encoder and Decoder 编码器 - 解码器结构

Encoder

Decoder

love

easy

courses

I

h0

h1

h3

s0

s1

s3

h2

s2

h4

C

C

C

C

爱

水

课

我

C：“上下文向量（context vector）”

它是对整个输入序列的语义编码，是一个固定长度的向量，涵盖了整个输入文本的语义信息。

最简单的编码方式：C = 最后一个时间步的隐藏状态输出(h4)。

它将作为 Decoder 的输入，用于生成目标序列。

---

# Slide 012

## Attention Mechanism 注意力机制

注意力机制解决的问题：

解决模型处理长序列时的“遗忘”问题：随着序列长度的增长，远距离依赖信息在传递过程中易被稀释，导致模型对长距离依赖关系的建模能力减弱。

解决不同时间步输入对当前时刻输出的“重要性”问题：所有时间步的输入在计算当前时刻输出时被同等对待，忽略了不同时间步对当前时刻输出的重要性可能存在的差异。

Bahdanau, D., Cho, K., & Bengio, Y. (2014). Neural machine translation by jointly learning to align and translate. arXiv preprint arXiv:1409.0473.

---

# Slide 013

## Attention Mechanism 注意力机制

Encoder

Decoder

love

easy

courses

I

α02=0.1

α01=0.6

α03=0.2

α04=0.1

h0

h1

h3

s0

s1

s3

h2

s2

h4

C0

C1

C2

C3

我

爱

水

课

C0

= 0.6h1 +  0.1h2 + 0.2h3 + 0.1h4

---

# Slide 014

## Attention Mechanism 注意力机制

Encoder

Decoder

love

easy

courses

I

α12=0.7

α11=0.2

α13=0.1

α14=0

h0

h1

h3

s0

s1

s3

h2

s2

h4

C0

C1

C2

C3

我

爱

水

课

C1

= 0.2h1 +  0.7h2 + 0.1h3 + 0h4

---

# Slide 015

## Attention Mechanism 注意力机制

Encoder

Decoder

love

easy

courses

I

α22=0.1

α21=0.1

α23=0.4

α24=0.4

h0

h1

h3

s0

s1

s3

h2

s2

h4

C0

C1

C2

C3

我

爱

水

课

C2

= 0.1h1 +  0.1h2 + 0.4h3 + 0.4h4

---

# Slide 016

## 还有什么问题没被解决？

——串行化计算

---

# Slide 017

## Transformer & Self-Attention

能够建模词序

能够建模上下文依赖

支持不定长输入

支持输入输出不等长

解决处理长序列时的“遗忘”问题

解决不同时间步输入对当前时刻输出的“重要性”问题

解决串行化计算问题

RNN

编码器-解码器结构

注意力机制

Transformer & Self-Attention

Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., ... & Polosukhin, I. (2017). Attention is all you need. Advances in neural information processing systems, 30.

---

# Slide 018

## Introduction & Background 思路

为解决 RNN 顺序计算问题的研究：使用 CNN 尝试并行化

RNN：顺序计算的瓶颈

Extended Neural GPU / ByteNet / ConvS2S

↓

将 CNN 作为编码器，支持输入并行

↓

存在问题：信息传递距离仍受限制（ConvS2S 是线性，ByteNet 是对数级），远距离依赖建模仍困难

传统模型：RNN / LSTM / GRU

↓

逐步生成 hidden state

↓

优点：适合建模序列（如语言）

缺点：计算完全串行，无法并行；

长序列计算慢，难训练；梯度消失。

Memory Network：注意力机制替代 RNN 的递归

End-to-End Memory Network

↓

不再依赖 RNN，使用多轮注意力从“记忆”中读取信息

↓

存在问题：仍然有多轮递归过程（multi-hop attention），并不高效

引入 Attention 注意力机制

缓解信息瓶颈

Transformer：抛弃 RNN 和 CNN，只用 Self-Attention 自注意力机制

RNN + Attention

↓

加入注意力模块，聚焦重要输入位置

↓

优点：改善长距离依赖建模能力

缺点：依然使用 RNN，还是串行计算

Transformer 架构

↓

完全基于 Self-Attention，输入每个位置彼此之间做注意力（Q*K），可以完全并行训练所有位置；

多头注意力（Multi-Head Attention）提升表达能力

↓

优点：并行训练高效；建模远距离依赖只需一次注意力操作（O(1)）；

在翻译、语言建模等任务上刷新 SOTA

Background

Introduction

---

# Slide 019

## 三种不同的注意力机制 Attention Mechanism

RNN 引入注意力机制是为了弥补信息瓶颈，但仍是顺序处理；

Memory Network 把注意力用在“记忆检索”上，强调推理；但仍然有多轮递归过程，并不高效；

Transformer 的自注意力机制是“全局互相关注”，完全摆脱了序列结构，支持并行，是最底层的范式改变。

---
