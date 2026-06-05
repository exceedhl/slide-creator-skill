# Visual Style: Soft Structure & Modern SaaS (柔性结构与现代 SaaS 风)

适用于消费品品牌、健康科技、教育平台、个人作品集等需要传达"友好"、"现代"、"专业但不冰冷"的场景。深受 Apple Health、Headspace、Notion 等产品的设计语言启发。通过开启 `investor_pitch` 变体，可实现具有极高视觉张力、紫色发光阴影与超大字号的创投路演风格。

## 1. 视觉哲学
* **银灰呼吸 (Silver Breathing)**：使用极浅的银灰或纯白底色，配合超大的段落间距，营造"空气感"。
* **粗体 Grotesk (Bold Grotesk)**：标题使用大胆的粗体 Grotesk 字体（如 Outfit、Cabinet Grotesk），传达现代感与自信。
* **弥散柔影 (Diffused Shadows)**：卡片使用极度扩散、几乎透明的柔和阴影，营造"悬浮"而非"压印"的感觉。
* **圆润但克制 (Rounded but Restrained)**：使用 12-16px 的中等圆角，不过度甜腻，保持专业感。

## 2. 全局视觉基建 (Global Primitives)
* **白色卡片**：纯白卡片 (#FFFFFF) + 12px 圆角 + 极淡弥散阴影，浮于浅灰底色之上。
* **单一强调色**：仅使用一个中饱和度的清新色（如 Emerald #059669 或 Sky #0284C7）。
* **大留白**：段落间距大于正文字号的 2 倍，让内容"漂浮"而非"堆砌"。
* **图标**：使用纤细的线性图标（Phosphor Light 风格），与整体轻盈感保持一致。

## 3. Machine-Readable Tokens (机器读取变量)

```json
{
  "theme": "soft_structure",
  "design-variance": 5,

  "layout": {
    "archetype": "grid",
    "allow-asymmetric-columns": true,
    "allow-z-overlap": false,
    "allow-rotation": false,
    "zero-gap-enforcement": "relaxed"
  },

  "palette": {
    "primary": "#111827",
    "accent": "#059669",
    "accent-light": "#6EE7B7",
    "bg-base": "#F9FAFB",
    "bg-surface-light": "#FFFFFF",
    "bg-surface": "#F3F4F6",
    "text-main": "#1F2937",
    "text-light": "#6B7280",
    "grid-line": "#E5E7EB"
  },

  "typography": {
    "font-family": "\"Outfit\", \"Cabinet Grotesk\", \"Helvetica Neue\", sans-serif",
    "h1": { "size": "52px", "weight": 700, "color": "var(--primary)", "letter-spacing": "-0.02em" },
    "h2": { "size": "36px", "weight": 600, "color": "var(--primary)" },
    "h3": { "size": "22px", "weight": 600, "color": "var(--text-main)" },
    "body": { "size": "16px", "weight": 400, "color": "var(--text-light)", "line-height": 1.7 },
    "max-contrast-ratio": 3.3
  },

  "density-budgets": {
    "low":    { "gap": "36px", "max-whitespace-ratio": 0.50 },
    "medium": { "gap": "24px", "max-whitespace-ratio": 0.35 },
    "high":   { "gap": "16px", "max-whitespace-ratio": 0.22 }
  },

  "surface": {
    "type": "flat",
    "card-radius": "12px",
    "card-border": "none",
    "card-shadow": "0 8px 30px -10px rgba(0,0,0,0.06)",
    "inner-highlight": "none",
    "background-effect": "none",
    "shadow-tint-to-bg": false
  },

  "forbidden-patterns": [
    "pure-black-bg",
    "heavy-borders",
    "neon-colors",
    "sharp-corners"
  ],
  "chart-rules": {
    "sequence": ["#059669", "#6EE7B7", "#3B82F6", "#93C5FD"],
    "gridlines": "dashed var(--grid-line)",
    "axis-color": "var(--text-light)"
  },
  "image-treatment": {
    "inherit-surface-radius": true,
    "filter": "none",
    "framing": "padded",
    "caption-style": "13px var(--text-light)"
  },
  "diagram-rules": {
    "stroke-width": "2px",
    "arrow-style": "rounded",
    "node-fill": "solid"
  },
  "component-overrides": {
    "funnel": { "default-variant": "rounded-pipeline" },
    "matrix": { "hide-axis-lines": false }
  },
  "variants": {
    "investor_pitch": {
      "palette": {
        "accent": "#8B5CF6",
        "bg-base": "#FAFAFA"
      },
      "typography": {
        "h1": { "size": "64px", "weight": 800, "color": "var(--primary)", "letter-spacing": "-0.04em" }
      },
      "surface": {
        "card-shadow": "0 10px 30px -8px rgba(139,92,246,0.15)"
      }
    }
  }
}
```
