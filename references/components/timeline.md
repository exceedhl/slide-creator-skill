# TIMELINE (时间轴)

## 1. When to Use / When Not to Use
**适用场景**：历史沿革、未来规划、里程碑事件、有真实日期/年份权重的 30-60-90 天路径。
**不适用场景**：无时间刻度权重的阶段展示（应使用 PROCESS_FLOW）。**路由铁律**：时间轴上必须有明确的时间概念。

## 2. Component Contract (模式契约)
**核心约束**：
* 必须包含 `data-component="timeline"` 的外层容器。
* 必须包含显式渲染的时间轴线（通过绝对定位或边框实现）。
* 必须包含 `data-slot="milestone"` 容器，每个容器内必须有圆点、明确的时间戳 `data-date` 以及相关事件内容。
* 必须存在至少一个 **Active 焦点节点**（带有 `data-state="active"`）。
* 所有时间节点圆点必须**精确居中于轴线上**（圆心与线物理重合）。
* 文字和日期必须是普通 HTML DOM，不能是 SVG。

## 3. Creative Freedom (创作空间)
**允许变化的维度**：
* **时间权重对齐**：时间间隔不等时，可以选择不均分宽度。例如跨度 1 年的节点间隔可以比跨度 1 个月的更宽。
* **方向变体**：横向时间轴 `data-variant="horizontal"` 和纵向时间轴 `data-variant="vertical"` 均可。
* **卡片排布**：内容卡片可以全部在轴线单侧，也可以在轴线上方和下方交错排布（交错能容纳更多高密度内容）。
* **内容承载**：卡片内部可以嵌套图片、数据表格或指标数据。

**不可变化的维度**：
* 必须出现年份、月份、日期等时间标志物。
* 圆点必须锚定在轴线上，不能因为下方文本内容的撑高而发生偏移。

## 4. Density Modes (信息密度规则)
通过 `data-density` 调节密度：
* **low (低密度)**：只标年份和 1 句事件短语，留白充裕。
* **medium (中密度)**：年份 + 核心标题 + 1-2 行描述。
* **high (高密度)**：节点呈上下交错排列，描述中可附带具体数据或次级列表。

## 5. HTML Exemplars (范例参考)

### Exemplar A: Canonical (标准水平轴，下方排布卡片)
```html
<div data-component="timeline" data-variant="horizontal" data-density="medium" style="grid-column: 1/span 24; grid-row: 5/span 18; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: 60px 20px 1fr; position: relative;">
  <!-- 轴线 -->
  <div class="timeline-axis" style="position: absolute; height: 3px; background: var(--border-default); top: 68px; left: 15%; right: 15%; z-index: 1;"></div>

  <!-- 日期标签 -->
  <div data-slot="date" class="time-label" style="grid-row: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding-bottom: 12px;">
    <span class="date" style="color: var(--primary); font-size: 22px; font-weight: bold;">第 1-30 天</span>
    <span class="phase" style="color: var(--text-muted); font-size: 13px;">初步阶段</span>
  </div>
  <!-- 其他 2 个日期标签... -->

  <!-- 轴线上的圆点 -->
  <div data-slot="dot" class="dot-container" style="grid-row: 2; display: flex; justify-content: center; z-index: 2;">
    <div data-state="active" class="dot" style="width: 14px; height: 14px; border-radius: 50%; background: var(--accent); border: 3px solid var(--accent);"></div>
  </div>
  <!-- 其他 2 个圆点... -->

  <!-- 内容卡片 -->
  <div data-slot="milestone" class="content-card" style="grid-row: 3; padding: 20px; margin: 10px 10px 0; background: var(--bg-surface); border-top: 2px solid var(--primary);">
    <h4 style="color: var(--primary);">阶段目标</h4>
    <p style="color: var(--text-muted);">详细实施计划说明</p>
  </div>
  <!-- 其他 2 个内容卡片... -->
</div>
```

### Exemplar B: Expressive (上下交错，非均等时间跨度)
```html
<div data-component="timeline" data-variant="horizontal-alternating" data-density="high" style="grid-column: 1/span 24; grid-row: 5/span 18; position: relative;">
  <div class="timeline-axis" style="position: absolute; height: 4px; background: var(--border-default); top: 50%; left: 5%; right: 5%; transform: translateY(-50%);"></div>

  <!-- 可以使用 flex 或绝对定位来制造不等距效果 -->
  <!-- 上方节点 -->
  <div data-slot="milestone" data-date="2020" style="position: absolute; left: 20%; top: 10%; width: 250px; text-align: center;">
    <div data-slot="date" style="font-weight: bold; font-size: 24px;">2020</div>
    <div class="card" style="border: 1px solid var(--border-default); padding: 15px; margin-top: 10px; background: white;">...</div>
    <div data-slot="dot" style="position: absolute; bottom: -45px; left: 50%; transform: translateX(-50%); ..."></div>
  </div>

  <!-- 下方节点 -->
  <div data-slot="milestone" data-date="2024" style="position: absolute; left: 60%; top: 52%; width: 250px; text-align: center;">
    <div data-slot="dot" style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%); ..."></div>
    <div data-slot="date" style="font-weight: bold; font-size: 24px;">2024</div>
    <div class="card" style="border: 1px solid var(--border-default); padding: 15px; margin-top: 10px; background: white;">...</div>
  </div>
</div>
```

## 6. Styling Hooks (样式钩子)
*   **语义属性 (必须)**：`data-component="timeline"`, `data-slot="milestone|date|dot"`, `data-variant="horizontal|vertical|horizontal-alternating"`, `data-state="active|default"`, `data-density="low|medium|high"`, `data-date="时间串"`。
*   **CSS Class 约定**：推荐使用 `.timeline-axis`, `.time-label`, `.dot`, `.content-card`。
*   **几何变量**：轴线宽度应受控，且时间节点圆点应当使用边框与底色搭配的方式以显得有立体感或空心感。

## 7. Failure Modes (典型失败模式与反例)
*   ❌ **无时间权重误用**：纯粹用时间轴来表现“用户登录 -> 填写表单 -> 提交”，没有时间戳，应改为 PROCESS_FLOW。
*   ❌ **圆点跑偏**：由于内容卡片文字极多，导致 Grid 的该列被挤宽或变高，圆点没有绝对居中压在线上。
*   ❌ **视觉失衡**：在均分时间的形态下，部分节点内容特别长，导致时间轴挤在一起，留白不对称。
*   ❌ **误导性时间间隔**：时间轴上写着 2020、2021、2026，但三者物理距离完全均等，产生视觉误导。

## 8. QA Checklist (QA 验收条件)
*   [ ] **C-TML-01**: 组件是否具有 `data-component="timeline"` 以及完整的 `data-slot` 设置？
*   [ ] **C-TML-02**: 所有时间节点的圆点是否精确居中于轴线上（圆心与线物理重合）？
*   [ ] **C-TML-03**: 如果文本发生折行导致卡片变高，圆点和轴线是否依然保持原位？
*   [ ] **C-TML-04**: 是否有至少一个节点使用 `data-state="active"` 并且颜色显著区别于其他节点？
*   [ ] **C-TML-05**: 如果是采用表格对齐的方式，列宽是否与上方/左方对应的时间点一致，无错位？
