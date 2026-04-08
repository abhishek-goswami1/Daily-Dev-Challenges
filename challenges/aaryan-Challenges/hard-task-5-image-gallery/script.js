class ImageGallery {
    constructor() {
        this.images = [
            { id: 1, title: 'Mountain Peak', category: 'nature', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' },
            { id: 2, title: 'Sunset Beach', category: 'nature', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop' },
            { id: 3, title: 'Forest Trail', category: 'nature', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop' },
            { id: 4, title: 'City Lights', category: 'urban', url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop' },
            { id: 5, title: 'Street Art', category: 'urban', url: 'https://images.unsplash.com/photo-1499209974033-bc21a15fa79d?w=400&h=400&fit=crop' },
            { id: 6, title: 'Urban Architecture', category: 'urban', url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=400&fit=crop' },
            { id: 7, title: 'Abstract Colors', category: 'abstract', url: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop' },
            { id: 8, title: 'Geometric Design', category: 'abstract', url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop' },
            { id: 9, title: 'Digital Art', category: 'abstract', url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop' },
            { id: 10, title: 'Lion Portrait', category: 'animals', url: 'https://images.unsplash.com/photo-1569163139706-5f9f62cfe0b5?w=400&h=400&fit=crop' },
            { id: 11, title: 'Eagle in Flight', category: 'animals', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop' },
            { id: 12, title: 'Underwater World', category: 'animals', url: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400&h=400&fit=crop' }
        ];

        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.currentImageIndex = 0;
        this.filteredImages = [...this.images];

        this.init();
    }

    init() {
        this.renderGallery();
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.filterGallery();
            });
        });

        // View toggle buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentView = e.target.dataset.view;
                this.updateGalleryView();
            });
        });

        // Lightbox controls
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        const overlay = document.querySelector('.lightbox-overlay');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        closeBtn.addEventListener('click', () => this.closeLightbox());
        overlay.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.previousImage());
        nextBtn.addEventListener('click', () => this.nextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('open')) {
                if (e.key === 'ArrowLeft') this.previousImage();
                if (e.key === 'ArrowRight') this.nextImage();
                if (e.key === 'Escape') this.closeLightbox();
            }
        });
    }

    filterGallery() {
        this.filteredImages = this.currentFilter === 'all' 
            ? [...this.images]
            : this.images.filter(img => img.category === this.currentFilter);
        this.renderGallery();
    }

    renderGallery() {
        const gallery = document.getElementById('gallery');
        const emptyState = document.getElementById('emptyState');

        if (this.filteredImages.length === 0) {
            gallery.innerHTML = '';
            emptyState.classList.add('show');
            return;
        }

        emptyState.classList.remove('show');
        gallery.innerHTML = this.filteredImages.map((img, index) => `
            <div class="gallery-item" onclick="gallery.openLightbox(${index})">
                <img src="${img.url}" alt="${img.title}" loading="lazy">
                <div class="gallery-item-overlay">
                    <div class="gallery-item-title">${img.title}</div>
                    <div class="gallery-item-category">${img.category}</div>
                </div>
            </div>
        `).join('');
    }

    updateGalleryView() {
        const gallery = document.getElementById('gallery');
        gallery.classList.remove('masonry-view');
        if (this.currentView === 'masonry') {
            gallery.classList.add('masonry-view');
        }
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        this.updateLightbox();
        document.getElementById('lightbox').classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        document.getElementById('lightbox').classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    updateLightbox() {
        const img = this.filteredImages[this.currentImageIndex];
        document.getElementById('lightboxImage').src = img.url;
        document.getElementById('lightboxTitle').textContent = img.title;
        document.getElementById('lightboxCategory').textContent = img.category.toUpperCase();
        document.getElementById('currentImage').textContent = this.currentImageIndex + 1;
        document.getElementById('totalImages').textContent = this.filteredImages.length;
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
        this.updateLightbox();
    }

    previousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.updateLightbox();
    }
}

// Initialize gallery
const gallery = new ImageGallery();
