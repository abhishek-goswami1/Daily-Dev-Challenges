const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('aria-controls');

        tabs.forEach(button => {
            button.setAttribute('aria-selected', button === tab ? 'true' : 'false');
        });

        panels.forEach(panel => {
            panel.hidden = panel.id !== targetId;
        });
    });
});
