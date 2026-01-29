"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ArrowLeftRight,
    Heart,
    Star,
    ChevronRight,
    ChevronLeft,
    Timer
} from "lucide-react";

// --- Data ---
const products = [
    {
        id: 1,
        title: "LEGO Star Wars Millennium Falcon 75375",
        image: "https://images.unsplash.com/photo-1603356033288-acfcb54801e6?q=80&w=500&auto=format&fit=crop",
        rating: 4.8,
        reviews: 124,
        price: "629",
        currency: ":-",
        oldPrice: "819:-",
        save: "190",
        stockStatus: "In stock",
        stockColor: "text-emerald-700",
        badge: "BESTSELLER"
    },
    {
        id: 2,
        title: "LEGO Technic Oracle Red Bull Racing RB20",
        image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=500&auto=format&fit=crop",
        rating: 5.0,
        reviews: 42,
        price: "1,499",
        currency: ":-",
        oldPrice: "2,199:-",
        save: "700",
        stockStatus: "Low stock",
        stockColor: "text-amber-600",
        badge: "NEW ARRIVAL"
    },
    {
        id: 3,
        title: "Mercedes-AMG F1 W14 E Performance",
        image: "https://images.unsplash.com/photo-1603356033288-acfcb54801e6?q=80&w=500&auto=format&fit=crop",
        rating: 4.7,
        reviews: 89,
        price: "1,499",
        currency: ":-",
        oldPrice: "1,979:-",
        save: "480",
        stockStatus: "In stock (25+)",
        stockColor: "text-emerald-700",
        badge: "EDITOR'S CHOICE"
    },
    {
        id: 4,
        title: "LEGO Star Wars Ahsoka's Jedi Interceptor",
        image: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=500&auto=format&fit=crop",
        rating: 4.5,
        reviews: 15,
        price: "329",
        currency: ":-",
        oldPrice: "419:-",
        save: "90",
        stockStatus: "In stock",
        stockColor: "text-emerald-700",
        badge: null
    },
    {
        id: 5,
        title: "LEGO Star Wars Home One Starcruiser",
        image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=500&auto=format&fit=crop",
        rating: 4.9,
        reviews: 230,
        price: "499",
        currency: ":-",
        oldPrice: "649:-",
        save: "150",
        stockStatus: "Last 2 items",
        stockColor: "text-rose-600",
        badge: "LIMITED"
    },
];

export default function PremiumProductSlider() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 340;
            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    return (
        <section className="bg-[#FAFAFA] py-16 font-sans overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-gray-200 pb-6">
                    <div className="max-w-2xl">
                        <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">
                            Gift of the Year 2025
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">
                            The Adult Toy Collection
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                            <Timer size={16} className="text-slate-900" />
                            <span>Offers end Dec 31st</span>
                        </div>
                        <Link
                            href="#"
                            className="group flex items-center gap-2 text-slate-900 font-semibold border-b border-slate-900 pb-0.5 hover:text-blue-600 hover:border-blue-600 transition-all"
                        >
                            View Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Slider */}
                <div className="relative group/slider">

                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur-md shadow-xl border border-white rounded-full flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 translate-x-4 md:-translate-x-6 hidden sm:flex"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur-md shadow-xl border border-white rounded-full flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 -translate-x-4 md:translate-x-6 hidden sm:flex"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Scrollable Container with Custom Class for hiding scrollbar */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-12 pt-4 px-2 snap-x snap-mandatory hide-scrollbar"
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group relative flex-shrink-0 w-[280px] sm:w-[320px] snap-start bg-white rounded-2xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1"
                            >
                                {/* Badge */}
                                {product.badge && (
                                    <div className="absolute top-4 left-4 z-10 bg-slate-900 text-[#FFD700] text-[10px] font-bold px-3 py-1 rounded-sm tracking-wider shadow-sm">
                                        {product.badge}
                                    </div>
                                )}

                                {/* Wishlist */}
                                <button className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-slate-400 hover:text-rose-500 transition-all">
                                    <Heart size={18} />
                                </button>

                                {/* Image */}
                                <div className="h-[240px] w-full bg-slate-50 rounded-xl flex items-center justify-center mb-5 overflow-hidden relative">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-[85%] h-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />

                                    {/* Compare */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="flex items-center gap-1.5 bg-white shadow-md border border-gray-100 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-blue-600">
                                            <ArrowLeftRight size={12} /> Compare
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-3 px-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LEGO® Technic</p>

                                    <h3 className="font-serif font-medium text-slate-900 text-lg leading-snug line-clamp-2 min-h-[52px]">
                                        {product.title}
                                    </h3>

                                    <div className="flex items-center gap-2">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "#e2e8f0"} className={i >= Math.floor(product.rating) ? "text-slate-200" : ""} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium">{product.rating}</span>
                                    </div>

                                    <div className="h-px bg-slate-100 w-full"></div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-xs text-slate-400 line-through mb-0.5">{product.oldPrice}</div>
                                            <div className="flex items-baseline gap-1 text-slate-900">
                                                <span className="text-2xl font-bold font-serif">{product.price}</span>
                                                <span className="text-sm font-medium">{product.currency}</span>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">You Save</div>
                                            <div className="bg-[#FFF8E1] text-[#B45309] border border-[#FEF3C7] px-2 py-1 rounded text-xs font-bold">
                                                {product.save}:-
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`text-[11px] font-medium pt-2 flex items-center gap-1.5 ${product.stockColor}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${product.stockColor.replace('text-', 'bg-')} animate-pulse`}></div>
                                        {product.stockStatus}
                                    </div>

                                </div>
                            </div>
                        ))}

                        {/* View All Card */}
                        <div className="flex-shrink-0 w-[150px] flex items-center justify-center snap-start">
                            <Link href="#" className="group flex flex-col items-center gap-3 text-slate-400 hover:text-blue-600 transition-colors">
                                <div className="w-16 h-16 rounded-full border-2 border-slate-100 group-hover:border-blue-600 flex items-center justify-center transition-all">
                                    <ArrowRight size={24} />
                                </div>
                                <span className="font-bold text-sm">View All Toys</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            {/* Force Hide Scrollbar CSS */}
            <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
}