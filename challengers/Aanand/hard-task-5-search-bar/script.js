const items = [
    'JavaScript',
    'CSS',
    'HTML',
    'React',
    'Node.js',
    'UI Design',
    'Accessibility',
    'Web Animations',
    'Responsive Layouts',
    'Debugging',
];

const searchInput = document.getElementById('searchInput');
const itemList = document.getElementById('itemList');

function renderItems(filter = '') {
    const query = filter.trim().toLowerCase();
    const filtered = items.filter(item => item.toLowerCase().includes(query));
    itemList.innerHTML = '';

    if (filtered.length === 0) {
        const empty = document.createElement('li');
        empty.textContent = 'No matching results found.';
        empty.classList.add('no-results');
        itemList.appendChild(empty);
        return;
    }

    for (const item of filtered) {
        const li = document.createElement('li');
        li.textContent = item;
        itemList.appendChild(li);
    }
}

searchInput.addEventListener('input', event => {
    renderItems(event.target.value);
});

renderItems();
