class ModalManager {
    constructor() {
        this.initializeModals();
    }

    initializeModals() {
        // Get all modals
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.close-btn');
            const overlay = modal.querySelector('.modal-overlay');

            // Close button
            closeBtn.addEventListener('click', () => {
                this.close(modal.id);
            });

            // Click outside to close
            overlay.addEventListener('click', () => {
                this.close(modal.id);
            });
        });

        // Keyboard support (ESC to close)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.open');
                if (openModal) {
                    this.close(openModal.id);
                }
            }
        });
    }

    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    close(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto'; // Allow scrolling
        }
    }
}

// Initialize modal manager
const modalManager = new ModalManager();

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    // Form is already filled by user, validation happens on submit
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show success message
    const originalContent = form.parentElement;
    const successHtml = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 3em; margin-bottom: 10px;">✓</div>
            <h3 style="color: #38ef7d; margin-bottom: 10px;">Message Sent!</h3>
            <p style="color: #666;">Thank you for your message. We'll get back to you soon.</p>
        </div>
    `;
    
    originalContent.innerHTML = successHtml;

    setTimeout(() => {
        modalManager.close('modal2');
        // Reset form
        form.reset();
        originalContent.innerHTML = `<form id="contactForm" onsubmit="handleFormSubmit(event)">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required>
            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" placeholder="Your message here..." rows="4" required></textarea>
            </div>
        </form>`;
    }, 2000);
}

function handleConfirmation() {
    const modal = document.getElementById('modal3');
    const body = modal.querySelector('.modal-body');
    
    body.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 3em; margin-bottom: 10px;">✓</div>
            <p style="color: #38ef7d; font-weight: 600; font-size: 1.1em;">Action Confirmed!</p>
            <p style="color: #666; margin-top: 10px;">The requested action has been completed successfully.</p>
        </div>
    `;

    setTimeout(() => {
        // Reset content
        body.innerHTML = `
            <p>Are you sure you want to proceed with this action? This operation cannot be undone.</p>
        `;
        modalManager.close('modal3');
    }, 2000);
}
