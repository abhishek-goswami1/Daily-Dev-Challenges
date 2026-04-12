// Modal Management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
        resetForm();
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        const modal = e.target;
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.open');
        modals.forEach(modal => {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    }
});

// Form Validation
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Clear previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';

    // Validate Full Name
    if (fullName.length < 3) {
        document.getElementById('nameError').textContent = 'Name must be at least 3 characters';
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Validate Subject
    if (subject.length < 5) {
        alert('Subject must be at least 5 characters');
        isValid = false;
    }

    // Validate Message
    if (message.length < 10) {
        alert('Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

// Handle Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
}

// Submit Form
function submitForm() {
    if (validateForm()) {
        const fullName = document.getElementById('fullName').value;
        alert(`Thank you ${fullName}! Your message has been sent successfully.`);
        closeModal('formModal');
    }
}

// Reset Form
function resetForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
    }
}

// Confirm Action
function confirmAction() {
    alert('✅ Action confirmed successfully!');
    closeModal('confirmModal');
}

// Initialize
console.log('Modal Popup Demo Loaded');
