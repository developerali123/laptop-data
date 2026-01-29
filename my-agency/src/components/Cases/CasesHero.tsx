export default function CasesHero() {
    return (
        // CHANGE: 'pt-28' -> 'pt-24' (Bilkul upar shift kar diya)
        <section className="relative pt-24 pb-12 bg-white overflow-hidden">

            {/* Background Decor (Subtle Premium Feel) */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 -z-10 opacity-60"></div>
            <div className="absolute -left-20 top-20 w-72 h-72 bg-brand-orange/5 rounded-full blur-[100px] -z-10"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-4xl">

                    {/* Decorative Label (Margin bottom kam kiya) */}
                    <div className="flex items-center gap-3 mb-2 animate-fade-in">
                        <span className="w-10 h-[2px] bg-brand-orange"></span>
                        <span className="text-brand-orange font-bold uppercase tracking-[0.25em] text-xs">
                            Our Portfolio
                        </span>
                    </div>

                    {/* Header (Massive & Tight) */}
                    <h1 className="text-6xl md:text-8xl font-black text-brand-black mb-4 tracking-tighter leading-none">
                        Cases
                    </h1>

                    {/* Subheader */}
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.1]">
                        Real Strategies. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-500">
                            Real Results.
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-light max-w-2xl border-l-4 border-gray-100 pl-6">
                        We don’t just talk about growth—we make it happen. Here’s a look at how
                        we’ve helped businesses like yours build their presence, scale their impact,
                        and turn strategy into success.
                    </p>

                </div>
            </div>
        </section>
    );
}