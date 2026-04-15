// Follow button functionality
const followButtons = document.querySelectorAll('.follow-btn');

followButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('following')) {
            this.classList.remove('following');
            this.textContent = 'Follow';
        } else {
            this.classList.add('following');
            this.textContent = 'Following';
        }
    });
});

// Add smooth animations on page load
const cards = document.querySelectorAll('.profile-card');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});
