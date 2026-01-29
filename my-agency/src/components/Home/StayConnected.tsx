
export default function StayConnected() {
    return (
        <section className="py-20 bg-slate-50 border-t border-gray-100">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20">

                    {/* LEFT SIDE: Heading */}
                    <div className="lg:w-1/3">
                        <p className="text-lime-500 font-bold text-sm mb-3 tracking-wide">
                            Let’s get going
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight">
                            Stay connected
                        </h2>
                    </div>

                    {/* RIGHT SIDE: Content & Button */}
                    <div className="lg:w-2/3">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                            Sign up to our newsletter!
                        </h3>
                        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-2xl">
                            Follow our step by step guides, see your network grow and get the latest
                            insights into the online marketing landscape.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 items-start">
                            {/* Optional: Agar input field lagana ho toh ye uncomment karein
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-6 py-3.5 rounded-full border border-gray-300 w-full sm:w-auto focus:outline-none focus:border-brand-orange bg-white text-gray-800"
              /> 
              */}

                            <button className="px-10 py-3.5 bg-brand-orange text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-lg shadow-orange-200">
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </section>
    );
}