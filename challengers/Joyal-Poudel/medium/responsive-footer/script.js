// Smooth scroll behavior for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMsg = document.getElementById('newsletterMsg');
const newsletterSubmit = document.getElementById('newsletterSubmit');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterEmail.value.trim();
    if (!validateEmail(email)) {
        showMsg('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate API call
    newsletterSubmit.disabled = true;
    newsletterSubmit.innerHTML = `<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>`;
    
    setTimeout(() => {
        showMsg('Success! You are now subscribed.', 'success');
        newsletterEmail.value = '';
        newsletterSubmit.disabled = false;
        newsletterSubmit.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
    }, 1500);
});

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function showMsg(text, type) {
    newsletterMsg.innerText = text;
    newsletterMsg.className = `form-msg ${type}`;
    
    setTimeout(() => {
        newsletterMsg.innerText = '';
        newsletterMsg.className = 'form-msg';
    }, 4000);
}

// Add animation on scroll for footer columns
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cols = entry.target.querySelectorAll('.footer-col');
            cols.forEach((col, index) => {
                setTimeout(() => {
                    col.classList.add('animate-in');
                }, index * 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const footerGrid = document.querySelector('.footer-grid');
if (footerGrid) observer.observe(footerGrid);

// Year in footer
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year if needed
    const year = new Date().getFullYear();
    const footers = document.querySelectorAll('.footer-bottom-content p');
    footers.forEach(footer => {
        if (footer.textContent.includes('2024')) {
            footer.innerHTML = footer.innerHTML.replace('2024', year);
        }
    });
});

// Add scroll animation for footer sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.footer-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(10px)';
    section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(section);
});
