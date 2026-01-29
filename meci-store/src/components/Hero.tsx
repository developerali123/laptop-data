"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Gift, Tag } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[500px]">

                {/* Left Main Banner (Red Gradient) */}
                <div className="lg:col-span-8 relative group rounded-2xl overflow-hidden bg-[#D22027] shadow-xl text-white p-8 sm:p-12 flex flex-col justify-center transition-transform hover:scale-[1.01] duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#e04047_0%,_#d22027_40%,_#8a1217_100%)]"></div>

                    {/* Abstract Shapes */}
                    <div className="absolute right-0 top-0 h-full w-[40%] bg-black/10 transform -skew-x-12 origin-bottom-right mix-blend-overlay"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider mb-4">
                            <Sparkles size={14} className="text-yellow-300" /> Exclusive Offer
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-serif italic mb-2 opacity-90">Up to</h2>
                        <h1 className="text-[6rem] sm:text-[8rem] leading-[0.85] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 drop-shadow-sm">
                            50%
                        </h1>
                        <p className="text-xl font-medium mt-6 text-red-50">Discount on selected items for <span className="font-bold border-b-2 border-yellow-400">Club Members!</span></p>

                        <div className="flex gap-4 mt-8">
                            <button className="bg-white text-[#D22027] px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-50 transition-all flex items-center gap-2 group/btn">
                                Shop Now <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side Small Banners */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Top Right Card */}
                    <div className="flex-1 bg-slate-800 rounded-2xl p-8 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
                        <div className="relative z-10">
                            <Gift className="mb-4 text-yellow-400" size={32} />
                            <h3 className="text-3xl font-black mb-1">Gifts</h3>
                            <p className="text-slate-300 mb-6">For the whole family</p>
                            <Link href="#" className="text-sm font-bold border-b border-white pb-1 hover:text-yellow-400 hover:border-yellow-400 transition-colors">View Collection</Link>
                        </div>
                    </div>

                    {/* Bottom Right Card */}
                    <div className="flex-1 bg-red-900 rounded-2xl p-8 text-white relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#fbbf24_0%,_#d22027_60%)]"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                <span className="bg-yellow-400 text-red-900 text-xs font-black px-2 py-1 rounded uppercase">Sale</span>
                                <Tag className="text-white/60" />
                            </div>
                            <h3 className="text-2xl font-black uppercase mt-4">Christmas <br /> Deals</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}