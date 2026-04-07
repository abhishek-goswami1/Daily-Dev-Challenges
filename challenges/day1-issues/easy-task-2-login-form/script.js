const form = document.getElementById('login-form');
const messageEl = document.getElementById('message');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
        showMessage('Please fill in both email and password.', true);
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        showMessage('Please enter a valid email address.', true);
        return;
    }

    if (password.length < 8) {
        showMessage('Password must be at least 8 characters.', true);
        return;
    }

    showMessage('Login successful! You are ready to continue.', false);
    form.reset();
});

function showMessage(text, isError) {
    messageEl.textContent = text;
    messageEl.className = `message${isError ? ' error' : ''}`;
}
