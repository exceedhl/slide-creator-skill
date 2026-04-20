# SPLIT_LAYOUT (左右分栏)

**适用场景**：左右对比 (Pros vs Cons)、图文混排 (文字 + 图表/图片)、数据与叙述并列。

## 1. 组件结构与视觉规则

左右分栏是一个**宏观容器组件**，将页面 Body 区域水平切分为两个并列栏位。每个栏位内部可承载任意原子组件（TEXT_BODY、TEXT_LIST、DATA_TABLE、CHART 等）。

**核心约束**：
*   **栅格直切**：分栏直接利用 24 列栅格通过 `grid-column` 精确控制，**严禁嵌套 Grid/Flexbox 二次分割**。
*   两栏必须共享相同的 `grid-row` 范围，上下边界严格对齐。
*   栏间保留 1-2 列间隙作为呼吸空间（如左栏 `span 11` + 间隙 2 列 + 右栏 `span 11`）。
*   **Full-Bleed (全通栏)**：当一侧为全出血时（常用于大图片、纯色块等视觉锚点），该区块必须突破外层 `padding` 的限制，**上下左右完全延伸至物理边缘**。全通栏区域内**严禁放置主标题**；另一侧则必须保留标准的安全内边距来承载内容。
*   中间分隔线（可选）：两栏间隙中可加 1px 垂直线，颜色取 `--border-default`。
*   VS 图腾（可选）：对比场景中可在两栏间放置反白圆形 "VS" 标识。

### 变体

| 变体 | 列分配 | 场景 |
| :--- | :--- | :--- |
| 等分 (Equal) | 11 + 2(gap) + 11 | 对比分析、优劣势 |
| 不对称 (Asymmetric) | 8~10 + 2 + 12~14 | 侧栏索引 + 主内容、图+文 |

## 2. HTML 骨架模板

**DOM 层级锚点**：

```
.left-col              ← 直接挂载在 24x24 grid 上（grid-column: 1/span 11）
.right-col             ← 直接挂载在 24x24 grid 上（grid-column: 13/span 12）
  内部可放任意子组件     ← h2/h3/ul/table/p/chart-container 等
```

**HTML：**

```html
<!-- 等分变体：11 + 2(间隙) + 11 -->
<div class="left-col" style="grid-column: 1/span 11; grid-row: 5/span 19;">
  <h2>左栏标题</h2>
  <ul>
    <li>要点内容</li>
  </ul>
</div>

<div class="right-col" style="grid-column: 13/span 11; grid-row: 5/span 19;">
  <h2>右栏标题</h2>
  <ul>
    <li>要点内容</li>
  </ul>
</div>
```

**CSS：**

```css
.left-col, .right-col {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

/* Full-Bleed 左栏变体：上下左全贴边 + 背景色 */
.left-col.full-bleed {
  background: var(--bg-surface);
  margin-left: calc(var(--slide-padding) * -1);
  margin-top: calc(var(--slide-padding) * -1);
  margin-bottom: calc(var(--slide-padding) * -1);
  padding-left: calc(var(--slide-padding) + 20px);
  padding-top: calc(var(--slide-padding) + 20px);
  padding-bottom: calc(var(--slide-padding) + 20px);
  border-right: 1px solid var(--border-default);
}
```

## 3. QA 验收条件

* **C-SPL-01**: 两栏是否共享相同的 `grid-row` 范围，上下边界严格对齐？
* **C-SPL-02**: 两栏的 `grid-column` 总跨度是否等于 24（含间隙列）？
* **C-SPL-03**: Full-Bleed 侧是否真正做到了上下及侧边全物理贴边？且该侧内部是否确保没有放置主标题？
* **C-SPL-04**: 两栏内容是否物理隔离，无 DOM 元素跨栏侵入？
* **C-SPL-05**: 栏间间距是否适当，未出现两栏紧贴或间距过大？
