# Style: Sakura Chroma

## 1. 视觉哲学
- 奶油纸加上细网点，像旧目录。
- 红、粉、橙、黄、绿、蓝只做色块和条带，标题仍是墨色。
- 压缩黑体标题，规格用等宽字。
- 直角、硬边、实色硬阴影。可以有一枚小印章。

## 2. 版式倾向
海报式锁排，可混排大小卡片。对角线彩虹条只作装饰，不压住正文。

## 3. 主题样式模板
```html
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Albert+Sans:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
```css
:root {
  --ink: #3A2516;
  --paper: #F1E6CB;
  --red: #E5392A;
  --pink: #E54489;
  --orange: #F09131;
  --yellow: #F0BC2A;
  --green: #3D9F47;
  --blue: #3F8BC4;
  --primary: var(--paper);
  --accent: var(--red);
  --bg-base: var(--paper);
  --text-main: var(--ink);
  --font-family: "Albert Sans", "Helvetica Neue", sans-serif;
}
h1, h2 { font-family: "Big Shoulders Display", sans-serif; font-weight: 900; color: var(--ink); letter-spacing: -0.03em; line-height: 0.86; margin: 0; }
h1 { font-size: 92px; }
p, li { font-size: 15px; line-height: 1.5; color: var(--ink); }
.card { background: var(--paper); border: 1.5px solid var(--ink); border-radius: 0; box-shadow: none; padding: 16px; }
```

## 4. 标志性特征
```css
.slide::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.45; z-index: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(58,37,22,0.18) 1px, transparent 1.6px);
  background-size: 4px 4px;
}
.stripe { height: 14px; background: linear-gradient(90deg, var(--red) 0 16%, var(--pink) 16% 32%, var(--orange) 32% 48%, var(--yellow) 48% 64%, var(--green) 64% 80%, var(--blue) 80% 100%); }
.stamp {
  display: inline-grid; place-items: center; min-width: 72px; height: 72px;
  background: var(--red); color: var(--paper); font-family: "Big Shoulders Display", sans-serif;
  font-weight: 900; transform: rotate(-8deg);
}
.mono { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 12px; letter-spacing: 0.04em; }
```

## 5. 严格禁忌
模糊阴影、圆角、渐变填色（彩虹条除外）、企业灰、低饱和配色。

## 6. 标准参考页
```html
<div class="slide">
  <div class="stripe"></div>
  <header class="slide-header" style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:16px;">
    <div>
      <p class="mono" style="margin:0 0 4px; color:var(--red); font-weight:700;">SERIES 08 / STEREO CASSETTE DECK</p>
      <h1>HARDWARE SPEC</h1>
    </div>
    <span class="stamp">JIS 90</span>
  </header>
  <main class="slide-main" style="display:grid; grid-template-columns:1fr 1fr; gap:20px; align-content:start;">
    <section class="card">
      <p class="mono" style="font-weight:700; color:var(--blue); margin-bottom:8px;">01 // DIRECT DRIVE MOTOR</p>
      <p style="margin:0; font-size:14px;">双马达石英锁相环直驱驱动机构，抖晃率低于 0.035% WRMS，提供极致纯净的机械传动稳定性。</p>
    </section>
    <section class="card">
      <p class="mono" style="font-weight:700; color:var(--green); margin-bottom:8px;">02 // ANALOG VU METERS</p>
      <p style="margin:0; font-size:14px;">快速指针阻尼衰减技术与精密波段滤波均衡器，峰值动态余量扩展至 +8dB。</p>
    </section>
  </main>
</div>
```
