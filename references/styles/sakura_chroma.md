# Visual Style: Sakura Chroma (复古日系包装风)

适用于需要营造复古日系磁带包装或模拟时代产品目录氛围的场景：独立硬件品牌路演、音乐厂牌发行计划、创意工作室年报或充满复古科技感的产品发布。通过奶油色纸张、对角线彩虹丝带、紧凑的粗体字和 JIS 风格规格复选框，带来强烈的触感与印刷品个性。

## 1. 视觉哲学 (Design Philosophy)
* **复古印刷材质 (Vintage Print Texture)**：在温暖的奶油色背景上叠加细微的半调网点（Halftone-dot）纹理，模拟真实的复古纸张质感。
* **高饱和原色色块 (Bold Primary Colors)**：采用六色基础调色板（红、粉、橙、黄、绿、蓝），作为扁平色块、丝带或产品条的重点装饰，色彩强烈且充满活力。
* **复古磁带元素 (Cassette Package Motif)**：大量使用对角线横跨的彩虹条带（Diagonal stripe bands），重现80年代日本科技产品与录音带的包装美学。
* **重型压缩字体 (Heavy Condensed Typography)**：大标题采用极具视觉冲击力的压缩黑色无衬线展示字体 (Big Shoulders Display)，配以暖深棕色 (Ink) 或背景反白，强调海报般的锁排 (Lockup) 效果。
* **JIS 风格微排版 (JIS-style Micro Typography)**：规格表、注脚和复选框使用等宽字体 (JetBrains Mono) 和粗犷的线条框，穿插极简的日文汉字 (Noto Sans JP) 作为装饰徽章或印章。
* **波普花瓣装饰 (Petal-blob Clusters)**：背景常有五色重叠的完美圆形组合成的“花瓣”色块图案，增加视觉的趣味性与流行感。

## 2. 全局视觉基建 (Global Primitives)
* **布局与边框 (Layout & Borders)**：摒弃现代的圆角阴影，卡片与容器采用绝对的直角边框，边框线条颜色统一使用深棕色 (`#3A2516`)。
* **徽章与印章 (Badges & Stamps)**：通过 CSS `clip-path` 制作 12 角的锯齿形爆炸贴 (Starburst shape) 或带有微小旋转角度 (-3deg) 的红色矩形印章，用于强调数字或品牌名。
* **排版层次 (Typographic Hierarchy)**：
  - 超大数字/标题 (Hero/Statement)：`Big Shoulders Display`，极大的字号，极紧凑的行高 (0.84) 与负字间距。
  - 正文/说明 (Body/Micro)：现代清晰的 `Albert Sans`，确保在大量文字时的阅读性。
  - 数据/标签 (Data/Tags)：程序员风格的 `JetBrains Mono`。
* **数据均衡器 (Data/Equalizer Bars)**：数据可视化不使用传统图表，而是用类似音响 VU 表（音量均衡器）的堆叠色块表现，不同颜色代表不同频段或维度。

## 3. Machine-Readable Tokens (机器读取变量)

