'use client';

import Script from 'next/script';

const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

// Não carrega em dev sem ID configurado
export default function ClarityScript() {
  if (!PROJECT_ID) return null;

  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${PROJECT_ID}");
          /* LGPD: aguarda confirmação explícita do usuário antes de coletar dados */
          clarity("consent", false);
        `,
      }}
    />
  );
}
