// ========== Scroll Reveal ==========
(function () {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        els.forEach(function (el) { el.classList.add('visible'); });
        return;
    }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
})();

// ========== Hero: mouse-following spotlight + subtle character parallax ==========
(function () {
    var hero = document.getElementById('hero');
    var spotlight = document.getElementById('spotlight');
    var stage = document.getElementById('characterStage');
    if (!hero) return;

    var fine = window.matchMedia('(pointer: fine)').matches;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var raf = null;
    var sx = 50, sy = 30, tilt = '';

    function apply() {
        raf = null;
        if (spotlight) {
            hero.style.setProperty('--x', sx + '%');
            hero.style.setProperty('--y', sy + '%');
        }
        if (stage && fine && !reduce) stage.style.transform = tilt;
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(apply); }

    hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        sx = px * 100; sy = py * 100;
        tilt = 'perspective(1000px) rotateY(' + ((px - 0.5) * 7) + 'deg) rotateX(' +
            (-(py - 0.5) * 6) + 'deg)';
        schedule();
    });
    hero.addEventListener('mouseleave', function () {
        sx = 50; sy = 30; tilt = '';
        schedule();
    });
})();

// ========== Character video graceful fallback ==========
(function () {
    var video = document.getElementById('characterVideo');
    if (!video) return;
    video.addEventListener('error', function () { video.classList.add('hidden'); });
    var p = video.play();
    if (p && typeof p.catch === 'function') { p.catch(function () { }); }
})();

// ========== Subtle 3D tilt on the 2D cartoon (About section) ==========
(function () {
    var el = document.getElementById('aboutAvatar');
    var fine = window.matchMedia('(pointer: fine)').matches;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || !fine || reduce) return;

    el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
            'perspective(700px) rotateY(' + (px * 7) + 'deg) rotateX(' + (-py * 7) + 'deg)';
    });
    el.addEventListener('mouseleave', function () { el.style.transform = ''; });
})();
