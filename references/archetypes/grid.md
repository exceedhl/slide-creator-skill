# Archetype: grid

标准的 24 列网格排布。组件按 `grid-column` 精确定位。

## 当 `allow-asymmetric-columns: true` 时

**鼓励使用非等分组件分配**，创造视觉层次和杂志感：

```
✅ 鼓励的不对称分配:
   - 内容 14-16col | 图片/留白 8-10col (约 60/40，杂志式分栏)
   - 图片 8-10col | 内容 14-16col (反向分栏)
   - 主内容 14col + 留白 2col + 侧栏 8col
   - 宽卡片 10col + 窄卡片 6col + 窄卡片 8col
   - 全宽标题 24col → 下方 15col 文字块 + 9col 图片
     
❌ 不对称模式中禁止:
   - 全部使用等分: 12+12, 8+8+8
   - 内容居中铺满 24col（除标题行外）
```

> **提示**：具体的分栏列数和是否限制为 2 栏，由各风格的 §1 视觉哲学决定。
> 例如 Editorial Luxury 的"编辑式分栏"约定 60/40 二栏；Swiss Editorial 可能使用三栏不对称。

### 不对称分栏最佳实践

当页面内容语义为"左右对比 / 图文混排 / 并列叙述"时，使用 `data-slot="left-col"` 和 `data-slot="right-col"` 标注两侧区域。

**约束规则**：
* 两栏必须共享相同的 `grid-row` 范围，确保上下边界严格对齐
* 两栏的 `grid-column` 总跨度加上间距必须恰好等于 24
* 禁止在栏内部再次使用复杂的 grid 或 flex 嵌套出完整的版式子系统
* 两栏之间保留至少 1-2 列的 gap 间隙作为呼吸空间

**Full-Bleed 变体**（允许一侧突破 padding 贴边）：
```html
<!-- Full-Bleed 侧：用负边距突破 slide padding，常用于大图片或纯色块 -->
<div data-slot="left-col" class="full-bleed" style="
  grid-column: 1/span 10; grid-row: 5/span 19;
  margin-left: calc(var(--slide-padding) * -1);
  margin-top: calc(var(--slide-padding) * -1);
  margin-bottom: calc(var(--slide-padding) * -1);
  background-size: cover;">
</div>

<div data-slot="right-col" style="
  grid-column: 13/span 12; grid-row: 5/span 19;">
  <h1>右侧主内容区标题</h1>
</div>
```

```
❌ 分栏中禁止:
   - Full-Bleed 侧内放置主标题（标题必须在有安全内边距的一侧）
   - 栏内嵌套子 grid（如 repeat(12, 1fr)），导致 DOM 臃肿
   - 左右分栏变成上下分栏（上下分流应依赖 grid-row 分配）
```

## 当 `allow-asymmetric-columns: false` (默认) 时

严格使用等分排布：12+12, 8+8+8, 6+6+6+6 等。
