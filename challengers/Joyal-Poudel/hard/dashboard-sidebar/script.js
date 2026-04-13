document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('overlay');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Desktop Toggle Logic
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        
        // If sidebar is collapsed, close all open dropdowns
        if (sidebar.classList.contains('collapsed')) {
            document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
                item.classList.remove('dropdown-open');
            });
        }
    });

    // Mobile Toggle Logic
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('show');
    });

    // Close on overlay click (mobile)
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('show');
    });

    // Sub-menu Toggle Logic
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // If sidebar is collapsed, clicking a menu item shouldn't open dropdown, 
            // maybe it should expand the sidebar first. Let's expand it automatically:
            if (sidebar.classList.contains('collapsed')) {
                sidebar.classList.remove('collapsed');
            }

            const parentLi = toggle.parentElement;
            
            // Close other open dropdowns for accordion effect
            document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
                if (item !== parentLi) {
                    item.classList.remove('dropdown-open');
                }
            });

            // Toggle current
            parentLi.classList.toggle('dropdown-open');
        });
    });

    // Active state toggling for demonstration
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if(link.getAttribute('href') === '#') e.preventDefault();
            
            // Remove active from all
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });

            // Add active to current
            link.parentElement.classList.add('active');
            
            // On mobile, clicking a link closes the sidebar
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('show');
            }
        });
    });
});
