"use client";

import { useState } from "react";
import Image from "next/image";

// Data
const testimonial = [
    {
        id: 1,
        name: "Fanny Dolff",
        role: "Entrepreneur",
        image: "/Fanny-Dolff-Itterate-reviews.jpeg",
        quote: "Elin is a warm soul who listens. Creativity comes naturally to her, and it’s a joy to collaborate.",
        rating: 5, // Rating Added
    },
    {
        id: 2,
        name: "Axel Samuelson",
        role: "Head of Growth",
        image: "/Axel-Samuelson-Itterate-Reviews.jpeg",
        quote: "One of the most genuine and easy-going people I have ever worked with. A pure joy to be part of her team.",
        rating: 5, // Rating Added
    },
    {
        id: 3,
        name: "Alex Åberg",
        role: "Head Copywriter",
        image: "/Alex-Aberg-Itterate-reviews.jpeg",
        quote: "She always strives to do her best and goes above and beyond. Elin radiates energy and gets things done.",
        rating: 5, // Rating Added
    }
];

export default function Testimonials() {
    const [activeId, setActiveId] = useState<number | null>(null);

    return (
        <section className="py-24 bg-brand-black text-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">

                <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-12 text-gray-400 text-center md:text-left">
                    Collaborator Reviews
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonial.map((person) => {

                        const isActive = activeId === person.id;
                        const isAnyActive = activeId !== null;
                        const shouldBlur = isAnyActive && !isActive;

                        return (
                            <div
                                key={person.id}
                                onClick={() => setActiveId(isActive ? null : person.id)}
                                className={`
                                  relative group cursor-pointer transition-all duration-700 ease-in-out
                                  ${shouldBlur ? "blur-sm opacity-30 scale-95" : "opacity-100 scale-100"} 
                                  ${isActive ? "z-10 scale-105" : ""}
                                `}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 shadow-2xl border border-gray-800 hover:border-brand-orange/30 transition-colors">

                                    {/* 👇 NEW: Rating Badge (Top Right) */}
                                    <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/10 shadow-lg">
                                        <span className="text-brand-orange text-xs font-bold">{person.rating}.0</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-3 h-3 ${i < person.rating ? "text-brand-orange" : "text-gray-500"}`}>
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>

                                    <Image
                                        src={person.image}
                                        alt={person.name}
                                        fill
                                        className={`
                                          object-cover transition-all duration-700
                                          ${isActive ? "grayscale-0" : "grayscale"}
                                        `}
                                    />

                                    {/* Overlay Gradient */}
                                    <div className={`
                                        absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent 
                                        transition-opacity duration-500 flex flex-col justify-end p-8
                                        ${isActive ? "opacity-100" : "opacity-0"}
                                    `}>
                                        <div className={`transform transition-all duration-500 ${isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                                            <p className="text-brand-orange font-bold text-sm tracking-widest uppercase mb-2">
                                                {person.role}
                                            </p>
                                            <h3 className="text-2xl font-bold text-white mb-4">
                                                {person.name}
                                            </h3>
                                            <p className="text-gray-300 text-lg leading-relaxed italic font-light">
                                                `{person.quote}`
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Default Name Label */}
                                <div className={`mt-4 text-center transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-100"}`}>
                                    <h4 className="text-xl font-bold text-gray-300 group-hover:text-white transition">{person.name}</h4>
                                    <p className="text-sm text-gray-500 uppercase tracking-widest">{person.role}</p>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}