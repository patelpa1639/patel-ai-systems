// ============================================
// PATEL AI SYSTEMS — Interactions
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // --- Navbar scroll effect ---
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    nav.classList.toggle('nav-scrolled', scrollY > 60);
    lastScroll = scrollY;
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
        menu.classList.remove('active');
        toggle.classList.remove('active');

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
})();
