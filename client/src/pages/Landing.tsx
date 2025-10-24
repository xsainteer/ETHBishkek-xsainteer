import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <HowItWorks />
        <BenefitsSection />
        <FeaturesShowcase />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
