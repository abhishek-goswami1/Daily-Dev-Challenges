// Get all dropdown elements
const dropdowns = document.querySelectorAll('.dropdown');

// Add click event to dropdown toggles
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close other dropdowns
        dropdowns.forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const activeDropdown = document.querySelector('.dropdown.active');
        if (!activeDropdown) return;
        
        const menu = activeDropdown.querySelector('.dropdown-menu');
        const items = menu.querySelectorAll('.dropdown-item');
        const currentFocus = document.activeElement;
        
        let nextIndex = 0;
        
        if (currentFocus && items.length > 0) {
            const currentIndex = Array.from(items).indexOf(currentFocus);
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % items.length;
            } else {
                nextIndex = currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1;
            }
        }
        
        items[nextIndex].focus();
    }
});

// Close dropdown when item is clicked
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
});
