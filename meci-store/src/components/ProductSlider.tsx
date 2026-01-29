"use client";

import React, { useRef } from "react";
import Image from "next/image"; // ✅ Import Image
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WooProduct } from "@/src/lib/types";

interface Props {
    products: WooProduct[];
    title: string;
}

export default function ProductSlider({ products, title }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
    };

    if (!products?.length) return null;

    return (
        <section className="py-8">
            <div className="flex justify-between items-end mb-6 px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
                <div className="flex gap-2">
                    <button onClick={() => scroll("left")} className="p-2 rounded-full border border-gray-200 hover:bg-gray-100"><ChevronLeft /></button>
                    <button onClick={() => scroll("right")} className="p-2 rounded-full border border-gray-200 hover:bg-gray-100"><ChevronRight /></button>
                </div>
            </div>

            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                {products.map((product) => (
                    <div key={product.id} className="min-w-[280px] md:min-w-[300px] snap-start bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 p-4 group">

                        {/* Image Container */}
                        <div className="relative h-[220px] mb-4 flex items-center justify-center bg-gray-50 rounded-lg p-2">

                            {/* ✅ Fixed Image Component */}
                            <Image
                                src={product.images[0]?.src || "https://placehold.co/300"}
                                alt={product.name}
                                width={300}  // Required by Next.js
                                height={300} // Required by Next.js
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                unoptimized={true} // ⚠️ Agar images load na hon to yeh line add kar dein
                            />

                            {product.on_sale && <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>}
                        </div>

                        <h3 className="font-bold text-slate-900 line-clamp-2 h-12">{product.name}</h3>

                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-xl font-bold text-slate-900">{product.price} kr</span>
                            {product.on_sale && <span className="text-sm text-gray-400 line-through">{product.regular_price} kr</span>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}