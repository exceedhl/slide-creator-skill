# FUNNEL (漏斗)

## 1. When to Use / When Not to Use
**适用场景**：销售转化漏斗、线索筛选、技术降噪等逐渐收敛的过程。
**不适用场景**：没有明确筛选/收缩数量关系的一般性步骤（应使用 PROCESS_FLOW）。

## 2. Component Contract (模式契约)
**核心约束**：
* 必须包含 `data-component="funnel"` 的外层容器。
* 必须包含表示单层的 `data-slot="stage"`。每个 stage 内包含业务区块 (`data-slot="block"`) 和向下的箭头关节 (`data-slot="joint"`)。
* 必须表达逐层筛选/收敛的语义，数量或比例显著递减。
* 实体区块保持方形或胶囊形，收缩感通过其宽度递减或连接处的箭头阵列递减来实现。
* 漏斗层图形与侧边解释文本必须在物理空间上纵向严格隔离对齐。
* 不可使用 SVG 编写组件主体。

## 3. Creative Freedom (创作空间)
**允许变化的维度**：
* **视觉形态**：
  * **Exemplar A (经典)**: 区块宽幅递减 + 箭头阵列（适合常规商业风）。
  * **Exemplar B (经典梯形)**: 使用 `clip-path` 制作真实的梯形漏斗。仅在文本极少、注重转化率大数字展示的场景允许使用。
  * **Exemplar C (水平管线)**: Horizontal Conversion Pipeline 横向收缩流。
* **数据承载**：强烈要求每层附带 Count、Ratio、Drop-off（留存/流失比）等显性转换指标。

**不可变化的维度**：
* 视觉上必须呈现显著的越往下层宽度/体积越小的收敛感。
* 转化的方向感（由大到小）必须不可逆。

## 4. Density Modes (信息密度规则)
通过 `data-density` 属性调节：
* **low (低密度)**：只展示阶段名与转化率核心大数字。
* **medium (中密度)**：阶段名 + 转化率核心指标 + 1行简要总结。
* **high (高密度)**：右侧文字区扩充为包含具体留存分析表格、流失原因排查 Bullet 点的高密度区域。

## 5. HTML Exemplars (范例参考)

### Exemplar A: Canonical (区块 + 递减箭头带)
```html
<div data-component="funnel" data-variant="vertical-blocks" data-density="medium" style="grid-column: 1/span 24; grid-row: 5/span 19; display: flex; width: 100%; height: 100%;">
  <!-- 漏斗图形区 -->
  <div class="funnel-graphics" style="display: grid; grid-template-rows: repeat(3, 1fr); width: 240px; flex-shrink: 0;">
    <div data-slot="stage" class="stage" style="display: flex; flex-direction: column; align-items: center;">
      <!-- 最宽 -->
      <div data-slot="block" style="width: 100%; background: var(--bg-surface-light); padding: 12px; height: 55px;">Level 1 触达</div>
      <!-- 箭头阵列：5 个箭头 -->
      <div data-slot="joint" style="display: flex; gap: 8px; flex: 1; align-items: center;">
        <div class="arrow-down"></div>... (5 个)
      </div>
    </div>
    <div data-slot="stage" class="stage">
      <div data-slot="block" style="width: 75%; ...">Level 2 意向</div>
      <!-- 箭头阵列：3 个箭头 -->
      <div data-slot="joint" style="...">... (3 个)</div>
    </div>
    <div data-slot="stage" class="stage stage-final">
      <!-- 最窄且深色高亮 -->
      <div data-slot="block" style="width: 50%; background: var(--primary); color: white;">Level 3 转化</div>
    </div>
  </div>

  <!-- 释义文本区 -->
  <div class="funnel-texts" style="display: grid; grid-template-rows: repeat(3, 1fr); flex: 1; padding-left: 25px;">
    <div data-slot="desc" class="text-item" style="display: flex; flex-direction: column; justify-content: flex-start; padding-top: 8px;">
      <h4>Level 1 详述</h4>
      <p>转化率: 100%</p>
    </div>
    <!-- 文本对齐项... -->
  </div>
</div>
```

## 6. Styling Hooks (样式钩子)
*   **语义属性 (必须)**：`data-component="funnel"`, `data-slot="stage|block|joint|desc"`, `data-variant="vertical-blocks|horizontal|trapezoid"`, `data-density="low|medium|high"`。
*   **颜色变量**：推荐上层使用低对比度底色 `var(--bg-surface-light)` 搭配深色字，底层（最终转化层）使用高对比度主色 `var(--primary)` 搭配白色字，以强调核心沉淀目标。

## 7. Failure Modes (典型失败模式与反例)
*   ❌ **无收敛指标**：没有表现任何流失率或留存数字，退化成了普通阶段图。
*   ❌ **右侧说明错位**：左右两栏没有采用一致的 Grid 划分方式，导致当中间箭头因为布局调整变长变短时，右侧说明文字无法锚定左侧色块。
*   ❌ **尾层强调过度**：把最终层画成了极度宽阔庞大的区域，打破了漏斗自上而下的视觉收缩感。

## 8. QA Checklist (QA 验收条件)
*   [ ] **C-FNL-01**: 组件是否具有 `data-component="funnel"` 及其 `data-slot` 设定？
*   [ ] **C-FNL-02**: 左侧图形结构与右侧解释文本在高度跨度上是否完美对齐？
*   [ ] **C-FNL-03**: 漏斗的各层宽度或箭头数量是否实现了自上而下递减的收拢效果？
*   [ ] **C-FNL-04**: 如果是右侧贯穿表格，表行是否与左侧漏斗层对齐关联？
