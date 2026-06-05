# FLYWHEEL (增长飞轮 / 业务闭环)

## 1. When to Use / When Not to Use
**适用场景**：增长飞轮、生态正向循环、敏捷迭代循环、包含相互促进关系的业务闭环。
**不适用场景**：没有闭环特性的线性流程（应使用 PROCESS_FLOW）。

## 2. Component Contract (模式契约)

### 核心约束
* 必须包含 `data-component="flywheel"` 的外层容器。
* 必须表达出**循环往复**的视觉连接关系（通过 SVG 圆弧箭头）。
* 每个节点由 **Icon 圈**和**文字容器**两个独立子元素组成，二者物理分离。
* SVG 连线弧的半径**必须等于节点圆周半径**，确保弧线精确穿过每个图标圆心。
* 必须使用 HTML DOM 承载节点内容，连线使用 SVG `<path>` + `<marker>` 箭头。

### 语义属性
| 属性 | 值 | 说明 |
|---|---|---|
| `data-component` | `"flywheel"` | 组件标识（必须） |
| `data-variant` | `"circular"` \| `"square"` | 视觉形态：圆形或方形闭环 |
| `data-text-position` | `"radial-outside"` \| `"below"` | 文字放置策略 |
| `data-density` | `"low"` \| `"medium"` \| `"high"` | 信息密度 |

### 节点内部结构（必须遵守）
每个节点 `data-slot="node"` 包含三个独立子元素：

```
┌─ data-slot="node" ─────────────────┐
│  ┌ data-slot="node-num" ┐          │  ← 编号（01, 02...）
│  └──────────────────────┘          │
│  ┌ data-slot="node-icon" ────────┐ │  ← 圆形图标容器（承载 SVG icon）
│  │        ○ SVG icon ○           │ │
│  └───────────────────────────────┘ │
│  ┌ data-slot="node-text" ────────┐ │  ← 文字容器（title + desc）
│  │  data-slot="node-title"       │ │
│  │  data-slot="node-desc"        │ │
│  └───────────────────────────────┘ │
└────────────────────────────────────┘
```

**关键**：`node-num`、`node-icon`、`node-text` 三者通过 CSS `position: absolute` 独立定位，互不嵌套。这使得文字位置可以根据 `data-text-position` 自由调整而不影响图标和连线的对齐。

## 3. Text Position Variants (文字位置变种)

### `radial-outside` — 径向外推
文字沿圆的径向方向推到飞轮圈外侧。每个节点的文字方向取决于节点在圆周上的位置：

| 节点位置 | 文字方向 | `text-align` |
|---|---|---|
| 顶部（12 点钟） | 图标上方 | `center` |
| 右侧（1–5 点钟） | 图标右侧 | `left` |
| 底部（6 点钟） | 图标下方 | `center` |
| 左侧（7–11 点钟） | 图标左侧 | `right` |

**优点**：文字绝不会与飞轮弧线重叠，无需调整断点角度。  
**限制**：需要较大的画布空间，不适合高密度场景。

### `below` — 统一下方
所有节点的文字统一悬挂在图标正下方，编号浮于图标正上方。

**优点**：视觉节奏统一，类似参考图（附图）的经典呈现方式。  
**限制**：底部和侧面节点的文字可能与弧线重叠，必须使用**非对称断点避让**。

## 4. SVG 连线机制

### 基础结构
```html
<svg class="fw-ring" viewBox="0 0 {容器宽} {容器高}">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10"
            refX="6" refY="5" markerWidth="5" markerHeight="5"
            orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="..." />
    </marker>
  </defs>
  <g stroke="..." stroke-width="..." fill="none"
     transform="translate({cx}, {cy})">
    <!-- N 段圆弧 -->
    <path d="M {x1} {y1} A {R} {R} 0 0 1 {x2} {y2}"
          marker-end="url(#arrow)" />
  </g>
</svg>
```

### 对齐规则
* **弧线半径 R 必须等于节点圆周定位半径**（例如节点在 R=220px 的圆周上，弧线也用 `A 220 220`）。
* SVG `transform: translate(cx, cy)` 中心必须与飞轮容器中心对齐。
* 每段弧线的起点和终点用三角函数计算：`x = R·sin(θ)`, `y = -R·cos(θ)`（SVG 坐标系 Y 轴向下）。

### 断点避让规则

**`radial-outside` 模式**：弧线在相邻节点之间均匀断开，每段弧覆盖约 `360/N - gap` 度。推荐 gap = 24°（节点图标的视觉遮挡角）。使用 `rotate()` 复制即可。

```html
<!-- 5 节点, gap=24°, 每段弧 = 72-24 = 48°, 起始偏移 12° -->
<path d="M {sin(12°)·R} {-cos(12°)·R} A R R 0 0 1 {sin(60°)·R} {-cos(60°)·R}" />
<path ... transform="rotate(72)" />
<path ... transform="rotate(144)" />
...
```

**`below` 模式**：文字在图标下方，底部弧线需要更大的 gap 来避让。每段弧线需要**独立计算起止角度**而非简单 rotate：

```
规则：弧线终点角 = 下一节点角度 - (icon半径对应角 + 文字高度对应角)
     弧线起点角 = 当前节点角度 + icon半径对应角
```

## 5. Node Coordinate Lookup Table (节点坐标查找表)

基于标准容器 `560×560px`，圆心 `(50%, 50%)`，半径 `R = 220px`（即 39.3% of 560）。

### 3 节点（等分 120°，起始 -90°）
| 节点 | 角度 | left | top |
|---|---|---|---|
| 1 | -90° (12点) | 50.00% | 10.71% |
| 2 | 30° (4点) | 84.01% | 69.64% |
| 3 | 150° (8点) | 15.99% | 69.64% |

