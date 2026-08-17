# Page 009

```text
https://aws.amazon.com/cn/what-is/gan/​

二、基础工作​
这两篇论文不直接属于任何生成范式，但它的研究成果对后续扩散和自回归两个范式的发展都起到了
极为关键的作用。​
1. ViT (2020) ​
 ViT — Vision Transformer (2020) ​
 An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale — Dosovitskiy et
 al. (2020)https://arxiv.org/abs/2010.11929​
 💡 证明了 Transformer 在视觉任务上的可行性。​
简介​
ViT 把图像识别（分类）这个任务，第一次完全用标准 Transformer 来做，不掺任何卷积，并且证明
只要数据够多，它能超过当时最好的 CNN。是将 NLP 领域大获成功的 Transformer 首次"纯粹地"应用
于计算机视觉的标志性工作​
ViT 的做法极为简洁：将图像切分为固定大小的 patch（例如 16×16），每个 patch 线性投影成一个
token，然后用标准 Transformer 处理这些 token 序列。在足够大的数据上训练后，ViT 超越了所有
CNN 模型。​




Vit 模型概览：将一张图像切分为固定大小的 patch，对每个 patch 做线性嵌入，加上位置编码，然后将得到的向量
                   序列送入标准的 Transformer 编码器。
```
