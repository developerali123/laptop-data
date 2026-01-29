import Link from "next/link";

export default function GetInTouch() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">

            {/* Background Ambience (Subtle Orange Glow behind text) */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">

                    {/* Main Heading */}
                    <div className="max-w-4xl">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] tracking-tight">
                            Ready to grow with <br className="hidden md:block" />
                            <span className="text-gray-400">clarity and strategy?</span>
                        </h2>
                        <p className="mt-6 text-xl md:text-2xl text-white font-medium">
                            Let’s turn your vision into results.
                        </p>
                    </div>

                    {/* Premium CTA Button */}
                    <div className="flex-shrink-0">
                        <Link href="/contact">
                            <button className="group relative px-10 py-5 bg-gradient-to-r from-brand-orange to-orange-600 text-white font-bold text-sm md:text-base uppercase tracking-widest rounded-full overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] hover:scale-105 transition-all duration-300">
                                <span className="relative z-10">Get in touch today.</span>

                                {/* Button Shine Animation */}
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"></div>
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}