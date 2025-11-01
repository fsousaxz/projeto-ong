// main.js — Funcionalidades básicas e interatividade

document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para links internos
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const destino = document.querySelector(link.getAttribute('href'));
      if (destino) {
        window.scrollTo({
          top: destino.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // Lazy Loading de imagens
  const imagens = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  imagens.forEach(img => observer.observe(img));

  // Foco no teclado para acessibilidade
  const focusables = document.querySelectorAll('a, button, input, textarea, select');
  focusables.forEach(el => {
    el.addEventListener('focus', () => el.classList.add('focus-visible'));
    el.addEventListener('blur', () => el.classList.remove('focus-visible'));
  });

  // Animação leve ao rolar (fade-in nas seções)
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => sectionObserver.observe(section));
});
// ===== header interactions: hamburger and dropdown =====
(function(){
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      if (mobileMenu.hasAttribute('hidden')) mobileMenu.removeAttribute('hidden');
      else mobileMenu.setAttribute('hidden', '');
    });
  }

  // Desktop dropdown toggles
  dropdownToggles.forEach(btn => {
    const parent = btn.closest('.has-dropdown');
    const menu = parent.querySelector('.dropdown');
    btn.addEventListener('click', (e) => {
      const open = menu.classList.contains('open');
      // close all dropdowns first
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded','false'));
      if (!open) {
        menu.classList.add('open');
        btn.setAttribute('aria-expanded','true');
      } else {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
      }
      e.stopPropagation();
    });
  });

  // close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded','false'));
  });

  // mobile submenu toggles
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (submenu) submenu.style.display = expanded ? 'none' : 'block';
    });
  });
})();

