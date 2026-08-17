# Page 038

```text
PixelCNN，在离散 token 序列上做自回归生成。可以概括为：VQGAN = VQ-VAE 的离散量化 + GAN
的对抗训练 + Transformer 的序列建模。​




模型结构​
VQGAN 沿用"编码 → 量化 → 解码"的 VQ-VAE 框架，但在训练目标和先验模型两处做了关键升级：​
• 编码器 / 码本 / 解码器： 与 VQ-VAE 一致，负责把图像压缩为离散 token、再从 token 还原图像。​
• 判别器（来自 GAN）： 额外引入一个 PatchGAN 判别器，对重建图像的局部块判断真假，专门用
   来提升还原图的感知真实感。它只在训练 tokenizer 时使用，生成阶段不参与。​
• 自回归先验（Transformer）： 用 GPT-2 风格的 Transformer 替代 VQ-VAE 的 PixelCNN，在
   token 序列上学习"下一个 token"的分布。相比 PixelCNN，Transformer 建模能力更强、扩展性
   （scaling）更好。​
训练过程​
与 VQ-VAE 一样分两个阶段，差别集中在第一阶段的训练目标，以及第二阶段的先验换成了
Transformer。​
• 第一阶段——训练 tokenizer（含对抗训练）： 让图像经"编码 → 量化 → 解码"重建自身，但损失
   不再只是逐像素重建。VQGAN 同时施加三类损失：① 重建损失（保证还原大体正确）；② 感知损
   失（在特征层面比对，让结果更符合人眼感知）；③ 对抗损失（让 PatchGAN 判别器分不清重建图
   与真图，逼出清晰锐利的细节）。三者共同训练编码器、解码器与码本，量化不可导的问题仍沿用
   直通估计处理。这一阶段产出一个质量远高于 VQ-VAE 的图像 tokenizer。​
• 第二阶段——训练 Transformer 先验： 冻结 tokenizer，把训练图像转成 token 序列，训练一个
   GPT-2 风格的 Transformer 做标准的"下一个 token 预测"。此阶段与训练语言模型几乎完全相同，
   只是词表换成了视觉码本。​
生成过程​
```
