import Link from 'next/link';
import Image from 'next/image'; // 👈 Image Import Karein

export default function Footer() {
    return (
        <footer className="bg-black text-white py-20 border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* LEFT COLUMN: Brand, Text, CTA, Socials */}
                    <div>

                        {/* 👇 1. LOGO IMAGE REPLACEMENT (Text Hata Diya) */}
                        <div className="relative w-40 h-10 mb-8">
                            <Image
                                src="/logo.png" // ✅ Path: /logo.png (Make sure file public folder mein ho)
                                alt="Itterate Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>

                        {/* Description Text */}
                        <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-md">
                            Navigating life’s intricate fabric, choices unfold paths to the extraordinary,
                            demanding creativity, curiosity, and courage for a truly fulfilling journey.
                        </p>

                        {/* Main CTA Button */}
                        <button className="bg-brand-orange text-black text-sm font-bold uppercase tracking-wider px-10 py-4 rounded-full hover:bg-white transition-all duration-300 shadow-lg shadow-orange-900/20 mb-12">
                            Get Started
                        </button>

                        {/* Social Icons (Colored) */}
                        <div className="flex items-center gap-4">
                            {/* Instagram (Pink Gradient) */}
                            <Link href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px] hover:scale-110 transition-transform">
                                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </div>
                            </Link>

                            {/* LinkedIn (Blue) */}
                            <Link href="#" className="w-10 h-10 rounded-full bg-[#0077b5] flex items-center justify-center hover:scale-110 transition-transform text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Contact & Menu */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-8 pt-4">

                        {/* Contact Section */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
                            <div className="space-y-4 text-gray-300 font-light">
                                <p>Stjärnvägen 15 135 55 Tyresö</p>
                                <p>Email: elin@itterate.se</p>
                                <div className="pt-4">
                                    <p className="font-medium text-white mb-1">Monday—Friday</p>
                                    <p>8am — 6pm</p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Section */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-6">Menu</h4>
                            <ul className="space-y-3 text-gray-300 font-light">
                                <li><Link href="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
                                <li><Link href="/about" className="hover:text-brand-orange transition-colors">About us</Link></li>
                                <li><Link href="/services" className="hover:text-brand-orange transition-colors">Services</Link></li>
                                <li><Link href="/cases" className="hover:text-brand-orange transition-colors">Cases</Link></li>
                                <li><Link href="/contact" className="hover:text-brand-orange transition-colors">Reach out</Link></li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </footer>
    );
}