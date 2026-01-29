"use client";

import React, { useState } from "react";
import Image from "next/image"; // ✅ Fix: Import Image
import { Star, ShoppingCart, Loader2 } from "lucide-react";
import { WooProduct } from "@/src/lib/types";

interface Props {
    products: WooProduct[];
    title: string;
}

export default function ProductGrid({ products, title }: Props) {
    // Logic: Shuru main sirf 8 dikhao, button click par 4 aur add karo
    const [visibleCount, setVisibleCount] = useState(8);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = () => {
        setLoading(true);
        // Fake loading effect for premium feel
        setTimeout(() => {
            setVisibleCount((prev) => prev + 4);
            setLoading(false);
        }, 600);
    };

    if (!products || products.length === 0) return null;

    return (
        <section className="py-16 bg-white" id="all-products">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-[#D22027] font-bold tracking-wider uppercase text-xs bg-red-50 px-3 py-1 rounded-full">
                        Our Collection
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-4">
                        {title}
                    </h2>
                    <div className="w-20 h-1 bg-[#D22027] mx-auto rounded-full"></div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {products.slice(0, visibleCount).map((product) => (
                        <div key={product.id} className="group relative">

                            {/* Image Card */}
                            <div className="relative h-[280px] bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                                {/* Badges */}
                                {product.on_sale && (
                                    <span className="absolute top-3 left-3 bg-[#D22027] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10">
                                        SALE
                                    </span>
                                )}

                                {/* Image */}
                                <div className="w-full h-full flex items-center justify-center p-6">
                                    {/* ✅ Fix: Using Next.js Image Component */}
                                    <Image
                                        src={product.images[0]?.src || "https://placehold.co/400"}
                                        alt={product.name}
                                        width={400}
                                        height={400}
                                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                                    />
                                </div>

                                {/* Quick Action Button (Hover pe aata hai) */}
                                <button className="absolute bottom-4 right-4 bg-white text-slate-900 p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#D22027] hover:text-white">
                                    <ShoppingCart size={20} />
                                </button>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-1">
                                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Accessories</p>
                                <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-2 group-hover:text-[#D22027] transition-colors">
                                    {product.name}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center gap-1 py-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} className="text-yellow-400 fill-current" />
                                    ))}
                                    <span className="text-xs text-slate-400">(12 reviews)</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xl font-black text-slate-900">{product.price}:-</span>
                                    {product.on_sale && (
                                        <span className="text-sm text-gray-400 line-through decoration-red-500">
                                            {product.regular_price}
                                        </span>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < products.length && (
                    <div className="mt-16 text-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-[#D22027] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> Loading...
                                </>
                            ) : (
                                "Load More Products"
                            )}
                        </button>
                        <p className="text-xs text-slate-400 mt-3">
                            Showing {visibleCount} of {products.length} products
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
}