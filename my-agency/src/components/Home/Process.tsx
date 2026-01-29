export default function Process() {
    const steps = [
        {
            id: "01",
            title: "Audit & Strategy",
            desc: "We tear down your current setup to find the hidden leaks. Then, we build a roadmap that actually converts."
        },
        {
            id: "02",
            title: "Execution",
            desc: "We launch the funnel, craft high-converting creatives, and set the ads live. No guesswork, just action."
        },
        {
            id: "03",
            title: "Scale & Optimize",
            desc: "We read the data. We cut the losers. We double down on the winners. Rinse and repeat for maximum ROI."
        },
    ];

    return (
        // Changed: py-32 -> py-20 (Compact Vertical Spacing)
        <section className="py-20 bg-white text-brand-black relative overflow-hidden">

            {/* Background Decor (Subtle Grid) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header: mb-32 -> mb-16 */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-3 justify-center">
                        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
                            Our Process
                        </span>
                    </div>
                    {/* Font size reduced slightly for better fit */}
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                        How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-600">Work</span>
                    </h2>
                </div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-8 relative">

                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-[2px] bg-gray-100 -z-10"></div>

                    {steps.map((step) => (
                        <div key={step.id} className="group relative pt-12 px-4 hover:-translate-y-2 transition-transform duration-500">

                            {/* Dot on Line */}
                            <div className="hidden md:block absolute top-[2.2rem] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-gray-200 rounded-full group-hover:border-brand-orange group-hover:scale-125 transition-all duration-500 z-10"></div>

                            {/* Massive Watermark Number (Subtle & Layered) */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[100px] font-black text-gray-100 opacity-50 group-hover:opacity-100 group-hover:text-gray-50 transition-all duration-500 pointer-events-none select-none z-0">
                                {step.id}
                            </div>

                            {/* Visible Number */}
                            <div className="text-center md:text-left relative z-10 mb-4">
                                <span className="text-4xl font-black text-gray-300 group-hover:text-brand-orange transition-colors duration-500">
                                    {step.id}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 text-center md:text-left">
                                <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight group-hover:text-brand-orange transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 text-base md:text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Hover Border Bottom (Subtle Line) */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-1/2 transition-all duration-500 ease-out mt-6"></div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}