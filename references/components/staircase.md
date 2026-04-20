# STAIRCASE (阶梯递进 — 仅折线变体)

**适用场景**：逐级能力爬坡、成熟度模型跃迁、强调"高度跃升"的递进方案。
**不适用**：线性路线图 → 用 PROCESS_FLOW；时间节点 → 用 TIMELINE。

> **路由铁律**：只有内容强调"逐级攀升/高度爬坡"时才选 STAIRCASE。

## 1. 组件结构与视觉规则

垂直方向严格划分**上下两层**：**上层骨架** 承载折线阶梯图形（状态定标 + 视觉引导），**下层内容矩阵** 承载详细论述文本（信息主体）。两层间通过留白过渡，不用分割线。

**核心约束**：
*   上层骨架高度**紧凑**（最低刚需），将垂直空间主导权让给下层。
*   折线由交替的**水平段 + 垂直竖段**组成，从左到右递升，**所有台阶高度差（竖段）必须绝对相等**。
*   标题内容块在对应阶梯横线上方，**必须与下方列网格绝对居中对齐**。
*   下层每个阶段论述必须与其头顶的骨架**严格垂直柱状对齐**。
*   如存在多个固定解析维度，**严禁**在各阶段内重复属性名 → 必须在最左侧开辟行表头列。
*   下层内容区 (`.stair-cell`) 是**通用内容插槽**，可承载列表、表格、嵌套卡片或纯文本。
*   **【表格对齐与全局整合铁律 (Table Integration)】**：当下层采用多维度贯通表格排版结构时：
    1. **横向对齐绑定**：表格**每一列宽度必须与上方对应台阶宽度始终绝对无偏差对齐**。如果为了列举多维度而在最左侧额外设置了固定行表头列，上方的梯形折线图形区域也**必须**同时在自身 Grid 的最左侧使用一个空白 `<div class="spacer">` 预留出该宽度的死区（上下容器共用完全一致的 `grid-template-columns` 映射比例算法）。
    2. **线条遵循全局铁律**：无论当前幻灯片指派的总体外观属于 McKinsey 还是 Business，其下层生成的多行网格系统，都**必须恪守所在 `styles/xxx.md` 全局手册中明确要求的【物理贯穿横线铁律 / Continuous Row Border Rule】**。这强制意味着不管在内部怎样划分列数与 `gap`，每级横切信息外部必须拥有一个专门负责横扫全局的 `<div class="stair-row">` 或 `row-wrapper` 整行容器用以承载底部分割线，以此豁免间距割裂底线的丑陋现象。绝不可在局部独立列的 `.stair-cell` 上孤立声明其自己的分割边线。

## 2. 关键对齐公式 (N 级阶梯)

**CSS Grid 矩阵** `.stair-matrix`：`grid-template-columns: repeat(N, 1fr); gap: 0;`。间距通过子节点 `margin-right` + `padding-left` 实现（保证 `1fr` 精确等于 `100%/N`）。

**SVG 折线坐标**：`viewBox="0 0 1000 H"; preserveAspectRatio="none"`
*   X 转折点：`X_k = k * (1000/N)`
*   Y 高度差：相邻平台绝对差值为常量 `Delta_Y`

**节点定位** `.stair-node`：`position: absolute`，`left: ((2k-1)/(2N)) * 100%`，**必须** `transform: translateX(-50%)` 中心锚定。

## 3. HTML 骨架模板 (N=3 示例)

**DOM 层级锚点**：

```
.staircase-block           ← 挂载在 24x24 grid Body 区域
  .stair-visual            ← 上层：折线图形区（高度紧凑）
    .stair-item            ← 单级台阶（flex:1 + 递增高度）
      .stair-box           ← 台阶色块（承载标题，高度递增）
  .stair-matrix            ← 下层：内容网格（Grid N列等分）
    .stair-cell            ← 单列内容（与上方台阶一一对齐）
```

**HTML：**

```html
<div class="staircase-block" style="grid-column: 1/span 24; grid-row: 5/span 19;">

  <!-- 上层：阶梯图形 -->
  <div class="stair-visual">
    <div class="stair-item">
      <div class="stair-box" style="height: 80px;">阶段一</div>
    </div>
    <div class="stair-item">
      <div class="stair-box" style="height: 160px;">阶段二</div>
    </div>
    <div class="stair-item">
      <div class="stair-box" style="height: 240px;">阶段三</div>
    </div>
  </div>

  <!-- 下层：内容矩阵 -->
  <div class="stair-matrix">
    <div class="stair-cell">
      <h3>阶段一标题</h3>
      <ul><li>详细论述</li></ul>
    </div>
    <div class="stair-cell">
      <h3>阶段二标题</h3>
      <ul><li>详细论述</li></ul>
    </div>
    <div class="stair-cell">
      <h3>阶段三标题</h3>
      <ul><li>详细论述</li></ul>
    </div>
  </div>

</div>
```

**CSS：**

```css
.staircase-block {
  display: flex;
  flex-direction: column;
}

/* 上层：阶梯图形 - flex + align-items: flex-end 实现递升 */
.stair-visual {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  margin-bottom: 30px;
}

.stair-item { flex: 1; }

.stair-box {
  background: var(--primary);
  color: white;
  padding: 15px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 3px solid var(--accent);
  /* 高度通过 inline style 递增：N*80px */
}

/* Active/当前阶段高亮 */
.stair-item.active .stair-box {
  background: var(--accent);
}

/* 下层：内容网格 - 严格与上方对齐 */
.stair-matrix {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* N=3 */
  gap: 15px;
}

.stair-cell {
  padding: 0 5px;
}

.stair-cell h3 {
  font-size: 16px;
  color: var(--primary);
  margin: 0 0 10px 0;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 6px;
}

.stair-cell ul {
  padding-left: 16px;
  font-size: 14px;
  color: var(--text-muted, var(--text-light));
  line-height: 1.5;
}
```

## 4. QA 验收条件

* **C-STR-01**: 上层骨架是否高度紧凑，将垂直空间主导权让给了下层内容矩阵？
* **C-STR-02**: 每个阶段的详细论述是否与其头顶的骨架严格垂直对齐？
* **C-STR-03**: 标题内容块是否相对于下方列网格**绝对左右居中**对齐？
* **C-STR-04**: 阶段文字是否完整位于折线上方，节点通过 `transform: translateX(-50%)` 中心锚定？
* **C-STR-05**: 折线首尾相接，横向线段数 = 下方文字块数，宽度一致？
* **C-STR-06**: 所有台阶垂直爬升高度差是否视觉一致？
* **C-STR-07**: 密集文本是否在单元格内平滑换行，未溢出？
* **C-STR-08**: 若下层为贯通表格，每列宽度是否与上方对应台阶宽度严格对齐？
