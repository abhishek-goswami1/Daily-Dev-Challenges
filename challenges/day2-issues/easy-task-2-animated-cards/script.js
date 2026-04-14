// Animated Cards JavaScript

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        console.log(`Card clicked: ${this.querySelector('h2').textContent}`);
        // Add your functionality here
    });

    card.addEventListener('mouseenter', function() {
        // Additional hover effects can be added here
    });

    card.addEventListener('mouseleave', function() {
        // Reset effects
    });
});

document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const cardTitle = this.closest('.card').querySelector('h2').textContent;
        console.log(`Learn More clicked for: ${cardTitle}`);
        // Add your functionality here
    });
});
