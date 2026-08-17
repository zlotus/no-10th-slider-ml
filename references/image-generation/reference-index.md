# AI 生图 PDF 逐页语义索引

本索引基于 47 页文本层、完整页面 PNG 和 34 个 `pdfimages` 提取文件逐页核对生成。路径均相对于本目录。PDF 中一幅“完整图”常由位图、文字和矢量对象共同组成，因此 `pages/` 是权威视觉参考，`media/` 只作为可复用原始素材补充；准确映射见 `page-media-map.md`。

## Page 1

### 主题
文图生成范式总览与 VAE / Autoencoder 起点。

### 本页核心内容
- 给出 VAE、GAN、Diffusion、自回归之间的演进目标。
- 从编码器—瓶颈—解码器的 Autoencoder 引出可生成潜空间。

### 重要视觉素材
- `pages/page-001.png`（无独立内嵌位图）

### 相关论文 / 模型
- Auto-Encoding Variational Bayes；VAE。

### 值得复用的讲解思路
- 以“让模型凭空画出一个不存在的人”建立生成任务直觉。

### 可支持当前大纲
- 第 12 页：图像生成在解决什么
- 第 13 页：VAE
- 第 24 页：十年演进时间线

### 备注
- 本页是长文开头，视觉密度高，适合取叙事而非直接裁页。

## Page 2

### 主题
Autoencoder 的结构、损失与 VAE 的概率化改造。

### 本页核心内容
- AE 学习确定性潜向量并以重建损失训练。
- VAE 把单点编码改为潜变量分布，为采样生成做准备。

### 重要视觉素材
- `pages/page-002.png`
- `media/image-000.png`（AE 编码—解码示意）

### 相关论文 / 模型
- Autoencoder；VAE。

### 值得复用的讲解思路
- 用“一个点 → 一片概率区域”解释 VAE 与普通 AE 的差异。

### 可支持当前大纲
- 第 13 页：VAE，学习一个可生成的潜空间

### 备注
- 数学公式在文本层与页面布局中分散，复用时以完整 PNG 核对。

## Page 3

### 主题
VAE 的均值、方差与连续潜空间直觉。

### 本页核心内容
- 编码器输出 `μ` 与 `σ`，由分布采样而不是直接给出固定向量。
- 用“笑容概率分布”等可视化帮助理解潜变量连续变化。

### 重要视觉素材
- `pages/page-003.png`
- `media/image-001.png`、`media/image-002.png`

### 相关论文 / 模型
- VAE；重参数化技巧。

### 值得复用的讲解思路
- “区域而非孤立点”很适合解释为什么能从潜空间采样。

### 可支持当前大纲
- 第 13 页：VAE

### 备注
- 人脸属性轴是教学隐喻，实际潜变量通常不会自动按“笑容/年龄”等可解释属性整齐解耦。

## Page 4

### 主题
VAE 完整训练目标与潜空间结构。

### 本页核心内容
- 重建项保证可还原，KL 项约束后验接近先验。
- 重参数化使随机采样路径可反向传播。

### 重要视觉素材
- `pages/page-004.png`
- `media/image-003.png`、`media/image-004.png`

### 相关论文 / 模型
- VAE；ELBO；reparameterization trick。

### 值得复用的讲解思路
- 将“能重建”和“能平滑采样”作为两个训练目标并列解释。

### 可支持当前大纲
- 第 13 页：VAE

### 备注
- 页面已提醒潜变量未必具有人为命名的独立语义，这一限定应保留。

## Page 5

### 主题
连续潜空间的可视化、VAE 局限与后续影响。

### 本页核心内容
- 人脸与 MNIST 流形展示潜空间的连续过渡。
- 像素级重建目标容易产生模糊，后续 VQ-VAE 与 Latent Diffusion 延续“潜空间”思想。

### 重要视觉素材
- `pages/page-005.png`
- `media/image-005.png`（潜空间流形图）

### 相关论文 / 模型
- VAE；VQ-VAE；Latent Diffusion。

### 值得复用的讲解思路
- “贡献是潜空间，问题是模糊”能自然接到后续生成范式。

### 可支持当前大纲
- 第 13 页：VAE
- 第 19 页：Stable Diffusion 的潜空间伏笔

### 备注
- 可优先裁取流形图；需保留“示意/数据集可视化”语境。

## Page 6

### 主题
GAN：生成器与判别器的对抗框架。

### 本页核心内容
- 生成器从噪声产生样本，判别器区分真伪。
- 两者通过对抗目标共同训练。

### 重要视觉素材
- `pages/page-006.png`
- `media/image-006.png`（GAN 架构图）

### 相关论文 / 模型
- Generative Adversarial Networks。

### 值得复用的讲解思路
- “造假者—鉴定者”双角色比喻直观，适合单页中心图。

### 可支持当前大纲
- 第 14 页：GAN

### 备注
- 原图可用，但应按项目统一视觉语言重排文字层级。

## Page 7

### 主题
GAN 的训练过程、贡献与不稳定性。

### 本页核心内容
- 交替更新判别器和生成器，目标形成极小极大博弈。
- 优点是清晰锐利；问题包括训练振荡、模式崩塌与难以稳定收敛。

### 重要视觉素材
- `pages/page-007.png`（无独立内嵌位图）