```json
{
  "theme": "sakura-chroma",
  "design-variance": 8,

  "layout": {
    "archetype": "bento",
    "allow-asymmetric-columns": true,
    "allow-z-overlap": true,
    "allow-rotation": true,
    "zero-gap-enforcement": "strict"
  },

  "palette": {
    "primary": "#F1E6CB",
    "accent": "#E5392A",
    "bg-base": "#F1E6CB",
    "bg-surface": "#F1E6CB",
    "bg-surface-light": "#E5D6B0",
    "text-main": "#3A2516",
    "text-light": "rgba(58,37,22,0.7)",
    "grid-line": "#3A2516",
    "red": "#E5392A",
    "pink": "#E54489",
    "orange": "#F09131",
    "yellow": "#F0BC2A",
    "green": "#3D9F47",
    "blue": "#3F8BC4",
    "ink": "#3A2516",
    "paper": "#F1E6CB"
  },

  "typography": {
    "font-family": "'Albert Sans', 'Helvetica Neue', sans-serif",
    "external-fonts": [
      "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;700;800;900&family=Albert+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+JP:wght@500;700&display=swap"
    ],
    "h1": { "size": "120px", "weight": 900, "color": "var(--ink)", "font-family": "'Big Shoulders Display', sans-serif", "letter-spacing": "-0.025em", "line-height": 0.84 },
    "h2": { "size": "70px", "weight": 900, "color": "var(--ink)", "font-family": "'Big Shoulders Display', sans-serif", "letter-spacing": "-0.022em", "line-height": 0.86 },
    "h3": { "size": "52px", "weight": 900, "color": "var(--ink)", "font-family": "'Big Shoulders Display', sans-serif", "line-height": 0.9 },
    "body": { "size": "15px", "weight": 400, "color": "var(--ink)", "line-height": 1.5, "font-family": "'Albert Sans', sans-serif" },
    "mono": { "size": "12px", "weight": 400, "color": "var(--ink)", "font-family": "'JetBrains Mono', ui-monospace, monospace", "letter-spacing": "0.04em" },
    "max-contrast-ratio": 4.5
  },

  "surface": {
    "type": "paper-texture",
    "card-radius": "0px",
    "card-border": "1.5px solid #3A2516",
    "card-shadow": "none",
    "inner-highlight": "none",
    "background-effect": "radial-gradient(circle at 1px 1px, rgba(58,37,22,0.12) 1px, transparent 1.6px) 0 0 / 4px 4px",
    "shadow-tint-to-bg": false
  },

  "forbidden-patterns": [
    "soft-blur-shadows",
    "rounded-corners",
    "gradient-fills",
    "corporate-sans-serif",
    "subtle-colors",
    "perfect-alignment"
  ],

  "chart-rules": {
    "sequence": ["#E5392A", "#E54489", "#F09131", "#F0BC2A", "#3D9F47", "#3F8BC4"],
    "gridlines": "solid rgba(58,37,22,0.22)",
    "axis-color": "var(--ink)",
    "type-preference": "vu-equalizer-bars"
  },

  "image-treatment": {
    "inherit-surface-radius": false,
    "filter": "none",
    "framing": "hard-border",
    "caption-style": "14px var(--ink)"
  },

  "component-overrides": {
    "button": { "border": "1.5px solid #3A2516", "border-radius": "0px" },
    "card": { "border": "1.5px solid #3A2516", "background": "var(--paper)" },
    "badge": { "shape": "starburst-12-point", "background": "var(--ink)", "color": "var(--paper)" },
    "checkbox": { "style": "jis-cross", "border": "2px solid #3A2516" }
  }
}
```

## 4. CSS Contracts (必须遵循的 CSS 结构)

以下规则是此风格的核心视觉契约，Agent 在生成 HTML 时**必须**严格遵守这些 CSS 结构，禁止自由发挥替代方案。

### 4.1 Ledger Table (禁止原生 `<table>`)

此风格中所有数据列表/表格**必须使用 `div.ledger > div.row` 结构**，严禁使用 `<table>`/`<th>`/`<td>`：

```css
/* 行结构 — 纯 CSS Grid 列布局 */
.ledger { display: flex; flex-direction: column; gap: 0; }
.row {
  display: grid;
  grid-template-columns: /* 按内容定义列宽 */;
  gap: clamp(12px, 1.4vw, 24px);
  align-items: center;
  padding: clamp(10px, 1.2vh, 18px) 0;
  border-bottom: 1px solid rgba(58,37,22,0.22); /* 极淡水平线 */
}
.row.headrow {
  border-bottom: 1.5px solid var(--ink); /* 表头行略粗 */
  padding: 8px 0;
}
.row.headrow > div {
  font-family: 'Albert Sans', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: clamp(11px, 0.75vw, 12px);
}
```

**禁止**：垂直边框线、黑底白字表头、原生 `<table>` 元素。

**状态标签**使用 `.chip` 胶囊：
```css
.chip {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 4px 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(11px, 0.75vw, 12px);
  font-weight: 500; letter-spacing: 0.06em;
  color: var(--paper); text-transform: uppercase;
  /* 背景色取调色板: .chip.c-red { background: var(--red); } 等 */
}
```

### 4.2 VU Equalizer Bars (音量均衡器)

数据可视化使用 VU 表堆叠色块，**必须**遵循以下精确样式：

