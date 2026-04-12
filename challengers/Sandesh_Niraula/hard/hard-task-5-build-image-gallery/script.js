// Sample gallery data
const galleryData = [
    { id: 1, title: 'Mountain Landscape', desc: 'Beautiful mountain scenery', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
    { id: 2, title: 'Ocean Sunset', desc: 'Peaceful sunset by the ocean', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop' },
    { id: 3, title: 'Forest Path', desc: 'Serene forest pathway', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
    { id: 4, title: 'Desert Sand', desc: 'Golden desert dunes', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop' },
    { id: 5, title: 'City Lights', desc: 'Urban nightscape', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
    { id: 6, title: 'Waterfall', desc: 'Flowing waterfall', image: 'https://images.unsplash.com/photo-1486299967070-3dd119e75b65?w=400&h=300&fit=crop' },
    { id: 7, title: 'Starry Sky', desc: 'Night sky with stars', image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop' },
    { id: 8, title: 'Northern Lights', desc: 'Aurora borealis', image: 'https://images.unsplash.com/photo-1473496169865-658ba7c44d8a?w=400&h=300&fit=crop' },
    { id: 9, title: 'Tropical Beach', desc: 'Paradise beach', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' },
    { id: 10, title: 'Snow Peak', desc: 'Snowy mountain top', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
];

let currentView = 'grid';
let filteredData = [...galleryData];
let currentImageIndex = 0;

// DOM Elements
const galleryContainer = document.getElementById('galleryContainer');
const searchInput = document.getElementById('searchInput');
const viewBtns = document.querySelectorAll('.view-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// Event Listeners
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filteredData = galleryData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
    );
    renderGallery();
});

viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        viewBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentView = e.target.dataset.view;
        updateGalleryLayout();
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPreviousImage);
lightboxNext.addEventListener('click', showNextImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') showPreviousImage();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'Escape') closeLightbox();
});

// Functions
function renderGallery() {
    galleryContainer.innerHTML = '';

    filteredData.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'gallery-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="gallery-item-image" onerror="this.src='https://via.placeholder.com/400x300?text=${item.title}'">
            <div class="gallery-item-overlay">View</div>
            <div class="gallery-item-info">
                <div class="gallery-item-title">${item.title}</div>
                <div class="gallery-item-desc">${item.desc}</div>
            </div>
        `;

        itemEl.addEventListener('click', () => openLightbox(item, index));
        galleryContainer.appendChild(itemEl);
    });
}

function updateGalleryLayout() {
    galleryContainer.classList.remove('masonry-layout', 'list-layout');

    if (currentView === 'masonry') {
        galleryContainer.classList.add('masonry-layout');
    } else if (currentView === 'list') {
        galleryContainer.classList.add('list-layout');
    }
}

function openLightbox(item, index) {
    currentImageIndex = index;
    lightboxImage.src = item.image;
    lightboxImage.onerror = function() {
        this.src = `https://via.placeholder.com/600x400?text=${item.title}`;
    };
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredData.length) % filteredData.length;
    const item = filteredData[currentImageIndex];
    openLightbox(item, currentImageIndex);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredData.length;
    const item = filteredData[currentImageIndex];
    openLightbox(item, currentImageIndex);
}

// Initial render
renderGallery();
