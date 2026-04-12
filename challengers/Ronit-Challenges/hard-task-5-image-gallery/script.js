// Gallery and Lightbox Management
let currentImageIndex = 0;
let visibleImages = [];

// Initialize Gallery
document.addEventListener('DOMContentLoaded', () => {
    setupGalleryClickListeners();
    setupLightboxControls();
});

function setupGalleryClickListeners() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
}

function setupLightboxControls() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', previousImage);
    nextBtn.addEventListener('click', nextImage);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}

function getVisibleImages() {
    return Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
}

function openLightbox(index) {
    visibleImages = getVisibleImages();
    
    // Find the index of the clicked image in visible images
    const clickedItem = document.querySelectorAll('.gallery-item')[index];
    currentImageIndex = visibleImages.indexOf(clickedItem);

    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('open');
    displayImage(currentImageIndex);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function displayImage(index) {
    if (visibleImages.length === 0) return;

    // Wrap around
    if (index < 0) {
        currentImageIndex = visibleImages.length - 1;
    } else if (index >= visibleImages.length) {
        currentImageIndex = 0;
    } else {
        currentImageIndex = index;
    }

    const image = visibleImages[currentImageIndex].querySelector('img');
    const caption = visibleImages[currentImageIndex].querySelector('.overlay-text');

    document.getElementById('lightbox-image').src = image.src;
    document.getElementById('lightbox-caption').textContent = caption.textContent;
}

function nextImage() {
    displayImage(currentImageIndex + 1);
}

function previousImage() {
    displayImage(currentImageIndex - 1);
}

// Filter Gallery
function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter items
    galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });

    // Close lightbox if it's open
    if (document.getElementById('lightbox').classList.contains('open')) {
        closeLightbox();
    }
}

console.log('Image Gallery Loaded');
