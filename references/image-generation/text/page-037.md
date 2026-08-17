# Page 037

```text
核心贡献​
VQ-VAE 只有单层量化，难以兼顾全局和局部。VQ-VAE-2 的层级设计让生成质量大幅提升，首次在
FID 等指标上接近了同期的 GAN。​
局限​
• 仍依赖独立的先验模型： 生成质量受限于自回归先验（如 PixelCNN）的建模能力，且分层结构使
   训练与采样流程更复杂。​
• 对抗/感知质量仍有差距： 重建主要由像素级重建损失驱动，在感知真实感上仍不及引入对抗训练
   的方案（这一点由后续的 VQGAN 改进）。​
地位与影响​
证明了自回归路线在质量上有追赶 GAN 的潜力，也为后来 VQGAN 的进一步改进奠定了基础。​

4. VQGAN (2021) ​
 Taming Transformers for High-Resolution Image Synthesis — Esser et al.
 (2021)https://arxiv.org/abs/2012.09841​
 💡 在 VQ-VAE 的基础上引入 GAN 对抗训练和 Transformer 序列建模。​
简介​
VQGAN 把 GAN 的对抗训练引入 VQ-VAE 的 tokenizer 训练中。在 VQ-VAE 原有的重建损失之外，额
外加上一个 PatchGAN 判别器损失和感知损失，让码本学到更丰富、更感知一致的视觉表征，从而显
著提升图像离散化（压缩-还原）的质量。在生成端，则用 GPT-2 风格的 Transformer 替代
```
