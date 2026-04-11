const form = document.getElementById('signupForm');
const message = document.getElementById('message');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name').trim();
    const email = data.get('email').trim();
    const password = data.get('password').trim();

    if (!name || !email || !password) {
        setMessage('Please fill in all fields.', 'error');
        return;
    }

    if (!validateEmail(email)) {
        setMessage('Please enter a valid email address.', 'error');
        return;
    }

    if (password.length < 6) {
        setMessage('Password must be at least 6 characters.', 'error');
        return;
    }

    setMessage('Your form has been submitted successfully!', 'success');
    form.reset();
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
}
