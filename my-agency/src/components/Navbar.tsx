import Link from 'next/link';
import Image from "next/image";

export default function Navbar() {

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About us', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Cases', href: '/cases' },
        { name: 'Reach out', href: '/contact' }
    ];

    return (
        // ✅ CHANGE: 'bg-black' (Solid Black) for rich premium feel
        <nav className="fixed top-0 w-full z-50 bg-black border-b border-white/10 transition-all duration-300">

            <div className="container mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">

                {/* 1. Logo Section */}
                <Link href="/" className="relative w-36 h-10 md:w-44 md:h-12 hover:opacity-80 transition-opacity">
                    <Image
                        src="/logo.png"
                        alt="Itterate Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>

                {/* 2. Navigation Links (Desktop) */}
                <ul className="hidden md:flex items-center gap-10">
                    {navLinks.map((item) => (
                        <li key={item.name} className="relative group">
                            <Link
                                href={item.href}
                                // ✅ Typography: White text with Orange Hover
                                className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-300 group-hover:text-brand-orange transition-colors duration-300"
                            >
                                {item.name}
                            </Link>

                            {/* Hover Line Animation */}
                            <span className="absolute -bottom-6 left-0 w-full h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </li>
                    ))}
                </ul>

                {/* 3. Right Actions (CTA Button) */}
                <div className="flex items-center gap-6">

                    <Link href="/contact">
                        {/* ✅ Premium Solid Button */}
                        <button className="group relative px-8 py-3 bg-white text-black rounded-full font-bold text-[11px] uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-brand-orange hover:text-black shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                            <span className="relative z-10 flex items-center gap-2">
                                Contact Me
                            </span>
                        </button>
                    </Link>

                    {/* Mobile Menu Icon */}
                    <button className="md:hidden text-white hover:text-brand-orange transition p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                    </button>
                </div>

            </div>
        </nav>
    );
}