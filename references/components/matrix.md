# MATRIX (象限矩阵)

## 1. When to Use / When Not to Use
**适用场景**：交叉维度评估、风险/优先级四象限、2x2 或 3x3 定性阵列分析。
**不适用场景**：单一维度的对比（应使用表格或柱状图），纯流程展示（应使用 PROCESS_FLOW）。

## 2. Component Contract (模式契约)
**核心约束**：
* 必须包含 `data-component="matrix"` 的外层容器。
* 必须包含 `data-slot="axis-x"` 和 `data-slot="axis-y"` 的明确标签。
* 必须包含 4 个（2x2）或 9 个（3x3） `data-slot="quadrant"` 容器。
* `data-variant` 必须标明是 `cross` (中心十字) 还是 `L-shape` (L型边界)。
* 坐标轴文本标签必须是独立的 HTML DOM 节点，绝对不能是 SVG 中的 `<text>`，以便于编辑器后续修改。
* 四象限/九宫格的网格结构必须严格对齐，确保各象限能横向纵向比较。

## 3. Creative Freedom (创作空间)
**允许变化的维度**：
* **象限权重**：象限的宽高不需要绝对均分（例如右上角核心象限可以设置更大的比例如 `1.5fr`）。
* **背景纹理/热力分布**：可以加入热力图背景（Heatmap）、不同深浅的底色或对角线张力线。
* **侧边注释**：可以在矩阵右侧或底部新增 `data-slot="annotation"` 用于总结推荐动作或洞察。
* **象限内部结构**：内部不限于纯文本，可以包含指标数字 (KPI Chips) 或图示气泡 (Bubble)。

**不可变化的维度**：
* 坐标轴语义不可破坏，X 轴和 Y 轴标签必须保留且方向清晰。
* 各个象限必须存在且具有坐标一致性，不能随意删减网格导致无法判断逻辑位置。

## 4. Density Modes (信息密度规则)
组件支持通过 `data-density` 属性调节密度：
* **low (低密度)**：象限内仅保留标题和极大字号的核心关键词。
* **medium (中密度)**：象限标题 + 1句话（不超过 2 行的短描述）。
* **high (高密度)**：象限标题 + 2-3 条短 bullet points + KPI 数值/标签，且通常包含右侧 `annotation` 行动建议列。

## 5. HTML Exemplars (范例参考)

### Exemplar A: Canonical (标准中心十字 2x2)
```html
<div data-component="matrix" data-variant="cross" data-density="medium" style="grid-column: 1/span 24; grid-row: 5/span 19; position: relative; display: flex; align-items: center; justify-content: center;">
  <!-- 十字轴线 -->
  <div class="axis-line-x" style="..."></div>
  <div class="axis-line-y" style="..."></div>
  
  <!-- 坐标轴标签 -->
  <div data-slot="axis-y" class="axis-top" style="position: absolute; ...">高影响</div>
  <div data-slot="axis-y" class="axis-bottom" style="...">低影响</div>
  <div data-slot="axis-x" class="axis-left" style="...">低概率</div>
  <div data-slot="axis-x" class="axis-right" style="...">高概率</div>

  <!-- 象限区 -->
  <div class="matrix-grid" style="display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 20px; width: 85%; height: 85%;">
    <div data-slot="quadrant" data-quadrant="high-low" class="quadrant" style="background: var(--bg-surface); padding: 20px; border: 1px solid var(--border-default);">
      <h3 style="color: var(--primary);">象限 I</h3>
      <p style="color: var(--text-muted);">内容描述</p>
    </div>
    <!-- 其他三个 quadrant -->
  </div>
</div>
```

### Exemplar B: Expressive (不等权热力图/带推荐行动)
```html
<div data-component="matrix" data-variant="L-shape" data-density="high" style="grid-column: 1/span 24; grid-row: 5/span 19; display: grid; grid-template-columns: 3fr 1fr; gap: 30px;">
  <!-- 矩阵核心区 -->
  <div class="matrix-main" style="display: grid; grid-template-columns: 20px 1fr; ...">
    <div data-slot="axis-y" style="writing-mode: vertical-rl; text-align: center;">市场潜力</div>
    
    <div class="matrix-grid" style="display: grid; grid-template-columns: 1fr 1.5fr; grid-template-rows: 1fr 1.5fr; gap: 15px;">
      <!-- 右上角赋予高权重和强调色 -->
      <div data-slot="quadrant" style="grid-column: 2; grid-row: 1; background: var(--accent); color: white; padding: 20px;">
        <h3>优先投资</h3>
        <ul><li>动作 A</li></ul>
      </div>
      <!-- 其他象限 -->
    </div>
    
    <div data-slot="axis-x" style="grid-column: 2;">战略契合度</div>
  </div>
  
  <!-- 侧边洞察/行动建议 -->
  <div data-slot="annotation" class="matrix-actions" style="border-left: 2px solid var(--border-default); padding-left: 20px;">
    <h3 style="color: var(--primary);">Recommended Actions</h3>
    <ul style="color: var(--text-muted);">
      <li>重点保障右上角资源</li>
      <li>监控左上角转化</li>
    </ul>
  </div>
</div>
```

## 6. Styling Hooks (样式钩子)
*   **语义属性 (必须提供)**：`data-component="matrix"`, `data-slot="quadrant|axis-x|axis-y|annotation"`, `data-variant="cross|L-shape"`, `data-density="low|medium|high"`。
*   **CSS Class 命名**：推荐使用 `.matrix-grid`, `.quadrant`, `.axis-label`。
*   **颜色变量**：象限底色应使用 `var(--bg-surface)`，高亮象限、十字轴线或高优指标使用 `var(--accent)` 或 `var(--primary)`。

## 7. Failure Modes (典型失败模式与反例)
*   ❌ **坐标标签丢失**：只画了 4 个格子，但没有 X 轴和 Y 轴说明。
*   ❌ **象限逻辑错乱**：通常右上角为双高（High-High），如果不经检查胡乱摆放文字，容易导致内容逻辑与坐标轴矛盾。
*   ❌ **文字重叠与截断**：十字轴线直接压在文字上，或高密度下文本长出象限格子（Overflow）。
*   ❌ **不可编辑的 SVG 文本**：用 SVG 手绘了整个矩阵，并将 “高影响” 等坐标词写在 `<text>` 标签中，导致编辑器无法作为普通 DOM 选中修改。

## 8. QA Checklist (QA 验收条件)
*   [ ] **C-MTX-01**: 组件是否具有明确的 `data-component="matrix"` 属性以及所有的 `data-slot` 属性？
*   [ ] **C-MTX-02**: 坐标轴文本标签是否清晰可读，且为常规 HTML DOM 节点而非 SVG 文本？
*   [ ] **C-MTX-03**: 若使用中心十字，轴线是否精确穿透在分隔中心，没有导致左右/上下不对称？若使用 L 型，坐标轴是否拥有独立的视觉空间未被卡片挤压？
*   [ ] **C-MTX-04**: 四象限标题在同等级别下字号是否保持一致（除非在 Expressive 变体中特意做权重区分）？
