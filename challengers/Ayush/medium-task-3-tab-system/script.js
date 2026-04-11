// Tab System
class TabSystem {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        
        this.init();
    }
    
    init() {
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => this.switchTab(button));
            button.addEventListener('keydown', (e) => this.handleKeyboard(e));
        });
    }
    
    switchTab(clickedButton) {
        const tabId = clickedButton.getAttribute('data-tab');
        
        this.tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        this.tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        clickedButton.classList.add('active');
        clickedButton.setAttribute('aria-selected', 'true');
        
        const activePane = document.getElementById(tabId);
        if (activePane) {
            activePane.classList.add('active');
        }
    }
    
    handleKeyboard(e) {
        const buttons = Array.from(this.tabButtons);
        const currentIndex = buttons.indexOf(e.target);
        let nextButton = null;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                nextButton = buttons[currentIndex - 1] || buttons[buttons.length - 1];
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextButton = buttons[currentIndex + 1] || buttons[0];
                break;
            case 'Home':
                e.preventDefault();
                nextButton = buttons[0];
                break;
            case 'End':
                e.preventDefault();
                nextButton = buttons[buttons.length - 1];
                break;
        }
        
        if (nextButton) {
            nextButton.focus();
            this.switchTab(nextButton);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TabSystem();
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert(`Thank you ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
                contactForm.reset();
            }
        });
    }
});
