# Style: Swiss Editorial

## 1. 视觉哲学
- 网格是法律，巨号无衬线字本身就是图形。
- 不对称平衡：一边很重，一边几乎空。
- 纯黑、纸白、一点红。没有渐变。
- 直角、无阴影。结构线只用 1px 黑线。

## 2. 版式倾向
不对称分栏。允许竖排侧标和不超过 5° 的装饰倾斜。正文保持水平。

## 3. 主题样式模板
```css
:root {
  --primary: #000000;
  --accent: #FF2A00;
  --bg-base: #FDFDFD;
  --bg-surface: #F4F4F5;
  --text-main: #000000;
  --text-light: #52525B;
  --grid-line: #000000;
  --font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Arial", sans-serif;
}
.slide { font-family: var(--font-family); }
h1 { font-size: 68px; font-weight: 900; letter-spacing: -0.04em; line-height: 0.92; margin: 0; text-transform: uppercase; }
h2 { font-size: 24px; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: -0.02em; }
p, li { font-size: 15px; line-height: 1.5; color: var(--text-main); }
.card { background: transparent; border-radius: 0; box-shadow: none; padding: 0; }
img { filter: grayscale(1) contrast(1.25); }
```

## 4. 标志性特征
```css
.side-index {
  writing-mode: vertical-rl; transform: rotate(180deg);
  font-weight: 900; letter-spacing: 0.2em; font-size: 12px;
  border-left: 2px solid var(--primary); padding-left: 8px;
}
.hairline { border-top: 2px solid var(--primary); margin: 16px 0; }
.accent { color: var(--accent); }
```

## 5. 严格禁忌
圆角卡片、柔和弥散阴影、任何形式的彩色渐变、居中传统英雄版式、花哨彩色多维图标。

## 6. 标准参考页
```html
<div class="slide" style="display:grid; grid-template-columns:48px 1.4fr 0.9fr; gap:36px; padding:44px 48px;">
  <div class="side-index">SECTION 01 / PRINCIPLES</div>
  <header style="display:flex; flex-direction:column; justify-content:space-between;">
    <h1>FORM<br>FOLLOWS<br><span class="accent">FUNCTION</span></h1>
    <p style="font-weight:700; letter-spacing:0.05em;">INTERNATIONAL TYPOGRAPHIC STYLE</p>
  </header>
  <main style="display:flex; flex-direction:column; justify-content:flex-end;">
    <div class="hairline"></div>
    <h2>非对称的理性秩序</h2>
    <p style="margin-top:10px; color:var(--text-light);">
      瑞士排版不仅是一种风格，更是对信息层级与视觉张力的高维掌控。依靠严密的数学网格与字重反差，让文字本身成为版面中最具统治力的视觉图形。
    </p>
  </main>
</div>
```
