import Link from "next/link";

export default function Features() {
    const features = [
        { title: "Marketing Plan", description: "We will set up a clear plan that work best for your business. Meta, Google or e-mail marketing.", link: "/services" },
        { title: "Tools & measurement", description: "To enable data driven insights. Let us make sure you have the tools implemented correctly.", link: "/services" },
        { title: "Build and optimize", description: "Plans and tools are amazing. But building campaigns and optimizing is key to succeed.", link: "/services" }
    ];

    return (
        // Changed: py-24 -> py-16
        <section className="py-16 bg-gray-50 text-brand-black">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header Compact */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <p className="text-lime-500 font-bold text-sm mb-1 uppercase tracking-wide">Innovative</p>
                        <h2 className="text-4xl font-bold text-gray-900">Features</h2>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base max-w-sm pb-1">
                        Step by step towards your goals, this is how we work
                    </p>
                </div>

                {/* Grid Compact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start h-full hover:-translate-y-1">
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{feature.description}</p>
                            <Link href={feature.link}>
                                <button className="px-6 py-2.5 bg-brand-orange text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-md">
                                    READ MORE &rarr;
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}