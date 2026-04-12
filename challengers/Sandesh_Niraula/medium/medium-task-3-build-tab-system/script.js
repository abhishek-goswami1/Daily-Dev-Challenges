// Get all tab buttons and contents
const tabBtns = document.querySelectorAll('.tab-btn');

// Add click listeners to all tab buttons
tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const tabGroup = btn.closest('.tabs');
        const tabId = btn.getAttribute('data-tab');

        // Remove active class from all buttons in this group
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Hide all content divs that are siblings of the tab group
        const tabSection = tabGroup.closest('.tab-section') || tabGroup.closest('.vertical-tabs-container');
        let contentContainers = [];

        if (tabGroup.classList.contains('vertical-tabs')) {
            contentContainers = tabSection.querySelectorAll('.vertical-content .tab-content');
        } else {
            contentContainers = tabSection.querySelectorAll(':scope > .tab-content');
        }

        contentContainers.forEach(content => content.classList.remove('active'));

        // Show the selected tab content
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeBtn = document.activeElement;
        if (activeBtn.classList.contains('tab-btn')) {
            const allBtns = Array.from(activeBtn.closest('.tabs').querySelectorAll('.tab-btn'));
            const currentIndex = allBtns.indexOf(activeBtn);
            let nextIndex;

            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % allBtns.length;
            } else {
                nextIndex = (currentIndex - 1 + allBtns.length) % allBtns.length;
            }

            allBtns[nextIndex].focus();
            allBtns[nextIndex].click();
        }
    }
});
