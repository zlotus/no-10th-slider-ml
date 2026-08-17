# Transformer 与文图生成算法演进 Slides

浏览器演示项目。Phase 2 使用封面、Transformer 并行关系计算和 Diffusion 加噪/去噪三张样板页建立 ML Slide Design System；Phase 3 已完成 Transformer 章节第 2～11 页，并保留第 17 页 Diffusion 样板。

视觉体系继承自同系列项目 `no-10th-slider` 的固定舞台、深色网格、标题层级、mono 标签、step reveal、进度条和演示控制；ML 版本重新定义了颜色语义，并增加 token、matrix、heatmap、image progression 与 noise process 等视觉模式。项目独立运行，不跨仓库 import。

## 启动

环境要求：Node.js 20+、pnpm 10+。

```bash
pnpm install
pnpm dev
```

检查和构建：

```bash
pnpm typecheck
pnpm build
pnpm preview
```

保持 preview 运行时，可在另一终端执行真实浏览器验收：

```bash
pnpm visual:check
```

脚本检查第 1～11 页最终 Step、关键中间态、章节连续播放、键盘导航、全屏、三种桌面窗口比例、Console 与失败请求，并确认第 17 页样板仍可访问。临时截图写入已忽略的 `visual-check-output/`。

## 演示控制

- `Space`、`→`、`PageDown`：下一 Step；当前页结束后进入下一页。
- `←`、`PageUp`：上一 Step；当前页回到起点后进入上一页。
- `Home` / `End`：第一张 / 最后一张已注册页面。
- `F`：进入或退出全屏。
- `Esc`：退出全屏，或隐藏辅助控制；移动鼠标可重新显示控制。
- 页码控件支持点击当前序号后输入 registry 中的演示序号跳转；小字显示真实大纲页号。

URL hash 保存当前大纲页号与 Step，例如 `#/4/6` 表示大纲第 4 页、Step 6。

## 代码结构

```text
src/
├── presentation/             # 固定舞台、runtime、registry、键盘与全屏
├── components/
│   ├── SlideFrame.tsx        # 页眉、页码、来源和底部结论
│   ├── MLVisuals.tsx         # Token、Attention Matrix、Noise Frame、Process Arrow
│   └── TransformerVisuals.tsx # Position Wave、Rotary Pair、Attention Head、Patch Grid
├── slides/
│   ├── CoverSample.tsx
│   ├── TransformerSample.tsx # 第 4 页 Phase 2 样板
│   ├── Slide02*.tsx … Slide11*.tsx
│   └── DiffusionSample.tsx
└── styles/
    ├── global.css            # Design tokens、runtime 和样板页
    └── transformer-chapter.css # Transformer 章节布局与动画
```

新增页面时：

1. 创建接收 `{ step }` 的 Slide 组件。
2. 使用 `SlideFrame` 和必要的 ML patterns；不要默认套卡片布局。
3. 在 `src/presentation/slides.ts` 注册大纲页号、标题、主题色和 `maxStep`。
4. 用 `step >= n` 控制 progressive reveal，确保前进和回退都由同一个状态确定。

## 颜色语义

- Amber / Gold：Transformer、token、Attention、representation。
- Violet：VAE、Diffusion、latent、noise、generative process。
- 两色仅在 Cross-Attention、DiT、多模态汇合等语境中并置。

## Phase 1 参考使用

- Transformer 样板参考了 `references/transformer/` 的 Slide 8、17 对 RNN 串行传播和问题链的讲解，但矩阵与 token 图为本项目新绘制组件。
- Diffusion 样板参考了 `references/image-generation/` 的 Page 15–16 及 `media/image-013.png`、`image-014.png` 的 forward/reverse 结构；正式页面使用项目内 SVG/CSS 绘制的抽象信号和噪声场，没有把参考页或整份 PDF 打入 bundle。
- Transformer 正式章节继续参考 PPT Slide 1–18 的任务背景、RNN 时间展开、固定上下文和 Attention 动机；Position、QKV、Multi-Head 与架构分流因原 PPT 素材不足，使用论文事实自行绘制。
- ViT 页参考 AI 生图 PDF Page 9 与 `media/image-008.png` 的官方架构信息，正式页面重绘为可分步播放的 Patch Grid，而没有直接打包整份参考资料。

Phase 1 的原始参考文件和索引保持不变。
