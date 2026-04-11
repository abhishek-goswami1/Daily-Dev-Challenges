const openModal1 = document.getElementById('openModal1');
const openModal2 = document.getElementById('openModal2');
const openModal3 = document.getElementById('openModal3');
const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');
const modal3 = document.getElementById('modal3');
const closeButtons = document.querySelectorAll('.close');
const confirmBtn = document.getElementById('confirmBtn');
const subscribeForm = document.getElementById('subscribeForm');
const messageDiv = document.getElementById('message');

// Open modals
openModal1.addEventListener('click', () => openModal(modal1));
openModal2.addEventListener('click', () => openModal(modal2));
openModal3.addEventListener('click', () => openModal(modal3));

// Close buttons
closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modalId = e.target.getAttribute('data-modal');
        closeModal(document.getElementById(modalId));
    });
});

// Close button functionality
document.querySelectorAll('[data-modal]').forEach(btn => {
    if (!btn.classList.contains('close')) {
        btn.addEventListener('click', (e) => {
            const modalId = e.target.getAttribute('data-modal');
            closeModal(document.getElementById(modalId));
        });
    }
});

// Confirmation button
confirmBtn.addEventListener('click', () => {
    showMessage('Action confirmed successfully!', 'success');
    closeModal(modal2);
});

// Form submission
subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (name && email) {
        showMessage(`Thank you ${name}! We've sent a confirmation to ${email}.`, 'success');
        subscribeForm.reset();
        closeModal(modal3);
    } else {
        showMessage('Please fill in all fields', 'error');
    }
});

// Modal functions
function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal1) closeModal(modal1);
    if (e.target === modal2) closeModal(modal2);
    if (e.target === modal3) closeModal(modal3);
});

// Show message
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = `message ${type}`;
    setTimeout(() => {
        messageDiv.className = 'message';
        messageDiv.textContent = '';
    }, 4000);
}

// Escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(modal1);
        closeModal(modal2);
        closeModal(modal3);
    }
});
