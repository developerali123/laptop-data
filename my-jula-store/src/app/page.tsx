import HeroSection from "../components/Hero";
import CategorySection from "../components/CategorySection";
import SuperDeals from "../components/SuperDeals";
import PromotionalCards from "../components/PromotionalCards";
import ChristmasGiftSlider from "../components/GiftCategorySlider";
import ProductSlider from "../components/ProductSlider";
import ServiceFeatures from "../components/ServiceFeatures";
export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-10">
        <HeroSection />
        <CategorySection />
        <SuperDeals />
        <PromotionalCards />
        <ChristmasGiftSlider />
        <ProductSlider />
        <ServiceFeatures />
      </main>
    </div>
  );
}