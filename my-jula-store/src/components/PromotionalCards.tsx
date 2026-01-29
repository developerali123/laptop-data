"use client";

import React from "react";
import Link from "next/link";

export default function PromotionalCards() {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* --- Card 1: RGB Ring Light (Lavender) --- */}
                <div className="group relative flex flex-col sm:flex-row bg-[#EBE5FF] rounded-xl overflow-hidden shadow-sm transition-transform hover:scale-[1.01]">

                    {/* Content Side */}
                    <div className="flex-1 p-8 flex flex-col justify-center items-start z-10">
                        <span className="bg-[#6B5AED] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
                            New Product
                        </span>

                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                            RGB ring light with <br /> soft light and tripod
                        </h3>

                        <p className="text-slate-600 text-sm mb-6 max-w-xs">
                            Ideal for photography and video recording.
                        </p>

                        <Link
                            href="#"
                            className="text-[#6B5AED] font-bold text-sm hover:underline"
                        >
                            Visa Ring Lampa
                        </Link>
                    </div>

                    {/* Image Side */}
                    <div className="flex-1 min-h-[250px] sm:min-h-full relative">
                        <img
                            // Updated Image Link (More Reliable)
                            src="https://images.unsplash.com/photo-1644982647844-5ee1bdc5b114?q=80&w=600&auto=format&fit=crop"
                            alt="RGB Ring Light"
                            className="absolute inset-0 w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                        />
                    </div>
                </div>

                {/* --- Card 2: Camera Lens (Light Pink) --- */}
                <div className="group relative flex flex-col sm:flex-row bg-[#FFF0F0] rounded-xl overflow-hidden shadow-sm transition-transform hover:scale-[1.01]">

                    {/* Content Side */}
                    <div className="flex-1 p-8 flex flex-col justify-center items-start z-10">
                        <span className="bg-[#B91C1C] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
                            Trendy Product
                        </span>

                        <h3 className="text-2xl sm:text-3xl font-bold text-[#4A1818] mb-2 leading-tight">
                            Camera lens
                        </h3>

                        <p className="text-[#7F3939] text-sm mb-6 max-w-xs">
                            Mobile Camera Lens Protection for iPhone and Samsung
                        </p>

                        <Link
                            href="#"
                            className="text-[#B91C1C] font-bold text-sm hover:underline"
                        >
                            Visa Produkt
                        </Link>
                    </div>

                    {/* Image Side */}
                    <div className="flex-1 min-h-[250px] sm:min-h-full relative">
                        <img
                            src="https://images.unsplash.com/photo-1616353071855-2c045c4458ae?q=80&w=600&auto=format&fit=crop"
                            alt="Camera Lens Protection"
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}