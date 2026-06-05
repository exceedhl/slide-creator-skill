# Visual Style: Business & Corporate Classic (商务与经典企业风)

这是基于专业化、商业报告的视觉风格。确保在正式的商业演示中传达权威、极简与专业的数据呈现。通过 `mckinsey` 变体可切换至深石板灰与橙色点缀的经典咨询配置；通过 `minimal_boardroom` 变体可切换至纯粹的黑白极简风。

## 1. 视觉哲学
* **商务与专业 (Professional & Trustworthy)**：以深沉的商务蓝（Deep Blue）传递稳定感与权威性。
* **绝对直角的严肃美学 (Sharp & Formal)**：全场零圆角，塑造顶级商业咨询特有的严谨与硬朗体系。
* **克制的面状分割 (Restrained Surfaces)**：去边框化。纯粹依靠克制的浅色背景区块确立物理隔断，既保证内容成团，又减少视觉压迫。
* **排版满刻度与防窒息 (Density vs. Breathing)**：通过系统性放大字号体系以消除空旷感，但将大规模正文颜色调浅为深灰色（减轻窒息感），仅保留重点文本为纯黑色以拉满对比度。

## 2. 全局视觉基建 (Global Primitives)
* **严禁圆角**：包括图表元素、对比色块、背景徽章框，绝对禁止包含任何 `border-radius`。
* **严禁描边封装**：卡片和组块层禁止使用描边，模块分割纯靠色相变化（填充 `--bg-surface-light`）与白边距。
* **色彩纪律 (Anti-Rainbow)**：严禁给平级模块分配不同彩色，仅在最核心结论施加唯一的 `--accent` 高亮。
* **表格横流线框**：仅允许横向贯穿分割线，严禁纵向分割线。横线必须视觉上完美连贯，不可被列间距切断。表头需覆以 `--table-header` 底板并以粗实线截断。
* **图标**：统一使用 Lucide Icons 线性图标，默认 24px，行内 20px，最大 32px。语义匹配内容，禁止随意装点。严禁引入其他外部图标库。
* **编号徽章**：深色直角小方块内嵌数字（`01`, `02`...），`--primary` 或 `--accent` 底色 + 白色文字。
* **超大数字水印**：在并列步骤或阶梯逻辑背后，利用伪类铺垫极其浅淡、巨大的数字水印，必须完全脱离文本流。
* **封面页**：整版铺满 `--primary` 深色，白色大号标题居中偏上。禁止装饰性图片和多段式彩色渐变。

## 3. Machine-Readable Tokens (机器读取变量)

```json
{
  "theme": "business",
  "design-variance": 3,

  "layout": {
    "archetype": "grid",
    "allow-asymmetric-columns": false,
    "allow-z-overlap": false,
    "allow-rotation": false,
    "zero-gap-enforcement": "strict"
  },

  "palette": {
    "primary": "#051C2C",
    "accent": "#005EB8",
    "accent-light": "#009CE4",
    "chart-red": "#C93B3B",
    "bg-base": "#FFFFFF",
    "bg-surface-light": "#F8FAFC",
    "table-header": "#F1F5F9",
    "text-main": "#333333",
    "text-light": "#666666",
    "grid-line": "#E2E8F0"
  },

  "typography": {
    "font-family": "\"Helvetica Neue\", Arial, sans-serif",
    "h1": { "size": "54px", "weight": 800, "color": "var(--primary)" },
    "h2": { "size": "38px", "weight": 800, "color": "var(--primary)" },
    "h3": { "size": "26px", "weight": 700, "color": "var(--primary)" },
    "body": { "size": "16px", "weight": 400, "color": "var(--text-light)", "line-height": 1.5 },
    "max-contrast-ratio": 3.4
  },

  "density-budgets": {
    "low":    { "gap": "24px", "max-whitespace-ratio": 0.35 },
    "medium": { "gap": "20px", "max-whitespace-ratio": 0.25 },
    "high":   { "gap": "16px", "max-whitespace-ratio": 0.15 }
  },

  "surface": {
    "type": "flat",
    "card-radius": "0px",
    "card-border": "none",
    "card-shadow": "none",
    "inner-highlight": "none",
    "background-effect": "none",
    "shadow-tint-to-bg": false
  },

  "forbidden-patterns": [
    "border-radius",
    "box-shadow",
    "multicolor-icons",
    "vertical-table-borders"
  ],
  "chart-rules": {
    "sequence": ["#1E3A8A", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"],
    "gridlines": "dashed var(--grid-line)",
    "axis-color": "var(--text-main)"
  },
  "image-treatment": {
    "inherit-surface-radius": true,
    "filter": "none",
    "framing": "padded",
    "caption-style": "12px var(--text-light)"
  },
  "diagram-rules": {
    "stroke-width": "2px",
    "arrow-style": "rounded",
    "node-fill": "solid"
  },
  "component-overrides": {
    "funnel": { "default-variant": "sharp-blocks" },
    "matrix": { "hide-axis-lines": false },
    "flywheel": {
      "default-variant": "circular",
      "default-text-position": "radial-outside",
      "icon-size": "64px",
      "icon-border": "1.5px solid var(--primary)",
      "icon-bg": "var(--bg-surface-light)",
      "icon-svg-size": "28px",
      "icon-svg-stroke-width": "1.5px",
      "arc-stroke": "#E2E8F0",
      "arc-stroke-width": "2",
      "arrow-fill": "#94A3B8",
      "core-has-border": false,
      "node-num-style": "inline-badge"
    }
  },
  "variants": {
    "mckinsey": {
      "palette": {
        "primary": "#0F172A",
        "primary-light": "#1E40AF",
        "accent": "#EA580C"
      }
    },
    "minimal_boardroom": {
      "palette": {
        "primary": "#000000",
        "accent": "#000000"
      }
    }
  }
}
```
