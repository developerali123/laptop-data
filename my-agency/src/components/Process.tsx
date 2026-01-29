const steps = [
    { id: "01", title: "Audit & Strategy", desc: "We tear down your current setup to find the hidden leaks. Then, we build a roadmap that actually converts." },
    { id: "02", title: "Execution", desc: "We launch the funnel, craft high-converting creatives, and set the ads live. No guesswork, just action." },
    { id: "03", title: "Scale & Optimize", desc: "We read the data. We cut the losers. We double down on the winners. Rinse and repeat for maximum ROI." },
];

export default function Process() {
    return (
        <section className="py-24 lg:py-32 bg-white text-brand-black relative overflow-hidden">

            {/* Background Decor (Grid Lines) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-20 md:mb-32">
                    <div className="inline-flex items-center gap-2 mb-4 justify-center">
                        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
                            Our Process
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                        How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-600">Work</span>
                    </h2>
                </div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-12 relative">

                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gray-100 -z-10"></div>

                    {steps.map((step) => (
                        <div key={step.id} className="group relative pt-8 md:pt-16 px-4">

                            {/* Dot on Line */}
                            <div className="hidden md:block absolute top-[46px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-gray-200 rounded-full group-hover:border-brand-orange transition-colors duration-500 z-10"></div>

                            {/* Massive Watermark Number */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[120px] md:text-[140px] font-black text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none select-none z-0 scale-150">
                                {step.id}
                            </div>

                            {/* Visible Number */}
                            <div className="text-5xl md:text-6xl font-black text-gray-200 mb-6 group-hover:text-brand-orange transition-colors duration-500 relative z-10">
                                {step.id}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Hover Border Bottom */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-orange group-hover:w-full transition-all duration-500 ease-out mt-8"></div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}