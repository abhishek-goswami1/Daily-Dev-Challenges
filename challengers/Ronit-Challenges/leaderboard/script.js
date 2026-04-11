// Mock Leaderboard Data
const leaderboardData = [
    { rank: 1, name: 'Alice Johnson', points: 2850, completed: 45, accuracy: 98.5, streak: 15 },
    { rank: 2, name: 'Bob Smith', points: 2720, completed: 42, accuracy: 96.2, streak: 12 },
    { rank: 3, name: 'Carol White', points: 2650, completed: 40, accuracy: 95.8, streak: 10 },
    { rank: 4, name: 'David Brown', points: 2480, completed: 38, accuracy: 93.5, streak: 8 },
    { rank: 5, name: 'Eve Davis', points: 2350, completed: 35, accuracy: 91.2, streak: 7 },
    { rank: 6, name: 'Frank Miller', points: 2120, completed: 32, accuracy: 89.5, streak: 5 },
    { rank: 7, name: 'Grace Lee', points: 2050, completed: 30, accuracy: 88.3, streak: 4 },
    { rank: 8, name: 'Henry Wilson', points: 1980, completed: 28, accuracy: 87.1, streak: 3 },
    { rank: 9, name: 'Ivy Martinez', points: 1850, completed: 26, accuracy: 85.9, streak: 2 },
    { rank: 10, name: 'Jack Taylor', points: 1720, completed: 24, accuracy: 84.2, streak: 1 },
    { rank: 11, name: 'Karen Anderson', points: 1650, completed: 22, accuracy: 83.5, streak: 0 },
    { rank: 12, name: 'Leo Thomas', points: 1580, completed: 20, accuracy: 82.1, streak: 0 },
    { rank: 13, name: 'Mia Jackson', points: 1450, completed: 18, accuracy: 80.8, streak: 0 },
    { rank: 14, name: 'Noah White', points: 1320, completed: 16, accuracy: 79.2, streak: 0 },
    { rank: 15, name: 'Olivia Harris', points: 1250, completed: 14, accuracy: 77.5, streak: 0 }
];

let filteredData = [...leaderboardData];
let currentSort = 'rank';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
    updateStats();
});

function renderLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = '';

    filteredData.forEach((user, index) => {
        const row = document.createElement('tr');
        if (user.rank <= 3) row.classList.add('top-3');

        const rankBadgeClass = user.rank === 1 ? 'gold' : user.rank === 2 ? 'silver' : user.rank === 3 ? 'bronze' : 'default';

        row.innerHTML = `
            <td>
                <span class="rank-badge ${rankBadgeClass}">${user.rank}</span>
            </td>
            <td>
                <div class="user-info">
                    <div class="user-avatar">${user.name.charAt(0)}</div>
                    <span>${user.name}</span>
                </div>
            </td>
            <td>
                <span class="points-badge">${user.points}</span>
            </td>
            <td>${user.completed}</td>
            <td>
                <div class="accuracy-bar">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${user.accuracy}%"></div>
                    </div>
                    <span>${user.accuracy}%</span>
                </div>
            </td>
            <td>
                <div class="streak-display">
                    🔥 ${user.streak}
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function filterLeaderboard() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    filteredData = leaderboardData.filter(user => 
        user.name.toLowerCase().includes(searchTerm)
    );

    // Re-sort based on current sort
    sortLeaderboardData(currentSort);
    renderLeaderboard();
}

function sortLeaderboard() {
    currentSort = document.getElementById('sortSelect').value;
    sortLeaderboardData(currentSort);
    renderLeaderboard();
}

function sortLeaderboardData(sortBy) {
    switch (sortBy) {
        case 'points':
            filteredData.sort((a, b) => b.points - a.points);
            break;
        case 'challenges':
            filteredData.sort((a, b) => b.completed - a.completed);
            break;
        case 'rank':
        default:
            filteredData.sort((a, b) => a.rank - b.rank);
    }

    // Update ranks
    filteredData.forEach((user, index) => {
        user.rank = index + 1;
    });
}

function updateStats() {
    const totalUsers = leaderboardData.length;
    const totalChallenges = leaderboardData.reduce((sum, user) => sum + user.completed, 0);
    const avgScore = (leaderboardData.reduce((sum, user) => sum + user.points, 0) / totalUsers).toFixed(1);
    const topScore = Math.max(...leaderboardData.map(u => u.points));

    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('totalChallenges').textContent = totalChallenges;
    document.getElementById('avgScore').textContent = avgScore;
    document.getElementById('topScore').textContent = topScore;
}

console.log('Leaderboard Loaded');
