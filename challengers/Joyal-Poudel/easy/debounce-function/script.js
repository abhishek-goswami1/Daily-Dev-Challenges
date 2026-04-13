// Mock Database
const users = [
    { name: "Alice Johnson", role: "Frontend Developer" },
    { name: "Alex Smith", role: "UX Designer" },
    { name: "Bob Carter", role: "Backend Developer" },
    { name: "Charlie Davis", role: "Fullstack Engineer" },
    { name: "David Evans", role: "Product Manager" },
    { name: "Emma White", role: "Data Scientist" },
    { name: "Frank Green", role: "DevOps Engineer" },
    { name: "Grace Hall", role: "QA Tester" }
];

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');
    const loader = document.getElementById('loader');
    const keystrokeCountEl = document.getElementById('keystroke-count');
    const apiCallCountEl = document.getElementById('api-call-count');

    let keystrokes = 0;
    let apiCalls = 0;

    // The core debounce function
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            // Clear the previous timer
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            // Set a new timer
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // "API Request" simulation
    const fetchResults = (query) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!query) {
                    resolve([]);
                } else {
                    const filtered = users.filter(user => 
                        user.name.toLowerCase().includes(query.toLowerCase())
                    );
                    resolve(filtered);
                }
            }, 600); // Simulate network delay
        });
    };

    // The function we want to debounce
    const performSearch = async (query) => {
        apiCalls++;
        apiCallCountEl.innerText = apiCalls;
        
        loader.classList.add('active');

        const results = await fetchResults(query);

        loader.classList.remove('active');
        renderResults(results, query);
    };

    // Create the debounced version (wait 500ms after last keystroke)
    const debouncedSearch = debounce(performSearch, 500);

    // Event Listener setup
    searchInput.addEventListener('input', (e) => {
        keystrokes++;
        keystrokeCountEl.innerText = keystrokes;
        
        const query = e.target.value.trim();
        
        // Show loading state immediately on typing (optional, but good UX)
        // If we want it only during API call, it's handled in performSearch.
        // We'll show a "waiting to send" state if typing
        
        debouncedSearch(query);
    });

    const renderResults = (results, query) => {
        if (!query) {
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fa-regular fa-keyboard"></i>
                    <p>Start typing to see results</p>
                </div>
            `;
            return;
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-ghost"></i>
                    <p>No results found for "${query}"</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = results.map(user => `
            <div class="result-item">
                <div class="avatar">${user.name.charAt(0)}</div>
                <div class="user-info">
                    <div class="name">${user.name}</div>
                    <div class="role">${user.role}</div>
                </div>
            </div>
        `).join('');
    };
});
