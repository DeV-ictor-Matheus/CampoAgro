import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

import ClarityScript from './_components/analytics/ClarityScript';
import CookieBanner from './_components/consent/CookieBanner';

export const viewport: Viewport = {
  themeColor: '#040404',
};

export const metadata: Metadata = {
  title: 'CampoAgro 2026 | Plantando na terra a semente do futuro',
  description:
    'CampoAgro 2026 - feira agropecuária, inovação rural, negócios, Tratoraço e entretenimento em Campo do Tenente, Paraná.',
  keywords: [
    'CampoAgro',
    'CampoAgro 2026',
    'agronegócio',
    'Campo do Tenente',
    'Paraná',
    'feira agropecuária',
    'agricultura familiar',
    'Tratoraço',
    'shows',
  ],
  icons: {
    icon: '/img/logo-campoagro.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>
        {children}
        <CookieBanner />
        <ClarityScript />
      </body>
    </html>
  );
}
