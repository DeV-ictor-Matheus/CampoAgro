'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const HASH_LINK_SECTION_IDS = [
  'sobre',
  'programacao',
  'areas',
  'memorias',
  'tratoraco',
  'patrocinadores',
  'expositores',
] as const;

const SECTION_GAP_PX = 12;
const SPY_TOLERANCE_PX = 16;

/** Linha abaixo do menu fixo (pill ou barra full-width). */
function getNavScrollOffset(): number {
  const nav = document.getElementById('navbar');
  if (!nav) return 96;
  return Math.ceil(nav.getBoundingClientRect().bottom) + SECTION_GAP_PX;
}

/** Título visível da seção (ignora o padding superior do section). */
function getSectionAnchor(section: HTMLElement): HTMLElement {
  return (
    section.querySelector<HTMLElement>(
      '.section-head, .partners-hero, .editorial-copy, .tratoraco-copy, .section-badge'
    ) ?? section
  );
}

function scrollToAnchorSection(section: HTMLElement, behavior: ScrollBehavior = 'smooth') {
  const anchor = getSectionAnchor(section);
  const top = anchor.getBoundingClientRect().top + window.scrollY - getNavScrollOffset();
  window.scrollTo({ top: Math.max(0, top), behavior });
}

function findActiveSection(sections: HTMLElement[]): string | null {
  const line = getNavScrollOffset() + SPY_TOLERANCE_PX;
  let active: HTMLElement | null = null;
  let bestTop = -Infinity;

  for (const section of sections) {
    const top = getSectionAnchor(section).getBoundingClientRect().top;
    if (top <= line && top > bestTop) {
      bestTop = top;
      active = section;
    }
  }

  return active?.id ?? null;
}

function isHashSectionId(id: string): id is (typeof HASH_LINK_SECTION_IDS)[number] {
  return (HASH_LINK_SECTION_IDS as readonly string[]).includes(id);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const pendingNavId = useRef<string | null>(null);

  useEffect(() => {
    const sections = HASH_LINK_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const updateNavState = () => {
      setScrolled(window.scrollY > 24);
      if (pendingNavId.current) return;
      setActiveId(findActiveSection(sections));
    };

    const hashId = decodeURIComponent(window.location.hash.slice(1));
    if (isHashSectionId(hashId)) {
      const dest = document.getElementById(hashId);
      if (dest) {
        setActiveId(hashId);
        requestAnimationFrame(() => scrollToAnchorSection(dest, 'instant'));
      }
    } else {
      updateNavState();
    }

    window.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateNavState);
      window.removeEventListener('resize', updateNavState);
    };
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;

      const id = decodeURIComponent(href.slice(1));
      if (!isHashSectionId(id)) return;

      const dest = document.getElementById(id);
      if (!dest) return;

      e.preventDefault();
      pendingNavId.current = id;
      setActiveId(id);
      scrollToAnchorSection(dest);
      setMenuOpen(false);

      let navFinished = false;
      const finishNav = () => {
        if (navFinished) return;
        navFinished = true;
        const targetId = pendingNavId.current;
        pendingNavId.current = null;
        if (targetId) setActiveId(targetId);
      };

      if ('onscrollend' in window) {
        window.addEventListener('scrollend', finishNav, { once: true });
      }
      window.setTimeout(finishNav, 800);

      try {
        history.replaceState(null, '', href);
      } catch {
        // ignore
      }
    };

    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <nav
      id="navbar"
      className={clsx(scrolled && 'scrolled', menuOpen && 'menu-open')}
      aria-label="Navegação principal"
    >
      <a href="#home" className="nav-brand" aria-label="CampoAgro 2026 - início">
        <Image
          src="/img/logo-campoagro.png"
          alt="CampoAgro Campo do Tenente"
          width={220}
          height={72}
          sizes="140px"
          quality={85}
        />
      </a>
      <ul className="nav-links">
        <li>
          <a href="#sobre" className={activeId === 'sobre' ? 'active' : undefined}>
            Evento
          </a>
        </li>
        <li>
          <a href="#programacao" className={activeId === 'programacao' ? 'active' : undefined}>
            Programação
          </a>
        </li>
        <li>
          <a href="#areas" className={activeId === 'areas' ? 'active' : undefined}>
            Áreas
          </a>
        </li>
        <li>
          <a href="#memorias" className={activeId === 'memorias' ? 'active' : undefined}>
            Galeria
          </a>
        </li>
        <li>
          <a href="#tratoraco" className={activeId === 'tratoraco' ? 'active' : undefined}>
            Tratoraço
          </a>
        </li>
        <li>
          <a href="#patrocinadores" className={activeId === 'patrocinadores' ? 'active' : undefined}>
            Parceiros
          </a>
        </li>
        <li>
          <a href="#expositores" className={activeId === 'expositores' ? 'active' : undefined}>
            Expositores
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/campoagrooficial/" className="nav-cta" target="_blank" rel="noopener">
            Instagram
          </a>
        </li>
      </ul>
      <button
        className="hamburger"
        id="hamburger"
        aria-label="Abrir menu"
        type="button"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
