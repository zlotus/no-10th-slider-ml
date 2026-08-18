# Phase 2：继承视觉体系，建立 ML Slide Design System 与样板页

请先完整阅读并遵守：

```text
AGENTS.md
transformer_image_generation_slide_outline.md
references/README.md
references/transformer/reference-index.md
references/image-generation/reference-index.md
```

同时，本阶段新增一个重要参考：

```text
/home/radxa/agentws/no-10th-slider/
```

该仓库是本项目的 **视觉母版与交互参考**。

本阶段目标不是重新发明一套完全不同的 Slide，而是：

> **继承 `no-10th-slider` 已经验证过的视觉 DNA、舞台系统和动画语言，并将其扩展为更适合 Transformer / ML / 图像生成算法表达的一套新视觉体系。**

本阶段只完成：

> **前端项目骨架 + 视觉体系继承与改造 + 3 张高质量样板页**

不要批量实现整套 Slide，不要自行进入 Phase 3。

---

# 1. Phase 2 目标

Phase 1 已经完成参考资料预处理与索引。

本阶段需要先确定：

1. 本项目是否保持与 `no-10th-slider` 同系列的视觉风格；
2. 哪些 runtime / layout / animation patterns 可以继承；
3. 哪些 Agent 专用视觉组件必须舍弃；
4. 如何增加 ML 特有的视觉表达能力；
5. 如何让 Transformer 与文图生成两条路线既统一又有区分；
6. 最终验证 3 张样板页是否足以支撑后续 20～25 页批量实现。

目标是让观众一眼看出：

> 这和 `no-10th-slider` 属于同一系列作品。

同时又明显感觉到：

> 这是一个面向机器学习算法、数学直觉和生成模型的版本，而不是 Agent 系统架构页的复制。

---

# 2. 先阅读旧项目

开始编码前，请先检查并阅读：

```text
/home/radxa/agentws/no-10th-slider/
```

如果当前机器可以访问 GitHub，可以 clone 到项目外部或临时目录中进行参考。

不要把旧仓库作为子模块提交到当前项目。

重点阅读旧仓库中的：

```text
src/presentation/
src/components/
src/styles/global.css
src/slides/
package.json
README.md
```

重点理解：

- 1920×1080 固定舞台；
- 浏览器窗口中的整体缩放方式；
- slide runtime；
- 键盘导航；
- step / progressive reveal 的状态逻辑；
- page indicator；
- progress bar；
- runtime controls；
- 标题体系；
- 页面安全边距；
- 深色背景；
- grid texture；
- mono 标签；
- concept node；
- SVG path / line draw；
- focus / highlight；
- fade / translate 动画；
- 页面之间的统一节奏。

不要只“看截图”。

要真正理解旧项目中：

> 视觉效果是如何被代码组织和驱动的。

---

# 3. 继承原则：视觉 DNA，而不是复制组件库

## 可以直接继承或高度参考

建议保留旧项目中已经验证好的：

```text
固定 16:9 舞台
1920 × 1080 内部设计尺寸
深色中性背景
低对比网格纹理
大标题体系
mono 小标签 / 页码
页面安全边距
底部进度条
runtime controls
页面缩放逻辑
键盘导航
step animation 机制
fade / small translate
SVG line draw
sequential highlight
focus / dim
```

如果旧项目中的 runtime 已经足够可靠，可以：

- 参考其代码；
- 重用思路；
- 在必要时重构后迁移。

不要为了“独立实现”而重复制造已经解决的问题。

---

## 不要直接复制的部分

旧项目大量视觉组件是 Agent 主题专用，例如：

```text
terminal
packet
tool call
JSON message
permission
environment
context packet
tool result
harness
```

这些不属于本项目的主要视觉语言。

除非个别页面确实需要，否则不要把这些组件整体复制到新项目。

本项目不是：

> Agent 系统架构 Slide 的换标题版本。

---

# 4. 本项目需要新增的 ML 视觉语言

这次必须在旧项目的 box-and-arrow 体系上增加：

