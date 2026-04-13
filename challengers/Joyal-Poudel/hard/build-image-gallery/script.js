const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const imageInfo = document.getElementById('imageInfo');
const closeLightbox = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const searchInput = document.getElementById('searchInput');
const spinner = document.getElementById('spinner');
const viewButtons = document.querySelectorAll('.view-btn');

let currentImageIndex = 0;
let filteredImages = [];
let allImages = [];

// Sample images from Unsplash
const imageApiUrl = 'https://api.unsplash.com/search/photos?';
const apiKey = 'YOUR_UNSPLASH_API_KEY'; // Use a free API or mock data

// Mock image data (for demonstration)
// Gallery State
let currentImages = [];
let currentIndex = 0;

// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lbImage = document.getElementById('lbImage');
const lbTitle = document.getElementById('lbTitle');
const lbCategory = document.getElementById('lbCategory');
const lbClose = document.querySelector('.lb-close');
const lbPrev = document.querySelector('.lb-prev');
const lbNext = document.querySelector('.lb-next');

// Initialize
function init() {
    setupFilters();
    setupLightbox();
}

function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 400);
                }
            });
        });
    });
}

function setupLightbox() {
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Update current list for navigation (only visible ones)
            const visibleItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
            currentImages = visibleItems.map(i => ({
                src: i.querySelector('img').src,
                title: i.querySelector('h3').innerText,
                category: i.querySelector('.category-tag').innerText
            }));
            
            currentIndex = currentImages.findIndex(img => img.src === item.querySelector('img').src);
            openLightbox();
        });
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', prevImage);
    lbNext.addEventListener('click', nextImage);

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

function openLightbox() {
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxContent();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxContent();
}

init();

// Search functionality
function handleSearch(query) {
    query = query.toLowerCase();
    
    if (query === '') {
        filteredImages = [...allImages];
    } else {
        filteredImages = allImages.filter(image => 
            image.title.toLowerCase().includes(query) ||
            image.alt.toLowerCase().includes(query)
        );
    }
    
    renderGallery();
}

// View switcher
function switchView(view) {
    viewButtons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-btn').classList.add('active');
    
    if (view === 'masonry') {
        gallery.classList.add('masonry');
    } else {
        gallery.classList.remove('masonry');
    }
}

// Event listeners
closeLightbox.addEventListener('click', closeLightboxModal);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);
searchInput.addEventListener('input', (e) => handleSearch(e.target.value));

viewButtons.forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'Escape') closeLightboxModal();
});

// Click outside lightbox to close
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxModal();
    }
});

// Initialize on load
window.addEventListener('load', () => {
    spinner.classList.remove('show');
    init();
});

// Show spinner initially
spinner.classList.add('show');
