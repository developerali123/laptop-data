
export default function AboutServices() {
    const services = [
        {
            id: 1,
            title: "Organic Growth",
            description: "We build your brand presence where it matters—with real followers, real engagement, and a content strategy that reflects your voice.",
            icon: "🌱",
            tag: "Platform Audit Included"
        },
        {
            id: 2,
            title: "Funnel Setup",
            description: "We craft data-driven funnels that turn visitors into leads and leads into loyal customers. No guesswork, just results.",
            icon: "⚙️",
            tag: "Meta & Google Ads"
        },
        {
            id: 3,
            title: "Strategy Consulting",
            description: "Get access to executive-level insights tailored to your business model. We help you move with clarity, not confusion.",
            icon: "🚀",
            tag: "1:1 Sessions"
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">

            {/* Background Blobs (Soft Glow) */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-[120px] -z-10 opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60"></div>

            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-4 animate-pulse">
                        What We Bring to the Table
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-brand-black leading-tight">
                        Our Core <span className="relative inline-block text-brand-orange">
                            Expertise
                            {/* Stylish Underline */}
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-orange/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="group relative bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 overflow-hidden cursor-default">

                            {/* Top Gradient Line Animation */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-brand-orange to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>

                            {/* Icon Box */}
                            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner">
                                {service.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-orange transition-colors duration-300">
                                {service.title}
                            </h3>

                            <p className="text-gray-500 leading-relaxed mb-8 text-sm md:text-base">
                                {service.description}
                            </p>

                            {/* Tag / Badge */}
                            <div className="inline-block px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 uppercase tracking-wide group-hover:bg-brand-black group-hover:text-white transition-all duration-300">
                                {service.tag}
                            </div>

                            {/* Watermark Icon (Hidden Detail) */}
                            <div className="absolute -bottom-6 -right-6 text-[10rem] opacity-[0.02] group-hover:opacity-[0.05] group-hover:rotate-12 transition-all duration-700 select-none pointer-events-none grayscale">
                                {service.icon}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}