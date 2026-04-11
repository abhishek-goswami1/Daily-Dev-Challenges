document.addEventListener('DOMContentLoaded', () => {
    const demoBtn = document.getElementById('demo-btn');
    const overlay = document.getElementById('loading-overlay');

    demoBtn.addEventListener('click', () => {
        // Show overlay
        overlay.classList.remove('hidden');

        // Automatically hide after 3 seconds
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 3000);
    });

    // Optional: Close overlay on click
    overlay.addEventListener('click', () => {
        overlay.classList.add('hidden');
    });
});
