import Link from "next/link";

export default function ServiceHero() {
    const services = [
        {
            title: "Organic Social",
            features: [
                "Posting schedule",
                "Ghost writing copy",
                "Design creatives",
                "Reporting results"
            ]
        },
        {
            title: "Set Up for Advertising",
            features: [
                "Set your business manager",
                "GTM tags for measuring",
                "Google Ads",
                "Meta Ads, Linkedin and TikTok"
            ]
        },
        {
            title: "Build Google/SoMe",
            features: [
                "Build campaign structure",
                "Set your desired budget",
                "UTM tags to collect insight",
                "Create budget document",
                "Build studio reports"
            ]
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">

            {/* Background Decor (Subtle Grid) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <p className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
                        Innovative
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black text-brand-black uppercase tracking-tight">
                        Here is how <span className="text-brand-orange">I help</span>
                    </h1>
                </div>

                {/* CARDS GRID */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group flex flex-col bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                        >

                            {/* Card Title */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b-2 border-brand-orange/10 pb-4 w-fit group-hover:border-brand-orange transition-colors">
                                {service.title}
                            </h3>

                            {/* List Items */}
                            <ul className="space-y-4 mb-10 flex-grow">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 font-medium text-sm md:text-base">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Button */}
                            <div className="mt-auto">
                                <Link href="/contact">
                                    <button className="w-full py-4 bg-brand-orange text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                                        Get In Touch
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