export default function Pricing() {
    return (
        <section className="py-24 lg:py-32 bg-gray-50 border-t border-gray-200 relative overflow-hidden">

            {/* Background Decor (Subtle Blur) */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/50 via-gray-50 to-gray-50 pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
                            Investment
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-brand-black">
                        Simple, Transparent <br />
                        <span className="text-brand-orange">Pricing.</span>
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Choose the plan that fits your growth stage. No hidden fees, cancel anytime.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-3 gap-8 items-start">

                    {/* Plan 1: Starter */}
                    <div className="group bg-white p-8 rounded-3xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Starter</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-black text-brand-black">$1,500</span>
                            <span className="text-gray-400 font-medium">/mo</span>
                        </div>

                        <div className="w-full h-px bg-gray-100 mb-8"></div>

                        <ul className="space-y-4 text-gray-600 mb-8 text-sm font-medium">
                            <li className="flex items-center gap-3">
                                <span className="text-brand-orange text-lg">✓</span> Content Strategy
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-brand-orange text-lg">✓</span> 4 Posts / Month
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-brand-orange text-lg">✓</span> Monthly Reporting
                            </li>
                            <li className="flex items-center gap-3 text-gray-300 line-through decoration-gray-300">
                                <span className="text-gray-300 text-lg">×</span> Paid Ads Management
                            </li>
                        </ul>

                        <button className="w-full py-4 border-2 border-gray-100 text-black font-bold text-sm uppercase tracking-wider rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300">
                            Choose Starter
                        </button>
                    </div>

                    {/* Plan 2: Growth (Featured - Orange Theme) */}
                    <div className="relative bg-black text-white p-10 rounded-3xl shadow-2xl transform md:-translate-y-4 ring-4 ring-brand-orange/20 hover:ring-brand-orange/40 transition-all duration-300">

                        {/* Popular Badge */}
                        <div className="absolute top-0 right-0">
                            <div className="bg-brand-orange text-black text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-bl-2xl rounded-tr-2xl">
                                Most Popular
                            </div>
                        </div>

                        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-4">Growth</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-5xl font-black text-white">$3,000</span>
                            <span className="text-gray-500 font-medium">/mo</span>
                        </div>

                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                            Perfect for brands ready to scale with paid traffic and consistent content.
                        </p>

                        <div className="w-full h-px bg-white/10 mb-8"></div>

                        <ul className="space-y-4 text-gray-300 mb-10 text-sm font-medium">
                            <li className="flex items-center gap-3 text-white">
                                <span className="bg-brand-orange text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">✓</span>
                                Everything in Starter
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-brand-orange text-lg">✓</span> Paid Ads Management
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-brand-orange text-lg">✓</span> 8 Posts / Month
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-brand-orange text-lg">✓</span> Bi-Weekly Strategy Calls
                            </li>
                        </ul>

                        <button className="w-full py-4 bg-brand-orange text-black font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105">
                            Get Started Now
                        </button>
                    </div>

                    {/* Plan 3: Scale */}
                    <div className="group bg-white p-8 rounded-3xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Scale</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-black text-brand-black">$5,000</span>
                            <span className="text-gray-400 font-medium">/mo</span>
                        </div>

                        <div className="w-full h-px bg-gray-100 mb-8"></div>

                        <ul className="space-y-4 text-gray-600 mb-8 text-sm font-medium">
                            <li className="flex items-center gap-3">
                                <span className="text-brand-orange text-lg">✓</span> Full Service Agency
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-brand-orange text-lg">✓</span> Unlimited Creatives
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-brand-orange text-lg">✓</span> Dedicated Manager
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-brand-orange text-lg">✓</span> 24/7 Support
                            </li>
                        </ul>

                        <button className="w-full py-4 border-2 border-gray-100 text-black font-bold text-sm uppercase tracking-wider rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300">
                            Choose Scale
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}