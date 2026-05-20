import AreasSection from './home/AreasSection';
import AttractionsSection from './home/AttractionsSection';
import ContactSection from './home/ContactSection';
import CountdownSection from './home/CountdownSection';
import ExpositoresSection from './home/ExpositoresSection';
import HeroSection from './home/HeroSection';
import LoadingOverlay from './home/LoadingOverlay';
import MemoriasSection from './home/MemoriasSection';
import Navbar from './home/Navbar';
import PatrocinadoresSection from './home/PatrocinadoresSection';
import RevealOnScroll from './home/RevealOnScroll';
import SiteFooter from './home/SiteFooter';
import ShowsSection from './home/ShowsSection';
import SobreSection from './home/SobreSection';
import WhatsAppFloat from './home/WhatsAppFloat';

export default function HomeLanding() {
  return (
    <>
      <LoadingOverlay />
      <WhatsAppFloat />
      <Navbar />
      <main>
        <HeroSection />
        <SobreSection />
        <CountdownSection />
        <AttractionsSection />
        <ShowsSection />
        <AreasSection />
        <ExpositoresSection />
        <PatrocinadoresSection />
        <MemoriasSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <RevealOnScroll />
    </>
  );
}
