# MATRIX

## 1. 适用场景 / 路由防呆
两个交叉维度，2×2 或 3×3。单维对比用表格或 CHART。流程用 PROCESS_FLOW。

## 2. 混合结构约定
主区是 CSS Grid。轴名是 HTML，放在矩阵外侧。每格一个结论，不要把正文画进 SVG。格与格等大，轴标签不占内容格。

## 3. 核心失败模式
- 四格大小不一，交叉关系读不出来。
- 轴名写在格子内部，和结论混在一起。
- 3×3 每格塞满段落，文字被裁切。

## 4. 推荐结构
```html
<div class="matrix">
  <div class="matrix-y">高 → 低</div>
  <div class="matrix-grid">
    <article><h3>优先</h3><p>一句动作</p></article>
    <article><h3>观察</h3><p>一句动作</p></article>
    <article><h3>维持</h3><p>一句动作</p></article>
    <article><h3>放弃</h3><p>一句动作</p></article>
  </div>
  <div class="matrix-x">低 → 高</div>
</div>
```