```text
matrix
heatmap
token row
token embedding
attention links
image strip
noise progression
latent space
vector / embedding space
continuous field
trajectory
timeline
probability / distribution sketch
patch grid
cross-attention mapping
```

也就是说，本项目的视觉语言应从旧项目的：

```text
box + arrow
```

扩展为：

```text
box
+
matrix
+
image
+
field
+
trajectory
+
timeline
```

这些新元素必须与旧项目的：

- 线条粗细；
- 圆角；
- 字体；
- spacing；
- animation；
- emphasis；

保持同系列视觉质感。

---

# 5. 前端技术方案

推荐继续沿用旧项目已经验证过的技术方向：

```text
Vite
TypeScript
React
pnpm
```

如果旧项目的依赖已经满足需求，可以参考其选择。

允许使用轻量动画库，例如：

```text
Motion / Framer Motion
```

但如果旧项目主要使用 CSS transition + React state 已经足够，则不要为了“现代化”强行重写。

不要引入：

- Redux；
- 大型 UI Framework；
- CMS；
- 后端；
- 数据库；
- 重型图表库；
- 不必要的路由系统。

核心目标仍然是：

> 页面效果可控、代码简单、后续页面易于批量制作。

---

# 6. 固定舞台与 Runtime

优先保持与 `no-10th-slider` 一致的演示体验。

页面必须是：

```text
16:9
```

内部逻辑尺寸建议继续：

```text
1920 × 1080
```

浏览器窗口变化时：

- 保持比例；
- 整体居中；
- 统一缩放；
- 不进行普通网页式流式排版；
- 不破坏页面构图。

建议继续支持：

```text
← / PageUp     上一页 / 上一步
→ / PageDown   下一步 / 下一页
Space          下一步 / 下一页
Home           第一页
End            最后一页
F              全屏
Esc            退出全屏 / 收起辅助 UI
```

如果旧项目已有成熟的 runtime controls、页码、进度条，可高度参考甚至在重构后复用实现思路。

---

# 7. Design System：继承旧项目，再重新定义语义

旧项目的视觉基调适合直接延续：

- 深色背景；
- 高对比主文字；
- 低饱和 surface；
- 细边框；
- 小面积强调色；
- mono 技术标签；
- 轻微网格；
- 克制光晕；
- 大量留白。

不要突然改成完全不同的白底传统 PPT 风格。

---

# 8. 配色体系

旧项目中的颜色本身可以参考，但要重新定义语义。

旧项目可能存在类似：

```text
model
context
tool
loop
permission
```

这些语义不要原样带过来。

本项目建议建立两条主色：

## Transformer / Representation

可以继续使用旧项目中类似 amber / gold 的主色。

用于：

- Transformer；
- Attention；
- Q / K / V；
- Token；
- Representation；
- ViT；
- Language Model。

---

## Image Generation / Generative Process

建立另一条主色，例如 violet / blue-violet。

用于：

- VAE / GAN；
- Diffusion；
- Latent；
- Noise；
- Flow；
- Image Generation。

---

## 两条路线合流

在：

```text
Cross-Attention
DiT
MMDiT
Modern Multimodal Generation
```

等页面中，可以：

- 同时使用两条主色；
- 或使用克制的双色渐变；
- 或使用两色路径汇合。

不要让整个页面变成大面积渐变。

颜色应表达：

> 技术路线与语义

而不是单纯装饰。

---

# 9. 字体体系

尽量延续旧项目的：

- 中文无衬线主字体；
- mono 技术标签；
- 强标题；
- 高密度但克制的正文层级。

必须保证：

- 中文显示稳定；
- 英文论文名正常；
- 数学符号正常；
- `QKᵀ`；
- `xₜ`；
- `εθ(xₜ,t)`；
- `dx/dt`；

等表达清晰。

不要依赖只有当前机器上存在的私有字体。

---

# 10. 页面视觉原则

旧项目中已经验证好的“技术大会 Slide”气质应保留。

本项目仍然避免：

- SaaS Dashboard；
- 页面到处是卡片；
- 大面积霓虹；
- cyberpunk HUD；
- 无意义粒子；
- 每个元素都发光；
- 过多阴影；
- 复杂 3D。

