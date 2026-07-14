/* ============================================================
   AGRAWAL FAMILY FOUNDATION — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---- Mobile Menu ---- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* ---- Scroll Animations ---- */
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  /* ---- Active Nav Link ---- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) link.classList.add('active');
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});

/* ---- Animate-in CSS ---- */
const style = document.createElement('style');
style.textContent = `
  .animate { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
  .animate.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
