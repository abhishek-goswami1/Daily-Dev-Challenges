// Pagination System
class PaginationSystem {
    constructor(totalItems = 100, itemsPerPage = 12) {
        this.totalItems = totalItems;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.totalPages = Math.ceil(totalItems / itemsPerPage);
        
        this.itemsContainer = document.getElementById('items-container');
        this.pageNumbersContainer = document.getElementById('page-numbers');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.pageInfo = document.getElementById('page-info');
        
        this.init();
    }
    
    init() {
        this.attachEventListeners();
        this.renderPage();
        this.renderPageNumbers();
    }
    
    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.previousPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());
    }
    
    renderPage() {
        this.itemsContainer.innerHTML = '';
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
        
        for (let i = startIndex; i < endIndex; i++) {
            const item = document.createElement('div');
            item.className = 'item';
            item.innerHTML = `
                <div class="item-number">${i + 1}</div>
                <div class="item-label">Item</div>
            `;
            this.itemsContainer.appendChild(item);
        }
        
        this.updateButtons();
        this.updatePageInfo();
    }
    
    renderPageNumbers() {
        this.pageNumbersContainer.innerHTML = '';
        
        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(this.totalPages, this.currentPage + 2);
        
        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(5, this.totalPages);
            } else if (endPage === this.totalPages) {
                startPage = Math.max(1, this.totalPages - 4);
            }
        }
        
        if (startPage > 1) {
            this.addPageNumber(1);
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.style.padding = '10px 5px';
                this.pageNumbersContainer.appendChild(dots);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            this.addPageNumber(i);
        }
        
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.style.padding = '10px 5px';
                this.pageNumbersContainer.appendChild(dots);
            }
            this.addPageNumber(this.totalPages);
        }
    }
    
    addPageNumber(pageNum) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-number';
        if (pageNum === this.currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.textContent = pageNum;
        pageBtn.addEventListener('click', () => this.goToPage(pageNum));
        this.pageNumbersContainer.appendChild(pageBtn);
    }
    
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.renderPage();
            this.renderPageNumbers();
        }
    }
    
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderPage();
            this.renderPageNumbers();
        }
    }
    
    goToPage(pageNum) {
        if (pageNum >= 1 && pageNum <= this.totalPages) {
            this.currentPage = pageNum;
            this.renderPage();
            this.renderPageNumbers();
        }
    }
    
    updateButtons() {
        this.prevBtn.disabled = this.currentPage === 1;
        this.nextBtn.disabled = this.currentPage === this.totalPages;
    }
    
    updatePageInfo() {
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
        this.pageInfo.textContent = `Page ${this.currentPage} of ${this.totalPages} | Showing items ${startItem}-${endItem} of ${this.totalItems}`;
    }
}

// Initialize pagination system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PaginationSystem(100, 12);
});
