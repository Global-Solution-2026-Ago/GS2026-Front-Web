
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