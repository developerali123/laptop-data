"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

// --- EXPANDED Gift Categories Data (More Sliders) ---
const giftCategories = [
    {
        id: 1,
        title: "To Boyfriend",
        image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 2,
        title: "To Girlfriend",
        image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 3,
        title: "Under 200:-",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 4,
        title: "Under 500:-",
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 5,
        title: "Under 1000:-", // New Item
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 6,
        title: "For Children", // New Item
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 7,
        title: "Gaming Gifts",
        image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 8,
        title: "To Grandparents", // New Item
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 9,
        title: "Smart Home",
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 10,
        title: "Beauty & Care", // New Item
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 11,
        title: "For Parents", // New Item
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 12,
        title: "Kitchen Gadgets", // New Item
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400&auto=format&fit=crop",
        link: "#",
    },
];

export default function GiftCategorySlider() {
    const scrollRef = useRef<HTMLDivElement>(null);

    // --- Scroll Logic ---
    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300; // Pixel amount to scroll
            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    return (
        <section className="bg-white py-16 overflow-hidden border-b border-slate-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* --- LEFT SIDE: Text Content --- */}
                    <div className="w-full lg:w-1/3 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                            Do like Santa: buy your Christmas presents at Elgiganten
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Finding the right Christmas gifts can be both time-consuming and frustrating.
                            But we at Elgiganten are here to help. With us, you can find all your
                            Christmas gifts in one place.
                        </p>
                        <Link href="#" className="inline-block text-blue-600 font-bold border-b-2 border-blue-600 hover:text-blue-800 transition-colors">
                            View all categories
                        </Link>
                    </div>

                    {/* --- RIGHT SIDE: Slider --- */}
                    <div className="w-full lg:w-2/3 relative group pl-0 lg:pl-8">

                        {/* Navigation Buttons */}
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/3 -translate-y-1/2 z-20 bg-white shadow-xl border border-slate-100 rounded-full p-3 text-slate-700 hover:text-blue-600 hover:scale-110 transition-all hidden md:flex"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/3 -translate-y-1/2 z-20 bg-white shadow-xl border border-slate-100 rounded-full p-3 text-slate-700 hover:text-blue-600 hover:scale-110 transition-all"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Scrollable Container */}
                        <div
                            ref={scrollRef}
                            className="flex gap-6 overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory scrollbar-hide"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {giftCategories.map((gift) => (
                                <Link
                                    href={gift.link}
                                    key={gift.id}
                                    className="flex-shrink-0 flex flex-col items-center gap-4 group/card snap-center"
                                >
                                    {/* Image Container with Ribbon */}
                                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">

                                        {/* The Circular Image */}
                                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-transparent group-hover/card:border-green-100 transition-all duration-300 shadow-md bg-slate-50">
                                            <img
                                                src={gift.image}
                                                alt={gift.title}
                                                className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                                            />
                                        </div>

                                        {/* Green Ribbon */}
                                        <div className="absolute -top-1 -right-1 w-24 h-24 pointer-events-none overflow-hidden rounded-tr-3xl">
                                            <div className="absolute top-0 right-0 bg-[#009900] text-white text-[10px] font-bold py-1 w-[120%] text-center transform rotate-45 translate-x-[20%] translate-y-[40%] shadow-lg shadow-green-900/20">
                                                <div className="w-full h-0.5 bg-white/30 mb-0.5"></div>
                                                <div className="w-full h-0.5 bg-white/30 mt-0.5"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Button Label */}
                                    <span className="px-5 py-2.5 min-w-[140px] text-center rounded-full border border-slate-300 text-slate-800 font-bold text-sm bg-white group-hover/card:border-[#009900] group-hover/card:text-[#009900] transition-colors shadow-sm">
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