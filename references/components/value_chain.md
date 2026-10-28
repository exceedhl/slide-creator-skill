# VALUE_CHAIN

## 1. 适用场景 / 路由防呆
主活动在下、支持活动在上、右侧是利润或最终价值。平级步骤用 PROCESS_FLOW。闭环用 FLYWHEEL。

## 2. 混合结构约定
上方支持活动横跨全宽，下方主活动等分排列，右侧利润块用 SVG 多边形做出指向右的尖角。活动名称全部是 HTML。支持活动不要写成和主活动一样高的第二排步骤。

## 3. 核心失败模式
- 没有利润端，看起来像普通流程图。
- 支持活动和主活动没有上下关系。
- 尖角用 `clip-path` 把文字切掉。

## 4. 推荐结构
```html
<div class="value-chain">
  <div class="vc-support"><b>研发</b><b>采购</b><b>人力</b></div>
  <div class="vc-primary"><b>入站</b><b>生产</b><b>出站</b><b>营销</b><b>服务</b></div>
  <div class="vc-margin">
    <svg viewBox="0 0 80 280" stroke="currentColor" fill="currentColor" aria-hidden="true"><polygon points="0,0 64,140 0,280" /></svg>
    <span>利润</span>
  </div>
</div>
```
