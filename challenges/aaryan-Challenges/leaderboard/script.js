class Leaderboard {
    constructor() {
        this.leaderboardData = [
            { rank: 1, name: 'Sarah Chen', points: 890, completed: 6, streak: 12, badges: ['🚀', '⭐', '💎'], avatar: 'SC' },
            { rank: 2, name: 'Alex Rodriguez', points: 875, completed: 6, streak: 11, badges: ['🔥', '⭐'], avatar: 'AR' },
            { rank: 3, name: 'Emma Watson', points: 850, completed: 6, streak: 10, badges: ['🚀', '🏅'], avatar: 'EW' },
            { rank: 4, name: 'James Miller', points: 825, completed: 6, streak: 9, badges: ['⭐'], avatar: 'JM' },
            { rank: 5, name: 'Lisa Park', points: 800, completed: 5, streak: 8, badges: ['🔥'], avatar: 'LP' },
            { rank: 6, name: 'Michael Brown', points: 775, completed: 5, streak: 7, badges: ['🚀'], avatar: 'MB' },
            { rank: 7, name: 'Jessica Lee', points: 750, completed: 5, streak: 6, badges: ['⭐', '💎'], avatar: 'JL' },
            { rank: 8, name: 'David Kim', points: 725, completed: 5, streak: 5, badges: ['🔥'], avatar: 'DK' },
            { rank: 9, name: 'Amanda Garcia', points: 700, completed: 4, streak: 4, badges: ['🚀'], avatar: 'AG' },
            { rank: 10, name: 'Christopher Martinez', points: 675, completed: 4, streak: 3, badges: [], avatar: 'CM' }
        ];

        this.currentFilter = { category: 'all', time: 'all-time' };
        this.renderLeaderboard();
    }

    renderLeaderboard() {
        const tbody = document.getElementById('leaderboardBody');
        tbody.innerHTML = this.leaderboardData.map(entry => `
            <tr>
                <td class="rank">
                    <span class="rank-badge ${entry.rank === 2 ? 'second' : entry.rank === 3 ? 'third' : ''}">${entry.rank}</span>
                </td>
                <td class="avatar">
                    <div class="avatar-img">${entry.avatar}</div>
                </td>
                <td class="name">${entry.name}</td>
                <td class="points">${entry.points}</td>
                <td class="completed">${entry.completed}/6</td>
                <td class="streak">
                    <span class="streak-fire">🔥 ${entry.streak}</span>
                </td>
                <td class="badges">
                    ${entry.badges.map(badge => `<span class="badge-small">${badge}</span>`).join('')}
                </td>
            </tr>
        `).join('');
    }

    filterBy(type) {
        if (type === 'category') {
            this.currentFilter.category = document.getElementById('categoryFilter').value;
        } else if (type === 'time') {
            this.currentFilter.time = document.getElementById('timeFilter').value;
        }

        // Simulate filtering by adjusting points
        this.renderLeaderboard();
    }
}

// Initialize leaderboard
const leaderboard = new Leaderboard();

// Add some animations
window.addEventListener('load', () => {
    const rows = document.querySelectorAll('.leaderboard-table tbody tr');
    rows.forEach((row, index) => {
        row.style.animation = `slideIn ${0.3 + index * 0.05}s ease`;
    });
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
