# 项目进度

最后核对：2026-08-17

## 当前里程碑

Phase 5 已完成实现和自动化浏览器验证。完整 25 页内容实现结束，当前等待用户对第 18～25 页及全篇收束进行人工视觉验收；未增加计划外页面。

## 当前基线

- Phase 1 已将 Transformer PPTX 与 AI 生图 PDF 处理为可检索的逐页图片、文字、媒体和语义索引。
- 已建立独立的 Vite、React、TypeScript、pnpm 前端项目。
- 已实现 1920×1080 固定舞台、等比例缩放、hash 路由、step 前进/回退、键盘控制、全屏、页码和进度条。
- Phase 2 三张样板页已通过用户人工视觉验收：大纲第 1 页封面、第 4 页 Transformer 并行关系计算、第 17 页 Diffusion 加噪/去噪。
- 已连续注册并实现第 1～25 页；第 4 页和第 17 页均保留 Phase 2 核心设计。
- 除已有 Token、AttentionMatrix 和 NoiseFrame 外，已增加 ModalityToken、PositionWave、RotaryPair、MiniAttentionHead 和 PatchGrid 等可复用模式。
- 已增加 SceneImage、LatentCloud、VisualTokenGrid 和 SimilaritySpace 等生成模型视觉模式。
- 已增加 FeatureMap、VelocityField 和 ConvergenceMark，用于潜空间、Flow 向量场和双路线汇合。
- 第 1～11 页已形成“重要性 → RNN → 并行关系 → 位置 → Attention → QKV → Multi-Head → Encoder/Decoder → 三路线 → ViT/多模态”的连续叙事。
- 第 12～17 页已形成“生成为什么更难 → VAE 潜空间 → GAN 质量与稳定性 → 自回归视觉 token → CLIP 文图对齐 → Diffusion 逐步去噪”的连续叙事。
- 第 18～25 页已形成“DDPM 训练 → Latent Diffusion → Cross-Attention → DiT → Flow → 现代系统 → 双轨时间线 → 总结”的连续叙事，并回收第 7、11、13 页的 QKV、Patch/Token 和 VAE 潜空间视觉。

## 正在进行

无。Phase 5 已停止在用户验收边界。

## 下一步

1. 等待用户完整播放第 18～25 页，重点验收第 19 页 VAE 伏笔回收、第 20～21 页 Transformer / Generation 合流、第 24～25 页闭环感。
2. 如有验收反馈，仅做必要的内容、视觉或节奏调整；不自行新增页面。
3. 演讲内容实现已完成，后续如进入发布或演讲排练应继续保持参考来源与颜色语义。

## 风险与阻塞

- 当前无功能阻塞项；仍需用户进行最终人工视觉与讲解节奏验收。
- Flow Matching / Rectified Flow 不在 Phase 1 参考 PDF 覆盖范围内，本阶段已依据原论文补充，正式页面为项目新绘制教学示意。
- Phase 5 源码和连续性文档仍在工作区中；跨设备继续前需要由用户决定是否提交并同步。

## 已执行验证

Phase 3（2026-08-17）：

- `pnpm typecheck`：通过。
- `pnpm build`：通过；production bundle 未包含 Phase 1 的 PDF、PPTX 或 reference 页面。
- `pnpm visual:check`：通过；第 1～11 页最终态与关键中间态均可渲染，10 次章节页间跳转和 11 页逐页 Step 前进/回退正确。
- URL hash、Home / End、全屏及 1440×900、1200×1200、2560×1080 三种窗口比例正常；第 17 页样板仍可访问。
- 浏览器 Console errors：0；failed requests：0。
- Phase 2 样板此前已由用户人工视觉验收通过。
- 人工视觉验收：用户已通过启动 Phase 4 确认继续推进。

Phase 4（2026-08-17）：

- `pnpm typecheck`：通过。
- `pnpm build`：通过；production bundle 未包含 Phase 1 的 PDF、PPTX 或 reference 页面。
- `pnpm visual:check`：通过；第 1～17 页最终态与关键中间态均可渲染，16 次连续页间跳转和 17 页逐页 Step 前进/回退正确。
- URL hash、Home / End、全屏及 1440×900、1200×1200、2560×1080 三种窗口比例正常。
- 浏览器 Console errors：0；failed requests：0。
- 人工视觉验收：用户通过启动 Phase 5 确认继续推进。

Phase 5（2026-08-17）：

- `pnpm typecheck`：通过。
- `pnpm build`：通过；production bundle 未包含 Phase 1 的 PDF、PPTX 或 reference 页面。
- `pnpm visual:check`：通过；覆盖第 1～25 页最终态和关键中间态，24 次连续页间跳转与 25 页逐页 Step 前进/回退正确。
- Space、Arrow、PageUp / PageDown、Home / End、页码输入跳转、URL hash 与全屏均通过浏览器自动化检查。
- 1440×900、1200×1200、2560×1080 三种窗口比例正常；Console errors：0；failed requests：0。
- 人工视觉验收：等待用户确认第 18～25 页与全篇收束。
