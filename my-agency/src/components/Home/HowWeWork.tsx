export default function HowWeWork() {
    const steps = [
        {
            id: "01",
            title: "Audit & Strategy",
            description: "We tear down your current setup to find the hidden leaks. Then, we build a roadmap that actually converts.",
            active: false
        },
        {
            id: "02",
            title: "Execution",
            description: "We launch the funnel, craft high-converting creatives, and set the ads live. No guesswork, just action.",
            active: false
        },
        {
            id: "03",
            title: "Scale & Optimize",
            description: "We read the data. We cut the losers. We double down on the winners. Rinse and repeat for maximum ROI.",
            active: true // Screenshot mein 3rd step par orange dot hai
        }
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">

            {/* Background Grid Pattern (Subtle) */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* HEADER */}
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                        <span className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">Our Process</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-brand-black uppercase tracking-tight">
                        How We <span className="text-brand-orange">Work</span>
                    </h2>
                </div>

                {/* STEPS GRID */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gray-100 -z-10"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative group">

                            {/* Dot on Line */}
                            <div className={`hidden md:flex absolute top-12 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white z-10 
                ${step.active ? "bg-brand-orange ring-4 ring-orange-100" : "bg-gray-200"}`}>
                            </div>

                            {/* Step Content */}
                            <div className="pt-8 md:pt-24 text-center md:text-left px-4">

                                {/* Big Background Number */}
                                <div className="mb-4 relative">
                                    <span className={`text-6xl md:text-8xl font-black opacity-10 select-none
                     ${step.active ? "text-brand-orange" : "text-gray-300"}`}>
                                        {step.id}
                                    </span>
                                    {/* Title overlapping the number slightly */}
                                    <h3 className="absolute bottom-2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 text-xl font-bold text-brand-black uppercase whitespace-nowrap">
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    {step.description}
                                </p>

                                {/* Orange Underline Bar */}
                                <div className={`h-1.5 w-12 rounded-full mx-auto md:mx-0
                  ${step.active ? "bg-brand-orange" : "bg-brand-orange/40 group-hover:bg-brand-orange transition-colors"}`}>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}