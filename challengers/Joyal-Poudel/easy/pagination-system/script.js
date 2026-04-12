document.addEventListener('DOMContentLoaded', () => {
    const itemList = document.getElementById('item-list');
    const paginationContainer = document.getElementById('pagination');
    const cardContainer = document.querySelector('.content-card');

    // Data Configuration
    const totalItems = 100;
    const itemsPerPage = 8;
    let currentPage = 1;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Generate Dummy Data
    const data = Array.from({ length: totalItems }, (_, i) => ({
        id: i + 1,
        title: `Item Title ${i + 1}`,
        description: `This is a short description for item number ${i + 1} to demonstrate the pagination system UI.`
    }));

    function showLoading() {
        itemList.innerHTML = '';
        const loader = document.createElement('div');
        loader.className = 'loading';
        cardContainer.appendChild(loader);
        return loader;
    }

    function hideLoading(loader) {
        if (loader) loader.remove();
    }

    async function displayPage(page) {
        const loader = showLoading();
        
        // Simulate network delay for effect
        await new Promise(resolve => setTimeout(resolve, 600));
        
        hideLoading(loader);

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);

        itemList.innerHTML = '';
        pageData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            itemList.appendChild(card);
        });

        renderPagination();
    }

    function renderPagination() {
        paginationContainer.innerHTML = '';

        // Previous Button
        const prevBtn = createPageButton('Prev', currentPage - 1, currentPage === 1);
        paginationContainer.appendChild(prevBtn);

        // Logic to show pages with dots
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            paginationContainer.appendChild(createPageButton(1, 1));
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.className = 'dots';
                dots.innerText = '...';
                paginationContainer.appendChild(dots);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationContainer.appendChild(createPageButton(i, i, false, i === currentPage));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.className = 'dots';
                dots.innerText = '...';
                paginationContainer.appendChild(dots);
            }
            paginationContainer.appendChild(createPageButton(totalPages, totalPages));
        }

        // Next Button
        const nextBtn = createPageButton('Next', currentPage + 1, currentPage === totalPages);
        paginationContainer.appendChild(nextBtn);
    }

    function createPageButton(text, page, isDisabled = false, isActive = false) {
        const btn = document.createElement('button');
        btn.className = `page-btn${isDisabled ? ' disabled' : ''}${isActive ? ' active' : ''}`;
        btn.innerText = text;
        
        if (!isDisabled && !isActive) {
            btn.addEventListener('click', () => {
                currentPage = page;
                displayPage(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        return btn;
    }

    // Initial load
    displayPage(currentPage);
});