### 相关论文 / 模型
- GAN；minimax objective；mode collapse。

### 值得复用的讲解思路
- 先展示生成质量优势，再强调“高质量不等于易训练”。

### 可支持当前大纲
- 第 14 页：GAN

### 备注
- “训练到纳什均衡”是理论描述，不应暗示实践中一定达到精确均衡。

## Page 8

### 主题
StyleGAN 生成质量与 GAN 路线影响。

### 本页核心内容
- StyleGAN 的 style mixing 展示不同层级特征控制。
- GAN 推动高保真生成，同时 VQGAN 把对抗损失带入离散 tokenizer。

### 重要视觉素材
- `pages/page-008.png`
- `media/image-007.png`（高质量 style-mixing 人脸网格，优先复用）

### 相关论文 / 模型
- StyleGAN；VQGAN。

### 值得复用的讲解思路
- 用生成效果网格证明 GAN 的清晰度，再以训练难题转向 Diffusion。

### 可支持当前大纲
- 第 14 页：GAN
- 第 24 页：时间线中的 GAN 节点

### 备注
- “2021 年 GAN 统治结束”过于绝对；更准确是扩散模型开始在若干基准和应用上取代其主导地位。

## Page 9

### 主题
ViT：把图像切成 patch token 交给 Transformer。

### 本页核心内容
- 图像切块、线性投影、加入位置与类别 token，再进入 Transformer Encoder。
- 建立视觉输入与语言 token 序列之间的结构类比。

### 重要视觉素材
- `pages/page-009.png`
- `media/image-008.png`（ViT 官方架构图，优先复用）

### 相关论文 / 模型
- An Image is Worth 16×16 Words；ViT。

### 值得复用的讲解思路
- “图片 → patch → token”是 Transformer 与文图生成两条主线合流的关键桥梁。

### 可支持当前大纲
- 第 11 页：Transformer 走出 NLP，ViT 与多模态
- 第 25 页：两条路线合流

### 备注
- 位置编码是 ViT 保留二维排列信息的重要组成，不能只讲切块。

## Page 10

### 主题
CNN 的局部感受野与 ViT 的全局关系对照。

### 本页核心内容
- CNN 逐层从局部模式聚合到全局语义。
- ViT 让 patch 通过 Self-Attention 直接建立全局交互。

### 重要视觉素材
- `pages/page-010.png`（无独立内嵌位图）

### 相关论文 / 模型
- CNN；ViT。

### 值得复用的讲解思路
- 用“局部逐层汇聚”对比“patch 间全局关系”解释架构差异。

### 可支持当前大纲
- 第 11 页：ViT

### 备注
- “ViT 全面超越所有 CNN”过度概括；结论依赖数据规模、预训练、模型规模和任务设置。

## Page 11

### 主题
CNN 特征层级、ViT 的贡献与后续多模态影响。

### 本页核心内容
- 自行车示例展示 CNN 从边缘到部件再到对象的层级特征。
- ViT 证明纯 Transformer 可作为视觉主干，并影响 CLIP、DiT 与自回归视觉模型。

### 重要视觉素材
- `pages/page-011.png`
- `media/image-009.png`（CNN 层级特征示意，优先复用）

### 相关论文 / 模型
- CNN；ViT；CLIP；DiT。

### 值得复用的讲解思路
- 先肯定 CNN 的归纳偏置，再说明 ViT 用规模化数据换取统一架构。

### 可支持当前大纲
- 第 11 页：ViT 与多模态
- 第 21 页：DiT 的视觉 Transformer 背景

### 备注
- “直接催生 CLIP / DiT”因果过强；宜表述为 ViT 奠定或验证了视觉 Transformer 主干的可行性。

## Page 12

### 主题
CLIP：图文对比学习与共享语义空间。

### 本页核心内容
- 图像编码器和文本编码器分别输出表征，通过批内匹配进行对比学习。
- 推理时文本类别提示与图像表征做相似度比较。

### 重要视觉素材
- `pages/page-012.png`
- `media/image-010.png`（CLIP 官方三阶段架构）
- `media/image-011.png`（透明遮罩，不应单独当完整图使用）

### 相关论文 / 模型
- Learning Transferable Visual Models From Natural Language Supervision；CLIP。

### 值得复用的讲解思路
- “正确图文靠近、错误组合远离”是比公式更适合演讲的核心直觉。

### 可支持当前大纲
- 第 16 页：CLIP
- 第 23 页：现代文图系统的文本/视觉编码模块

### 备注
- 原始 `image-010` 与 `image-011` 共同参与页面合成，完整页面最可靠。

## Page 13

### 主题
CLIP 训练、零样本使用与文生图条件接口。

### 本页核心内容
- 对比学习建立图文语义对齐，可用于零样本分类和生成模型条件。
- 讨论 CLIP 的数据偏差、细粒度空间关系与生成能力边界。

### 重要视觉素材
- `pages/page-013.png`（无独立内嵌位图）

### 相关论文 / 模型
- CLIP；Stable Diffusion v1 文本编码器。

### 值得复用的讲解思路
- 强调 CLIP 负责“理解/对齐语义”，它本身并不负责逐步生成像素。

### 可支持当前大纲
- 第 16 页：CLIP
- 第 20 页：文本如何进入 Diffusion

