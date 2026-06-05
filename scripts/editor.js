/**
 * Visual Editor for Generated Slides (Tweakpane Edition)
 * Version: 3.7 (Overlay-Fix)
 */

class EditorManager {
    static instance = null;

    constructor() {
        if (EditorManager.instance) return EditorManager.instance;
        EditorManager.instance = this;

        // Default to ACTIVE
        this.isActive = true;

        this.selectedElement = null;
        this.pane = null;

        // Dynamic Binding State
        this.childBindings = [];
        this.childParams = {};
        this.contentFolder = null;
        this.classFolder = null;
        this.inlineFolder = null;

        // Configuration
        this.uiContainerId = 'visual-editor-ui-root';
        this.ignoredTags = ['HTML', 'HEAD', 'SCRIPT', 'STYLE', 'LINK', 'META', 'TITLE', 'BODY'];
        this.voidTags = ['AREA', 'BASE', 'BR', 'COL', 'EMBED', 'HR', 'IMG', 'INPUT', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR'];
        this.allowedTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'LI', 'STRONG', 'EM', 'B', 'I', 'TD', 'TH', 'BUTTON', 'LABEL', 'DIV', 'SECTION', 'HEADER', 'FOOTER', 'UL', 'OL'];

        // Params Separation
        this.paramsInfo = { tag: '', classes: '' }; // Info only
        this.localParams = {}; // Inline Styles
        this.classParams = {}; // Class Styles

        // State for Class Overrides
        this.tagOverrides = {};
        this.classOverrides = {};
        this.cssVars = {}; // { '--primary': '#aabbcc' }
        this.currentClass = null;
        this.currentTag = null;

        // SYNC GUARD: Prevents applyStyle loops during selection
        this.isSyncing = false;

        // Default Style Keys (for initialization)
        this.styleKeys = {
            width: '', height: '',
            fontSize: 16, color: '#000000', textAlign: 'left', fontWeight: 'normal', lineHeight: 1.5,
            backgroundColor: 'transparent', opacity: 1, borderRadius: 0, border: 'none',
            padding: '0px', margin: '0px', gap: '0px',
        };
        // Initialize params with defaults
        this.tagParams = {};
        Object.assign(this.localParams, this.styleKeys);
        Object.assign(this.classParams, this.styleKeys);
        Object.assign(this.tagParams, this.styleKeys);
    }

    static async init() {
        const manager = new EditorManager();
        await manager.loadDependencies();
        manager.setupUI();
        manager.setupEvents();
        manager.updateModeState();
        console.log('Editor Manager v3.7 Initialized');
        return manager;
    }

    async loadDependencies() {
        if (this.Tweakpane) return;
        try {
            const Tp = await import('https://cdn.jsdelivr.net/npm/tweakpane@4.0.3/dist/tweakpane.min.js');
            this.Tweakpane = Tp;
        } catch (e) {
            console.error("Failed to load Tweakpane", e);
            throw new Error('Could not load Tweakpane library');
        }
    }

