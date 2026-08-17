# 项目进度

最后核对：2026-08-17

## 当前里程碑

Phase 3 已完成实现和自动化浏览器验证，当前等待用户对 Transformer 章节第 2～11 页进行人工视觉验收。未进入 Phase 4。

## 当前基线

- Phase 1 已将 Transformer PPTX 与 AI 生图 PDF 处理为可检索的逐页图片、文字、媒体和语义索引。
- 已建立独立的 Vite、React、TypeScript、pnpm 前端项目。
- 已实现 1920×1080 固定舞台、等比例缩放、hash 路由、step 前进/回退、键盘控制、全屏、页码和进度条。
- Phase 2 三张样板页已通过用户人工视觉验收：大纲第 1 页封面、第 4 页 Transformer 并行关系计算、第 17 页 Diffusion 加噪/去噪。
- 已完成并注册 Transformer 正式章节第 2～11 页；第 4 页保留 Phase 2 核心设计，第 17 页样板继续可访问。
- 除已有 Token、AttentionMatrix 和 NoiseFrame 外，已增加 ModalityToken、PositionWave、RotaryPair、MiniAttentionHead 和 PatchGrid 等可复用模式。
- 第 1～11 页已形成“重要性 → RNN → 并行关系 → 位置 → Attention → QKV → Multi-Head → Encoder/Decoder → 三路线 → ViT/多模态”的连续叙事。

## 正在进行

无。Phase 3 已停止在用户验收边界。

## 下一步

1. 等待用户人工检查第 2～11 页的视觉效果与讲解节奏。
2. 如有验收反馈，仅调整 Phase 3 页面；否则等待明确的 Phase 4 Prompt。
3. 后续实现仍须先查询对应 Phase 1 语义索引和原始视觉资料。

## 风险与阻塞

- 当前无阻塞项。
- Diffusion 样板仍是 Phase 2 的抽象过程验证页，不代表后续正式 Diffusion 章节已经完成。
- Phase 2、Phase 3 源码和连续性文档仍在工作区中；跨设备继续前需要由用户决定是否提交并同步。

## 已执行验证

Phase 3（2026-08-17）：

- `pnpm typecheck`：通过。
- `pnpm build`：通过；production bundle 未包含 Phase 1 的 PDF、PPTX 或 reference 页面。
- `pnpm visual:check`：通过；第 1～11 页最终态与关键中间态均可渲染，10 次章节页间跳转和 11 页逐页 Step 前进/回退正确。
- URL hash、Home / End、全屏及 1440×900、1200×1200、2560×1080 三种窗口比例正常；第 17 页样板仍可访问。
- 浏览器 Console errors：0；failed requests：0。
- Phase 2 样板此前已由用户人工视觉验收通过。
- 人工视觉验收：等待用户确认。
