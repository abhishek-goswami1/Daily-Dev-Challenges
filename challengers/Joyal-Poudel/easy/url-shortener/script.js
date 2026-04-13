document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shortener-form');
    const urlInput = document.getElementById('url-input');
    const errorMsg = document.getElementById('error-msg');
    const linksContainer = document.getElementById('links-container');
    const emptyState = document.getElementById('empty-state');
    const clearBtn = document.getElementById('clear-all');
    const submitBtn = document.getElementById('shorten-btn');

    // Load saved links from localStorage
    let savedLinks = JSON.parse(localStorage.getItem('joyal_short_links')) || [];
    renderLinks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = urlInput.value.trim();

        if (isValidUrl(url)) {
            errorMsg.classList.remove('show');
            generateShortUrl(url);
        } else {
            errorMsg.classList.add('show');
        }
    });

    clearBtn.addEventListener('click', () => {
        savedLinks = [];
        saveToLocalStorage();
        renderLinks();
    });

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    function generateShortUrl(originalUrl) {
        // Simulate network request UI
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

        setTimeout(() => {
            // Generate a random string for the short URL
            const randomString = Math.random().toString(36).substring(2, 8);
            const domain = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                ? 'trim.io/' 
                : window.location.hostname + '/';
            
            const shortUrl = `https://${domain}${randomString}`;

            const newLinkInfo = {
                id: Date.now(),
                original: originalUrl,
                short: shortUrl
            };

            savedLinks.unshift(newLinkInfo);
            saveToLocalStorage();
            renderLinks();

            // Reset UI
            urlInput.value = '';
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Shorten</span><i class="fa-solid fa-arrow-right"></i>';
        }, 600); // Fake delay
    }

    function renderLinks() {
        if (savedLinks.length === 0) {
            emptyState.style.display = 'block';
            linksContainer.innerHTML = '';
            linksContainer.appendChild(emptyState);
            return;
        }

        emptyState.style.display = 'none';
        linksContainer.innerHTML = '';

        savedLinks.forEach(link => {
            const linkElement = document.createElement('div');
            linkElement.className = 'link-card';
            linkElement.innerHTML = `
                <div class="link-details">
                    <div class="original-url" title="${link.original}">${link.original}</div>
                    <a href="${link.original}" target="_blank" class="short-url">${link.short}</a>
                </div>
                <div class="link-actions">
                    <button class="action-btn copy-btn" data-url="${link.short}" title="Copy to clipboard">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${link.id}" title="Delete link">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            linksContainer.appendChild(linkElement);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const url = e.currentTarget.getAttribute('data-url');
                navigator.clipboard.writeText(url).then(() => {
                    const icon = e.currentTarget.querySelector('i');
                    icon.className = 'fa-solid fa-check';
                    e.currentTarget.classList.add('copied');
                    
                    setTimeout(() => {
                        icon.className = 'fa-regular fa-copy';
                        e.currentTarget.classList.remove('copied');
                    }, 2000);
                });
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                savedLinks = savedLinks.filter(link => link.id !== id);
                saveToLocalStorage();
                renderLinks();
            });
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('joyal_short_links', JSON.stringify(savedLinks));
    }
});
