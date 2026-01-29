"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Search,
    User,
    ClipboardList,
    ShoppingCart,
    Menu,
    Store,
    Smartphone,
    Tablet,
    HelpCircle
} from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* --- 1. PRO TOP BAR --- */}
            {/* <div className="bg-[#B01A20] text-white text-[11px] font-medium tracking-wide">
        ... (Same as before) ...
      </div> */}

            {/* --- 2. MAIN HEADER (Sticky) --- */}
            <header className="sticky top-0 z-50 bg-[#FFCEE6] shadow-sm font-sans transition-all duration-300">
                <div className="container mx-auto px-4">

                    {/* Top Row: Logo, Search, Icons */}
                    <div className="flex items-center justify-between gap-6 py-5">

                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 group">
                            <img
                                src="/images/meci_mobile_mart_logo.svg"
                                alt="Meci Mobile Mart"
                                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-slate-800"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu size={28} />
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
                                <span className="text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-3">Logga in</span>
                            </Link>

                            <Link href="#" className="group flex flex-col items-center gap-1">
                                <div className="relative p-1">
                                    <ClipboardList size={24} strokeWidth={2} className="group-hover:text-[#D22027] transition-colors" />
                                </div>
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
                            {/* Dropdown Trigger */}
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white rounded-full transition-colors text-[#D22027]">
                                <Menu size={18} />
                                <span>Alla Produkter</span>
                            </button>

                            {/* Brands Nav with Icons */}
                            <nav className="flex items-center gap-6">

                                {/* iPhone (Apple Logo) */}
                                <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                    <svg className="w-3.5 h-3.5 mb-0.5" fill="currentColor" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" /></svg>
                                    Iphone
                                </Link>

                                {/* Samsung */}
                                <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                    <Smartphone size={16} /> Samsung
                                </Link>

                                {/* Motorola */}
                                <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                    <Smartphone size={16} /> Motorola
                                </Link>

                                {/* iPad (Tablet Icon) */}
                                <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                    <Tablet size={16} /> iPad
                                </Link>

                                {/* Google */}
                                <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                    <Smartphone size={16} /> Google
                                </Link>

                                {/* Xiaomi */}
                                <Link href="#" className="flex items-center gap-1.5 hover:text-[#D22027] transition-colors py-2 border-b-2 border-transparent hover:border-[#D22027]">
                                    <Smartphone size={16} /> Xiaomi
                                </Link>

                            </nav>
                        </div>

                        {/* Quick Support Links */}
                        <div className="flex items-center gap-6 text-xs uppercase tracking-wide text-slate-600">
                            <Link href="#" className="hover:text-black transition-colors">Kundservice</Link>
                            <Link href="#" className="hover:text-black transition-colors">Varuhus</Link>
                        </div>
                    </div>

                </div>

                {/* Mobile Menu (Overlay) */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 p-4 absolute w-full shadow-lg">
                        <input type="text" placeholder="Sök..." className="w-full p-3 border rounded-lg mb-4 bg-gray-50" />
                        <nav className="flex flex-col gap-3 font-bold text-slate-800">
                            <Link href="#" className="py-2 border-b">Alla Produkter</Link>
                            <Link href="#" className="py-2 flex items-center gap-2"><Smartphone size={16} /> Iphone</Link>
                            <Link href="#" className="py-2 flex items-center gap-2"><Smartphone size={16} /> Samsung</Link>
                            <Link href="#" className="py-2 flex items-center gap-2"><Tablet size={16} /> Ipad</Link>
                            <Link href="#" className="py-2 text-[#D22027]">Logga in</Link>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}