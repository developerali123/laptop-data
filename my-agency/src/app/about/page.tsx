// 1. New About Components
import Hero from "@/src/components/About/Hero";
import AboutHero from "@/src/components/About/AboutHero";
import Story from "@/src/components/About/Story";
import Values from "@/src/components/About/Values";
import AboutServices from "@/src/components/About/AboutServices";
import Testimonial from "@/src/components/Testimonial";
import GetInTouch from "@/src/components/About/GetInTouch";
import Contact from "@/src/components/Contact";
import Counter from "@/src/components/About/Counter"; //
export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">

            <Hero />
            {/* Hero Section */}
            <AboutHero />

            {/* Our Story (Images + Text) */}
            <Story />

            {/* Our Values (Grid) */}
            <Values />
            <AboutServices />
            <Counter />

            <Testimonial />

            {/* Newsletter (Reused) */}
            <Contact /> 
            <GetInTouch />

        </div>
    );
}