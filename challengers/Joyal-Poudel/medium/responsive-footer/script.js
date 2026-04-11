// Smooth scroll behavior for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Year in footer
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year if needed
    const year = new Date().getFullYear();
    const footers = document.querySelectorAll('.footer-bottom-content p');
    footers.forEach(footer => {
        if (footer.textContent.includes('2024')) {
            footer.innerHTML = footer.innerHTML.replace('2024', year);
        }
    });
});

// Add scroll animation for footer sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.footer-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(10px)';
    section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(section);
});
