function simulateLoading() {
    const loadBtn = document.querySelector('.load-btn');
    const loadingDemo = document.getElementById('loadingDemo');
    const loadingText = document.getElementById('loadingText');

    loadBtn.disabled = true;
    loadingDemo.classList.add('show');
    loadingText.textContent = 'Loading...';

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        loadingText.textContent = `Loading... ${Math.floor(progress)}%`;
    }, 200);

    setTimeout(() => {
        clearInterval(interval);
        loadingText.textContent = 'Loading Complete! ✓';
        loadBtn.disabled = false;

        setTimeout(() => {
            loadingDemo.classList.remove('show');
        }, 1500);
    }, 3000);
}
