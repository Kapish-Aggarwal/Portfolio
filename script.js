document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link highlighting on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -50% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--tp)';
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ── Scroll-triggered card animations ──
  const animatedEls = document.querySelectorAll('.card, .skill-card, .contact-item');

  // Reset initial state so they can animate in on scroll
  animatedEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    el.style.animation = 'none'; // disable CSS animation, use JS instead
  });

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 60 * (Array.from(animatedEls).indexOf(entry.target) % 6));
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedEls.forEach(el => cardObserver.observe(el));

  // ── Current year in footer ──
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Smooth mobile menu toggle (if needed) ──
  const menuBtn = document.getElementById('menu-btn');
  const navLinksEl = document.querySelector('.nav-links');
  if (menuBtn && navLinksEl) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinksEl.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });
  }

});
