[English](README.md) | [简体中文](README_zh.md)

# Slide Creator Skill

Slide Creator is a skill used to convert Markdown text directly into neatly formatted, professionally designed presentation web pages. Say goodbye to tedious manual formatting, and let AI handle all structural and cosmetic work for you.

## ✨ Core Capabilities

- **Powerful Built-in Components**: Break away from monotonous plain text. It comes with over a dozen core formatting components frequently used in business reports, such as Matrix, Funnel, Process Flow, and Staircase. AI will automatically apply them based on the context of your outline.
- **Strict Automated Detection (Automated QA)**: Worried about AI-generated text overlapping or overflowing the borders? We have a built-in automated layout inspector. Paired with formatting rules, the AI can achieve self-healing corrections by measuring layout overflows.
- **Custom Styling**: From the classic minimalist "McKinsey Style" to the vibrant "Modern Business Style". All styles can be freely customized, or you can even build a dedicated theme for your brand.

---

## 🎨 Gallery Showcases

> All of the representations below were fully structured and rendered natively to HTML CSS via this Skill natively:

### 1. 2025 AI Development Report (2025_AI_Report)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/2025_AI_Report/slide_01_slide-01.png"><img src="gallery/2025_AI_Report/slide_01_slide-01.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/2025_AI_Report/slide_02_slide-02.png"><img src="gallery/2025_AI_Report/slide_02_slide-02.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/2025_AI_Report/slide_03_slide-03.png"><img src="gallery/2025_AI_Report/slide_03_slide-03.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/2025_AI_Report/slide_04_slide-04.png"><img src="gallery/2025_AI_Report/slide_04_slide-04.png" width="100%" /></a></td>
  </tr>
</table>

<br/>

### 2. EV R&D Consulting Proposal (EV_RD_Consulting)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/EV_RD_Consulting/slide_01_page.png"><img src="gallery/EV_RD_Consulting/slide_01_page.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/EV_RD_Consulting/slide_02_slide-auto--1127084742.png"><img src="gallery/EV_RD_Consulting/slide_02_slide-auto--1127084742.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/EV_RD_Consulting/slide_03_page.png"><img src="gallery/EV_RD_Consulting/slide_03_page.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/EV_RD_Consulting/slide_04_slide-auto--446282495.png"><img src="gallery/EV_RD_Consulting/slide_04_slide-auto--446282495.png" width="100%" /></a></td>
  </tr>
</table>

<br/>

### 3. PostHog Compensation Guide (PostHog_Salary)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/PostHog_Salary/slide_01_slide-01.png"><img src="gallery/PostHog_Salary/slide_01_slide-01.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/PostHog_Salary/slide_02_slide-02.png"><img src="gallery/PostHog_Salary/slide_02_slide-02.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/PostHog_Salary/slide_03_slide-03.png"><img src="gallery/PostHog_Salary/slide_03_slide-03.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/PostHog_Salary/slide_04_slide-04.png"><img src="gallery/PostHog_Salary/slide_04_slide-04.png" width="100%" /></a></td>
  </tr>
</table>

<br/>

### 4. Scrum vs Flow Comparison (ScrumVsFlow)

<table>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/ScrumVsFlow/slide_01_slide-cover.png"><img src="gallery/ScrumVsFlow/slide_01_slide-cover.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/ScrumVsFlow/slide_02_slide-origins.png"><img src="gallery/ScrumVsFlow/slide_02_slide-origins.png" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a target="_blank" href="gallery/ScrumVsFlow/slide_03_slide-economics.png"><img src="gallery/ScrumVsFlow/slide_03_slide-economics.png" width="100%" /></a></td>
    <td width="50%"><a target="_blank" href="gallery/ScrumVsFlow/slide_04_slide-cynefin.png"><img src="gallery/ScrumVsFlow/slide_04_slide-cynefin.png" width="100%" /></a></td>
  </tr>
</table>

<br/>

> *Note: The screenshots above are not full panoramas, but only show the first few representative layouts as samples. Since the skill directly generates standard HTML/CSS, the placeholder images in the showcase can be replaced pixel-by-pixel by the AI after formatting is complete.*

---

## 🛠 Out of the Box & Environment Dependencies

- **Node.js**: Node.js (v18+) needs to be installed locally to execute packaging and detection scripts.
- **NPM Modules**: Requires `jsdom`, `css-tree`, and `puppeteer`.

*(This skill has a built-in `package.json`. Every time the AI assistant runs this skill, it will automatically check for and run `npm install` beforehand, so users can get started with almost no blockers.)*

## 🚀 Installation & Usage

If your interactive AI natively supports directive-based installation:

```bash
npx skills add exceedhl/slide-creator-skill
```

### Method 2: Direct Directory Copy (Direct Copy)

If your AI environment does not support instruction loading (such as regular Cursor, Cline, or other tools containing local Agent workflows):
1. Download or Clone this project.
2. Directly copy and move the extracted `slide-creator-skill` folder to the Agent skills directory in your project space (for example, under `.agents/skills/`).
3. The Agent will automatically detect the presence of `SKILL.md` in the context and autonomously load this set of formatting tool capabilities.

### Prompt Trigger Examples

**Scenario 1: Generate a complete set of slides from scratch**
Throw a long article/research at AI, and add the Prompt:
> "Use your local slide-creator-skill to help me organize this 3000-word go-to-market strategy into a 12-page Business Report PPT. Use the Business style template."

The AI will follow the `SKILL.md` guidelines, calculating grid dimensions and assembling it page by page.

**Scenario 2: Launch script to prevent boundary overflow and correct errors (QA Mode)**
When you visually observe that there is too much text severely squeezed on a certain page:
> "Check and optimize the slides"

## 🤖 Supported Models Compatibility 

This skill currently performs fairly well on **Gemini 3.1**, **GLM 5.1**, and **Claude 3.6**. You can expect overall satisfactory results within 2-3 dialogue turns. **Gemini 3.1 Pro** performs relatively excellently.
