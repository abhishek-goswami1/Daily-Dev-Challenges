const searchInput = document.getElementById('searchInput');
const leaderboardBody = document.getElementById('leaderboardBody');
const sortButtons = document.querySelectorAll('.sort-btn');
const emptyState = document.getElementById('emptyState');
const totalUsersEl = document.getElementById('totalUsers');
const avgScoreEl = document.getElementById('avgScore');
const avgTimeEl = document.getElementById('avgTime');
const completionRateEl = document.getElementById('completionRate');

let leaderboardData = [
    { rank: 1, name: 'Alex Johnson', username: '@alexjohnson', score: 950, time: '2:15', status: 'completed', badges: ['star', 'fire', 'lightning'] },
    { rank: 2, name: 'Sarah Smith', username: '@sarahsmith', score: 920, time: '2:45', status: 'completed', badges: ['star', 'fire'] },
    { rank: 3, name: 'Mike Chen', username: '@mikchen', score: 890, time: '3:10', status: 'completed', badges: ['star', 'diamond'] },
    { rank: 4, name: 'Emily Davis', username: '@emilydavis', score: 850, time: '3:30', status: 'completed', badges: ['fire'] },
    { rank: 5, name: 'John Wilson', username: '@johnwilson', score: 820, time: '3:55', status: 'completed', badges: ['star'] },
    { rank: 6, name: 'Lisa Brown', username: '@lisabrown', score: 780, time: '4:20', status: 'completed', badges: ['fire'] },
    { rank: 7, name: 'David Martinez', username: '@dmartinez', score: 750, time: '4:45', status: 'pending', badges: [] },
    { rank: 8, name: 'Rachel Green', username: '@rachelgreen', score: 720, time: '5:10', status: 'completed', badges: ['star'] },
    { rank: 9, name: 'Chris Taylor', username: '@christaylor', score: 680, time: '5:35', status: 'pending', badges: [] },
    { rank: 10, name: 'Nicole Lee', username: '@nicolelee', score: 650, time: '6:00', status: 'completed', badges: [] },
];

let filteredData = [...leaderboardData];
let currentSort = 'score';

// Render leaderboard
function renderLeaderboard() {
    leaderboardBody.innerHTML = '';

    if (filteredData.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    filteredData.forEach((user, index) => {
        const row = document.createElement('tr');
        const badgesHtml = user.badges.map(badge => {
            const icons = {
                'star': '⭐',
                'fire': '🔥',
                'lightning': '⚡',
                'diamond': '💎'
            };
            return `<div class="badge-icon ${badge}" title="${badge}">${icons[badge]}</div>`;
        }).join('');

        const rankBadge = getRankBadge(user.rank);
        const statusBadge = `<span class="status-badge ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>`;

        row.innerHTML = `
            <td class="rank">${rankBadge}</td>
            <td class="user">
                <div class="user-info">
                    <div class="user-avatar">${user.name.charAt(0)}</div>
                    <div class="user-details">
                        <h3>${user.name}</h3>
                        <p>${user.username}</p>
                    </div>
                </div>
            </td>
            <td class="score">${user.score}</td>
            <td class="time">${user.time}</td>
            <td class="status">${statusBadge}</td>
            <td class="badge">
                <div class="badge-icons">${badgesHtml || '<span style="color: #ccc;">No badges</span>'}</div>
            </td>
        `;

        leaderboardBody.appendChild(row);
    });

    updateStats();
}

// Get rank badge
function getRankBadge(rank) {
    const badgeClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : 'default';
    return `<span class="rank-badge ${badgeClass}">#${rank}</span>`;
}

// Update stats
function updateStats() {
    const completed = leaderboardData.filter(u => u.status === 'completed').length;
    const totalScore = leaderboardData.reduce((sum, u) => sum + u.score, 0);
    const avgScore = Math.round(totalScore / leaderboardData.length);

    // Parse time and calculate average
    const times = leaderboardData.map(u => {
        const [mins, secs] = u.time.split(':').map(Number);
        return mins * 60 + secs;
    });
    const avgTimeSeconds = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    const avgTimeMins = Math.floor(avgTimeSeconds / 60);
    const avgTimeSecs = avgTimeSeconds % 60;

    totalUsersEl.textContent = leaderboardData.length;
    avgScoreEl.textContent = avgScore;
    avgTimeEl.textContent = `${avgTimeMins}:${String(avgTimeSecs).padStart(2, '0')}`;
    completionRateEl.textContent = Math.round((completed / leaderboardData.length) * 100) + '%';
}

// Filter by search
function filterBySearch(query) {
    query = query.toLowerCase();

    if (query === '') {
        filteredData = [...leaderboardData];
    } else {
        filteredData = leaderboardData.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query)
        );
    }

    // Re-apply current sort
    sortLeaderboard(currentSort);
}

// Sort leaderboard
function sortLeaderboard(sortBy) {
    currentSort = sortBy;

    switch (sortBy) {
        case 'score':
            filteredData.sort((a, b) => b.score - a.score);
            break;
        case 'time':
            filteredData.sort((a, b) => {
                const timeA = timeToSeconds(a.time);
                const timeB = timeToSeconds(b.time);
                return timeA - timeB;
            });
            break;
        case 'name':
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    renderLeaderboard();
}

// Convert time string to seconds
function timeToSeconds(timeStr) {
    const [mins, secs] = timeStr.split(':').map(Number);
    return mins * 60 + secs;
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    filterBySearch(e.target.value);
});

sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sortButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sortLeaderboard(btn.dataset.sort);
    });
});

// Initialize
renderLeaderboard();
