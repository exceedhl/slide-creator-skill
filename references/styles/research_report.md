# Visual Style: Research Report & Academic Wireframe (行研报告与学术线框风)

适用于证券分析、产业行研、学术报告等需要呈现极高信息密度与多维数据的严肃场景。通过开启 `workshop_training` 变体，可以切换到蓝灰色底色、无衬线体并带轻微圆角的内部培训工作坊风格，增加亲和力。

## 1. 视觉哲学
* **数据密度至上 (Data Density)**：一切排版为呈现更多数据服务。字号可以下探至 13-14px。
* **分区分栏明确 (Clear Compartments)**：大量使用细框线、背景底色将版面划分为多个独立的数据块/卡片。
* **图表优先 (Chart-First)**：以数据可视化为绝对核心，文字通常环绕或附着于图表周围。

## 2. 全局视觉基建 (Global Primitives)
* **线框体系**：使用 1px 的浅灰色边框来包裹几乎所有的区块和图表，建立学术秩序。
* **克制用色**：主色调往往是经典的金融蓝或沉稳的墨绿。红色与绿色被严格保留给财务指标的涨跌。

## 3. Machine-Readable Tokens (机器读取变量)

```json
{
  "theme": "research_report",
  "design-variance": 2,

  "layout": {
    "archetype": "grid",
    "allow-asymmetric-columns": false,
    "allow-z-overlap": false,
    "allow-rotation": false,
    "zero-gap-enforcement": "strict"
  },

  "palette": {
    "primary": "#1E3A8A",
    "accent": "#D97706",
    "chart-up": "#DC2626",
    "chart-down": "#059669",
    "bg-base": "#FFFFFF",
    "bg-surface-light": "#F3F4F6",
    "bg-surface": "#E5E7EB",
    "text-main": "#111827",
    "text-light": "#4B5563",
    "grid-line": "#D1D5DB"
  },

  "typography": {
    "font-family": "Georgia, \"Times New Roman\", serif",
    "h1": { "size": "32px", "weight": 700, "color": "var(--primary)" },
    "h2": { "size": "24px", "weight": 700, "color": "var(--primary)" },
    "h3": { "size": "18px", "weight": 700, "color": "var(--text-main)" },
    "body": { "size": "14px", "weight": 400, "color": "var(--text-light)", "line-height": 1.5 },
    "max-contrast-ratio": 2.3
  },

  "density-budgets": {
    "low":    { "gap": "16px", "max-whitespace-ratio": 0.25 },
    "medium": { "gap": "12px", "max-whitespace-ratio": 0.18 },
    "high":   { "gap": "8px",  "max-whitespace-ratio": 0.12 }
  },

  "surface": {
    "type": "flat",
    "card-radius": "0px",
    "card-border": "1px solid var(--grid-line)",
    "card-shadow": "none",
    "inner-highlight": "none",
    "background-effect": "none",
    "shadow-tint-to-bg": false
  },

  "forbidden-patterns": [
    "large-empty-spaces",
    "rounded-corners",
    "playful-fonts",
    "bright-backgrounds"
  ],
  "chart-rules": {
    "sequence": ["#0F172A", "#334155", "#64748B", "#94A3B8"],
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
    "matrix": { "hide-axis-lines": false }
  },
  "variants": {
    "workshop_training": {
      "palette": {
        "primary": "#0F172A",
        "accent": "#0284C7",
        "bg-base": "#F8FAFC"
      },
      "typography": {
        "font-family": "Inter, system-ui, sans-serif"
      },
      "surface": {
        "card-radius": "8px"
      }
    }
  }
}
```
