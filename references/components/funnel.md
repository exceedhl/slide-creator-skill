# FUNNEL (漏斗组件 — 支持纵向/横向递减)

**适用场景**：销售转化漏斗、线索筛选、技术降噪等逐渐收敛的过程。

## 1. 组件结构与视觉规则

多个干净锐利的**方形或胶囊形业务区块**垂直堆叠，区块之间由**向下箭头阵列**连接。越往下层，箭头阵列越窄、箭头数量越少，构成物理收缩感。

**核心约束**：
*   **实体区块保持方形/胶囊形**，不要裁切为梯形。收缩感通过箭头阵列递减实现。为了避免全黑的视觉压抑感，默认应使用 `var(--bg-surface-light)` 浅色底板配深色文字，仅针对最终转化层（如 `.stage-final`）等真正需要强调的节点，使用深蓝 / 主色调实心填充。
*   **图文解耦**：左侧（或居中）是"区块 + 递减箭头带"，右侧（或外侧）专门放对齐的详解文本。两者物理空间隔离。
*   **箭头衰减法则**：顶端关节 5 个箭头 → 下一级 3 个 → 底部 1 个。使用 `display: flex; justify-content: center` 居中排列。
*   右侧释义文本与左侧对应层**纵向严格对齐**。由于箭头关节不等高导致垂直位置非等距，**严禁** `space-around/space-between/space-evenly`。正确做法：用统一 CSS Grid 行系统横跨左右，或手动匹配固定高度。
*   `--arrow-size`: 向下箭头宽高（默认 ~20px）。
*   右侧释义区 (`.text-item`) 是**通用内容插槽**，可承载列表、表格、嵌套卡片或纯文本。
*   **表格对齐铁律**：当右侧采用贯通表格时，表格**每一行高度必须与左侧对应漏斗 stage 高度严格对齐**（通过共享 `grid-template-rows` 或等高约束实现）。此外，为了保证第一列（如表头标题）与后续内容列的水平基线一致，第一列的文字**必须同样包裹在 `<h4>` 标签中**（与后方保持统一结构）。

## 2. HTML 骨架模板 (N=3 示例)

**DOM 层级锚点**：

```
.funnel-container          ← Flex row，横跨左图右文
  .funnel-graphics         ← 左侧：漏斗图形列（固定宽度）
    .stage                 ← 单层：包含 block + joint
      .funnel-block        ← 业务区块（宽度递减体现收缩）
      .funnel-joint        ← 箭头关节（Flex 居中排列向下箭头）
        .arrow-down        ← 单个向下箭头/细线
  .funnel-texts            ← 右侧：释义文本列（Grid 对齐）
    .text-item             ← 与左侧 stage 一一对应
```

**HTML：**

```html
<div class="content-block" style="grid-column: 1/span 24; grid-row: 5/span 19;">
  <div class="funnel-container">

    <!-- 左侧：漏斗图形 -->
    <div class="funnel-graphics">
      <div class="stage">
        <div class="funnel-block" style="width: 100%;">Level 1 标题</div>
        <div class="funnel-joint">
          <div class="arrow-down"></div><div class="arrow-down"></div>
          <div class="arrow-down"></div><div class="arrow-down"></div>
          <div class="arrow-down"></div>
        </div>
      </div>
      <div class="stage">
        <div class="funnel-block" style="width: 75%;">Level 2 标题</div>
        <div class="funnel-joint">
          <div class="arrow-down"></div><div class="arrow-down"></div>
          <div class="arrow-down"></div>
        </div>
      </div>
      <div class="stage stage-final">
        <div class="funnel-block" style="width: 50%;">Level 3 标题</div>
        <!-- 最后一层无 joint -->
      </div>
    </div>

    <!-- 右侧：释义文本 -->
    <div class="funnel-texts">
      <div class="text-item">
        <h4>Level 1 详述</h4>
        <p>数据或描述内容</p>
      </div>
      <div class="text-item">
        <h4>Level 2 详述</h4>
        <p>数据或描述内容</p>
      </div>
      <div class="text-item">
        <h4>Level 3 详述</h4>
        <p>数据或描述内容</p>
      </div>
    </div>

  </div>
</div>
```

