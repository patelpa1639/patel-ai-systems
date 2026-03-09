// ============================================
// PATEL AI SYSTEMS — Interactions v2
// ============================================

(function () {
  'use strict';

  // --- Scroll Reveal ---
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // --- Navbar scroll effect ---
  const nav = document.querySelector('.nav');

  function onScroll() {
    if (nav) {
      nav.classList.toggle('nav-scrolled', window.scrollY > 60);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // Close mobile menu if open
        const menu = document.querySelector('.nav-links');
        const toggle = document.querySelector('.nav-toggle');
        if (menu) menu.classList.remove('active');
        if (toggle) toggle.classList.remove('active');

        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Mobile menu toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // --- Cursor glow follow ---
  const cursorGlow = document.querySelector('.cursor-glow');

  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let raf;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    function animateGlow() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      cursorGlow.style.left = currentX + 'px';
      cursorGlow.style.top = currentY + 'px';
      raf = requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  // --- Card spotlight glow (follows mouse on glow-card elements) ---
  document.querySelectorAll('.glow-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
  });
})();
