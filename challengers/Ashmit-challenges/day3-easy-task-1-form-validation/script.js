class FormValidator {
    constructor() {
        this.form = document.getElementById('validationForm');
        this.successMessage = document.getElementById('successMessage');
        this.fields = {
            fullName: document.getElementById('fullName'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            password: document.getElementById('password'),
            confirmPassword: document.getElementById('confirmPassword'),
            website: document.getElementById('website'),
            terms: document.getElementById('terms')
        };

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.fields.fullName.addEventListener('blur', () => this.validateFullName());
        this.fields.email.addEventListener('blur', () => this.validateEmail());
        this.fields.phone.addEventListener('blur', () => this.validatePhone());
        this.fields.password.addEventListener('input', () => {
            this.validatePassword();
            this.updatePasswordStrength();
        });
        this.fields.confirmPassword.addEventListener('blur', () => this.validateConfirmPassword());
        this.fields.website.addEventListener('blur', () => this.validateWebsite());
        this.fields.terms.addEventListener('change', () => this.validateTerms());
    }

    validateFullName() {
        const value = this.fields.fullName.value.trim();
        const error = document.getElementById('fullNameError');
        
        if (!value) {
            this.showError(this.fields.fullName, 'Full name is required');
            return false;
        }
        if (value.length < 3) {
            this.showError(this.fields.fullName, 'Name must be at least 3 characters');
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
            this.showError(this.fields.fullName, 'Name should only contain letters and spaces');
            return false;
        }
        this.clearError(this.fields.fullName);
        return true;
    }

    validateEmail() {
        const value = this.fields.email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            this.showError(this.fields.email, 'Email is required');
            return false;
        }
        if (!emailRegex.test(value)) {
            this.showError(this.fields.email, 'Please enter a valid email address');
            return false;
        }
        this.clearError(this.fields.email);
        return true;
    }

    validatePhone() {
        const value = this.fields.phone.value.trim();
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        
        if (!value) {
            this.showError(this.fields.phone, 'Phone number is required');
            return false;
        }
        if (!/\d/.test(value) || value.replace(/\D/g, '').length < 10) {
            this.showError(this.fields.phone, 'Please enter a valid phone number (at least 10 digits)');
            return false;
        }
        if (!phoneRegex.test(value)) {
            this.showError(this.fields.phone, 'Phone number can only contain numbers, spaces, hyphens, and parentheses');
            return false;
        }
        this.clearError(this.fields.phone);
        return true;
    }

    validatePassword() {
        const value = this.fields.password.value;
        
        if (!value) {
            this.showError(this.fields.password, 'Password is required');
            return false;
        }
        if (value.length < 8) {
            this.showError(this.fields.password, 'Password must be at least 8 characters');
            return false;
        }
        this.clearError(this.fields.password);
        return true;
    }

    updatePasswordStrength() {
        const value = this.fields.password.value;
        const strengthBar = document.querySelector('.strength-bar');
        const strengthLevel = document.getElementById('strengthLevel');
        let strength = 0;

        if (value.length >= 8) strength += 1;
        if (value.length >= 12) strength += 1;
        if (/[A-Z]/.test(value) && /[a-z]/.test(value)) strength += 1;
        if (/\d/.test(value)) strength += 1;
        if (/[!@#$%^&*]/.test(value)) strength += 1;

        const levels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        const colors = ['#f44336', '#ff9800', '#ffc107', '#4caf50', '#2196f3'];
        
        strengthBar.style.width = `${(strength / 5) * 100}%`;
        strengthBar.style.backgroundColor = colors[strength - 1] || colors[0];
        strengthLevel.textContent = levels[strength - 1] || levels[0];
    }

    validateConfirmPassword() {
        const password = this.fields.password.value;
        const confirmPassword = this.fields.confirmPassword.value;
        
        if (!confirmPassword) {
            this.showError(this.fields.confirmPassword, 'Please confirm your password');
            return false;
        }
        if (password !== confirmPassword) {
            this.showError(this.fields.confirmPassword, 'Passwords do not match');
            return false;
        }
        this.clearError(this.fields.confirmPassword);
        return true;
    }

    validateWebsite() {
        const value = this.fields.website.value.trim();
        
        if (!value) {
            this.clearError(this.fields.website);
            return true;
        }
        
        try {
            new URL(value);
            this.clearError(this.fields.website);
            return true;
        } catch {
            this.showError(this.fields.website, 'Please enter a valid URL');
            return false;
        }
    }

    validateTerms() {
        if (!this.fields.terms.checked) {
            this.showError(this.fields.terms, 'You must agree to the terms and conditions');
            return false;
        }
        this.clearError(this.fields.terms);
        return true;
    }

    handleSubmit(e) {
        e.preventDefault();

        const isValid = 
            this.validateFullName() &&
            this.validateEmail() &&
            this.validatePhone() &&
            this.validatePassword() &&
            this.validateConfirmPassword() &&
            this.validateWebsite() &&
            this.validateTerms();

        if (isValid) {
            this.form.style.display = 'none';
            this.successMessage.style.display = 'block';
            
            setTimeout(() => {
                this.form.reset();
                this.form.style.display = 'block';
                this.successMessage.style.display = 'none';
                document.querySelector('.strength-bar').style.width = '0%';
                document.getElementById('strengthLevel').textContent = 'Weak';
            }, 3000);
        }
    }

    showError(field, message) {
        field.classList.add('error');
        const errorEl = field.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.textContent = message;
        }
    }

    clearError(field) {
        field.classList.remove('error');
        const errorEl = field.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.textContent = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FormValidator();
});
