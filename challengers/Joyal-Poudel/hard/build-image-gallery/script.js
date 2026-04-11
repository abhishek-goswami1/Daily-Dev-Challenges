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
const mockImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop', alt: 'Mountain landscape', title: 'Mountain Landscape' },
    { id: 2, url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=300&fit=crop', alt: 'Ocean waves', title: 'Ocean Waves' },
    { id: 3, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop', alt: 'Forest trees', title: 'Forest Trees' },
    { id: 4, url: 'https://images.unsplash.com/photo-1493514789a586cb23453c3117291f58?w=300&h=300&fit=crop', alt: 'Sunset view', title: 'Sunset View' },
    { id: 5, url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop', alt: 'Beach coast', title: 'Beach Coast' },
    { id: 6, url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe3e?w=300&h=300&fit=crop', alt: 'Green grass field', title: 'Green Field' },
    { id: 7, url: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=300&h=300&fit=crop', alt: 'Autumn leaves', title: 'Autumn Leaves' },
    { id: 8, url: 'https://images.unsplash.com/photo-1426604342505-ed27cb9c0403?w=300&h=300&fit=crop', alt: 'Snowy mountains', title: 'Snowy Mountains' },
    { id: 9, url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=300&h=300&fit=crop', alt: 'Desert sand', title: 'Desert Sand' },
    { id: 10, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop', alt: 'Starry night', title: 'Starry Night' },
    { id: 11, url: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=300&h=300&fit=crop', alt: 'City skyline', title: 'City Skyline' },
    { id: 12, url: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=300&h=300&fit=crop', alt: 'Purple flowers', title: 'Purple Flowers' },
];

// Initialize gallery
function init() {
    allImages = mockImages;
    filteredImages = [...allImages];
    renderGallery();
}

// Render gallery
function renderGallery() {
    gallery.innerHTML = '';
    
    if (filteredImages.length === 0) {
        gallery.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No images found</p>';
        return;
    }

    filteredImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${image.url}" alt="${image.alt}" loading="lazy">
            <div class="gallery-item-overlay">
                <i class="fas fa-expand overlay-icon"></i>
                <i class="fas fa-heart overlay-icon"></i>
            </div>
        `;
        
        item.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(item);
    });
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const image = filteredImages[index];
    lightboxImg.src = image.url;
    lightboxCaption.textContent = image.title;
    imageInfo.textContent = `${index + 1} of ${filteredImages.length}`;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightboxModal() {
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Navigation
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    openLightbox(currentImageIndex);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    openLightbox(currentImageIndex);
}

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
