import Script from 'next/script';

import HomeLanding from './_components/HomeLanding';

export default function HomePage() {
  return (
    <>
      <HomeLanding />
      <Script src="/assets/js/main.js" type="module" strategy="afterInteractive" />
    </>
  );
}
