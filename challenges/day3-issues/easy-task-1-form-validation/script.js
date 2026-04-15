const form = document.getElementById('validationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const phone = document.getElementById('phone');
const successMessage = document.getElementById('successMessage');

// Validation rules
const validators = {
    username: (value) => {
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (value.length > 20) return 'Username must not exceed 20 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return '';
    },
    email: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) return 'Please enter a valid email address';
        return '';
    },
    password: (value) => {
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        return '';
    },
    confirmPassword: (value) => {
        if (value !== password.value) return 'Passwords do not match';
        return '';
    },
    phone: (value) => {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(value)) return 'Please enter a valid phone number';
        return '';
    }
};

// Real-time validation
Object.keys(validators).forEach(fieldName => {
    const field = document.getElementById(fieldName);
    field.addEventListener('blur', () => validateField(fieldName));
    field.addEventListener('input', () => {
        const errorElement = document.getElementById(`${fieldName}Error`);
        if (field.classList.contains('success')) {
            validateField(fieldName);
        }
    });
});

function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);
    const validator = validators[fieldName];
    const error = validator(field.value);

    if (error) {
        field.classList.remove('success');
        field.classList.add('error');
        errorElement.textContent = error;
        return false;
    } else {
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.textContent = '';
        return true;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = ['username', 'email', 'password', 'confirmPassword', 'phone'];
    let allValid = true;

    fields.forEach(fieldName => {
        if (!validateField(fieldName)) {
            allValid = false;
        }
    });

    if (allValid) {
        successMessage.textContent = '✓ Form submitted successfully!';
        form.reset();
        Object.keys(validators).forEach(fieldName => {
            document.getElementById(fieldName).classList.remove('success', 'error');
        });
        setTimeout(() => {
            successMessage.textContent = '';
        }, 3000);
    }
});
