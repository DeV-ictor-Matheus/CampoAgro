'use client';

export default function CookiePrefsButton() {
  function handleClick() {
    window.__campoagroOpenCookiePrefs?.();
  }

  return (
    <button
      type="button"
      className="cookie-prefs-trigger"
      onClick={handleClick}
      aria-label="Abrir preferências de cookies"
    >
      Preferências de cookies
    </button>
  );
}
