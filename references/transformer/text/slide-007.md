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
