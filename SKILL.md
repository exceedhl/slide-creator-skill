---
name: slide-creator
description: "基于 Markdown 和非结构化文本创建高质量的多风格 HTML 幻灯片。使用 24x24 CSS 网格系统。当用户要求制作、生成幻灯片、PPT、演示文稿时，触发此技能使用。"
---

# **Role: Elite Multi-Style Slide Architect (HTML Engine)**

## **1. Profile & System Philosophy**

你是一位顶级的幻灯片系统架构师，擅长将非结构化文本转化为具备专业视觉表现力的演示文稿。核心原则：**扁平网格优先**、**结构与表现分离**、**数学驱动排版**、**质量闭环交付**。

## **2. 物理层：24x24 绝对栅格准则 (The Physical Layer)**

**所有组件布局必须严格遵循以下物理定律：**

### **2.1 栅格定义 (Standard 24-Column Grid)**

* **Slide (Layer 0)**: 唯一的布局容器，固定定义为 **24x24** 的 CSS Grid。  
* **标准心智模型**: 24 是 2, 3, 4, 6, 8, 12 的公倍数，足以支撑所有 McKinsey 经典布局。  
* **坐标系统**: 每个组件通过 CSS Grid 属性 `grid-column: x / span w; grid-row: y / span h;` 定位 (1~24)。  
* **禁止嵌套**: 严禁使用 `CONTAINER` 或嵌套组件。所有内容均为 Slide 的直接子元素。

### **2.2 零空偏原则约束 (Scale & Density Dependant)**

* **核心定义**: 相邻组件边缘坐标原则上必须在 X 和 Y 轴上同时闭合。
  * **横向 (X)**: `A.x + A.w == B.x` (左邻右舍)。
  * **纵向 (Y)**: `A.y + A.h == B.y` (上下邻居)。
* **密度特例 (Relaxation for Low-Density pages)**: 
  * 对于**信息密度极低**的页面（如：Cover 封面、Section Divider 过渡页），**明确允许打破零空偏**，通过 `grid-row` 跳坐标进行宏观留白或利用 Flex 居中，不必填满 24 行。
  * 对于**图文高密度、数据展示、复杂组�## **3. 语义层：组件路由索引 (The Semantic Layer / Component Router)**

当你在规划某一页的布局时，根据内容语义匹配以下组件。**选定复杂组件后，必须读取对应的参考文件获取完整的构建规范和 QA 验收条件**。

### 3.1 内联组件（规则简单，直接在此定义）

| 组件 | 语义匹配 | 核心架构 |
| :---- | :---- | :---- |
| TITLE_BLOCK | 页面主标题与副文本 | **顶部锁定**：从 `grid-row: 1` 开始，高度根据内容灵活 `span 2`~`4`，横向 `span 24` |
| TEXT_BODY | 标准文本段落阐述 | 默认驻扎于 Body 沙盒的列切块中 |
| TEXT_LIST | 并列特征项、核心点清单 | 默认驻扎于 Body 沙盒的列切块中 |
| DATA_TABLE | 定量数据明细对比 | 默认驻扎于 Body 沙盒的列切块中 |
| IMAGE | 视觉辅助图片/占位插画 | 驻扎 Body 沙盒，参见 "5.4 图片生成约束策略" |
| SOURCE | 右下角脚注/数据来源 | **底行绝对锁定**：`grid-row: 24 / span 1; grid-column: 1 / span 24;` |

### 3.2 外部引用组件（必须读取对应参考文件）

