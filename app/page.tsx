import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { SampleOutputSection } from "@/components/landing/SampleOutputSection";
import { ProTeaserSection } from "@/components/landing/ProTeaserSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <SampleOutputSection />
        <ProTeaserSection />
      </main>
      <Footer />
    </>
  );
}
