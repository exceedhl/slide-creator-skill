# PROCESS_FLOW

## 1. 适用场景 / 路由防呆
平级阶段、审批、因果路线。有真实日期改 TIMELINE。强调一级比一级高改 STAIRCASE。数量逐级变少改 FUNNEL。无序并列用列表，不要画箭头。

## 2. 混合结构约定
步骤横向或纵向排成一行。箭头用 SVG `<line>` 或 `<path marker-end>`，阶名和说明是 HTML，并和对应步骤对齐。标出一个当前步骤。泳道只在角色不同且必须同时看见时使用。

## 3. 核心失败模式
- 箭头指向和阅读顺序相反。
- 说明文字掉到步骤下方之外，对不齐。
- 用 SVG `<text>` 写三行说明，第二行被裁掉。

## 4. 推荐结构
```html
<div class="flow">
  <div class="flow-step is-current"><strong>01 发现</strong><p>一句结论</p></div>
  <svg class="flow-arrow" viewBox="0 0 48 24" stroke="currentColor" stroke-width="2" fill="none" aria-hidden="true"><path d="M0 12h36M28 4l12 8-12 8" /></svg>
  <div class="flow-step"><strong>02 验证</strong><p>一句结论</p></div>
</div>
```
