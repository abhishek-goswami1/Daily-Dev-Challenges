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
    
    fullscreenSpinner.addEventListener('click', (e) => {
        if (e.target === fullscreenSpinner) {
            fullscreenSpinner.classList.add('hidden');
        }
    });
});
