const leaderboardData = [
    { name: "Joyal Poudel", category: "hard", points: 2500, status: "Active" },
    { name: "Abiral Pokharel", category: "hard", points: 2450, status: "Active" },
    { name: "Sarah Jenkins", category: "medium", points: 1800, status: "Active" },
    { name: "Ashmit Dev", category: "easy", points: 950, status: "Active" },
    { name: "Michael Chen", category: "medium", points: 1750, status: "Active" },
    { name: "Aaryan K.", category: "easy", points: 900, status: "Active" },
    { name: "Emily Watson", category: "hard", points: 2100, status: "Active" },
    { name: "David Miller", category: "medium", points: 1600, status: "Active" },
    { name: "Sita Sharma", category: "easy", points: 850, status: "Active" },
    { name: "James Wilson", category: "hard", points: 1950, status: "Active" }
];

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('leaderboard-body');
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentCategory = 'all';
    let searchQuery = '';

    function renderLeaderboard() {
        // Sort data by points descending
        const sortedData = [...leaderboardData].sort((a, b) => b.points - a.points);

        // Filter data
        const filteredData = sortedData.filter(dev => {
            const matchesCategory = currentCategory === 'all' || dev.category === currentCategory;
            const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        tableBody.innerHTML = '';
        
        filteredData.forEach((dev, index) => {
            const row = document.createElement('tr');
            row.className = `rank-${index + 1}`;
            
            const initials = dev.name.split(' ').map(n => n[0]).join('');

            row.innerHTML = `
                <td class="rank-cell">#${index + 1}</td>
                <td>
                    <div class="developer-cell">
                        <div class="avatar">${initials}</div>
                        <span class="dev-name">${dev.name}</span>
                    </div>
                </td>
                <td><span class="category-badge category-${dev.category}">${dev.category}</span></td>
                <td class="points-cell">${dev.points.toLocaleString()}</td>
                <td>
                    <div class="status-badge">
                        <div class="status-dot"></div>
                        ${dev.status}
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });

        if (filteredData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">No developers found matching your criteria.</td></tr>';
        }
    }

    // Search logic
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderLeaderboard();
    });

    // Filter logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            renderLeaderboard();
        });
    });

    // Initial render
    renderLeaderboard();
});
