document.addEventListener('DOMContentLoaded', () => {

    // --- LANGUAGE TOGGLE ---
    const langToggles = [document.getElementById('lang-toggle'), document.getElementById('lang-toggle-mobile')];
    const htmlEl = document.documentElement;

    function setLanguage(lang) {
        htmlEl.lang = lang;
        const elementsToShow = document.querySelectorAll(`.lang-${lang}`);
        const elementsToHide = document.querySelectorAll(`.lang-${lang === 'it' ? 'en' : 'it'}`);

        elementsToShow.forEach(el => el.classList.remove('hidden'));
        elementsToHide.forEach(el => el.classList.add('hidden'));

        localStorage.setItem('preferredLanguage', lang);
    }

    langToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                const currentLang = htmlEl.lang;
                const newLang = currentLang === 'it' ? 'en' : 'it';
                setLanguage(newLang);
            });
        }
    });

    // On page load, check for saved language preference or default to browser language
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        const browserLang = navigator.language.split('-')[0];
        setLanguage(browserLang === 'en' ? 'en' : 'it'); // Default to 'it' if not 'en'
    }

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
            mobileMenuButton.setAttribute('aria-label', isExpanded ? 'Apri menu' : 'Chiudi menu');
        });

        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                menuIconSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="${hamburgerIconPath}" />`;
                mobileMenuButton.setAttribute('aria-label', 'Apri menu');
            });
        });
    }

    // --- FOOTER CURRENT YEAR ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});