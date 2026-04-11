document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.pane');
    const indicator = document.querySelector('.tab-indicator');
    const tabsHeader = document.getElementById('tabs-header');

    function updateIndicator(activeBtn) {
        const rect = activeBtn.getBoundingClientRect();
        const headerRect = tabsHeader.getBoundingClientRect();
        
        indicator.style.width = `${rect.width}px`;
        indicator.style.transform = `translateX(${rect.left - headerRect.left - 6}px)`;
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // Move indicator
            updateIndicator(btn);
        });
    });

    // Initialize indicator position
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) {
        // Wait a small moment for styles to settle
        setTimeout(() => updateIndicator(activeBtn), 100);
    }

    // Update on resize
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.tab-btn.active');
        if (currentActive) updateIndicator(currentActive);
    });
});
