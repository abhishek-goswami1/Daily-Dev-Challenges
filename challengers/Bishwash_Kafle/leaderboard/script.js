// Leaderboard Data
const leaderboardData = [
    { rank: 1, name: 'Bishwash Kafle', avatar: 'BK', points: 850, tasks: 6, time: '45m 32s' },
    { rank: 2, name: 'Sarah Johnson', avatar: 'SJ', points: 820, tasks: 6, time: '52m 18s' },
    { rank: 3, name: 'Mike Williams', avatar: 'MW', points: 790, tasks: 5, time: '38m 45s' },
    { rank: 4, name: 'Emma Davis', avatar: 'ED', points: 750, tasks: 5, time: '61m 20s' },
    { rank: 5, name: 'John Brown', avatar: 'JB', points: 720, tasks: 5, time: '48m 10s' },
    { rank: 6, name: 'Lisa Anderson', avatar: 'LA', points: 680, tasks: 4, time: '35m 55s' },
    { rank: 7, name: 'David Martinez', avatar: 'DM', points: 640, tasks: 4, time: '56m 30s' },
    { rank: 8, name: 'Sophie Taylor', avatar: 'ST', points: 600, tasks: 4, time: '42m 25s' },
    { rank: 9, name: 'Ryan Wilson', avatar: 'RW', points: 560, tasks: 3, time: '39m 18s' },
    { rank: 10, name: 'Jessica Lee', avatar: 'JL', points: 520, tasks: 3, time: '55m 40s' }
];

class Leaderboard {
    constructor() {
        this.data = leaderboardData;
        this.sortType = 'points';
        this.init();
    }
    
    init() {
        this.renderLeaderboard();
        this.updateStats();
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        document.getElementById('sort-points').addEventListener('click', () => this.sort('points'));
        document.getElementById('sort-tasks').addEventListener('click', () => this.sort('tasks'));
        document.getElementById('sort-time').addEventListener('click', () => this.sort('time'));
    }
    
    renderLeaderboard() {
        const tbody = document.getElementById('leaderboard-body');
        tbody.innerHTML = '';
        
        this.data.forEach((entry, index) => {
            const row = document.createElement('div');
            row.className = `leaderboard-row ${this.getTopClass(index)}`;
            
            const medal = this.getMedal(index);
            const taskBadge = `<span class="tasks-badge">${entry.tasks}/6</span>`;
            
            row.innerHTML = `
                <div class="rank-col ${medal ? 'medal' : ''}">${medal || entry.rank}</div>
                <div class="name-col">
                    <div class="user-avatar">${entry.avatar}</div>
                    <div class="user-name">${entry.name}</div>
                </div>
                <div class="points-col">${entry.points} pts</div>
                <div class="tasks-col">${taskBadge}</div>
                <div class="time-col">${entry.time}</div>
            `;
            
            tbody.appendChild(row);
        });
    }
    
    getTopClass(index) {
        if (index === 0) return 'top-1';
        if (index === 1) return 'top-2';
        if (index === 2) return 'top-3';
        return '';
    }
    
    getMedal(index) {
        const medals = ['🥇', '🥈', '🥉'];
        return medals[index] || null;
    }
    
    sort(type) {
        this.sortType = type;
        
        // Update active button
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Sort data
        switch(type) {
            case 'points':
                this.data.sort((a, b) => b.points - a.points);
                break;
            case 'tasks':
                this.data.sort((a, b) => b.tasks - a.tasks || b.points - a.points);
                break;
            case 'time':
                this.data.sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time));
                break;
        }
        
        // Re-render
        this.renderLeaderboard();
    }
    
    timeToSeconds(timeStr) {
        const parts = timeStr.match(/(\d+)m (\d+)s/);
        if (parts) {
            return parseInt(parts[1]) * 60 + parseInt(parts[2]);
        }
        return 0;
    }
    
    updateStats() {
        const totalParticipants = this.data.length;
        const totalPoints = this.data.reduce((sum, entry) => sum + entry.points, 0);
        const avgCompletion = Math.round((this.data.reduce((sum, entry) => sum + entry.tasks, 0) / (totalParticipants * 6)) * 100);
        
        document.getElementById('total-participants').textContent = totalParticipants;
        document.getElementById('total-points').textContent = totalPoints;
        document.getElementById('avg-completion').textContent = avgCompletion + '%';
    }
}

// Initialize leaderboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Leaderboard();
});