页面应该像：

> 高质量技术演讲的算法可视化。

而不是：

> AI 产品官网。

---

# 11. 本阶段只实现 3 张样板页

不要实现完整第 1～25 页。

只实现：

```text
Sample A：封面
Sample B：Transformer 核心算法页
Sample C：Diffusion 核心算法页
```

它们分别验证：

```text
品牌 / 整体风格
算法 / 矩阵 / token
图像 / 连续过程 / 生成
```

如果这三类页面成立，后续绝大多数页面都可以沿用。

---

# 12. Sample A：封面页

对应大纲：

```text
第 1 页：封面
```

标题：

> **近十年 Transformer 与文图生成算法演进**

副标题：

> 从 Attention 到 Diffusion，再到多模态生成

## 视觉要求

封面应明显继承 `no-10th-slider`：

- 深色背景；
- 网格；
- mono 标签；
- 强标题；
- 克制高亮。

但不要复制旧封面的具体构图。

建议把：

```text
Transformer
```

与：

```text
Image Generation
```

做成两条不同颜色的技术路线。

例如：

```text
2017 Transformer ────────────────┐
                                ├─ Multimodal Generation
2013 VAE → GAN → DDPM → LDM ────┘
```

不要求完整时间线，只要有故事感。

## 动画

建议：

1. 主标题；
2. 副标题；
3. Transformer 路线；
4. Image Generation 路线；
5. 两条路线在右侧 / 中央汇合。

这可以成为整套 Slide 的视觉母题。

---

# 13. Sample B：Transformer 核心技术页

对应大纲：

```text
第 4 页：
Transformer：把“顺序”与“关系计算”解耦
```

这是本阶段最重要的算法样板页。

必须查看：

```text
references/transformer/reference-index.md
```

及其指向的：

```text
pages/
media/
text/
```

---

## 本页核心叙事

### RNN

首先出现：

```text
我 → 喜 → 欢 → 人 → 工 → 智 → 能
```

通过逐个激活 / 连线传播表现：

> RNN 把顺序写进计算流程。

---

### Transformer

随后出现整行 token：

```text
我  喜  欢  人  工  智  能
```

生成：

```text
Q
K
```

再形成：

```text
Q × Kᵀ
```

最终得到：

```text
7 × 7 Attention Matrix
```

说明：

> 所有 token 两两关系可以通过矩阵运算并行计算。

---

### Position

最后指出：

```text
Self-Attention ≠ 天然知道位置
```

再引出：

```text
Positional Encoding
RoPE
```

并强调：

```text
Self-Attention
→ 关系并行计算

Position Encoding / RoPE
→ 位置信息注入
```

---

## 最终总结

页面底部：

> **RNN：用时间传递位置。**  
> **Transformer：用位置编码描述位置，用矩阵乘法并行建模关系。**

---

# 14. Sample B 的视觉扩展要求

这张页面要体现：

> 本项目不是旧 Slider 的 Agent 卡片换皮。

请增加真正 ML 化的视觉元素：

- token row；
- Q / K rows；
- transpose；
- matrix；
- heatmap；
- cell reveal；
- row / column highlight。

Attention Matrix 应成为页面视觉中心之一。

可以参考旧项目的：

- sequential highlight；
- focus / dim；
- SVG line；
- mono 标签；

但新的 Matrix 视觉必须成为可复用组件 / pattern。

---

# 15. Sample B 动画建议

### Step 1

RNN token 串行传播。

### Step 2

RNN 缩到一侧，出现：

```text
Sequential
```

### Step 3

Transformer token row 同时出现。

### Step 4

分别生成 Q / K。

### Step 5

K 转置。

### Step 6

显示：

```text
Q × Kᵀ
```

### Step 7

Attention Matrix 逐步 reveal。

可以：

- 按 row；
- 按 column；
- 或整体 fade + 重点 cell 高亮。

### Step 8

显示：

```text
Parallel relationship modeling
```

### Step 9

抛出问题：

```text
Where is position?
```

### Step 10

出现：

