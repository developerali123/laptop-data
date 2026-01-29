export default function ContactHero() {
    return (
        // CHANGE: pt-32 -> pt-24 (Top kam kiya), pb-16 -> pb-8 (Bottom kam kiya)
        <section className="pt-12 pb-8 bg-white relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 -z-10 opacity-60"></div>
            <div className="absolute left-[-10%] top-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-4xl">

                    {/* Label (Margin kam kiya: mb-4 -> mb-3) */}
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-[2px] bg-brand-orange"></span>
                        <span className="text-brand-orange font-bold uppercase tracking-[0.25em] text-xs">
                            Get In Touch
                        </span>
                    </div>

                    {/* Heading (Margin kam kiya: mb-6 -> mb-4) */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-black mb-4 tracking-tighter leading-[0.9]">
                        Let’s Build <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-500">
                            Something Great.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-light max-w-2xl border-l-4 border-gray-100 pl-6">
                        Ready to scale your brand? Whether you have a specific project in mind or just want to explore what's possible, we're here to listen.
                    </p>

                </div>
            </div>
        </section>
    );
}