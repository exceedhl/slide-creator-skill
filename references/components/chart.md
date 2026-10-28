# CHART

## 1. 适用场景 / 路由防呆
趋势用折线，排名用柱或条，占比优先堆叠柱（饼图只在两到三段时用环），差异演变用瀑布，相关用散点。只有一两个数字时放大数字本身。没有定量关系时改用 PROCESS_FLOW。

## 2. 混合结构约定
简单图用内联 SVG 或 CSS 柱条，坐标和网格用 `<line>` / `<rect>`，数值和类目标签用 HTML，叠在图旁或柱端，不要用 SVG `<text>` 写长标签。去掉轴线噪音，只留能读数的刻度。颜色用 `var(--accent)` 和风格文件里的图表序列。

## 3. 核心失败模式
- 饼图切成六瓣以上，面积无法比较。
- 图例和轴标题挤进 720px，正文被裁切。
- 多系列共用一种颜色，看不出对比。

## 4. 推荐结构
```html
<div class="chart">
  <svg viewBox="0 0 640 320" class="chart-geometry" stroke="currentColor" fill="currentColor" aria-hidden="true">
    <line x1="40" y1="280" x2="620" y2="280" stroke-width="2" />
    <rect x="80" y="120" width="48" height="160" />
  </svg>
  <ul class="chart-labels">
    <li><span>Q1</span><strong>42</strong></li>
  </ul>
</div>
```
