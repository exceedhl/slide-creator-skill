import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

/**
 * Configuration Constants
 */
const CONFIG = {
    VIEWPORT: { width: 1920, height: 1080, deviceScaleFactor: 1 },
    DEBUG: false
};

/**
 * Extracts dimensions of all images within a slide.
 * 
 * @param {puppeteer.Page} page 
 * @param {string} slideId 
 * @returns {Promise<Array<{name: string, src: string, width: number, height: number}>>}
 */
async function extractImageDimensions(page, slideId) {
    return page.evaluate((id) => {
        const slide = document.getElementById(id);
        if (!slide) return [];

        const images = Array.from(slide.querySelectorAll('img'));
        return images.map((img, index) => {
            const rect = img.getBoundingClientRect();
            let name = img.alt || img.id || `Image ${index + 1}`;
            let src = img.src ? img.src.split('/').pop() : 'N/A';
            if (src.length > 30) src = src.substring(0, 27) + '...';

            return {
                name: name,
                src: src,
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            };
        });
    }, slideId);
}

/**
 * Checks for scroll overflow on a specific slide.
 * 
 * @param {puppeteer.Page} page 
 * @param {string} slideId 
 * @returns {Promise<string[]>} List of overflowing element identifiers
 */
async function checkOverflow(page, slideId) {
    const overflows = await page.evaluate((id) => {
        const slide = document.getElementById(id);
        if (!slide) return [];

        // Force Reflow
        void slide.offsetHeight;

        const results = [];

        // Check Slide container itself
        if (slide.scrollHeight > slide.clientHeight + 1 || slide.scrollWidth > slide.clientWidth + 1) {
            results.push(`Slide Container (#${id})`);
        }

        // Broaden scan to ALL elements
        const elements = slide.querySelectorAll('*');
        for (const el of elements) {
            const style = window.getComputedStyle(el);
            if (['inline', 'none', 'contents'].includes(style.display)) continue;

            if (el.classList.contains('axis-x') || el.classList.contains('axis-y')) continue;

            // Detect overflow
            if (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) {
                if (style.opacity === '0' || style.visibility === 'hidden') continue;

                let name = (typeof el.className === 'string' && el.className) ? `.${el.className.split(' ').join('.')}` : el.tagName;
                if (el.id) name += `#${el.id}`;

                let snippet = "";
                if (el.innerText && el.innerText.length > 0) {
                    snippet = ` ("${el.innerText.substring(0, 15)}...")`;
                }

                results.push(`${name}${snippet}`);
            }
        }

        return results;
    }, slideId);

    return overflows;
}

/**
 * Measures whitespace ratio at the bottom of containers (informational only, no threshold judgment).
 */
async function checkWhitespace(page, slideId) {
    return page.evaluate((id) => {
        const slide = document.getElementById(id);
        if (!slide) return [];

        const measurements = [];
        const MIN_GAP_PX = 20;    // Only report if gap is visually meaningful

        function inspectElement(el) {
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

            const rect = el.getBoundingClientRect();
            if (rect.height < 50) return;

            if (el.classList.contains('particle-container')) return;
            if (el.classList.contains('agenda-num')) return;

            const paddingBottom = parseFloat(style.paddingBottom) || 0;
            const borderBottom = parseFloat(style.borderBottomWidth) || 0;
            const usefulBottom = rect.bottom - paddingBottom - borderBottom;

            const range = document.createRange();
            try {
                range.selectNodeContents(el);
            } catch (e) {
                return;
            }
            const contentRect = range.getBoundingClientRect();
            if (contentRect.height === 0) return;

            const gap = usefulBottom - contentRect.bottom;
            const ratio = gap / rect.height;

            if (gap > MIN_GAP_PX && el.children.length > 0) {
                let name = el.id || el.tagName;
                if (!el.id && typeof el.className === 'string' && el.className) name = `.${el.className.split(' ').join('.')}`;

                measurements.push({
                    element: name,
                    gap: Math.round(gap),
                    ratio: ratio.toFixed(2),
                    slideId: id
                });
            }
        }

        function traverse(node) {
            inspectElement(node);
            Array.from(node.children).forEach(child => {
                traverse(child);
            });
        }

        traverse(slide);
        return measurements;
    }, slideId);
}

/**
 * Generates and saves the Markdown report.
 */
