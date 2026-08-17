# Page 025

```text
• 跨范式结合： 这篇论文是 VAE 和 DDPM 的优美结合——VAE 负责压缩/解码，DDPM 在压缩空间里
   做生成。感知压缩（VAE）和生成建模（扩散）分离，各自可以独立优化，并且可以灵活地接入各
   种条件机制（文本通过交叉注意力、图像布局通过拼接等）。​
• Cross-Attention 条件机制： 继承了 GLIDE 的思路，将文本条件通过 cross-attention 注入 U-
   Net，成为文本条件扩散模型的标准实现方式。​
• 开源与社区生态： Stability AI 基于 LDM 训练并开源了 Stable Diffusion，引发了 AI 生图的大众化
   浪潮，催生了 ControlNet、LoRA 微调、各种社区模型等庞大生态。​
局限性​
• VAE 重建瓶颈： 图像质量的上限受到 VAE 解码器的限制——VAE 会丢失部分高频细节，导致生成
   图像在精细纹理上可能不如像素级扩散模型。​
• 两阶段训练： 需要先训练好 VAE，再训练扩散模型，增加了流程复杂度。​
• 小物体和文字生成弱： 隐空间的压缩使得模型在生成精细文字、小物体等方面表现不佳。​
地位 & 影响​
这篇论文就是 Stable Diffusion 的学术基础。它的开源让整个社区爆发，直接催生了 Midjourney 等
生态。可以说是整个扩散生成领域影响力最大的一篇文章。​
Stable Diffusion 参考文档​
https://jalammar.github.io/illustrated-stable-diffusion/​
https://www.louisbouchard.ai/latent-diffusion-models/​

5. DALL·E 2 (2022) ​
 Hierarchical Text-Conditional Image Generation with CLIP Latents — Ramesh et al. (OpenAI)
 (2022) https://arxiv.org/abs/2204.06125​
 💡 通过「反转CLIP 」的创意来生图，提升扩散架构图文对齐质量。​
简介​
DALL·E 2 是 OpenAI 在 DALL·E 1 之后推出的第二代文生图模型，但技术路线发生了根本转变——从
自回归范式转向了扩散范式。​
它的核心创意是"反转 CLIP"：先用 CLIP 文本编码器将文本映射为文本嵌入，然后训练一个"Prior"模
型（扩散模型或自回归模型）将文本嵌入映射为 CLIP 图像嵌入，最后用一个扩散解码器从 CLIP 图像
嵌入生成图像。整个生成过程在 CLIP 的联合语义空间中展开，因而天然继承了 CLIP 强大的图文对齐
能力。​
模型结构​
```
