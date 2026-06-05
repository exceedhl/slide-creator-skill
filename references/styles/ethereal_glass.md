# Visual Style: Ethereal Glass (空灵玻璃风)

适用于 AI/科技主题演讲、前沿技术发布、创新实验室展示等需要传达"未来感"和"技术深度"的场景。深受 Vercel、Linear 等顶级科技产品设计语言启发。

## 1. 视觉哲学
* **深空舞台 (Deep Space Stage)**：使用接近 OLED 黑的极深底色，让内容如同悬浮在虚空中的发光体。
* **玻璃折射 (Glass Refraction)**：超越简单的毛玻璃效果，通过 1px 内发光边框、内阴影高光模拟真实玻璃的边缘折射。
* **克制发光 (Restrained Glow)**：背景使用极淡的径向渐变光斑（如蓝色/紫色），营造深邃空间感，但绝不是赛博朋克的刺眼霓虹。
* **不对称张力 (Asymmetric Tension)**：允许大面积留白与紧凑信息块形成强烈对比，通过非对称分栏创造视觉张力。

## 2. 全局视觉基建 (Global Primitives)
* **玻璃卡片**：深灰底色卡片 + 16px 圆角 + 1px rgba 白色边框 + 内阴影高光。
* **弥散阴影**：卡片阴影宽大柔和、扩散远、透明度极低，营造"悬浮"感。
* **单一强调色**：仅使用一个高纯度蓝/紫色作为唯一的 Accent，其余全部收敛为灰度。
* **纤细无衬线**：使用 Geist / Satoshi 等现代几何 Grotesk 字体，紧缩字距。

## 3. Machine-Readable Tokens (机器读取变量)

```json
{
  "theme": "ethereal_glass",
  "design-variance": 8,

  "layout": {
    "archetype": "bento",
    "allow-asymmetric-columns": true,
    "allow-z-overlap": true,
    "allow-rotation": false,
    "zero-gap-enforcement": "relaxed"
  },

  "palette": {
    "primary": "#FFFFFF",
    "accent": "#3B82F6",
    "accent-light": "#93C5FD",
    "bg-base": "#050505",
    "bg-surface-light": "#0A0A0F",
    "bg-surface": "#18181B",
    "text-main": "#FAFAFA",
    "text-light": "#71717A",
    "grid-line": "#27272A"
  },

  "typography": {
    "font-family": "\"Geist\", \"Satoshi\", \"Helvetica Neue\", sans-serif",
    "h1": { "size": "72px", "weight": 600, "color": "var(--primary)", "letter-spacing": "-0.03em" },
    "h2": { "size": "42px", "weight": 500, "color": "var(--primary)" },
    "h3": { "size": "24px", "weight": 500, "color": "var(--accent)" },
    "body": { "size": "15px", "weight": 300, "color": "var(--text-light)", "line-height": 1.6 },
    "max-contrast-ratio": 4.8
  },

  "density-budgets": {
    "low":    { "gap": "40px", "max-whitespace-ratio": 0.65 },
    "medium": { "gap": "24px", "max-whitespace-ratio": 0.45 },
    "high":   { "gap": "12px", "max-whitespace-ratio": 0.25 }
  },

  "surface": {
    "type": "glass",
    "card-radius": "16px",
    "card-border": "1px solid rgba(255,255,255,0.1)",
    "card-shadow": "0 20px 40px -15px rgba(0,0,0,0.3)",
    "inner-highlight": "inset 0 1px 1px rgba(255,255,255,0.1)",
    "background-effect": "radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.08), transparent 50%)",
    "shadow-tint-to-bg": true
  },

  "forbidden-patterns": [
    "pure-black-bg",
    "neon-glows",
    "center-aligned-hero",
    "3-column-equal-cards",
    "heavy-borders"
  ],
  "chart-rules": {
    "sequence": ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"],
    "gridlines": "dashed var(--grid-line)",
    "axis-color": "var(--text-light)"
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
