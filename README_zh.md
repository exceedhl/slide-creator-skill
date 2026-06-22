English | [简体中文](README_zh.md)

# Slide Creator Skill

Slide Creator skill 用于将Markdown文本直接转化为格式工整、排版专业的幻灯片网页。告别繁琐的手动排版，让 AI 为你搞定一切结构与美化工作。

## ✨ 核心能力

- **生成前的布局蓝图规划 (Blueprint Planning)**：在写任何代码之前，AI 会先输出一份表格形式的布局蓝图供你审阅——包含每页的标题文案、信息密度、排版方向和配图策略。你可以在生成之前自由调整、合并或重排页面顺序，大幅减少返工次数。
- **AI 图片生成集成**：需要封面配图或者概念示意图？技能会自动探测可用的 AI 生图工具（内置工具或你自己的自定义脚本），并主动询问你使用哪种方式。生成的图片 Prompt 会持久化保存在 `image_prompts.json` 中，后续编辑时可以完美继承原始画风。
- **强大的组件库 (Components)**：打破单调的纯文本，内置矩阵 (Matrix)、漏斗 (Funnel)、流程树 (Process Flow)、阶梯式 (Staircase) 等商业报告中高频使用的十几款核心排版组件。AI 会根据你的大纲语境自动调配。
- **严谨的自动化检测 (Automated QA)**：害怕 AI 生成的排版文字重叠或者跑出框外？遇到此类问题，我们内置了自动排版巡检器。配合排版规范，AI 能够通过测量布局溢出实现问题自愈修正。
- **10 种精美视觉风格 (10 Visual Styles)**：内置 10 套精心雕琢的设计主题（如商务经典/麦肯锡、行研报告、空灵玻璃、手绘涂鸦、暖调奢华、瑞士编辑等），完美契合各类演示场景。
- **全出血封面布局 (Full-Bleed)**：封面页和大图页支持零内边距的全出血栅格模式，图片可以完美贴边铺满——告别封面照片周围尴尬的白边。
- **WYSIWYG 交互式可视化编辑器**：内置本地可视化编辑器（基于 Tweakpane 与 Node.js 服务器），支持在浏览器中实时微调文案、字号、颜色和布局，修改结果会自动写回本地 HTML 文件。现已内置 `@media print` 打印/PDF 导出支持。

---

## 🎨 支持的视觉风格与展示案例

Slide Creator 支持 **10 种精美的视觉风格** 开箱即用。以下是使用该技能生成的 7 种代表性风格，点击 **在线网页预览** 可直接在浏览器中浏览交互式幻灯片，或点击图片查看高清截图：

### 1. Executive Dark (暗夜行政风)
> 极具科技感的 OLED 纯黑底板搭配精致发光的卡片边框。非常适用于高管汇报、董事会议 and 前沿科技演讲。
> 🔗 [在线网页预览](gallery/styles/executive_dark/index.html)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/executive_dark/slide_1.png"><img src="gallery/styles/executive_dark/slide_1.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/executive_dark/slide_2.png"><img src="gallery/styles/executive_dark/slide_2.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/executive_dark/slide_3.png"><img src="gallery/styles/executive_dark/slide_3.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/executive_dark/slide_4.png"><img src="gallery/styles/executive_dark/slide_4.png" width="100%" /></a></td>
  </tr>
</table>

### 2. Product Launch (产品发布风)
> 苹果新品发布会（Keynote）极简美学。特色为 80px 超大号字重排版、全出血巨幅配图、深色背景以及舒畅的呼吸留白。
> 🔗 [在线网页预览](gallery/styles/product_launch/index.html)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/product_launch/slide_1.png"><img src="gallery/styles/product_launch/slide_1.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/product_launch/slide_2.png"><img src="gallery/styles/product_launch/slide_2.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/product_launch/slide_3.png"><img src="gallery/styles/product_launch/slide_3.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/product_launch/slide_4.png"><img src="gallery/styles/product_launch/slide_4.png" width="100%" /></a></td>
  </tr>
</table>

### 3. Soft Structure (柔性 SaaS 风)
> 浅灰白色系柔和卡片，搭配精细的弥散阴影和低饱和度渐变点缀。非常适合软件产品介绍、SaaS 演讲以及初创团队的 Pitch Deck。
> 🔗 [在线网页预览](gallery/styles/soft_structure/index.html)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/soft_structure/slide_1.png"><img src="gallery/styles/soft_structure/slide_1.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/soft_structure/slide_2.png"><img src="gallery/styles/soft_structure/slide_2.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/soft_structure/slide_3.png"><img src="gallery/styles/soft_structure/slide_3.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/soft_structure/slide_4.png"><img src="gallery/styles/soft_structure/slide_4.png" width="100%" /></a></td>
  </tr>
</table>

### 4. Swiss Editorial (瑞士编辑风)
> 粗野主义排版美学。强调严密的网格排版系统、不对称分栏、极粗的纯黑网格线以及极度克制的纯红高亮点缀。
> 🔗 [在线网页预览](gallery/styles/swiss_editorial/index.html)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/swiss_editorial/slide_1.png"><img src="gallery/styles/swiss_editorial/slide_1.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/swiss_editorial/slide_2.png"><img src="gallery/styles/swiss_editorial/slide_2.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/swiss_editorial/slide_3.png"><img src="gallery/styles/swiss_editorial/slide_3.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/swiss_editorial/slide_4.png"><img src="gallery/styles/swiss_editorial/slide_4.png" width="100%" /></a></td>
  </tr>
