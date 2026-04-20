#!/usr/bin/env node
/**
 * build_presentation.js
 * 
 * 将多个分批生成的 HTML 幻灯片片段组装为一个完整的、自包含的 HTML 文件。
 * 
 * 用法:
 *   node scripts/build_presentation.js --in <输入目录> --out <输出文件路径>
 * 
 * 示例:
 *   node scripts/build_presentation.js -i test/ -o test/full_deck.html
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import * as csstree from 'css-tree';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CLI 参数解析 ---
const args = process.argv.slice(2);
let inputDir = null;
let outputPath = null;
let title = null;

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--in' || args[i] === '-i') {
        inputDir = path.resolve(process.cwd(), args[++i]);
    } else if (args[i] === '--out' || args[i] === '-o') {
        const outVal = args[++i];
        if (outVal.endsWith('.html')) {
            outputPath = path.resolve(process.cwd(), outVal);
        } else {
            outputPath = path.resolve(process.cwd(), outVal, 'assembled.html');
        }
    } else if (args[i] === '--title' || args[i] === '-t') {
        title = args[++i];
    }
}

if (!inputDir || !outputPath) {
    console.error('用法: node build_presentation.js --in <输入目录> --out <输出文件>');
    console.error('示例: node scripts/build_presentation.js -i test/ -o test/full_deck.html');
    process.exit(1);
}

// --- 工具函数 ---
const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return hash;
};

// --- 主流程 ---
function buildPresentation() {
    console.log(`🏗️  Assembling slides...`);
    console.log(`   Input:  ${inputDir}`);
    console.log(`   Output: ${outputPath}`);
    if (title) console.log(`   Title:  ${title}`);

    // 确保输出目录存在
    const distDir = path.dirname(outputPath);
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    if (!fs.existsSync(inputDir)) {
        console.error(`❌ Input directory not found: ${inputDir}`);
        process.exit(1);
    }

    // 读取并排序所有 HTML 片段文件
    const htmlFiles = fs.readdirSync(inputDir)
        .filter(f => f.endsWith('.html') && !f.includes('assembled') && !f.includes('complete_deck') && f !== path.basename(outputPath))
        .sort();

    if (htmlFiles.length === 0) {
        console.error('❌ No HTML files found in input directory.');
        process.exit(1);
    }

    const uniqueStyles = new Map();
    const headMeta = new Set();     // 收集 <head> 中的 <link> / <script src> 等外部依赖
    const bodyScripts = new Set();  // 收集内联 scripts，放在 body 尾部
    let allSlidesHTML = '';
    let allCSS = '';
    let slideCount = 0;

    for (const file of htmlFiles) {
        console.log(`  🧩 Processing: ${file}`);
        const content = fs.readFileSync(path.join(inputDir, file), 'utf-8');

        // Parse with JSDOM
        const dom = new JSDOM(content);
        const document = dom.window.document;

        // Try to find a classic slide container
        const slides = Array.from(document.querySelectorAll('.slide'));

        let extractedSlides = [];
        if (slides.length > 0) {
            extractedSlides = slides;
        } else {
            // Fallback: take all children of body that are divs
            extractedSlides = Array.from(document.body.children).filter(el => el.tagName === 'DIV');
        }

        // Clean up editor scripts in the imported slides
        extractedSlides.forEach(slide => {
            const scripts = slide.querySelectorAll('script');
            scripts.forEach(s => s.remove());

            // Re-bind inline styles missing id/class if necessary, but we'll extract as is
            let slideDOM = slide.outerHTML;

            let slideId = slide.id;
            // Provide a fallback ID if missing
            if (!slideId) {
                slideId = `slide-auto-${hashCode(file)}`;
                slideDOM = slideDOM.replace('<div', `<div id="${slideId}"`);
            }

            slideCount++;
            allSlidesHTML += `\n<!-- from: ${file} -->\n${slideDOM}\n`;

            // Extract styles linked to this file
            const styles = Array.from(document.querySelectorAll('style'));

            let nestedCssRules = [];
            const slideUniqueStyles = new Set();

            for (const styleNode of styles) {
                const cssText = styleNode.textContent.trim();
                if (!cssText) continue;

                try {
                    // Parse CSS using css-tree into an AST
                    const ast = csstree.parse(cssText);

                    // We will collect individual rules as strings after modification
                    // to maintain the deduplication logic per slide.

                    // Traverse and modify the AST
                    csstree.walk(ast, {
                        visit: 'Rule',
                        enter(node, item, list) {
                            // If this rule is inside an @keyframes block, we don't scope it to the slide ID
                            if (this.atrule && this.atrule.name === 'keyframes') {
                                return; // Handled separately during serialization if needed, or left global
                            }

                            // If this rule is part of a regular at-rule (like @media), we still scope the selectors

                            // Modify the preludes (selectors) of the rule
                            if (node.prelude.type === 'SelectorList') {
                                node.prelude.children.forEach(selector => {
                                    if (selector.type === 'Selector') {
                                        let isRootOrBody = false;
                                        let isSlideClass = false;
                                        let hasIdPrefix = false;

                                        // Check the first part of the selector to understand its intent
                                        const firstNode = selector.children.first;

                                        if (firstNode) {
                                            if (firstNode.type === 'PseudoClassSelector' && firstNode.name === 'root') {
                                                isRootOrBody = true;
                                            } else if (firstNode.type === 'TypeSelector' && firstNode.name === 'body') {
                                                isRootOrBody = true;
                                            } else if (firstNode.type === 'ClassSelector' && firstNode.name === 'slide') {
                                                isSlideClass = true;
                                            } else if (firstNode.type === 'IdSelector' && firstNode.name === slideId) {
                                                hasIdPrefix = true;
                                            }
                                        }

                                        // Now rewrite the selector AST
                                        if (isRootOrBody) {
                                            // :root -> #slide-01
                                            // body -> #slide-01
                                            selector.children.clear();
                                            selector.children.appendData({ type: 'IdSelector', name: slideId });

                                            // REMOVE LAYOUT PROPERTIES from body styles
                                            // When body is mapped to the inner slide container, padding/margin/display ruins the grid.
                                            if (node.block && node.block.type === 'Block') {
                                                const propertiesToRemove = new Set([
                                                    'display', 'flex-direction', 'align-items', 'justify-content',
                                                    'margin', 'padding', 'gap', 'min-height', 'height', 'width',
                                                    'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
                                                    'padding-top', 'padding-bottom', 'padding-left', 'padding-right'
                                                ]);
                                                node.block.children = node.block.children.filter(decl => {
                                                    if (decl.type === 'Declaration') {
                                                        return !propertiesToRemove.has(decl.property.toLowerCase());
                                                    }
                                                    return true;
                                                });
                                            }
                                        } else if (isSlideClass) {
                                            // .slide -> #slide-01.slide
                                            // Prepend the ID selector
                                            selector.children.prependData({ type: 'IdSelector', name: slideId });
                                        } else if (!hasIdPrefix) {
                                            // anything else -> #slide-01 anything else
                                            selector.children.prependData({ type: 'WhiteSpace', value: ' ' });
                                            selector.children.prependData({ type: 'IdSelector', name: slideId });
                                        }
                                    }
                                });
                            }
                        }
                    });

                    // We want to extract @keyframes to global, and scoped rules to slide-unique
                    csstree.walk(ast, {
                        visit: 'Atrule',
                        enter(node, item, list) {
                            if (node.name === 'keyframes') {
                                const kfText = csstree.generate(node);
                                const nameNode = node.prelude.children.first;
                                const kfName = nameNode ? nameNode.name : 'unknown';

                                if (!uniqueStyles.has(kfName)) {
                                    uniqueStyles.set(kfName, kfText);
                                    allCSS += `\n/* from: ${file} (@keyframes) */\n${kfText}\n`;
                                }
                                // Remove from this AST because it's been hoisted globally
                                list.remove(item);
                            }
                        }
                    });

                    // After modifying, we can serialize the entire AST back to text.
                    // However, original script deduplicated PER RULE. 
                    // Let's generate top-level rules individually for deduping.

                    ast.children.forEach(node => {
                        const ruleCssText = csstree.generate(node);
                        if (!slideUniqueStyles.has(ruleCssText)) {
                            slideUniqueStyles.add(ruleCssText);
                            nestedCssRules.push(ruleCssText);
                        }
                    });

                } catch (e) {
                    console.error(`Error parsing CSS in ${file}:`, e);
                }
            }

            // Append all slide-specific CSS without native nesting wrapper
            if (nestedCssRules.length > 0) {
                allCSS += `\n/* from: ${file} (scoped) */\n${nestedCssRules.join('\n')}\n`;
            }
        });

        // Extract <head> links
        const links = Array.from(document.querySelectorAll('link[href^="http"]'));
        links.forEach(l => headMeta.add(l.outerHTML));

        // Extract all external API scripts (CDN)
        const extScripts = Array.from(document.querySelectorAll('script[src^="http"]'));
        extScripts.forEach(s => headMeta.add(s.outerHTML));

        // Extract inline scripts (e.g., chart initializers)
        const inlineScripts = Array.from(document.querySelectorAll('script:not([src])'));
        inlineScripts.forEach(s => {
            if(s.textContent.trim().length > 0) {
                bodyScripts.add(s.outerHTML);
            }
        });
    }

    // Determine baseline theme. If it was missing, we must inject a fallback.
    const baselineCSS = `
    :root {
      --border-default: #E2E8F0;
    }
    .slide {
      width: 1280px;
      height: 720px;
      margin: 0;
      --slide-padding: 50px 60px;
      --gap: 15px;
      --font-base: 18px;
      padding: var(--slide-padding);
      display: grid;
      grid-template-columns: repeat(24, 1fr);
      grid-template-rows: repeat(24, 1fr);
      gap: var(--gap);
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      /* removed background-color: #ffffff; to allow individual slides to define their own backgrounds */
    }`;

    // 4) 组装最终 HTML
    const allMeta = Array.from(headMeta).join('\n    ');
    const allBodyScripts = Array.from(bodyScripts).join('\n');

    let presentationTitle = title;
    if (!presentationTitle) {
        const dirName = path.basename(inputDir);
        const match = dirName.match(/^\d{8}_\d{6}_(.+)$/);
        if (match) {
            presentationTitle = match[1].replace(/_/g, ' ');
        } else {
            presentationTitle = dirName.replace(/_/g, ' ') || 'Assembled Presentation';
        }
    }

    const finalHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${presentationTitle}</title>
    ${allMeta}
    <style>
        body {
            background-color: #f0f0f0; /* Default background outside slides */
            padding: 40px 0;           /* Top/bottom padding for the whole page */
            display: flex;
            flex-direction: column;
            align-items: center;       /* Center slides horizontally */
            gap: 40px;                 /* Gap between slides */
            margin: 0;
        }
        .slide {
            box-shadow: 0 10px 30px rgba(0,0,0,0.1); /* Optional: add a shadow to make slides pop */
            margin: 0 !important;      /* Override individual slide margins */
        }
/* Global Boilerplate Injected */
${baselineCSS}

/* Slide Specific CSS */
${allCSS}
    </style>
</head>
<body>
${allSlidesHTML}
${allBodyScripts}
</body>
</html>`;

    fs.writeFileSync(outputPath, finalHTML);
    console.log(`\n✅ Done! ${slideCount} slides assembled → ${outputPath}`);
}

buildPresentation();
