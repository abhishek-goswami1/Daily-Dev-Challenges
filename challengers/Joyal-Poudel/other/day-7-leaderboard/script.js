const challengers = [
    {
        name: "Joyal Poudel",
        score: 980,
        tasks: ["easy", "easy", "medium", "medium", "hard"],
        avatar: "https://ui-avatars.com/api/?name=Joyal+Poudel&background=8b5cf6&color=fff"
    },
    {
        name: "Sandesh Niraula",
        score: 920,
        tasks: ["easy", "medium", "hard"],
        avatar: "https://ui-avatars.com/api/?name=Sandesh+Niraula&background=3b82f6&color=fff"
    },
    {
        name: "Anish Tamrakar",
        score: 870,
        tasks: ["easy", "easy", "medium"],
        avatar: "https://ui-avatars.com/api/?name=Anish+Tamrakar&background=10b981&color=fff"
    },
    {
        name: "Bishwash Kafle",
        score: 810,
        tasks: ["easy", "medium"],
        avatar: "https://ui-avatars.com/api/?name=Bishwash+Kafle&background=f59e0b&color=fff"
    },
    {
        name: "Sraddha",
        score: 750,
        tasks: ["easy", "easy"],
        avatar: "https://ui-avatars.com/api/?name=Sraddha&background=ec4899&color=fff"
    },
    {
        name: "Aaryan",
        score: 710,
        tasks: ["easy"],
        avatar: "https://ui-avatars.com/api/?name=Aaryan&background=6366f1&color=fff"
    },
    {
        name: "Manoj",
        score: 680,
        tasks: ["easy"],
        avatar: "https://ui-avatars.com/api/?name=Manoj&background=14b8a6&color=fff"
    }
];

// Sort by score descending
challengers.sort((a, b) => b.score - a.score);

const maxScore = challengers[0].score;

function buildPodium() {
    const podium = document.getElementById('podium');

    // Reorder: 2nd, 1st, 3rd for visual podium layout
    const podiumOrder = [challengers[1], challengers[0], challengers[2]];
    const rankClasses = ['rank-2', 'rank-1', 'rank-3'];
    const rankNums = [2, 1, 3];

    podiumOrder.forEach((challenger, i) => {
        const rankNum = rankNums[i];
        const taskLabels = challenger.tasks.map(t => `<span class="task-badge ${t}">${t}</span>`).join('');

        const card = document.createElement('div');
        card.className = `podium-card ${rankClasses[i]}`;
        card.innerHTML = `
            <div class="podium-avatar-wrap">
                ${rankNum === 1 ? '<span class="crown-icon">👑</span>' : ''}
                <img src="${challenger.avatar}" alt="${challenger.name}" class="podium-avatar">
            </div>
            <div class="podium-name">${challenger.name}</div>
            <div class="podium-score">${challenger.score} pts</div>
            <div class="podium-stand">#${rankNum}</div>
        `;
        podium.appendChild(card);
    });
}

function buildRankings() {
    const list = document.getElementById('rankings-list');

    challengers.forEach((challenger, index) => {
        const pct = Math.round((challenger.score / maxScore) * 100);
        const taskLabels = challenger.tasks.map(t => `<span class="task-badge ${t}">${t}</span>`).join('');
        const medals = ['🥇', '🥈', '🥉'];
        const rankDisplay = index < 3 ? medals[index] : `#${index + 1}`;

        const row = document.createElement('div');
        row.className = 'rank-row';
        row.style.animationDelay = `${index * 0.08}s`;

        row.innerHTML = `
            <div class="rank-number">${rankDisplay}</div>
            <img src="${challenger.avatar}" alt="${challenger.name}">
            <div class="rank-info">
                <div class="name">${challenger.name}</div>
                <div class="tasks">${challenger.tasks.length} task${challenger.tasks.length !== 1 ? 's' : ''} completed</div>
            </div>
            <div class="task-badges">${taskLabels}</div>
            <div class="score-bar-wrap">
                <div class="score-val">${challenger.score} pts</div>
                <div class="score-bar-bg">
                    <div class="score-bar-fill" data-pct="${pct}"></div>
                </div>
            </div>
        `;
        list.appendChild(row);
    });

    // Animate score bars after render
    requestAnimationFrame(() => {
        document.querySelectorAll('.score-bar-fill').forEach(bar => {
            setTimeout(() => {
                bar.style.width = bar.getAttribute('data-pct') + '%';
            }, 200);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildPodium();
    buildRankings();
});
