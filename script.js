document.addEventListener('DOMContentLoaded', () => {

    // --- COOKIE BANNER ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');
    const rejectCookiesButton = document.getElementById('reject-cookies');

    // Funzione per nascondere il banner
    const hideBanner = () => {
        if (cookieBanner) {
            cookieBanner.style.opacity = '0';
            setTimeout(() => {
                cookieBanner.classList.add('hidden');
            }, 500); // Attendi la fine della transizione
        }
    };

    // Controlla se l'utente ha già fatto una scelta
    if (!localStorage.getItem('cookieChoice')) {
        if (cookieBanner) cookieBanner.classList.remove('hidden');
    }

    if (acceptCookiesButton) {
        acceptCookiesButton.addEventListener('click', () => {
            localStorage.setItem('cookieChoice', 'accepted');
            hideBanner();
        });
    }
    
    if (rejectCookiesButton) {
        rejectCookiesButton.addEventListener('click', () => {
            localStorage.setItem('cookieChoice', 'rejected');
            hideBanner();
        });
    }

    // --- LANGUAGE TOGGLE ---
    const langToggles = [document.getElementById('lang-toggle'), document.getElementById('lang-toggle-mobile')];
    const htmlEl = document.documentElement;

    function setLanguage(lang) {
        htmlEl.lang = lang;
        const elementsToShow = document.querySelectorAll(`.lang-${lang}`);
        const elementsToHide = document.querySelectorAll(`.lang-${lang === 'it' ? 'en' : 'it'}`);
        elementsToShow.forEach(el => el.classList.remove('hidden'));
        elementsToHide.forEach(el => el.classList.add('hidden'));

        const textareaIT = document.getElementById('message-it');
        const textareaEN = document.getElementById('message-en');
        if (textareaIT && textareaEN) {
            if (lang === 'it') {
                textareaIT.required = true;
                textareaEN.required = false;
            } else {
                textareaIT.required = false;
                textareaEN.required = true;
            }
        }
        localStorage.setItem('preferredLanguage', lang);
    }

    langToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                const newLang = htmlEl.lang === 'it' ? 'en' : 'it';
                setLanguage(newLang);
            });
        }
    });

    const savedLang = localStorage.getItem('preferredLanguage');
    setLanguage(savedLang || 'it');


    // --- MOBILE MENU ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconSvg = document.getElementById('menu-icon-svg');
    const hamburgerIconPath = "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5";
    const closeIconPath = "M6 18L18 6M6 6l12 12";

    if (mobileMenuButton && mobileMenu && menuIconSvg) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            menuIconSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="${isExpanded ? hamburgerIconPath : closeIconPath}" />`;
        });
        mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                menuIconSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="${hamburgerIconPath}" />`;
            });
        });
    }

    // --- FORM SUBMISSION WITH SUCCESS MESSAGE ---
    const contactForm = document.getElementById('contactForm');
    const formContainer = document.getElementById('formContainer');
    const successMessage = document.getElementById('successMessage');

    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                if (formContainer) formContainer.classList.add('hidden');
                if (successMessage) successMessage.classList.remove('hidden');
                form.reset();
            } else {
                alert("Si è verificato un errore. Riprova più tardi.");
            }
        } catch (error) {
            alert("Si è verificato un errore di rete. Riprova più tardi.");
        }
    }
    if (contactForm) {
        contactForm.addEventListener("submit", handleSubmit);
    }
    
    // --- FOOTER CURRENT YEAR ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
