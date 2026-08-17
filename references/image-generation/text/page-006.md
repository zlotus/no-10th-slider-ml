# Page 006

```text
2. GAN (2014) ​
 GAN — Generative Adversarial Network (2014) ​
 Generative Adversarial Nets — Goodfellow et al. (2014)https://arxiv.org/abs/1406.2661​
 💡 经典生图范式；训练「生成器」和「判别器」。​
简介​
生成对抗网络（Generative Adversarial Network, GAN）提出了一个全新的生成范式：通过两个网络
的博弈来学习数据分布。生成器（Generator）试图从随机噪声生成逼真的假样本，判别器
（Discriminator）试图区分真假样本。两者交替优化，最终达到纳什均衡——生成器生成的样本足
以"骗过"判别器。​




                                         GAN 网络架构
GAN 网络结构​
• 生成器： 接收一个固定维度的随机噪声向量（如 100 维）作为输入，经过若干层网络逐步上采样，
  输出一张与训练数据同尺寸的图像。原始论文使用全连接层（MLP），DCGAN（2015）将其替换
  为转置卷积网络，成为后续 GAN 变体的标准架构。​
```