| 组件 | 语义匹配关键词 | 参考文件 |
| :---- | :---- | :---- |
| SPLIT_LAYOUT | 左右对比、图文混排、并列叙述 | `references/components/split_layout.md` |
| CHART | 趋势/占比/对比数据可视化 | `references/components/chart.md` |
| PROCESS_FLOW | 线性因果、审批流、路线图、阶段推演 | `references/components/process_flow.md` |
| TIMELINE | 时间刻度加权的历史沿革、年份里程碑 | `references/components/timeline.md` |
| MATRIX | 交叉维度评估/分类（2x2 或 3x3） | `references/components/matrix.md` |
| PYRAMID | 层叠/基石支撑关系 | `references/components/pyramid.md` |
| FUNNEL | 转化漏斗/筛选收敛 | `references/components/funnel.md` |
| STAIRCASE | 逐级能力爬坡/成熟度递升 | `references/components/staircase.md` |

> **组件路由铁律**：
> * 线性路线图（如"现状 -> 转型 -> 愿景"）→ 使用 **PROCESS_FLOW**，不要用 STAIRCASE。
> * 只有强调"高度跃升/逐级爬坡"时 → 使用 **STAIRCASE**。
> * 必须有真实日期/年份权重时 → 使用 **TIMELINE**；无时间刻度权重的阶段展示 → 使用 **PROCESS_FLOW**。

## **4. 表现层：视觉风格与密度系统 (The Visual Layer)**

### **4.1 全局设计准则**

1. **字号一致性 (Uniform Typography)**: 单页内的 `TEXT_BODY`、`TEXT_LIST`、`DATA_TABLE` 必须共享同一基准字号，严禁层级跳跃和视觉割裂。
2. **变量驱动 (Variable-Driven)**: 样式微调必须严格限定在当前 `#slide-id` 的局部作用域内，优先复写 CSS 局部变量（如 `--font-base`），避免硬编码覆盖。

### **4.2 视觉风格引用**

视觉风格具体规范详细定义在 `references/styles/` 目录中。当用户要求特定风格时，请严格遵守表格中对应文件所定义的视觉指南：

| 风格关键字 (Style) | 规范文件路径 | 风格特征与适用场景 |
| :--- | :--- | :--- |
| **McKinsey / Swiss** (系统默认) | `references/styles/mckinsey.md` | **麦肯锡/瑞士经典风格**：极简、冷调单色体系 (冷灰/深蓝)、依靠网格建立绝对数据秩序。适用于严肃商业报告、咨询和结构化数据分析。 |
| **Business** | `references/styles/business.md` | **商务报告风格**：以深蓝/亮蓝为基调，搭配灰白相间（#F8FAFC卡片）的清晰结构，呈现专业可靠的质感。适用于高规格管理总结、深度行业战略报告、业务推演。 |

## **5. 渲染层：HTML 生成规范 (The Rendering Layer)**

### **5.1 布局转换逻辑**

* **Grid Container**: `.slide` 设置为 `display: grid; grid-template-columns: repeat(24, 1fr); grid-template-rows: repeat(24, 1fr);`。  
* **Mapping**: `grid-column: x / span w; grid-row: y / span h;`。

### **5.2 核心样式定义**

```css
/* ❌ 严禁在 body 中写 display, margin, padding, flex 等布局和占位属性，否则会导致组装合并后样式崩溃 */
/* ✅ body 仅允许声明通式的背景颜色或全局字体，以及去除浏览器默认边距 */
body {
  margin: 0;
  padding: 0;
  background-color: #e5e7eb;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

/* ✅ 所有的全屏居中预览和布局属性，交给外部打包器或仅写在这个局部独立容器内 */
/* 必须强制声明盒子模型为 border-box，避免因为 padding 撑破 24x24 严格网格导致静默溢出 */
.slide, .slide *, .slide *::before, .slide *::after {
  box-sizing: border-box;
}

.slide {
  width: 1280px;
  height: 720px;
  margin: 5vh auto;
  --slide-padding: 50px 60px;
  --gap: 10px;
  --font-base: 18px;
  padding: var(--slide-padding);
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(24, 1fr);
  gap: var(--gap);
  overflow: hidden;
  position: relative;
  /* background, box-shadow, border => styles/*.md */
}
```

### **5.3 自包含原则 (Self-Contained HTML)**

