# Page 019

```text
Classifier Guidance & Classifier Free Guidance
• FID 首超 GAN： 在 ImageNet 256×256 和 512×512 上，扩散模型首次在 FID 指标上击败
   BigGAN-deep，标志着范式转折。​
局限性​
• 需要额外训练分类器： 分类器引导要求在噪声数据上训练一个独立的分类器，增加了训练成本和流
   程复杂度。​
• 仅支持类别条件： 分类器引导天然适合类别标签，但难以扩展到自由文本等更灵活的条件。​
• 采样仍然较慢： 虽然在质量上超越了 GAN，但采样速度仍然是 GAN 的百倍以上。​
地位 & 影响​
这篇论文是扩散范式崛起的标志性事件，它在实证上终结了 GAN 的统治地位。​
Classifier guidance 的思想后来被 classifier-free guidance 替代（不需要额外分类器，直接在训练时
随机 drop 条件），成为几乎所有条件生成模型（GLIDE、DALL·E 2、Stable Diffusion、Imagen ）的
标准做法。​

3. GLIDE (2021) ​
 GLIDE - Guided Language to Image Diffusion for Generation and Editing​
 GLIDE: Towards Photorealistic Image Generation and Editing with Text-Guided Diffusion
 Models — Nichol et al. (OpenAI) (2021)https://arxiv.org/abs/2112.10741​
 💡 实现了无需「分类器」的「自然语言生图」。​
```
