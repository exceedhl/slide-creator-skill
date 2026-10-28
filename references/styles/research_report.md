# Style: Research Report

## 1. 视觉哲学
- 密度服务于数据。正文可到 14px，仍须可读。
- 细线框把版面切成独立数据块。
- 图表是主角，句子贴在图旁边。
- 红绿只表示涨跌，不拿来装饰。

## 2. 版式倾向
多栏线框，标题短，正文紧贴图表。封面也不要大留白。

## 3. 主题样式模板
```css
:root {
  --primary: #1E3A8A;
  --accent: #D97706;
  --chart-up: #DC2626;
  --chart-down: #059669;
  --bg-base: #FFFFFF;
  --bg-surface: #F8FAFC;
  --text-main: #0F172A;
  --text-light: #475569;
  --grid-line: #CBD5E1;
  --font-family: "Georgia", "Times New Roman", serif;
}

/* 变体: workshop_training (培训工作坊与团队内审) */
/* :root { --primary: #0F172A; --accent: #0284C7; --bg-base: #F8FAFC; --font-family: Inter, system-ui, sans-serif; } */
/* .card { border-radius: 8px; } */

.slide { font-family: var(--font-family); }
h1 { font-size: 32px; font-weight: 700; margin: 0; color: var(--primary); letter-spacing: -0.01em; line-height: 1.25; }
h2 { font-size: 17px; font-weight: 700; margin: 0; color: var(--text-main); }
p, li, td { font-size: 13.5px; line-height: 1.5; color: var(--text-light); }
.card { border: 1px solid var(--grid-line); background: var(--bg-base); border-radius: 0; padding: 16px 18px; }
```

## 4. 标志性特征
```css
.kicker { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); margin: 0 0 6px; font-family: -apple-system, sans-serif; }
.up { color: var(--chart-up); font-weight: 600; }
.down { color: var(--chart-down); font-weight: 600; }
.rule { border-top: 1px solid var(--grid-line); margin: 10px 0; }
```

## 5. 严格禁忌
大片空洞留白、圆润卡片、不严肃的手写活泼字体、高亮荧光底色、无线框保护的数据块。

## 6. 标准参考页
```html
<div class="slide">
  <header class="slide-header">
    <p class="kicker">INDUSTRY BENCHMARK REPORT</p>
    <h1>高端制造供应链开工率与库存周转指数分化加剧</h1>
  </header>
  <main class="slide-main" style="display:grid; grid-template-columns:1.3fr 0.9fr; gap:16px;">
    <section class="card">
      <h2>区域产能利用率走势拆解</h2>
      <p style="margin-top:6px;">华东与华南工业集聚区负荷回升明显，汽车电子与智能硬件板块连续三周位于扩张区间。</p>
      <div class="rule"></div>
      <p>样本企业平均排产周期：<strong style="color:var(--primary);">28.5 天</strong>（环比提速 14%）</p>
    </section>
    <section class="card">
      <h2>核心指标快报</h2>
      <p>原料周转天数：<strong>42 天</strong> <span class="down">(-3.4 天)</span></p>
      <div class="rule"></div>
      <p>成品交付准时率：<strong>94.2%</strong> <span class="up">(+1.8%)</span></p>
      <div class="rule"></div>
      <p>海外订单履约率：<strong>88.6%</strong> <span class="up">(+0.5%)</span></p>
    </section>
  </main>
  <footer class="slide-footer"><p>数据来源：国家统计局与公开行业研报汇总数据库（2026 年第 3 季度）</p></footer>
</div>
```
