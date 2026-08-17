# ADR-0001：继承同系列视觉 DNA，建立独立的 ML Slide Design System 与 runtime

- 状态：Accepted
- 日期：2026-08-17
- 替代：无
- 被替代：无

## 背景

本项目需要与 `no-10th-slider` 保持同系列的技术演讲气质和操作体验，同时又要表达 Transformer、矩阵、图像噪声和连续生成过程。直接复制旧项目的 Agent 组件会造成语义错位；完全重做视觉与 runtime 则会失去已经验证的系列一致性并增加维护成本。

## 决策

- 延续 1920×1080 固定舞台、深色低对比网格、强标题、mono 标签、页码、进度、runtime controls 和克制的渐进动画语言。
- 采用独立的 Vite、React、TypeScript、pnpm 项目；不跨仓库 import，也不依赖 `no-10th-slider` 运行。
- slide registry 使用大纲页号，单页由确定性的 `step` 状态驱动，可通过键盘前进与回退，并将当前状态保存到 URL hash。
- Transformer / Representation 使用 Amber / Gold；Image Generation / Generative Process 使用 Violet；仅在两条技术路线汇合时并置。
- 新增 token、matrix、heatmap、image progression、noise process 和 trajectory 等 ML 视觉模式，不迁移 Terminal、Packet、Tool Call、Permission、Harness 等 Agent 专用组件。
- 正式页面只加载实际使用的正式资产，不直接把 Phase 1 的完整 reference 资料打入 production bundle。

## 理由

该方案既保留同系列作品的识别度和成熟演示体验，又让视觉语义直接服务于算法直觉。独立 runtime 避免两个仓库的版本耦合；轻量组件和确定性 step 状态便于后续按大纲批量扩展和稳定回退。

## 考虑过的替代方案

- **整体复制旧组件库**：实现快，但会把 Agent 系统的视觉隐喻错误带入 ML 内容，并产生大量无用代码。
- **完全重新设计视觉与 runtime**：独立性强，但失去系列一致性，也重复解决固定舞台、导航和渐进讲解问题。
- **从旧仓库直接导入 runtime**：减少重复代码，但形成跨仓库运行依赖，降低可移植性和版本可控性。

## 影响

- 后续页面应复用现有舞台、registry、step 和颜色语义，而不是另起一套页面运行方式。
- 新视觉组件只在确认会复用时抽象，避免把演示项目过度工程化。
- 两个项目中相似 runtime 的改进需要显式同步，不能依赖跨仓库自动继承。
- 正式使用参考图片时，需要复制到 `public/assets/` 或 `src/assets/`，保留轻量来源标注，并避免打包无关参考资料。
