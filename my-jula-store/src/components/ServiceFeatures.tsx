"use client";

import React from "react";
import { Truck, DollarSign, CreditCard, Headphones } from "lucide-react";

const features = [
    {
        id: 1,
        icon: <Truck size={32} strokeWidth={1.5} />,
        title: "Free delivery in Sweden",
        description: "Free delivery in Sweden and delivery in Stockholm within 24 hours.",
    },
    {
        id: 2,
        icon: <DollarSign size={32} strokeWidth={1.5} />,
        title: "Back guarantee",
        description: "One-month return guarantee",
    },
    {
        id: 3,
        icon: <CreditCard size={32} strokeWidth={1.5} />,
        title: "Flexible payment",
        description: "Flexible payment by card, Swish, Klarna or Paypal.",
    },
    {
        id: 4,
        icon: <Headphones size={32} strokeWidth={1.5} />,
        title: "Online support",
        description: "Online support available 24/7",
    },
];

export default function ServiceFeatures() {
    return (
        <section className="bg-white py-12 border-b border-slate-100">
            <div className="container mx-auto px-4">

                {/* Grid Layout: 1 column on mobile, 2 on tablet, 4 on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex items-start gap-5 group hover:-translate-y-1 transition-transform duration-300"
                        >

                            {/* Icon Container (Red Circle) */}
                            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-[#EF4444] text-[#EF4444] flex items-center justify-center group-hover:bg-[#EF4444] group-hover:text-white transition-colors duration-300 shadow-sm">
                                {feature.icon}
                            </div>

                            {/* Text Content */}
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#EF4444] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}