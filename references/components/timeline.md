# TIMELINE (时间轴)

**适用场景**：**严格限于有真实日期/年份权重**的历史沿革、年份里程碑、30-60-90 天路径规划。
**不适用**：无时间刻度权重的阶段展示 → 用 PROCESS_FLOW。

> **路由铁律**：必须有真实日期/年份权重时用 TIMELINE；无时间刻度的"阶段1→阶段2→阶段3" → 用 PROCESS_FLOW。

## 1. 组件结构与视觉规则

水平或垂直的**轴线**贯穿整个组件，轴线上标注时间节点**圆点**，圆点两侧（或上下）排列**日期标签**和**内容卡片**。

**核心约束**：
*   所有圆点必须**精确居中于轴线上**（圆心与线物理重合），长文本折行不得压缩或偏移圆点。
*   必须存在至少一个 **Active 状态节点**（强调色），与其余节点形成差异。
*   日期/标签与圆点、圆点与内容区之间必须有**对称的呼吸间距**。
*   **水平变体**：轴线水平贯穿，上方放日期标签，下方放内容卡片（或交错上下）。
*   **垂直变体**：轴线垂直贯穿，左侧放日期，右侧放内容。轴线用 `position: absolute` 锚定于死区中心。
*   内容卡片 (`.content-card`) 是**通用内容插槽**，可承载列表、表格、嵌套卡片或纯文本。
*   **表格对齐铁律**：当内容区采用贯通整行的表格时，表格**每一列宽度必须与上方对应时间节点列宽严格对齐**（通过共享 `grid-template-columns: repeat(N, 1fr)` 实现）。

## 2. HTML 骨架模板

### 水平变体 (N=3 示例)

**DOM 层级锚点**：

```
.timeline-area             ← 挂载在 24x24 grid Body 区域
  .timeline-axis           ← 水平轴线（absolute 定位）
  .time-label              ← 日期标签（Grid 上方行）
  .dot-container > .dot    ← 圆点（Grid 中间行，居中于轴线）
  .content-card            ← 内容卡片（Grid 下方行）
```

**HTML：**

```html
<div class="timeline-area" style="grid-column: 1/span 24; grid-row: 5/span 18;">
  <!-- 水平轴线 -->
  <div class="timeline-axis"></div>

  <!-- 日期标签行 -->
  <div class="time-label"><span class="date">第 1-30 天</span><span class="phase">阶段名</span></div>
  <div class="time-label"><span class="date">第 31-60 天</span><span class="phase">阶段名</span></div>
  <div class="time-label"><span class="date">第 61-90 天</span><span class="phase">阶段名</span></div>

  <!-- 圆点行 -->
  <div class="dot-container"><div class="dot active"></div></div>
  <div class="dot-container"><div class="dot"></div></div>
  <div class="dot-container"><div class="dot"></div></div>

  <!-- 内容卡片行 -->
  <div class="content-card">
    <h4>阶段目标</h4>
    <p>详细内容</p>
  </div>
  <div class="content-card">
    <h4>阶段目标</h4>
    <p>详细内容</p>
  </div>
  <div class="content-card">
    <h4>阶段目标</h4>
    <p>详细内容</p>
  </div>
</div>
```

**CSS：**

```css
.timeline-area {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* N=3 */
  grid-template-rows: 60px 20px 1fr;     /* 日期 | 圆点 | 内容 */
  position: relative;
}

/* 水平轴线：absolute 锚定在圆点行中央 */
.timeline-axis {
  position: absolute;
  height: 3px;
  background: var(--border-default);
  top: 68px;        /* row1(60px) + row2半(10px) - 线高一半 */
  left: 15%;
  right: 15%;
  z-index: 1;
}

/* 日期标签 */
.time-label {
  grid-row: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 12px;
}
.time-label .date {
  font-size: 22px;
  font-weight: 700;
  color: var(--primary);
}
.time-label .phase {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 4px;
}

/* 圆点 */
.dot-container {
  grid-row: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.dot {
  width: 14px;
  height: 14px;
  background: white;
  border: 3px solid var(--primary);
  border-radius: 50%;
}
.dot.active {
  border-color: var(--accent);
  background: var(--accent);
}

/* 内容卡片 */
.content-card {
  grid-row: 3;
  padding: 20px;
  margin: 10px 10px 0;
  border: 1px solid var(--border-default);
  background: var(--bg-surface);
  border-top: 2px solid var(--primary);
}
.content-card h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 8px 0;
}
.content-card p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}
```

### 垂直变体适配

DOM 层级不变，CSS 替换：
1. `.timeline-area` → `grid-template-columns: auto 20px 1fr; grid-template-rows: repeat(N, 1fr);`
2. `.timeline-axis` → 改为垂直线：`width: 3px; height: auto; top/bottom: 15%; left: (列1宽 + 列2宽/2)`
3. `.time-label` → `grid-column: 1`（左列），`.dot-container` → `grid-column: 2`，`.content-card` → `grid-column: 3`

## 3. QA 验收条件

* **C-TML-01**: 所有时间节点圆点是否精确居中于轴线上（圆心与轴线物理重合）？
* **C-TML-02**: 圆点在长文本折行撑高容器时是否仍保持固定尺寸（未被压缩或偏移）？
* **C-TML-03**: 日期/标签与圆点之间、圆点与内容区之间是否都存在对称的呼吸间距？
* **C-TML-04**: 是否存在至少一个 Active 状态节点，且在视觉上与其余节点形成明显差异？
* **C-TML-05**: 若内容区为贯通表格，每列宽度是否与上方对应时间节点列宽严格对齐？
