// Open Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }
});

// Form submission
function submitForm() {
    const form = document.getElementById('contactForm');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name.trim() && email.trim() && message.trim()) {
        alert(`Thank you ${name}! Your message has been sent to ${email}.`);
        form.reset();
        closeModal('formModal');
    } else {
        alert('Please fill in all fields.');
    }
}

// Confirm action
function confirmAction() {
    alert('Action confirmed! Item has been deleted.');
    closeModal('confirmModal');
}
