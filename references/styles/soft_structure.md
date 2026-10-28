# Style: Soft Structure

## 1. 视觉哲学
- 浅灰底上的白卡片，像轻轻浮起。
- 标题用现代 Grotesk，字距略紧。
- 一种中饱和强调色，其余保持灰。
- 圆角 12px，阴影几乎看不见。

## 2. 版式倾向
卡片网格，间距宽于正文。路演变体把标题放大、强调色改紫。

## 3. 主题样式模板
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
```
```css
:root {
  --primary: #111827;
  --accent: #059669;
  --accent-light: #6EE7B7;
  --bg-base: #F9FAFB;
  --bg-surface: #FFFFFF;
  --text-main: #1F2937;
  --text-light: #6B7280;
  --grid-line: #E5E7EB;
  --font-family: "Outfit", -apple-system, sans-serif;
}

/* 变体: investor_pitch (高视觉张力创投路演风) */
/* :root { --accent: #8B5CF6; --accent-light: #C4B5FD; --font-family: "Outfit", sans-serif; } */
/* h1 { font-size: 60px; font-weight: 800; letter-spacing: -0.04em; } */

.slide { font-family: var(--font-family); }
h1 { font-size: 48px; font-weight: 700; letter-spacing: -0.02em; margin: 0; color: var(--primary); line-height: 1.2; }
h2 { font-size: 20px; font-weight: 600; margin: 0; color: var(--primary); }
p, li { font-size: 15px; line-height: 1.65; color: var(--text-light); }
.card {
  background: var(--bg-surface); border-radius: 12px; border: none;
  box-shadow: 0 8px 30px -10px rgba(0,0,0,0.06); padding: 26px;
}
```

## 4. 标志性特征
```css
.pill { display: inline-block; padding: 4px 12px; border-radius: 999px; background: rgba(5,150,105,0.1); color: var(--accent); font-size: 12px; font-weight: 600; margin-bottom: 8px; }
```

## 5. 严格禁忌
纯黑底板、粗硬边框、过度饱和刺眼配色、硬锐直角卡片。

## 6. 标准参考页
```html
<div class="slide">
  <header class="slide-header">
    <span class="pill">PRODUCT ARCHITECTURE</span>
    <h1>将复杂业务逻辑抽象为极简卡片流</h1>
  </header>
  <main class="slide-main" style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
    <section class="card">
      <h2>即时数据摄入</h2>
      <p>通过无状态边缘 Worker 节点，单日平稳承载超过 12 亿次事件流分发与动态清洗。</p>
    </section>
    <section class="card">
      <h2>沉浸交互界面</h2>
      <p>微前端组件原子化拆分，首屏交互耗时（FID）低于 80ms，提供近乎原生应用的响应体验。</p>
    </section>
  </main>
</div>
```
