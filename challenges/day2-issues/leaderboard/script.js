// Leaderboard JavaScript

const leaderboardRows = document.querySelectorAll('.user-row');

leaderboardRows.forEach(row => {
    row.addEventListener('click', function() {
        const username = this.querySelector('.user').textContent;
        const points = this.querySelector('.points').textContent;
        console.log(`Clicked: ${username} - ${points}`);
    });

    row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });

    row.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

const achievementBadges = document.querySelectorAll('.achievement-badge');

achievementBadges.forEach(badge => {
    badge.addEventListener('click', function() {
        const title = this.querySelector('.badge-title').textContent;
        alert(`Achievement: ${title}\nYou've unlocked this achievement!`);
    });
});

// Animate numbers on page load
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(stat => {
    const finalValue = stat.textContent;
    const numericValue = parseInt(finalValue) || finalValue;

    if (typeof numericValue === 'number') {
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                stat.textContent = numericValue + (finalValue.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
            }
        }, 30);
    }
});

console.log('Leaderboard loaded!');
