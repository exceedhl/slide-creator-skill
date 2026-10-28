# FUNNEL

## 1. 适用场景 / 路由防呆
数量或范围逐级变少，例如线索到成交。阶段没有收缩时用 PROCESS_FLOW。层级支撑用 PYRAMID。

## 2. 混合结构约定
左侧 SVG 多边形从上到下变窄，层间留缝。右侧 HTML 写出阶段名和数量，与切片纵向对齐。数字不要画进 SVG。

## 3. 核心失败模式
- 每一层一样宽，看不出收敛。
- 用一串 `div` 箭头拼漏斗，接缝错位。
- 数量级和图形宽度相反。

## 4. 推荐结构
```html
<div class="funnel">
  <svg viewBox="0 0 360 400" aria-hidden="true">
    <polygon points="20,16 340,16 300,120 60,120" />
    <polygon points="70,136 290,136 250,250 110,250" />
    <polygon points="130,266 230,266 210,384 150,384" />
  </svg>
  <ol>
    <li><strong>访问</strong><span>12,400</span></li>
    <li><strong>试用</strong><span>1,180</span></li>
    <li><strong>付费</strong><span>96</span></li>
  </ol>
</div>
```
