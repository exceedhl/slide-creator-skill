# MATRIX (象限矩阵)

**适用场景**：交叉维度评估、风险/优先级四象限、2x2 或 3x3 定性阵列分析。

## 1. 组件结构与视觉规则

**核心约束**：
*   **Variant A (中心十字)**：坐标轴十字穿透四象限中心，适用于 2x2。轴线用 `::before`/`::after` 伪元素或边框实现，X 轴右端**必须有 CSS 三角形箭头**。
*   **Variant B (L 型边界)**：左侧 Y 轴 + 底部 X 轴形成 L 型边界，适用于 3x3 九宫格。坐标轴占独立 grid 行/列（不嵌入象限内部）。
*   坐标轴文本标签清晰可读，未被卡片遮挡。
*   四象限/九宫格之间间距**严格对称均等**。
*   象限卡片使用 Grid 精确定位，确保像素级对齐。

## 2. HTML 骨架模板

### Variant A: 中心十字 2x2 (默认)

**DOM 层级锚点**：

```
.matrix-area               ← 挂载在 24x24 grid Body 区域
  .matrix-grid             ← 2x2 Grid 容器
    .quadrant              ← 单个象限卡片（4个）
  .axis-label              ← 坐标轴文本标签（4个方向）
  .axis-line-x / .axis-line-y  ← 十字轴线（absolute）
```

**HTML：**

```html
<div class="matrix-area" style="grid-column: 1/span 24; grid-row: 5/span 19;">

  <!-- 坐标轴线 -->
  <div class="axis-line-x"></div>
  <div class="axis-line-y"></div>

  <!-- 坐标轴标签 -->
  <div class="axis-label axis-top">高影响</div>
  <div class="axis-label axis-bottom">低影响</div>
  <div class="axis-label axis-left">低概率</div>
  <div class="axis-label axis-right">高概率</div>

  <!-- 2x2 象限 -->
  <div class="matrix-grid">
    <div class="quadrant q1"><h3>象限 I</h3><p>内容</p></div>
    <div class="quadrant q2"><h3>象限 II</h3><p>内容</p></div>
    <div class="quadrant q3"><h3>象限 III</h3><p>内容</p></div>
    <div class="quadrant q4"><h3>象限 IV</h3><p>内容</p></div>
  </div>

</div>
```

**CSS：**

```css
.matrix-area {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.matrix-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  width: 85%;
  height: 85%;
}

.quadrant {
  background: var(--bg-surface);
  padding: 20px;
  border: 1px solid var(--border-default);
}
.quadrant h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 8px 0;
}
.quadrant p {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}

/* 十字轴线 */
.axis-line-x {
  position: absolute;
  height: 2px;
  background: var(--primary);
  left: 5%;
  right: 5%;
  top: 50%;
}
/* X 轴右端箭头 */
.axis-line-x::after {
  content: '';
  position: absolute;
  right: 0;
  top: -5px;
  border-left: 8px solid var(--primary);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.axis-line-y {
  position: absolute;
  width: 2px;
  background: var(--primary);
  top: 5%;
  bottom: 5%;
  left: 50%;
}

/* 坐标轴标签 */
.axis-label {
  position: absolute;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.axis-top    { top: 2%; left: 50%; transform: translateX(-50%); }
.axis-bottom { bottom: 2%; left: 50%; transform: translateX(-50%); }
.axis-left   { left: 2%; top: 50%; transform: translateY(-50%); }
.axis-right  { right: 2%; top: 50%; transform: translateY(-50%); }
```

### Variant B: L 型 3x3 适配

将 `.matrix-grid` 改为 `grid-template: repeat(3, 1fr) / repeat(3, 1fr)`。坐标轴改为 L 型：`.axis-line-x` 放置在底行下方、`.axis-line-y` 放置在左列左侧，删除中心十字。

## 3. QA 验收条件

* **C-MTX-01**: 十字穿透轴线是否精确位于四象限的物理中心（未偏移）？
* **C-MTX-02**: 坐标轴文本标签是否清晰可读，未被象限卡片或轴线遮挡？
* **C-MTX-03**: 四象限之间的间距是否严格对称均等？
* **C-MTX-04**: L 型变体中，左侧/底部坐标轴是否拥有足够的专属空间（未被卡片挤压）？
* **C-MTX-05**: 3x3 九宫格是否使用了 L 型边界轴线（而非中心十字）？