```text
Position Encoding / RoPE
```

### Step 11

显示页面底部最终总结。

动画应该和旧项目一样：

> 每一步只让观众关注一个新的概念。

---

# 16. Sample C：Diffusion 核心技术页

对应大纲：

```text
第 17 页：
Diffusion：从噪声里一点一点恢复图像
```

必须查看：

```text
references/image-generation/reference-index.md
```

及其对应的 Diffusion / DDPM 页面和素材。

---

## 本页核心视觉

需要验证本项目新增的：

```text
image strip
noise progression
continuous process
```

视觉语言。

不要仅做：

```text
卡片 → 箭头 → 卡片
```

建议中心区域出现连续图像序列：

```text
x₀
清晰图像

→

x₁
轻微噪声

→

x₂

→

...

→

xₜ
Noise
```

再通过第二条反向路径：

```text
Noise
→
结构
→
轮廓
→
细节
→
Image
```

---

# 17. Sample C 动画建议

### Step 1

清晰图像单独出现。

### Step 2

图像逐步加入噪声。

### Step 3

形成完整 forward process。

### Step 4

强调：

```text
Forward Process
```

### Step 5

反向路径出现。

### Step 6

逐步恢复图像。

### Step 7

强调：

```text
Reverse Process
```

### Step 8

出现总结：

> **模型不是一次“画出”图片，而是在学习如何让噪声逐步走向真实图像。**

---

# 18. Diffusion 页面视觉要求

这一页应明显区别于 Transformer Matrix 页。

Transformer 页：

```text
discrete
token
matrix
relation
```

Diffusion 页：

```text
continuous
image
noise
trajectory
process
```

但二者仍需通过：

- 字体；
- 背景；
- border；
- spacing；
- animation；
- title；
- page number；

看起来属于同一套 Slide。

---

# 19. 建议建立的基础组件 / Pattern

可以从旧项目借鉴设计思想，但重新建立适合 ML 的组件。

可能包括：

```text
SlideFrame
SlideHeader
SectionLabel
PageNumber
BottomTakeaway

Token
TokenRow

MatrixGrid
AttentionMatrix
HeatCell

FlowLine
Arrow
Trajectory

ImageFrame
ImageStrip
NoiseFrame

Timeline
RouteLine

SourceLabel
```

只抽象真正会复用的东西。

不要为了组件化制造几十个小文件。

---

# 20. Runtime 与旧项目的关系

如果旧项目：

```text
src/presentation/
```

中的 runtime 已经稳定，可以高度参考。

推荐尽量保持相似的：

- API；
- step 控制；
- current slide；
- keyboard；
- viewport scale；
- fullscreen；
- progress；

这样以后两套 Slider 的维护成本更低。

但不要通过跨仓库 import 等方式制造运行时依赖。

当前项目必须独立运行。

---

# 21. 参考资料资产处理

研究资料继续保留在：

```text
references/
```

正式页面实际使用的素材应复制到：

```text
public/assets/
```

或：

```text
src/assets/
```

不要让 production 页面长期直接读取：

```text
references/.../pages/
```

如果使用：

- 原论文图；
- 原 PPT 图；
- 原 PDF 图；

请：

1. 优先使用高质量原图；
2. 必要时裁切；
3. 不覆盖原始 reference；
4. 给正式资产合理命名；
5. 保留轻量 source label。

---

# 22. Source / Citation 风格

可以继承旧项目 mono 小字风格。

例如：

```text
VASWANI ET AL. · 2017
```

或：

```text
ATTENTION IS ALL YOU NEED
```

但不要放长 URL。

论文来源应：

- 清楚；
- 克制；
- 不抢视觉中心。

---

# 23. 动画统一规范

继承旧项目成熟的动画语言。

优先：

```text
fade
fade + small translate
focus / dim
line draw
sequential highlight
matrix reveal
crossfade
image progression
trajectory draw
```

统一：

- duration；
- easing；
- stagger；
- emphasis；
- 位移距离。

避免：

- 大幅弹跳；
- 大旋转；
- 夸张 scale；
- 3D 翻页；
- 粒子爆炸；
- 每页使用不同动画体系。

