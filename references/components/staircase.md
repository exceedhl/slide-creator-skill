# STAIRCASE

## 1. 适用场景 / 路由防呆
能力、成熟度或阶段高度逐级上升。平级路线用 PROCESS_FLOW。有年份用 TIMELINE。数量变少用 FUNNEL。

## 2. 混合结构约定
台阶用 SVG 折线或从左下到右上递增的 `<rect>`。每一级的名称和一句说明是 HTML，放在该级上方或右侧，不压住台阶线。高度差要能看出来。

## 3. 核心失败模式
- 所有台阶一样高，只是横排卡片。
- 说明文字盖住上一级台阶。
- 最高一级超出画布顶边。

## 4. 推荐结构
```html
<div class="stairs">
  <svg viewBox="0 0 800 360" stroke="currentColor" stroke-width="2" fill="none" aria-hidden="true">
    <path d="M40 320 H240 V230 H440 V140 H640 V50 H760" />
  </svg>
  <ol>
    <li><strong>可重复</strong><span>一句</span></li>
    <li><strong>可度量</strong><span>一句</span></li>
    <li><strong>可优化</strong><span>一句</span></li>
  </ol>
</div>
```
