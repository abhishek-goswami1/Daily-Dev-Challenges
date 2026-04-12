class ImageGallery {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.imageCounter = document.getElementById('imageCounter');
        this.imageTitle = document.getElementById('imageTitle');
        this.thumbnailsContainer = document.getElementById('thumbnails');
        
        this.init();
    }

    init() {
        this.gatherImages();
        this.createThumbnails();
        this.setupKeyboardNavigation();
    }

    gatherImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            this.images.push({
                src: img.src,
                alt: img.alt,
                index: index
            });
        });
    }

    createThumbnails() {
        this.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => this.openLightbox(index));
            
            this.thumbnailsContainer.appendChild(thumbnail);
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        const image = this.images[index];
        
        this.lightboxImage.src = image.src;
        this.lightboxImage.alt = image.alt;
        this.imageCounter.textContent = `${index + 1} / ${this.images.length}`;
        this.imageTitle.textContent = image.alt;
        
        this.lightbox.classList.add('active');
        this.updateActiveThumbnail();
        
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.openLightbox(this.currentIndex);
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.openLightbox(this.currentIndex);
    }

    updateActiveThumbnail() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === this.currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            if (e.key === 'ArrowRight') this.nextImage();
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'Escape') this.closeLightbox();
        });
    }
}

// Global functions for onclick handlers
let gallery;

function openLightbox(index) {
    if (!gallery) gallery = new ImageGallery();
    gallery.openLightbox(index);
}

function closeLightbox() {
    if (gallery) gallery.closeLightbox();
}

function nextImage() {
    if (gallery) gallery.nextImage();
}

function prevImage() {
    if (gallery) gallery.prevImage();
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    gallery = new ImageGallery();
});

// Close lightbox when clicking outside the image
document.addEventListener('click', (e) => {
    if (gallery && e.target.id === 'lightbox') {
        gallery.closeLightbox();
    }
});
