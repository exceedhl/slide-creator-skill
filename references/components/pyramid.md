# PYRAMID

## 1. 适用场景 / 路由防呆
上层被下层支撑，或范围一层比一层更宽。平级清单用列表。没有包含关系的递进用 PROCESS_FLOW 或 STAIRCASE。

## 2. 混合结构约定
左侧一块 SVG，用 `<polygon>` 叠出三角形或梯形切片，层与层留出细缝。右侧 HTML 列表按同样顺序排说明，行高与切片对齐。不要用 `clip-path` 算梯形百分比。

## 3. 核心失败模式
- 切片宽度不递增，金字塔看起来是一叠矩形。
- 说明顺序和图形从上到下不一致。
- 文字写在切片里面，窄层放不下。

## 4. 推荐结构
```html
<div class="pyramid">
  <svg viewBox="0 0 400 360" aria-hidden="true">
    <polygon points="200,12 248,110 152,110" />
    <polygon points="140,126 260,126 308,230 92,230" />
    <polygon points="80,246 320,246 380,352 20,352" />
  </svg>
  <ol>
    <li><strong>原则</strong><span>一句</span></li>
    <li><strong>方法</strong><span>一句</span></li>
    <li><strong>动作</strong><span>一句</span></li>
  </ol>
</div>
```
