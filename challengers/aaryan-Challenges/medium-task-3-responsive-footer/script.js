// Back to top button functionality
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Newsletter form handler
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const input = event.target.querySelector('.newsletter-input');
    const email = input.value.trim();

    if (!email) {
        alert('Please enter an email address');
        return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate subscription
    const button = event.target.querySelector('.newsletter-btn');
    const originalText = button.textContent;
    button.textContent = '✓ Subscribed!';
    button.style.background = 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)';

    input.value = '';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
}

// Add smooth scroll behavior to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
