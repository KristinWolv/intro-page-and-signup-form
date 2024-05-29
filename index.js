document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fields = ['firstname', 'lastname', 'email', 'password'];
    const validators = {
        firstname: validateRequired,
        lastname: validateRequired,
        email: validateEmail,
        password: validateRequired
    };
    
    fields.forEach(field => {
        const value = this[field].value;
        const validator = validators[field];
        const errorMessage = validator(value);
        
        if (errorMessage) {
            showError(field, errorMessage);
        } else {
            clearError(field);
        }
    });
});

function validateRequired(value) {
    return value === '' ? 'This field is required' : '';
}

function validateEmail(value) {
    if (value === '') {
        return 'Email is required';
    }
    return isValidEmail(value) ? '' : 'Email is not valid';
}

function showError(field, message) {
    const formControl = document.getElementById(field).parentNode;
    formControl.classList.add('error');
    formControl.querySelector('small').innerText = message;
}

function clearError(field) {
    const formControl = document.getElementById(field).parentNode;
    formControl.classList.remove('error');
    formControl.querySelector('small').innerText = '';
}

function isValidEmail(email) {
    if (!email.includes('@') || email.startsWith('@') || email.endsWith('@')) {
        return false;
    }

    const [localPart, domain] = email.split('@');

    if (!domain || domain.startsWith('.') || domain.endsWith('.')) {
        return false;
    }

    if (domain.split('.').some(part => part.length === 0)) {
        return false;
    }

    return true;
}