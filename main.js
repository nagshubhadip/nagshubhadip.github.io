// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        })
    );
}

// Reveal sections on scroll
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.content-section').forEach(s => io.observe(s));

// Dark mode toggle
(function () {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const next = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            // Update all toggle icons
            document.querySelectorAll('.theme-toggle').forEach(b => {
                b.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            });
        });
        // Set initial icon
        const current = document.documentElement.getAttribute('data-theme');
        btn.innerHTML = current === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
})();

// Back to top button
(function () {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// Profile photo lightbox
(function () {
    const trigger = document.querySelector('.hero-avatar-wrap');
    const box = document.getElementById('lightbox');
    if (!trigger || !box) return;
    const closeBtn = box.querySelector('.lightbox-close');

    function open() {
        box.hidden = false;
        document.body.classList.add('lightbox-open');
        requestAnimationFrame(() => box.classList.add('open'));
        closeBtn.focus();
    }

    function close() {
        box.classList.remove('open');
        document.body.classList.remove('lightbox-open');
        setTimeout(() => { box.hidden = true; }, 300);
        trigger.focus();
    }

    trigger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !box.hidden) close();
    });
})();
