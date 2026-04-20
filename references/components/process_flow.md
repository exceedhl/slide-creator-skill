# PROCESS_FLOW (流程图) 组件参考

**适用场景**：平级阶段推进、业务审批流、线性路线图、强因果逻辑的阶段推演。

## 1. 组件结构与视觉规则

流程图的视觉核心是一组**块状咬合的 Chevron 箭头序列**，通过 `clip-path: polygon()` 裁切实现。每个箭头前端嵌入后方箭头的凹口中，形成几何拼图般的紧密链条。

**核心约束**：
*   Chevron 内部仅承载**阶段编号/标题**（不超过 2 行），长文本必须外置于正下方（横向）或正右侧（纵向）的释义区中。
*   必须存在至少一个 **Active 焦点节点**，通过 Accent 强调色着色，与其余节点形成明显对比。
*   末尾节点**必须保留右侧尖角**，严禁切平为直角，隐喻"进程仍在持续"。
*   每个释义区 (`.detail-box`) 必须与其对应的 Chevron 在主轴方向上**严格对齐**（通过相同的 `flex: 1` 实现）。
*   释义区是**通用内容插槽**，内部不限于纯文本列表。允许的子内容类型包括：
    *   Bullet 列表（`h3 + ul`）— 最常见形态
    *   数据表格（`table`）— 适合多维度参数对比
    *   嵌套内容卡片（带背景色的 `div` 容器）— 适合图文混排或分组信息
    *   纯文本段落 — 适合简要描述
*   **表格列对齐铁律**：当释义区采用贯通整行的表格形态时，表格的**每一列宽度必须与上方对应的 Chevron 宽度严格对齐**。实现方式：将 `.flow-details` 替换为 `<table>` 并对列设置 `width: calc(100% / N)`（N=阶段数），或使用与 `.chevron` 相同的 `flex: 1` + 负边距体系来保证物理锚定。严禁表格列宽与 Chevron 宽度产生视觉错位。


**纵向变体**：箭头方向从左右改为上下咬合，释义文本改为在箭头正右侧。DOM 层级不变，仅 CSS 方向属性切换（见 §3 骨架末尾的适配指引）。

## 2. CSS 变量与关键算法

组件通过以下变量控制几何参数，**禁止硬编码**：
*   `--chevron-notch`: 箭头凹槽深度/尖端伸出长度（默认 20px）
*   `--chevron-gap`: 节点间物理缝隙（默认 2px）

**咬合原理**：`clip-path` 不改变物理包围盒，因此后一个节点必须用负边距挤入前一个节点的界内：
```
.chevron + .chevron { margin-left: calc(var(--chevron-notch) * -1 + var(--chevron-gap)); }
```
释义文本的容器也必须套用同样的负边距规则，确保图文垂直锚定。

完整的 clip-path polygon 公式、:first-child 特殊处理、安全 padding 计算 → 见 §3 CSS 骨架。

## 3. HTML 骨架模板 (Skeleton Template)

### 水平变体 (N=4 示例)

N 不等于 4 时，增减 `.chevron` 和 `.detail-box` 节点即可，`flex: 1` 自动均分。

**DOM 层级锚点**（可改内容和样式参数，不允许改变层级关系）：

```
.content-block             ← 挂载在 24x24 grid 的 Body 沙盒区域
  .flow-header             ← Flex 行容器，承载 Chevron 箭头序列
    .chevron(.active)      ← 单个箭头节点 (clip-path 裁切)
  .flow-details            ← Flex 行容器，承载释义文本（与上方 Chevron 一一对应）
    .detail-box            <- 通用内容插槽（flex:1 等宽），内部可放 ul/table/div/p
```

**HTML：**