### 备注
- 对比学习不是简单把正样本强制到 1、负样本强制到 0；Stable Diffusion v1 使用的是 77×768 token 序列，不是单个 512 维向量。后续模型的文本编码器也不都采用 CLIP。

## Page 14

### 主题
DDPM 起点：从高斯噪声学习逆向去噪。

### 本页核心内容
- 正向过程逐步加噪，反向模型学习恢复数据。
- 训练以随机时间步的噪声预测为核心。

### 重要视觉素材
- `pages/page-014.png`
- `media/image-012.jpg`（噪声过程示意）

### 相关论文 / 模型
- Denoising Diffusion Probabilistic Models；DDPM。

### 值得复用的讲解思路
- 用“先系统性破坏，再学习每一步修复”建立 Diffusion 直觉。

### 可支持当前大纲
- 第 17 页：Diffusion
- 第 18 页：DDPM

### 备注
- 该内嵌图视觉信息较弱，Page 15–16 的过程图更值得优先使用。

## Page 15

### 主题
DDPM 的正向 Markov 链与逆向生成链。

### 本页核心内容
- `x0 → xT` 逐步加入噪声；生成时从 `xT` 逐步去噪回 `x0`。
- 正向转移有解析形式，反向转移由神经网络近似。

### 重要视觉素材
- `pages/page-015.png`
- `media/image-013.png`（双向扩散链，优先复用）

### 相关论文 / 模型
- DDPM。

### 值得复用的讲解思路
- 双向时间轴可直接改造成加噪/去噪动画。

### 可支持当前大纲
- 第 17 页：Diffusion，从噪声恢复图像
- 第 18 页：DDPM

### 备注
- 这是解释扩散过程最清楚的来源页之一。

## Page 16

### 主题
DDPM 的公式、噪声预测训练与 U-Net 去噪器。

### 本页核心内容
- 展示前向闭式采样、随机时间步训练和反向采样。
- 以 U-Net 预测噪声，向日葵序列展示图像逐步被噪声覆盖。

### 重要视觉素材
- `pages/page-016.png`
- `media/image-014.png`（公式与向日葵加噪序列）

### 相关论文 / 模型
- DDPM；U-Net。

### 值得复用的讲解思路
- 演讲可保留“一条训练公式 + 一条图像序列”，其余推导移到讲稿。

### 可支持当前大纲
- 第 17 页：Diffusion
- 第 18 页：DDPM 为什么成为拐点

### 备注
- 原页公式密集，不应整页照搬；裁图时核对符号含义。

## Page 17

### 主题
U-Net 与 DiT 去噪主干对照；DDPM 的贡献与代价。

### 本页核心内容
- 左右并列卷积 U-Net 与 Transformer block 去噪器。
- DDPM 训练稳定、覆盖较好，但像素空间多步采样计算昂贵。

### 重要视觉素材
- `pages/page-017.png`
- `media/image-015.png`（U-Net）、`media/image-016.png`（DiT；两者均值得复用）

### 相关论文 / 模型
- DDPM；U-Net；DiT。

### 值得复用的讲解思路
- 这组并列图可作为“生成过程不变，去噪主干可替换”的伏笔。

### 可支持当前大纲
- 第 18 页：DDPM
- 第 21 页：Diffusion Transformer

### 备注
- DiT 不是 DDPM 原论文的一部分，页面是在做后见式架构对照。

## Page 18

### 主题
Improved Diffusion、对 GAN 的基准突破与 classifier guidance。

### 本页核心内容
- 改进方差、采样与模型规模后，扩散模型在 ImageNet 生成基准上逼近或超过 GAN。
- 外部分类器梯度可在采样时引导类别条件。

### 重要视觉素材
- `pages/page-018.png`（无独立内嵌位图）

### 相关论文 / 模型
- Improved DDPM；Diffusion Models Beat GANs on Image Synthesis；classifier guidance。

### 值得复用的讲解思路
- “稳定但慢的 DDPM，经过工程与引导改进成为质量拐点”适合时间线叙事。

### 可支持当前大纲
- 第 18 页：DDPM 为什么成为拐点
- 第 24 页：时间线

### 备注
- “Beat GANs”是特定基准与设定下的论文结论，不应扩写成所有任务全面胜出。

## Page 19

### 主题
Classifier Guidance 与 Classifier-Free Guidance。

### 本页核心内容
- 对比使用外部分类器梯度和在同一去噪模型中混合有/无条件预测。
- CFG 免去额外分类器，成为文生图常用引导方式。

### 重要视觉素材
- `pages/page-019.png`
- `media/image-017.png`（两种 guidance 对照，优先复用）

### 相关论文 / 模型
- Classifier-Free Diffusion Guidance；GLIDE。

### 值得复用的讲解思路
- 用同一张图说明“条件强度”是采样时可调的旋钮。

### 可支持当前大纲
- 第 18 页：DDPM（条件控制补充）
- 第 20 页：文本如何进入 Diffusion

### 备注
- CFG 是有条件与无条件噪声预测的线性组合，不等于 Cross-Attention 本身。

## Page 20

### 主题
GLIDE：文本条件扩散、CFG 与 Cross-Attention。

### 本页核心内容
- 文本编码结果通过注意力层影响 U-Net 去噪过程。
- 文本条件与无条件分支共同实现 classifier-free guidance。

