import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const VIEWPORT = { width: 1280, height: 720, deviceScaleFactor: 1 };
const SLIDE_W = 1280;
const SLIDE_H = 720;

function slideLabel(index) {
    return String(index + 1).padStart(2, '0');
}

async function measureSlide(page, index) {
    return page.evaluate((slideIndex, expectedW, expectedH) => {
        const slide = document.querySelectorAll('.slide')[slideIndex];
        if (!slide) return null;

        const skipTags = new Set(['svg', 'path', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'rect', 'g', 'defs', 'use', 'marker', 'text']);
        const nameOf = (el) => {
            const cls = typeof el.className === 'string' && el.className
                ? `.${el.className.trim().split(/\s+/).join('.')}`
                : el.tagName.toLowerCase();
            const text = (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 24);
            return text ? `${cls} ("${text}")` : cls;
        };

        const slideRect = slide.getBoundingClientRect();
        const frame = {
            width: Math.round(slideRect.width),
            height: Math.round(slideRect.height),
            offSize: Math.abs(slideRect.width - expectedW) > 1 || Math.abs(slideRect.height - expectedH) > 1
        };

        const truncations = [];
        const overflows = [];
        const tinyTexts = [];
        const elements = slide.querySelectorAll('*');
        for (const el of elements) {
            if (skipTags.has(el.tagName.toLowerCase())) continue;
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;

            // Check font size for elements containing direct non-empty text nodes
            const fontSize = parseFloat(style.fontSize) || 0;
            if (fontSize > 0 && fontSize < 12) {
                const hasDirectText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);
                if (hasDirectText) tinyTexts.push(`${nameOf(el)} (${fontSize}px)`);
            }

            const clipsY = style.overflowY === 'hidden' || style.overflowY === 'clip';
            const clipsX = style.overflowX === 'hidden' || style.overflowX === 'clip';
            if ((clipsY && el.scrollHeight > el.clientHeight + 1) || (clipsX && el.scrollWidth > el.clientWidth + 1)) {
                truncations.push(nameOf(el));
            }

            const rect = el.getBoundingClientRect();
            if (rect.width < 1 && rect.height < 1) continue;
            const outside = rect.left < slideRect.left - 1
                || rect.top < slideRect.top - 1
                || rect.right > slideRect.right + 1
                || rect.bottom > slideRect.bottom + 1;
            if (outside) overflows.push(nameOf(el));
        }

        const brokenImages = Array.from(slide.querySelectorAll('img')).filter((img) => {
            return img.complete && img.naturalWidth === 0;
        }).map((img, i) => img.alt || img.getAttribute('src') || `image ${i + 1}`);

        return { frame, truncations, overflows, tinyTexts, brokenImages };
    }, index, SLIDE_W, SLIDE_H);
}

function generateReport(htmlPath, results) {
    const reportPath = htmlPath.replace(/\.html$/i, '_report.md');
    let content = `# Layout Inspection Report
**Target**: \`${path.basename(htmlPath)}\`
**Viewport**: ${SLIDE_W}×${SLIDE_H}
**Date**: ${new Date().toLocaleString()}

## Summary

| Slide | Screenshot | Status | Findings |
| :--- | :--- | :--- | :--- |
`;

    for (const item of results) {
        const findings = [];
        if (item.frame.offSize) findings.push(`Frame ${item.frame.width}×${item.frame.height}`);
        if (item.truncations.length) findings.push(`Truncation (${item.truncations.length})`);
        if (item.overflows.length) findings.push(`Canvas overflow (${item.overflows.length})`);
        if (item.tinyTexts && item.tinyTexts.length) findings.push(`Font <12px (${item.tinyTexts.length})`);
        if (item.brokenImages.length) findings.push(`Broken image (${item.brokenImages.length})`);
        const status = findings.length ? 'FAIL' : 'PASS';
        content += `| **${item.id}** | \`${item.screenshot}\` | ${status} | ${findings.join(', ') || '—'} |\n`;
    }

    content += `\n## Details\n`;
    for (const item of results) {
        const quiet = !item.frame.offSize && !item.truncations.length && !item.overflows.length && (!item.tinyTexts || !item.tinyTexts.length) && !item.brokenImages.length;
        if (quiet) continue;
        content += `\n### ${item.id}\n`;
        if (item.frame.offSize) {
            content += `- Slide box is **${item.frame.width}×${item.frame.height}**, expected ${SLIDE_W}×${SLIDE_H}.\n`;
        }
        for (const el of item.truncations) content += `- Truncated: \`${el}\`\n`;
        for (const el of item.overflows) content += `- Outside canvas: \`${el}\`\n`;
        if (item.tinyTexts) {
            for (const el of item.tinyTexts) content += `- Font size <12px: \`${el}\`\n`;
        }
        for (const img of item.brokenImages) content += `- Image failed: \`${img}\`\n`;
    }

    fs.writeFileSync(reportPath, content);
    console.log(`Report saved to: ${reportPath}`);
    return reportPath;
}

async function inspectLayout(htmlPath) {
    const absPath = path.resolve(htmlPath);
    const outDir = path.dirname(absPath);
    console.log(`Inspecting layout: ${absPath}`);

    const launchOptions = { headless: 'new' };
    const systemChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    if (fs.existsSync(systemChrome)) {
        launchOptions.executablePath = systemChrome;
    }

    const browser = await puppeteer.launch(launchOptions);
    try {
        const page = await browser.newPage();
        await page.setViewport(VIEWPORT);
        await page.goto(`file://${absPath}`, { waitUntil: 'networkidle0' });

        const count = await page.evaluate(() => document.querySelectorAll('.slide').length);
        if (count === 0) {
            console.error('No .slide elements found.');
            process.exitCode = 1;
            return;
        }

        const handles = await page.$$('.slide');
        const results = [];

        for (let i = 0; i < count; i++) {
            const id = `slide-${slideLabel(i)}`;
            const fileName = `qa_slide_${slideLabel(i)}.png`;
            const shotPath = path.join(outDir, fileName);
            await handles[i].screenshot({ path: shotPath });
            console.log(`Screenshot: ${shotPath}`);

            const measured = await measureSlide(page, i);
            results.push({
                id,
                screenshot: fileName,
                frame: measured.frame,
                truncations: measured.truncations,
                overflows: measured.overflows,
                brokenImages: measured.brokenImages
            });

            const fail = measured.frame.offSize || measured.truncations.length || measured.overflows.length || measured.brokenImages.length;
            console.log(`${id}: ${fail ? 'FAIL' : 'PASS'}`);
        }

        generateReport(absPath, results);
        console.log(JSON.stringify(results, null, 2));
    } finally {
        await browser.close();
    }
}

const targetFile = process.argv.slice(2).find((arg) => !arg.startsWith('--'));
if (!targetFile) {
    console.error('Usage: node scripts/simple_layout_inspector.js <html-file>');
    process.exit(1);
}

inspectLayout(targetFile).catch((err) => {
    console.error(err);
    process.exit(1);
});
