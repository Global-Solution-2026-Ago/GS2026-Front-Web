
// Menu 
const menuToggle = document.querySelector('.menu-toggle');
const navLista = document.querySelector('.nav__lista');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLista.classList.toggle('aberto');
  });
}

// ========================
// LINK ATIVO
// ========================
const links = document.querySelectorAll('.nav__link');
const paginaAtual = window.location.pathname.split('/').pop();

links.forEach(link => {
  const href = link.getAttribute('href');
  if (href === paginaAtual || (paginaAtual === '' && href === 'index.html')) {
    link.classList.add('ativo');
  }
});

// ========================
// ANIMAÇÃO AO ROLAR
// ========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ******************************
// ANIMAÇÃO DA PAGINA PROBLEMA
// ******************************
document.addEventListener('DOMContentLoaded', () => {
 
  /* ── 1. FADE-IN COM INTERSECTION OBSERVER ── */
  const fadeEls = document.querySelectorAll('.fade-in');
 
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // pequeno delay escalonado para múltiplos elementos
          const delay = entry.target.dataset.delay || i * 80;
          setTimeout(() => {
            entry.target.classList.add('visivel');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });
 
    fadeEls.forEach((el, i) => {
      el.dataset.delay = i * 100;
      observer.observe(el);
    });
  }
 
 
  /* ── 2. ANIMAÇÃO DE CONTAGEM NOS NÚMEROS ── */
  /**
   * Extrai o valor numérico de textos como "30%", "25%", "R$ 1bi"
   * e anima do zero até o valor final quando o elemento fica visível.
   */
  const numerosEls = document.querySelectorAll('.problema-intro__numero');
 
  const animarNumero = (el) => {
    const textoOriginal = el.textContent.trim(); // ex: "30%"
    const match = textoOriginal.match(/([\d,.]+)/);
    if (!match) return;
 
    const valorFinal = parseFloat(match[1].replace(',', '.'));
    const prefixo    = textoOriginal.slice(0, textoOriginal.indexOf(match[1]));
    const sufixo     = textoOriginal.slice(textoOriginal.indexOf(match[1]) + match[1].length);
    const duracao    = 1400; // ms
    const fps        = 60;
    const passos     = Math.round((duracao / 1000) * fps);
    let   passo      = 0;
 
    // easing easeOutCubic
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
 
    const tick = () => {
      passo++;
      const progresso = easeOut(passo / passos);
      const valorAtual = Math.round(progresso * valorFinal * 10) / 10;
      el.textContent = prefixo + valorAtual + sufixo;
 
      if (passo < passos) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = textoOriginal; // garante valor exato no fim
      }
    };
 
    requestAnimationFrame(tick);
  };
 
  if (numerosEls.length > 0) {
    const numObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animarNumero(entry.target);
          numObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
 
    numerosEls.forEach((el) => numObserver.observe(el));
  }
 
 
  /* ── 3. LINK ATIVO NA NAVEGAÇÃO ── */
  const navLinks = document.querySelectorAll('nav a, .nav a, header a');
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
 
  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href === paginaAtual || href.endsWith(paginaAtual)) {
      link.classList.add('ativo');
      link.setAttribute('aria-current', 'page');
    }
  });
 
});