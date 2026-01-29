import Image from "next/image";
import Link from "next/link";

export default function ProjectProofs() {
    const projects = [
        {
            id: 1,
            title: "Boosting Visibility with SEO + Google Ads",
            date: "23 May 2025",
            category: "Construction",
            // Image: Construction/Renovation site
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
        },
        {
            id: 2,
            title: "Full-Service Digital Launch for a Startup",
            date: "12 June 2025",
            category: "E-commerce",
            // Image: Cosmetic Cream
            image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80"
        },
        {
            id: 3,
            title: "Building a Sales Funnel That Converts",
            date: "30 July 2025",
            category: "Strategy",
            // Image: Abstract Funnel/Chart
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
        }
    ];

    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 md:px-12">

                {/* HEADER */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">

                    {/* Left Side */}
                    <div className="lg:w-1/2">
                        <p className="text-lime-500 font-bold text-sm mb-2 uppercase tracking-wide">
                            Case Studies
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight">
                            Project Proofs
                        </h2>
                    </div>

                    {/* Right Side */}
                    <div className="lg:w-1/2 text-left lg:text-right">
                        <p className="text-gray-500 text-base leading-relaxed max-w-md ml-auto">
                            Real results for real clients. Connect with me on LinkedIn to see how we help brands grow daily.
                        </p>
                        <Link href="https://linkedin.com" className="inline-block mt-3 text-brand-orange font-bold text-sm hover:underline">
                            Follow me here &rarr; Elin Smith
                        </Link>
                    </div>
                </div>

                {/* PROJECTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group cursor-pointer flex flex-col h-full">

                            {/* Image Card */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-5 bg-gray-100">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay Badge */}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-black">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-brand-orange transition-colors">
                                    {project.title}
                                </h3>

                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="text-gray-400 text-sm font-medium">
                                        {project.date}
                                    </span>
                                    <span className="text-brand-orange text-sm font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        Read Case &rarr;
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}