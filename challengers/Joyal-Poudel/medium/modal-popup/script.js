// Modal Configuration
const modalTemplates = {
    info: {
        title: 'Information',
        description: 'This is a premium information modal. It uses a sleek design system with smooth scale animations and a backdrop blur effect.',
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
        iconClass: 'info',
        actions: [
            { text: 'Understand', class: 'btn-primary', action: 'close' }
        ]
    },
    success: {
        title: 'Task Completed',
        description: 'Your changes have been saved successfully. The system has updated all relevant records in the background.',
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        iconClass: 'success',
        actions: [
            { text: 'Great stuff', class: 'btn-primary', action: 'close' }
        ]
    },
    delete: {
        title: 'Confirm Deletion',
        description: 'Are you sure you want to delete this resource? This action is permanent and cannot be undone.',
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
        iconClass: 'danger',
        actions: [
            { text: 'Yes, Delete', class: 'btn-danger', action: 'delete' },
            { text: 'Cancel', class: 'btn-ghost', action: 'close' }
        ]
    },
    custom: {
        title: 'Elite Modal System',
        description: 'You can easily customize this modal to fit any purpose. It supports dynamic content injection and custom action buttons.',
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
        iconClass: 'secondary',
        actions: [
            { text: 'Custom Action', class: 'btn-primary', action: 'custom' },
            { text: 'Dismiss', class: 'btn-ghost', action: 'close' }
        ]
    }
};

// DOM Elements
const overlay = document.getElementById('modalOverlay');
const contentArea = document.getElementById('modalContent');
const footerArea = document.getElementById('modalFooter');
const closeIcon = document.getElementById('closeModal');
const triggerBtns = document.querySelectorAll('.trigger-btn');

// Modal Manager
const ModalManager = {
    open(type) {
        const config = modalTemplates[type];
        if (!config) return;

        // Render Content
        contentArea.innerHTML = `
            <div class="modal-content-inner">
                <div class="modal-icon-header icon-circle ${config.iconClass}">
                    ${config.icon}
                </div>
                <h2>${config.title}</h2>
                <p>${config.description}</p>
            </div>
        `;

        // Render Buttons
        footerArea.innerHTML = '';
        config.actions.forEach(btn => {
            const button = document.createElement('button');
            button.className = `modal-btn ${btn.class}`;
            button.innerText = btn.text;
            button.onclick = () => {
                if (btn.action === 'close') this.close();
                else {
                    console.log(`Action: ${btn.action}`);
                    this.close();
                }
            };
            footerArea.appendChild(button);
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
