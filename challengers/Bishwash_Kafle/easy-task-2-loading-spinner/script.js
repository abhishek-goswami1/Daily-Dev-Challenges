// Toggle fullscreen spinner
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-fullscreen');
    const fullscreenSpinner = document.getElementById('fullscreen-spinner');
    const closeBtn = document.getElementById('close-fullscreen');
    
    toggleBtn.addEventListener('click', () => {
        fullscreenSpinner.classList.remove('hidden');
    });
    
    closeBtn.addEventListener('click', () => {
        fullscreenSpinner.classList.add('hidden');
    });
    
    // Close when clicking outside the modal
    fullscreenSpinner.addEventListener('click', (e) => {
        if (e.target === fullscreenSpinner) {
            fullscreenSpinner.classList.add('hidden');
        }
    });
    
    // Optional: Auto-close after 5 seconds for demo
    // setTimeout(() => {
    //     fullscreenSpinner.classList.add('hidden');
    // }, 5000);
});
