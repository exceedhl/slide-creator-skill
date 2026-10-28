# Style: Sketch

## 1. 视觉哲学
- 像贴在笔记本上的卡片，而不是界面。
- 手写标题，正文也用手写体，但保持水平可读。
- 硬偏移阴影，禁止模糊。
- 纸点背景。允许胶带、图钉这类小装饰。

## 2. 版式倾向
不等大的 Bento。每页两到三张卡片旋转 1–2°。正文不要转。

## 3. 主题样式模板
```html
<link href="https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-medium-regular/font.css" rel="stylesheet">
```
```css
:root {
  --primary: #2d2d2d;
  --accent: #ff4d4d;
  --accent-light: #fff9c4;
  --bg-base: #fdfbf7;
  --text-main: #2d2d2d;
  --font-family: "Patrick Hand", "Yozai Medium", "Kalam", cursive;
}
.slide {
  background-color: var(--bg-base);
  background-image: radial-gradient(#e5e0d8 1.2px, transparent 1.2px);
  background-size: 22px 22px;
}
h1, h2 { font-family: "Kalam", "Yozai Medium", cursive; color: var(--text-main); }
h1 { font-size: 64px; margin: 0; }
p, li { font-size: 20px; line-height: 1.45; }
.card {
  background: #fff;
  border: 2px solid var(--primary);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  box-shadow: 4px 4px 0 var(--primary);
  padding: 18px 20px;
}
```

## 4. 标志性特征
```css
.tilt-a { transform: rotate(-1.5deg); }
.tilt-b { transform: rotate(1.2deg); }
.tape {
  width: 72px; height: 18px; background: rgba(255, 236, 150, 0.85);
  transform: rotate(-8deg); display: block; margin-bottom: -8px;
}
```

## 5. 严格禁忌
模糊阴影、8px 标准圆角、企业无衬线、全部卡片严丝合缝、旋转超过 3°。

## 6. 标准参考页
```html
<div class="slide">
  <header class="slide-header">
    <p style="font-size:16px; margin:0 0 4px; color:var(--accent);">Sprint 42 Retrospective</p>
    <h1>头脑风暴与核心假设推演</h1>
  </header>
  <main class="slide-main" style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:32px; align-items:start;">
    <section class="card tilt-a">
      <span class="tape"></span>
      <h2>💡 核心发现</h2>
      <p>当用户在结账前看到透明化的配送时效预估时，弃单率从 32% 骤降至 11%！</p>
    </section>
    <section class="card tilt-b">
      <h2>🚧 待验证假设</h2>
      <p>一键自动填写常购清单是否能带动复购频次提升 2 倍以上？</p>
    </section>
  </main>
</div>
```
