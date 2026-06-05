# Visual Style: Executive Dark (高管深色风)

适用于高端董事会、战略发布、汽车/科技发布会的高管深色模式。传达深邃、昂贵、高端、聚焦的情绪。

## 1. 视觉哲学
* **暗夜剧场 (Theater Mode)**：使用极深的墨黑或藏青色铺底，将视觉焦点聚拢在高光文字和图表上。
* **低频发光 (Low-light Glow)**：克制地使用微妙的高光和微渐变边缘，绝不是赛博朋克式的刺眼霓虹。
* **留白聚焦 (Negative Space)**：在深色背景下，由于发光体会显得比实际更大，因此需要更多的留白来降低视觉疲劳。

## 2. 全局视觉基建 (Global Primitives)
* **柔和卡片**：在纯黑底色上使用非常深灰色的卡片，圆角控制在 8-12px。
* **细线发光**：使用 rgba(255, 255, 255, 0.1) 的微弱边框描绘卡片轮廓。
* **主次分明**：大片次要文字使用高透的灰色，核心数据使用纯白或品牌高亮色。

## 3. Machine-Readable Tokens (机器读取变量)

```json
{
  "theme": "executive_dark",
  "design-variance": 4,

  "layout": {
    "archetype": "grid",
    "allow-asymmetric-columns": false,
    "allow-z-overlap": false,
    "allow-rotation": false,
    "zero-gap-enforcement": "strict"
  },

  "palette": {
    "primary": "#FFFFFF",
    "accent": "#3B82F6",
    "accent-light": "#93C5FD",
    "bg-base": "#09090B",
    "bg-surface-light": "#18181B",
    "bg-surface": "#27272A",
    "text-main": "#FAFAFA",
    "text-light": "#A1A1AA",
    "grid-line": "#3F3F46"
  },

  "typography": {
    "font-family": "Inter, \"Helvetica Neue\", Arial, sans-serif",
    "h1": { "size": "48px", "weight": 600, "color": "var(--primary)" },
    "h2": { "size": "36px", "weight": 500, "color": "var(--primary)" },
    "h3": { "size": "24px", "weight": 500, "color": "var(--primary)" },
    "body": { "size": "15px", "weight": 300, "color": "var(--text-light)", "line-height": 1.6 },
    "max-contrast-ratio": 3.2
  },

  "density-budgets": {
    "low":    { "gap": "32px", "max-whitespace-ratio": 0.45 },
    "medium": { "gap": "24px", "max-whitespace-ratio": 0.30 },
    "high":   { "gap": "16px", "max-whitespace-ratio": 0.18 }
  },

  "surface": {
    "type": "glass",
    "card-radius": "8px",
    "card-border": "1px solid rgba(255,255,255,0.1)",
    "card-shadow": "none",
    "inner-highlight": "none",
    "background-effect": "none",
    "shadow-tint-to-bg": false
  },

  "forbidden-patterns": [
    "pure-black-bg",
    "harsh-white-bg",
    "sharp-corners"
  ],
  "chart-rules": {
    "sequence": ["#FFFFFF", "#9CA3AF", "#4B5563", "#374151"],
    "gridlines": "dashed var(--grid-line)",
    "axis-color": "var(--text-main)"
  },
  "image-treatment": {
    "inherit-surface-radius": true,
    "filter": "none",
    "framing": "padded",
    "caption-style": "12px var(--text-light)"
  },
  "diagram-rules": {
    "stroke-width": "1px",
    "arrow-style": "sharp",
    "node-fill": "solid"
  },
  "component-overrides": {
    "funnel": { "default-variant": "sharp-blocks" },
    "matrix": { "hide-axis-lines": true }
  }
}
```