### 重要视觉素材
- `pages/page-020.png`
- `media/image-018.png`（GLIDE 结构示意）

### 相关论文 / 模型
- GLIDE；Transformer text encoder；U-Net；Cross-Attention。

### 值得复用的讲解思路
- 可把“文本决定每一步该去掉什么噪声”作为跨模态控制的直觉。

### 可支持当前大纲
- 第 20 页：文本如何进入 Diffusion，Cross-Attention

### 备注
- 原页是压缩后的系统图；具体层配置应以论文为准，勿从简图外推全部实现。

## Page 21

### 主题
GLIDE 的贡献与算力瓶颈；转向 Latent Diffusion。

### 本页核心内容
- GLIDE 证明文本条件扩散的可扩展性，但仍在像素空间进行昂贵去噪。
- “是否必须在每个像素上迭代？”自然引出潜空间扩散。

### 重要视觉素材
- `pages/page-021.png`（无独立内嵌位图）

### 相关论文 / 模型
- GLIDE；Latent Diffusion Models。

### 值得复用的讲解思路
- 这是“质量已解决，成本仍未解决”的清晰转折页。

### 可支持当前大纲
- 第 19 页：Stable Diffusion 为什么真正普及

### 备注
- 页面文本较多，适合作为叙事来源，不宜直接裁用。

## Page 22

### 主题
Latent Diffusion 的组件与两阶段训练。

### 本页核心内容
- Autoencoder 将图像压缩到潜表示，扩散过程只在潜空间运行。
- 条件编码器提供文本/布局等条件，解码器最后还原图像。

### 重要视觉素材
- `pages/page-022.png`（无独立内嵌位图）

### 相关论文 / 模型
- High-Resolution Image Synthesis with Latent Diffusion Models；LDM；Stable Diffusion。

### 值得复用的讲解思路
- “先压缩，再去噪，最后解码”可作为整页三步主视觉。

### 可支持当前大纲
- 第 19 页：Stable Diffusion / Latent Diffusion
- 第 23 页：现代系统不是一个网络

### 备注
- 原始 LDM 论文的不同实验可用不同条件编码器；Stable Diffusion v1 才是常见的冻结 CLIP 文本编码器配置，勿混为一谈。

## Page 23

### 主题
LDM 官方总图：像素空间、潜空间与条件机制。

### 本页核心内容
- 左侧 Autoencoder 建立 `x ↔ z`；中间潜空间 U-Net 负责扩散；右侧条件编码器通过 Cross-Attention 注入信息。
- 图中明确给出 `Q` 来自去噪特征、`K/V` 来自条件序列。

### 重要视觉素材
- `pages/page-023.png`
- `media/image-019.png`（LDM 官方架构图，最高优先级复用）

### 相关论文 / 模型
- LDM；Autoencoder；U-Net；Cross-Attention。

### 值得复用的讲解思路
- 同一幅图可拆成三次讲解：潜空间、去噪主干、文本条件注入。

### 可支持当前大纲
- 第 19 页：Stable Diffusion
- 第 20 页：Cross-Attention
- 第 23 页：现代文图系统组件

### 备注
- 原图信息密集，优先分区裁切或重绘；保持 Q/K/V 来源准确。

## Page 24

### 主题
Stable Diffusion 推理数据流。

### 本页核心内容
- Prompt 经 tokenizer / text encoder 形成 77×768 条件序列。
- 随机潜变量经多步条件去噪，再由 VAE decoder 还原为图像。

### 重要视觉素材
- `pages/page-024.png`
- `media/image-020.png`（Stable Diffusion 完整推理图，最高优先级复用）

### 相关论文 / 模型
- Stable Diffusion v1；CLIP text encoder；U-Net；VAE。

### 值得复用的讲解思路
- 用真实 tensor 尺寸说明“文本序列控制潜空间去噪”，但只保留最关键的 2–3 个尺寸。

### 可支持当前大纲
- 第 19 页：Stable Diffusion
- 第 20 页：Cross-Attention
- 第 23 页：现代系统组件图

### 备注
- 结构和尺寸主要对应 Stable Diffusion v1，不应泛化到所有后续模型。

## Page 25

### 主题
Latent Diffusion 的贡献、局限与 DALL·E 2 过渡。

### 本页核心内容
- 潜空间显著降低训练与采样计算量，使高分辨率扩散更实用。
- Autoencoder 压缩会带来细节上限，U-Net 与多步采样仍有成本。

### 重要视觉素材
- `pages/page-025.png`（无独立内嵌位图）

### 相关论文 / 模型
- LDM；Stable Diffusion；DALL·E 2。

### 值得复用的讲解思路
- 把“普及”归因于质量、可控性与成本的共同改善，而非单一指标。

### 可支持当前大纲
- 第 19 页：Stable Diffusion 为什么普及

### 备注
- “可在消费级显卡运行”强依赖分辨率、精度、优化和具体硬件，应避免无条件承诺。

## Page 26

### 主题
DALL·E 2 / unCLIP：文本、CLIP 图像表征与扩散解码。

### 本页核心内容
- Prior 从文本表征预测 CLIP 图像表征。
- Decoder 以图像表征为条件生成图像，并可配合超分辨率阶段。

