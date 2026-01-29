"use client";
import { useEffect, useState, useRef } from "react";

// --- Animation Logic (Same as before) ---
const AnimatedNumber = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (countRef.current) observer.observe(countRef.current);
        return () => {
            if (countRef.current) observer.unobserve(countRef.current);
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }, [isVisible, end, duration]);

    return <span ref={countRef}>{count.toLocaleString()}</span>;
};

export default function Counter() {
    const stats = [
        {
            id: 1,
            value: 1234,
            label: "Working Hours",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            ),
        },
        {
            id: 2,
            value: 567,
            label: "Projects Done",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            ),
        },
        {
            id: 3,
            value: 8901,
            label: "Cups of Coffee",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            ),
        },
        {
            id: 4,
            value: 9876,
            label: "Happy Clients",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
            ),
        },
    ];

    return (
        // CHANGE: 'bg-black' kar diya (No Slate/Blue) taake Hero se match kare.
        <section className="relative py-24 bg-black text-white overflow-hidden border-y border-white/5">

            {/* Subtle Orange Glow (Premium Feel) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {stats.map((stat) => (
                        <div key={stat.id} className="group flex flex-col items-center">

                            {/* Icon: Default White, Hover Orange */}
                            <div className="mb-4 p-4 rounded-full bg-white/5 text-gray-300 group-hover:bg-brand-orange group-hover:text-black transition-all duration-300 transform group-hover:-translate-y-1 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                                {stat.icon}
                            </div>

                            {/* Animated Number: Default White */}
                            <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white group-hover:text-brand-orange transition-colors duration-300">
                                <AnimatedNumber end={stat.value} />
                                <span className="text-brand-orange text-3xl align-top ml-1">+</span>
                            </h3>

                            {/* Label: Default Grey */}
                            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors duration-300">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}