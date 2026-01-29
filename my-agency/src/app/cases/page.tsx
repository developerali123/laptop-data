import CasesHero from "@/src/components/Cases/CasesHero";
import CaseStudiesGrid from "@/src/components/Cases/CaseStudiesGrid";
import StayConnected from "@/src/components/Home/StayConnected";
import GetInTouch from "@/src/components/About/GetInTouch";

export default function CasesPage() {
    return (
        <div className="bg-white min-h-screen pt-20"> {/* pt-20 added for Navbar space */}

            {/* 1. Hero Text */}
            <CasesHero />

            {/* 2. Grid of Projects */}
            <CaseStudiesGrid />

            {/* 3. Footer CTAs */}
            <StayConnected />
            <GetInTouch />

        </div>
    );
}