### 重要视觉素材
- `pages/page-026.png`
- `media/image-021.png`（unCLIP 官方总图，优先复用）

### 相关论文 / 模型
- Hierarchical Text-Conditional Image Generation with CLIP Latents；DALL·E 2；unCLIP。

### 值得复用的讲解思路
- 清楚分离“理解文字想要什么”和“把语义表征画出来”两个子问题。

### 可支持当前大纲
- 第 16 页：CLIP
- 第 23 页：现代文图系统由多个网络协作
- 第 24 页：时间线

### 备注
- 该结构不同于 Stable Diffusion 的 token-level Cross-Attention，不要用同一箭头含糊替代。

## Page 27

### 主题
DALL·E 2 的训练、生成流程与优缺点。

### 本页核心内容
- CLIP、Prior、Decoder 可分阶段训练；生成时按文本 → 图像表征 → 像素展开。
- 语义组合和编辑能力强，但系统复杂、资源需求大。

### 重要视觉素材
- `pages/page-027.png`（无独立内嵌位图）

### 相关论文 / 模型
- DALL·E 2；CLIP prior；diffusion decoder。

### 值得复用的讲解思路
- 用“语义空间作中间接口”说明 CLIP 不只是评分器。

### 可支持当前大纲
- 第 16 页：CLIP
- 第 23 页：多组件系统

### 备注
- 页面偏讲稿，优先复用结构关系，不复用整页排版。

## Page 28

### 主题
DALL·E 2 局限与 DiT 的动机。

### 本页核心内容
- U-Net 去噪主干带有卷积归纳偏置和专用结构。
- 提出问题：既然 Transformer 已在视觉表征中规模化，能否直接做扩散去噪主干？

### 重要视觉素材
- `pages/page-028.png`（无独立内嵌位图）

### 相关论文 / 模型
- DALL·E 2；Scalable Diffusion Models with Transformers；DiT。

### 值得复用的讲解思路
- “扩散负责生成过程，主干网络可以从 U-Net 换成 Transformer”是关键转折。

### 可支持当前大纲
- 第 21 页：Diffusion Transformer

### 备注
- “系统复杂”不是 DiT 唯一或直接要解决的问题；DiT 主要研究可扩展的 Transformer 去噪主干。

## Page 29

### 主题
DiT 官方架构与条件注入方式。

### 本页核心内容
- 潜变量切成 patch token，经 Transformer blocks 预测噪声/方差。
- 官方图比较 in-context、Cross-Attention、adaptive layer norm 与 adaLN-Zero 条件方式。

### 重要视觉素材
- `pages/page-029.png`
- `media/image-022.png`（DiT 官方 Figure 3，最高优先级复用）

### 相关论文 / 模型
- DiT；adaLN-Zero；Latent Diffusion。

### 值得复用的讲解思路
- 先动画化“潜变量切 patch”，再展示 Transformer block，最后补条件入口。

### 可支持当前大纲
- 第 21 页：Diffusion Transformer
- 第 23 页：现代系统的去噪主干

### 备注
- DiT 论文主实验以类别条件为主；文生图常见的 Cross-Attention / MMDiT 是后续扩展，不能全部归给原始 DiT。

## Page 30

### 主题
DiT 的规模化意义与自回归图像生成转场。

### 本页核心内容
- DiT 显示 Transformer 可作为扩散主干并随计算规模提升。
- 转入另一条路线：把图像离散化后按序列自回归生成。

### 重要视觉素材
- `pages/page-030.png`（无独立内嵌位图）

### 相关论文 / 模型
- DiT；PixelRNN；PixelCNN；VQ-VAE；DALL·E 1。

### 值得复用的讲解思路
- 同一 Transformer 可以服务“扩散去噪”和“下一 token 预测”，适合作为两路线合流提示。

### 可支持当前大纲
- 第 15 页：自回归图像生成
- 第 21 页：DiT
- 第 25 页：最终合流

### 备注
- 称 DiT 为扩散与自回归的“直接桥梁”偏概念化；两者共享主干家族，但训练目标和采样过程不同。

## Page 31

### 主题
PixelRNN / PixelCNN：逐像素自回归建模。

### 本页核心内容
- 将图像像素分解为有顺序的条件概率乘积。
- RNN 或 masked convolution 建模已生成像素到下一个像素的依赖。

### 重要视觉素材
- `pages/page-031.png`
- `media/image-023.png`、`media/image-025.png`（配套遮罩为 `image-024.png`、`image-026.png`）

### 相关论文 / 模型
- PixelRNN；PixelCNN。

### 值得复用的讲解思路
- 用光栅扫描箭头说明“图像被强行摊成生成顺序”。

### 可支持当前大纲
- 第 15 页：自回归图像生成的历史背景

### 备注
- PixelRNN 家族存在行级/对角线等并行技巧，勿一概称每个计算都绝对串行；生成依赖仍是主要瓶颈。

## Page 32

### 主题
PixelCNN 的并行训练、串行生成与局限。

### 本页核心内容
- Masked convolution 允许训练时并行计算位置损失。
- 采样时仍需按顺序逐像素生成，分辨率提升会显著增加步骤。

### 重要视觉素材
- `pages/page-032.png`
- `media/image-027.png`（卷积网络示意）

