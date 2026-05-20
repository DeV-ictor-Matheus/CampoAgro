'use client';

import { useCallback } from 'react';

type Tags = Record<string, string>;
type TrackFn = (eventName: string, tags?: Tags) => void;

// Verifica consentimento antes de qualquer chamada ao Clarity (LGPD)
function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem('campoagro_consent');
    if (!raw) return false;
    const { status } = JSON.parse(raw) as { status: string };
    return status === 'granted';
  } catch {
    return false;
  }
}

export function useClarityTrack(): TrackFn {
  return useCallback((eventName: string, tags?: Tags) => {
    if (!hasConsent()) return;
    if (typeof window === 'undefined' || typeof window.clarity !== 'function') return;

    if (tags) {
      for (const [key, value] of Object.entries(tags)) {
        window.clarity('set', key, value);
      }
    }

    window.clarity('event', eventName);
  }, []);
}
