import Image from 'next/image';

export default function ContentSection() {
    return (
        <section className="py-20 lg:py-28 bg-white text-brand-black overflow-hidden">

            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* LEFT SIDE: Text Content (Same as before) */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">

                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-gray-500">
                            Social Media Content
                        </h3>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                            Your Sales Team <br /> at work
                        </h2>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-[#2D8CFF] text-white w-12 h-12 flex items-center justify-center rounded-lg shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                                24/7
                            </span>
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
                            To have a social media plan of action and stay on course is an amazing,
                            longlasting way to help your business grow. Tell your STORY!
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
                            {['Strategic Planning', 'Content Creation', 'Daily Engagement', 'Performance Analytics'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium text-base">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-brand-orange text-black rounded-full font-bold text-sm uppercase tracking-wider hover:bg-orange-500 transition-colors shadow-lg cursor-pointer">
                                Get Started &rarr;
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-gray-900 text-black rounded-full font-bold text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors cursor-pointer">
                                Learn More &rarr;
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Image with "Founder Style" Animation */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">

                        {/* Added 'group' class here for hover trigger */}
                        <div className="relative w-full max-w-[500px] aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-xl group">
                            <Image
                                src="/profile2.jpg"
                                alt="Social Media Strategy"
                                fill
                                className="object-cover object-top hover:scale-105 transition duration-700 ease-out grayscale group-hover:grayscale-0" // Grayscale effect also added
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* 👇 ANIMATION OVERLAY ADDED HERE */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">

                                {/* Slide Up Text */}
                                <div className="transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    <p className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-2">
                                        CEO AND Founder
                                    </p>
                                    <h3 className="text-3xl font-bold text-white leading-none">
                                        Sarah Jenkins
                                    </h3>
                                    <div className="w-12 h-1 bg-brand-orange mt-4 rounded-full"></div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}