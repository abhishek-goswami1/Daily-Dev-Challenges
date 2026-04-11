// Responsive footer script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Responsive footer loaded successfully');
    
    // Smooth scroll for footer links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active link styling based on current page
    const currentPage = window.location.pathname;
    document.querySelectorAll('footer a').forEach(link => {
        if (link.href.includes(currentPage)) {
            link.style.color = '#667eea';
            link.style.fontWeight = 'bold';
        }
    });
});