### 相关论文 / 模型
- PixelCNN；masked convolution。

### 值得复用的讲解思路
- “训练能并行 ≠ 生成能并行”是值得贯穿 Transformer 与自回归章节的准确限定。

### 可支持当前大纲
- 第 15 页：自回归图像生成的优缺点

### 备注
- 页面中的 LeNet 风格图主要解释卷积，不是 PixelCNN 生成结构的完整官方图。

## Page 33

### 主题
VQ-VAE：把连续图像压成离散 token。

### 本页核心内容
- 编码器输出映射到离散 codebook，解码器从量化 token 重建图像。
- 离散 token 使 PixelCNN / Transformer 能像语言模型一样学习图像先验。

### 重要视觉素材
- `pages/page-033.png`（无独立内嵌位图）

### 相关论文 / 模型
- Neural Discrete Representation Learning；VQ-VAE。

### 值得复用的讲解思路
- “图像 tokenizer”是把 Transformer 与图像生成连接起来的最直接概念。

### 可支持当前大纲
- 第 15 页：把图片也变成 token
- 第 25 页：Transformer 与生成路线合流

### 备注
- 本页是章节入口，结构图见下一页。

## Page 34

### 主题
VQ-VAE 官方结构、量化与两阶段训练。

### 本页核心内容
- 编码器特征就近查找 codebook 向量，经过量化后由解码器重建。
- 先训练 tokenizer，再冻结它并训练离散 token 的自回归先验。

### 重要视觉素材
- `pages/page-034.png`
- `media/image-028.png`（VQ-VAE 官方 Figure 1，最高优先级复用）

### 相关论文 / 模型
- VQ-VAE；codebook；straight-through estimator；PixelCNN prior。

### 值得复用的讲解思路
- 把“编码—查码本—得到 token—解码”拆成四步，比直接讲损失更易懂。

### 可支持当前大纲
- 第 15 页：自回归图像生成，把图片变成 token
- 第 23 页：现代系统的 tokenizer / decoder 组件

### 备注
- 表格与公式可作讲稿参考；演讲主视觉优先使用上半部分 Figure 1。

## Page 35

### 主题
VQ-VAE 生成流程、单层表示的局限与 VQ-VAE-2 过渡。

### 本页核心内容
- 先自回归生成离散 token，再经解码器还原图像。
- 单层 codebook 难兼顾全局结构和局部细节，引出层次化量化。

### 重要视觉素材
- `pages/page-035.png`（无独立内嵌位图）

### 相关论文 / 模型
- VQ-VAE；VQ-VAE-2。

### 值得复用的讲解思路
- “tokenizer 解决表示，prior 解决生成”清楚分开两个模块。

### 可支持当前大纲
- 第 15 页：自回归图像生成

### 备注
- 页面更适合提炼概念，不宜直接作为视觉素材。

## Page 36

### 主题
VQ-VAE-2 的上下两级离散潜表示。

### 本页核心内容
- 顶层 token 表达全局结构，底层 token 表达纹理与边缘等局部细节。
- 先生成顶层，再以顶层为条件生成底层，最后联合解码。

### 重要视觉素材
- `pages/page-036.png`
- `media/image-029.png`（VQ-VAE-2 层级架构图，优先复用）

### 相关论文 / 模型
- Generating Diverse High-Fidelity Images with VQ-VAE-2；hierarchical priors。

### 值得复用的讲解思路
- “先搭全局骨架，再补局部细节”是层级自回归的强视觉隐喻。

### 可支持当前大纲
- 第 15 页：自回归图像生成（进阶素材）

### 备注
- 结构细节较多，若大纲不扩页可只在讲稿或备选素材中使用。

## Page 37

### 主题
VQ-VAE-2 训练算法、贡献与 VQGAN 入口。

### 本页核心内容
- 两级 tokenizer 与两个先验带来更高质量，也增加训练和采样复杂度。
- 像素重建的感知质量仍有限，为 VQGAN 的感知/对抗损失做铺垫。

### 重要视觉素材
- `pages/page-037.png`
- `media/image-030.png`（训练算法截图）

### 相关论文 / 模型
- VQ-VAE-2；PixelCNN priors；VQGAN。

### 值得复用的讲解思路
- “层级解决尺度，却没彻底解决感知质量”延续问题驱动叙事。

### 可支持当前大纲
- 第 15 页：自回归图像生成（讲稿背景）
- 第 24 页：时间线

### 备注
- 算法伪码不适合作为基础听众的主 Slide 视觉。

## Page 38

### 主题
VQGAN：离散 tokenizer、感知/对抗训练与 Transformer 先验。

### 本页核心内容
- tokenizer 采用 VQ 框架，并以重建、感知和 PatchGAN 对抗损失提高还原质量。
- 第二阶段用 Transformer 对离散视觉 token 做自回归建模。

### 重要视觉素材
- `pages/page-038.png`
- `media/image-031.png`（VQGAN 官方 Figure 2，最高优先级复用）

### 相关论文 / 模型
- Taming Transformers for High-Resolution Image Synthesis；VQGAN；PatchGAN。

### 值得复用的讲解思路
- 一张图同时呈现 VAE 的量化、GAN 的训练信号与 Transformer 的序列先验，适合“范式交叉”总结。

