# SYSTEM_DIAGRAM

## 1. 适用场景 / 路由防呆
系统分层、模块依赖、上下游。步骤推演用 PROCESS_FLOW。数据对比用 CHART。

## 2. 混合结构约定
层或柱用 HTML 卡片。依赖和数据流用 SVG 直线或折线箭头，放在卡片之间的缝里。模块名必须是 HTML。层与层对齐，连线不要穿过文字。

## 3. 核心失败模式
- 所有模块平铺，看不出谁依赖谁。
- 箭头穿过卡片标题。
- 用 SVG `<text>` 写模块说明，无法换行。

## 4. 推荐结构
```html
<div class="system">
  <div class="system-layer"><span>体验</span><b>Web</b><b>App</b></div>
  <svg class="system-links" viewBox="0 0 800 36" stroke="currentColor" stroke-width="2" fill="none" aria-hidden="true"><path d="M200 0 V36 M600 0 V36" /></svg>
  <div class="system-layer"><span>服务</span><b>API</b><b>Worker</b></div>
</div>
```
