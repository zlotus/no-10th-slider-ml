# Page 017

```text
U-net架构。每个蓝色方块都是特征图，顶部标有通道数                    Diffusion Transformer (DiT) 架构
量，左下方标有高度x宽度尺寸。灰色箭头标记快捷连接。
核心贡献​
• 简化的训练目标： 将复杂的变分下界分解为每个时间步的去噪损失，最终等价于一个简单的 MSE
   噪声预测目标。这使得训练变得极为稳定和直观，与训练 GAN 的复杂性形成鲜明对比。​
• 高质量生成： 在 CIFAR-10 和 LSUN 等数据集上首次展示了扩散模型可以生成与 GAN 媲美甚至更优
   质的图像，且不存在模式坍缩问题。​
• 理论优雅性： 建立了前向扩散和反向去噪之间的严格数学对应关系，使得模型具有清晰的概率解
   释。​
局限​
• 采样速度慢： 反向去噪需要上千步迭代（如 T=1000），每一步都需要一次完整的网络前向传播，
   生成一张图像需要数分钟，远慢于 GAN 的单次前向传播。​
• 分辨率受限： 在像素空间直接做扩散的计算成本随分辨率平方增长，DDPM 的实验仅限于 32×32
   和 256×256。​
• 无条件生成： 原始 DDPM 仅做无条件生成，不支持文本、类别等条件引导。​
地位 & 影响​
DDPM 是扩散模型时代的真正开端。后续所有扩散模型（Stable Diffusion、DALL·E 2、Midjourney
等）都建立在 DDPM 的框架之上。​
DDPM 参考文档​
https://lilianweng.github.io/posts/2021-07-11-diffusion-models/（非常严谨清晰，推荐）​
https://learnopencv.com/denoising-diffusion-probabilistic-models/​
https://theaisummer.com/diffusion-models/​
https://zhouyifan.net/2023/07/07/20230330-diffusion-model/（中文）​
https://calvinyluo.com/2022/08/26/diffusion-tutorial.html​
```
