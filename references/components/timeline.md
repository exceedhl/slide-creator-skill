# TIMELINE

## 1. 适用场景 / 路由防呆
轴上必须有日期或年份。没有时间权重的阶段用 PROCESS_FLOW。能力爬坡用 STAIRCASE。

## 2. 混合结构约定
一根 SVG 轴加圆点。每个里程碑的年份和事件是 HTML，沿轴均匀分布，上下交错时文字不得压住圆点或相邻卡片。点的位置用百分比，不要查三角函数表。

## 3. 核心失败模式
- 年份只是装饰，事件顺序和时间对不上。
- 卡片叠在轴线上，年份被挡住。
- 事件挤成一条，最后一项超出画布。

## 4. 推荐结构
```html
<div class="timeline">
  <svg class="timeline-axis" viewBox="0 0 1000 40" preserveAspectRatio="none" stroke="currentColor" fill="none" aria-hidden="true">
    <line x1="0" y1="20" x2="1000" y2="20" stroke-width="2" />
    <circle cx="180" cy="20" r="7" fill="currentColor" />
  </svg>
  <ol class="timeline-events">
    <li><time>2022</time><strong>起点</strong><p>一句事实</p></li>
  </ol>
</div>
```
