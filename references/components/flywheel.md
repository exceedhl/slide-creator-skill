# FLYWHEEL

## 1. 适用场景 / 路由防呆
节点互相加强，走完一圈回到起点。单向阶段用 PROCESS_FLOW。没有回路就不要画圆。

## 2. 混合结构约定
SVG 里用圆弧 `<path>`，末端 `marker-end="url(#arrow)"` 表示循环。节点用 HTML 绝对定位在圆周附近，标题和说明在圈外，保证能折行。三到六个节点即可。不要查角度表，用百分比把节点放在上、右、下、左。

## 3. 核心失败模式
- 箭头不闭合，读者不知道回到哪里。
- 文字压在弧线上，两行就重叠。
- 节点多于六个，标签挤出画布。

## 4. 推荐结构
```html
<div class="flywheel">
  <svg viewBox="0 0 400 400" stroke="currentColor" fill="none" aria-hidden="true">
    <defs><marker id="fw-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="currentColor" /></marker></defs>
    <path d="M200 70 A130 130 0 1 1 190 72" stroke-width="2" marker-end="url(#fw-arrow)" />
  </svg>
  <article class="fw-node" style="left:50%; top:6%;"><strong>获取</strong><p>一句</p></article>
  <article class="fw-node" style="left:78%; top:46%;"><strong>留存</strong><p>一句</p></article>
</div>
```
