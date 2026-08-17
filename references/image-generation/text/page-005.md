# Page 005

```text
VAE 用 2 维潜空间画的图。在潜空间里均匀取一堆点,每个点都用 decoder 解码成一张图,再按位置摆好。可以看到相
邻的图是缓慢渐变的：人脸的朝向、表情连续变化,数字也是一个慢慢变成另一个,中间没有断裂。这说明 VAE 的潜空
          间是连续平滑的,随便取一点都能生成合理的图,这正是它能随机生成、能平滑过渡的原因。
VAE 局限​
• 生成图像模糊： 由于使用像素级重建损失（MSE）以及 KL 散度对隐空间的过度正则化，VAE 生成
   的图像往往偏模糊，缺乏高频细节。​
VAE 地位 & 影响​
VAE 是整个生成模型领域的基石之一。​
它引入的「潜空间」概念被后来的 Stable Diffusion（Latent Diffusion Model）直接继承；​
其变体 VQ-VAE 将连续潜变量离散化成「视觉词典」，为自回归图像生成铺平了道路。​
可以说，VAE 虽然在生图质量上很快被 GAN 超越，但其"编码器-隐空间-解码器"的框架思想贯穿了此
后几乎所有主流生成架构。​
VAE 参考文档​
https://bluefisher.github.io/2020/02/07/%E7%90%86%E8%A7%A3-Variational-Autoencoders-
VAEs/ （推荐）​
https://www.jeremyjordan.me/variational-autoencoders/ ​
https://www.ibm.com/cn-zh/think/topics/variational-autoencoder#186915249​
https://www.vectorexplore.com/tech/auto-encoder/vae.html​
https://zhouyifan.net/2022/12/19/20221016-VAE/​
```
