export default function Contact() {
    return (
        <section className="py-24 lg:py-32 bg-brand-black text-white relative overflow-hidden">

            {/* Background Decor (Subtle Orange Glow from bottom) */}
            <div className="absolute bottom-0 left-1/2 w-[800px] h-[500px] bg-brand-orange opacity-5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                <div className="max-w-4xl mx-auto text-center">

                    {/* Small Label */}
                    <div className="inline-flex items-center gap-2 mb-6 justify-center">
                        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
                            Get In Touch
                        </span>
                    </div>

                    {/* Massive Heading */}
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 uppercase leading-[0.9]">
                        Ready to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-orange to-orange-600">
                            Scale?
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                        Let's discuss how we can engineer your growth. No sales fluff, just straight strategy. Fill out the form below.
                    </p>

                    {/* Form Container */}
                    <form className="space-y-12 text-left bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl">

                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            {/* Name Input */}
                            <div className="group relative">
                                <input
                                    type="text"
                                    id="name"
                                    className="peer w-full bg-transparent border-b-2 border-gray-700 py-4 text-xl text-white placeholder-transparent focus:border-brand-orange focus:outline-none transition-colors duration-300"
                                    placeholder="Your Name"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-brand-orange peer-focus:text-sm"
                                >
                                    Your Name
                                </label>
                            </div>

                            {/* Email Input */}
                            <div className="group relative">
                                <input
                                    type="email"
                                    id="email"
                                    className="peer w-full bg-transparent border-b-2 border-gray-700 py-4 text-xl text-white placeholder-transparent focus:border-brand-orange focus:outline-none transition-colors duration-300"
                                    placeholder="Your Email"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-brand-orange peer-focus:text-sm"
                                >
                                    Your Email
                                </label>
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="group relative">
                            <textarea
                                id="message"
                                rows={4}
                                className="peer w-full bg-transparent border-b-2 border-gray-700 py-4 text-xl text-white placeholder-transparent focus:border-brand-orange focus:outline-none transition-colors duration-300 resize-none"
                                placeholder="Tell us about your project"
                            ></textarea>
                            <label
                                htmlFor="message"
                                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-brand-orange peer-focus:text-sm"
                            >
                                Tell us about your project
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-8">
                            <button className="group relative inline-flex items-center justify-center px-12 py-5 bg-brand-orange text-black font-black text-lg uppercase tracking-wider rounded-full overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300">
                                <span className="relative z-10 flex items-center gap-3">
                                    Send Message
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>
                                </span>
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
}