原则：

> **动画不是装饰，而是在控制观众注意力。**

---

# 24. 性能要求

不要因为 Phase 1 有大量图片，就全部打进前端 bundle。

只加载：

> 当前正式 Slide 实际使用的素材。

避免：

- 一次预加载所有 reference PNG；
- 把整份 PDF / PPTX 送进浏览器；
- 数十 MB 无意义 bundle。

三张样板页必须保持切换流畅。

---

# 25. 开发体验

至少支持：

```bash
pnpm install
pnpm dev
pnpm build
```

并确保：

```bash
pnpm build
```

通过。

建议 README 简要说明：

- 启动；
- 键盘操作；
- slide registry；
- step animation；
- 新增页面方式；
- 视觉体系来源于 `no-10th-slider`，但已针对 ML 扩展。

不要写成长篇框架论文。

---

# 26. 本阶段明确禁止

不要：

- 实现完整 20～25 页；
- 开始批量 Transformer 章节；
- 开始批量文图生成章节；
- 把旧项目所有组件全部复制进来；
- 把 Agent 专用视觉语言照搬；
- 建立跨仓库运行依赖；
- 修改 Phase 1 的参考索引，除非发现明确错误；
- 擅自改动总体大纲；
- 自行进入 Phase 3。

---

# 27. Phase 2 验收标准

最终浏览器中至少有：

```text
Sample A：封面
Sample B：Transformer 并行关系计算
Sample C：Diffusion 加噪 / 去噪
```

三页可以通过统一 runtime 切换。

---

## 验收 1：是否继承旧项目视觉 DNA

应明显保留：

- 深色技术风；
- 1920×1080 舞台；
- 网格；
- mono 标签；
- 大标题；
- 克制高亮；
- progress；
- runtime controls；
- step reveal；
- focus / dim；
- 技术结构图。

但不能像直接复制旧项目页面。

---

## 验收 2：是否完成 ML 化扩展

至少应已经形成可复用的：

```text
token
matrix
heatmap
image progression
noise process
```

视觉模式。

---

## 验收 3：Transformer 页面

必须让观众一眼看懂：

```text
RNN
→ 串行

Transformer
→ QKᵀ
→ Attention Matrix
→ 并行关系计算

Position Encoding
→ 独立注入位置信息
```

不得暗示：

```text
RoPE 导致 Transformer 可以并行
```

---

## 验收 4：Diffusion 页面

必须直观看懂：

```text
Image
→ Noise

Noise
→ Image
```

并理解：

> 生成是逐步过程，而不是一次完成。

---

## 验收 5：两条路线视觉区分

Transformer 与 Image Generation 应有不同强调色。

但三张页整体仍必须明显属于同一个视觉系统。

---

# 28. 测试

完成后至少：

1. `pnpm build`；
2. 检查浏览器 Console；
3. 测试键盘切页；
4. 测试 step 前进 / 回退；
5. 测试全屏；
6. 测试 16:9 缩放；
7. 测试不同桌面窗口比例；
8. 检查 production build 的图片路径；
9. 检查动画是否存在明显卡顿；
10. 确认没有把 Phase 1 大型 reference 资料意外打包进前端。

---

# 29. 阶段结束汇报

Phase 2 完成后停止。

请汇报：

1. 是否读取了 `no-10th-slider`；
2. 从旧项目继承了哪些设计 / runtime 思路；
3. 哪些旧项目组件明确没有复用，以及原因；
4. 当前技术栈；
5. Design System 的主要设计选择；
6. Transformer 与 Image Generation 的主题色；
7. 三张样板页分别实现了什么；
8. 新增加了哪些 ML 专用视觉组件 / pattern；
9. 使用了哪些 Phase 1 参考素材；
10. 动画 step 如何推进与回退；
11. `pnpm build` 是否通过；
12. 当前已知问题；
13. 希望用户重点验收哪些视觉选择。

请额外列出三个样板页及 runtime 的源码路径。

**完成 Phase 2 后停止，不要自行进入 Phase 3。**
