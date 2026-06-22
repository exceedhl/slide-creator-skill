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

### Full-Bleed 出血布局（封面、封底、图文分栏贴边）

**出血触发规则**：仅当以下两条硬规则**至少满足一条**时，才使用出血布局。其他情况一律使用标准模式。

```
R1: 页面类型 = 封面 / 封底 / cover / ending page
R2: 用户显式说了 "大图 / 铺满 / 贴边 / 占满 / 沉浸 / 无边距 / 全屏"
```

**判断示例**：

| 用户说法 | 触发 | 模式 |
|---------|------|------|
| "做一个**封面**页，左边图片右边文字" | R1 | **出血** |
| "**封底**页，Thank You + 图片" | R1 | **出血** |
| "做一页介绍页，左边放一张**大图**" | R2 | **出血** |
| "内容页，左边文字右边**配**张图片" | — | **标准** |
| "分析页，标题 + 左边要点右边图表" | — | **标准** |
| "两栏对比：现状 vs 目标" | — | **标准** |
| "左边窄一些右边宽一些，放图表或图片" | — | **标准** |

> **默认行为**：拿不准就用**标准模式**。标准模式有 padding 和 gap，在组装/Present/Print 全链路下表现最稳定。

当触发出血时，使用 Grid 出血模式。**核心：只需覆盖两个变量，其余保持标准 Grid。**

**CSS 覆盖规则**：
```css
.slide {
    --slide-padding: 0;   /* ← 取消内边距，内容可贴边 */
    --gap: 0;             /* ← 取消列间距，两栏紧贴 */
    /* display: grid 保持不变，grid-template 保持 24x24 不变 */
}
```

**分栏定位规则**：
- 两栏都用 `grid-row: 1 / -1` 占满全高
- 第一栏用 `grid-column: 1 / span N`，N 由 agent 根据内容比例决定
- 第二栏用 `grid-column: (N+1) / -1`，**`/ -1` 自动补满到最后一列**
- 文字栏自身通过 `padding` 控制内边距（而非依赖 slide 的 `--slide-padding`）

**示例：图片左侧 60% + 文字右侧 40%**
```html
<style>
.slide { --slide-padding: 0; --gap: 0; }

.image-panel {
    grid-column: 1 / span 14;    /* 14/24 ≈ 58% — agent 可选 13~16 */
    grid-row: 1 / -1;
    overflow: hidden;
}
.image-panel img { width: 100%; height: 100%; object-fit: cover; }

.text-panel {
    grid-column: 15 / -1;        /* 自动补满剩余列 */
    grid-row: 1 / -1;
    padding: 60px 50px;          /* 文字区自带内边距 */
    display: flex; flex-direction: column; justify-content: center;
}
</style>

<div class="slide">
    <div class="image-panel"><img src="cover.png" alt="Cover"></div>
    <div class="text-panel">
        <h1>标题</h1>
        <p>副文本</p>
    </div>
</div>
```

**示例：全幅暗底封面（图片铺满 + 文字叠加）**
```html
<style>
.slide { --slide-padding: 0; --gap: 0; }

.bg-image {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    z-index: 0;
    overflow: hidden;
}
.bg-image img { width: 100%; height: 100%; object-fit: cover; }

.overlay {
    grid-column: 1 / span 12;
    grid-row: 12 / -1;
    z-index: 1;
    padding: 40px 60px;
    color: #fff;
}
</style>

<div class="slide">
    <div class="bg-image"><img src="bg.png" alt="Background"></div>
    <div class="overlay">
        <h1>标题叠加在图片上</h1>
    </div>
</div>
```

```
❌ 出血布局中禁止:
   - 使用 display: flex 替代 grid（会导致组装、Present、Print 全链路冲突）
   - 使用 width: 60% 等百分比宽度（应由 grid-column span 控制）
   - 使用负 margin (margin-left: calc(var(--slide-padding) * -1)) 突破 padding
   - Full-Bleed 侧内放置主标题（标题必须在有安全内边距的一侧）
   - 栏内嵌套子 grid（如 repeat(12, 1fr)），导致 DOM 臃肿
```

## 当 `allow-asymmetric-columns: false` (默认) 时

严格使用等分排布：12+12, 8+8+8, 6+6+6+6 等。
