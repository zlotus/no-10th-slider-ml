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
