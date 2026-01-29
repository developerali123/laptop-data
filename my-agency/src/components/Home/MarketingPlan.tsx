import Image from "next/image";
import Link from "next/link";

export default function MarketingPlan() {
    return (
        // Changed: py-24 -> py-20
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                {/* Changed: gap-24 -> gap-12 */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Left: Text */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <p className="text-lime-500 font-bold text-sm mb-2 tracking-wide uppercase">
                            Marketing plan
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-6">
                            Plan ahead
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                            In order to succeed, you need to set SMART goals and follow a plan.
                            We can advice you on how to build a solid marketing plan, and if you
                            want us to keep working, we will also build it, optimize continuously
                            and report monthly results.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact">
                                <button className="px-8 py-3 bg-brand-orange text-black rounded-full font-bold text-sm uppercase tracking-wider hover:bg-orange-600 transition-all duration-300 shadow-lg">
                                    GET STARTED &rarr;
                                </button>
                            </Link>
                            <Link href="/about">
                                <button className="px-8 py-3 bg-transparent border-2 border-brand-black text-brand-black rounded-full font-bold text-sm uppercase tracking-wider hover:bg-brand-black hover:text-white transition-all duration-300">
                                    LEARN MORE &rarr;
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full lg:w-1/2 relative flex justify-center order-1 lg:order-2">
                        <div className="absolute top-4 w-[75%] h-[90%] bg-blue-50 rounded-full -z-10 scale-105"></div>
                        <div className="relative z-10 w-full max-w-sm flex justify-center">
                            <div className="relative w-[320px] h-[400px]">
                                <Image
                                    src="/profile.jpg" // Image name check karein
                                    alt="Marketing Expert"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        {/* Decoration Star */}
                        <div className="absolute top-0 right-10 text-blue-500">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="rotate-12">
                                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}