</table>

### 5. Editorial Luxury (暖调奢华风)
> 带有暖色纸质纹理、极细排版分割线和衬线体排版。专为奢侈品行业报告、独立品牌叙事而设计。
> 🔗 [在线网页预览](gallery/styles/editorial_luxury/index.html)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/editorial_luxury/slide_1.png"><img src="gallery/styles/editorial_luxury/slide_1.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/editorial_luxury/slide_2.png"><img src="gallery/styles/editorial_luxury/slide_2.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/editorial_luxury/slide_3.png"><img src="gallery/styles/editorial_luxury/slide_3.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/editorial_luxury/slide_4.png"><img src="gallery/styles/editorial_luxury/slide_4.png" width="100%" /></a></td>
  </tr>
</table>

### 6. Sketch (手绘涂鸦风)
> 粗糙的手绘风格边框、硬投影、白板式简笔图标、手写字体以及褶皱纸张质感。极度适用于头脑风暴、创意工坊与自由风格的讨论。
> 🔗 [在线网页预览](gallery/styles/sketch/index.html)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/sketch/slide_1.png"><img src="gallery/styles/sketch/slide_1.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/sketch/slide_2.png"><img src="gallery/styles/sketch/slide_2.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/sketch/slide_3.png"><img src="gallery/styles/sketch/slide_3.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/sketch/slide_4.png"><img src="gallery/styles/sketch/slide_4.png" width="100%" /></a></td>
  </tr>
</table>

### 7. Sakura Chroma (复古日系风)
> 温暖的奶油色纸底，配以复古的彩虹斑斓边带、JIS印章图腾以及均衡器效果的数据卡片框架。
> 🔗 [在线网页预览](gallery/styles/sakura_chroma/index.html)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/sakura_chroma/slide_1.png"><img src="gallery/styles/sakura_chroma/slide_1.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/sakura_chroma/slide_2.png"><img src="gallery/styles/sakura_chroma/slide_2.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/styles/sakura_chroma/slide_3.png"><img src="gallery/styles/sakura_chroma/slide_3.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/styles/sakura_chroma/slide_4.png"><img src="gallery/styles/sakura_chroma/slide_4.png" width="100%" /></a></td>
  </tr>
</table>

---


## 🖥️ WYSIWYG 交互式可视化编辑器

Slide Creator 现在内置了本地可视化编辑器，极大地缩短了 AI 生成与人类个性化微调之间的距离。

![WYSIWYG 交互式可视化编辑器](gallery/editor_screenshot.png)

### 编辑器核心功能：
- **实时元素微调**：点击幻灯片上的任意元素（段落、列表、卡片、背景图等），即可在右侧面板实时调节字号、边距、颜色、对齐、边框以及网格尺寸。
- **直观文本修改**：在内容区域的文本框中直接编辑文案，幻灯片会即时自适应排版。
- **全局与局部控制**：支持局部覆盖（内联样式）、全局 CSS 类覆盖，或直接调整全局 CSS 变量（如主题色调代币）。
- **文件自动同步**：通过快捷键 `Ctrl+S` 或点击保存按钮，可将修改直接写回本地 HTML 文件。
- **PDF 导出**：内置演示与导出工具，支持将幻灯片一键输出为 PDF。

### 启动编辑器方式：
在生成并组装好幻灯片文件后，在终端中执行以下命令启动本地编辑器服务：
```bash
node scripts/editor/index.js <组装后的HTML文件路径>
```
服务启动后会自动在浏览器中打开 `http://localhost:5173`。

---


## 🛠 开箱即用与环境依赖

- **Node.js**: 本地需安装 Node.js (v18+) 以执行打包与检测脚本。
- **NPM Modules**: 需要 `jsdom`、`css-tree` 以及 `puppeteer`。

打开终端并进入项目根目录，通过以下 npm 命令安装所需依赖：

```bash
npm install
```

## 🚀 安装与使用方法

如果你的交互型 AI 原生支持指令式安装：

```bash
npx skills add exceedhl/slide-creator-skill
```

### 方式二：直接复制目录 (Direct Copy)

1. 下载或 Clone 本项目。
2. 将解压出的整个 `slide-creator-skill` 文件夹，直接复制搬运到你工程空间里的 Agent 技能目录（例如 `.agents/skills/` 之下）。
3. Agent 会在上下文中自动识别到 `SKILL.md` 的存在并自主加载这套排版工具能力。

---

### Prompt 触发示例

**场景一：全新生成一整套幻灯片**
把长文/调研扔给 AI，附加 Prompt：
> “使用你本地的 slide-creator-skill 帮我把这份市场进入策略生成 12 页左右的slide deck。使用 Business 风格模板。”

AI 即会按照 `SKILL.md` 指南，逐页进行栅格尺寸的计算和生成拼接。

**场景二：启动脚本防边界溢出纠错 (QA Mode)**
当肉眼观察到某页排版的文字太多被挤压时：
> “检查并迭代优化”



## 🤖 模型兼容性推荐 (Supported Models)
 
本技能在 **Gemini 3.5 Flash**, **Gemini 3.1 Pro**, **Claude 4.6**, 以及 **GLM 5.1** 上目前表现都还不错，2-3轮对话可以得到整体满意的结果。**Gemini 3.5 Flash** 和 **Claude 4.6** 表现相对优秀。
