export default function BookMeeting() {
    return (
        <section className="py-32 bg-gray-50 text-center text-black">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                    Book an online meeting
                </h2>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
                    Let’s have a chat about what opportunities lay ahead for you. The first meeting is free of charge.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full uppercase tracking-wider hover:bg-orange-600 transition shadow-lg">
                        Available Times &rarr;
                    </button>
                    <button className="px-8 py-4 bg-white border border-gray-300 text-black font-bold rounded-full uppercase tracking-wider hover:bg-gray-100 transition">
                        Learn More &rarr;
                    </button>
                </div>
            </div>
        </section>
    );
}