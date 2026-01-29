"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ Fix: Import Image
import { ArrowRight } from "lucide-react";

export default function PromotionalCards() {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Card 1 */}
                <div className="group relative flex flex-col sm:flex-row bg-[#F3E8FF] rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 h-auto sm:h-[280px]">
                    <div className="flex-1 p-8 flex flex-col justify-center items-start z-10">
                        <span className="bg-[#9333EA] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
                            New Arrival
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                            RGB Ring Light <br /> Studio Pro
                        </h3>
                        <Link href="#" className="flex items-center gap-2 text-[#9333EA] font-bold text-sm hover:underline mt-4">
                            Shop Now <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="flex-1 relative min-h-[200px] sm:min-h-full">
                        {/* ✅ Fix: Using Next.js Image Component */}
                        <Image
                            src="https://images.unsplash.com/photo-1644982647844-5ee1bdc5b114?auto=format&fit=crop&w=500&q=80"
                            alt="Ring Light"
                            width={500}
                            height={500}
                            className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="group relative flex flex-col sm:flex-row bg-[#FEF2F2] rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 h-auto sm:h-[280px]">
                    <div className="flex-1 p-8 flex flex-col justify-center items-start z-10">
                        <span className="bg-[#DC2626] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
                            Best Seller
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                            Pro Camera <br /> Lens Kit
                        </h3>
                        <Link href="#" className="flex items-center gap-2 text-[#DC2626] font-bold text-sm hover:underline mt-4">
                            View Product <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="flex-1 relative min-h-[200px] sm:min-h-full">
                        {/* ✅ Fix: Using Next.js Image Component */}
                        <Image
                            src="https://images.unsplash.com/photo-1616353071855-2c045c4458ae?auto=format&fit=crop&w=500&q=80"
                            alt="Camera Lens"
                            width={500}
                            height={500}
                            className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}