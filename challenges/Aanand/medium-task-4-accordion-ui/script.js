const triggers = document.querySelectorAll('.accordion-trigger');

triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const panel = trigger.nextElementSibling;
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';

        triggers.forEach(button => {
            button.setAttribute('aria-expanded', 'false');
            button.nextElementSibling.hidden = true;
        });

        if (!isOpen) {
            trigger.setAttribute('aria-expanded', 'true');
            panel.hidden = false;
        }
    });
});
