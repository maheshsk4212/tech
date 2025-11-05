// Initialize EmailJS
(function(){
    emailjs.init("YOUR_PUBLIC_KEY"); // ⚠️ Replace with your actual public key from EmailJS Account page
})();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({ duration: 1000, once: true });

    // Mobile menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    // Toggle menu
    function toggleMenu() {
        mobileMenu.classList.toggle('menu-open');
        body.classList.toggle('menu-open');
    }

    // Event listeners for menu buttons
    menuBtn?.addEventListener('click', toggleMenu);
    closeBtn?.addEventListener('click', toggleMenu);

    // Close menu when clicking links
    const mobileLinks = mobileMenu?.querySelectorAll('.mobile-link');
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Close menu on screen resize if it's open
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && mobileMenu.classList.contains('menu-open')) {
            toggleMenu();
        }
    });
});

// Form submission handler
async function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formStatus = document.getElementById('formStatus');
    const successMessage = formStatus.querySelector('.success');
    const errorMessage = formStatus.querySelector('.error');
    
    // Hide any previous messages
    formStatus.classList.remove('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    // Get form data
    const formData = new FormData(form);

    try {
        // Using EmailJS service
        const response = await emailjs.send(
            'service_xxxxxx', // Replace with your actual service ID from EmailJS
            'template_xxxxxx', // Replace with your actual template ID from EmailJS
            {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                company: formData.get('company'),
                message: formData.get('message')
            }
        )

        if (response.status === 200) {
            // Show success message
            successMessage.classList.remove('hidden');
            form.reset();
        } else {
            // Show error message
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.classList.remove('hidden');
    }

    // Hide status message after 5 seconds
    setTimeout(() => {
        formStatus.classList.add('hidden');
    }, 5000);

    return false;
}
