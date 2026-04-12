const loadBtn = document.getElementById('loadBtn');
const statusText = document.getElementById('statusText');

loadBtn.addEventListener('click', () => {
    statusText.textContent = 'Loading content...';
    loadBtn.disabled = true;

    setTimeout(() => {
        statusText.textContent = 'Content loaded successfully!';
        loadBtn.disabled = false;
    }, 1800);
});