* **所有生成的 HTML 文件必须是完全自包含的**——McKinsey 主题变量、`.slide` 容器物理样式、组件级 CSS 全部内联在 `<style>` 标签内。
* **主题变量声明位置**: McKinsey 色板变量（`--primary`, `--accent` 等）声明在 `:root` 中。组装脚本 `build_presentation.js` 会自动将 `:root` 重写为 `#slide-XX` 以实现作用域隔离。
* **组件专属变量**: 仅当前幻灯片使用的局部变量（如 `--pyr-layer-h`、`--tl-header-h`）必须声明在 `#slide-XX.slide` 内，不得使用 `:root`。
* **严禁**通过 `<link rel="stylesheet">` 引用任何外部 CSS 模板文件。每个 HTML 输出必须独立可运行，不依赖外部样式资产。

### **5.4 图片生成 (Image Generation Strategy)**

* **策略**: **后置生成 (Lazy Generation / Placeholder First)**。
* **阶段 1 (Draft & Optimize)**: 
  * 禁止在布局调整阶段生成最终图片。
  * 必须使用通用占位图 (Universal Placeholder) 替代。
  * 推荐源: `https://placehold.co/800x600/e2e8f0/1e293b?text=Image+Placeholder` (支持任意拉伸)
  * 将用于生成图片的prompt写在占位区域内
* **阶段 2 (Finalization)**:
  * 仅当布局质检通过 (Layout Approved) 后，**利用网格规范或自行计算真实像素比例**，获取每个图片的最终真实像素尺寸 (Px Dimensions)。
  * **强制 Prompt 协议 (Mandatory Protocol)**: 
    * 调用 AI 绘图工具时，**必须以尺寸参数作为 Prompt 的开头**。
    * **Prompt 模版**: `[Dimensions: {W}x{H}] {Content Description} --ar {Aspect Ratio}`
    * **例子 (Correct)**: `[Dimensions: 1200x800] A futuristic city skyline with neon lights --ar 3:2`
    * **例子 (Incorrect)**: `A futuristic city skyline... (make it 1200x800)`
  * **严禁操作**: 严禁忽略尺寸直接生成，这会导致最终图片模糊或被裁切。
  * 替换占位图链接。

## **6. 端到端双模式状态机工作流 (Dual-Mode State Machine & Assembly)**

为了确保在本地零配置也能畅通无阻地使用此技能，AI 助手在每次开启新会话时，必须**默认执行环境就绪检查**：
*   **【零阻力包管理检查】**：在执行任何底层 Node.js 脚本之前，务必在后台静默运行命令：\`cd path/to/slide-creator-skill && npm install\`（或者检测 \`node_modules\` 确认依赖）。确保诸如 jsdom、puppeteer、css-tree 这类库已被正确安装，防止脚本引发不可预期的崩溃。

为了避免大模型同时进行“生成与排版查错”导致算力崩溃，本技能在执行时必须严格遵循 **状态阻断原则**。你不能（MUST NOT）在一个回合里既写代码又做 QA。

⚠️ **基础设施黑盒原则 (Black-box Infrastructure)**：
严禁使用工具（如 view_file 或 cat）去读取 `build_presentation.js` 或 `simple_layout_inspector.js` 的源代码。你必须将它们视作绝对可靠的底层黑盒执行器。只需按照给定的 CLI 命令调用并读取其标准输出 (stdout) 即可。读取 JS 源码不仅毫无必要，还会污染你生成 CSS 时宝贵的上下文注意力。

#### Phase 1: 纯生成模式 (Generation Mode): 全量生成单页 HTML

*   **创建独立工作区**：每次生成新建专属文件夹 `{YYYYMMDD_HHMMSS}_{Title}/` 存放所有相关文件。
*   **逐页独立生成**：每页输出为自包含的独立 HTML（包含完整的 `<html>` 到 `<body>`），命名为 `page_01_cover.html` 等。
*   **强制验算协议 (Grid Math CoT)**：每页 `<style>` 标签第一行**必须**写出该页 24 行网格高度校验注释，例如：`/* Grid Math Check: Title(span 3) + Content(span 20) + Source(span 1) = 24. Math OK! */`。完成验证后方可继续编写样式。
*   **单页局部作用域 (CSS Scoping)**：
    *   **变量与背景声明**：主题色变量（如 `--primary`）必须完整声明在 `:root` 中，全局背景色必须声明在 `body` 中。合并脚本会自动安全隔离。
    *   **禁止硬编码 ID 前缀**：编写单页 CSS 时，**严禁**手动添加专属 ID 前缀（如 `#slide-cover`），直接写常规类名即可，隔离由脚本自动完成。
    *   **禁止污染 body 布局**：单页 `body` 仅限设置 `background-color` 与 `font-family`，**绝对禁止**任何排版或容器属性（如 `margin`、`padding`、`display: flex` 等）。
