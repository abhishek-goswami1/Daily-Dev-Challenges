// Sample data for search
const searchData = [
    // Products
    { id: 1, title: 'Wireless Headphones', category: 'Product', type: 'product', icon: '🎧' },
    { id: 2, title: 'USB-C Cable', category: 'Product', type: 'product', icon: '🔌' },
    { id: 3, title: 'Mechanical Keyboard', category: 'Product', type: 'product', icon: '⌨️' },
    { id: 4, title: 'Mouse Pad', category: 'Product', type: 'product', icon: '↗️' },
    { id: 5, title: '4K Monitor', category: 'Product', type: 'product', icon: '🖥️' },
    // Users
    { id: 6, title: 'Alex Johnson', category: 'User', type: 'user', icon: '👤' },
    { id: 7, title: 'Sarah Williams', category: 'User', type: 'user', icon: '👤' },
    { id: 8, title: 'Michael Chen', category: 'User', type: 'user', icon: '👤' },
    // Categories
    { id: 9, title: 'Electronics', category: 'Category', type: 'category', icon: '⚡' },
    { id: 10, title: 'Accessories', category: 'Category', type: 'category', icon: '✨' },
];

const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');
const resultsBox = document.getElementById('results');

let filteredResults = [];

// Search and filter function
function performSearch(query) {
    if (!query) {
        suggestionsBox.classList.remove('active');
        resultsBox.innerHTML = '';
        return;
    }

    const lowerQuery = query.toLowerCase();
    filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    );

    // Show suggestions (limit to 5)
    if (filteredResults.length > 0) {
        showSuggestions(filteredResults.slice(0, 5));
    } else {
        suggestionsBox.classList.remove('active');
    }

    // Show all results
    showResults(filteredResults);
}

function showSuggestions(suggestions) {
    suggestionsBox.innerHTML = '';
    
    suggestions.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <div class="suggestion-icon ${item.type}">${item.icon}</div>
            <div class="suggestion-text">
                <div class="suggestion-title">${highlightMatch(item.title)}</div>
                <div class="suggestion-category">${item.category}</div>
            </div>
        `;
        div.addEventListener('click', () => {
            searchInput.value = item.title;
            performSearch(item.title);
        });
        suggestionsBox.appendChild(div);
    });

    suggestionsBox.classList.add('active');
}

function showResults(results) {
    if (results.length === 0) {
        resultsBox.innerHTML = '<div class="no-results">No results found</div>';
        return;
    }

    resultsBox.innerHTML = results.map(item => `
        <div class="result-item">
            <div class="result-icon">${item.icon}</div>
            <div class="result-content">
                <div class="result-title">${highlightMatch(item.title)}</div>
                <div class="result-description">${item.category}</div>
            </div>
        </div>
    `).join('');
}

function highlightMatch(text) {
    const query = searchInput.value;
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong style="color: #667eea;">$1</strong>');
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
});

// Keyboard navigation
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const items = suggestionsBox.querySelectorAll('.suggestion-item');
        if (items.length === 0) return;

        const currentFocus = document.activeElement;
        let nextIndex = 0;

        if (currentFocus && items.length > 0) {
            const currentIndex = Array.from(items).indexOf(currentFocus);
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % items.length;
            } else {
                nextIndex = currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1;
            }
        }

        items[nextIndex].focus();
    }

    if (e.key === 'Enter') {
        e.preventDefault();
        suggestionsBox.classList.remove('active');
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (e.target !== searchInput && e.target !== suggestionsBox) {
        suggestionsBox.classList.remove('active');
    }
});

// Focus event
searchInput.addEventListener('focus', () => {
    if (searchInput.value && filteredResults.length > 0) {
        showSuggestions(filteredResults.slice(0, 5));
    }
});
