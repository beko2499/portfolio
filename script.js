// ========== Theme Toggle ==========
let currentTheme = localStorage.getItem('cv-theme') || 'light';
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('cv-theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.getElementById('themeIcon');
    if (currentTheme === 'dark') {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    } else {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>';
    }
}

// ========== Language Toggle ==========
let currentLang = 'en';

function setLang(lang) {
    currentLang = lang;
    const isAr = lang === 'ar';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.getElementById('langLabel').textContent = isAr ? 'EN' : 'ع';

    // Update all translatable elements
    document.querySelectorAll('[data-' + lang + ']').forEach(function(el) {
        var text = el.getAttribute('data-' + lang);
        if (!text) return;
        // Check if element has child SVG
        var svg = el.querySelector('svg');
        if (svg) {
            // Preserve SVG, replace only text
            var clone = svg.cloneNode(true);
            el.textContent = '';
            el.appendChild(clone);
            el.appendChild(document.createTextNode(' ' + text));
        } else {
            el.textContent = text;
        }
    });

    localStorage.setItem('cv-lang', lang);
}

function toggleLang() {
    setLang(currentLang === 'en' ? 'ar' : 'en');
}

// ========== Accent Color ==========
function changeAccent(color) {
    document.documentElement.style.setProperty('--accent', color);
    var r = parseInt(color.slice(1,3), 16);
    var g = parseInt(color.slice(3,5), 16);
    var b = parseInt(color.slice(5,7), 16);
    var lighter = 'rgb(' + Math.min(r+40,255) + ',' + Math.min(g+40,255) + ',' + Math.min(b+40,255) + ')';
    document.documentElement.style.setProperty('--accent-light', lighter);
    document.documentElement.style.setProperty('--accent-bg', color + '14');
    localStorage.setItem('cv-accent', color);
}

// ========== Init ==========
document.addEventListener('DOMContentLoaded', function() {
    updateThemeIcon();

    var savedLang = localStorage.getItem('cv-lang');
    if (savedLang && savedLang !== 'en') {
        setLang(savedLang);
    }

    var savedAccent = localStorage.getItem('cv-accent');
    if (savedAccent) {
        changeAccent(savedAccent);
        var sel = document.querySelector('.color-select');
        if (sel) sel.value = savedAccent;
    }
});