    setupUI() {
        // 1. Core UI Container (Shadow DOM etc.)
        this.container = document.createElement('div');
        this.container.id = this.uiContainerId;
        Object.assign(this.container.style, {
            position: 'fixed', zIndex: '99999', top: '0', left: '0', pointerEvents: 'none'
        });
        document.body.appendChild(this.container);

        this.shadow = this.container.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
            .toggle-btn {
                position: fixed; bottom: 20px; right: 20px;
                background: white; color: #0F172A; border: 1px solid #E2E8F0;
                padding: 12px 24px; border-radius: 8px;
                cursor: pointer; pointer-events: auto;
                font-family: system-ui, sans-serif; font-weight: 600;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transition: transform 0.2s;
                z-index: 100001;
            }
            .toggle-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.12); }
            .toggle-btn.active { background: #EA580C; color: white; border-color: #EA580C; }

            .highlighter {
                position: fixed; border: 2px solid #EA580C;
                background: rgba(234, 88, 12, 0.05);
                display: none; transition: all 0.1s;
                pointer-events: none;
            }
            .selection-box {
                position: fixed; border: 2px solid #3B82F6;
                display: none; pointer-events: none;
            }
             .toast {
                position: fixed; bottom: 80px; right: 20px;
                background: white; color: #0F172A; border: 1px solid #E2E8F0;
                padding: 12px 24px; border-radius: 8px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                font-family: system-ui, sans-serif; font-size: 14px;
                opacity: 0; transform: translateY(20px);
                transition: all 0.3s;
                pointer-events: none;
            }
            .toast.visible { opacity: 1; transform: translateY(0); }
        `;
        this.shadow.appendChild(style);

        this.toggleBtn = document.createElement('button');
        this.toggleBtn.className = 'toggle-btn';
        this.toggleBtn.onclick = () => this.toggleMode();
        this.shadow.appendChild(this.toggleBtn);

        this.highlighter = document.createElement('div');
        this.highlighter.className = 'highlighter';
        this.shadow.appendChild(this.highlighter);
        this.selectionBox = document.createElement('div');
        this.selectionBox.className = 'selection-box';
        this.shadow.appendChild(this.selectionBox);
        this.toast = document.createElement('div');
        this.toast.className = 'toast';
        this.shadow.appendChild(this.toast);

        // 2. Tweakpane Setup
        this.setupTweakpane();
    }

    setupTweakpane() {
        this.paneContainer = document.createElement('div');
        this.paneContainer.style.position = 'fixed';
        this.paneContainer.style.top = '0';
        this.paneContainer.style.right = '0';
        this.paneContainer.style.bottom = '0';
        this.paneContainer.style.width = '320px';
        this.paneContainer.style.zIndex = '100000';
        this.paneContainer.style.backgroundColor = '#f9fafb';
        this.paneContainer.style.borderLeft = '1px solid #e5e7eb';
        this.paneContainer.style.boxSizing = 'border-box';
        this.paneContainer.style.overflowY = 'auto';
        this.paneContainer.style.display = 'none'; // Hidden by default

        // CSS Injection (v5)
        const styleId = 'tweakpane-custom-style-v5';
        const oldStyle = document.getElementById(styleId);
        if (oldStyle) oldStyle.remove();

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            :root {
                --tp-base-background-color: #f9fafb;
                --tp-base-shadow-color: transparent;
                --tp-button-background-color: #e5e7eb;
                --tp-button-background-color-hover: #d1d5db;
                --tp-button-foreground-color: #111827;
                --tp-container-background-color: #f3f4f6;
                --tp-container-foreground-color: #111827;
                --tp-input-background-color: #ffffff;
                --tp-input-foreground-color: #111827;
                --tp-label-foreground-color: #4b5563;
                --tp-folder-background-color: #f9fafb;
                --tp-folder-title-background-color: #f3f4f6;
                --tp-folder-title-foreground-color: #374151;
            }
            .tp-dfwv { width: 100% !important; border-radius: 0 !important; font-family: system-ui, -apple-system, sans-serif; font-size: 13px; }
            .tp-lblv_l { width: 110px !important; }
            textarea.tp-txtv_i { min-height: 60px !important; height: auto !important; padding: 6px !important; line-height: 1.4 !important; resize: vertical !important; }
        `;
        document.head.appendChild(style);

        if (!document.getElementById('editor-user-css')) {
            const userStyle = document.createElement('style');
            userStyle.id = 'editor-user-css';
            document.head.appendChild(userStyle);
        }

        document.body.appendChild(this.paneContainer);

        this.pane = new this.Tweakpane.Pane({ container: this.paneContainer, title: 'Design Inspector' });

        // Element Info
        this.pane.addBinding(this.paramsInfo, 'tag', { disabled: true, label: 'Element' });
        this.pane.addBinding(this.paramsInfo, 'classes', { disabled: true, label: 'Classes', multiline: true, rows: 2 });

        // Content
        this.contentFolder = this.pane.addFolder({ title: 'Content', expanded: true });

        // SEPARATOR
        this.pane.addBlade({ view: 'separator' });

        // --- TILED STYLE LAYOUT ---

        // 0. Theme Variables (Global)
        this.setupThemeControls();

        // 1. Tag Styles (Broad)
        this.tagFolder = this.pane.addFolder({ title: 'Global Styles (Tag)', expanded: true });
        this.addStyleControls(this.tagFolder, this.tagParams, 'tag');

        // 2. Class Styles (Specific)
        this.classFolder = this.pane.addFolder({ title: 'Global Styles (Class)', expanded: true });
        this.addStyleControls(this.classFolder, this.classParams, 'class');

        // 2. Inline Styles (Bottom)
        this.inlineFolder = this.pane.addFolder({ title: 'Local Overrides (Inline)', expanded: false });
        this.addStyleControls(this.inlineFolder, this.localParams, 'inline');


        this.pane.addBlade({ view: 'separator' });
        this.pane.addButton({ title: 'Save File (Ctrl+S)' }).on('click', () => this.saveFile());
    }

    setupThemeControls() {
        const themeFolder = this.pane.addFolder({ title: 'Theme Variables', expanded: false });

        // Scan for vars
        const vars = {};
        Array.from(document.styleSheets).forEach(sheet => {
            try {
                Array.from(sheet.cssRules).forEach(rule => {
                    // Expanded scan to include body and .slide class
                    if ([':root', 'body', '.slide'].includes(rule.selectorText)) {
                        Array.from(rule.style).forEach(prop => {
                            if (prop.startsWith('--')) {
                                vars[prop] = rule.style.getPropertyValue(prop).trim();
                            }
                        });
                    }
                });
            } catch (e) { }
        });

        this.cssVars = vars;
        for (const [key, val] of Object.entries(this.cssVars)) {
            // Heuristic: if it looks like a color, bind as color
            const isColor = val.startsWith('#') || val.startsWith('rgb') || val.startsWith('hsl');
            themeFolder.addBinding(this.cssVars, key, { label: key })
                .on('change', (ev) => this.applyStyle(key, ev.value, 'var'));
        }
    }

    addStyleControls(container, paramsTarget, mode) {
        // Dimensions
        const dimFolder = container.addFolder({ title: 'Dimensions', expanded: true });
        dimFolder.addBinding(paramsTarget, 'width', { label: 'Width' }).on('change', (ev) => this.applyStyle('width', ev.value, mode));
        dimFolder.addBinding(paramsTarget, 'height', { label: 'Height' }).on('change', (ev) => this.applyStyle('height', ev.value, mode));

        // Typography
        const typeFolder = container.addFolder({ title: 'Typography', expanded: true });
        typeFolder.addBinding(paramsTarget, 'fontSize', { min: 8, max: 128, step: 1, label: 'Size' }).on('change', (ev) => this.applyStyle('fontSize', ev.value + 'px', mode));
        typeFolder.addBinding(paramsTarget, 'fontWeight', { options: { Normal: 'normal', Medium: '500', Bold: '700', Black: '900' }, label: 'Weight' }).on('change', (ev) => this.applyStyle('fontWeight', ev.value, mode));
        typeFolder.addBinding(paramsTarget, 'lineHeight', { min: 0.8, max: 3, step: 0.1, label: 'Height' }).on('change', (ev) => this.applyStyle('lineHeight', ev.value, mode));
        typeFolder.addBinding(paramsTarget, 'textAlign', { options: { Left: 'left', Center: 'center', Right: 'right' }, label: 'Align' }).on('change', (ev) => this.applyStyle('textAlign', ev.value, mode));
        typeFolder.addBinding(paramsTarget, 'color', { label: 'Color' }).on('change', (ev) => this.applyStyle('color', ev.value, mode));

        // Appearance
        const appearFolder = container.addFolder({ title: 'Appearance', expanded: true });
        appearFolder.addBinding(paramsTarget, 'backgroundColor', { label: 'Fill' }).on('change', (ev) => this.applyStyle('backgroundColor', ev.value, mode));
        appearFolder.addBinding(paramsTarget, 'border', { label: 'Border' }).on('change', (ev) => this.applyStyle('border', ev.value, mode));
        appearFolder.addBinding(paramsTarget, 'opacity', { min: 0, max: 1, step: 0.05, label: 'Opacity' }).on('change', (ev) => this.applyStyle('opacity', ev.value, mode));
        appearFolder.addBinding(paramsTarget, 'borderRadius', { min: 0, max: 100, step: 1, label: 'Radius' }).on('change', (ev) => this.applyStyle('borderRadius', ev.value + 'px', mode));

        // Spacing
        const spaceFolder = container.addFolder({ title: 'Spacing', expanded: true });
        spaceFolder.addBinding(paramsTarget, 'padding', { label: 'Padding' }).on('change', (ev) => this.applyStyle('padding', ev.value, mode));
        spaceFolder.addBinding(paramsTarget, 'margin', { label: 'Margin' }).on('change', (ev) => this.applyStyle('margin', ev.value, mode));
        spaceFolder.addBinding(paramsTarget, 'gap', { label: 'Gap' }).on('change', (ev) => this.applyStyle('gap', ev.value, mode));
    }

    applyStyle(prop, value, mode) {
        if (this.isSyncing) return; // Prevent loops during selection

        if (mode === 'var') {
            document.documentElement.style.setProperty(prop, value);
            return;
        }

        if (!this.selectedElement) return;

        if (mode === 'tag' && this.currentTag) {
            const selector = this.currentTag;
            if (!this.tagOverrides[selector]) this.tagOverrides[selector] = {};
            this.tagOverrides[selector][prop] = value;
            this.renderUserCss();
        } else if (mode === 'class' && this.currentClass) {
            // Class Mode
            const selector = '.' + this.currentClass;
            if (!this.classOverrides[selector]) this.classOverrides[selector] = {};
            this.classOverrides[selector][prop] = value;
            this.renderUserCss();
        } else {
            // Inline Mode (default)
            this.selectedElement.style[prop] = value;
        }

        this.updateOverlay(this.selectionBox, this.selectedElement);
    }

    renderUserCss() {
        const styleEl = document.getElementById('editor-user-css');
        if (!styleEl) return;

        let css = '/* Generated by Visual Editor */\n';

        // 1. Tags
        for (const [selector, rules] of Object.entries(this.tagOverrides)) {
            css += `${selector} {\n`;
            for (const [prop, val] of Object.entries(rules)) {
                const kebabObj = prop.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
                css += `  ${kebabObj}: ${val} !important;\n`;
            }
            css += `}\n`;
        }

        // 2. Classes
        for (const [selector, rules] of Object.entries(this.classOverrides)) {
            css += `${selector} {\n`;
            for (const [prop, val] of Object.entries(rules)) {
                const kebabObj = prop.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
                css += `  ${kebabObj}: ${val} !important;\n`;
            }
            css += `}\n`;
        }

        // 3. Vars (if modified - technically modifying inline :root style, but nice to persist if we export)
        // Note: Vars are applied to documentElement.style directly, so they persist in inline style of HTML tag.
        // We don't strictly need to write them to CSS block unless we want them separated.
        // For now, let's leave them on the HTML tag style attribute which is standard for overrides.

        styleEl.textContent = css;
    }

    setupEvents() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('click', (e) => this.handleClick(e));
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveFile();
            }
        });

        // RECALCULATE OVERLAY ON RESIZE/SCROLL
        window.addEventListener('resize', () => {
            if (this.selectedElement) this.updateOverlay(this.selectionBox, this.selectedElement);
        });
        window.addEventListener('scroll', () => {
            if (this.selectedElement) this.updateOverlay(this.selectionBox, this.selectedElement);
        }, { capture: true, passive: true });

        // Listen for Body Transition End (Panel Open Shift)
        document.body.addEventListener('transitionend', (e) => {
            if (e.target === document.body && this.selectedElement) {
                this.updateOverlay(this.selectionBox, this.selectedElement);
            }
        });
    }

    toggleMode() {
        this.isActive = !this.isActive;
        this.updateModeState();
    }

    updateModeState() {
        this.toggleBtn.classList.toggle('active', this.isActive);
        this.toggleBtn.textContent = this.isActive ? 'Exit Editor' : 'Edit Slide';

        if (!this.isActive) {
            this.paneContainer.style.display = 'none';
            document.body.style.paddingRight = '0';
            this.selectedElement = null;
            this.highlighter.style.display = 'none';
            this.selectionBox.style.display = 'none';
            document.body.style.cursor = 'default';
        }
    }

    // === Selection Logic ===
    isValidTarget(target) {
        if (!target) return false;
        if (this.ignoredTags.includes(target.tagName)) return false;
        if (this.container.contains(target) || this.paneContainer.contains(target)) return false;
        if (target.closest('.tp-dfwv')) return false;
        return true;
    }

    handleMouseMove(e) {
        if (!this.isActive) return;
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (this.isValidTarget(target)) {
            this.highlighter.style.display = 'block';
            this.updateOverlay(this.highlighter, target);
        } else {
            this.highlighter.style.display = 'none';
        }
    }

    handleClick(e) {
        if (!this.isActive) return;

        // GUARD: Ignore clicks inside the Editor UI itself
        if (this.container.contains(e.target) || this.paneContainer.contains(e.target)) return;

        let target = e.target;
        if (this.isValidTarget(target)) {
            // === SELECT VALID ELEMENT ===
            e.preventDefault();
            e.stopPropagation();
            this.selectedElement = target;
            this.updateOverlay(this.selectionBox, this.selectedElement);
            this.selectionBox.style.display = 'block';

            // Show Panel
            this.paneContainer.style.display = 'block';
            document.body.style.paddingRight = '320px';

            this.syncParamsFromElement(target);

            // FIX: Recalculate overlay after panel transition (layout shift)
            setTimeout(() => {
                if (this.selectedElement === target) {
                    this.updateOverlay(this.selectionBox, this.selectedElement);
                }
            }, 250); // Match CSS transition time

        } else {
            // === DESELECT (Click on Background) ===
            this.selectedElement = null;
            this.selectionBox.style.display = 'none';

            // Hide Panel
            this.paneContainer.style.display = 'none';
            document.body.style.paddingRight = '0';
        }
    }

    findRule(selector) {
        for (const sheet of Array.from(document.styleSheets)) {
            try {
                for (const rule of Array.from(sheet.cssRules)) {
                    if (rule.selectorText === selector) return rule;
                }
            } catch (e) { }
        }
        return null;
    }

    updateOverlay(overlay, element) {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        overlay.style.top = rect.top + 'px';
        overlay.style.left = rect.left + 'px';
        overlay.style.width = rect.width + 'px';
        overlay.style.height = rect.height + 'px';
    }

    // === SYNC & SMART EDITING ===
    syncParamsFromElement(el) {
        this.isSyncing = true; // --- BLOCK UPDATES ---
        try {
            const comp = window.getComputedStyle(el);

            // 1. Tag & Class Detection
            const rawClass = el.className.trim();
            const primaryClass = rawClass.split(' ')[0]; // Simple heuristic
            this.currentClass = primaryClass || null;
            this.paramsInfo.tag = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '');
            this.paramsInfo.classes = rawClass || '(No Classes)';

            // Update Folder Titles & Visibility
            if (this.currentClass) {
                this.classFolder.title = `Global Styles (.${this.currentClass})`;
                this.classFolder.hidden = false;
            } else {
                this.classFolder.title = 'Global Styles (No Class)';
                this.classFolder.hidden = true;
            }

            // 2. Clear Old Content Bindings
            this.childBindings.forEach(b => b.dispose());
            this.childBindings = [];
            this.childParams = {};

            // 3. Smart Children Logic
            const children = Array.from(el.childNodes).filter(n => {
                const type = n.nodeType;
                if (type === 1) return !this.voidTags.includes(n.tagName); // Skip IMG/BR
                if (type === 3) return n.textContent.trim().length > 0;
                return false;
            });

            if (children.length === 0) {
                this.childParams['self_content'] = el.innerText;
                this.addTextareaBinding('self_content', 'Content', (val) => { el.innerText = val; }, true);
            } else {
                children.forEach((child, i) => {
                    const key = 'child_' + i;
                    const isText = child.nodeType === 3;
                    const label = isText ? 'Text' : child.tagName;
                    const initialVal = isText ? child.textContent : child.innerText;
                    this.childParams[key] = initialVal;
                    this.addTextareaBinding(key, label, (val) => {
                        if (isText) child.textContent = val;
                        else child.innerText = val;
                    });
                });
            }

            // 4. Styles - Populate BOTH Local and Class params

            // Helper for robust parsing & NaN prevention
            const parsePx = (val) => { const v = parseFloat(val); return isNaN(v) ? 0 : v; };
            const parseOp = (val) => { const v = parseFloat(val); return isNaN(v) ? 1 : v; };

            // A) Local Params (Inline Styles ONLY)
            // A) Local Params (Inline Styles ONLY) - With Computed Fallback for UX
            this.localParams.width = el.style.width;
            this.localParams.height = el.style.height;
            this.localParams.fontSize = parsePx(el.style.fontSize) || parsePx(comp.fontSize);
            this.localParams.color = el.style.color || comp.color;
            this.localParams.backgroundColor = el.style.backgroundColor || comp.backgroundColor;
            this.localParams.border = el.style.border || comp.border;

            const inlineOp = parseFloat(el.style.opacity);
            this.localParams.opacity = isNaN(inlineOp) ? parseOp(comp.opacity) : inlineOp;

            this.localParams.borderRadius = parsePx(el.style.borderRadius) || parsePx(comp.borderRadius);
            this.localParams.padding = el.style.padding || comp.padding;
            this.localParams.margin = el.style.margin || comp.margin;
            this.localParams.gap = el.style.gap || (comp.gap === 'normal' ? '0px' : comp.gap);
            this.localParams.textAlign = el.style.textAlign || comp.textAlign;
            this.localParams.fontWeight = el.style.fontWeight || comp.fontWeight;

            // Smart Line Height
            const computedLH = parseFloat(comp.lineHeight) / parseFloat(comp.fontSize) || 1.5;
            this.localParams.lineHeight = parseFloat(el.style.lineHeight) || computedLH;

            // Helper to get raw rule value
            let classRule = null;
            if (this.currentClass) {
                classRule = this.findRule('.' + this.currentClass);
            }
            const getRaw = (prop) => {
                if (!classRule) return '';
                // Simple camel to kebab
                const kebab = prop.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
                return classRule.style.getPropertyValue(kebab).trim();
            };

            // B) Class Params (Computed default, OVERWRITE with Raw if found)
            this.classParams.width = getRaw('width') || comp.width;
            this.classParams.height = getRaw('height') || comp.height;
            this.classParams.fontSize = getRaw('fontSize') || parsePx(comp.fontSize);
            this.classParams.color = getRaw('color') || comp.color;
            this.classParams.backgroundColor = getRaw('backgroundColor') || comp.backgroundColor;
            this.classParams.border = getRaw('border') || comp.border;
            this.classParams.opacity = getRaw('opacity') || parseOp(comp.opacity);
            this.classParams.borderRadius = getRaw('borderRadius') || parsePx(comp.borderRadius);
            this.classParams.padding = getRaw('padding') || comp.padding;
            this.classParams.margin = getRaw('margin') || comp.margin;
            this.classParams.gap = getRaw('gap') || (comp.gap === 'normal' ? '0px' : comp.gap);
            this.classParams.textAlign = getRaw('textAlign') || comp.textAlign;
            this.classParams.fontWeight = getRaw('fontWeight') || comp.fontWeight;
            this.classParams.lineHeight = parseFloat(comp.lineHeight) / parseFloat(comp.fontSize) || 1.5;

            // Fix logic for numeric bindings (Tweakpane slider safety)
            if (String(this.classParams.fontSize).includes('var(')) this.classParams.fontSize = parsePx(comp.fontSize);
            if (String(this.classParams.opacity).includes('var(')) this.classParams.opacity = parseOp(comp.opacity);

            // C) Tag Params (Computed default)
            Object.assign(this.tagParams, this.classParams); // Start with computed

            // FORCE REFRESH of pane titles
            this.tagFolder.title = `Global Styles (${el.tagName})`;
            this.currentTag = el.tagName;

            // Force Tweakpane Refresh
            this.pane.refresh();

            // Scroll to top of pane just in case
            this.paneContainer.scrollTop = 0;

        } finally {
            this.isSyncing = false; // --- UNBLOCK UPDATES ---
        }
    }

    addTextareaBinding(key, label, onChangeCallback) {
        const binding = this.contentFolder.addBinding(this.childParams, key, {
            label: label,
            view: 'textarea', // Hint to Tweakpane
            rows: 4
        }).on('change', (ev) => {
            onChangeCallback(ev.value);
            if (this.selectedElement) this.updateOverlay(this.selectionBox, this.selectedElement);
        });

        this.childBindings.push(binding);

        // Force Swap to Native Textarea
        try {
            const container = binding.element;
            const input = container.querySelector('input');
            if (input) {
                const textarea = document.createElement('textarea');
                textarea.className = input.className;
                textarea.value = this.childParams[key];
                textarea.placeholder = "Edit content...";
                textarea.style.minHeight = '60px';
                textarea.style.resize = 'vertical';
                textarea.style.fontFamily = 'inherit';
                textarea.addEventListener('input', (e) => {
                    const val = e.target.value;
                    this.childParams[key] = val;
                    onChangeCallback(val);
                    if (this.selectedElement) this.updateOverlay(this.selectionBox, this.selectedElement);
                });
                textarea.addEventListener('keydown', (e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === 's') return;
                    e.stopPropagation();
                });
                input.replaceWith(textarea);
            }
        } catch (e) { }
    }

    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('visible');
        setTimeout(() => this.toast.classList.remove('visible'), 3000);
    }

    async saveFile() {
        const displayState = this.paneContainer.style.display;
        this.paneContainer.style.display = 'none';
        this.container.remove();

        const userStyle = document.getElementById('editor-user-css');
        const htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

        document.body.appendChild(this.container);
        this.paneContainer.style.display = displayState;

        let filename = 'slide.html';
        try {
            const extracted = window.location.pathname.split('/').pop();
            if (extracted && extracted.endsWith('.html')) filename = decodeURIComponent(extracted);
            else filename = (document.title || 'slide') + '.html';
        } catch (e) { }

        try {
            if (window.showSaveFilePicker) {
                if (!this.fileHandle) {
                    this.fileHandle = await window.showSaveFilePicker({ suggestedName: filename });
                }
                const writable = await this.fileHandle.createWritable();
                await writable.write(htmlContent);
                await writable.close();
                this.showToast('File Saved Successfully!');
            } else {
                throw new Error('No FS Access');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                const blob = new Blob([htmlContent], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = filename; a.click();
                URL.revokeObjectURL(url);
                this.showToast('Download Started');
            }
        }
    }
}
