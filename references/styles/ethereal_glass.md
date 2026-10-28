# Style: Ethereal Glass

## 1. 视觉哲学
- 近黑深空，内容像悬浮的玻璃。
- 1px 白边加内高光，不像毛玻璃贴纸。
- 背景只有一块很淡的蓝光，不是霓虹。
- 一大块紧、一大块空，禁止三列等分。

## 2. 版式倾向
不对称 Bento。一张英雄卡超过主区一半，其余卡片明显更小。

## 3. 主题样式模板
```css
:root {
  --primary: #FFFFFF;
  --accent: #3B82F6;
  --accent-light: #93C5FD;
  --bg-base: #050505;
  --bg-surface: rgba(24,24,27,0.72);
  --text-main: #FAFAFA;
  --text-light: #71717A;
  --grid-line: #27272A;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.slide { font-family: var(--font-family); }
.slide::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.16), transparent 52%);
}
h1 { font-size: 56px; font-weight: 600; letter-spacing: -0.03em; margin: 0; line-height: 1.15; }
h2 { font-size: 20px; font-weight: 500; color: var(--accent-light); margin: 0; }
p { font-size: 14px; line-height: 1.6; color: var(--text-light); }
.card {
  position: relative; z-index: 1; border-radius: 16px; padding: 24px;
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 20px 40px -18px rgba(0,0,0,0.45);
}
```

## 4. 标志性特征
英雄卡跨两列或占主区一半以上，小卡只放一个核心指标或极短释义。背景光斑位于内容层之下。

## 5. 严格禁忌
纯黑无层次底板、刺眼霓虹光晕、居中对称传统标题、三张完全等大卡片、粗重实体边框。

## 6. 标准参考页
```html
<div class="slide">
  <main class="slide-main" style="display:grid; grid-template-columns:1.4fr 0.8fr; grid-template-rows:1.3fr 0.8fr; gap:16px;">
    <section class="card" style="grid-row:1 / span 2; display:flex; flex-direction:column; justify-content:flex-end;">
      <p style="text-transform:uppercase; font-size:11px; letter-spacing:0.2em; color:var(--accent); margin:0 0 8px;">AUTONOMOUS AGENT RUNTIME</p>
      <h1>神经引擎接管端侧复杂决策流</h1>
      <p style="margin-top:12px;">端云协同架构下的高并发推理分发，毫秒级感知环境变迁并执行多模态闭环反馈。</p>
    </section>
    <section class="card">
      <h2 style="font-size:36px; color:#fff; font-weight:700;">8.4 ms</h2>
      <p style="color:var(--accent-light); margin:4px 0 0;">端到端推理首包时延</p>
    </section>
    <section class="card">
      <h2 style="font-size:36px; color:#fff; font-weight:700;">4.2×</h2>
      <p style="color:var(--accent-light); margin:4px 0 0;">单位算力能效比提升</p>
    </section>
  </main>
</div>
```
