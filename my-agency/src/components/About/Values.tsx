export default function Values() {
    const values = [
        { title: "Transparency", desc: "No hidden fees. No confusing reports. Just clear, honest communication." },
        { title: "Data-Driven", desc: "We don't guess. We test, measure, and optimize based on real numbers." },
        { title: "Grit", desc: "We don't give up when things get tough. We find solutions and keep pushing." },
        { title: "Collaboration", desc: "We view ourselves as an extension of your team, not just a vendor." },
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6 md:px-12">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-black">Our Core Values</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((val, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-brand-orange text-xl font-bold">{index + 1}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}