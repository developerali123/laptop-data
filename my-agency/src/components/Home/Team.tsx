import Image from "next/image";

export default function Team() {
    const teamMembers = [
        { name: "Elin Smith", role: "CEO / Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" },
        { name: "Zarafat Hussain", role: "Developer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" },
        { name: "Bianca Salming", role: "Content Creator", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80" }
    ];

    return (
        // Changed: py-32 -> py-20
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 skew-x-12 opacity-50"></div>

            <div className="container mx-auto px-6 md:px-12">

                {/* Header Compact */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12 border-b border-gray-100 pb-8">
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-lime-500"></span>
                            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest">The Minds Behind</p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-black">Our Team</h2>
                    </div>
                    <div className="lg:w-1/2">
                        <p className="text-gray-500 text-base leading-relaxed font-light">
                            We are business owners who understand the value of grit and collaboration.
                            We know what it takes to succeed and will.
                        </p>
                    </div>
                </div>

                {/* Grid Compact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-5 shadow-sm">
                                <Image
                                    src={member.image} alt={member.name} fill
                                    className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                />
                            </div>
                            <div className="pl-1">
                                <h3 className="text-xl font-bold text-brand-black group-hover:text-brand-orange transition-colors">{member.name}</h3>
                                <p className="text-gray-400 font-medium text-xs tracking-wide uppercase mt-1">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}