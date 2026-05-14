export function initNavigation() {
  const nav = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  window.toggleMenu = () => {
    nav?.classList.toggle('menu-open');
  };

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;
    const id = decodeURIComponent(href.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nav?.classList.remove('menu-open');
    try {
      history.replaceState(null, '', href);
    } catch {
      /* documentos opacos (ex.: about:srcdoc) podem bloquear history */
    }
  });
}
