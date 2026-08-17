# 项目上下文

## 项目目的

制作一套面向具备基础 AI 概念、但不熟悉底层算法的听众的中文技术演讲 Slide，讲清近十年 Transformer 与文图生成算法为何沿当前路线演进，并最终在现代多模态生成系统中合流。

规范性内容、准确性和分阶段要求见 [`AGENTS.md`](../AGENTS.md)；页面叙事见 [`transformer_image_generation_slide_outline.md`](../transformer_image_generation_slide_outline.md)。

## 核心工作流

1. 按当前 Phase Prompt 确定范围，完成后停止并等待验收。
2. 实现具体页面前先查对应 `reference-index.md`，再查看完整页面、逐页文字和必要的原始媒体。
3. 用统一 runtime 和 ML Design System 实现页面，通过 step 状态控制讲解节奏。
4. 执行类型检查、production build，并按风险进行浏览器视觉与交互检查。

## 目标与边界

- 用“上一代的问题 → 新方法为何出现 → 解决什么 → 留下什么”的方式组织内容。
- Transformer 重点表达离散 token、矩阵和关系；图像生成重点表达图像、噪声、轨迹和连续过程。
- 两条路线保持视觉区分，并在 Cross-Attention、DiT、MMDiT 和现代多模态生成处汇合。
- 不把项目扩展为 SaaS、CMS 或通用演示框架；不在当前 Phase 提前实现后续页面。
- 不修改或删除原始 PPTX、PDF，也不让 production 页面长期直接读取 `references/`。

## 架构基线

- `references/`：Phase 1 形成的原始资料、逐页图片、文字、媒体和语义索引。
- `src/presentation/`：1920×1080 固定舞台、等比例缩放、slide registry、step、hash、键盘和全屏 runtime。
- `src/components/`：通用页面框架与 ML 专用视觉模式。
- `src/slides/`：按大纲页号实现的页面组件。
- `src/styles/global.css`：Design tokens、页面布局和统一动画语言。

项目借鉴同系列仓库 `no-10th-slider` 的视觉与交互经验，但必须独立构建和运行，不建立跨仓库 import 或运行时依赖。相关决策见 [`ADR-0001`](decisions/0001-ml-slide-system.md)。

## 长期约束

- 技术准确性优先于沿用参考资料原话。
- 原始 2017 Transformer 的位置编码与后续 RoPE 必须明确区分。
- 页面默认只解决一个核心问题，动画只用于控制注意力。
- 保持轻量技术栈，不引入无必要的状态管理、UI 框架、后端或重型图表库。
- 只有正式页面实际使用的素材可以进入前端 bundle。

## 术语

- **Phase 1**：参考资料预处理与逐页语义索引。
- **Phase 2**：ML Slide Design System、独立 runtime 与三张样板页。
- **Phase 3**：Transformer 章节第 2～11 页的正式实现。
- **Phase 4**：文图生成前半章第 12～17 页的正式实现。
- **Step**：单页内部可前进或回退的渐进讲解状态。
- **视觉 DNA**：从 `no-10th-slider` 延续的固定舞台、深色网格、标题层级、mono 标签、进度与克制动画语言，不代表复制其 Agent 专用组件。
