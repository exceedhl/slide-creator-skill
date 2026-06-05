# Visual Style: Editorial Luxury & Magazine Story (编辑奢华 / 杂志故事风)

适用于高端品牌故事叙述、奢侈品牌战略报告、ESG 年度报告以及企业文化宣传等需要传达"手工质感"与"强烈情绪共鸣"的场景。深受顶级时尚杂志（Vogue、Monocle）的设计语言启发。通过开启 `magazine_story` 变体，可实现允许层叠和图文交织的自由感排版。

## 1. 视觉哲学
* **纸质温度 (Paper Warmth)**：使用暖调米白 (#FDFBF7) 或浅象牙色作为底色，配合极淡的噪点纹理，营造高端印刷品的物理存在感。
* **衬线统治 (Serif Dominance)**：巨大的衬线体标题（如 PP Editorial New、Playfair Display）搭配纤细的无衬线正文，形成经典的编辑式排版反差。
* **编辑式分栏 (Editorial Split)**：左侧 60% 放置核心内容，右侧 40% 留白或放置精美配图，模拟杂志版面的呼吸感。
* **首字下沉与引言 (Drop Caps & Quotes)**：关键段落使用超大首字或大引号装饰，增加叙事的仪式感。
* **混排强调 (Mixed Emphasis)**：标题中的关键词使用 Playfair Display italic 渲染，句末使用金铜色终止符 `·`，形成 sans-serif 粗体 × serif 斜体的编辑式混排节奏。

## 2. 全局视觉基建 (Global Primitives)
* **无边框**：绝不使用实体边框包裹内容，全靠排版的隐形网格和底色微变化维持秩序。
* **深棕/金铜强调色**：仅使用一个暖调金属色 (如深金铜 #8B6914) 作为唯一的 Accent。
* **照片处理**：所有配图施加轻微暖调滤镜 (sepia 15%)，保持与整体色温的统一。
* **超大留白**：低密度页面允许高达 65% 的留白率，让每一个元素都"呼吸"。
* **Eyebrow 标签**：每页/每区块顶部使用 `UPPERCASE · 11px · 0.22em letter-spacing · accent 色` 的小标签，左侧可加 18px 短横线前缀（如 `— ABOUT THE STUDIO · Nº 02`）。
* **Section Divider**：章节分隔使用 `border-top: 1px solid var(--grid-line)` + 两端对齐的 label 文字（左侧 section 名，右侧罗马数字章节号如 `I.`、`II.`）。
* **Corner Marks**：图片四角使用 1px accent 色 L 形标记线（22×22px），增加编辑校样感。
* **Image Annotations**：图片角落绝对定位的 monospace 10px 元数据文字（如编号 `Nº 03`、年份 `MMXXVI`、坐标），使用 `text-faint` 色。

## 3. Machine-Readable Tokens (机器读取变量)

```json
{
  "theme": "editorial_luxury",
  "design-variance": 7,

  "layout": {
    "archetype": "grid",
    "allow-asymmetric-columns": true,
    "allow-z-overlap": false,
    "allow-rotation": false,
    "zero-gap-enforcement": "relaxed"
  },

  "palette": {
    "primary": "#1A1A1A",
    "accent": "#8B6914",
    "accent-light": "#C9A84C",
    "bg-base": "#FDFBF7",
    "bg-surface-light": "#F7F4EE",
    "bg-surface": "#EDEAD8",
    "text-main": "#2D2D2D",
    "text-mute": "#8B8B8B",
    "text-light": "#6B6B6B",
    "text-faint": "#A8A8A0",
    "grid-line": "#D4D0C8"
  },

  "typography": {
    "font-family": "\"Playfair Display\", \"PP Editorial New\", Georgia, serif",
    "body": {
      "font-family": "\"Geist\", Inter, sans-serif"
    },
    "mono": {
      "font-family": "\"JetBrains Mono\", \"SF Mono\", Menlo, monospace"
    },
    "external-fonts": [
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
    ],
    "h1": { "size": "68px", "weight": 400, "color": "var(--primary)", "letter-spacing": "-0.02em", "line-height": 1.05 },
    "h2": { "size": "40px", "weight": 400, "color": "var(--primary)", "font-style": "italic" },
    "h3": { "size": "22px", "weight": 600, "color": "var(--accent)" },
    "body-text": { "size": "15px", "weight": 400, "color": "var(--text-main)", "line-height": 1.8 },
    "eyebrow": { "size": "11px", "weight": 600, "letter-spacing": "0.22em", "text-transform": "uppercase", "color": "var(--accent)" },
    "annotation": { "size": "10px", "weight": 400, "font-family": "mono", "color": "var(--text-faint)", "letter-spacing": "0.04em" },
    "max-contrast-ratio": 4.5,
    "mixed-emphasis": {
      "em": { "font-family": "\"Playfair Display\"", "font-style": "italic", "font-weight": 500 },
      "dot": { "content": "·", "color": "var(--accent)" }
    }
  },

  "density-budgets": {
    "low":    { "gap": "48px", "max-whitespace-ratio": 0.65 },
    "medium": { "gap": "32px", "max-whitespace-ratio": 0.45 },
    "high":   { "gap": "20px", "max-whitespace-ratio": 0.28 }
  },

  "surface": {
    "type": "editorial-paper",
    "card-radius": "0px",
    "card-border": "none",
    "card-shadow": "none",
    "inner-highlight": "none",
    "background-effect": "paper-texture",
    "shadow-tint-to-bg": false
  },

  "recommended-slide-kinds": [
    { "kind": "cover",     "description": "大衬线标题 + 60/40 图文，eyebrow 标签，底部元数据行" },
    { "kind": "divider",   "description": "章节分隔：居中罗马数字 + 大引言标题，极低密度" },
    { "kind": "narrative", "description": "正文叙述：60/40 不对称分栏，左文右图或反向" },
    { "kind": "data",      "description": "数据展示：ledger/table + accent 色高亮关键数值" },
    { "kind": "pullquote", "description": "大引号 + 首字下沉 + author 信息" },
    { "kind": "closing",   "description": "结尾致谢：mega serif italic kicker + 签名脚注" }
  ],

  "forbidden-patterns": [
    "heavy-borders",
    "neon-colors",
    "dense-data-tables",
    "sharp-corners-on-images",
    "box-shadow",
    "emoji-icons"
  ],
  "chart-rules": {
    "sequence": ["#8B6914", "#C9A84C", "#D4D0C8", "#EDEAD8"],
    "gridlines": "dashed var(--grid-line)",
    "axis-color": "var(--text-main)"
  },
  "image-treatment": {
    "inherit-surface-radius": true,
    "filter": "sepia(15%)",
    "framing": "padded",
    "caption-style": "italic 13px var(--text-light)",
    "corner-marks": true,
    "corner-mark-size": "22px",
    "corner-mark-color": "var(--accent-light)",
    "annotation-position": "bottom-right",
    "annotation-font": "var(--annotation)"
  },
  "diagram-rules": {
    "stroke-width": "1px",
    "arrow-style": "sharp",
    "node-fill": "solid"
  },
  "component-overrides": {
    "funnel": { "default-variant": "sharp-blocks" },
    "matrix": { "hide-axis-lines": false },
    "flywheel": {
      "default-variant": "circular",
      "default-text-position": "radial-outside",
      "icon-size": "64px",
      "icon-border": "1.5px solid var(--primary)",
      "icon-bg": "var(--bg-base)",
      "icon-svg-size": "28px",
      "icon-svg-stroke-width": "1.5px",
      "arc-stroke": "#6B6B6B",
      "arc-stroke-width": "1.5",
      "arrow-fill": "#6B6B6B",
      "core-has-divider": true,
      "node-num-style": "serif-accent"
    }
  },
  "variants": {
    "magazine_story": {
      "palette": {
        "accent": "#CBA871",
        "bg-base": "#FDFCF0"
      },
      "layout": {
        "allow-z-overlap": true
      }
    }
  }
}
```

## 4. 纸质纹理 CSS 实现 (Paper Texture)

当 `surface.background-effect` 为 `paper-texture` 时，**必须**在 `.slide::before` 中生成以下纹理叠加层：

```css
/* 纸质噪点纹理 — 从 surface.background-effect: paper-texture 触发 */
.slide::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(circle at 15% 20%, rgba(139, 105, 20, 0.04) 0, transparent 30%),
    radial-gradient(circle at 85% 70%, rgba(139, 105, 20, 0.03) 0, transparent 35%),
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.18 0 0 0 0 0.16 0 0 0 0 0.12 0 0 0 0.04 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: auto, auto, 240px 240px;
  mix-blend-mode: multiply;
  opacity: 0.5;
}
```

## 5. Eyebrow 标签 CSS 实现

```css
/* Eyebrow 标签 — 每页/每区块的顶部小标签 */
.eyebrow {
  font-family: "Geist", Inter, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.eyebrow::before {
  content: '';
  width: 18px;
  height: 1px;
  background: var(--accent);
  display: inline-block;
}
```

## 6. Corner Marks CSS 实现

```css
/* 图片四角 L 形标记线 — 增加编辑校样感 */
.img-frame { position: relative; }
.img-frame .corner {
  position: absolute;
  width: 22px; height: 22px;
  border-color: var(--accent-light);
  border-style: solid;
  border-width: 0;
}
.img-frame .corner.tl { top: 0; left: 0; border-top-width: 1px; border-left-width: 1px; }
.img-frame .corner.tr { top: 0; right: 0; border-top-width: 1px; border-right-width: 1px; }
.img-frame .corner.bl { bottom: 0; left: 0; border-bottom-width: 1px; border-left-width: 1px; }
.img-frame .corner.br { bottom: 0; right: 0; border-bottom-width: 1px; border-right-width: 1px; }
```

## 7. Section Divider CSS 实现

```css
/* Section 分隔行 — border-top + 两端 label */
.section-rule {
  border-top: 1px solid var(--grid-line);
  padding-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Geist", Inter, sans-serif;
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.section-rule .roman {
  font-family: "Playfair Display", Georgia, serif;
  font-style: italic;
  color: var(--accent);
  font-size: 14px;
  letter-spacing: 0.05em;
  text-transform: none;
}
```

