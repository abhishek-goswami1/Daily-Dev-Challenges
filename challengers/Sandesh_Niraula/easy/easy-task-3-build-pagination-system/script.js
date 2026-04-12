// Data - Generate sample items
function generateSampleItems() {
    const items = [];
    for (let i = 1; i <= 150; i++) {
        items.push({
            id: i,
            text: `Item #${i} - Sample content item`,
            date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
        });
    }
    return items;
}

let allItems = generateSampleItems();
let currentPage = 1;
let itemsPerPage = 10;
let searchQuery = '';

// DOM Elements
const itemsList = document.getElementById('itemsList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');
const itemsPerPageSelect = document.getElementById('itemsPerPage');
const searchInput = document.getElementById('searchInput');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');
const startItemSpan = document.getElementById('startItem');
const endItemSpan = document.getElementById('endItem');
const totalItemsSpan = document.getElementById('totalItems');

// Event listeners
itemsPerPageSelect.addEventListener('change', (e) => {
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderPagination();
});

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    currentPage = 1;
    renderPagination();
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPagination();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < getTotalPages()) {
        currentPage++;
        renderPagination();
    }
});

function getFilteredItems() {
    if (!searchQuery) return allItems;
    return allItems.filter(item =>
        item.text.toLowerCase().includes(searchQuery) ||
        item.id.toString().includes(searchQuery)
    );
}

function getTotalPages() {
    const filtered = getFilteredItems();
    return Math.ceil(filtered.length / itemsPerPage);
}

function renderItems() {
    const filtered = getFilteredItems();
    const totalPages = getTotalPages();
    
    if (filtered.length === 0) {
        itemsList.innerHTML = '<div class="empty-message">No items found matching your search.</div>';
        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filtered.length);
    const paginatedItems = filtered.slice(startIndex, endIndex);

    itemsList.innerHTML = paginatedItems.map(item => `
        <div class="item">
            <div class="item-text">
                <span class="item-id">#${item.id}</span>${item.text}
            </div>
            <div class="item-date">Added: ${item.date}</div>
        </div>
    `).join('');

    // Update pagination info
    currentPageSpan.textContent = currentPage;
    totalPagesSpan.textContent = totalPages;
    startItemSpan.textContent = filtered.length > 0 ? startIndex + 1 : 0;
    endItemSpan.textContent = endIndex;
    totalItemsSpan.textContent = filtered.length;

    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function renderPageNumbers() {
    const totalPages = getTotalPages();
    pageNumbers.innerHTML = '';

    if (totalPages <= 1) return;

    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        btn.textContent = i;
        btn.addEventListener('click', () => {
            currentPage = i;
            renderPagination();
        });
        pageNumbers.appendChild(btn);
    }
}

function renderPagination() {
    renderItems();
    renderPageNumbers();
}

// Initial render
renderPagination();
