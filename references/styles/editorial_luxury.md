# Style: Editorial Luxury

## 1. 视觉哲学
- 暖纸底，衬线大标题，无衬线正文。
- 约 60/40 分栏，窄的一侧是图或留白。
- 唯一金属色强调。关键词可用斜体衬线。
- 照片略暖，四角有校样标记。

## 2. 版式倾向
杂志叙事。封面、章节页、引语页密度低。不要密表。

## 3. 主题样式模板
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```
```css
:root {
  --primary: #1A1A1A;
  --accent: #8B6914;
  --accent-light: #C9A84C;
  --bg-base: #FDFBF7;
  --bg-surface: #F7F4EE;
  --text-main: #2D2D2D;
  --text-light: #6B6B6B;
  --text-faint: #A8A8A0;
  --grid-line: #D4D0C8;
  --font-family: "Playfair Display", Georgia, serif;
  /* magazine_story: --accent:#CBA871; 允许标题压在图片上，正文仍须可读 */
}
h1 { font-family: var(--font-family); font-size: 68px; font-weight: 500; letter-spacing: -0.02em; line-height: 1.05; margin: 0; }
h2 { font-family: var(--font-family); font-style: italic; font-size: 40px; font-weight: 500; margin: 0; }
p, li { font-family: Inter, sans-serif; font-size: 15px; line-height: 1.8; color: var(--text-main); }
.card { border: none; border-radius: 0; box-shadow: none; background: transparent; }
img { filter: sepia(0.15); }
```

## 4. 标志性特征
```css
.eyebrow { font-family: Inter, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); }
.eyebrow::before { content: ""; display: inline-block; width: 18px; height: 1px; background: var(--accent); margin-right: 12px; vertical-align: middle; }
.slide::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.45; z-index: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>");
}
.frame { position: relative; }
.frame::before, .frame::after { content: ""; position: absolute; width: 22px; height: 22px; border: 1px solid var(--accent-light); }
.frame::before { top: 8px; left: 8px; border-right: 0; border-bottom: 0; }
.frame::after { right: 8px; bottom: 8px; border-left: 0; border-top: 0; }
```

## 5. 严格禁忌
粗边框、霓虹色、密数据表、图片圆角、投影、emoji。

## 6. 标准参考页
```html
<div class="slide">
  <header class="slide-header">
    <p class="eyebrow">Haute Couture Strategy · Vol. IV</p>
    <h1>布料是凝固的建筑与光影叙事</h1>
  </header>
  <main class="slide-main" style="display:grid; grid-template-columns:1.3fr 0.9fr; gap:40px; align-items:center;">
    <div>
      <p style="font-size:18px; line-height:1.7; color:var(--primary); font-family:var(--font-family); font-style:italic; margin-bottom:16px;">
        “每一处看似随性的针脚，皆是对手工制衣传统长达百年的深情致敬。”
      </p>
      <p>
        在快速消费的周期之外，工坊始终坚持慢速工艺的内生节奏。选用意大利北部阿尔卑斯山麓的天然羊绒与手工丝织品，经由三十道复杂水洗定型流程，重塑触觉记忆。
      </p>
    </div>
    <figure class="frame" style="height:320px; margin:0;">
      <img alt="工坊手工细节" src="atelier_detail.jpg" style="width:100%; height:100%; object-fit:cover;">
    </figure>
  </main>
</div>
```
