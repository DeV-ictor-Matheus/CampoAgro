'use client';

import { useState } from 'react';

import ImageExperienceCard from './ImageExperienceCard';
import InfoModal, { type InfoModalContent } from './InfoModal';
import SectionHeader from './SectionHeader';

const ATTRACTIONS = [
  {
    title: 'Evento tecnológico',
    label: 'Inovação',
    summary: 'Soluções, máquinas e conhecimento aplicados ao campo.',
    src: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1400&q=82',
    details: {
      eyebrow: 'Inovação no campo',
      title: 'Evento tecnológico',
      description:
        'Um espaço para aproximar produtores, empresas e visitantes das soluções que impulsionam o agronegócio regional.',
      bullets: ['Máquinas e implementos', 'Soluções para o produtor', 'Conteúdo técnico e demonstrações'],
    },
  },
  {
    title: 'Visita em stands',
    label: 'Negócios',
    summary: 'Marcas, expositores e oportunidades em um ambiente estratégico.',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=82',
    details: {
      eyebrow: 'Relacionamento comercial',
      title: 'Visita em stands',
      description:
        'A feira cria um ambiente de contato direto entre público, empresas, produtores e instituições parceiras.',
      bullets: ['Exposição de marcas', 'Relacionamento com visitantes', 'Geração de oportunidades'],
      cta: { label: 'Quero expor', href: '#expositores' },
    },
  },
  {
    title: 'Tratoraço',
    label: 'Tradição',
    summary: 'A força do produtor rural em movimento.',
    src: 'https://images.pexels.com/photos/27385146/pexels-photo-27385146.jpeg?auto=compress&cs=tinysrgb&w=1400',
    details: {
      eyebrow: 'Identidade rural',
      title: 'Tratoraço',
      description:
        'Uma das marcas do CampoAgro, o Tratoraço valoriza a agricultura, os produtores e a presença das máquinas na cultura local.',
      bullets: ['Desfile de tratores', 'Participação da comunidade rural', 'Celebração da tradição agrícola'],
    },
  },
  {
    title: 'Shows nacionais',
    label: 'Entretenimento',
    summary: 'Atrações musicais para conectar cidade, campo e família.',
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=82',
    details: {
      eyebrow: 'Arena de shows',
      title: 'Shows nacionais',
      description:
        'A programação artística amplia a experiência do visitante e transforma o CampoAgro em um encontro completo para toda a região.',
      bullets: ['Arena principal', 'Atrações musicais', 'Experiência para toda a família'],
    },
  },
];

export default function AttractionsSection() {
  const [open, setOpen] = useState<InfoModalContent | null>(null);

  return (
    <section className="premium-attractions" id="atracoes">
      <div className="container">
        <SectionHeader
          badge="Atrações"
          title={
            <>
              Experiências que conectam <span className="highlight">campo, negócios e entretenimento</span>
            </>
          }
        />

        <div className="attraction-grid attraction-grid--clean">
          {ATTRACTIONS.map((item, index) => (
            <ImageExperienceCard
              key={item.title}
              title={item.title}
              label={item.label}
              summary={item.summary}
              src={item.src}
              index={index}
              details={item.details}
              onOpen={setOpen}
            />
          ))}
        </div>
      </div>
      <InfoModal content={open} onClose={() => setOpen(null)} />
    </section>
  );
}
