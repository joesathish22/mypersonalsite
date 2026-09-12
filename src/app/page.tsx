import { Hero } from "@/components/hero/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { TechJourney } from "@/components/sections/TechJourney";
import { AIReady } from "@/components/sections/AIReady";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { QTTSection } from "@/components/sections/QTT";
import { GlobalCollaboration } from "@/components/sections/GlobalCollaboration";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <TechJourney />
      <AIReady />
      <SelectedWork />
      <About />
      <QTTSection />
      <GlobalCollaboration />
      <Contact />
    </>
  );
}
