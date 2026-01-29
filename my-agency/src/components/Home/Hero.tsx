import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center bg-brand-black overflow-hidden">

            {/* 1. Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/Skarmavbild-2021-11-11-kl.-09.53.15.png" // Image naam check kar lena public folder mein
                    alt="Office Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay (Opacity 70%) */}
                <div className="absolute inset-0 bg-black/70"></div>
            </div>

            {/* 2. Main Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 text-white pt-20">

                <div className="max-w-5xl"> {/* Width thori barha di taake text fit aye */}

                    {/* Top Label */}
                    <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-gray-300 mb-6 border-l-4 border-brand-orange pl-4">
                        Grow your business with honesty and grit
                    </p>

                    {/* Heading (Size adjust kar diya hai taake screen se bahar na jaye) */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 tracking-tight">
                        Digital Growth with <br />
                        <span className="text-white">Data driven Marketing</span>
                    </h1>

                    {/* Description Paragraph (Aapka diya hua text) */}
                    <div className="flex flex-col md:flex-row items-start gap-6 mb-12 max-w-4xl">
                        {/* Bulb Icon */}
                        <span className="text-brand-orange text-2xl hidden md:block mt-1">💡</span>

                        <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light text-justify">
                            We understand all the hard work that goes into your business and will coach you on how to navigate the vast marketing landscape.
                            With years of experience in building brands and increasing sales through digital marketing, we can help you grow.
                            Our work is straightforward, structured, clear, and honest. You will learn as you grow when we work together.
                            With a data-driven mindset and creative insights, you will have a strong strategic partner on your side.
                            Get in contact with us when you need to plan, build, or optimize your digital presence and get valuable insights all the way through.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <Link href="/about">
                            <button className="px-8 py-3 border border-white rounded-full font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                                Learn More &rarr;
                            </button>
                        </Link>

                        <Link href="/contact">
                            <button className="px-8 py-3 bg-brand-orange text-black rounded-full font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-orange-400 transition-all duration-300 shadow-lg hover:shadow-orange-500/20">
                                Get Started &rarr;
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}