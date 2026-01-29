import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center bg-brand-black overflow-hidden">

            {/* 1. Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/Skarmavbild-2021-11-11-kl.-09.53.15.png"
                    alt="Office Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Adjusted Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>

            {/* 2. Content Container */}
            {/* FIXED: Removed '-mt-24' and used 'pt-32' to push content down safely */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 text-white pt-32 pb-20">

                <div className="max-w-4xl">
                    <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-white-400 mb-6">
                        Grow your business with authenticity and grit
                    </p>

                    <h1 className="text-6xl md:text-8xl font-medium leading-[1.1] mb-8 tracking-tight">
                        Scale your online <br />
                        <span className="font-semibold">presence</span>
                    </h1>

                    <div className="flex flex-col md:flex-row items-start gap-5 mb-12 max-w-3xl">
                        <span className="text-brand-orange text-2xl mt-1">💡</span>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                            You get access to my executive strategies tailored for your business.
                            My work is straightforward, structured, clear, and honest.
                            I help business owners and startups with organic social media presence
                            and setting up a streamlined advertising funnel.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-5">
                        <button className="px-10 py-4 border-2 border-white rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                            Learn More &rarr;
                        </button>

                        <button className="px-10 py-4 bg-brand-orange text-black rounded-full font-bold text-sm uppercase tracking-wider hover:bg-orange-400 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                            Get Started &rarr;
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}