```html
<div class="content-block" style="grid-column: 1/span 24; grid-row: 5/span 19;">

  <div class="flow-header">
    <div class="chevron active">1. 阶段一标题</div>
    <div class="chevron">2. 阶段二标题</div>
    <!-- 按需增减 chevron 节点 -->
    <div class="chevron">N. 阶段N标题</div>
  </div>

  <div class="flow-details">
    <!-- 形态A: 列表型 -->
    <div class="detail-box">
      <h3>阶段一详述</h3>
      <ul>
        <li><strong>要点</strong>：简述内容</li>
      </ul>
    </div>
    <!-- 形态B: 表格型 -->
    <div class="detail-box">
      <h3>阶段二详述</h3>
      <table>
        <tr><th>维度</th><th>指标</th></tr>
        <tr><td>维度A</td><td>数据值</td></tr>
      </table>
    </div>
    <!-- 按需增减，与上方 chevron 严格一一对应 -->
    <div class="detail-box">
      <h3>阶段N详述</h3>
      <p>也可以是纯文本段落或嵌套内容卡片</p>
    </div>
  </div>

</div>
```

**CSS：**

```css
.content-block {
  --chevron-notch: 20px;
  --chevron-gap: 2px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

.flow-header {
  display: flex;
  width: 100%;
  height: 70px;
  margin-bottom: 25px;
}

/* 中间/末尾节点：左凹右尖 */
.chevron {
  flex: 1;
  background: var(--bg-surface-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  clip-path: polygon(
    0 0,
    calc(100% - var(--chevron-notch)) 0,
    100% 50%,
    calc(100% - var(--chevron-notch)) 100%,
    0 100%,
    var(--chevron-notch) 50%
  );
  margin-left: calc(var(--chevron-notch) * -1 + var(--chevron-gap));
  padding-left: calc(var(--chevron-notch) + 10px);
  padding-right: 10px;
}

/* 起点节点：左侧平齐无凹口 */
.chevron:first-child {
  clip-path: polygon(
    0 0,
    calc(100% - var(--chevron-notch)) 0,
    100% 50%,
    calc(100% - var(--chevron-notch)) 100%,
    0 100%
  );
  margin-left: 0;
  padding-left: 15px;
}

.chevron.active {
  background: var(--accent);
  color: white;
}

.flow-details { display: flex; width: 100%; }
.detail-box { flex: 1; padding: 0 12px; }
.detail-box h3 {
  color: var(--primary);
  font-size: 18px;
  margin: 0 0 10px 0;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 8px;
}
.detail-box ul {
  padding-left: 18px;
  color: var(--text-muted, var(--text-light));
  font-size: 15px;
  line-height: 1.6;
}
```

### 纵向变体适配

DOM 层级不变，仅 CSS 替换：
1. `.content-block` → `flex-direction: row`（左图右文）
2. `.flow-header` → `flex-direction: column; height: auto; width: 固定值`
3. `.chevron` 的 `clip-path` 改为垂直方向：起点 `polygon(0 0, 100% 0, 100% calc(100% - N) 50% 100%, 0 calc(100% - N))`；中间/尾 top 凹坑 `50% N`
4. `.chevron + .chevron` → `margin-top` 替代 `margin-left`
5. `.flow-details` → `flex-direction: column`

## 4. 适用范围

本组件同时覆盖**线性路线图**（原 STAIRCASE Variant B/C 的职责）。

> **路由铁律**：只有强调"逐级攀升/高度爬坡"时才选 STAIRCASE。线性路线图（"现状→转型→愿景"）和无时间刻度权重的阶段展示应使用 PROCESS_FLOW。

## 5. QA 验收条件

* **C-PRF-01**: 每个 Chevron 节点是否都具有箭头尖角形状（包括最后一个节点）？
* **C-PRF-02**: 相邻 Chevron 之间的间隙是否紧凑（小于等于 4px），形成咬合链条感？
* **C-PRF-03**: 是否存在至少一个 Active 状态节点，且其颜色与其余节点形成明显对比？
* **C-PRF-04**: Chevron 内部是否仅包含简短标题（小于等于 2行），长文案是否已物理外置？
* **C-PRF-05**: 每个释义文本块是否与其对应的 Chevron 节点在主轴方向上严格对齐？
* **C-PRF-06**: 若释义区为贯通表格，每一列宽度是否与上方对应 Chevron 宽度严格对齐（无视觉错位）？
