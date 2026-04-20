# PYRAMID (金字塔)

**适用场景**：层叠状态、基石支撑理论、能力模型层级、倒三角优先级。

## 1. 组件结构与视觉规则

**左图右文**分离布局：左侧是几何色块堆叠的金字塔图形，右侧是对齐的释义文本。

**核心约束**：
*   金字塔通过 `clip-path: polygon()` 对每层切割为梯形，最顶层为**物理尖角 (Apex)**（不是平顶）。
*   🚨 **【切割防畸变数学铁律】 (Anti-Distortion Math Formula)**：必须保证斜线为完美无断层直线。
    *   **宽度要求为等差数列**：各层的 `width` 必须递增构成完美的等差数列（如 4 层时必须是 `25%, 50%, 75%, 100%`，5 层为 `20%, 40%, 60%, 80%, 100%`）。所有破坏这一数学序列的自定义百分比都会导致梯形角度错乱从而变为折线！
    *   **几何切角常数**：当层高相等时，第 $i$ 层（从尖角往下数，Apex 始终为第 1 层）的 `clip-path` 顶部水平缩进顶点，相对于自身的百分比，永远等于 **`1 / (2*i)`**。
        * 第 1 层 (Apex, i=1): `1/2 = 50%` → `polygon(50% 0%, 100% 100%, 0% 100%)`
        * 第 2 层 (i=2): `1/4 = 25%` → `polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)`
        * 第 3 层 (i=3): `1/6 ≈ 16.66%` → `polygon(16.66% 0%, 83.33% 0%, 100% 100%, 0% 100%)`
        * 第 4 层 (i=4): `1/8 = 12.5%` → `polygon(12.5% 0%, 87.5% 0%, 100% 100%, 0% 100%)`
        * 依此类推。绝对禁止大模型手工编造非数学自洽的边距！
*   文本**全部外置**到右侧，色块内仅放极短标签。
*   右侧释义每层**与左侧对应图形层纵向严格对齐**（通过 Flexbox gap 相等或 Grid 共享行实现）。
*   各层之间存在**清晰物理间隙**（gap）体现悬浮感。
*   **倒金字塔 (inverted)**：最宽层在顶、尖角在底，clip-path 方向翻转。
*   右侧释义区 (`.pyr-desc`) 是**通用内容插槽**，可承载列表、表格、嵌套卡片或纯文本。
*   **表格对齐铁律**：当右侧采用贯通表格时，表格**每一行高度必须与左侧对应金字塔层高度严格对齐**（通过相同的 `height` + `gap` 值实现）。

## 2. HTML 骨架模板 (N=4 示例)

**DOM 层级锚点**：

```
.pyramid-area              ← 挂载在 24x24 grid Body 区域（flex row）
  .pyramid-graph           ← 左侧：金字塔图形列
    .pyr-layer             ← 单层梯形（clip-path + 递增宽度）
  .pyramid-text            ← 右侧：释义文本列
    .pyr-desc              ← 单层释义（与左侧一一对齐）
```

**HTML：**

```html
<div class="pyramid-area" style="grid-column: 1/span 24; grid-row: 5/span 19;">

  <!-- 左侧：金字塔图形 -->
  <div class="pyramid-graph">
    <div class="pyr-layer layer-1">顶层标签</div>
    <div class="pyr-layer layer-2">第二层</div>
    <div class="pyr-layer layer-3">第三层</div>
    <div class="pyr-layer layer-4">底层基石</div>
  </div>

  <!-- 右侧：释义文本 -->
  <div class="pyramid-text">
    <div class="pyr-desc">
      <h4>顶层标题</h4>
      <p>释义内容</p>
    </div>
    <div class="pyr-desc">
      <h4>第二层标题</h4>
      <p>释义内容</p>
    </div>
    <div class="pyr-desc">
      <h4>第三层标题</h4>
      <p>释义内容</p>
    </div>
    <div class="pyr-desc">
      <h4>底层标题</h4>
      <p>释义内容</p>
    </div>
  </div>

</div>
```

**CSS：**

```css
.pyramid-area {
  display: flex;
  gap: 40px;
  align-items: center;
}

/* 左侧金字塔 */
.pyramid-graph {
  width: 380px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.pyr-layer {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  padding: 12px;
  height: 55px;
}

/* 第 i 层宽度是等宽递减（相对于底座）, 且切角严格等于 1/(2i) 的几何铁律 */
.layer-1 {
  width: 25%;
  background: var(--primary);
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}
.layer-2 {
  width: 50%;
  background: var(--accent);
  clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
}
.layer-3 {
  width: 75%;
  background: #3B82F6;
  clip-path: polygon(16.66% 0%, 83.33% 0%, 100% 100%, 0% 100%);
}
.layer-4 {
  width: 100%;
  background: #94A3B8;
  clip-path: polygon(12.5% 0%, 87.5% 0%, 100% 100%, 0% 100%);
}

/* 右侧释义 - 与左侧对齐 */
.pyramid-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;      /* 与左侧 gap 相等 → 纵向对齐 */
  justify-content: center;
}

.pyr-desc {
  height: 55px;   /* 与左侧 pyr-layer 等高 → 行对齐 */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pyr-desc h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 3px 0;
}
.pyr-desc p {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
}
```

### 倒金字塔适配 (Inverted)

DOM 层级不变，依然采用 `flex-direction: column`。CSS 结构替换：
1. 头尾翻转：最宽层在顶部（`.layer-1` = 100%），底部收为尖角（`.layer-4` = 25%）。
2. 切割口由 `顶部缩小` 转为 `底部缩小`。切割百分比使用完全对称的逻辑。
   * **(layer-1, 顶层基底)**：`width: 100%; clip-path: polygon(0% 0%, 100% 0%, 87.5% 100%, 12.5% 100%);`
   * **(layer-2)**：`width: 75%; clip-path: polygon(0% 0%, 100% 0%, 83.33% 100%, 16.66% 100%);`
   * **(layer-3)**：`width: 50%; clip-path: polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%);`
   * **(layer-4, 底尖角)**：`width: 25%; clip-path: polygon(0% 0%, 100% 0%, 50% 100%);`

## 3. QA 验收条件

* **C-PYR-01**: 金字塔外边缘斜线是否形成无断层、无锯齿的完美直线？
* **C-PYR-02**: 最顶层是否为物理尖角 (Apex)，而非平顶梯形？
* **C-PYR-03**: 文本说明是否完全位于色块外部（左图右文分离）？
* **C-PYR-04**: 右侧释义每层是否与左侧对应图形层纵向严格对齐？
* **C-PYR-05**: 各层之间是否存在清晰物理间隙与悬浮感？
* **C-PYR-06**: 倒金字塔：最宽层是否在顶部、尖角在底部？
* **C-PYR-07**: 若右侧为贯通表格，每行高度是否与左侧对应金字塔层高度严格对齐？
