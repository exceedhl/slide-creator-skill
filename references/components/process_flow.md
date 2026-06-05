# PROCESS_FLOW (流程图)

## 1. When to Use / When Not to Use
**适用场景**：平级阶段推进、业务审批流、线性路线图、强因果逻辑的阶段推演。
**不适用场景**：有明确物理时间刻度/日期的场景（应使用 TIMELINE），无序平级要素枚举（应使用普通网格系统）。

## 2. Component Contract (模式契约)
**核心约束**：
* 必须包含 `data-component="process-flow"` 的外层容器。
* 必须包含至少 2 个表示流程节点的 `data-slot="step"` 容器，以及它们对应的解释文本 `data-slot="detail"` 容器。
* 必须存在至少一个 **Active 焦点节点**（带有 `data-state="active"` 标识并以强调色区分）。
* 每个 `detail` 释义区必须与其对应的 `step` 节点在主轴方向上**严格对齐**。
* 文字必须为普通 HTML DOM 节点，不可使用 SVG 内嵌文字。

## 3. Creative Freedom (创作空间)
**允许变化的维度**：
* **视觉形态**：不局限于 Chevron (首尾咬合的箭头)，也可以是 Pipeline Cards、Numbered Steps、Swimlane (泳道)、Loop (循环线性) 或 Decision-gate flow。
* **方向变体**：支持横向 `data-variant="horizontal"` 和纵向 `data-variant="vertical"`。
* **跨角色泳道**：支持针对各阶段增加不同参与角色的通道标注，使用 `data-lane="sales|delivery|customer"`。
* **内容插槽**：`detail` 区域是通用的，可以放纯文字、Bullet 列表、数据表格或嵌套的图片/指标卡片。

**不可变化的维度**：
* 阶段先后顺序与指向因果必须清晰。
* 节点与释义详情的对应关系不得脱节或发生位移（宽/高对齐铁律）。

## 4. Density Modes (信息密度规则)
通过 `data-density` 调节内容颗粒度：
* **low (低密度)**：只展示阶段名称，或阶段名称下带 1 行极简概述。适合高管宣讲。
* **medium (中密度)**：每个阶段附带 3-4 个 bullet points。
* **high (高密度)**：包含多角色协作 (Swimlane)、详细数据表格参数对比或底层输入输出支撑材料。

## 5. HTML Exemplars (范例参考)

### Exemplar A: Canonical (经典 Chevron 水平流)
```html
<div data-component="process-flow" data-variant="horizontal-chevron" data-density="medium" class="content-block" style="grid-column: 1/span 24; grid-row: 5/span 19; display: flex; flex-direction: column;">
  <!-- Chevron 阶段头部 -->
  <div class="flow-header" style="display: flex; width: 100%; height: 70px; margin-bottom: 25px;">
    <div data-slot="step" data-state="active" class="chevron active" style="...">1. 阶段一标题</div>
    <div data-slot="step" data-state="default" class="chevron" style="...">2. 阶段二标题</div>
    <div data-slot="step" data-state="default" class="chevron" style="...">3. 阶段三标题</div>
  </div>

  <!-- 对应释义区 -->
  <div class="flow-details" style="display: flex; width: 100%;">
    <div data-slot="detail" class="detail-box" style="flex: 1; padding: 0 12px;">
      <h3 style="...">阶段一详解</h3>
      <ul style="..."><li>关键要点描述</li></ul>
    </div>
    <div data-slot="detail" class="detail-box" style="flex: 1; padding: 0 12px;">...</div>
    <div data-slot="detail" class="detail-box" style="flex: 1; padding: 0 12px;">...</div>
  </div>
</div>
```

### Exemplar B: Expressive (包含角色泳道的 Pipeline 流)
```html
<div data-component="process-flow" data-variant="horizontal-swimlane" data-density="high" style="grid-column: 1/span 24; grid-row: 5/span 19; display: grid; grid-template-columns: 150px 1fr; gap: 20px;">
  <!-- 左侧：角色标头 -->
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="height: 60px;"></div> <!-- 占位对齐头部 -->
    <div data-slot="lane-header" style="height: 100px;">销售团队</div>
    <div data-slot="lane-header" style="height: 100px;">交付中心</div>
  </div>
  
  <!-- 右侧：流程主体 -->
  <div style="display: flex; flex-direction: column;">
    <!-- 步骤头部 -->
    <div style="display: flex; height: 60px; gap: 10px;">
      <div data-slot="step" style="flex: 1; background: var(--bg-surface); ...">1. 需求确认</div>
      <div data-slot="step" data-state="active" style="flex: 1; background: var(--accent); ...">2. 方案设计</div>
    </div>
    <!-- 销售泳道 -->
    <div data-lane="sales" style="display: flex; gap: 10px; margin-top: 20px;">
      <div data-slot="detail" style="flex: 1; height: 100px; ...">收集客户反馈</div>
      <div data-slot="detail" style="flex: 1; height: 100px; ...">参与报价</div>
    </div>
    <!-- 交付泳道 -->
    <div data-lane="delivery" style="display: flex; gap: 10px; margin-top: 20px;">
      <div data-slot="detail" style="flex: 1; height: 100px; ...">提供资源预估</div>
      <div data-slot="detail" style="flex: 1; height: 100px; ...">输出系统架构</div>
    </div>
  </div>
</div>
```

## 6. Styling Hooks (样式钩子)
*   **语义属性 (必须)**：`data-component="process-flow"`, `data-slot="step|detail|lane-header"`, `data-variant="horizontal-*|vertical-*"`, `data-state="active|default"`, `data-density="low|medium|high"`。
*   **CSS Class 约定**：推荐使用 `.flow-header`, `.chevron`, `.flow-details`。
*   **咬合变量 (针对 Chevron)**：必须使用 `--chevron-notch` (箭头凹槽深度) 和 `--chevron-gap` (间隙) 通过 `clip-path` 动态计算。

## 7. Failure Modes (典型失败模式与反例)
*   ❌ **长标题撑爆 Chevron**：把很长的描述性句子塞进了箭头区域，导致箭头被撑破或严重折行。正确做法：头部只放 "1. 需求确认"，长文案放在下方的 detail 区。
*   ❌ **列表错位**：下方详情区的 `div` 没有使用和上方步骤完全一致的分配方式 (如 `flex: 1` 均分)，导致视觉上无法对应。
*   ❌ **结尾被切成平口**：Chevron 最后一个箭头被切成了平的，失去了 "进程推进" 的语义隐喻（除非它代表流程彻底终结）。
*   ❌ **无状态区分**：5 个步骤全是一模一样的蓝色，没有使用 `data-state="active"` 标识当前聚焦阶段。

## 8. QA Checklist (QA 验收条件)
*   [ ] **C-PRF-01**: 是否拥有明确的 `data-component="process-flow"` 和 `data-slot="step|detail"` 定义？
*   [ ] **C-PRF-02**: 上方步骤节点与下方/侧方的详情区是否在物理像素上严格对齐对应（无错位）？
*   [ ] **C-PRF-03**: 是否有至少一个节点用颜色标识为 Active 状态？
*   [ ] **C-PRF-04**: 如果使用 Chevron 变体，相邻 Chevron 的间隙是否紧凑咬合？末尾节点是否保留了右侧尖角？长文本是否已被拆分并外置？
