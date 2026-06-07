// Ano dinâmico no rodapé
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Header com sombra ao rolar
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Menu mobile
const toggle = document.querySelector('.nav_toggle');
const links  = document.querySelector('.nav_links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    // Alterna a animação do botão sanduíche
    toggle.classList.toggle('nav_toggle--active');
    // Abre e fecha o menu drop-down no mobile
    links.classList.toggle('nav_links--active');
  });

  // Fecha o menu automaticamente ao clicar em qualquer link
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('nav_toggle--active');
      links.classList.remove('nav_links--active');
    });
  });
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Copiar PIX
const PIX_KEY = '00209293000111';
const toast = document.getElementById('toast');
const showToast = (msg) => {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('is-visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 2400);
};

document.querySelectorAll('[data-copy-pix]').forEach(btn => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      showToast('Chave PIX copiada - Obrigado pelo seu apoio!');
    } catch {
      showToast(`Copie a chave: ${PIX_KEY}`);
    }
  });
});

// Contadores animados nas estatísticas da Intro
const counters = document.querySelectorAll('.intro_stats dt');
const animateCount = (el) => {
  const raw = el.textContent.trim();
  const target = parseInt(raw, 10);
  if (isNaN(target)) return;
  const suffix = raw.replace(/[0-9]/g, '');
  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { 
      animateCount(e.target); 
      counterIO.unobserve(e.target); 
    }
  });
}, { threshold: 0.6 });
counters.forEach(c => counterIO.observe(c));