document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const privacyCheckbox = document.getElementById('privacy');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    // Form validation
    function validateField(field, errorId, validationFn, errorMessage) {
        const errorElement = document.getElementById(errorId);
        if (!validationFn(field.value)) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            return false;
        } else {
            field.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateForm() {
        let isValid = true;
        
        // Validate name
        if (!validateField(
            nameInput, 
            'name-error', 
            value => value.trim().length >= 2 && value.trim().length <= 100,
            'Please enter a valid name (2-100 characters)'
        )) {
            isValid = false;
        }

        // Validate email
        if (!validateField(
            emailInput, 
            'email-error', 
            value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            'Please enter a valid email address'
        )) {
            isValid = false;
        }

        // Validate message
        if (!validateField(
            messageInput, 
            'message-error', 
            value => value.trim().length >= 10 && value.trim().length <= 2000,
            'Please enter a message (10-2000 characters)'
        )) {
            isValid = false;
        }

        // Validate privacy policy
        const privacyError = document.getElementById('privacy-error');
        if (!privacyCheckbox.checked) {
            privacyError.textContent = 'You must accept the Privacy Policy';
            privacyError.style.display = 'block';
            isValid = false;
        } else {
            privacyError.style.display = 'none';
        }

        return isValid;
    }

    // Form submission
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                form.reset();
                
                // Scroll to status message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide success message after 10 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 10000);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = 'There was a problem sending your message. Please try again later or email me directly at info@mabu.red';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } finally {
            // Re-enable submit button and hide loading state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    }

    // Add event listeners
    form.addEventListener('submit', handleSubmit);
    
    // Real-time validation
    nameInput.addEventListener('blur', () => {
        validateField(
            nameInput, 
            'name-error', 
            value => value.trim().length >= 2 && value.trim().length <= 100,
            'Please enter a valid name (2-100 characters)'
        );
    });
    
    emailInput.addEventListener('blur', () => {
        validateField(
            emailInput, 
            'email-error', 
            value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            'Please enter a valid email address'
        );
    });
    
    messageInput.addEventListener('blur', () => {
        validateField(
            messageInput, 
            'message-error', 
            value => value.trim().length >= 10 && value.trim().length <= 2000,
            'Please enter a message (10-2000 characters)'
        );
    });
    
    privacyCheckbox.addEventListener('change', () => {
        const privacyError = document.getElementById('privacy-error');
        if (privacyCheckbox.checked) {
            privacyError.style.display = 'none';
        }
    });
});
