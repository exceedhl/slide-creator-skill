# Style: Executive Dark

## 1. 视觉哲学
- 近黑舞台，焦点在白字和少量蓝。
- 发光只留在 1px 边缘，不做霓虹。
- 深色里发光体显得更大，所以多留白。
- 次要文字用锌灰，关键数字用白。

## 2. 版式倾向
少量卡片，对称或轻微不对称。封面一句话加大数字。

## 3. 主题样式模板
```css
:root {
  --primary: #FFFFFF;
  --accent: #3B82F6;
  --accent-light: #93C5FD;
  --bg-base: #09090B;
  --bg-surface: #18181B;
  --text-main: #FAFAFA;
  --text-light: #A1A1AA;
  --grid-line: #27272A;
  --font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.slide { font-family: var(--font-family); }
h1 { font-size: 46px; font-weight: 600; letter-spacing: -0.02em; margin: 0; color: var(--primary); line-height: 1.2; }
h2 { font-size: 22px; font-weight: 500; margin: 0; color: var(--primary); }
p, li { font-size: 15px; line-height: 1.6; color: var(--text-light); }
.card {
  background: var(--bg-surface); border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1); box-shadow: none; padding: 28px;
}
```

## 4. 标志性特征
```css
.stat { font-size: 64px; font-weight: 700; color: var(--primary); letter-spacing: -0.03em; margin: 0; line-height: 1; }
.stat-label { display: block; margin-top: 8px; font-size: 14px; color: var(--accent-light); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
```

## 5. 严格禁忌
纯黑 `#000` 毫无层次、高饱和刺眼白底、生硬直角、浮夸霓虹外发光。

## 6. 标准参考页
```html
<div class="slide">
  <header class="slide-header">
    <p style="text-transform:uppercase; font-size:12px; font-weight:600; letter-spacing:0.15em; color:var(--accent); margin:0 0 8px;">Board of Directors Briefing</p>
    <h1>集团数字化转型战略纵深与治理成效</h1>
  </header>
  <main class="slide-main" style="display:grid; grid-template-columns:1fr 1fr; gap:28px; align-content:center;">
    <section class="card">
      <p class="stat">99.98%</p>
      <span class="stat-label">核心交易系统可用性</span>
      <p style="margin-top:12px;">全面完成多云混合架构演进，全链路容灾切换 RTO 压缩至 30 秒以内。</p>
    </section>
    <section class="card">
      <p class="stat">28.4%</p>
      <span class="stat-label">研发交付运维成本下降</span>
      <p style="margin-top:12px;">统一平台工程基础设施落地，标准化组件复用率提升至 76%。</p>
    </section>
  </main>
</div>
```
