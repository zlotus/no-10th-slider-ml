# Page 021

```text
• 引导放大： 两次预测之差代表"文本条件额外施加的方向"，最终的去噪方向由无条件预测加上该差
   值的若干倍构成，即「无条件方向 + 引导强度 ×（有条件方向 − 无条件方向）」。引导强度越
   大，生成结果越贴合文本描述，但过大会牺牲多样性与真实感。​
• 迭代与上采样： 如此从纯噪声开始反复迭代，逐步浮现出符合文本的 64×64 图像，再经上采样扩
   散模型还原为 256×256 的最终结果。​
核心贡献​
• Classifier-Free Guidance 的实践验证： GLIDE 系统地展示了 Classifier-Free Guidance（CFG）
   在文生图任务上优于 CLIP 引导——生成的图像更逼真、更符合文本描述。CFG 无需额外分类器或
   CLIP 模型，直接在扩散模型内部完成引导。​
• 文本到图像的高质量扩散： 35 亿参数的 GLIDE 模型在人类评估中被认为优于 DALL·E 1（基于自
   回归的 120 亿参数模型），首次证明了扩散模型在文生图领域的竞争力。​
• 图像编辑能力： GLIDE 支持基于文本描述的 inpainting——用户可以遮盖图像的一部分，用文本描
   述要填充的内容，模型会生成语义一致的补全。​
局限性​
• 仍在像素空间操作： GLIDE 直接在 64×64 像素空间做扩散，再用上采样扩散模型提升到
   256×256，计算成本高昂。​
• 文本理解仍有限： 对复杂的组合语义和空间关系的理解不够精确。​
地位 & 影响​
GLIDE 处于从"扩散模型超越 GAN"到"扩散模型主导文生图"的关键过渡期。​
它确立了 Classifier-Free Guidance 作为文本引导扩散模型的标准方法，这一技术被后续的 DALL·E
2、Imagen、Stable Diffusion 等全面采纳。​
GLIDE 也直接启发了 DALL·E 2 的设计——后者在 GLIDE 的基础上引入 CLIP 嵌入作为中间表示，进一
步提升了文本-图像的对齐质量。​
GLIDE 参考文档​
https://ffighting.net/deep-learning-paper-review/diffusion-model/glide/​

4. LDM (2021) / Stable Diffusion ​
 High-Resolution Image Synthesis with Latent Diffusion Models — Rombach et al.
 (2021)https://arxiv.org/abs/2112.10752​
 💡 引入 VAE，在隐空间内生图，解决扩散架构的算力问题。​
简介​
```
