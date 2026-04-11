class DropdownMenu {
    constructor() {
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.init();
    }

    init() {
        this.dropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('.dropdown-btn');
            const content = dropdown.querySelector('.dropdown-content');

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown(dropdown);
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    content.classList.remove('active');
                    btn.classList.remove('active');
                }
            });

            // Handle search functionality
            const searchInput = content.querySelector('.dropdown-search');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.filterDropdownItems(dropdown, e.target.value);
                });
                searchInput.addEventListener('click', (e) => e.stopPropagation());
            }

            // Handle submenu hover
            const submenuLinks = content.querySelectorAll('a:has(+ .dropdown-submenu)');
            submenuLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    const submenu = link.nextElementSibling;
                    if (submenu) submenu.classList.add('active');
                });
                link.addEventListener('mouseleave', () => {
                    const submenu = link.nextElementSibling;
                    if (submenu) submenu.classList.remove('active');
                });
            });
        });
    }

    toggleDropdown(dropdown) {
        const btn = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');
        const isActive = content.classList.contains('active');

        // Close all dropdowns
        this.dropdowns.forEach(dd => {
            dd.querySelector('.dropdown-content').classList.remove('active');
            dd.querySelector('.dropdown-btn').classList.remove('active');
        });

        // Toggle current dropdown
        if (!isActive) {
            content.classList.add('active');
            btn.classList.add('active');
        }
    }

    filterDropdownItems(dropdown, searchValue) {
        const items = dropdown.querySelectorAll('.search-item');
        const searchLower = searchValue.toLowerCase();

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchLower) ? 'block' : 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DropdownMenu();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.dropdown-content.active').forEach(content => {
            content.classList.remove('active');
        });
    }
});
