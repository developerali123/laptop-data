"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, ArrowLeftRight, Star } from "lucide-react";

// --- Mock Data ---
const products = [
    {
        id: 1,
        title: "Siemens iQ300 Diskmaskin SN436W06KS (vit)",
        image: "https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?q=80&w=500&auto=format&fit=crop",
        rating: 4.4,
        reviews: 134,
        price: "4995:-",
        oldPrice: "8495:-",
        save: "3500",
        stock: "I lager online (100+)",
        badge: "SUPER DEAL",
        energy: "E",
    },
    {
        id: 2,
        title: "Samsung Galaxy A16 5G smartphone 4/128GB (svart)",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=500&auto=format&fit=crop",
        rating: 4.5,
        reviews: 3209,
        price: "1790:-",
        oldPrice: "2799:-",
        save: "1000",
        stock: "I lager online (100+)",
        badge: "SUPER DEAL",
        energy: "B",
    },
    {
        id: 3,
        title: "Samsung 65\" Q7F3 4K QLED Smart TV (2025)",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=500&auto=format&fit=crop",
        rating: 4.5,
        reviews: 6,
        price: "7990:-",
        oldPrice: "18990:-",
        save: "11000",
        stock: "I lager online (50+)",
        badge: "SUPER DEAL",
        energy: "G",
    },
    {
        id: 4,
        title: "Samsung 75\" Q7F3 4K QLED Smart TV (2025)",
        image: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?q=80&w=500&auto=format&fit=crop",
        rating: 5.0,
        reviews: 1,
        price: "9990:-",
        oldPrice: "22990:-",
        save: "13000",
        stock: "I lager online (100+)",
        badge: "SUPER DEAL",
        energy: "G",
    },
];

export default function SuperDeals() {
    const [snowflakes, setSnowflakes] = useState<any[]>([]);

    useEffect(() => {
        const flakes = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random(),
            size: `${Math.random() * 4 + 2}px`,
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <section className="relative bg-[#1E3A8A] py-16 overflow-hidden font-sans">

            {/* Snowfall Animation Layer */}
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
                            opacity: flake.opacity,
                            animationDuration: flake.animationDuration,
                            animationDelay: flake.animationDelay,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">

                    {/* --- LEFT SIDE: Big Title & Button --- */}
                    <div className="lg:w-1/4 flex flex-col justify-center items-start text-left mb-8 lg:mb-0">
                        <h2 className="text-[#CCFF00] text-4xl lg:text-5xl font-black uppercase tracking-tight drop-shadow-md leading-tight mb-6">
                            VECKANS <br /> SUPER DEALS
                        </h2>

                        <p className="text-blue-200 text-sm mb-8 max-w-[200px]">
                            Missa inte veckans bästa priser! Gäller så långt lagret räcker.
                        </p>

                        <Link
                            href="#"
                            className="bg-white hover:bg-gray-100 text-black font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:scale-105 flex items-center gap-2"
                        >
                            Se alla deals <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* --- RIGHT SIDE: Product Grid with Striped Border --- */}
                    <div className="lg:w-3/4">
                        <div
                            className="p-3 shadow-2xl h-full"
                            style={{
                                background: "repeating-linear-gradient(-45deg, #FFEA00, #FFEA00 20px, #FF007F 20px, #FF007F 40px)"
                            }}
                        >
                            <div className="bg-white h-full p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                                {products.map((product) => (
                                    <div key={product.id} className="relative group p-3 border-r border-gray-100 last:border-0 hover:shadow-xl transition-all bg-white flex flex-col justify-between">

                                        {/* Top Container */}
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <button className="text-gray-400 hover:text-blue-600 flex items-center gap-1 text-[10px] font-semibold">
                                                    <ArrowLeftRight size={12} /> Jämför
                                                </button>
                                                <button className="text-gray-400 hover:text-red-500">
                                                    <Heart size={16} />
                                                </button>
                                            </div>

                                            {/* Pink Badge */}
                                            <div className="absolute top-8 left-0 z-10 w-14 h-14 bg-[#FF007F] text-white rounded-full flex flex-col items-center justify-center shadow-md transform -rotate-12 group-hover:scale-110 transition-transform">
                                                <span className="text-[9px] font-bold leading-none mt-1">SUPER</span>
                                                <span className="text-xs font-black leading-none">DEAL</span>
                                            </div>

                                            {/* Energy Label */}
                                            {product.energy && (
                                                <div className="absolute top-8 right-0 w-6 h-8 bg-gradient-to-b from-green-500 to-red-500 text-white text-xs font-bold flex flex-col items-center justify-center border border-white shadow-sm clip-energy">
                                                    <span className="text-[6px] opacity-70">A-G</span>
                                                    {product.energy}
                                                </div>
                                            )}

                                            <div className="h-32 w-full flex items-center justify-center mb-4 relative">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            <h3 className="text-xs font-bold text-slate-900 line-clamp-2 h-8 leading-snug mb-1">
                                                {product.title}
                                            </h3>

                                            <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-2">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={10} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i >= Math.floor(product.rating) ? "text-gray-300" : ""} />
                                                    ))}
                                                </div>
                                                <span>({product.reviews})</span>
                                            </div>
                                        </div>

                                        {/* Bottom Container */}
                                        <div>
                                            <div className="flex items-end gap-2 mb-1">
                                                <span className="text-2xl font-black text-slate-900">{product.price}</span>
                                            </div>
                                            <div className="flex flex-col items-start mb-2">
                                                <span className="bg-[#FFEA00] text-black text-[9px] px-1 font-bold mb-0.5">SPARA {product.save}</span>
                                                <span className="text-[9px] text-gray-500 line-through">Tidigare {product.oldPrice}</span>
                                            </div>

                                            <div className="pt-2 border-t border-gray-50">
                                                <div className="flex items-center gap-1 text-[9px] font-bold text-green-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                    {product.stock}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx global>{`
        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(20px); opacity: 0.3; }
        }
        .animate-snowfall {
          animation-name: snowfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </section>
    );
}


// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Heart, ArrowRight, ArrowLeftRight, Star, ShoppingCart } from "lucide-react";

// // --- Updated Mock Data with Real Images ---
// const products = [
//     {
//         id: 1,
//         title: "Philips Series 2200 Fully Automatic Coffee Machine EP222010",
//         // Coffee Machine Image
//         image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=500&auto=format&fit=crop",
//         rating: 4.5,
//         reviews: 173,
//         price: "2999:-",
//         oldPrice: "4499:-",
//         save: "1500",
//         stock: "In stock online (100+)",
//         badge: "SUPER DEAL",
//     },
//     {
//         id: 2,
//         title: 'Samsung 55" U8095F 4K Smart TV (2025)',
//         // Smart TV Image
//         image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=500&auto=format&fit=crop",
//         rating: 4.6,
//         reviews: 9,
//         price: "5555:-",
//         oldPrice: "9990:-",
//         save: "4435",
//         stock: "In stock online (25+)",
//         badge: "SUPER DEAL",
//         energy: "G",
//     },
//     {
//         id: 3,
//         title: 'Lenovo IdeaPad Slim 3 15AMN8 R3-7320U/8GB/128 15.6" laptop',
//         // Laptop Image
//         image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=500&auto=format&fit=crop",
//         rating: 4.6,
//         reviews: 41,
//         price: "3990:-",
//         oldPrice: "7495:-",
//         save: "3505",
//         stock: "In stock online (100+)",
//         badge: "SUPER DEAL",
//     },
//     {
//         id: 4,
//         title: "Siemens iQ300 Dishwasher SN436W06KS (white)",
//         // Kitchen/Appliance Image
//         image: "https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?q=80&w=500&auto=format&fit=crop",
//         rating: 4.4,
//         reviews: 134,
//         price: "4995:-",
//         oldPrice: "8495:-",
//         save: "3500",
//         stock: "In stock online (100+)",
//         badge: "SUPER DEAL",
//         energy: "E",
//     },
// ];

// export default function SuperDeals() {
//     // --- Snowfall Logic ---
//     const [snowflakes, setSnowflakes] = useState<any[]>([]);

//     useEffect(() => {
//         // Generate 50 random snowflakes
//         const flakes = Array.from({ length: 50 }).map((_, i) => ({
//             id: i,
//             left: `${Math.random() * 100}%`,
//             animationDuration: `${Math.random() * 5 + 5}s`,
//             animationDelay: `${Math.random() * 5}s`,
//             opacity: Math.random(),
//             size: `${Math.random() * 4 + 2}px`,
//         }));
//         setSnowflakes(flakes);
//     }, []);

//     return (
//         <section className="relative bg-[#001C55] py-12 overflow-hidden font-sans">

//             {/* 1. SNOWFALL ANIMATION LAYER */}
//             <div className="absolute inset-0 pointer-events-none z-0">
//                 {snowflakes.map((flake) => (
//                     <div
//                         key={flake.id}
//                         className="absolute bg-white rounded-full animate-snowfall"
//                         style={{
//                             left: flake.left,
//                             top: "-10px",
//                             width: flake.size,
//                             height: flake.size,
//                             opacity: flake.opacity,
//                             animationDuration: flake.animationDuration,
//                             animationDelay: flake.animationDelay,
//                         }}
//                     />
//                 ))}
//             </div>

//             <div className="container mx-auto px-4 relative z-10">

//                 {/* 2. HEADER */}
//                 <div className="flex flex-col sm:flex-row justify-between items-end mb-6 gap-4">
//                     <h2 className="text-[#CCFF00] text-3xl sm:text-4xl font-black uppercase tracking-tight drop-shadow-md">
//                         This Week's Super Deals
//                         <span className="block text-white text-sm font-normal normal-case tracking-normal mt-1 opacity-80">
//                             Winter specials just for you
//                         </span>
//                     </h2>
//                     <Link
//                         href="#"
//                         className="bg-white hover:bg-gray-100 text-[#001C55] font-bold py-2 px-6 rounded-full transition-colors shadow-lg flex items-center gap-2 group"
//                     >
//                         See all deals <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                     </Link>
//                 </div>

