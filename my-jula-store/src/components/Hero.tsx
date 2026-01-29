"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Gift, Tag } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">

                {/* =========================================================
            LEFT MAIN BANNER (66% Width)
            Premium Feature: Radial Gradient + Abstract Shapes
           ========================================================= */}
                <div className="lg:col-span-8 relative group rounded-2xl overflow-hidden bg-[#D22027] shadow-xl shadow-red-900/10 transition-transform duration-500 hover:shadow-2xl">

                    {/* Background Gradient & Texture */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#e04047_0%,_#d22027_40%,_#8a1217_100%)]"></div>

                    {/* Decorative Abstract Angle (Right Side) */}
                    <div className="absolute right-0 top-0 h-full w-[40%] bg-black/10 transform -skew-x-12 origin-bottom-right mix-blend-overlay"></div>
                    <div className="absolute right-[-5%] top-0 h-full w-[20%] bg-white/5 transform -skew-x-12 blur-2xl"></div>

                    {/* JulaClub Branding (Top Right) */}
                    <div className="absolute top-8 right-8 z-20 text-right opacity-90 hidden sm:block">
                        <h3 className="text-3xl font-black text-white/90 uppercase tracking-tighter drop-shadow-md">
                            JulaClub
                        </h3>
                        <span className="text-sm font-bold text-white/70 tracking-[0.3em] uppercase block mt-1">
                            Members Only
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 h-full flex flex-col justify-center p-8 sm:p-12 lg:p-16 text-white">
                        <div className="animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider mb-4">
                                <Sparkles size={14} className="text-yellow-300" /> Exclusive Offer
                            </div>

                            <h2 className="text-4xl sm:text-5xl font-serif italic mb-2 opacity-90">Up to</h2>

                            {/* Massive Price Text with Shadow */}
                            <h1 className="text-[8rem] sm:text-[10rem] leading-[0.85] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 drop-shadow-xl filter">
                                50%
                            </h1>

                            <p className="text-xl sm:text-2xl font-medium max-w-lg mt-6 leading-relaxed text-red-50">
                                Discount on selected items for <span className="font-bold border-b-2 border-yellow-400">Club Members!</span>
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                            <Link
                                href="#"
                                className="group/btn bg-white text-[#D22027] px-8 py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                Discover the Club
                                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#"
                                className="group/btn px-8 py-4 rounded-full font-bold text-sm sm:text-base border-2 border-white/30 text-white hover:bg-white/10 hover:border-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                            >
                                View all offers
                            </Link>
                        </div>
                    </div>
                </div>

                {/* =========================================================
            RIGHT SIDE BANNERS (33% Width)
            Stacked layout
           ========================================================= */}
                <div className="lg:col-span-4 flex flex-col gap-6">

                    {/* Top Card: Christmas Gifts */}
                    <div className="flex-1 relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        {/* Background Image Placeholder (Replace bg-gray-800 with <Image />) */}
                        <div className="absolute inset-0 bg-slate-800">
                            {/* Simulated Image Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-slate-800 to-slate-700"></div>
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D22027]/95 via-[#D22027]/70 to-transparent z-10"></div>

                        <div className="relative z-20 h-full flex flex-col justify-center p-8 text-white">
                            <div className="mb-auto">
                                <Gift className="text-white/80 mb-2" size={28} />
                            </div>
                            <span className="text-lg font-medium opacity-90 italic">Up to</span>
                            <h2 className="text-6xl font-black mb-1 leading-none">50%</h2>
                            <p className="text-lg font-medium mb-6 text-red-100">Gifts for the whole family!</p>

                            <Link href="#" className="self-start bg-white/95 hover:bg-white text-[#D22027] text-sm font-bold px-6 py-3 rounded-full shadow-md transition-colors flex items-center gap-2">
                                Find gifts <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Decorative Image/Pattern Element */}
                        <div className="absolute right-[-20px] bottom-[-20px] opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            <Gift size={150} />
                        </div>
                    </div>

                    {/* Bottom Card: Sale */}
                    <div className="flex-1 relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        {/* Background Image Placeholder */}
                        <div className="absolute inset-0 bg-red-900">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#fbbf24_0%,_#d22027_60%)]"></div>
                        </div>

                        {/* Noise Texture Overlay for premium feel */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

                        <div className="relative z-20 h-full flex flex-col justify-center p-8 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <span className="bg-yellow-400 text-red-900 text-xs font-black px-2 py-1 uppercase rounded tracking-wider">
                                    Sale
                                </span>
                                <Tag size={20} className="text-white/60" />
                            </div>

                            <h2 className="text-3xl font-black uppercase tracking-tight mb-0">Christmas Sale</h2>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-xl italic">up to</span>
                                <span className="text-5xl font-black text-yellow-300 drop-shadow-sm">50%</span>
                            </div>

                            <Link href="#" className="w-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white text-center py-3 rounded-full text-sm font-bold transition-all">
                                Find a bargain
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}