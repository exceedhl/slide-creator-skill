# SYSTEM_DIAGRAM (系统架构图)

## 1. When to Use / When Not to Use
**适用场景**：软件平台架构、三层/多层体系结构、生态图、模块关系图。
**不适用场景**：简单的流程步骤推演（应使用 PROCESS_FLOW），数据对比（应使用 CHART）。

## 2. Component Contract (模式契约)
**核心约束**：
* 必须包含 `data-component="system-diagram"` 外层容器。
* 架构必须分层（Layers）或分块（Pillars），通过 `data-slot="layer"` 或 `data-slot="pillar"` 标识。
* 系统模块/卡片必须使用 `data-slot="module"` 标识。
* 必须有明显的物理包围盒体现层级包含关系。
* 所有的文字必须是常规 HTML DOM，禁止使用 SVG 绘制文字。连线和剪头可以由 CSS 边框或绝对定位的连线元素提供。

## 3. Creative Freedom (创作空间)
**允许变化的维度**：
* **结构变体**：
  * **三层架构 (3-Tier)**: 自下而上的 IaaS/PaaS/SaaS 或 数据层/服务层/应用层。
  * **柱状支撑 (Pillars)**: 多个垂直支柱支撑一个顶部的屋顶结构 (Roof)。
  * **中心辐射 (Hub & Spoke)**: 中心核心模块向外辐射。
* **卡片细节**：模块卡片内部可以包含小图标 (Icons) 和简短说明。

**不可变化的维度**：
* 层级间的从属和依赖关系必须清晰，不能出现视觉上无所适从的孤立模块。
* 同一层级的模块在对齐上必须工整，通过 Grid 或 Flex 实现严格分布。

## 4. Density Modes (信息密度规则)
* **low (低密度)**：只展示核心层级名称与 3-5 个主模块大色块。
* **medium (中密度)**：展示完整的分层结构，每个模块内有 1 行短说明。
* **high (高密度)**：模块颗粒度极小，可能包含底层技术栈 (Tech Stack) 标签（如 MySQL, Redis, Kafka）与数据流向连线。

## 5. HTML Exemplars (范例参考)

### Exemplar A: Canonical (经典三层架构图)
```html
<div data-component="system-diagram" data-variant="3-tier" data-density="medium" style="grid-column: 1/span 24; grid-row: 5/span 19; display: flex; flex-direction: column; gap: 20px; align-items: center;">
  
  <!-- 应用层 -->
  <div data-slot="layer" style="width: 100%; border: 2px dashed var(--border-default); padding: 20px; border-radius: 8px; position: relative;">
    <div style="position: absolute; top: -12px; left: 20px; background: white; padding: 0 10px; font-weight: bold; color: var(--primary);">应用层 (SaaS)</div>
    <div style="display: flex; gap: 20px; justify-content: center;">
      <div data-slot="module" style="flex: 1; height: 60px; background: var(--bg-surface); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-default);">Web Portal</div>
      <div data-slot="module" style="flex: 1; height: 60px; background: var(--bg-surface); ...">Mobile App</div>
    </div>
  </div>

  <!-- 向下箭头/连线区 -->
  <div style="height: 20px; width: 2px; background: var(--border-default);"></div>

  <!-- 服务层 -->
  <div data-slot="layer" style="width: 100%; border: 2px dashed var(--border-default); padding: 20px; border-radius: 8px; position: relative;">
    <div style="position: absolute; top: -12px; left: 20px; background: white; padding: 0 10px; font-weight: bold; color: var(--primary);">服务层 (PaaS)</div>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
      <div data-slot="module" style="background: var(--bg-surface-light); padding: 15px; text-align: center; border: 1px solid var(--border-default);">
        <h4 style="margin:0 0 5px 0;">用户服务</h4>
        <p style="margin:0; font-size: 12px; color: var(--text-muted);">Auth / Profile</p>
      </div>
      <!-- 其他 3 个服务模块 -->
    </div>
  </div>

</div>
```

## 6. Styling Hooks (样式钩子)
*   **语义属性 (必须)**：`data-component="system-diagram"`, `data-slot="layer|pillar|module"`, `data-variant="3-tier|pillars"`, `data-density="low|medium|high"`。
*   **颜色建议**：底层通常使用稳重的暗色或底色 `var(--bg-surface)`，高层或核心中枢使用 `var(--accent)` 以吸引视觉焦点。

## 7. Failure Modes (典型失败模式与反例)
*   ❌ **SVG 灾难**：把整个复杂的架构图作为一个完整的 SVG 输出，其中包含了成百上千行的 path 和 text。这违反了可编辑性要求。
*   ❌ **错乱的浮动对齐**：没有利用 Flex 或 Grid 布局，而是对各个 module 使用了混乱的 margin 和 absolute 定位，导致稍作修改就全盘错位。

## 8. QA Checklist (QA 验收条件)
*   [ ] **C-SYS-01**: 组件是否具有 `data-component="system-diagram"` 及其 `data-slot` 设置？
*   [ ] **C-SYS-02**: 系统架构的各层（Layers）是否有明确的视觉包围盒或边界线划分？
*   [ ] **C-SYS-03**: 所有文字是否都是可由普通编辑器选中的 HTML 节点（非 SVG `<text>`）？
*   [ ] **C-SYS-04**: 同一层级的模块之间是否通过 Flex/Grid 实现了均匀对齐？
