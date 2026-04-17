// GSAP Animations for Hero Section

// Initialize animations on page load
window.addEventListener('load', () => {
    animateHeroOnLoad();
    animateShapes();
    animateScrollIndicator();
});

/**
 * Hero content animation on page load
 * Animates title, subtitle, and buttons with staggered timing
 */
function animateHeroOnLoad() {
    const timeline = gsap.timeline();

    // Animate title
    timeline.from('.hero-title', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power2.out'
    })
    // Animate subtitle (overlaps with title)
    .from('.hero-subtitle', {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power2.out'
    }, '-=0.6')
    // Animate buttons
    .from('.btn', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: 'power2.out',
        stagger: 0.2
    }, '-=0.4');
}

/**
 * Animate background shapes with floating effect
 * Creates a subtle, continuous animation
 */
function animateShapes() {
    // Shape 1 animation
    gsap.to('.shape-1', {
        duration: 8,
        x: 50,
        y: -50,
        rotation: 360,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Shape 2 animation
    gsap.to('.shape-2', {
        duration: 10,
        x: -50,
        y: 50,
        rotation: -360,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Shape 3 animation
    gsap.to('.shape-3', {
        duration: 9,
        x: 30,
        y: -30,
        rotation: 360,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

/**
 * Animate scroll indicator
 * Creates a pulsing and bouncing effect for the scroll indicator
 */
function animateScrollIndicator() {
    // Pulse animation for the entire indicator
    gsap.to('.scroll-indicator', {
        duration: 2,
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Bounce animation for the wheel inside the mouse
    gsap.to('.wheel', {
        duration: 1.5,
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

/**
 * Handle primary button click
 * Animates button and shows a notification
 */
function handlePrimaryClick() {
    // Animate the button
    gsap.to('.btn-primary', {
        duration: 0.3,
        scale: 0.95,
        ease: 'power2.out',
        onComplete: () => {
            gsap.to('.btn-primary', {
                duration: 0.3,
                scale: 1,
                ease: 'elastic.out(1, 0.3)'
            });
        }
    });

    // Show alert
    showNotification('Getting started... Welcome aboard! 🚀');
}

/**
 * Handle secondary button click
 * Trigger scroll animation
 */
function handleSecondaryClick() {
    // Animate button
    gsap.to('.btn-secondary', {
        duration: 0.3,
        scale: 0.95,
        ease: 'power2.out',
        onComplete: () => {
            gsap.to('.btn-secondary', {
                duration: 0.3,
                scale: 1,
                ease: 'elastic.out(1, 0.3)'
            });
        }
    });

    // Smooth scroll to content section
    gsap.to(window, {
        duration: 1.5,
        scrollTo: ".content-section",
        ease: "power2.inOut"
    });
}

/**
 * Show notification feedback
 * Creates a temporary notification message
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        letter-spacing: 0.5px;
    `;

    document.body.appendChild(notification);

    // Animate notification in
    gsap.from(notification, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: 'power2.out'
    });

    // Remove notification after 3 seconds
    setTimeout(() => {
        gsap.to(notification, {
            duration: 0.5,
            opacity: 0,
            y: -20,
            ease: 'power2.in',
            onComplete: () => {
                notification.remove();
            }
        });
    }, 3000);
}

/**
 * Animate elements on scroll
 * Uses ScrollTrigger for intersection-based animations
 */
gsap.registerPlugin(ScrollTrigger);

// Animate feature cards on scroll
gsap.utils.toArray('.feature-card').forEach((card) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        ease: 'power2.out'
    });
});

// Animate content section text on scroll
gsap.from('.content-section h2', {
    scrollTrigger: {
        trigger: '.content-section',
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
    },
    duration: 0.8,
    opacity: 0,
    x: -50,
    ease: 'power2.out'
});

gsap.from('.content-section p', {
    scrollTrigger: {
        trigger: '.content-section',
        start: "top 70%",
        end: "top 10%",
        toggleActions: "play none none reverse"
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power2.out',
    delay: 0.2
});

// Handle mouse move parallax effect
document.addEventListener('mousemove', (e) => {
    if (window.innerHeight < window.scrollY + 100) return;

    const shapes = document.querySelectorAll('.shape');
    const x = (e.clientX / window.innerWidth) * 10;
    const y = (e.clientY / window.innerHeight) * 10;

    shapes.forEach((shape, index) => {
        gsap.to(shape, {
            duration: 0.5,
            x: x * (index + 1),
            y: y * (index + 1),
            ease: 'power2.out'
        });
    });
});
