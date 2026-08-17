# Page 028

```text
局限性​
• 属性绑定问题： 继承了 CLIP 的弱点——在涉及多个对象和属性的组合场景中，容易出现属性混淆
  （如"红色的立方体和蓝色的球"可能生成颜色错误的搭配）。​
• 文字生成能力弱： 模型难以在生成的图像中正确渲染文字。​
• 多阶段复杂性： 需要分别训练 CLIP、Prior、Decoder 和上采样模型，整体流程较为复杂。​
• 闭源： DALL·E 2 未开源，限制了学术复现。​
地位与影响​
DALL·E 2 是当时最强的商业文生图产品；它也标志着文生图领域从自回归范式向扩散范式的转向。​
DALL·E 2 与 Google 同期发布的 Imagen（Saharia et al., 2022）一起，确立了“大规模文本编码器 +
扩散模型”作为文生图的主流架构。​

6. DiT (2022) ​
 DiT — Diffusion Transformer (2022)​
 Scalable Diffusion Models with Transformers — Peebles & Xie
 (2022)https://arxiv.org/abs/2212.09748​
 💡 将扩散模型的骨干网络从 U-Net 换成 Transformer。​
简介​
DiT 用 Transformer 替换 U-Net 作为扩散模型的骨干网络。在它之前，从 DDPM 到 Stable
Diffusion，扩散模型的去噪骨干一直是 U-Net（一种 CNN 架构）；而 ViT 早已证明 Transformer 在视
觉任务上不仅可行、且扩展性更优。DiT 正是把这一结论引入扩散范式：将带噪声的潜变量切成 patch
序列（继承 ViT 的思路），用标准 Transformer 块处理，并证明扩散模型的性能瓶颈不在 U-Net 架构
本身，而在于可扩展性。​
模型结构​
DiT 是 ViT、LDM、Transformer 三者思想的融合，整体作用在 LDM 式的潜空间中：​
• 潜空间输入（来自 LDM）： DiT 不在像素空间操作，而是先用一个预训练 VAE 把图像压缩为低维
    隐表示，扩散在这个隐空间中进行，以降低计算成本。​
• Patch 化与 token 序列（来自 ViT）： 将带噪声的隐表示切分为固定大小的 patch，每个 patch 线
    性投影为一个 token，从而把二维隐表示转化为一维 token 序列。​
• 标准 Transformer 骨干： 用一连串标准 Transformer 块处理该 token 序列，借注意力机制让每个
    patch 从第一层起就能与所有其他 patch 直接交互，全局信息捕捉效率高于逐层扩大感受野的 U-
    Net。​
```
