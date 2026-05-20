'use client';

import { useEffect, useRef, useState } from 'react';

type ConsentStatus = 'granted' | 'denied';

interface ConsentRecord {
  status: ConsentStatus;
  timestamp: number;
}

function readConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem('campoagro_consent');
    if (!raw) return null;
    return JSON.parse(raw) as ConsentRecord;
  } catch {
    return null;
  }
}

function saveConsent(status: ConsentStatus) {
  const record: ConsentRecord = { status, timestamp: Date.now() };
  localStorage.setItem('campoagro_consent', JSON.stringify(record));
}

function applyClarity(status: ConsentStatus) {
  if (typeof window === 'undefined' || typeof window.clarity !== 'function') return;
  window.clarity('consent', status === 'granted');
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    } else {
      // Reaplica consentimento já registrado após cada navegação (SPA hydration)
      applyClarity(existing.status);
    }
  }, []);

  // Foca no primeiro botão de ação quando o banner abre (acessibilidade)
  useEffect(() => {
    if (visible) {
      acceptRef.current?.focus();
    }
  }, [visible]);

  // Fecha com ESC (acessibilidade — trata como recusa implícita)
  useEffect(() => {
    if (!visible) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleDecline();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  });

  function handleAccept() {
    saveConsent('granted');
    applyClarity('granted');
    setVisible(false);
  }

  function handleDecline() {
    saveConsent('denied');
    applyClarity('denied');
    setVisible(false);
  }

  // Exposto globalmente para o botão "Preferências de cookies" no rodapé
  useEffect(() => {
    window.__campoagroOpenCookiePrefs = () => setVisible(true);
    return () => {
      delete window.__campoagroOpenCookiePrefs;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de privacidade e cookies"
      aria-describedby="cookie-banner-desc"
    >
      <div className="cookie-banner__inner">
        <p className="cookie-banner__text" id="cookie-banner-desc">
          Usamos{' '}
          <strong>Microsoft Clarity</strong> para registrar cliques, scroll e gravações de sessão
          anônimas — dados usados internamente e em relatórios agregados para patrocinadores.
          Nenhum dado pessoal identificável é coletado.{' '}
          <a href="/privacidade" className="cookie-banner__link">
            Política de privacidade
          </a>
          .
        </p>
        <div className="cookie-banner__actions" role="group" aria-label="Opções de consentimento">
          <button
            ref={acceptRef}
            type="button"
            className="cookie-banner__btn cookie-banner__btn--accept"
            onClick={handleAccept}
          >
            Aceitar todos
          </button>
          <button
            type="button"
            className="cookie-banner__btn cookie-banner__btn--decline"
            onClick={handleDecline}
          >
            Apenas essenciais
          </button>
          <a
            href="/privacidade"
            className="cookie-banner__btn cookie-banner__btn--more"
          >
            Saber mais
          </a>
        </div>
      </div>
    </div>
  );
}
