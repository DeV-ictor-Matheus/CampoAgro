export function initNavigation() {
  const nav = document.getElementById('navbar');
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = links
    .map((link) => document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1))))
    .filter(Boolean);

  function updateNavState() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 24);

    const active = sections
      .slice()
      .reverse()
      .find((section) => section.getBoundingClientRect().top <= 140);

    links.forEach((link) => {
      const id = link.getAttribute('href')?.slice(1);
      link.classList.toggle('active', Boolean(active && id === active.id));
    });
  }

  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });

  window.toggleMenu = () => {
    nav?.classList.toggle('menu-open');
  };

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;
    const id = decodeURIComponent(href.slice(1));
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nav?.classList.remove('menu-open');
    try {
      history.replaceState(null, '', href);
    } catch {
      // Ambientes srcdoc podem bloquear history.
    }
  });
}