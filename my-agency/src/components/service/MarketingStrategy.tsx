import Image from "next/image";
import Link from "next/link";

export default function MarketingStrategy() {
    return (
        // CHANGE 1: Padding kam ki (py-24 -> py-12) taake content upar aaye
        <section className="py-12 lg:py-16 bg-white overflow-hidden relative">

            {/* Background Decor (Subtle Pattern) */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gray-50 skew-x-12 -z-10 opacity-70"></div>

            <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">

                {/* CHANGE 2: Gap adjust kiya (Connected feel ke liye) */}
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

                    {/* LEFT SIDE: Text Content */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left">

                        <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs mb-3 animate-pulse">
                            Custom Approach
                        </p>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-black mb-6 leading-[1.1] tracking-tight">
                            Your Marketing Strategy <br />
                            <span className="relative inline-block text-brand-orange">
                                Clear & Ready to Scale.
                                {/* Underline Graphic */}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-orange/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </h2>

                        {/* Paragraph (Margin kam kiya: mb-8) */}
                        <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light max-w-xl mx-auto lg:mx-0 border-l-4 border-brand-orange/30 pl-6">
                            Our mission is simple: to take what makes your brand unique and turn it into a
                            digital growth engine. We help you show up consistently, connect authentically,
                            and expand your reach with strategies tailored to your strengths.
                        </p>

                        {/* Premium Button */}
                        <Link href="/contact">
                            <button className="group relative px-10 py-4 bg-gradient-to-r from-brand-orange to-orange-500 text-black font-bold text-sm uppercase tracking-wider rounded-full overflow-hidden shadow-[0_10px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_15px_30px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all duration-300">
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Your Strategy
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* RIGHT SIDE: Image */}
                    <div className="w-full lg:w-1/2 relative flex justify-center order-1 lg:order-2">

                        <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl group z-10">
                            <Image
                                src="/pexels-kindelmedia-7688336-1536x1152.jpg"
                                alt="Strategic Marketing Meeting"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>

                        {/* Border Offset thora tight kiya */}
                        <div className="absolute top-6 right-6 w-full h-full max-w-lg aspect-[4/3] border-2 border-brand-orange/30 rounded-[2.5rem] -z-0"></div>

                    </div>

                </div>
            </div>
        </section>
    );
}