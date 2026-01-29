import Hero from "../components/Hero";

import ContentSection from "../components/ContentSection";
import Services from "../components/Services";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonial";
import Contact from "../components/Contact";
import GetInTouch from "../components/About/GetInTouch";
import StayConnected from "../components/Home/StayConnected";

export default function RootPage() {
  return (
    <div className="bg-brand-black min-h-screen text-white">
      {/* 1. Main Hero (Scale your online presence) */}
      <Hero />

      {/* 2. Intro Content */}
      <ContentSection />

      {/* 3. Services */}
      <Services />

      {/* 4. About */}

      {/* 5. Process */}
      <Process />

      {/* 6. Pricing */}
      <Pricing />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Contact */}
      <Contact />
      <StayConnected />
      {/* < GetInTouch /> */}
    </div>
  );
}