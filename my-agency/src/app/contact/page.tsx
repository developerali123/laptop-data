import ContactHero from "@/src/components/Contact/ContactHero";
import ContactForm from "@/src/components/Contact/ContactForm";
import StayConnected from "@/src/components/Home/StayConnected"; // Optional: Agar newsletter chahiye

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen pt-20">

            {/* 1. Hero Text */}
            <ContactHero />

            {/* 2. Main Form Area */}
            <ContactForm />

            {/* 3. Footer Area (Optional) */}
            <StayConnected />

        </div>
    );
}