import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { TechJourney } from "@/components/sections/TechJourney";
import { AIReady } from "@/components/sections/AIReady";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { QTTSection } from "@/components/sections/QTT";
import { GlobalCollaboration } from "@/components/sections/GlobalCollaboration";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <div id="nav-sentinel" className="absolute top-0 h-px w-full" aria-hidden="true" />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Metrics />
        <TechJourney />
        <AIReady />
        <SelectedWork />
        <About />
        <QTTSection />
        <GlobalCollaboration />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
