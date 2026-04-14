// Gradient Text Effects JavaScript

const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const speedInput = document.getElementById('speed');
const generatedText = document.getElementById('generatedText');

function updateGradient() {
    const color1 = color1Input.value;
    const color2 = color2Input.value;
    const speed = speedInput.value;

    const gradient = `linear-gradient(90deg, ${color1}, ${color2}, ${color1})`;
    generatedText.style.background = gradient;
    generatedText.style.backgroundSize = '200% 100%';
    generatedText.style.backgroundClip = 'text';
    generatedText.style.WebkitBackgroundClip = 'text';
    generatedText.style.WebkitTextFillColor = 'transparent';
    generatedText.style.animation = `gradientFlow ${6 - speed}s ease infinite`;
}

color1Input.addEventListener('change', updateGradient);
color2Input.addEventListener('change', updateGradient);
speedInput.addEventListener('input', updateGradient);

// Initialize
updateGradient();

// Log messages for interaction feedback
console.log('Gradient Text Effects loaded!');
console.log('Try changing the colors and speed!');
