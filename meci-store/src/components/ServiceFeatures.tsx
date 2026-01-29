"use client";
import React from "react";
import { Truck, DollarSign, CreditCard, Headphones } from "lucide-react";

const features = [
    {
        id: 1,
        icon: <Truck size={32} strokeWidth={1.5} />,
        title: "Free Delivery",
        description: "Free delivery on all orders over 500kr.",
    },
    {
        id: 2,
        icon: <DollarSign size={32} strokeWidth={1.5} />,
        title: "Money Back",
        description: "30 days money-back guarantee.",
    },
    {
        id: 3,
        icon: <CreditCard size={32} strokeWidth={1.5} />,
        title: "Secure Payment",
        description: "Flexible payment by Card, Swish or Klarna.",
    },
    {
        id: 4,
        icon: <Headphones size={32} strokeWidth={1.5} />,
        title: "24/7 Support",
        description: "Online support available all day.",
    },
];

export default function ServiceFeatures() {
    return (
        <section className="bg-white py-12 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.id} className="flex items-start gap-4 group cursor-default">
                            {/* Icon Circle */}
                            <div className="flex-shrink-0 w-16 h-16 rounded-full border border-gray-200 text-[#D22027] flex items-center justify-center group-hover:bg-[#D22027] group-hover:text-white transition-colors duration-300 shadow-sm">
                                {feature.icon}
                            </div>
                            {/* Text */}
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#D22027] transition-colors">
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