### 可支持当前大纲
- 第 15 页：把图片变成 token
- 第 25 页：两条路线合流

### 备注
- 判别器只参与 tokenizer 训练，不参与生成时解码；这一点值得明确。

## Page 39

### 主题
VQGAN 的生成、贡献与 DALL·E 1 转场。

### 本页核心内容
- Transformer 逐 token 采样离散网格，VQGAN decoder 还原图像。
- 高质量 tokenizer 改善离散生成，但自回归串行采样仍慢。

### 重要视觉素材
- `pages/page-039.png`（无独立内嵌位图）

### 相关论文 / 模型
- VQGAN；DALL·E 1。

### 值得复用的讲解思路
- “同样是下一 token，只是词表换成视觉码本”可直接连接 GPT 直觉。

### 可支持当前大纲
- 第 15 页：自回归图像生成

### 备注
- “VQGAN 是标准 tokenizer 基线”应理解为重要历史基线，不是所有现代系统的统一方案。

## Page 40

### 主题
DALL·E 1：文本 token 与图像 token 的统一自回归序列。

### 本页核心内容
- dVAE 将图像压成离散 token；大型 Transformer 对“文本在前、图像在后”的拼接序列做下一 token 预测。
- 生成沿文本条件 → 图像 token → decoder 展开。

### 重要视觉素材
- `pages/page-040.png`（无独立内嵌位图）

### 相关论文 / 模型
- Zero-Shot Text-to-Image Generation；DALL·E 1；dVAE；Transformer。

### 值得复用的讲解思路
- 这是大纲第 15 页最直接的机制来源：文字和图片第一次被放进同一 token 序列。

### 可支持当前大纲
- 第 15 页：自回归图像生成
- 第 24 页：时间线
- 第 25 页：模态统一

### 备注
- 参数量、数据规模等数字若上 Slide，应回查原论文；主叙事不依赖这些数字。

## Page 41

### 主题
VAR：从 next-token 改为 next-scale prediction。

### 本页核心内容
- 传统图像自回归按光栅序列逐 token；VAR 按从粗到细的多尺度 token map 生成。
- 同一尺度内 token 可并行产出，减少串行步数并保留二维结构。

### 重要视觉素材
- `pages/page-041.png`
- `media/image-032.png`（next-token / next-image-token / next-scale 对照，最高优先级复用）

### 相关论文 / 模型
- Visual Autoregressive Modeling: Scalable Image Generation via Next-Scale Prediction；VAR。

### 值得复用的讲解思路
- 三栏对照图清楚展示语言顺序、图像光栅顺序和粗到细尺度顺序的差异。

### 可支持当前大纲
- 第 15 页：自回归图像生成（现代改进素材）
- 第 24 页：时间线

### 备注
- “全面超越 DiT”需限定在论文报告的 ImageNet 类别条件基准与配置，不宜泛化到开放域文生图。

## Page 42

### 主题
VAR 的两阶段训练、块因果掩码与生成流程。

### 本页核心内容
- 多尺度 VQ autoencoder 产生训练目标；VAR Transformer 预测下一尺度。
- 块因果掩码保证每一尺度只能依赖已知的更粗尺度。

### 重要视觉素材
- `pages/page-042.png`
- `media/image-033.png`（VAR 官方两阶段架构，优先复用）

### 相关论文 / 模型
- VAR；multi-scale VQ tokenizer；block-wise causal mask。

### 值得复用的讲解思路
- “粗轮廓 → 细节”的生成动画比逐 token 光栅扫描更符合图像直觉。

### 可支持当前大纲
- 第 15 页：自回归路线补充
- 第 24 页：时间线

### 备注
- 论文获 NeurIPS 2024 Best Paper，但该页的更强结论仍应保持基准语境；不是大纲必需内容。

## Page 43

### 主题
LlamaGen：用标准 Llama 风格架构生成视觉 token。

### 本页核心内容
- 高质量离散 tokenizer 配合标准 next-token Transformer，不依赖视觉专用主干改造。
- 复用 RMSNorm、SwiGLU、RoPE 与成熟 LLM 训练/推理工具。

### 重要视觉素材
- `pages/page-043.png`（无独立内嵌位图）

### 相关论文 / 模型
- Autoregressive Model Beats Diffusion: Llama for Scalable Image Generation；LlamaGen。

### 值得复用的讲解思路
- “只要视觉 tokenizer 足够好，标准语言模型架构也能生成图像”强化统一建模主题。

### 可支持当前大纲
- 第 5 页：RoPE（仅作为后续应用例，不是原理图）
- 第 15 页：自回归图像生成
- 第 25 页：模态统一

### 备注
- “beats diffusion”与 FID 结论都限定于论文的 ImageNet 256×256 设置；不能据此断言开放域文生图全面胜出。

## Page 44

### 主题
LlamaGen 总结与厂商技术路线章节入口。

### 本页核心内容
- 总结 tokenizer 质量、标准 LLM 架构与串行采样之间的权衡。
- 提醒最新闭源模型不公开完整架构，后文部分内容包含行业推断。

### 重要视觉素材
- `pages/page-044.png`（无独立内嵌位图）

### 相关论文 / 模型
- LlamaGen；OpenAI / Google 图像模型路线。

### 值得复用的讲解思路
- “公开论文能讲机制，闭源产品只能讲可核实能力与公开信息”是可靠的资料使用边界。

