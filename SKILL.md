---
name: slide-creator
description: "把 Markdown 或非结构化文本做成自包含的多风格 HTML 幻灯片。当用户要求制作、生成幻灯片、PPT、演示文稿时使用。"
---

# Slide Creator

## 1. 核心定位

将非结构化文稿转化为具备商业出版级美感的自包含 HTML 幻灯片。
- **架构原则**：单页独立开发，脚本无损组装；几何图形采用内联 SVG，文字段落保留在 HTML DOM。
- **上下文纪律**：选定设计风格与复杂组件后，必须先阅读对应参考文档，严格继承色板、质感与排版节奏。

## 2. 画布与容器契约

- **画布规范**：物理尺寸锁死 **1280×720px**，`<body>` 内唯一根容器必须为 `<div class="slide">`。
- **CSS 作用域**：单页 CSS 变量声明在 `:root`，根节点状态使用 `.slide.cover`。组装脚本会自动将 `:root` 改写为 `#slide-XX` 局部作用域，禁止手动给样式硬编码 `#slide-*` 前缀。
- **三明治流式骨架**：默认推荐使用纵向三明治流式结构。主内容区必须设置 `min-height: 0`，防止子元素由于内容膨胀撑破 720px 画布。

```css
.slide, .slide *, .slide *::before, .slide *::after { box-sizing: border-box; }
.slide {
  width: 1280px; height: 720px; overflow: hidden; position: relative;
  display: flex; flex-direction: column; padding: 48px 56px; gap: 20px;
  background: var(--bg-base); color: var(--text-main);
  font-family: var(--font-family);
}
.slide-header, .slide-footer { flex: 0 0 auto; position: relative; z-index: 1; }
.slide-main { flex: 1; min-height: 0; position: relative; z-index: 1; }
```

- **Bento 范式**（Ethereal Glass、Sketch、Sakura Chroma）：卡片大小不等，必须有一张占主内容区 50% 以上面积的“英雄卡（Hero Card）”，其余卡片错落分布。呼吸留白是设计语言的一部分，严禁填鸭式铺满。
- **全出血布局**：仅在封面页、封底致谢或明确要求全屏沉浸时开启。覆盖为 `.slide { padding: 0; gap: 0; }`，底图或背景元素贴边覆盖，文字容器自身保留安全内边距。

## 3. 组件路由索引

简单内容（标题、段落、普通列表、单指标）直接使用语义化 HTML。遇到以下多维逻辑关系时，读取对应参考文件：

| 组件类型 | 适用场景 | 路由防呆（不要误用） |
| :--- | :--- | :--- |
| **CHART** | 数据走势、结构占比、多维横向对比 | 只有 1–2 个离散数字（应放大展示），或无定量关系 |
| **PROCESS_FLOW** | 平级阶段推演、审批流程、因果递进 | 带有明确真实年份（应选 TIMELINE），或纯无序清单 |
| **TIMELINE** | 历史沿革、里程碑、带年份/日期权重的路径 | 无时间刻度的阶段流程（应选 PROCESS_FLOW） |
| **MATRIX** | 交叉维度评估、四象限优先级、九宫格 | 单一维度对比或线性流程 |
| **PYRAMID** | 包含关系、自下而上的基石理论、能力分层 | 平级要素堆叠或无支撑关系的普通递进 |
| **FUNNEL** | 业务漏斗、线索转化、逐级收敛收缩 | 各阶段数量/比例无递减收缩关系的过程 |
| **STAIRCASE** | 成熟度模型进阶、强调高度跃升的能力台阶 | 平级线性路线图（应选 PROCESS_FLOW） |
| **FLYWHEEL** | 生态正向循环、互为驱动因果的业务闭环 | 无法形成闭合回路的单向流程 |
| **SYSTEM_DIAGRAM**| 分层体系结构（SaaS/PaaS/IaaS）、系统依赖 | 流程推演或定量数据分析 |
| **VALUE_CHAIN** | 波特价值链模型、核心业务主干与辅助活动 | 平级要素流水账 |

> **几何与文字分离铁律**：图形与连线一律采用原生内联 SVG，文字内容必须为外置或并排的 HTML 标签，确保浏览器自然换行并适配多语言折行。不要添加 `data-component` 等无下游消费的属性。

## 4. 视觉风格矩阵

用户未指定风格时，根据内容场景推荐其一。每页 HTML 必须完全内嵌当前风格的 `:root` 变量、字体 CDN 链接与签名特效：

