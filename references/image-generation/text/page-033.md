# Page 033

```text
参考文档​
卷积神经网络：​
https://medium.com/thedeephub/convolutional-neural-networks-a-comprehensive-guide-
5cc0b5eae175​
https://mlnotebook.github.io/post/CNN1/​
https://www.ibm.com/cn-zh/think/topics/convolutional-neural-networks?
regionCode=cn&languageCode=zh&cm-history=cn-zh​
https://cs231n.github.io/convolutional-networks/​
循环神经网络：​
https://cs231n.github.io/rnn/​
https://www.geeksforgeeks.org/machine-learning/introduction-to-recurrent-neural-network/​

2. VQ-VAE (2017) ​
 Neural Discrete Representation Learning — van den Oord et al. (DeepMind)
 (2017)https://arxiv.org/abs/1711.00937​
 💡 借用 VAE 思想，把「逐像素预测」升级成「逐 token 预测」。​
简介 ​
VQ-VAE（Vector Quantized Variational Autoencoder，向量量化变分自编码器）的关键创新，是用一
个离散码本（codebook）替代了 VAE 的连续潜空间：编码器输出的每个特征向量，都被替换为码本中
与之最接近的向量，从而把一张图像压缩成一串离散编号（token）。随后在这些离散 token 上训练
一个自回归先验模型（原文用 PixelCNN）进行采样生成。它把自回归图像生成从「逐像素预测」解放
到了「逐 token 预测」。
模型结构 ​
VQ-VAE 的核心组成：​
• 编码器（CNN）： 将输入图像下采样为一个二维的特征向量网格（如 32×32 个向量），每个向量
   代表图像中一小块区域的特征。​
• 码本： 维护一本固定大小的码本（如含 512 个向量，各带一个编号）。编码器输出的每个向量，都
   被替换为码本中与其欧氏距离最近的那个向量——这一步称为向量量化。替换后，整张图被表示为
   一串码本编号（离散 token），连续潜空间由此离散化。​
• 解码器（CNN）： 接收量化后的向量网格，将其上采样、重建回原始分辨率的图像。​
```
