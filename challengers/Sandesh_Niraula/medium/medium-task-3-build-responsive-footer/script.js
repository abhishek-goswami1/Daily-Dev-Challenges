// Newsletter form handling
document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const email = input.value;
        
        if (email.trim()) {
            alert(`Thank you for subscribing with: ${email}`);
            input.value = '';
        }
    });
});

// Footer links interaction
document.querySelectorAll('.footer-links a, .footer-section a, .footer-section ul a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent default navigation for demo purposes
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});
