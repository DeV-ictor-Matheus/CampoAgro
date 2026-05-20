/**
 * clarity-init.js — Integração Microsoft Clarity para páginas HTML estáticas
 *
 * Uso: adicione antes do </head>:
 *   <script src="/clarity-init.js" defer></script>
 *
 * O script respeita o consentimento gravado pelo site Next.js (mesma chave
 * campoagro_consent no localStorage), garantindo consistência LGPD entre
 * as páginas estáticas e o app principal.
 */
(function () {
  'use strict';

  var PROJECT_ID = ''; // ← preencha com seu Clarity Project ID

  if (!PROJECT_ID) return;

  /* ── Banner LGPD ──────────────────────────────────────────────── */
  var CONSENT_KEY = 'campoagro_consent';

  function readConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function saveConsent(status) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ status: status, timestamp: Date.now() }));
  }

  function loadClarity() {
    if (window.clarity) return; // já carregado
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', PROJECT_ID);
  }

  function applyConsent(status) {
    if (status === 'granted') {
      loadClarity();
      if (typeof window.clarity === 'function') {
        window.clarity('consent', true);
      } else {
        // aguarda o script carregar
        window.addEventListener('load', function () {
          if (typeof window.clarity === 'function') window.clarity('consent', true);
        });
      }
    }
  }

  function removeBanner(banner) {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
  }

  function createBanner() {
    var banner = document.createElement('div');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-label', 'Aviso de privacidade e cookies');
    banner.style.cssText = [
      'position:fixed;bottom:0;left:0;right:0;z-index:9000',
      'background:rgba(17,17,17,0.97)',
      'border-top:2px solid #c9a227',
      'padding:1rem 1.25rem',
      'font-family:Barlow,sans-serif',
      'animation:cb-slide-up 0.3s ease-out',
      'box-shadow:0 -4px 32px rgba(0,0,0,0.6)',
    ].join(';');

    var style = document.createElement('style');
    style.textContent = '@keyframes cb-slide-up{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}';
    document.head.appendChild(style);

    var inner = document.createElement('div');
    inner.style.cssText = 'max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem 1.5rem;';

    var text = document.createElement('p');
    text.style.cssText = 'flex:1 1 280px;font-size:0.85rem;line-height:1.5;color:rgba(255,255,255,0.7);margin:0;';
    text.innerHTML = 'Usamos <strong style="color:#fff">Microsoft Clarity</strong> para registrar cliques e sessões anônimas — para melhoria do site e relatórios de patrocinadores. <a href="/privacidade" style="color:#c9a227;text-decoration:underline">Política de privacidade</a>.';

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;flex-wrap:wrap;gap:0.5rem;flex-shrink:0;';

    var btnAccept = document.createElement('button');
    btnAccept.type = 'button';
    btnAccept.textContent = 'Aceitar todos';
    btnAccept.style.cssText = 'background:#c9a227;color:#0a0a0a;border:none;padding:0.5rem 1.1rem;border-radius:6px;font-size:0.82rem;font-weight:600;cursor:pointer;font-family:inherit;';

    var btnDecline = document.createElement('button');
    btnDecline.type = 'button';
    btnDecline.textContent = 'Apenas essenciais';
    btnDecline.style.cssText = 'background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.25);padding:0.5rem 1.1rem;border-radius:6px;font-size:0.82rem;font-weight:600;cursor:pointer;font-family:inherit;';

    var linkMore = document.createElement('a');
    linkMore.href = '/privacidade';
    linkMore.textContent = 'Saber mais';
    linkMore.style.cssText = 'color:#c9a227;font-size:0.82rem;font-weight:500;text-decoration:underline;display:inline-flex;align-items:center;padding:0.5rem;';

    btnAccept.addEventListener('click', function () {
      saveConsent('granted');
      applyConsent('granted');
      removeBanner(banner);
    });

    btnDecline.addEventListener('click', function () {
      saveConsent('denied');
      removeBanner(banner);
    });

    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape') {
        saveConsent('denied');
        removeBanner(banner);
        document.removeEventListener('keydown', onEsc);
      }
    });

    actions.appendChild(btnAccept);
    actions.appendChild(btnDecline);
    actions.appendChild(linkMore);
    inner.appendChild(text);
    inner.appendChild(actions);
    banner.appendChild(inner);

    btnAccept.focus();
    return banner;
  }

  /* ── Inicialização ────────────────────────────────────────────── */
  var existing = readConsent();

  if (existing) {
    applyConsent(existing.status);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.appendChild(createBanner());
    });
  }
})();
