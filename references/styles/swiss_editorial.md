# Visual Style: Swiss Editorial (瑞士排版风)

这是深受经典瑞士平面设计（Swiss Design / International Typographic Style）影响的幻灯片风格。强调极其严谨的网格系统、非对称的排版平衡、大面积留白与高对比度的无衬线字体。

## 1. 视觉哲学
* **网格至上 (Grid as Law)**：一切元素必须严格吸附在底层的网格上。
* **非对称平衡 (Asymmetric Balance)**：通过左右不对称的巨大字号和图形创造视觉张力。
* **粗野主义排版 (Typographic Brutalism)**：文字不仅是信息的载体，更是版面的主要图形元素。
* **高对比度 (High Contrast)**：大面积留白搭配纯黑纯白的极简色块。

## 2. 全局视觉基建 (Global Primitives)
* **无圆角**：绝对直角，0px圆角。
* **边框极简**：仅在极少数需要结构划分的地方使用 1px 黑线。
* **无阴影**：绝对扁平化，摒弃所有的 Box Shadow 和 Z-轴伪造。

## 3. Machine-Readable Tokens (机器读取变量)

```json
{
  "theme": "swiss_editorial",
  "design-variance": 6,

  "layout": {
    "archetype": "grid",
    "allow-asymmetric-columns": true,
    "allow-z-overlap": true,
    "allow-rotation": true,
    "zero-gap-enforcement": "relaxed"
  },

  "palette": {
    "primary": "#000000",
    "accent": "#FF2A00",
    "bg-base": "#FDFDFD",
    "bg-surface-light": "#F2F2F2",
    "bg-surface": "#EBEBEB",
    "text-main": "#000000",
    "text-light": "#555555",
    "grid-line": "#000000"
  },

  "typography": {
    "font-family": "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
    "h1": { "size": "72px", "weight": 900, "color": "var(--primary)", "letter-spacing": "-0.03em" },
    "h2": { "size": "48px", "weight": 800, "color": "var(--primary)" },
    "h3": { "size": "24px", "weight": 700, "color": "var(--primary)" },
    "body": { "size": "16px", "weight": 400, "color": "var(--text-main)", "line-height": 1.4 },
    "max-contrast-ratio": 4.5
  },

  "density-budgets": {
    "low":    { "gap": "40px", "max-whitespace-ratio": 0.55 },
    "medium": { "gap": "24px", "max-whitespace-ratio": 0.35 },
    "high":   { "gap": "16px", "max-whitespace-ratio": 0.20 }
  },

  "surface": {
    "type": "flat",
    "card-radius": "0px",
    "card-border": "none",
    "card-shadow": "none",
    "inner-highlight": "none",
    "background-effect": "none",
    "shadow-tint-to-bg": false
  },

  "forbidden-patterns": [
    "border-radius",
    "box-shadow",
    "gradients",
    "multicolor-icons",
    "center-alignment"
  ],
  "chart-rules": {
    "sequence": ["#000000", "#FF2A00", "#555555", "#EBEBEB"],
    "gridlines": "dashed var(--grid-line)",
    "axis-color": "var(--text-main)"
  },
  "image-treatment": {
    "inherit-surface-radius": true,
    "filter": "grayscale(100%) contrast(120%)",
    "framing": "full-bleed",
    "caption-style": "12px var(--text-light)"
  },
  "diagram-rules": {
    "stroke-width": "3px",
    "arrow-style": "sharp",
    "node-fill": "outline"
  },
  "component-overrides": {
    "funnel": { "default-variant": "sharp-blocks" },
    "matrix": { "hide-axis-lines": false }
  }
}
```