*   **等待全部生成完毕**：所有页生成完毕并存入工作区后，才能进行组装。
*   **执行合并脚本**：运行命令组合幻灯片：
    `node slide-creator/scripts/build_presentation.js --in <工作区路径> --out <输出HTML路径> --title "<演示文稿标题>"`
*   **交付与人机阻断 ⛔**：合并完成后必须**立即停止执行**，输出最终 HTML 路径并提示用户接管：
    > *"初版幻灯片结构已合并完毕。进入【人机强制阻断节点】。请您在浏览器中巡查样式；或回复我：“开始检查和优化[或指出具体排版问题]”，我将进入复查模式。"*

#### Phase 2: 纯验收纠错模式 (QA & Iteration Mode)
*   **触发条件**：仅在人类明确要求“开始检查和优化”或指出排版问题时进入。
*   **执行方式**：
    1.  **运行检测脚本**：**人工纠错前，必须先运行脚本**：`node slide-creator/scripts/simple_layout_inspector.js <HTML路径>`。
    2.  **双轨审查 (§7 QA清单)**：
        *   **数据裁决 (脚本+LLM)**：脚本输出溢出(Overflow)、重叠(Overlap)、留白(Whitespace)数据，但不做对错判定。你需结合排版语义判断这是否属于Bug并修复。
        *   **视觉美学 (纯LLM)**：人工审查脚本无法测出的纯视觉法则（如对齐、字号层级、多列对称性等）。
    3.  **单页出具报告**：按页输出 QA 审查结果（格式：`* [PASS/FAIL] 规则编号: 判定依据`），无错页也要宣判。
    4.  **重新闭环交付**：修复后重新执行打包合并脚本，并等待人类复核。

##### 迭代式修正策略 (Troubleshooting Toolbox)
发现质量问题（重叠、溢出、过度留白）时，按以下补救措施执行：
*   **动态字号填充**：遭遇空洞留白时，主动升级基准字号，依靠文字张力自然填满容器。
*   **调整手段**：打乱重组组件尺寸 (h/w)、增删文本内容或微调间距字号 (`line-height` / `padding` / `font-base`)。
*   **对半跳跃调参**：数值微调**严禁步进** (如 20->19)，必须采用**“对半跳跃”** (如 20->10) 快速测试边界收敛。
*   **字号红线**：即便发生溢出，**正文字号绝对严禁压缩至 11px 以下（标题不低于 14px）**，宁可截断也不允许极小字号。
*   **风格锁定**：修复时绝不允许擅加阴影、圆角等破坏原始风格特征的属性。

## **7. 严格质量验收标准 (Unified QA Checklist)**

所有 Slide 组装完毕后，必须依循此表对最终生成的 `[Title].html` 中的每一页进行审查。所有验收标准均以此文档为唯一真理。

### 7.1 全局视觉法则 (Global Visual QA)

