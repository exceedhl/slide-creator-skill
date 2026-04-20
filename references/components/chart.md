# CHART (动态图表) 组件参考 (ECharts)

**适用场景**：数据可视化展示，包括趋势分析、结构占比、多维对比等需要动态图表呈现的场景。

## 1. 组件结构与形状描述 (Structure & Shape)

图表组件是一个由外层容器承载的 ECharts 实例。它的视觉形态完全在 ECharts `option` 内定义，但外围的"画布"必须是一个有明确物理边界的矩形区域。该矩形区域内部自上而下由三个逻辑带组成：**顶部图例带 (Legend Band)**、**中央绘图区 (Plot Area)**、**底部坐标轴标签带 (Axis Label Band)**。

### 支持的图表类型

| `chartType` 参数 | ECharts `series.type` 类型 | 备注 / Notes |
|-------------|----------------------|-------|
| bar | `bar` | 默认为垂直柱状图 |
| line | `line` | 启用 `smooth: true` 以获得平滑曲线 |
| pie | `pie` | 环形图变体: 配置 `radius: ['40%', '70%']` |
| stacked-bar | `bar` | 对于每个数据系列，添加 `stack: 'total'` 堆叠标识 |
| radar | `radar` | 需要提供 `radar` 的多维指示器配置 |

## 2. 技术抽象规范 (Technical Abstract Specifications)

在此动态图表组件的生成过程中，必须**避免死记硬背旧版的 ECharts Options 配置**。所有图表的生成必须基于极简数据可视化的抽象规则进行推导和挂载。**组件自身不应硬编码任何特定的品牌色值或物理字号**，所有的样式属性均应通过读取外部注入的 CSS 变量来实现（例如主题引擎或全局风格指南提供的变量）。

### 2.1 容器配置规约 (Container Setup)
创建一个容器并明确指定大小。图表容器的高度应该由所在的网格单元格大小决定，而不是简单地强制设为 100%。

### 2.2 初始化时序要求 (Initialization)
必须在所有图表容器渲染完毕后再执行初始化脚本（通过 `DOMContentLoaded` 事件）。ECharts CDN 脚本引用必须位于初始化代码之前。

### 2.3 响应式与优化考量 (Responsive Considerations)
- 对于较小的格位 (`h ≤ 6`)，应将字号减小 2px；如果空间极为局促，则考虑隐藏图例 (`legend`)。
- 当同一幻灯片中存在多个独立图表时，请**务必设置 `animation: false`**（关闭动画）以确保加载性能和稳定性。

### 2.4 核心调色盘注入 (Color Palette Injection)
在任何 `echarts.init()` 对应的 `setOption` 方法内，必须在根节点强制显性覆盖 `color` 数组，以接管 ECharts 原生的多色配置。
*   调色盘颜色必须通过全局 CSS 变量（例如主题色、主文字色等）动态读取构建，严禁在代码中直接写死 HEX 或 RGB 色值。
*   强调色应仅用于需要凸显的特定数据系列或高亮状态。

### 2.5 极简网格坐标轴算法 (Minimalist Axis Grid)
所有具备直角坐标系 (x/y Axis) 的图表，必须按如下算法减少视觉噪音：
*   **X 轴 (类目轴)**：保留底部基准线 (`axisLine: { show: true }`)。但必须砍掉所有突出的刻度小竖线 (`axisTick: { show: false }`)。文字颜色应绑定为弱化的文本变量。
*   **Y 轴 (数值轴)**：彻底隐藏纵向的主轴线 (`axisLine: { show: false }`) 以及刻度小横线 (`axisTick: { show: false }`)。
*   **背景导引线 (Split Lines)**：Y轴的水平切割网格线必须极度弱化，严禁使用强烈的深色或虚线，应采用极淡的背景变量色。

### 2.6 图例与提示框黑盒化 (Tooltip & Legend)
*   **图例 (Legend)**：默认挂载于右上角 (`right: 10, top: 0`) 或底部居中。严禁在图例上包裹任何明显的边框、背景色或阴影。
*   **提示黑盒 (Tooltip Blackbox)**：开启 `tooltip: { trigger: "axis" }` 或 `item`。其弹出层的背景色必须覆写为与页面底色高对比度的主题暗色，且内部文字应反白显示，且取消多余的描边线框。

### 2.7 视图防切裁保险 (Viewport Anti-Clipping)
为了防止复杂刻度标签溢出画布被切掉，必须在 `setOption` 的根节点注入防护机制：
*   核心开关：`grid: { containLabel: true }` 此参数必须开启。
*   安全边距垫片：在此基础上，辅以 `left: "5%", right: "5%", bottom: "10%"` 左右的内边距，确保图表呼吸感。

## 3. QA 验收条件

* **C-CHT-01**: 图表容器是否有明确的物理高度限制（未溢出或塌缩）？
* **C-CHT-02**: X/Y 轴标签和图例文字是否完整显示（未被截断）？
* **C-CHT-03**: 多图表页面是否已关闭动画 (`animation: false`)，加载无明显卡顿？
* **C-CHT-04**: 调色盘是否通过 CSS 变量注入（未硬编码 HEX 色值）？
