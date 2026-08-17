# Page 039

```text
生成沿"自回归生成 token 序列 → 解码还原图像"两步展开，与 VQ-VAE 同构，仅先验模型不同。​
• 逐 token 自回归采样： 用训练好的 Transformer 先验，从头逐个生成 token——依据已生成的
   token 预测下一个 token 的分布并采样，直到凑齐一整张图所需的 token 网格。​
• 解码还原： 将生成的 token 序列查回码本向量，送入解码器，还原成最终图像。得益于第一阶段更
   高质量的 tokenizer，最终图像在清晰度和细节上明显优于 VQ-VAE。​
核心贡献​
VQGAN = VQ-VAE 的离散量化 + GAN 的对抗训练 + Transformer 的序列建模。相比 VQ-VAE-2 用
PixelCNN 做先验，VQGAN 用 Transformer 做先验的选择更具可扩展性。​
局限​
• 两阶段训练复杂： 需先训含对抗损失的 tokenizer、再训 Transformer 先验，流程较长，且对抗训
   练本身带来 GAN 固有的不稳定性。​
• 自回归生成仍偏慢： 逐 token 串行采样的固有限制依旧存在，长 token 序列的生成速度受限。​
地位与影响​
VQGAN 成为自回归图像生成的标准 tokenizer 基线，至今很多工作仍在其基础上改进。它是三种范式
交叉的经典产物——同时融合了 VAE 的离散量化框架、GAN 的对抗训练与 Transformer 的序列建模。​

5. DALL·E 1 (2021) ​
 Zero-Shot Text-to-Image Generation — Ramesh et al. (OpenAI)
 (2021)https://arxiv.org/abs/2102.12092​
 💡 第一个大规模的文生图自回归模型。​
简介​
DALL·E 1 是 OpenAI 在 2021 年 1 月发布的文本到图像生成模型，是把"文本描述变成图像"这件事第
一次大规模、惊艳地展示给公众的工作之一。它把文本与图像统一成一条 token 序列，用单一的大型
Transformer 自回归地预测整个序列。架构由两部分组成：一个 dVAE（离散 VAE，作用类似 VQ-
VAE，负责把图像压缩成离散 token）和一个 120 亿参数的自回归 Transformer。训练数据为 2.5 亿
个文本-图像对。它第一次向公众直观展示了"用一句话生成任意图像"的能力。​
DALL·E 1 和 VQ-VAE-2 对照看，关键变化就是：把第二阶段的先验从 PixelCNN 换成了大规模
Transformer，并且把文本作为条件拼进了序列。​
模型结构​
DALL·E 1 把"文生图"彻底化简为"序列建模"，核心由两个组件构成：​
```
