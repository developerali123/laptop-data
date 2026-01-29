"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; // Image import
import { Facebook, Instagram, Twitter, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 font-sans mt-auto">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-4">

                        {/* ✅ LOGO ADDED HERE */}
                        <Link href="/" className="inline-block">
                            <Image
                                src="/images/meci_mobile_mart_logo.svg"
                                alt="Meci Mart"
                                width={180}
                                height={60}
                                // Note: 'brightness-0 invert' logo ko WHITE bana dega (dark mode ke liye)
                                // Agar logo colorful rakhna hai to 'brightness-0 invert' hata dein.
                                className="h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </Link>

                        <p className="text-sm leading-relaxed text-slate-400">
                            Your premium destination for electronics, gadgets, and lifestyle products.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="hover:text-white transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-[#D22027] transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[#D22027] transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-[#D22027] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#D22027] transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Contact</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#D22027] mt-0.5" />
                                <span>Stockholm, Sweden</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[#D22027]" />
                                <span>support@mecimart.se</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Newsletter</h3>
                        <p className="text-xs text-slate-400 mb-4">Subscribe to get special offers and deals.</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D22027] text-sm"
                            />
                            <button className="bg-[#D22027] hover:bg-[#b01b20] text-white font-bold py-3 rounded-lg transition-colors text-sm uppercase">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar with Payment Icons */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© 2025 Meci Mart Store. All rights reserved.</p>

                    <div className="flex items-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                            alt="Visa"
                            width={40}
                            height={25}
                            className="h-6 w-auto"
                        />
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                            alt="Mastercard"
                            width={40}
                            height={25}
                            className="h-6 w-auto"
                        />
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            alt="PayPal"
                            width={60}
                            height={25}
                            className="h-5 w-auto"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}