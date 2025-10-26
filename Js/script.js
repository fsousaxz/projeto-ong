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
