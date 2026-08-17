# Page 024

```text
由于全部迭代都在小尺寸的隐空间进行，仅最后一次解码涉及高分辨率运算，整体计算开销远低于像
素空间扩散，使得高分辨率图像生成在消费级硬件上也变得可行。​




                          Stable Diffusion 推理流程图
 Stable Diffusion 推理流程图解释​
 1   上方：文本怎么变成条件信号​
 2   用户输入的提示词 "a person surfing a wave" 先经过 Text Tokenizer 切成 token，再送
     进 CLIP 文本编码器，输出一个 77×768 的矩阵——77 是 token 序列长度（固定填充），768 是每
     个 token 的嵌入维度。这个矩阵就是后面 U-Net 里 cross-attention 的 Key 和 Value。​
 3    ​
 4    左侧：起点是一张纯噪声​
 5    一个 64×64×4 的随机噪声张量作为 Latent Seed。注意不是 512×512 的像素图，而是压缩了 8
      倍的潜空间表示，这就是 "Latent" Diffusion 省算力的关键。​
 6    ​
 7    中间：U-Net + Scheduler 的迭代去噪循环​
 8    这是整张图的核心。每一轮迭代里，U-Net 同时接收当前的 noisy latent 和文本 embedding，预
      测出噪声；Scheduler（黄色标注的 "reconstruction algorithm"）根据这个预测决定怎么更新
      latent——减去多少噪声、保留多少信号。然后把更新后的 latent 送回 U-Net 再来一轮。这个循环
      重复 N 次（通常 20～50 步），latent 从纯噪声逐渐变成干净的、符合文本描述的图像表示。​
 9    ​
 10   右侧：VAE 解码器还原成像素​
 11   循环结束后，64×64 的去噪 latent 送进 VAE 解码器，一次性放大并还原为 512×512 的像素图
      像。​

核心贡献​
• 计算效率的质变： 把计算量降了一到两个数量级，让高分辨率图像生成变得实际可行，这是
  Stable Diffusion 能够被广泛部署和开源的技术基础。​
```
