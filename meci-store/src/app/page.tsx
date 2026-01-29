import Navbar from "@/src/components/Navbar";
import HeroSection from "@/src/components/Hero";
import ServiceFeatures from "@/src/components/ServiceFeatures";
import GiftCategorySlider from "@/src/components/GiftCategorySlider";
import SuperDeals from "@/src/components/SuperDeals";
import PromotionalCards from "@/src/components/PromotionalCards";
import ProductSlider from "@/src/components/ProductSlider";
import Footer from "@/src/components/Footer";
import ProductGrid from "@/src/components/ProductGrid"; // New Imp
import { getProducts } from "@/src/lib/woocommerce";

export default async function Home() {
  // 1. Data Fetching
  const featuredProducts = await getProducts({ featured: true, per_page: 8 });
  const saleProducts = await getProducts({ on_sale: true, per_page: 8 });
  const newArrivals = await getProducts({ per_page: 8 });

  // Grid ke liye hum ZIADA products mangwate hain (e.g. 20)
  const allProducts = await getProducts({ per_page: 20 });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <HeroSection />
      <GiftCategorySlider />
      <SuperDeals deals={saleProducts} />

      <PromotionalCards />


      <div className="container mx-auto mt-12">
        <ProductSlider title="Trending Products" products={featuredProducts} />
      </div>



      <div className="container mx-auto mb-12">
        <ProductSlider title="New Arrivals" products={newArrivals} />
      </div>

      <ProductGrid title="Explore All Products" products={allProducts} />
      <ServiceFeatures />

      <Footer />
    </main>
  );
}