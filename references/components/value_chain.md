# VALUE_CHAIN (价值链)

## 1. When to Use / When Not to Use
**适用场景**：波特价值链分析、产业上下游图谱、核心业务主干与辅助支撑业务组合。
**不适用场景**：平级节点的简单线性流程（应使用 PROCESS_FLOW）。

## 2. Component Contract (模式契约)
**核心约束**：
* 必须包含 `data-component="value-chain"` 外层容器。
* 必须包含 `data-slot="primary-activities"` (基本活动，通常在下方横向展开) 和 `data-slot="support-activities"` (支持性活动，通常在上方横跨排列)。
* 必须有一个 `data-slot="margin"` (利润/终极价值) 指向右侧终点。
* 图形结构必须通过精确的 CSS 布局（如 Grid 结合内部 Flex）对齐，不可错位。

## 3. Creative Freedom (创作空间)
**允许变化的维度**：
* **结构调整**：如果只是简单的上下游图谱，也可以退化为一维串联的价值流动。
* **卡片细节**：基本活动和支持活动的区块内部，可以包含无序列表或关键数据点。

**不可变化的维度**：
* 基本活动必须按照时间或逻辑的先后顺序自左向右排列。
* 必须保留最终价值 (Margin) 收口指向右侧的语义。

## 4. Density Modes (信息密度规则)
* **low (低密度)**：只包含主要环节的大字号标题。
* **medium (中密度)**：包含环节标题以及下方的 1-2 个动词子项标签。
* **high (高密度)**：除了环节标题外，包含完整的人员/资金/数据投入产出清单。

## 5. HTML Exemplars (范例参考)

### Exemplar A: Canonical (波特价值链)
```html
<div data-component="value-chain" data-variant="porter" data-density="medium" style="grid-column: 1/span 24; grid-row: 5/span 19; display: grid; grid-template-columns: 1fr 120px; gap: 4px;">
  
  <div style="display: flex; flex-direction: column; gap: 4px;">
    <!-- 支持性活动 -->
    <div data-slot="support-activities" style="display: flex; flex-direction: column; gap: 4px;">
      <div style="background: var(--bg-surface-light); padding: 10px; border: 1px solid var(--border-default);">企业基础设施</div>
      <div style="background: var(--bg-surface-light); padding: 10px; border: 1px solid var(--border-default);">人力资源管理</div>
      <div style="background: var(--bg-surface-light); padding: 10px; border: 1px solid var(--border-default);">技术开发</div>
      <div style="background: var(--bg-surface-light); padding: 10px; border: 1px solid var(--border-default);">采购管理</div>
    </div>
    
    <!-- 基本活动 -->
    <div data-slot="primary-activities" style="display: flex; gap: 4px; margin-top: 10px;">
      <div style="flex: 1; background: var(--bg-surface); padding: 20px; text-align: center; border-top: 4px solid var(--primary);">进货物流</div>
      <div style="flex: 1; background: var(--bg-surface); padding: 20px; text-align: center; border-top: 4px solid var(--primary);">生产作业</div>
      <div style="flex: 1; background: var(--bg-surface); padding: 20px; text-align: center; border-top: 4px solid var(--primary);">发货物流</div>
      <div style="flex: 1; background: var(--bg-surface); padding: 20px; text-align: center; border-top: 4px solid var(--primary);">市场营销</div>
      <div style="flex: 1; background: var(--bg-surface); padding: 20px; text-align: center; border-top: 4px solid var(--primary);">售后服务</div>
    </div>
  </div>

  <!-- 利润/价值 -->
  <div data-slot="margin" style="background: var(--accent); color: white; display: flex; align-items: center; justify-content: center; writing-mode: vertical-lr; text-orientation: upright; font-weight: bold; font-size: 20px; clip-path: polygon(0 0, 100% 50%, 0 100%);">
    利 润
  </div>

</div>
```

## 6. Styling Hooks (样式钩子)
*   **语义属性 (必须)**：`data-component="value-chain"`, `data-slot="primary-activities|support-activities|margin"`, `data-density="low|medium|high"`。
*   **视觉强调**：利润/价值区应当使用 `var(--accent)` 或者强烈的几何形状（如向右的大切角箭头 `clip-path`）。

## 7. Failure Modes (典型失败模式与反例)
*   ❌ **不对齐的区块**：上方横跨的支持性活动与下方的基本活动没有使用同一宽度的外层包裹，导致右侧参差不齐，无法被最右侧的 Margin 箭头完美封口。
*   ❌ **不支持长文本**：把 Margin 写成了普通横排，导致右侧所占列数过宽，或者长文本直接被挤压溢出（应当采用 `writing-mode: vertical-lr` 竖排）。

## 8. QA Checklist (QA 验收条件)
*   [ ] **C-VAL-01**: 组件是否声明了 `data-component="value-chain"`？
*   [ ] **C-VAL-02**: 支持活动区和基本活动区的右侧物理边界是否绝对对齐？
*   [ ] **C-VAL-03**: 右侧的 Margin 价值区域是否采用竖排、指向明确，且高度完美覆盖左侧主体区？
