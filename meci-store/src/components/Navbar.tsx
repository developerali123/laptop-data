"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ Fix 1: Next.js Image Component Import

// 1. Lucide Icons (UI icons)
import {
    Search,
    User,
    ShoppingCart,
    Menu,
    X,
    Smartphone // ✅ Fix 2: Smartphone icon import kiya
} from "lucide-react";

// 2. Brand Icons
import { FaApple, FaGoogle } from "react-icons/fa";
import { SiMotorola, SiXiaomi, } from "react-icons/si";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-[#FFCEE6] shadow-sm font-sans transition-all duration-300">
            <div className="container mx-auto px-4">

                {/* --- Top Row: Logo, Search, Icons --- */}
                <div className="flex items-center justify-between gap-6 py-4">

                    {/* ✅ LOGO SECTION FIXED */}
                    <Link href="/" className="flex-shrink-0 group">
                        {/* Next.js Image Component use kiya hai.
                           width/height zaroori hain aspect ratio batane ke liye.
                           priority prop lagaya hai taake logo foran load ho (LCP fix).
                        */}
                        <Image
                            src="/images/meci_mobile_mart_logo.svg"
                            alt="Meci Mobile Mart"
                            width={180} // Aspect ratio set karne ke liye width
                            height={60} // Aspect ratio set karne ke liye height
                            className="h-10 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-800"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    {/* Search Bar */}
                    <div className="hidden md:flex w-full max-w-2xl relative">
                        <input
                            type="text"
                            placeholder="Hej! Vad söker du efter idag?"
                            className="w-full h-12 pl-6 pr-14 rounded-full border border-transparent bg-white text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D22027]/20 focus:border-[#D22027]/30 transition-all text-sm"
                        />
                        <button className="absolute right-1 top-1 bottom-1 w-10 h-10 bg-[#D22027] hover:bg-[#a0151a] rounded-full flex items-center justify-center text-white shadow-md transition-all hover:scale-105">
                            <Search size={18} />
                        </button>
                    </div>

                    {/* Right Icons */}
                    <div className="hidden md:flex items-center gap-8 text-slate-900">
                        <Link href="#" className="group flex flex-col items-center gap-1">
                            <div className="relative p-1">
                                <User size={24} strokeWidth={2} className="group-hover:text-[#D22027] transition-colors" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-3">Login</span>
                        </Link>

                        <Link href="#" className="group flex flex-col items-center gap-1 relative">
                            <div className="relative p-1">
                                <ShoppingCart size={24} strokeWidth={2} className="group-hover:text-[#D22027] transition-colors" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D22027] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#FFCEE6]">2</span>
                            </div>
                        </Link>
                    </div>

                </div>

                {/* --- Bottom Row: Navigation Links (Desktop) --- */}
                <div className="hidden md:flex items-center justify-between py-3 border-t border-slate-900/5 text-sm font-bold text-slate-800">

                    <div className="flex items-center gap-8">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white rounded-full transition-colors text-[#D22027]">
                            <Menu size={18} />
                            <span>Alla Produkter</span>
                        </button>

                        <nav className="flex items-center gap-6">
                            <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                <FaApple size={18} className="mb-0.5" /> Iphone
                            </Link>

                            {/* ✅ Fix 3: Samsung Icon Changed to Smartphone */}
                            <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                <Smartphone size={20} /> Samsung
                            </Link>

                            <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                <SiMotorola size={18} /> Motorola
                            </Link>
                            <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                <SiXiaomi size={18} /> Xiaomi
                            </Link>
                            <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                <FaGoogle size={16} /> Google
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6 text-xs uppercase tracking-wide text-slate-600">
                        <Link href="#" className="hover:text-black transition-colors">Kundservice</Link>
                        <Link href="#" className="hover:text-black transition-colors">Varuhus</Link>
                    </div>
                </div>

            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 p-4 absolute w-full shadow-lg z-50">
                    <input type="text" placeholder="Sök..." className="w-full p-3 border rounded-lg mb-4 bg-gray-50 outline-none focus:ring-1 focus:ring-red-200" />
                    <nav className="flex flex-col gap-3 font-bold text-slate-800">
                        <Link href="#" className="py-2 border-b flex items-center gap-2"><Menu size={16} /> Alla Produkter</Link>
                        <Link href="#" className="py-2 flex items-center gap-2 hover:bg-gray-50 rounded px-2"><FaApple /> Iphone</Link>
                        <Link href="#" className="py-2 flex items-center gap-2 hover:bg-gray-50 rounded px-2"><Smartphone size={18} /> Samsung</Link>
                        <Link href="#" className="py-2 flex items-center gap-2 hover:bg-gray-50 rounded px-2"><SiXiaomi /> Xiaomi</Link>
                        <Link href="#" className="py-2 text-[#D22027] mt-2 border-t pt-4">Logga in</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}