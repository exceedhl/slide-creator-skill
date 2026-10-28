# Style: Business

## 1. 视觉哲学
- 权威、克制、数据优先。深色只用于封面和编号，内容页保持白底。
- 平级模块同色。唯一强调色留给结论。
- 直角、无阴影、无渐变。区块靠浅底色分开。
- 表格只留横线，表头用浅底加粗线截断。

## 2. 版式倾向
对称分栏或等宽卡片。封面铺满 `--primary`，白字居中偏上。

## 3. 主题样式模板
```css
:root {
  --primary: #051C2C;
  --accent: #005EB8;
  --accent-light: #009CE4;
  --bg-base: #FFFFFF;
  --bg-surface: #F8FAFC;
  --table-header: #F1F5F9;
  --text-main: #1E293B;
  --text-light: #64748B;
  --grid-line: #E2E8F0;
  --font-family: "Helvetica Neue", Arial, sans-serif;
}

/* 变体 1: mckinsey (经典深石板灰与暖橙) */
/* :root { --primary: #0F172A; --accent: #EA580C; --accent-light: #F97316; } */

/* 变体 2: minimal_boardroom (黑白极简董事会) */
/* :root { --primary: #000000; --accent: #000000; --accent-light: #475569; } */

.slide { font-family: var(--font-family); }
h1 { font-size: 48px; font-weight: 800; letter-spacing: -0.02em; margin: 0; color: var(--primary); line-height: 1.15; }
h2 { font-size: 24px; font-weight: 700; margin: 0; color: var(--primary); }
p, li { font-size: 15px; line-height: 1.6; color: var(--text-light); }
.card { background: var(--bg-surface); border-radius: 0; box-shadow: none; padding: 24px 28px; }
```

## 4. 标志性特征
```css
.num {
  display: inline-grid; place-items: center;
  min-width: 32px; height: 26px; padding: 0 8px; margin-bottom: 12px;
  background: var(--primary); color: #fff; font-weight: 700; font-size: 13px;
}
table { width: 100%; border-collapse: collapse; }
th { background: var(--table-header); text-align: left; padding: 12px; font-size: 14px; font-weight: 700; color: var(--primary); border-bottom: 2px solid var(--primary); }
td { border-bottom: 1px solid var(--grid-line); padding: 12px; font-size: 14px; color: var(--text-main); }
.slide.cover { background: var(--primary); color: #fff; }
.slide.cover h1, .slide.cover p { color: #fff; }
```

## 5. 严格禁忌
圆角、模糊阴影、彩虹多色混搭、表格竖线、无意义装饰渐变。

## 6. 标准参考页
```html
<div class="slide">
  <header class="slide-header">
    <p style="text-transform:uppercase; font-size:12px; font-weight:700; letter-spacing:0.1em; color:var(--accent); margin:0 0 6px;">Executive Strategic Summary</p>
    <h1>2026 年度企业全球化运营关键指标</h1>
  </header>
  <main class="slide-main" style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
    <section class="card">
      <span class="num">01</span>
      <h2>核心营收质量</h2>
      <p>海外订阅制收入占比突破 42%，年度经常性收入（ARR）保持 35% 稳健复合增速。</p>
    </section>
    <section class="card">
      <span class="num">02</span>
      <h2>人均效能优化</h2>
      <p>依托自动化工作流，客户交付周期自 45 天大幅缩短至 18 天，交付毛利率提升 9 个百分点。</p>
    </section>
  </main>
  <footer class="slide-footer"><p>数据来源：集团全球财务中心 2026 Q3 经审计报告</p></footer>
</div>
```
