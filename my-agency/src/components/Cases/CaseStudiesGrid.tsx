import Image from "next/image";

export default function CaseStudiesGrid() {
    const cases = [
        {
            id: 1,
            title: "Building a Sales Funnel That Converts",
            category: "Strategy / Funnel",
            // Funnel Image (Premium Placeholder)
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "From Zero to 10K Followers in 90 Days",
            category: "Organic Growth",
            // Fashion/Lifestyle Image (Organic Feel)
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
        },
        {
            id: 3,
            title: "Boosting E-commerce Sales via Meta Ads",
            category: "Paid Advertising",
            // Cosmetic/Product Image (E-commerce)
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
        },
        {
            id: 4,
            title: "Renovating a Digital Brand Identity",
            category: "Branding",
            // Architecture/Design Image (Branding)
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        }
    ];

    return (
        <section className="pb-24 bg-white">
            <div className="container mx-auto px-6 md:px-12">

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {cases.map((project) => (
                        <div key={project.id} className="group cursor-pointer">

                            {/* Image Container */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[2.5rem] mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">

                                {/* Overlay Badge (Premium Style) */}
                                <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-md px-5 py-2 rounded-full shadow-sm">
                                    <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                                        {project.category}
                                    </span>
                                </div>

                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay Gradient on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Text Content */}
                            <h3 className="text-3xl font-bold text-brand-black mb-3 group-hover:text-brand-orange transition-colors">
                                {project.title}
                            </h3>

                            {/* View Project Link */}
                            <div className="flex items-center gap-3 text-base font-medium text-gray-500 group-hover:text-brand-orange transition-colors">
                                <span>View Case Study</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-2 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}