### 4 节点（等分 90°，起始 -90°）
| 节点 | 角度 | left | top |
|---|---|---|---|
| 1 | -90° (12点) | 50.00% | 10.71% |
| 2 | 0° (3点)  | 89.29% | 50.00% |
| 3 | 90° (6点) | 50.00% | 89.29% |
| 4 | 180° (9点)| 10.71% | 50.00% |

### 5 节点（等分 72°，起始 -90°）
| 节点 | 角度 | left | top |
|---|---|---|---|
| 1 | -90° (12点) | 50.00% | 10.71% |
| 2 | -18° (2点) | 87.35% | 37.85% |
| 3 | 54° (5点)  | 73.08% | 81.78% |
| 4 | 126° (7点) | 26.91% | 81.78% |
| 5 | 198° (10点)| 12.64% | 37.85% |

### 6 节点（等分 60°，起始 -90°）
| 节点 | 角度 | left | top |
|---|---|---|---|
| 1 | -90° (12点) | 50.00% | 10.71% |
| 2 | -30° (2点) | 83.93% | 30.36% |
| 3 | 30° (4点)  | 83.93% | 69.64% |
| 4 | 90° (6点)  | 50.00% | 89.29% |
| 5 | 150° (8点) | 16.07% | 69.64% |
| 6 | 210° (10点)| 16.07% | 30.36% |

> **公式**：`left = 50 + (R/容器宽)·sin(θ)·100`, `top = 50 - (R/容器高)·cos(θ)·100`

## 6. Creative Freedom (创作空间)

**允许变化的维度**：
* **视觉形态**：Circular（圆形）或 Square/Grid Loop（方形闭环，通过 Grid 定位）。
* **节点数量**：3–6 个节点。超过 6 个不推荐圆形变体。
* **中心内核**：中心通常有 `data-slot="core"` 表示被飞轮驱动的最终目标。Core 的内部结构（有无分隔线、副标题等）由风格层决定。
* **Icon 内容**：节点图标使用 stroke-only 的 SVG 线性图标（Feather / Lucide 风格），具体视觉样式由风格层控制。

**不可变化的维度**：
* 视觉上必须呈现出循环的动势（通过弧线箭头）。
* 不能出现死胡同（必须首尾相连形成闭环）。
* 弧线必须穿过图标圆心（半径一致性）。
* 文字不得与弧线重叠。

## 7. Density Modes (信息密度规则)
* **low (低密度)**：只展示 3–4 个标题词与中心词，无描述文字，无图标。
* **medium (中密度)**：每个节点带有 Icon + 标题 + 一句描述，节点间有弧线箭头。推荐 `data-text-position="radial-outside"`。
* **high (高密度)**：不推荐圆形飞轮做高密度。若必须，建议使用方形闭环变体或将飞轮置于 Split Layout 的一侧。

## 8. HTML Exemplar (结构骨架)

> ⚠️ 以下骨架**不含任何风格 class**。字体、颜色、边框等由风格层提供。

```html
<div data-component="flywheel" data-variant="circular"
     data-text-position="radial-outside" data-density="medium">

  <!-- 连线层 (SVG) -->
  <svg class="fw-ring" viewBox="0 0 560 560">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10"
              refX="6" refY="5" markerWidth="5" markerHeight="5"
              orient="auto-start-reverse">
        <path d="M 0 1 L 8 5 L 0 9 z" />
      </marker>
    </defs>
    <g transform="translate(280, 280)">
      <!-- 弧线 ×N, 坐标查表 §5, 断点规则查 §4 -->
      <path d="M {x1} {y1} A 220 220 0 0 1 {x2} {y2}"
            marker-end="url(#arrow)" />
    </g>
  </svg>

  <!-- 中心核心 -->
  <div data-slot="core">
    <div data-slot="core-title">核心价值</div>
    <div data-slot="core-text">副标题描述</div>
  </div>

  <!-- 节点 ×N -->
  <div data-slot="node" class="node-1">
    <div data-slot="node-num">01</div>
    <div data-slot="node-icon">
      <svg viewBox="0 0 24 24"><!-- stroke icon --></svg>
    </div>
    <div data-slot="node-text">
      <div data-slot="node-title">节点标题</div>
      <div data-slot="node-desc">一句话描述</div>
    </div>
  </div>

  <!-- 更多节点... -->
</div>
```

## 9. Failure Modes (典型失败模式与反例)
* ❌ **弧线半径 ≠ 节点半径**：弧线画在圆心和图标之间或外侧，导致弧线不穿过图标中心。
* ❌ **文字与弧线重叠**：`below` 模式下没有做非对称断点避让，底部/侧面的文字被弧线穿过。
* ❌ **方向感缺失**：没有箭头 marker 或箭头颜色过浅看不见。
* ❌ **文字被强行压缩**：在圆周节点内放入过多文字导致溢出。长文案应使用 Split Layout。
* ❌ **icon 和 text 嵌套在同一个容器中**：导致切换 `data-text-position` 时无法独立调整文字位置。

## 10. QA Checklist (QA 验收条件)
* [ ] **C-FLW-01**: 是否包含 `data-component="flywheel"` 以及 `data-slot="node|core"`？
* [ ] **C-FLW-02**: 节点分布是否具备明确的循环闭环特征？
* [ ] **C-FLW-03**: SVG 弧线半径是否等于节点圆周定位半径？（弧线穿过图标中心）
* [ ] **C-FLW-04**: 是否有 `<marker>` 箭头指示旋转方向？
* [ ] **C-FLW-05**: 文字是否完全处于弧线外侧，无重叠？
* [ ] **C-FLW-06**: 节点的 `node-icon` 和 `node-text` 是否为独立子元素？
* [ ] **C-FLW-07**: 节点坐标是否使用了 §5 坐标查找表中的值？
