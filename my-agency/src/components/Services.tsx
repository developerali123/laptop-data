import Link from "next/link";

export default function Services() {
    const services = [
        {
            title: "Organic Social Media Growth",
            description: "We build your brand presence where it matters—with real followers, real engagement, and a content strategy that reflects your voice.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
            ),
            features: [
                "Platform audit & strategy (Instagram, Facebook, LinkedIn)",
                "Content planning and calendar creation",
                "Hashtag research and engagement tactics",
                "Performance tracking & optimization"
            ]
        },
        {
            title: "Advertising Funnel Setup",
            description: "We craft data-driven funnels that turn visitors into leads and leads into loyal customers. What’s included:",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.212 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            ),
            features: [
                "Funnel mapping tailored to your offer",
                "Facebook & Instagram Ads setup",
                "Landing page copy and design strategy",
                "Retargeting & conversion tracking"
            ]
        },
        {
            title: "Growth Strategy Consulting",
            description: "Get access to executive-level insights tailored to your business model. We help you move with clarity, not confusion.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
            ),
            features: [
                "1:1 strategy sessions",
                "Business-specific growth roadmap",
                "Audit of current marketing efforts",
                "Recommendations you can act on immediately"
            ]
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white skew-x-12 opacity-50 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[100px] -z-10"></div>

            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-brand-black mb-4">
                        Our Services
                    </h2>
                    <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full"></div>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group flex flex-col bg-white border border-gray-100 p-8 rounded-[2rem] hover:border-brand-orange/30 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                {service.icon}
                            </div>

                            {/* Title & Desc */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-orange transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed mb-8 border-b border-gray-100 pb-8">
                                {service.description}
                            </p>

                            {/* Features List */}
                            <div className="mb-8">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    What’s included:
                                </p>
                                <ul className="space-y-3">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></span>
                                            <span className="group-hover:text-gray-900 transition-colors">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 👇 NEW BUTTON ADDED HERE */}
                            <div className="mt-auto pt-6 border-t border-gray-100">
                                <Link href="/contact" className="block w-full">
                                    <button className="w-full py-4 bg-brand-orange text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-md group-hover:shadow-lg">
                                        Get in Touch
                                    </button>
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}