```css
/* 每列从底部堆叠 — 模拟真实 VU 表 */
.bcol {
  display: flex;
  flex-direction: column-reverse; /* 底部起始 */
  justify-content: start;
  height: 100%;
  gap: clamp(4px, 0.6vh, 8px);
}

/* 空状态格子 — 极淡透明 */
.seg {
  flex: 1 1 0;
  min-height: 12px;
  background: rgba(58, 37, 22, 0.10);
  border: 1px solid rgba(58, 37, 22, 0.22);
}

/* 激活状态 — 背景和边框同时变色 */
.seg.on {
  background: var(--color);
  border-color: var(--color);
}

/* 底部标签行 */
.ticks {
  border-top: 1px solid var(--ink);
  padding-top: clamp(8px, 1vh, 14px);
  display: grid;
  grid-template-columns: repeat(auto, 1fr);
  gap: clamp(8px, 1vw, 16px);
}
.ticklab {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(11px, 0.8vw, 12px);
  text-align: center;
}
```

### 4.3 Decorative Primitives (装饰图形语法手册)

以下装饰图形按需在页面中使用，**Agent 应严格按照给定的 CSS 规则生成**，不要自由发挥替代造型。

#### Petal Cluster (花瓣色块)
5 个绝对定位的 `border-radius: 50%` 完美圆形，颜色固定顺序：
```
p1: var(--red),    width: 50%, position 由页面决定
p2: var(--orange), width: 38%
p3: var(--blue),   width: 44%
p4: var(--green),  width: 50%
p5: var(--yellow), width: 32%
```
所有花瓣使用 `aspect-ratio: 1/1` 确保为完美圆形，容器设 `pointer-events: none; z-index: 3;`。

#### Diagonal Ribbons (对角彩带)
5 条色带，`transform: rotate(-22deg)`（或闭合页用 `+22deg`），颜色固定顺序：
```
pink → orange → yellow → green → blue
每条: width: 160%; left: -20%; height: 约 16-18%
容器: overflow: hidden; pointer-events: none; z-index: 3;
```

#### Rosette / Starburst (锯齿印章)
12 角锯齿形，使用以下固定 `clip-path`：
```css
clip-path: polygon(50% 0%, 60% 8%, 73% 4%, 76% 17%, 89% 18%, 87% 31%,
  100% 35%, 92% 47%, 100% 60%, 87% 64%, 90% 77%, 76% 78%, 75% 91%,
  62% 88%, 53% 100%, 42% 90%, 30% 96%, 25% 84%, 12% 86%, 13% 73%,
  0% 70%, 7% 58%, 0% 47%, 11% 39%, 4% 27%, 17% 25%, 13% 12%,
  27% 14%, 25% 1%, 38% 7%);
background: var(--ink); color: var(--paper);
font-family: 'Big Shoulders Display', sans-serif; font-weight: 900;
```

#### Stamp (红色印章)
```css
background: var(--red); color: var(--paper);
padding: clamp(8px, 1vh, 14px) clamp(14px, 1.4vw, 22px);
font-family: 'Big Shoulders Display', sans-serif; font-weight: 900;
transform: rotate(-3deg);
```

#### JIS Checkbox (JIS 复选框)
```css
.box { width: 14px; height: 14px; border: 2px solid var(--ink); background: transparent; }
.box.checked { background: var(--ink); }
.box.checked::after { content: '×'; color: var(--paper); display: grid; place-items: center; }
```

### 4.4 Hard Drop Shadow (硬阴影)

需要视觉强调的浮动卡片或引用文字，**必须**使用实色硬阴影，**严禁** blur：
```css
box-shadow: 8px 8px 0 var(--ink);
```

### 4.5 Micro Typography (微排版工具类)

```css
/* 标签/注脚 — 极小的等宽全大写 */
.caption {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(11px, 0.82vw, 13px);
  letter-spacing: 0.06em;
}

/* 分类标注 — 粗体全大写宽字距 */
.micro {
  font-family: 'Albert Sans', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

/* 标题强调色 — 使用 <em> 变色，不斜体 */
em { color: var(--red); font-style: normal; }
```

### 4.6 Halftone 纹理控制

`surface.background-effect` 中的 `rgba(58,37,22,0.55)` 是纹理的底层浓度。实际显示时通过伪元素的 `opacity` 属性单独控制显示浓度：
```css
.stage::before, .slide::before {
  opacity: 0.16; /* 显示浓度 — 极其细腻，不干扰文字阅读 */
}
```

