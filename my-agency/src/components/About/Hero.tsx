import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center bg-brand-black overflow-hidden py-20 lg:py-0">

            {/* Background Ambience (Subtle Noise/Grid) */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* 1. LEFT SIDE: Typography & Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left pt-10 lg:pt-0">

                        {/* Animated Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">
                                Our Story & Vision
                            </span>
                        </div>

                        {/* Massive Heading with Gradient */}
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
                            Building Brands with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-400">
                                Authenticity & Grit.
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                            We are more than just a digital agency; we are your strategic partners.
                            Real growth comes from <span className="text-white font-medium">honest, transparent, and data-driven marketing.</span>
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/contact">
                                <button className="px-10 py-4 bg-brand-orange text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                                    Start Scaling
                                </button>
                            </Link>
                            <Link href="#story">
                                <button className="px-10 py-4 bg-transparent border border-white/20 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white/10 hover:border-white transition-all duration-300">
                                    Read Story &darr;
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* 2. RIGHT SIDE: Premium Image Layout */}
                    <div className="w-full lg:w-1/2 relative flex justify-center">

                        {/* The "Glow" Effect (Shashka #1) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-orange/20 blur-[100px] rounded-full -z-10"></div>

                        {/* Main Image Container */}
                        <div className="relative w-[350px] md:w-[450px] aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-white/5 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700 ease-out">
                            <Image
                                src="/Skarmavbild-2021-11-11-kl.-09.53.15.png" // Wahi image
                                alt="Elin Smith"
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-700"
                                priority
                            />

                            {/* Dark Gradient at Bottom */}
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>

                        {/* Floating Glass Card (Shashka #2) */}
                        <div className="absolute bottom-10 -left-6 md:-left-12 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-xl">
                                    🚀
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">Since 2021</p>
                                    <p className="text-gray-300 text-xs uppercase tracking-wide">Helping Brands Grow</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Decor Elements (Shashka #3) */}
                        <div className="absolute -top-10 right-0 text-brand-orange text-6xl opacity-50 animate-pulse">
                            ✦
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}