//                 {/* 3. STRIPED BORDER CONTAINER */}
//                 <div
//                     className="p-3 rounded-xl shadow-2xl"
//                     style={{
//                         background: "repeating-linear-gradient(-45deg, #FFEA00, #FFEA00 20px, #FF007F 20px, #FF007F 40px)"
//                     }}
//                 >
//                     <div className="bg-white rounded-lg p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

//                         {/* PRODUCT CARDS */}
//                         {products.map((product) => (
//                             <div key={product.id} className="relative group p-4 border border-gray-100 hover:border-gray-300 rounded-lg transition-all bg-white flex flex-col justify-between">

//                                 {/* Content Container (For Flex Grow) */}
//                                 <div>
//                                     {/* Top Actions */}
//                                     <div className="flex justify-between items-start mb-4">
//                                         <button className="text-gray-400 hover:text-blue-600 flex items-center gap-1 text-xs font-semibold transition-colors">
//                                             <ArrowLeftRight size={14} /> Compare
//                                         </button>
//                                         <button className="text-gray-400 hover:text-red-500 transition-colors">
//                                             <Heart size={20} />
//                                         </button>
//                                     </div>

//                                     {/* Pink Badge */}
//                                     <div className="absolute top-10 left-2 z-10 w-16 h-16 bg-[#FF007F] text-white rounded-full flex flex-col items-center justify-center shadow-md transform -rotate-12 group-hover:scale-110 transition-transform duration-300">
//                                         <span className="text-[10px] font-bold leading-none mt-1">SUPER</span>
//                                         <span className="text-sm font-black leading-none">DEAL</span>
//                                     </div>

//                                     {/* Image Area */}
//                                     <div className="h-48 w-full flex items-center justify-center mb-4 relative overflow-hidden rounded-md">
//                                         <img
//                                             src={product.image}
//                                             alt={product.title}
//                                             className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
//                                         />
//                                         {/* Energy Label */}
//                                         {product.energy && (
//                                             <div className="absolute right-0 bottom-0 bg-gradient-to-b from-green-500 to-red-500 text-white w-6 h-8 text-[10px] font-bold flex items-center justify-center border border-white shadow-sm">
//                                                 {product.energy}
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Content */}
//                                     <div className="space-y-2">
//                                         <h3 className="text-sm font-bold text-slate-800 line-clamp-2 h-10 leading-snug">
//                                             {product.title}
//                                         </h3>

//                                         {/* Ratings */}
//                                         <div className="flex items-center gap-1 text-xs text-slate-500">
//                                             <div className="flex text-yellow-400">
//                                                 <Star size={12} fill="currentColor" />
//                                                 <Star size={12} fill="currentColor" />
//                                                 <Star size={12} fill="currentColor" />
//                                                 <Star size={12} fill="currentColor" />
//                                                 <Star size={12} fill="currentColor" className={product.rating < 5 ? "text-gray-300" : ""} />
//                                             </div>
//                                             <span>{product.rating}</span>
//                                             <span>({product.reviews} reviews)</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Bottom Section: Price & Cart */}
//                                 <div className="mt-4">
//                                     <div className="flex items-baseline gap-2">
//                                         <span className="text-3xl font-black text-slate-900">{product.price}</span>
//                                     </div>
//                                     <div className="flex items-center gap-2 text-xs mt-1">
//                                         <span className="bg-[#FFEA00] text-black px-1.5 py-0.5 font-bold rounded-sm">SAVE {product.save}</span>
//                                         <span className="text-gray-500 line-through">{product.oldPrice}</span>
//                                     </div>
//                                     <p className="text-[10px] text-gray-500 mt-1">Valid until Wednesday 24 Dec.</p>

//                                     <div className="flex justify-between items-end pt-3 mt-3 border-t border-gray-100">
//                                         {/* Stock Status */}
//                                         <div className="flex items-center gap-1.5 text-[11px] font-bold text-green-600">
//                                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//                                             {product.stock}
//                                         </div>

//                                         {/* Add to Cart Button Icon */}
//                                         <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors shadow-md">
//                                             <ShoppingCart size={18} />
//                                         </button>
//                                     </div>
//                                 </div>

//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* CSS for Snowfall Keyframes */}
//             <style jsx global>{`
//         @keyframes snowfall {
//           0% {
//             transform: translateY(-10px) translateX(0px);
//             opacity: 0;
//           }
//           20% {
//              opacity: 1;
//           }
//           100% {
//             transform: translateY(110vh) translateX(20px);
//             opacity: 0.3;
//           }
//         }
//         .animate-snowfall {
//           animation-name: snowfall;
//           animation-timing-function: linear;
//           animation-iteration-count: infinite;
//         }
//       `}</style>
//         </section>
//     );
// }