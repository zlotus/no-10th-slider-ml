# Page 012

```text
https://www.datacamp.com/tutorial/vision-transformers（VIT）​
https://www.codecademy.com/article/vision-transformers-working-architecture-explained
（VIT）​
https://learnopencv.com/understanding-convolutional-neural-networks-cnn/（CNN）​
https://www.codecademy.com/article/understanding-convolutional-neural-network-cnn-
architecture（CNN）​


2. CLIP (2021) ​
 CLIP — Contrastive Language-Image Pre-training (2021)​
 Learning Transferable Visual Models From Natural Language Supervision — Radford et al.
 (OpenAI) (2021)https://arxiv.org/abs/2103.00020​
 💡 实现了图文的跨模态对齐。​
简介​
由 OpenAI 提出，是一个通过对比学习将图像和文本映射到同一语义空间的模型。​
它使用了从互联网收集的 4 亿个图像-文本对，训练一个图像编码器（ResNet 或 ViT）和一个文本编码
器（Transformer），使匹配的图文对在嵌入空间中距离更近，不匹配的更远。​




CLIP 架构图。把一批图片和对应的文字描述分别扔进两个编码器，得到两组向量，然后算它们两两之间的相似度，
配对的拉近，不配对的推远，蓝色对角线就是训练目标。右边是使用阶段：把候选类别（plane、car、dog、bird）
套进模板变成文字向量，再把待分类的图片变成图片向量，哪个文字向量离图片向量最近，那个类别就是答案，全程
                     不需要重新训练（ Zero-shot）
CLIP 的训练​
• 训练数据是从互联网上爬取的 4 亿个图文对（图片 + 对应的文字描述）。​
```
