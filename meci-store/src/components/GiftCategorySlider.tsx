"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ Fix: Import Image
import { ChevronRight, ChevronLeft } from "lucide-react";

// Static Categories Data
const giftCategories = [
    { id: 1, title: "For Him", image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=400&auto=format&fit=crop" },
    { id: 2, title: "For Her", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop" },
    {
        id: 3,
        title: "Electronics",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=400&auto=format&fit=crop"
    },
    { id: 4, title: "Gaming", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400&auto=format&fit=crop" },
    { id: 5, title: "Kids", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=400&auto=format&fit=crop" },
    { id: 6, title: "Home", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=400&auto=format&fit=crop" },
    { id: 7, title: "Under 500kr", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400&auto=format&fit=crop" },
    {
        id: 8,
        title: "Beauty",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop"
    },
];

export default function GiftCategorySlider() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-white py-12 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 items-center">

                    {/* Left Text */}
                    <div className="w-full lg:w-1/4 space-y-4 text-center lg:text-left">
                        <h2 className="text-3xl font-black text-slate-900 leading-tight">
                            Shop by <br /> <span className="text-[#D22027]">Category</span>
                        </h2>
                        <p className="text-slate-500 text-sm">Find the perfect gift for your loved ones.</p>
                        <Link href="#" className="inline-block text-[#D22027] font-bold border-b-2 border-[#D22027] hover:text-black hover:border-black transition-all">
                            View All Categories
                        </Link>
                    </div>

                    {/* Right Slider */}
                    <div className="w-full lg:w-3/4 relative group pl-0 lg:pl-8">
                        {/* Buttons */}
                        <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 hidden md:flex -translate-x-4">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 hidden md:flex translate-x-4">
                            <ChevronRight size={20} />
                        </button>

                        {/* Items */}
                        <div ref={scrollRef} className="flex gap-6 overflow-x-auto py-4 px-2 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
                            {giftCategories.map((gift) => (
                                <Link href="#" key={gift.id} className="flex-shrink-0 flex flex-col items-center gap-4 group/card snap-center cursor-pointer">
                                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-transparent group-hover/card:border-green-100 transition-all duration-300 shadow-md">

                                            {/* ✅ Fix: Using Next.js Image Component */}
                                            <Image
                                                src={gift.image}
                                                alt={gift.title}
                                                width={200}
                                                height={200}
                                                className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                                            />

                                        </div>
                                        {/* Ribbon */}
                                        <div className="absolute top-0 right-0 bg-[#009900] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg rotate-12 group-hover/card:scale-110 transition-transform">
                                            Gift
                                        </div>
                                    </div>
                                    <span className="font-bold text-slate-800 group-hover/card:text-[#D22027] transition-colors">
                                        {gift.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}