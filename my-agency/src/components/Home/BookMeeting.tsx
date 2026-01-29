import Link from "next/link";

export default function BookMeeting() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6 md:px-12 text-center">

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
                    Book an online meeting
                </h2>

                {/* Subtext */}
                <p className="text-gray-600 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                    Let’s have a chat about what opportunities lay ahead for you. The first meeting is free of charge.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                    {/* Orange Button */}
                    <Link href="/contact">
                        <button className="px-8 py-4 bg-brand-orange text-black font-bold text-sm uppercase tracking-wider rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            AVAILABLE TIMES &rarr;
                        </button>
                    </Link>

                    {/* Outline Button */}
                    <Link href="/about">
                        <button className="px-8 py-4 bg-transparent border-2 border-brand-black text-brand-black font-bold text-sm uppercase tracking-wider rounded-full hover:bg-brand-black hover:text-white transition-all duration-300">
                            LEARN MORE &rarr;
                        </button>
                    </Link>

                </div>

            </div>
        </section>
    );
}