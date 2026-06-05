# STAIRCASE (阶梯)

## 1. When to Use / When Not to Use
**适用场景**：能力爬坡、成熟度模型跃迁、强调"高度跃升"的递进方案（例如 Level 1 到 Level 5 的能力进阶）。
**不适用场景**：线性平级路线图或一般流程推进（应使用 PROCESS_FLOW），具有时间发展规律的轴线（应使用 TIMELINE）。
**路由铁律**：只有强调"能力高度/成熟度爬坡跃升"时才选 STAIRCASE。

## 2. Component Contract (模式契约)
**核心约束**：
* 必须包含 `data-component="staircase"` 外层容器。
* 必须包含 `data-slot="step"` 承载台阶视觉区，以及对应的 `data-slot="desc"` 承载下方论述详情区。
* 各级台阶的攀升高度（差值）必须在视觉上体现出清晰递增的几何规律。
* 下层每个阶段的论述必须与其头顶的台阶**严格垂直柱状对齐**。
* 不可使用 SVG `path` 直接画死整个表格内容，必须保留 HTML 可编辑性。

## 3. Creative Freedom (创作空间)
**允许变化的维度**：
* **视觉形态双变体**：
  * **Bar Staircase (色块阶梯)**：通过递增高度的实心 `div` 色块来表现台阶（当前最稳定、最常见的形态）。
  * **Line Staircase (折线阶梯)**：通过仅画顶部边框或折线图形来拉升高度，下方留白。
* **成熟度层级**：从 3 层到 6 层的 Maturity Ladder 均可适用。
* **底座嵌套结构**：下层的 `.stair-matrix` 区域内部可以嵌套简单的 Bullet 列表，或扩展为多维度的贯通数据表格。

**不可变化的维度**：
* 台阶高度必须呈**严格单调递增**规律，不可出现回退。
* 上方的视觉区与下方的文字矩阵区的列数对应关系绝对不可错乱。

## 4. Density Modes (信息密度规则)
通过 `data-density` 属性调节：
* **low (低密度)**：只展示阶梯等级名称和极大的爬坡终极目标词。
* **medium (中密度)**：台阶名称 + 每个阶段 2-3 个核心提升点。
* **high (高密度)**：下层演变为复杂的二维网格（如按照“组织/流程/工具”维度详细拆解各个台阶能力标准的表格）。

## 5. HTML Exemplars (范例参考)

### Exemplar A: Canonical (色块阶梯 Bar Staircase)
```html
<div data-component="staircase" data-variant="bar" data-density="medium" style="grid-column: 1/span 24; grid-row: 5/span 19; display: flex; flex-direction: column;">
  <!-- 上层：阶梯图形 -->
  <div class="stair-visual" style="display: flex; align-items: flex-end; gap: 15px; margin-bottom: 30px;">
    <!-- 80px 高度 -->
    <div data-slot="step" style="flex: 1;">
      <div style="height: 80px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">L1 起步</div>
    </div>
    <!-- 160px 高度 -->
    <div data-slot="step" style="flex: 1;">
      <div style="height: 160px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">L2 发展</div>
    </div>
    <!-- 240px 高度 -->
    <div data-slot="step" data-state="active" style="flex: 1;">
      <div style="height: 240px; background: var(--accent); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">L3 领先</div>
    </div>
  </div>

  <!-- 下层：内容矩阵 -->
  <div class="stair-matrix" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
    <div data-slot="desc" style="padding: 0 5px;">
      <h3 style="border-bottom: 2px solid var(--accent); ...">核心动作</h3>
      <ul><li>...</li></ul>
    </div>
    <!-- 其他 2 个对应的 desc... -->
  </div>
</div>
```

## 6. Styling Hooks (样式钩子)
*   **语义属性 (必须)**：`data-component="staircase"`, `data-slot="step|desc"`, `data-variant="bar|line"`, `data-state="active|default"`, `data-density="low|medium|high"`。
*   **CSS Class 约定**：使用 `.stair-visual` 承载图形，使用 `.stair-matrix` 承载文本区域，便于控制全局对齐。
*   **颜色控制**：高亮当前或最高能力级别时使用 `var(--accent)`。

## 7. Failure Modes (典型失败模式与反例)
*   ❌ **误用为时间轴**：把台阶用于标示 2021、2022、2023 时间点，却未体现任何成熟度、能力的提升。
*   ❌ **台阶高度差混乱**：比如第一阶 80px，第二阶 90px，第三阶 200px。高度差比失去统一约束，严重破坏几何美感。
*   ❌ **上下网格脱节**：由于没有正确配置相同列数的 Grid 或 Flex 排版，下方说明文字直接错位跑出了对应台阶的正下方。

## 8. QA Checklist (QA 验收条件)
*   [ ] **C-STR-01**: 是否清晰声明了 `data-component="staircase"` 及相关的 `data-slot`？
*   [ ] **C-STR-02**: 每级台阶的攀升高度是否呈可视化的规律递增？
*   [ ] **C-STR-03**: 下层内容区每一列是否与顶部的台阶骨架绝对对齐（没有错位或偏移）？
*   [ ] **C-STR-04**: 若高密度下使用贯穿型表格结构，表格各单元格是否与台阶严格宽度对应？
