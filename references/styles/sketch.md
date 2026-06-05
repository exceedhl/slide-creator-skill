# Visual Style: Hand-Drawn / Sketch (手绘涂鸦风)

适用于需要强调“创意”、“白板讨论”、“头脑风暴”或降低认知门槛的场景。通过有机的不规则边缘、硬阴影、手写字体和纸质纹理，营造真实、随性和充满人情味的视觉体验。

## 1. 视觉哲学 (Design Philosophy)
* **拒绝直线 (No Straight Lines)**：每一个边框、形状和容器都使用不规则的圆角值（wobbly border-radius），彻底打破几何完美感。
* **真实纸张质感 (Authentic Texture)**：通过径向渐变的圆点阵列模拟笔记本纸张，背景色采用温暖的纸张白，搭配类似铅笔、马克笔的色彩，制造实体媒介的错觉。
* **随性排列 (Playful Rotation)**：卡片、图片或装饰元素带有极小角度的倾斜（如 -2deg 到 2deg），打破严格的网格对齐，充满灵动感和随意性能量。
* **硬阴影叠加 (Hard Offset Shadows)**：坚决抵制模糊阴影，使用实心、纯色偏移的 box-shadow（如 4px 4px）制造类似剪贴画、层层叠加的立体感。
* **手写排版 (Handwritten Typography)**：标题像马克笔 (Kalam)，正文像圆珠笔/水笔 (Patrick Hand)，字体尺寸差异夸张，拒绝冷冰冰的企业无衬线字体。
* **刻意的涂鸦感 (Scribbled Decoration)**：引入虚线、手绘箭头、胶带效果 (tape)、图钉 (tack)、手绘重点圈及语音气泡等视觉修饰，强化手工制作与“未完成”的创意过程感。
* **情感传递 (Emotional Intent)**：平易近人、充满创意且以人为本。降低交互门槛，让用户感觉像是协作者而非单纯的消费者。

## 2. 全局视觉基建 (Global Primitives)
* **组件形态 (Component Stylings)**：
  - **按钮 (Buttons)**：不规则椭圆，白底粗黑边，硬阴影。悬浮时填满红色 (Accent)，文字变白，阴影减小并产生轻微位移；激活时阴影完全消失（被“按下”）。
  - **卡片 (Cards)**：不规则粗边框，顶部可附加半透明灰色胶带 (tape) 或红色图钉 (tack) 装饰，特定卡片可使用便利贴黄底色。
  - **输入框 (Inputs)**：全包围的不规则边框（非下划线），包含手写占位符，聚焦时边框变蓝并带有同色光晕。
* **布局与对齐 (Layout Strategy)**：刻意打破对齐（如元素间相互重叠、负边距交错、绝对定位跳出容器）；保持宽裕的间距和段落留白以防拥挤。
* **图标与插画 (Iconography & SVG)**：使用描边较粗 (stroke-width: 2.5~3) 的 Lucide 图标，关键图标外围可以加上粗糙的手绘圆圈。使用手绘 SVG 装饰（如波浪线、指示箭头）。
* **动效与交互 (Effects & Animation)**：交互动作需带有活泼的人格特征，例如悬浮时轻微抖动 (`hover:rotate-1` 或 `hover:-rotate-2`)，按下时彻底压平，干脆利落 (`duration-100`)。

## 3. Machine-Readable Tokens (机器读取变量)

