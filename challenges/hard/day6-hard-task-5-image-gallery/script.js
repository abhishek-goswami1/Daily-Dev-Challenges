// Sample image data
const images = [
    {
        id: 1,
        title: 'Mountain Vista',
        description: 'Beautiful mountain landscape with clear skies',
        category: 'nature',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        title: 'City Lights',
        description: 'Urban skyline at night with vibrant lights',
        category: 'urban',
        url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        title: 'Wild Lion',
        description: 'Majestic lion in natural habitat',
        category: 'animals',
        url: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        title: 'Delicious Burger',
        description: 'Mouth-watering gourmet burger',
        category: 'food',
        url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        title: 'Forest Path',
        description: 'Serene forest trail surrounded by trees',
        category: 'nature',
        url: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37cf0?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        title: 'Modern Building',
        description: 'Contemporary architecture and design',
        category: 'urban',
        url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        title: 'Cute Puppy',
        description: 'Adorable golden retriever puppy',
        category: 'animals',
        url: 'https://images.unsplash.com/photo-1633722715463-d30628519b96?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        title: 'Fresh Salad',
        description: 'Healthy and colorful vegetable salad',
        category: 'food',
        url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    }
];

let filteredImages = images;
let currentImageIndex = 0;

const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Render gallery
function renderGallery(images) {
    gallery.innerHTML = '';
    
    if (images.length === 0) {
        gallery.innerHTML = '<div class="no-images">No images found</div>';
        return;
    }

    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${image.url}" alt="${image.title}">
            <div class="gallery-item-info">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
                <span class="category-badge">${image.category}</span>
            </div>
        `;
        
        item.addEventListener('click', () => openLightbox(index, images));
        gallery.appendChild(item);
    });
}

// Open lightbox
function openLightbox(index, images) {
    filteredImages = images;
    currentImageIndex = index;
    const image = images[index];
    
    lightboxImg.src = image.url;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    lightbox.classList.add('active');
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

// Navigate lightbox
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    openLightbox(currentImageIndex, filteredImages);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    openLightbox(currentImageIndex, filteredImages);
}

// Search and filter
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    
    filteredImages = images.filter(image => {
        const matchSearch = image.title.toLowerCase().includes(searchTerm) ||
                           image.description.toLowerCase().includes(searchTerm);
        const matchCategory = category === '' || image.category === category;
        
        return matchSearch && matchCategory;
    });
    
    renderGallery(filteredImages);
}

// Event listeners
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Close lightbox when clicking outside
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    }
});

// Initial render
renderGallery(images);