function generateReport(htmlPath, issues) {
    const reportPath = htmlPath.replace('.html', '_report.md');
    let content = `# Layout Inspection Report
**Target**: \`${path.basename(htmlPath)}\`
**Date**: ${new Date().toLocaleString()}

## Summary

| Slide ID | Status | Issues Found |
| :--- | :--- | :--- |
`;

    issues.forEach(item => {
        const s = item.stats;
        const statusIcon = '📊';

        let issueSummary = [];
        if (s.overflowElements.length > 0) issueSummary.push(`Overflow Data (${s.overflowElements.length})`);
        if (s.overlapPairs.length > 0) issueSummary.push(`Overlap Data (${s.overlapPairs.length})`);
        if (s.whitespace.length > 0) issueSummary.push(`Whitespace Data (${s.whitespace.length})`);
        if (issueSummary.length === 0) issueSummary.push("Clean / Neutral");

        content += `| **${item.slideId}** | ${statusIcon} | ${issueSummary.join(', ')} |\n`;
    });

    content += `\n## Detailed Findings\n`;

    issues.forEach(item => {
        const s = item.stats;
        const hasFindings = s.overflowElements.length > 0 || s.overlapPairs.length > 0 || s.whitespace.length > 0;
        const hasImages = s.imageDimensions && s.imageDimensions.length > 0;

        if (!hasFindings && !hasImages) return;

        content += `\n### ${item.slideId}\n`;

        if (s.overflowElements.length > 0) {
            content += `**ℹ️ Overflow Measurement** (informational):\n`;
            s.overflowElements.forEach(el => content += `- \`${el}\` bounds exceed parent container.\n`);
            content += `\n`;
        }

        if (s.overlapPairs.length > 0) {
            content += `**ℹ️ Overlap Detection** (informational):\n`;
            s.overlapPairs.forEach(pair => content += `- \`${pair.el1}\` intersects with \`${pair.el2}\`\n`);
            content += `\n`;
        }

        if (s.whitespace.length > 0) {
            content += `**ℹ️ Whitespace Measurement** (informational):\n`;
            s.whitespace.forEach(w => content += `- \`${w.element}\`: ${w.gap}px gap (${(w.ratio * 100).toFixed(0)}% of container height)\n`);
            content += `\n`;
        }

        content += `---\n`;

        if (s.imageDimensions && s.imageDimensions.length > 0) {
            content += `**🖼️ Image Dimensions**:\n`;
            content += `| Name | Source | Dimensions (WxH) |\n`;
            content += `| :--- | :--- | :--- |\n`;
            s.imageDimensions.forEach(img => {
                content += `| ${img.name} | \`${img.src}\` | **${img.width}x${img.height}** |\n`;
            });
            content += `\n`;
            content += `---\n`;
        }
    });

    fs.writeFileSync(reportPath, content);
    console.log(`Report saved to: ${reportPath}`);
}

/**
 * Main Inspector Function
 */
async function inspectLayout(htmlPath) {
    const absPath = path.resolve(htmlPath);
    console.log(`Inspecting layout: ${absPath}`);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'warning' || msg.type() === 'error') {
            console.warn(`[Browser] ${msg.text()}`);
        } else if (CONFIG.DEBUG) {
            console.log(`[Browser] ${msg.text()}`);
        }
    });

    await page.setViewport(CONFIG.VIEWPORT);
    await page.goto(`file://${absPath}`, { waitUntil: 'networkidle0' });

    const slideIds = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.slide')).map(el => el.id);
    });

    const issues = [];

    for (const slideId of slideIds) {
        console.log(`Analyzing ${slideId}...`);

        const overflowElements = await checkOverflow(page, slideId);
        const whitespaceIssues = await checkWhitespace(page, slideId);

        if (whitespaceIssues.length > 0) {
            console.warn(`DETECTED_WHITESPACE|${slideId}|${JSON.stringify(whitespaceIssues)}`);
        }

        if (overflowElements.length > 0) {
            console.warn(`DETECTED_OVERFLOW|${slideId}|${overflowElements.length} elements`);
        }

        const imageDimensions = await extractImageDimensions(page, slideId);

        // Recursive Overlap Detection
        const overlapPairs = await page.evaluate((sid) => {
            const slide = document.getElementById(sid);
            if (!slide) return [];

            const detectedOverlaps = [];

            function isOverlapping(rect1, rect2) {
                const buffer = 2; // pixel buffer
                return !(rect1.right - buffer <= rect2.left + buffer ||
                    rect1.left + buffer >= rect2.right - buffer ||
                    rect1.bottom - buffer <= rect2.top + buffer ||
                    rect1.top + buffer >= rect2.bottom - buffer);
            }

            function checkContainerOverlap(container) {
                const children = Array.from(container.children).filter(el => {
                    const style = window.getComputedStyle(el);
                    return style.display !== 'none' &&
                        style.visibility !== 'hidden' &&
                        style.opacity !== '0';
                });

                // 1. Check siblings at THIS level
                for (let i = 0; i < children.length; i++) {
                    const rect1 = children[i].getBoundingClientRect();
                    if (rect1.width <= 2 || rect1.height <= 2) continue;

                    for (let j = i + 1; j < children.length; j++) {
                        const rect2 = children[j].getBoundingClientRect();
                        if (rect2.width <= 2 || rect2.height <= 2) continue;

                        // Exclude intentional visual overlap for process steps with clip-path
                        if (children[i].classList.contains('process-step') && children[j].classList.contains('process-step')) continue;

                        if (isOverlapping(rect1, rect2)) {
                            const getElName = (el) => {
                                let n = (typeof el.className === 'string' && el.className) ? `.${el.className.split(' ').join('.')}` : el.tagName;
                                if (el.innerText) n += ` ("${el.innerText.substring(0, 10)}...")`;
                                return n;
                            };

                            detectedOverlaps.push({
                                el1: getElName(children[i]),
                                el2: getElName(children[j])
                            });
                        }
                    }
                }

                // 2. Recurse into children independently
                for (const child of children) {
                    if (child.children.length > 0) {
                        checkContainerOverlap(child);
                    }
                }
            }

            checkContainerOverlap(slide);
            return detectedOverlaps;
        }, slideId);

        if (overlapPairs.length > 0) {
            console.warn(`DETECTED_OVERLAP|${slideId}|${overlapPairs.length} pairs`);
        }

        issues.push({
            slideId: slideId,
            stats: {
                overflowElements: overflowElements,
                overlapPairs: overlapPairs,
                whitespace: whitespaceIssues,
                imageDimensions: imageDimensions
            }
        });
    }

    await browser.close();

    generateReport(htmlPath, issues);
    console.log(JSON.stringify(issues, null, 2));
}

// CLI Execution
const args = process.argv.slice(2);
const targetFile = args.find(arg => !arg.startsWith('--'));
const debugFlag = args.includes('--debug');

if (targetFile) {
    CONFIG.DEBUG = debugFlag;
    inspectLayout(targetFile);
} else {
    console.error('Usage: node slide-creator/scripts/simple_layout_inspector.js <html-file> [--debug]');
}
