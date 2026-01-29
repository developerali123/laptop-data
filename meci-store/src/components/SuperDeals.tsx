"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image"; // ✅ Fix: Import Image
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { WooProduct } from "@/src/lib/types";

interface Props {
    deals: WooProduct[];
}

export default function SuperDeals({ deals }: Props) {
    const [snowflakes, setSnowflakes] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // --- Snowfall Logic ---
    useEffect(() => {
        const flakes = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            size: `${Math.random() * 4 + 2}px`,
        }));
        setSnowflakes(flakes);
    }, []);

    // --- Slider Scroll Logic ---
    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    if (!deals?.length) return null;

    return (
        <section className="relative bg-[#1E3A8A] py-16 overflow-hidden font-sans mt-12 mb-12">

            {/* 1. Snow Effect Layer */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {snowflakes.map((flake) => (
                    <div
                        key={flake.id}
                        className="absolute bg-white rounded-full animate-snowfall"
                        style={{
                            left: flake.left,
                            top: "-10px",
                            width: flake.size,
                            height: flake.size,
                            animationDuration: flake.animationDuration,
                            animationDelay: flake.animationDelay,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">

                    {/* 2. Left Banner Text */}
                    <div className="lg:w-1/4 flex flex-col justify-center items-start text-left mb-8 lg:mb-0">
                        <h2 className="text-[#CCFF00] text-4xl lg:text-5xl font-black uppercase tracking-tight drop-shadow-md leading-tight mb-6">
                            VECKANS <br /> SUPER DEALS
                        </h2>
                        <p className="text-blue-200 text-sm mb-8 opacity-90">
                            Dont miss this weeks best prices! Valid while stocks last.
                        </p>
                        <button className="bg-white hover:bg-gray-100 text-black font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105">
                            See all deals <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* 3. Right Slider */}
                    <div className="lg:w-3/4 min-w-0">
                        <div className="p-1.5 shadow-2xl h-full rounded-xl bg-gradient-to-br from-yellow-400 via-pink-500 to-pink-600 relative group/slider">

                            {/* Buttons */}
                            <button
                                onClick={() => scroll("left")}
                                className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-20 bg-white text-pink-600 shadow-xl rounded-full p-3 hover:scale-110 transition-all border-2 border-pink-100 hidden sm:flex"
                            >
                                <ChevronLeft size={24} strokeWidth={2.5} />
                            </button>

                            <button
                                onClick={() => scroll("right")}
                                className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-20 bg-white text-pink-600 shadow-xl rounded-full p-3 hover:scale-110 transition-all border-2 border-pink-100 hidden sm:flex"
                            >
                                <ChevronRight size={24} strokeWidth={2.5} />
                            </button>

                            {/* Scrollable Container */}
                            <div className="bg-white h-full rounded-lg p-4 overflow-hidden">
                                <div
                                    ref={scrollRef}
                                    className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
                                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                >
                                    {deals.map((product) => (
                                        <div
                                            key={product.id}
                                            className="min-w-[260px] max-w-[260px] snap-start relative group p-3 border border-gray-100 rounded-lg hover:shadow-xl transition-all bg-white flex flex-col justify-between"
                                        >

                                            {/* Pink Badge */}
                                            <div className="absolute top-2 left-2 z-10 w-12 h-12 bg-[#FF007F] text-white rounded-full flex flex-col items-center justify-center shadow-md transform -rotate-12">
                                                <span className="text-[8px] font-bold mt-1">SUPER</span>
                                                <span className="text-[10px] font-black">DEAL</span>
                                            </div>

                                            {/* Image Container */}
                                            <div className="h-40 w-full flex items-center justify-center mb-4 p-2 bg-gray-50 rounded-lg relative">

                                                {/* ✅ Fix: Using Next.js Image Component */}
                                                <Image
                                                    src={product.images[0]?.src || "https://placehold.co/300"}
                                                    alt={product.name}
                                                    width={300} // Proper optimization width
                                                    height={300} // Proper optimization height
                                                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mb-2 min-h-[32px]">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center gap-1 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={10} className="text-yellow-400 fill-current" />
                                                    ))}
                                                    <span className="text-[10px] text-gray-400">(24)</span>
                                                </div>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-xl font-black text-slate-900">{product.price}:-</span>
                                                    {product.on_sale && <span className="text-xs text-gray-400 line-through mb-1">{product.regular_price}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes snowfall {
                    0% { transform: translateY(-10px) translateX(0px); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateY(100vh) translateX(20px); opacity: 0.3; }
                }
                .animate-snowfall { animation-name: snowfall; animation-timing-function: linear; animation-iteration-count: infinite; }
            `}</style>
        </section>
    );
}