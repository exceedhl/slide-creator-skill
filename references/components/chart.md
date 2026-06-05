# CHART (动态图表)

## 1. When to Use / When Not to Use
**适用场景**：数据趋势分析、结构占比、多维对比等可视化场景。
**图表选择指南 (Chart Choosing Guide)**：
* 趋势 (Trend) → 折线图 (`line`)，或平滑曲线。
* 排名/对比 (Ranking/Comparison) → 柱状图 (`bar`) 或条形图 (`horizontal bar`)。
* 结构占比 (Part-to-whole) → 堆叠柱状图 (`stacked-bar`)，避免使用难以比较面积的饼图，若必须使用则用环形图 (`pie` 且配置 `radius`)。
* 差异/构成演变 (Variance) → 瀑布图 (`waterfall`)。
* 相关性/投资组合 (Correlation/Portfolio) → 散点图/气泡图 (`scatter`/`bubble`)。
* 热力/密集分布 → 热力图 (`heatmap`)。
**不适用场景**：只有 1-2 个数据点（应直接使用极大字号的数字强调），非定量关系的逻辑关系（应使用 PROCESS_FLOW 等）。

## 2. Component Contract (模式契约)
**核心约束**：
* 必须包含 `data-component="chart"` 外层容器。
* 容器必须有明确的物理边界和高度，不得默认 100% 塌缩。
* 所有图表必须基于极简数据可视化抽象规则：**绝不硬编码品牌 HEX 色值**。
* 在同一幻灯片存在多个图表时，必须关闭动画 `animation: false` 提升性能。
* 在初始化配置时，必须在根节点强制显性覆盖 `color` 数组为全局 CSS 变量提取的值。
* 视图防切裁：`grid: { containLabel: true }` 必须开启。

## 3. Creative Freedom (创作空间)
**允许变化的维度**：
* **注释与辅助线 (Chart Annotation)**：支持在 ECharts 内添加 `markLine` (用于 Benchmark/平均值) 和 `markPoint` (用于高亮最大值或异常点)。
* **多图表组合**：允许并列或嵌套多个图表（如左右对比的双图表），通过 `data-slot="chart-container"` 区分。
* **组合图 (Combo Chart)**：允许 `bar` 与 `line` 在同一直角坐标系中混排展示。

**不可变化的维度**：
* 必须剔除坐标轴视觉噪音（隐藏无意义的主轴线和刻度线）。
* 提示框 (Tooltip) 必须处理为无多余边框的黑盒样式。

## 4. Density Modes (信息密度规则)
通过 `data-density` 调节图表辅件的丰富度：
* **low (低密度)**：隐藏 Y 轴和网格线，隐藏图例，直接在图形（如柱子顶部）通过 `label: {show: true}` 显示核心数值。
* **medium (中密度)**：保留极简的横向网格线和底部图例。
* **high (高密度)**：开启复杂图例、多维 Tooltip，甚至在图表下方通过普通的 HTML `<table>` 附加一份高密度的数据底表。

## 5. HTML Exemplars (范例参考)

### Exemplar A: Canonical (标准柱状图)
```html
<div data-component="chart" data-variant="bar" data-density="medium" style="grid-column: 1/span 24; grid-row: 5/span 19; display: flex; flex-direction: column;">
  <h3 style="color: var(--primary); margin-bottom: 20px;">月度营收趋势</h3>
  <div data-slot="chart-container" id="revenue-chart" style="flex: 1; min-height: 300px; width: 100%;"></div>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      // 推荐的 CSS 变量读取 Helper
      const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#333';
      
      const colorAccent = getCssVar('--accent');
      const colorMuted = getCssVar('--text-muted');
      const colorGrid = getCssVar('--border-default');

      const myChart = echarts.init(document.getElementById('revenue-chart'));
      myChart.setOption({
        animation: false,
        color: [colorAccent, '#94A3B8'], // 使用 CSS 变量或主题副色
        tooltip: { trigger: 'axis', backgroundColor: '#1A1A1A', textStyle: { color: '#FFF' }, borderWidth: 0 },
        legend: { bottom: 0, textStyle: { color: colorMuted } },
        grid: { containLabel: true, left: '2%', right: '5%', bottom: '10%' },
        xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3'], axisLine: { show: true, lineStyle: { color: colorGrid } }, axisTick: { show: false } },
        yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: colorGrid } } },
        series: [{ type: 'bar', data: [120, 200, 150], label: { show: true, position: 'top', color: colorAccent } }]
      });
    });
  </script>
</div>
```

## 6. Styling Hooks (样式钩子)
*   **语义属性 (必须)**：`data-component="chart"`, `data-variant="bar|line|pie|waterfall|scatter"`, `data-density="low|medium|high"`。
*   **主题对接**：图表的 `color` 数组和各类 `lineStyle` 必须使用 `getCssVar()` 对接 HTML 的 `var(--primary)`, `var(--accent)`, `var(--border-default)`, `var(--text-muted)`。

## 7. Failure Modes (典型失败模式与反例)
*   ❌ **网格噪音过大**：保留了 ECharts 默认深色竖向和横向网格线，甚至保留了每一个刻度的小竖线，导致图表看起来粗糙杂乱。
*   ❌ **硬编码颜色**：在 `color: ['#FF0000', '#00FF00']` 里写死了 HEX，导致当文档在 Editor 中切换主题时，图表颜色格格不入。
*   ❌ **标签切裁**：忘记配置 `grid: { containLabel: true }`，导致左侧数值极大的 Y 轴或底部名字极长的分类被裁切到画布之外。

## 8. QA Checklist (QA 验收条件)
*   [ ] **C-CHT-01**: 组件是否具有 `data-component="chart"` 属性以及明确的物理高度？
*   [ ] **C-CHT-02**: 图表配色是否全部使用了提取的 CSS 变量，没有任何硬编码的 HEX/RGB？
*   [ ] **C-CHT-03**: X/Y 轴标签和图例文字是否完整显示未被截断（是否开启了 containLabel）？
*   [ ] **C-CHT-04**: Y轴（数值轴）的主轴线和刻度小短线是否已经被隐藏去噪？
*   [ ] **C-CHT-05**: 页面内的多图表是否开启了 `animation: false`？
