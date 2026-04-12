// Accordion System
class AccordionSystem {
    constructor() {
        this.headers = document.querySelectorAll('.accordion-header');
        this.panels = document.querySelectorAll('.accordion-panel');
        this.expandAllBtn = document.getElementById('expand-all');
        this.collapseAllBtn = document.getElementById('collapse-all');
        
        this.init();
    }
    
    init() {
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        this.headers.forEach(header => {
            header.addEventListener('click', () => this.toggleAccordion(header));
            header.addEventListener('keydown', (e) => this.handleKeyboard(e, header));
        });
        
        this.expandAllBtn.addEventListener('click', () => this.expandAll());
        this.collapseAllBtn.addEventListener('click', () => this.collapseAll());
    }
    
    toggleAccordion(header) {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const panel = document.getElementById(header.getAttribute('aria-controls'));
        
        if (isExpanded) {
            this.closeAccordion(header, panel);
        } else {
            this.openAccordion(header, panel);
        }
    }
    
    openAccordion(header, panel) {
        header.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
        panel.setAttribute('expanded', '');
    }
    
    closeAccordion(header, panel) {
        header.setAttribute('aria-expanded', 'false');
        panel.setAttribute('hidden', '');
        panel.removeAttribute('expanded');
    }
    
    expandAll() {
        this.headers.forEach(header => {
            const panel = document.getElementById(header.getAttribute('aria-controls'));
            this.openAccordion(header, panel);
        });
    }
    
    collapseAll() {
        this.headers.forEach(header => {
            const panel = document.getElementById(header.getAttribute('aria-controls'));
            this.closeAccordion(header, panel);
        });
    }
    
    handleKeyboard(e, header) {
        switch(e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.toggleAccordion(header);
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextHeader = header.closest('.accordion-item').nextElementSibling?.querySelector('.accordion-header');
                if (nextHeader) nextHeader.focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevHeader = header.closest('.accordion-item').previousElementSibling?.querySelector('.accordion-header');
                if (prevHeader) prevHeader.focus();
                break;
            case 'Home':
                e.preventDefault();
                this.headers[0].focus();
                break;
            case 'End':
                e.preventDefault();
                this.headers[this.headers.length - 1].focus();
                break;
        }
    }
}

// Initialize accordion system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AccordionSystem();
});
