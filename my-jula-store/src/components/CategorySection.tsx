"use client";

import React from "react";
import Link from "next/link";

// --- Updated Data with Pexels Images (More Reliable) ---
const categories = [
    {
        name: "Cartons, Boxes",
        // Cardboard boxes
        image: "https://images.pexels.com/photos/4498152/pexels-photo-4498152.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "cartons-boxes"
    },
    {
        name: "Packing tape, Strap",
        // Tape dispenser
        image: "https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "packing-tape"
    },
    {
        name: "Envelopes, Bags",
        // Envelopes
        image: "https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "envelopes"
    },
    {
        name: "Plastic bags",
        // Plastic packaging
        image: "https://images.pexels.com/photos/7205047/pexels-photo-7205047.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "plastic-bags"
    },
    {
        name: "Protective material",
        // Bubble wrap
        image: "https://images.unsplash.com/photo-1518112390430-f4ab02e9c2c8?q=80&w=300&auto=format&fit=crop", // Bubble wrap style
        slug: "protective-material"
    },
    {
        name: "Labels",
        // Sticker/Labels
        image: "https://images.pexels.com/photos/7412093/pexels-photo-7412093.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "labels"
    },
    {
        name: "Stretch film",
        // Plastic wrap/Stretch film
        image: "https://images.pexels.com/photos/7412093/pexels-photo-7412093.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "stretch-film"
    },
    {
        name: "Pallets",
        // Wooden Pallets
        image: "https://images.pexels.com/photos/7412093/pexels-photo-7412093.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "pallets"
    },
    {
        name: "Storage",
        // Warehouse shelves
        image: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "storage"
    },
    {
        name: "Warehouse equip.",
        // Forklift/Trolley
        image: "https://images.pexels.com/photos/2569842/pexels-photo-2569842.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "warehouse-equipment"
    },
    {
        name: "Packaging machines",
        // Industrial Conveyor
        image: "https://images.pexels.com/photos/3920616/pexels-photo-3920616.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "packaging-machines"
    },
    {
        name: "Office",
        // Office supplies
        image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "office"
    },
    {
        name: "Hygiene",
        // Hand sanitizer/Masks
        image: "https://images.pexels.com/photos/3959485/pexels-photo-3959485.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "hygiene"
    },
    {
        name: "Work gloves",
        // Safety gloves
        image: "https://images.pexels.com/photos/3826678/pexels-photo-3826678.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "work-gloves"
    },
    {
        name: "Retail packaging",
        // Gift box/Retail
        image: "https://images.pexels.com/photos/6213729/pexels-photo-6213729.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "retail-packaging"
    },
    {
        name: "Customized",
        // Custom box/branding
        image: "https://images.pexels.com/photos/7238479/pexels-photo-7238479.jpeg?auto=compress&cs=tinysrgb&w=400",
        slug: "customized-packaging"
    },
];

export default function CategorySection() {
    return (
        <section className="bg-white py-12 border-b border-gray-100 font-sans">
            <div className="container mx-auto px-4">

                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center sm:text-left">
                    Shop by Category
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-10">
                    {categories.map((cat, index) => (
                        <Link
                            key={index}
                            href={`/category/${cat.slug}`}
                            className="group flex flex-col items-center text-center gap-3 cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-[#D22027] shadow-sm group-hover:shadow-lg transition-all duration-300 bg-gray-200">

                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />

                            </div>

                            <span className="text-[14px] leading-tight font-semibold text-slate-700 group-hover:text-[#D22027] transition-colors max-w-[140px]">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}