# Page 040

```text
• dVAE（图像 tokenizer）： 沿袭 VQ-VAE 的离散化思想，将图像编码为一串离散图像 token，并能
  从 token 还原回图像。它扮演的是"图像分词器"角色，把连续的图像翻译成 Transformer 能处理的
  离散符号。​
• 自回归 Transformer（120 亿参数）： 系统的主体。它处理的是"文本 token + 图像 token"拼接
  而成的统一序列，任务是标准的"下一个 token 预测"，与 GPT 类语言模型在机制上完全一致。​
训练过程​
DALL·E 1 的训练分为两步：先得到图像 tokenizer，再在拼接序列上训练自回归 Transformer。​
• 第一阶段——训练 dVAE： 在图像数据上训练 dVAE，使其能把图像压缩为离散 token 序列、并高
  质量还原。完成后 dVAE 固定，作为后续的图像分词器。​
• 第二阶段——训练自回归 Transformer： 对每个图文对，先用文本分词器把文字编码为文本
  token，再用 dVAE 把图像编码为图像 token，将两者按"文本在前、图像在后"拼成一条长序列。
  Transformer 在这条序列上做标准的"下一个 token 预测"——根据前面所有 token（含全部文本
  token 与已出现的图像 token）预测下一个 token，以负对数似然反向传播。如此，模型学会了"读
  完一段文字描述后，接下来应当生成怎样的图像 token"。​
生成过程​
生成沿"文本 token 引导 → 自回归补全图像 token → 解码还原"展开。​
• 文本编码： 将用户输入的 prompt 用文本分词器编码为文本 token，作为序列的开头（条件）。​
• 自回归生成图像 token： Transformer 以这些文本 token 为前缀，逐个预测后续的图像 token——
  每生成一个就并入序列、作为下文继续预测，直到凑齐一整张图所需的图像 token。​
• 解码还原： 把生成的图像 token 交给 dVAE 解码器，还原成最终图像。整个流程与语言模型续写文
  本同构，差别仅在于"被续写"的是图像 token。​
核心贡献​
第一次向公众展示了「用文字描述生成任意图像」的能力，引爆了整个 text-to-image 赛道。​
局限​
• 生成质量不及同期扩散模型： 自回归逐 token 生成的画质与一致性，很快被随后的扩散模型（如
  GLIDE、DALL·E 2）反超。​
• 推理较慢： 逐 token 串行生成长图像序列，速度受限。​
• 闭源： 未开放模型权重，限制了学术复现。​


6. VAR (2024) ​
 Visual Autoregressive Modeling: Scalable Image Generation via Next-Scale Prediction — Tian
 et al. (北大 & 字节) (2024)https://arxiv.org/abs/2404.02905​
```
