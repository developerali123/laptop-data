import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import MapSection from "@/components/MapSection";
import FeatureCards from "@/components/FeatureCards";
import PricingSection from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <MapSection />
      <FeatureCards />
      <PricingSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
