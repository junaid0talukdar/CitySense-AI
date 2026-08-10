import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CategoriesSection from "@/components/CategoriesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AIDemo from "@/components/AIDemo";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SeedInitializer from "@/components/SeedInitializer";

export default function HomePage() {
  return (
    <>
      <SeedInitializer />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <HowItWorksSection />
        <AIDemo />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
