// GSAP Animations for Hero Section

// Create a timeline for hero animations
const heroTimeline = gsap.timeline();

// Animate hero title with stagger
heroTimeline.from('.hero-title', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power3.out'
}, 0);

// Animate hero subtitle
heroTimeline.from('.hero-subtitle', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
}, 0.2);

// Animate CTA button
heroTimeline.from('.cta-button', {
    duration: 0.8,
    scale: 0,
    opacity: 0,
    ease: 'back.out(1.7)'
}, 0.4);

// Animate shapes with floating effect
gsap.to('.shape-1', {
    duration: 4,
    y: -20,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.shape-2', {
    duration: 5,
    x: 30,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5
});

gsap.to('.shape-3', {
    duration: 6,
    rotation: 360,
    repeat: -1,
    ease: 'none'
});

// Navbar animation on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        gsap.to('.navbar', {
            duration: 0.3,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        });
    } else {
        gsap.to('.navbar', {
            duration: 0.3,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            boxShadow: 'none'
        });
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// Feature cards animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            gsap.from(entry.target, {
                duration: 0.8,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Button hover animation
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('mouseenter', () => {
    gsap.to('.cta-button', {
        duration: 0.4,
        scale: 1.05,
        boxShadow: '0 40px 80px rgba(59, 130, 246, 0.5)'
    });
});

ctaButton.addEventListener('mouseleave', () => {
    gsap.to('.cta-button', {
        duration: 0.4,
        scale: 1,
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
    });
});

// Ripple effect on button click
ctaButton.addEventListener('click', function(e) {
    const x = e.clientX - this.getBoundingClientRect().left;
    const y = e.clientY - this.getBoundingClientRect().top;
    
    const ripple = document.createElement('span');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    gsap.to(ripple, {
        duration: 0.6,
        scale: 4,
        opacity: 0,
        ease: 'power2.out'
    });
});
