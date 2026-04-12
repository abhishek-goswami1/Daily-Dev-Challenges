// Sample leaderboard data
const leaderboardData = [
    { rank: 1, username: 'CodeMaster', score: 950, time: 45, challenges: 6, status: 'completed' },
    { rank: 2, username: 'WebWizard', score: 920, time: 52, challenges: 6, status: 'completed' },
    { rank: 3, username: 'DevNinja', score: 890, time: 58, challenges: 5, status: 'completed' },
    { rank: 4, username: 'CssKing', score: 850, time: 65, challenges: 5, status: 'pending' },
    { rank: 5, username: 'JsPhenom', score: 820, time: 70, challenges: 5, status: 'pending' },
    { rank: 6, username: 'DesignPro', score: 780, time: 75, challenges: 4, status: 'pending' },
    { rank: 7, username: 'CodeRunner', score: 750, time: 80, challenges: 4, status: 'pending' },
    { rank: 8, username: 'PixelMaster', score: 720, time: 85, challenges: 4, status: 'pending' }
];

let currentSort = 'score';
const tableBody = document.getElementById('tableBody');
const sortByScoreBtn = document.getElementById('sortByScore');
const sortByTimeBtn = document.getElementById('sortByTime');

function renderLeaderboard(data) {
    tableBody.innerHTML = '';
    
    data.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="rank">${index + 1}</td>
            <td class="username">${entry.username}</td>
            <td class="score">${entry.score}</td>
            <td class="time">${entry.time}</td>
            <td><span class="challenges">${entry.challenges}/6</span></td>
            <td><span class="status ${entry.status}">${entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}</span></td>
        `;
        tableBody.appendChild(row);
    });

    updateStats(data);
}

function updateStats(data) {
    const totalParticipants = document.getElementById('totalParticipants');
    const avgScore = document.getElementById('avgScore');
    const topScore = document.getElementById('topScore');

    totalParticipants.textContent = data.length;
    
    const scores = data.map(entry => entry.score);
    const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    avgScore.textContent = average;
    
    topScore.textContent = Math.max(...scores);
}

function sortByScore() {
    const sorted = [...leaderboardData].sort((a, b) => b.score - a.score);
    renderLeaderboard(sorted);
    currentSort = 'score';
    updateActiveBtn();
}

function sortByTime() {
    const sorted = [...leaderboardData].sort((a, b) => a.time - b.time);
    renderLeaderboard(sorted);
    currentSort = 'time';
    updateActiveBtn();
}

function updateActiveBtn() {
    sortByScoreBtn.classList.toggle('active', currentSort === 'score');
    sortByTimeBtn.classList.toggle('active', currentSort === 'time');
}

// Event listeners
sortByScoreBtn.addEventListener('click', sortByScore);
sortByTimeBtn.addEventListener('click', sortByTime);

// Initial render
renderLeaderboard(leaderboardData);
