'use client';

import { useClarityTrack } from '@/hooks/useClarityTrack';

export default function HeroButtons() {
  const track = useClarityTrack();

  return (
    <div className="hero-buttons">
      <a
        href="?interesse=ingresso#expositores"
        className="btn-primary"
        onClick={() => track('cta_ingresso_click')}
      >
        Comprar ingresso
      </a>
      <a
        href="#atracoes"
        className="btn-outline"
        onClick={() => track('cta_programacao_click')}
      >
        Ver programação
      </a>
    </div>
  );
}
