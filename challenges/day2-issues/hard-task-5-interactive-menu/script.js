// Interactive Menu JavaScript

class InteractiveMenu {
    constructor() {
        this.menuTrigger = document.querySelector('.menu-trigger');
        this.menuDropdown = document.querySelector('.menu-dropdown');
        this.menuItems = Array.from(document.querySelectorAll('.menu-item'));
        this.submenuContainers = document.querySelectorAll('.submenu-container');
        this.feedback = document.getElementById('feedback');
        this.currentIndex = -1;
        this.isMenuOpen = false;
        this.isSubmenuOpen = false;

        this.init();
    }

    init() {
        this.menuTrigger.addEventListener('click', () => this.toggleMenu());
        this.menuItems.forEach((item, index) => {
            item.addEventListener('click', (e) => this.handleItemClick(e, index));
            item.addEventListener('focus', () => this.handleItemFocus(index));
        });
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.menuDropdown.classList.add('active');
            this.menuTrigger.classList.add('active');
            this.menuTrigger.setAttribute('aria-expanded', 'true');
            this.currentIndex = 0;
            this.focusItem(0);
            this.showFeedback('Menu opened');
        } else {
            this.closeMenu();
        }
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.menuDropdown.classList.remove('active');
        this.menuTrigger.classList.remove('active');
        this.menuTrigger.setAttribute('aria-expanded', 'false');
        this.currentIndex = -1;
        this.clearFocus();
        this.showFeedback('Menu closed');
    }

    closeSubmenu() {
        this.isSubmenuOpen = false;
        this.submenuContainers.forEach(container => {
            container.classList.remove('active');
        });
    }

    handleKeyboard(e) {
        if (!this.isMenuOpen) return;

        const key = e.key;

        switch(key) {
            case 'ArrowDown':
                e.preventDefault();
                this.navigateDown();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateUp();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.openSubmenu();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.closeSubmenu();
                break;
            case 'Enter':
                e.preventDefault();
                this.selectItem();
                break;
            case 'Escape':
                e.preventDefault();
                this.closeMenu();
                break;
            case 'Home':
                e.preventDefault();
                this.focusItem(0);
                break;
            case 'End':
                e.preventDefault();
                this.focusItem(this.menuItems.length - 1);
                break;
        }
    }

    navigateDown() {
        this.currentIndex++;
        if (this.currentIndex >= this.menuItems.length) {
            this.currentIndex = 0;
        }
        this.focusItem(this.currentIndex);
    }

    navigateUp() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.menuItems.length - 1;
        }
        this.focusItem(this.currentIndex);
    }

    focusItem(index) {
        this.clearFocus();
        this.currentIndex = index;
        this.menuItems[index].focus();
        this.menuItems[index].classList.add('focus');
    }

    clearFocus() {
        this.menuItems.forEach(item => item.classList.remove('focus'));
    }

    handleItemFocus(index) {
        this.currentIndex = index;
    }

    openSubmenu() {
        const currentItem = this.menuItems[this.currentIndex];
        if (currentItem.nextElementSibling && currentItem.nextElementSibling.classList.contains('submenu-container')) {
            currentItem.nextElementSibling.classList.add('active');
            this.isSubmenuOpen = true;
            this.showFeedback('Submenu opened');
        }
    }

    selectItem() {
        const itemText = this.menuItems[this.currentIndex].querySelector('.menu-text')?.textContent || 'Item';
        this.showFeedback(`Selected: ${itemText}`);
        console.log(`Clicked: ${itemText}`);
        // Simulate click
        this.menuItems[this.currentIndex].click();
    }

    handleItemClick(e, index) {
        const itemText = e.target.closest('.menu-item').querySelector('.menu-text')?.textContent || 'Item';
        this.showFeedback(`Selected: ${itemText}`);
        console.log(`Clicked: ${itemText}`);
    }

    handleOutsideClick(e) {
        if (!e.target.closest('.menu')) {
            if (this.isMenuOpen) {
                this.closeMenu();
            }
        }
    }

    showFeedback(message) {
        this.feedback.textContent = message;
        this.feedback.classList.add('show');
        setTimeout(() => {
            this.feedback.classList.remove('show');
        }, 2000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveMenu();
});
