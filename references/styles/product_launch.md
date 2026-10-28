# Style: Product Launch

## 1. 视觉哲学
- 一张图或一个词就是整页。
- 标题可以到 80px，正文很少，字重偏轻。
- 黑底让产品发光，或白底只留工业本身。
- 没有线框，空间靠对照出来。

## 2. 版式倾向
全出血。图贴边，字叠在安全区内或单独占下沿。禁止表格和密要点。

## 3. 主题样式模板
```css
:root {
  --primary: #FFFFFF;
  --accent: #0071E3;
  --bg-base: #000000;
  --bg-surface: #1C1C1E;
  --text-main: #F5F5F7;
  --text-light: #86868B;
  --font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
}
.slide { padding: 0; gap: 0; }
h1 { font-size: 80px; font-weight: 600; letter-spacing: -0.02em; line-height: 1; margin: 0; color: var(--primary); }
p { font-size: 20px; font-weight: 300; line-height: 1.4; color: var(--text-light); }
.card { border: none; border-radius: 0; box-shadow: none; background: transparent; }
```

## 4. 标志性特征
```css
.hero { position: relative; flex: 1; min-height: 0; }
.hero img { width: 100%; height: 100%; object-fit: cover; }
.hero-copy { position: absolute; left: 72px; bottom: 64px; max-width: 640px; }
```

## 5. 严格禁忌
边框、表格、密列表、可见网格、花哨图标。

## 6. 标准参考页
```html
<div class="slide">
  <div class="hero">
    <img alt="新一代旗舰芯片架构" src="silicon_chip.jpg">
    <div class="hero-copy">
      <p style="text-transform:uppercase; font-size:14px; letter-spacing:0.25em; color:var(--accent); margin:0 0 12px; font-weight:500;">BIONIC ARCHITECTURE</p>
      <h1>超乎想象的能效跃迁。</h1>
      <p style="margin-top:16px;">3nm 全环绕栅极晶体管工艺，将桌面级性能装入轻盈身躯。</p>
    </div>
  </div>
</div>
```
