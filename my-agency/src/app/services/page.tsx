import ServiceHero from "@/src/components/service/ServiceHero";
import StayConnected from "@/src/components/Home/StayConnected";
import GetInTouch from "@/src/components/About/GetInTouch";
import MarketingStrategy from "@/src/components/service/MarketingStrategy";
import Testimonials from "@/src/components/Home/Testimonials";
import Process from "@/src/components/Process";
import Testimonial from "@/src/components/Testimonial";
import Contact from "@/src/components/Contact";

export default function ServicesPage() {
    return (
        <div className="bg-white min-h-screen pt-20">
            <MarketingStrategy />
            <ServiceHero />

            <Process />
            {/* Social Proof */}
            {/* <Testimonials /> */}
            <Testimonial />
            <Contact />
            <StayConnected />
            {/* <GetInTouch /> */}

        </div>
    );
}