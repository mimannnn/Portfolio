const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
        document.documentElement.dataset.theme = savedTheme;
    }

    const updateThemeToggle = () => {
        const isDark = document.documentElement.dataset.theme === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';

        themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
        themeToggle.querySelector('.theme-toggle-text').textContent = isDark ? 'Light' : 'Dark';
        themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
        themeToggle.title = `Switch to ${nextTheme} mode`;
    };

    updateThemeToggle();

    themeToggle.addEventListener('click', () => {
        document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('portfolio-theme', document.documentElement.dataset.theme);
        updateThemeToggle();
    });
}

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formStatus = contactForm.querySelector('.form-status');
        submitButton.disabled = true;
        formStatus.textContent = 'Sending your message...';

        try {
            const response = await fetch('https://formsubmit.co/ajax/marquezers03@gmail.com', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            });
            const result = await response.json();

            if (!response.ok || result.success !== 'true') {
                throw new Error('Message could not be sent. Please try again.');
            }

            formStatus.textContent = 'Thanks! Your message has been sent.';
            contactForm.reset();
        } catch (error) {
            formStatus.textContent = error.message || 'Something went wrong. Please try again.';
        } finally {
            submitButton.disabled = false;
        }
    });
}