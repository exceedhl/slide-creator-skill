# PYRAMID (金字塔)

## 1. When to Use / When Not to Use
**适用场景**：层叠状态、基石支撑理论、能力模型层级、倒三角优先级。
**不适用场景**：平级要素的堆叠（应使用普通列表或卡片），非包含或非支撑关系的递进（应使用 PROCESS_FLOW）。

## 2. Component Contract (模式契约)
**核心约束**：
* 必须包含 `data-component="pyramid"` 的外层容器。
* 必须包含 `data-slot="layer"` 容器表示每一层图形，以及对应的 `data-slot="desc"` 释义文本。
* 最顶层必须为**物理尖角 (Apex)**（不是平顶）。
* 🚨 **【切割防畸变数学铁律】**：通过 `clip-path` 对各层切割为梯形。各层的 `width` 必须递增构成完美的等差数列（例如 4 层时 `25%, 50%, 75%, 100%`）。第 $i$ 层的顶部水平缩进比例严格等于 `1 / (2*i)`。绝对禁止随意编造百分比！
* 文本说明必须外置于色块之外，色块内仅允许放极短的数字或英文标签。
* 释义区 (`data-slot="desc"`) 必须与其对应的图形层纵向严格对齐。

## 3. Creative Freedom (创作空间)
**允许变化的维度**：
* **方向变体**：可以是正向金字塔 `data-variant="upward"`，也可以是倒金字塔 `data-variant="inverted"`（尖角在底）。
* **布局方式**：默认左图右文，但在少文字高密度场景下，允许 `center pyramid + side annotations` (中心图形，两侧引线标注)。
* **内容插槽**：右侧释义区可以放纯文本、Bullet 列表、数据表格或嵌套的指标卡片。
* **Wide-label 模式**：如果层级标签较长，允许完全外置，色块内只保留编号，避免文字被裁切。

**不可变化的维度**：
* 金字塔的斜线必须是完美直斜线，不能是折线或波浪线。
* 层级关系不能倒置错乱（如基础层一定要在最宽处）。

## 4. Density Modes (信息密度规则)
* **low (低密度)**：只展示层级名称和极简的一句话核心洞察。
* **medium (中密度)**：层级标题 + 2-3 个关键 bullet points。
* **high (高密度)**：释义区升级为跨度对齐的表格结构，展示每一层的多维指标或具体执行规范。

## 5. HTML Exemplars (范例参考)

### Exemplar A: Canonical (经典左图右文 4层)
```html
<div data-component="pyramid" data-variant="upward" data-density="medium" style="grid-column: 1/span 24; grid-row: 5/span 19; display: flex; gap: 40px; align-items: center;">
  <!-- 左侧：金字塔图形 -->
  <div class="pyramid-graph" style="width: 380px; display: flex; flex-direction: column; align-items: center; gap: 6px;">
    <!-- 1/2 = 50% -->
    <div data-slot="layer" class="pyr-layer" style="width: 25%; clip-path: polygon(50% 0%, 100% 100%, 0% 100%); background: var(--primary); ...">1</div>
    <!-- 1/4 = 25% -->
    <div data-slot="layer" class="pyr-layer" style="width: 50%; clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%); background: var(--accent); ...">2</div>
    <!-- 1/6 = 16.66% -->
    <div data-slot="layer" class="pyr-layer" style="width: 75%; clip-path: polygon(16.66% 0%, 83.33% 0%, 100% 100%, 0% 100%); ...">3</div>
    <!-- 1/8 = 12.5% -->
    <div data-slot="layer" class="pyr-layer" style="width: 100%; clip-path: polygon(12.5% 0%, 87.5% 0%, 100% 100%, 0% 100%); ...">4</div>
  </div>

  <!-- 右侧：释义文本 -->
  <div class="pyramid-text" style="flex: 1; display: flex; flex-direction: column; gap: 6px; justify-content: center;">
    <div data-slot="desc" class="pyr-desc" style="height: 55px; display: flex; flex-direction: column; justify-content: center;">
      <h4>顶层标题</h4>
      <p>释义内容</p>
    </div>
    <!-- 其他层的 desc，确保高度(55px)和 gap(6px) 与图形侧完全一致 -->
  </div>
</div>
```

## 6. Styling Hooks (样式钩子)
*   **语义属性 (必须)**：`data-component="pyramid"`, `data-slot="layer|desc"`, `data-variant="upward|inverted"`, `data-density="low|medium|high"`。
*   **CSS Class 约定**：推荐使用 `.pyramid-graph`, `.pyr-layer`, `.pyramid-text`, `.pyr-desc`。
*   **颜色变量**：建议顶端高光层使用 `var(--primary)` 或 `var(--accent)` 以作强调，逐层向下调整亮暗或色彩饱和度。

## 7. Failure Modes (典型失败模式与反例)
*   ❌ **平顶或折线**：手工编造了错误的 `clip-path` 百分比，或者未严格遵循 `width` 等差递增规律，导致金字塔侧边变成锯齿状折线或出现平顶。
*   ❌ **文字塞进窄顶层**：把长文本强行写在顶层色块内部，导致文字在梯形裁切下被截断、不可阅读。必须全部外置。
*   ❌ **右侧说明与层级错位**：左右两侧的 `gap` 或子元素高度设定不一致，导致文字对齐错位。

## 8. QA Checklist (QA 验收条件)
*   [ ] **C-PYR-01**: 组件是否具有 `data-component="pyramid"` 以及相应的 `data-slot` 设置？
*   [ ] **C-PYR-02**: 金字塔外边缘斜线是否通过精确的数学计算形成完美直线（无断层锯齿）？
*   [ ] **C-PYR-03**: 最顶层是否为物理尖角 (Apex)？
*   [ ] **C-PYR-04**: 文本说明是否外置，色块内部是否干净？
*   [ ] **C-PYR-05**: 释义层与对应的图形层在纵向上是否严格水平对齐无偏差？
