// Get all modal elements
const modals = document.querySelectorAll('.modal');
const openButtons = document.querySelectorAll('[id^="openModal"]');
const closeButtons = document.querySelectorAll('.close');
const modalButtons = document.querySelectorAll('.modal-btn');

// Open modal
openButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.id.replace('open', '');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    });
});

// Close modal
function closeModal(modalElement) {
    modalElement.classList.remove('active');
}

// Close button functionality
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        closeModal(modal);
    });
});

// Modal button click (close button inside modal)
modalButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        e.preventDefault();
        closeModal(modal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                closeModal(modal);
            }
        });
    }
});

// Handle form submission
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing!');
        const modal = form.closest('.modal');
        closeModal(modal);
        form.reset();
    });
});
