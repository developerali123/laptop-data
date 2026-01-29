import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 👇 1. Yahan Navbar aur Footer import karna zaroori hai
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '900'],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Agency Portfolio",
  description: "Digital Evolution Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-brand-black text-white antialiased`}>

        {/* 👇 2. Navbar ko yahan sab se upar lagayen */}
        <Navbar />

        {/* Beech mein pages ka content */}
        <main>{children}</main>
        <ScrollToTop />
        {/* 👇 3. Footer ko sab se neeche lagayen */}
        <Footer />

      </body>
    </html>
  );
}