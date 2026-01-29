import Link from "next/link";

export default function Pricing() {
    const plans = [
        { name: "Coaching", price: "$49", period: "/session", features: ["Online marketing meeting", "Website Feedback", "Recommendations"], buttonText: "Get Started", highlight: false },
        { name: "Advanced", price: "$1,000", period: "/month", features: ["Optimize Ads (Google/Meta)", "Correct Insights Setup", "Monthly Reports"], buttonText: "Get Started", highlight: true },
        { name: "Premium", price: "$5,000", period: "/strategy", features: ["Complete Marketing Plan", "Build & Optimize Campaigns", "On-demand Support"], buttonText: "Get Started", highlight: false }
    ];

    return (
        // Changed: py-24 -> py-20
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header Compact */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <p className="text-gray-400 font-bold text-xs mb-1 uppercase tracking-wide">Straightforward</p>
                        <h2 className="text-4xl font-bold text-brand-black">Pricing Plans</h2>
                    </div>
                    <p className="text-gray-500 text-sm max-w-md text-right lg:text-left">
                        Plans to suit businesses of all sizes, from small startups to large corporations.
                    </p>
                </div>

                {/* Cards Compact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                        <div key={index} className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${plan.highlight ? "bg-white border-brand-orange shadow-lg scale-105 z-10" : "bg-white border-gray-100 hover:shadow-lg hover:-translate-y-1"}`}>
                            <h3 className="text-lg font-medium text-gray-600 mb-2 text-center">{plan.name}</h3>
                            <div className="text-center mb-6">
                                <span className="text-4xl font-bold text-brand-black">{plan.price}</span>
                                <span className="text-gray-400 text-xs font-medium ml-1">{plan.period}</span>
                            </div>
                            <div className="w-full h-px bg-gray-100 mb-6"></div>
                            <ul className="flex-grow space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex flex-col items-center text-center">
                                        <span className="text-gray-600 text-sm">{feature}</span>
                                        {i !== plan.features.length - 1 && <div className="w-8 h-px border-b border-dotted border-gray-300 mt-2"></div>}
                                    </li>
                                ))}
                            </ul>
                            <div className="text-center mt-auto">
                                <Link href="/contact">
                                    <button className="w-full py-3 bg-brand-orange text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-md">
                                        {plan.buttonText}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}