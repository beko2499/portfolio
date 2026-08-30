// ========== Language Toggle ==========
var currentLang = 'en';

function setLang(lang) {
    currentLang = lang;
    var isAr = lang === 'ar';

    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    var label = document.getElementById('langLabel');
    if (label) label.textContent = isAr ? 'EN' : 'ع';

    document.querySelectorAll('[data-' + lang + ']').forEach(function (el) {
        var text = el.getAttribute('data-' + lang);
        if (text) el.textContent = text;
    });

    try { localStorage.setItem('portfolio-lang', lang); } catch (e) { }
}

function toggleLang() {
    setLang(currentLang === 'en' ? 'ar' : 'en');
}

// ========== Scroll Reveal ==========
function initReveal() {
    var targets = document.querySelectorAll('.hero-text, .hero-visual, .projects-intro, .proj-card, .skills, .impact, .connect-intro, .contact-list, .cta-box');

    if (!('IntersectionObserver' in window)) {
        targets.forEach(function (el) { el.classList.add('in'); });
        return;
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            io.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4) * 70 + 'ms';
        io.observe(el);
    });
}

// ========== Init ==========
document.addEventListener('DOMContentLoaded', function () {
    initReveal();

    var saved = null;
    try { saved = localStorage.getItem('portfolio-lang'); } catch (e) { }
    if (saved === 'ar') setLang('ar');
});
