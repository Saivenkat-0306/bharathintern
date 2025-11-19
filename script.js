// JAVASCRIPT LOGIC


// --- Dark/Light Theme Switcher Logic ---

const storageKey = 'theme-preference';

const getPreference = () => {
    if (localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey);
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'dark'; 
};

let currentTheme = getPreference();

const reflectPreference = () => {
    document.documentElement.setAttribute('data-theme', currentTheme);

    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        const icon = toggleButton.querySelector('i');
        if (icon) {
            if (currentTheme === 'dark') {
                icon.className = 'fas fa-sun';
                toggleButton.setAttribute('aria-label', 'Switch to light mode');
            } else {
                icon.className = 'fas fa-moon';
                toggleButton.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    }
};

const setPreference = () => {
    localStorage.setItem(storageKey, currentTheme);
    reflectPreference();
};

const onClick = () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    setPreference();
};

// --- Mobile Menu Toggle Logic ---
const setupMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
};

// Initialization
reflectPreference();

window.onload = () => {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', onClick);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
        currentTheme = isDark ? 'dark' : 'light';
        setPreference();
    });

    setupMobileMenu();
};
