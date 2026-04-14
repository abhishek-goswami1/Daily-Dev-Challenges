// Search Filter JavaScript

const products = [
    { name: 'Laptop Pro', category: 'Electronics', description: 'Powerful laptop for professionals', price: '$1299', icon: '💻' },
    { name: 'Smartphone X', category: 'Electronics', description: 'Latest smartphone with AI camera', price: '$999', icon: '📱' },
    { name: 'Tablet Plus', category: 'Electronics', description: 'Large display tablet for work', price: '$599', icon: '📱' },
    { name: 'Wireless Headphones', category: 'Audio', description: 'Noise-cancelling headphones', price: '$349', icon: '🎧' },
    { name: 'Smart Watch', category: 'Wearables', description: 'Track your fitness and health', price: '$199', icon: '⌚' },
    { name: 'USB-C Cable', category: 'Accessories', description: 'Fast charging and data transfer', price: '$29', icon: '🔌' },
];

const searchInput = document.getElementById('searchInput');
const productsGrid = document.getElementById('productsGrid');
const resultCount = document.getElementById('resultCount');
const noResults = document.getElementById('noResults');

function renderProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        noResults.style.display = 'block';
        productsGrid.style.display = 'none';
        resultCount.textContent = '0';
        return;
    }

    noResults.style.display = 'none';
    productsGrid.style.display = 'grid';
    resultCount.textContent = productsToShow.length;

    productsToShow.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${product.price}</p>
            </div>
        `;

        productCard.addEventListener('click', () => {
            console.log(`Clicked: ${product.name}`);
        });

        productsGrid.appendChild(productCard);
    });
}

function filterProducts(searchTerm) {
    const lowercaseSearch = searchTerm.toLowerCase().trim();
    
    if (lowercaseSearch === '') {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(lowercaseSearch) ||
        product.category.toLowerCase().includes(lowercaseSearch) ||
        product.description.toLowerCase().includes(lowercaseSearch)
    );

    renderProducts(filtered);
}

searchInput.addEventListener('input', (e) => {
    filterProducts(e.target.value);
});

// Initial render
renderProducts(products);
