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