### 可支持当前大纲
- 第 23 页：现代文图系统
- 第 25 页：最终总结

### 备注
- 后续 Page 45–46 不应作为未公开架构的权威来源；产品日期也需在制作时再次校验。

## Page 45

### 主题
OpenAI 图像模型路线：DALL·E 到 GPT Image / ChatGPT Images。

### 本页核心内容
- 串联 DALL·E 1 自回归、DALL·E 2/3 扩散与 2025–2026 图像产品。
- 区分产品能力公告与底层架构推测。

### 重要视觉素材
- `pages/page-045.png`（无独立内嵌位图，主要是文字时间线）

### 相关论文 / 模型
- DALL·E 1/2/3；GPT-4o Image Generation；GPT-Image-1/1.5/2。

### 值得复用的讲解思路
- 可用于说明产业路线会在自回归与扩散之间反复探索，但只保留经官方确认的节点。

### 可支持当前大纲
- 第 23 页：现代文图模型
- 第 24 页：十年演进时间线（需重新核验后再用）

### 备注
- 已于 2026-08-17 复核：OpenAI 官方确认 [GPT-Image-1.5 于 2025-12-16 发布](https://openai.com/index/new-chatgpt-images-is-here/)，[ChatGPT Images 2.0 于 2026-04-21 发布](https://openai.com/index/introducing-chatgpt-images-2-0/)。但页面关于后续模型具体采用纯自回归或“AR + 扩散混合”的判断并无官方架构披露，应明确标为推测；“thinking”是系统工作流能力，也不能直接证明图像生成器内部结构。

## Page 46

### 主题
Google 图像与文本扩散路线：Nano Banana、Gemini Diffusion、DiffusionGemma。

### 本页核心内容
- 列出 Gemini 图像产品与文本扩散实验模型的时间节点。
- 把图像生成路线与“文本也可用扩散生成”的探索并置。

### 重要视觉素材
- `pages/page-046.png`（无独立内嵌位图，主要是文字时间线）

### 相关论文 / 模型
- Gemini 2.5 Flash Image；Gemini 3 Pro Image；Gemini 3.1 Flash Image；Gemini Diffusion；DiffusionGemma。

### 值得复用的讲解思路
- 适合在结尾强调“扩散/自回归是生成过程选择，不被文本或图像模态永久绑定”。

### 可支持当前大纲
- 第 23 页：现代文图系统
- 第 24 页：时间线（可选、需保持日期）
- 第 25 页：最终总结

### 备注
- 已于 2026-08-17 复核：Google 官方资料确认 [Gemini 3.1 Flash Image / Nano Banana 2 于 2026-05-28 GA](https://cloud.google.com/blog/products/ai-machine-learning/nano-banana-2-and-nano-banana-pro-are-generally-available/)，并确认 [DiffusionGemma 是 26B MoE 的开放实验性文本扩散模型](https://blog.google/innovation-and-ai/technology/developers-tools/diffusion-gemma-faster-text-generation/)。但页面把 Nano Banana 系列写成“自回归主导”、把 Imagen 简化成“纯扩散”，均缺少足够公开架构证据；应作为作者推断而非事实引用。

## Page 47

### 主题
作者对模型产品化与 Agent 工程的思考。

### 本页核心内容
- 讨论模型能力、产品体验、工程稳定性和业务价值之间的差距。
- 内容属于产品/团队经验总结，不是算法演进证据。

### 重要视觉素材
- `pages/page-047.png`（无独立内嵌位图）

### 相关论文 / 模型
- 无特定论文；产品与 Agent 工程观点。

### 值得复用的讲解思路
- 若演讲需要产品化收尾，可借用“模型最优解不等于用户最需要的解”这一观点。

### 可支持当前大纲
- 与当前 25 页算法大纲无直接对应；可作为讲稿外延，不建议占用主线页面。

### 备注
- 含主观判断与竞品评价，不应当作技术事实或论文来源。

## 覆盖与优先复用建议

- 已覆盖全部 47 页；每页均关联完整 PNG，内嵌媒体通过 `page-media-map.md` 映射。
- 第一优先级原图：Page 9 `image-008`（ViT）、Page 12 `image-010`（CLIP）、Page 15 `image-013`（扩散链）、Page 23 `image-019`（LDM + Cross-Attention）、Page 24 `image-020`（Stable Diffusion）、Page 29 `image-022`（DiT）、Page 34 `image-028`（VQ-VAE）、Page 38 `image-031`（VQGAN）、Page 41 `image-032`（VAR）。
- 第二优先级素材：Page 6 GAN 结构、Page 8 StyleGAN 结果、Page 11 CNN 层级、Page 17 U-Net / DiT 对照、Page 19 CFG、Page 26 unCLIP、Page 36 VQ-VAE-2、Page 42 VAR 训练图。
- 当前大纲第 22 页 Flow Matching / Rectified Flow 在这份 PDF 中没有实质覆盖；后续必须另查可靠论文/官方资料或自行绘制，不能伪称源于本参考资料。
- Page 45–46 是时效性资料；即使本索引已在 2026-08-17 复核部分节点，进入 Slide 制作时仍应再次核验官方来源，且不得把未公开架构推测写成定论。