| 风格关键字 | 参考文件 | 视觉特征与适用场景 |
| :--- | :--- | :--- |
| **Business** (默认) | `business.md` | 深蓝权威、严谨直角、零阴影、无彩色干扰。战略汇报与商业报告（含 mckinsey 变体） |
| **Research Report** | `research_report.md` | 学术线框分区、高信息密度、图表贴身论述。行研报告、技术白皮书 |
| **Soft Structure** | `soft_structure.md` | 银灰底色、纯白卡片、极浅弥散柔影。现代 SaaS、健康科技、创投路演 |
| **Swiss Editorial** | `swiss_editorial.md` | 粗野主义排版、纯黑白加克制纯红、不对称分栏、超大号字体。设计评审、创意提案 |
| **Editorial Luxury** | `editorial_luxury.md` | 暖调纸质噪点、经典衬线标题、60/40 杂志编辑分栏、校样角标。高端品牌叙事、ESG 报告 |
| **Executive Dark** | `executive_dark.md` | 近黑 OLED 深空、1px 细微光边框、宽阔留白。董事会决议、高管年度战略 |
| **Product Launch** | `product_launch.md` | 全出血沉浸底图、80px 巨幅标题、极度精炼文案。科技新品发布、Keynote |
| **Ethereal Glass** | `ethereal_glass.md` | 悬浮毛玻璃质感、内发光折射、克制径向光斑、不对称 Bento。前沿 AI 演讲、实验室展示 |
| **Sketch** | `sketch.md` | 不规则手绘圆角、实色硬偏移投影、纸张点阵、手写排版。创意白板、工作坊头脑风暴 |
| **Sakura Chroma** | `sakura_chroma.md` | 奶油复古纸感、彩虹对角色带、JIS 印章、压缩黑体展示。独立品牌路演、复古产品目录 |

## 5. 配图与资产管理

- **比例与适配**：图片容器统一使用标准宽高比（**16:9、4:3、1:1、3:4**）。图片标签严格声明 `width: 100%; height: 100%; object-fit: cover;`。
- **生图探针策略**：涉及配图前，主动询问用户：“本次需要配图，您希望使用：1. 内置生图工具 2. 自定义生图脚本 3. 放弃配图（使用纯 CSS 骨架与色块排版）”。严禁生成虚假的图片链接或死链。
- **提示词持久化**：生成成功的 Prompt 必须持久化记录在当前目录的 `image_prompts.json`。后续修改已存在页面时先读该文件，锁死原有画风前缀与比例。

## 6. 一体化交付与自检流水线

从本技能根目录执行命令。**大于 5 页或用户主动要求先看规划时**，先输出一张结构蓝图表征得确认；5 页及以内或用户指示直接生成时，直接执行：

| Page | 核心标题 | 版式规划 | 推荐组件 | 配图建议 |
| :---: | :--- | :--- | :--- | :--- |
| 1 | 新一代企业智能平台 | 全出血大图封面 | — | 16:9 深色科技质感 |
| 2 | 全球业务闭环链路 | 左右分栏 | FLYWHEEL | — |

### 生产闭环步骤：
1. **逐页独立输出**：每页写入专属工作区 `{YYYYMMDD_HHMMSS}_{Title}/` 下，如 `page_01_cover.html`。
2. **组装并触发自检**：
   ```bash
   node scripts/build_presentation.js --in <工作区> --out <工作区>/<标题>.html --title "<标题>"
   node scripts/simple_layout_inspector.js <工作区>/<标题>.html
   ```
3. **静默自愈**：读取命令行输出的 Inspector 结果并检视同目录生成的 `qa_slide_XX.png` 截图。
   - **硬错误（必须静默修好）**：文字被截断（Truncation）、元素超出画布边界（Canvas overflow）、正文低于 12px、图片加载失败。
   - **视觉自查**：中轴线对齐、字号层级清晰、无破坏主题的野色值、严禁直接堆砌未经提炼的段落长文本。
   - 若有错误，直接修正对应的单页 HTML，重新跑组装和检测，直至全绿。
4. **启动可视化编辑器并交付**：
   ```bash
   node scripts/editor/index.js <工作区>/<标题>.html
   ```
   输出合并后 HTML 的绝对路径与编辑器重启命令。

## 7. 严苛禁忌

- ❌ 禁止在组件内使用风格色板外的硬编码 HEX 颜色。
- ❌ 禁止将大段未经提炼的 Markdown 段落直接塞入页面，必须转化为要点（Bullet Points）或视觉模块。
- ❌ 禁止使用 Emoji 替代专业设计图标或流程指示符。
- ❌ 修复布局时，禁止随意硬编码 `margin` 或新增不同风格的阴影/圆角破坏原设计调性。
