document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    const glare = document.getElementById('glare');
    const scene = document.querySelector('.scene');

    // Handle mouse movement over the scene
    scene.addEventListener('mousemove', (e) => {
        const rect = scene.getBoundingClientRect();
        
        // Calculate mouse position relative to the card's center (-1 to 1)
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        // Rotate the card (max rotation of 15 degrees)
        const rotateX = deltaY * -15; 
        const rotateY = deltaX * 15;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Handle Glare Effect
        glare.style.opacity = '1';
        
        // Calculate glare position based on cursor
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        
        glare.style.transform = `translate(${glareX}%, ${glareY}%)`;
        // Use background position to move the gradient
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`;
    });

    // Reset card when mouse leaves
    scene.addEventListener('mouseleave', () => {
        // Add a smooth transition class for the reset
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        
        glare.style.transition = 'opacity 0.5s ease';
        glare.style.opacity = '0';
        
        // Remove the transition after it completes so normal movement is snappy
        setTimeout(() => {
            card.style.transition = 'transform 0.1s ease';
            glare.style.transition = 'opacity 0.1s ease';
        }, 500);
    });
    
    // Add enter transition removal
    scene.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
        glare.style.transition = 'opacity 0.1s ease';
    });
});