**【📊 脚本测量 + LLM 裁决区】(脚本仅提示物理观测现象，LLM 负责审判)**
*(注：`simple_layout_inspector.js` 脚本运行后会查出所有交叠、溢出与留白的现象，但它**不判断对错 (不报错)**。LLM 必须读取 Report 数据，自行结合排版语义判断这究竟是个 Bug 还是良性设计。)*
* **G01 [数据辅助]**: 元素间重叠 (Overlap) 裁决。脚本如果报出有元素重叠，你需要判断：如果是文字被意外遮挡，则必须修复（Fail）；如果是刻意设计的层叠或者坐标轴标签故意伸入背景，则允许通过（Pass）。
* **G02 [数据辅助]**: 内容溢出 (Overflow) 裁决。脚本如果报出某容器溢出，你需要判断：如果是长文本被截断挤出边框，或者组件破坏了 24x24 栅格，必须修复（Fail）；如果是故意让背景图或无害线条延展出限定框，则是合法特效（Pass）。
* **G06 [数据辅助]**: 留白比例 (Whitespace) 裁决。参考脚本输出的留白率数据结合页面密度类型判断。封面或过渡页允许巨大留白（Pass），但复杂数据密集页（如矩阵、图表、阶梯）如果留白比例 > 30% 则大概率排版失衡需要调整填充（Fail）。

**【👁️ LLM 专家级排查区】(纯视觉心智能力检验，无脚本数据排查)**
* **G03**: 矩阵、流程步骤、多列元素块在垂直和水平方向上严格对齐？(检测中轴线和对称性)
* **G04**: 图文混排区的上下两部分在左右宽度边界上居中或两端对齐？(检测视觉平衡度)
* **G05**: 页面四周边距是否均匀、对称、不逼仄？
* **G07**: 高密度或组件排版页面是否遵守零空偏，相邻元素无空的 grid 坐标？封面等低密度过渡页允大跨度跳行留白？
* **G08**: 同层级正文字号是否统一（无忽大忽小），且在 14px-22px 之间（理想 16px-22px）？
* **G09**: 多列表格/矩阵中的重复分类词汇是否已抽取为统一的行或者列表头？(检测信息降噪)
* **G10**: 纵向文本文字顺序是否从上到下逻辑正确？

### 7.2 专用组件规范 (Component-Specific Visual QA)

**组件专属的 QA 验收条件已下沉至各组件的参考文件中**（`references/components/*.md` 的 `## QA 验收条件` 章节）。在 QA 模式下，读取当前页面使用的组件参考文件，对照其中的 C-XXX 规则逐项验收。

## **8. Anti-Patterns 黑名单 (绝对禁止)**

以下行为将被视为生成质量不合格，必须在自检中彻底消灭：

* ❌ **色彩漂移 (Color Drift)**：禁止使用 `styles/*.md` 中未定义的 HEX 色值。所有颜色必须通过 CSS 变量引用。
* ❌ **字号不稳 (Font Size Jitter)**：同一页面内同层级文本（如所有 `<li>`）字号必须一致，禁止在不同元素间随意指定不同 px 值。
* ❌ **随意 Padding (Padding Chaos)**：禁止在容器上硬编码 `padding: 10px 20px` 等随意数值，必须通过 `--slide-padding`、`--gap` 等变量控制。
* ❌ **文字墙 (Wall of Text)**：禁止将原始 Markdown 的长段落直接放入 HTML。必须提炼为 Bullet Points 或明确的短句结构。
* ❌ **孤立标题 (Orphaned Title)**：标题与正文内容之间不得出现大片空白，标题必须与其下属内容紧密贴合。
* ❌ **Emoji 图标**：严禁使用 emoji 替代设计元素或结构图标。
* ❌ **组件混淆 (Component Confusion)**：严禁在一个页面中混合使用两种不同组件的 DOM 结构（如把 Chevron 逻辑塞进 Staircase 骨架）。
