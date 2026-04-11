class Leaderboard {
    constructor() {
        this.developers = this.generateMockData();
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.searchQuery = '';

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target));
        });

        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.currentPage = 1;
            this.render();
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
            }
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            const maxPages = Math.ceil(this.getFilteredData().length / this.itemsPerPage);
            if (this.currentPage < maxPages) {
                this.currentPage++;
                this.render();
            }
        });
    }

    generateMockData() {
        const names = [
            'Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown',
            'Frank Miller', 'Grace Lee', 'Henry Taylor', 'Iris Chen', 'Jack Harris',
            'Kate Anderson', 'Leo Martinez', 'Maya Rodriguez', 'Noah Thompson', 'Olivia Garcia',
            'Peter White', 'Quinn Blake', 'Rachel Green', 'Sam Jackson', 'Tina Johnson'
        ];

        const developers = [];
        for (let i = 0; i < 50; i++) {
            const nameIndex = i % names.length;
            developers.push({
                rank: i + 1,
                name: names[nameIndex] + (i > names.length - 1 ? ` ${Math.floor(i / names.length)}` : ''),
                score: Math.floor(Math.random() * (5000 - 1000) + 1000),
                challenges: Math.floor(Math.random() * (100 - 10) + 10),
                level: this.getLevel(Math.floor(Math.random() * (5000 - 1000) + 1000)),
                joinDate: this.getRandomDate()
            });
        }

        return developers.sort((a, b) => b.score - a.score).map((dev, idx) => ({
            ...dev,
            rank: idx + 1
        }));
    }

    getLevel(score) {
        if (score >= 4000) return 'platinum';
        if (score >= 3000) return 'gold';
        if (score >= 2000) return 'silver';
        return 'bronze';
    }

    getRandomDate() {
        const start = new Date(2024, 0, 1);
        const end = new Date();
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    setFilter(btn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.currentPage = 1;
        this.render();
    }

    getFilteredData() {
        let filtered = this.developers;

        // Apply text search
        if (this.searchQuery) {
            filtered = filtered.filter(dev => dev.name.toLowerCase().includes(this.searchQuery));
        }

        // Apply time filter (mock implementation)
        // In a real app, you'd calculate based on joinDate or have a lastWeekScore field
        if (this.currentFilter === 'week') {
            filtered = filtered.slice(0, Math.floor(filtered.length * 0.6));
        } else if (this.currentFilter === 'month') {
            filtered = filtered.slice(0, Math.floor(filtered.length * 0.8));
        }

        return filtered;
    }

    render() {
        const filtered = this.getFilteredData();
        const maxPages = Math.ceil(filtered.length / this.itemsPerPage);
        const startIdx = (this.currentPage - 1) * this.itemsPerPage;
        const pageData = filtered.slice(startIdx, startIdx + this.itemsPerPage);

        // Render table
        const tbody = document.getElementById('leaderboardBody');
        tbody.innerHTML = '';

        pageData.forEach((dev) => {
            const row = document.createElement('tr');
            const levelText = dev.level.charAt(0).toUpperCase() + dev.level.slice(1);
            
            let rankClass = '';
            if (dev.rank === 1) rankClass = 'gold';
            else if (dev.rank === 2) rankClass = 'silver';
            else if (dev.rank === 3) rankClass = 'bronze';

            row.innerHTML = `
                <td class="rank ${rankClass}">#${dev.rank}</td>
                <td class="developer-name">${dev.name}</td>
                <td class="score">${dev.score.toLocaleString()}</td>
                <td>${dev.challenges}</td>
                <td><span class="level ${dev.level}">${levelText}</span></td>
                <td class="join-date">${dev.joinDate}</td>
            `;

            tbody.appendChild(row);
        });

        // Update pagination
        document.getElementById('pageInfo').textContent = `Page ${this.currentPage} of ${maxPages}`;
        document.getElementById('prevBtn').disabled = this.currentPage === 1;
        document.getElementById('nextBtn').disabled = this.currentPage === maxPages;

        // Update stats
        document.getElementById('totalDevelopers').textContent = this.developers.length;
        const totalChallenges = this.developers.reduce((sum, dev) => sum + dev.challenges, 0);
        const avgScore = Math.floor(this.developers.reduce((sum, dev) => sum + dev.score, 0) / this.developers.length);
        document.getElementById('totalChallenges').textContent = totalChallenges.toLocaleString();
        document.getElementById('avgScore').textContent = avgScore.toLocaleString();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Leaderboard();
});
