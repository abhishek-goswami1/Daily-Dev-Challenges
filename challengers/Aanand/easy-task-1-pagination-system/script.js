const items = Array.from({ length: 30 }, (_, index) => `Item ${index + 1}`);
const perPage = 6;
let currentPage = 1;
const itemList = document.getElementById('itemList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

function renderPage(page) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageItems = items.slice(start, end);

    itemList.innerHTML = pageItems.map(item => `<li>${item}</li>`).join('');
    pageInfo.textContent = `Page ${page} of ${Math.ceil(items.length / perPage)}`;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page >= Math.ceil(items.length / perPage);
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage -= 1;
        renderPage(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(items.length / perPage)) {
        currentPage += 1;
        renderPage(currentPage);
    }
});

renderPage(currentPage);
