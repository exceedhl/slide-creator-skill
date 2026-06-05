# Visual Style: Product Launch (产品发布会风)

适用于类似 Apple、Tesla 的大型 C 端产品发布会。强调单页极度聚焦、巨幅图片、极少文字和极其克制的排版。

## 1. 视觉哲学
* **以图代文 (Show, Don't Tell)**：满屏的产品渲染图或视频是主角，文字只是极小的点缀。
* **巨幕排版 (Cinematic Scale)**：文字使用巨星级别的排版，极大的主干词汇搭配极小的解释说明。
* **深色沉浸 (Immersive Dark Mode)**：通常在全黑的背景下，让产品自身发光，或者在纯白的背景下展示极致的工业设计。

## 2. 全局视觉基建 (Global Primitives)
* **全出血 (Full Bleed)**：图片和核心色块必须完全贴满屏幕边缘，不留白边。
* **超轻字体 (Ultra Light/Thin)**：在极大的字号下使用非常纤细的字体权重（Weight 200/300），展现优雅与高级。
* **无边框**：绝对禁止使用线框去包裹元素，所有的布局全靠图文本身的对比和呼吸感空间支撑。

## 3. Machine-Readable Tokens (机器读取变量)

```json
{
  "theme": "product_launch",
  "design-variance": 7,

  "layout": {
    "archetype": "grid",
    "allow-asymmetric-columns": true,
    "allow-z-overlap": false,
    "allow-rotation": false,
    "zero-gap-enforcement": "relaxed"
  },

  "palette": {
    "primary": "#FFFFFF",
    "accent": "#0071E3",
    "bg-base": "#000000",
    "bg-surface-light": "#1C1C1E",
    "bg-surface": "#2C2C2E",
    "text-main": "#F5F5F7",
    "text-light": "#86868B",
    "grid-line": "#3A3A3C"
  },

  "typography": {
    "font-family": "-apple-system, BlinkMacSystemFont, \"SF Pro Display\", sans-serif",
    "h1": { "size": "80px", "weight": 600, "color": "var(--primary)", "letter-spacing": "-0.02em" },
    "h2": { "size": "48px", "weight": 500, "color": "var(--primary)" },
    "h3": { "size": "28px", "weight": 400, "color": "var(--text-main)" },
    "body": { "size": "20px", "weight": 300, "color": "var(--text-light)", "line-height": 1.4 },
    "max-contrast-ratio": 4.0
  },

  "density-budgets": {
    "low":    { "gap": "60px", "max-whitespace-ratio": 0.65 },
    "medium": { "gap": "40px", "max-whitespace-ratio": 0.45 },
    "high":   { "gap": "24px", "max-whitespace-ratio": 0.25 }
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
    "borders",
    "table-layouts",
    "dense-bullet-points",
    "visible-grids"
  ],
  "chart-rules": {
    "sequence": ["#FFFFFF", "#CCCCCC", "#999999", "#666666"],
    "gridlines": "dashed var(--grid-line)",
    "axis-color": "var(--text-main)"
  },
  "image-treatment": {
    "inherit-surface-radius": true,
    "filter": "none",
    "framing": "full-bleed",
    "caption-style": "12px var(--text-light)"
  },
  "diagram-rules": {
    "stroke-width": "2px",
    "arrow-style": "sharp",
    "node-fill": "solid"
  },
  "component-overrides": {
    "funnel": { "default-variant": "sharp-blocks" },
    "matrix": { "hide-axis-lines": true }
  }
}
```
