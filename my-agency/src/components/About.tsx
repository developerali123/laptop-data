import Image from "next/image";

export default function About() {
    return (
        <section className="py-24 md:py-32 bg-brand-black text-white overflow-hidden relative">

            {/* 1. Background Glow Effect (Subtle Orange Light) */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-orange opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 md:gap-24">

                {/* LEFT: Image with Professional Frame */}
                <div className="w-full md:w-1/2 relative group">
                    {/* Main Image Container */}
                    <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-gray-800 shadow-2xl z-10 bg-gray-900">
                        <Image
                            src="/profile2.jpg" // <--- FIXED PATH (Public folder se direct utha raha hai)
                            alt="Founder"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition duration-700 ease-in-out scale-100 group-hover:scale-105"
                        />

                        {/* Floating Glass Badge (Name Plate) */}
                        <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <p className="text-[10px] text-brand-orange font-bold uppercase tracking-widest mb-1">Founder</p>
                            <p className="text-white font-bold text-lg leading-none">Elin Smith</p>
                        </div>
                    </div>

                    {/* Decorative Border Behind Image (Offset) */}
                    <div className="absolute top-4 -left-4 w-full h-full max-w-md border border-gray-700 rounded-2xl -z-10 hidden md:block group-hover:top-2 group-hover:-left-2 transition-all duration-500"></div>
                </div>

                {/* RIGHT: Content with Better Typography */}
                <div className="w-full md:w-1/2 relative z-10">

                    {/* Label */}
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-10 h-[2px] bg-brand-orange"></span>
                        <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs">
                            Who We Are
                        </span>
                    </div>

                    {/* Massive Heading */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
                        NOT YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">AVERAGE</span> <br />
                        <span className="text-brand-orange">AGENCY.</span>
                    </h2>

                    {/* Styled Paragraphs */}
                    <div className="border-l-2 border-brand-orange/30 pl-8 mb-10 space-y-6">
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                            We dont just post content; we build systems. Based in Stockholm, we help ambitious brands scale through <span className="text-white font-semibold">data-driven creativity.</span>
                        </p>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            No fluff, no vanity metrics. Just real revenue growth and a brand aesthetic that dominates your niche.
                        </p>
                    </div>

                    {/* Modern CTA Button */}
                    <button className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-full overflow-hidden hover:bg-brand-orange transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                        <span className="relative z-10 flex items-center gap-3">
                            Read Our Story
                            {/* Arrow Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </span>
                    </button>
                </div>

            </div>
        </section>
    );
}