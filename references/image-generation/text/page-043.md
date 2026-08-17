# Page 043

```text
7. LlamaGen (2024) ​
 💡 证明了即使不做任何和 VAR 类似的优化改造，直接暴力使用最标准的 LLM 架构也能超过扩
      散模型。​
   Autoregressive Model Beats Diffusion: Llama for Scalable Image Generation — Sun et al.
  (2024)https://arxiv.org/abs/2406.06525​
简介​
LlamaGen 用几乎与 Llama（Meta 的大语言模型）完全相同的架构来做图像生成，不添加任何视觉特
有的归纳偏置。它沿用 DALL·E 1 式的"图像 token 化 + 标准下一个 token 预测"路线，模型从 1.11 亿
个参数扩展到 31 亿个参数 参数，在 ImageNet 256×256 上达到 FID 2.18，超越了 LDM 和 DiT。其核
心论点是：纯粹的 LLM 架构无需任何修改，即可胜任图像生成。​
模型结构​
LlamaGen 刻意把结构压到最简，核心只有两件标准组件：​
• 图像 tokenizer： 一个高质量的（VQGAN 式）离散 tokenizer，把图像压缩为离散 token 序列、并
    能还原。论文强调 tokenizer 的质量是成败关键之一。​
• Llama 架构的自回归 Transformer： 直接采用 Llama 的标准设计（如 RMSNorm、SwiGLU、
    RoPE 等），不为图像添加任何专门改动，任务是标准的"下一个 token 预测"。正因架构与主流
    LLM 一致，它能直接复用 LLM 生态的训练与推理工具。​
训练过程​
训练与标准语言模型几乎无异，分 tokenizer 与自回归模型两步。​
• 第一阶段——训练 tokenizer： 训练一个高质量的离散图像 tokenizer，使其能把图像编码为
    token 序列并高保真还原。tokenizer 的重建质量直接决定了生成质量的上限，是本工作的重点之
    一。​
• 第二阶段——训练 Llama 式 Transformer： 把训练图像（及类别/文本条件）转成 token 序列，
    让 Llama 架构的 Transformer 做标准的"下一个 token 预测"，以负对数似然反向传播。整个训练
    流程与训练一个语言模型完全同构，无需任何视觉特有的改动，因而可直接套用成熟的 LLM 训练框
    架。​
生成过程​
生成沿用语言模型的逐 token 自回归续写，与 DALL·E 1 同构。​
• 逐 token 自回归采样： 以条件（类别或文本 token）为前缀，Transformer 逐个预测后续图像
    token，每生成一个便并入序列继续预测，直到凑齐整张图所需的 token。​
• 推理加速与解码： 由于架构与 LLM 一致，可直接借用 vLLM 等成熟推理优化工具，实现约 3–4 倍
    的推理加速；最后将生成的 token 经 tokenizer 解码还原为图像。
核心贡献​
```
