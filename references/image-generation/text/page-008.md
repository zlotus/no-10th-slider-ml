# Page 008

```text
StyleGAN 的风格混合效果。 顶部一行(Source B)与最左一列(Source A)是各自独立生成的人脸,其余每张图都是把
Source B 的"粗粒度风格"(姿态、脸型、发型等)迁移到 Source A 上生成的结果。可以看到生成的人脸高度逼真、细
节自然(肤色、发丝、光照、表情皆栩栩如生),且能在不同人脸间自由迁移与组合特征——这些人物均不真实存在,全部
                          由 GAN 凭空生成,充分展现了 GAN 强大的图像生成能力。
 图片来源:Karras et al., A Style-Based Generator Architecture for Generative Adversarial Networks (StyleGAN),
                                  CVPR 2019, NVIDIA. arXiv:1812.04948
GAN 在 2014–2020 年间是图像生成领域的绝对主流范式。从 DCGAN（2015）引入卷积架构，到
StyleGAN（2018/2019）实现人脸生成的照片级逼真度，再到 BigGAN（2018）在 ImageNet 上生成
高分辨率图像，GAN 家族推动了生成质量的持续突破。​
然而，GAN 的训练不稳定和模式坍缩问题始终未被根本解决，这为后来扩散模型的崛起埋下了伏笔。​
GAN 的对抗训练思想也被后续大量工作借用。最典型的例子是 VQGAN（2021）。它把 GAN 的对抗损
失引入 VQ-VAE 的 tokenizer 训练中，大幅提升了图像离散化的质量，成为自回归范式的关键组件。​
2021 年，Diffusion Models Beat GANs 一文的诞生标志着 GAN 在无条件/有条件图像生成上的统治地
位正式被扩散模型终结。​
GAN 参考文档​
https://lilianweng.github.io/posts/2017-08-20-gan/​
https://jonathan-hui.medium.com/gan-whats-generative-adversarial-networks-and-its-
application-f39ed278ef09​
https://towardsai.net/p/machine-learning/diffusion-models-vs-gans-vs-vaes-comparison-of-
deep-generative-models​
```
