# Slide Creator Skill

Slide Creator 是一个强大的 AI 助手扩展技能包，专用于将普通的文本资料，直接转化为格式工整、排版专业的高阶幻灯片网页。告别繁琐的手动排版，让 AI 为你搞定一切结构与美化工作。

## ✨ 核心能力

- **强大的组件库 (Components)**：打破单调的纯文本，内置矩阵 (Matrix)、漏斗 (Funnel)、流程树 (Process Flow)、阶梯式 (Staircase) 等商业报告中高频使用的十几款核心排版组件。AI 会根据你的大纲语境自动调配。
- **严谨的自动化检测 (Automated QA)**：害怕 AI 生成的排版文字重叠或者跑出框外？遇到此类问题，我们内置了自动排版巡检器。配合排版规范，AI 能够通过测量布局溢出实现问题自愈修正。
- **自定义风格 (Custom Styling)**：从经典的极简“麦肯锡风”，到色彩鲜明的“现代商务风”。所有的样式都能自由定制，甚至可为你的品牌打造自己专属的主题。

---


## 🎨 Gallery 展示案例

> 以下所有内容均为该 Skill 独立处理结构化并直接生成 HTML 渲染的结果：

### 1. 2025 AI 发展报告 (2025_AI_Report)

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
  <img src="gallery/2025_AI_Report/slide_01_slide-01.png" width="100%" />
  <img src="gallery/2025_AI_Report/slide_02_slide-02.png" width="100%" />
  <img src="gallery/2025_AI_Report/slide_03_slide-03.png" width="100%" />
  <img src="gallery/2025_AI_Report/slide_04_slide-04.png" width="100%" />
</div>

<br/>

### 2. EV 研发咨询方案 (EV_RD_Consulting)

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
  <img src="gallery/EV_RD_Consulting/slide_01_page.png" width="100%" />
  <img src="gallery/EV_RD_Consulting/slide_02_slide-auto--1127084742.png" width="100%" />
  <img src="gallery/EV_RD_Consulting/slide_03_page.png" width="100%" />
  <img src="gallery/EV_RD_Consulting/slide_04_slide-auto--446282495.png" width="100%" />
</div>

<br/>

### 3. PostHog 薪资指南 (PostHog_Salary)

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
  <img src="gallery/PostHog_Salary/slide_01_slide-01.png" width="100%" />
  <img src="gallery/PostHog_Salary/slide_02_slide-02.png" width="100%" />
  <img src="gallery/PostHog_Salary/slide_03_slide-03.png" width="100%" />
  <img src="gallery/PostHog_Salary/slide_04_slide-04.png" width="100%" />
</div>

<br/>

### 4. Scrum vs Flow 效率对比 (ScrumVsFlow)

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
  <img src="gallery/ScrumVsFlow/slide_01_slide-cover.png" width="100%" />
  <img src="gallery/ScrumVsFlow/slide_02_slide-origins.png" width="100%" />
  <img src="gallery/ScrumVsFlow/slide_03_slide-economics.png" width="100%" />
  <img src="gallery/ScrumVsFlow/slide_04_slide-cynefin.png" width="100%" />
</div>

<br/>

> *注：上述截图并非全景，仅抽样展示前几张代表性布局。由于技能直接生成标准的 HTML/CSS，展示中涉及的占位图片均可在完成排版后由大模型按像素替换。*

---


## 🛠 开箱即用与环境依赖

- **Node.js**: 本地需安装 Node.js (v18+) 以执行打包与检测脚本。
- **NPM Modules**: 需要 `jsdom`、`css-tree` 以及 `puppeteer`。

打开终端并进入项目根目录，通过以下 npm 命令安装所需依赖：

```bash
npm install
```
*(技能内已配置好 `package.json`，部分智能 AI 将为你自动检查并执行这一步。)*

## 🚀 安装与使用方法

如果你的交互型 AI 原生支持指令式安装：

```bash
npx skills add exceedhl/slide-creator-skill
```

### 方式二：直接复制使用 (Direct Copy)

如果你的 IDE 环境不支持工具集指令，可通过直接复制文本体验功能：
1. **获取规则**：打开本技能库的 `SKILL.md`，复制其中的全部内容。
2. **输入语料**：在你的大模型对话框里写上：*“请遵守以下技能设定的限制条件与规范，帮我将这段语料生成一份幻灯片：[粘贴的 SKILL.md 内容]”*
3. **本地验证**：当需要启用排版自动化检查功能时，只需将本项目所在路径给到支持代码读取的开发辅助 AI（如 Cursor / Cline）。

---

### Prompt 触发示例

**场景一：全新生成一整套幻灯片**
把长文/调研扔给 AI，附加 Prompt：
> “使用你本地的 slide-creator-skill 帮我把这一份 3000 字的市场进入策略梳理成 12 页左右的商务报告 PPT。使用 Business 风格模板。”

AI 即会按照 `SKILL.md` 指南，逐页进行栅格尺寸的计算和生成拼接。

**场景二：启动脚本防边界溢出纠错 (QA Mode)**
当肉眼观察到某页排版的文字太多被挤压时：
> “检查并优化slides”

