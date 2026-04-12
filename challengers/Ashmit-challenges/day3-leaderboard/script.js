class Day3Leaderboard {
    constructor() {
        this.leaders = this.generateLeaders();
        this.init();
    }

    generateLeaders() {
        const names = [
            'Alice Johnson', 'Bob Chen', 'Carol Davis', 'David Kim', 'Emma Wilson',
            'Frank Miller', 'Grace Lee', 'Henry Brown', 'Iris Anderson', 'Jack Taylor',
            'Kate Martin', 'Leo Garcia', 'Maya Rodriguez', 'Noah Thompson', 'Olivia White'
        ];

        const badges = ['🥇', '🥈', '🥉', '⭐', '💫'];

        const leaders = names.map((name, idx) => ({
            rank: idx + 1,
            name: name,
            points: Math.floor(Math.random() * (5000 - 2000) + 2000),
            challenges: Math.floor(Math.random() * (6 - 3) + 3),
            time: `${Math.floor(Math.random() * (180 - 60) + 60)}m`,
            badge: idx < 5 ? badges[idx] : '🎖️'
        })).sort((a, b) => b.points - a.points).map((leader, idx) => ({
            ...leader,
            rank: idx + 1
        }));

        return leaders;
    }

    init() {
        this.renderLeaderboard();
    }

    renderLeaderboard() {
        const tbody = document.getElementById('leaderboardBody');
        tbody.innerHTML = this.leaders.map(leader => `
            <tr class="rank-row rank-${leader.rank}">
                <td class="rank-cell">
                    <span class="rank-number">#${leader.rank}</span>
                </td>
                <td class="name-cell">
                    <div class="avatar" data-initial="${leader.name[0]}"></div>
                    <span>${leader.name}</span>
                </td>
                <td class="points-cell">
                    <strong>${leader.points.toLocaleString()}</strong>
                </td>
                <td class="challenges-cell">
                    ${leader.challenges}/5
                </td>
                <td class="time-cell">
                    ${leader.time}
                </td>
                <td class="badge-cell">
                    ${leader.badge}
                </td>
            </tr>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Day3Leaderboard();
});