**CSS：**

```css
.funnel-container {
  display: flex;
  width: 100%;
  height: 100%;
}

/* 左侧漏斗图形：必须与右侧使用相同的 Grid 行数，确保纵向组件不随随箭头高度而错位 */
.funnel-graphics {
  display: grid;
  grid-template-rows: repeat(3, 1fr); /* N=3，必须与 .funnel-texts 相同 */
  width: 240px;
  flex-shrink: 0;
}

.stage {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
}

.funnel-block {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-surface-light);
  color: var(--primary);
  border: 1px solid var(--border-default);
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  padding: 12px;
  height: 55px;
  flex-shrink: 0;
  /* width 通过 inline style 递减：100% → 75% → 50% */
}

.stage-final .funnel-block, .stage .funnel-block.active {
  background: var(--primary);
  color: white;
  border: none;
}

.funnel-joint {
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 8px 0;
  flex: 1; /* 吸附剩余间距，保证箭头在跨度中居中 */
  align-items: center;
}

.arrow-down {
  width: 2px;
  height: 20px;
  background: var(--border-default);
  position: relative;
}
.arrow-down::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid var(--border-default);
}

/* 右侧释义文本 - 使用 Grid 行对齐 */
.funnel-texts {
  display: grid;
  grid-template-rows: repeat(3, 1fr); /* N=3 */
  flex: 1;
  padding-left: 25px;
  min-width: 0; /* flex box 内部防溢出 */
}

.text-item {
  display: flex;
  flex-direction: column;
  /* 配合左侧漏斗块的 flex-start 锚定，右侧也从头部起排，并以 padding 微调水平视觉 */
  justify-content: flex-start;
  padding-top: 8px;
  overflow: hidden; /* 防止极端文本撑爆行高 */
}
.text-item h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 4px 0;
}
.text-item p {
  font-size: 14px;
  color: var(--text-muted, var(--text-light));
  margin: 0;
  line-height: 1.5;
}
```

## 3. 横向变体适配 (Horizontal Variant)

除了默认的纵向堆叠，漏斗同样支持向右延伸的**横向收缩变体**，用于展现随着时间或步骤横向推进的过程转化。

**DOM 层级与 CSS 替换约束**：
1. `.funnel-container` → 从 `flex-direction: row` 改为 `flex-direction: column`（上半部分放图形，下半部分放文字）。
2. `.funnel-graphics` → 从行系统变为列系统：`display: grid; grid-template-columns: repeat(N, 1fr); height: 180px; width: 100%;`。
3. `.stage` → 改为横向流 `flex-direction: row;`，左右两侧分别为色块与箭头关节。
4. `.funnel-block` → 固定宽度（如 `width: 120px;`），通过内联的 `height` 属性体现收缩：`100% -> 75% -> 50%`。
5. `.funnel-joint` → 改为纵向流 `flex-direction: column;`，使得里面的小箭头上下阵列排布。
6. `.arrow-down` → 替换为 `.arrow-right` 向右侧的箭头（`border-left` 绘制尖角）。
7. `.funnel-texts` → 使用列对齐 `grid-template-columns: repeat(N, 1fr); padding-top: 25px;` 以匹配上方的各漏斗层。
8. **横向贯通表格**：当使用横向变体时，如果底部是表格，它直接呈现为常规表格（即行的每一列天然对应每个 stage）。不需要 `grid-template-rows` 映射，而是使用 `grid-template-columns: repeat(N, 1fr)` 跨越横向列。

## 4. QA 验收条件

* **C-FNL-01**: 图形结构与解释文本是否物理隔离（文本未覆盖在色块上）？
* **C-FNL-02**: 右侧释义文本是否与左侧对应漏斗层在纵向高度上严格对齐？
* **C-FNL-03**: 箭头阵列是否随层级递减而变少？箭头是否向下？
* **C-FNL-04**: 业务区块是否保持干净锐利的方形或胶囊形（未裁切为梯形）？
* **C-FNL-05**: 若右侧为贯通表格，每行高度是否与左侧对应漏斗 stage 高度严格对齐？