```json
{
  "theme": "sketch",
  "design-variance": 9,

  "layout": {
    "archetype": "bento",
    "allow-asymmetric-columns": true,
    "allow-z-overlap": true,
    "allow-rotation": true,
    "zero-gap-enforcement": "relaxed"
  },

  "palette": {
    "primary": "#fdfbf7",
    "accent": "#ff4d4d",
    "accent-light": "#fff9c4",
    "bg-base": "#fdfbf7",
    "bg-surface-light": "#ffffff",
    "bg-surface": "#ffffff",
    "text-main": "#2d2d2d",
    "text-light": "#e5e0d8",
    "grid-line": "#2d2d2d"
  },

  "typography": {
    "font-family": "\"Patrick Hand\", \"Yozai Medium\", \"Kalam\", cursive",
    "external-fonts": [
      "https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap",
      "https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-medium-regular/font.css"
    ],
    "h1": { "size": "72px", "weight": 700, "color": "var(--text-main)", "font-family": "\"Kalam\", \"Yozai Medium\", cursive", "letter-spacing": "normal" },
    "h2": { "size": "42px", "weight": 700, "color": "var(--text-main)", "font-family": "\"Kalam\", \"Yozai Medium\", cursive" },
    "h3": { "size": "24px", "weight": 700, "color": "var(--accent)", "font-family": "\"Kalam\", \"Yozai Medium\", cursive" },
    "body": { "size": "18px", "weight": 400, "color": "var(--text-main)", "line-height": 1.6, "font-family": "\"Patrick Hand\", \"Yozai Medium\", cursive" },
    "max-contrast-ratio": 4.8
  },

  "density-budgets": {
    "low":    { "gap": "48px", "max-whitespace-ratio": 0.65 },
    "medium": { "gap": "32px", "max-whitespace-ratio": 0.50 },
    "high":   { "gap": "16px", "max-whitespace-ratio": 0.35 }
  },

  "surface": {
    "type": "hand-drawn",
    "card-radius": "255px 15px 225px 15px / 15px 225px 15px 255px",
    "card-border": "2px solid #2d2d2d",
    "card-shadow": "4px 4px 0px 0px #2d2d2d",
    "inner-highlight": "none",
    "background-effect": "radial-gradient(#e5e0d8 1px, transparent 1px) 0 0 / 24px 24px",
    "shadow-tint-to-bg": false
  },

  "forbidden-patterns": [
    "soft-blur-shadows",
    "perfect-straight-lines",
    "standard-rounded-corners",
    "corporate-sans-serif",
    "perfect-alignment"
  ],
  "chart-rules": {
    "sequence": ["#2d2d2d", "#ff4d4d", "#2d5da1", "#e5e0d8"],
    "gridlines": "dashed var(--text-light)",
    "axis-color": "var(--text-main)"
  },
  "image-treatment": {
    "inherit-surface-radius": true,
    "filter": "none",
    "framing": "tape-or-tack",
    "caption-style": "14px var(--text-main)"
  },
  "diagram-rules": {
    "stroke-width": "2px",
    "arrow-style": "hand-drawn",
    "node-fill": "solid"
  },
  "component-overrides": {
    "button": { "hover-transform": "translate(2px, 2px)", "hover-shadow": "2px 2px 0px 0px #2d2d2d", "active-shadow": "none", "active-transform": "translate(4px, 4px)" },
    "input": { "focus-ring": "2px solid rgba(45,93,161,0.2)" }
  }
}
```

## 4. 手绘布局装饰规则 (Playful Layout Decoration)

此风格在 `bento` 布局 archetype 基础上叠加以下手绘装饰层，核心目标是"刻意打破数字精确感，模拟白板/笔记本的随性排布"：

```
✅ 必须遵循的手绘原则:
   - 继承 bento 的大小混排 — 卡片尺寸不等、行高不齐
   - 每页至少 2-3 个组件带有 transform: rotate(±1~2deg) 的微旋转
   - 卡片使用不规则圆角 (wobbly border-radius: 255px 15px 225px 15px / 15px 255px 15px 225px)
   - 必须使用硬偏移阴影 (如 4px 4px 0 #2d2d2d)，禁止模糊阴影
   - 鼓励添加装饰性伪元素: 胶带 (tape)、图钉 (tack)、手绘下划线等
   - 组件之间允许 1-2 row/col 的刻意空白，模拟"随手贴上"的间距感
   - 文字容器内 padding 可以稍大 (16-24px)，模拟手写时的自然留白

❌ 禁止:
   - 使用标准圆角 (border-radius: 8px/12px 等几何精确值)
   - 使用模糊阴影 (box-shadow 的 blur-radius > 0)
   - 所有卡片严格对齐、无旋转 — 这会让手绘风变成普通卡片风
   - 旋转角度超过 3° (过度会影响可读性)
   - 正文段落文字旋转 (仅容器/卡片可旋转，内部文字保持水平)
```
