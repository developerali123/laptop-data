import React from 'react';
import { Button } from "@/components/ui/button";
import { Apple, Play } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  return (
    // Updated: bg-black hata kar bg-background lagaya hai
    <section id="hero" className="bg-background pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">

          {/* LEFT SIDE: Images */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 opacity-40 scale-90 -translate-x-8 translate-y-4 md:-translate-x-12 md:translate-y-6 transform rotate-[-6deg] rounded-2xl overflow-hidden border border-border">
              <img src={heroDashboard} alt="Background Dashboard" className="w-full h-auto object-cover" />
            </div>

            {/* Main Card: Border color dynamic kar diya */}
            <div className="absolute top-0 left-0 z-20 w-full shadow-2xl rounded-2xl overflow-hidden border border-border bg-card">
              <img src={heroDashboard} alt="LandVue Dashboard" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* RIGHT SIDE: Text */}
          <div className="space-y-8 text-center lg:text-left z-30">

            {/* Updated: text-white -> text-foreground */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
              The industries most advanced <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                investment platform
              </span>
            </h1>

            {/* Updated: text-zinc-400 -> text-muted-foreground */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the power of LandVue AI, combining advanced intelligence and deep learning for seamless problem-solving, all in one app.
            </p>

            {/* Buttons: Colors ab theme ke hisab se change honge */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">

              <Button
                className="h-14 px-6 bg-foreground text-background hover:bg-foreground/90 border border-input rounded-xl flex items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <Apple className="w-8 h-8 fill-current" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] uppercase font-medium opacity-70 leading-none mb-1">Download on the</span>
                  <span className="text-lg font-bold leading-none">App Store</span>
                </div>
              </Button>

              <Button
                className="h-14 px-6 bg-foreground text-background hover:bg-foreground/90 border border-input rounded-xl flex items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <Play className="w-7 h-7 fill-current ml-1" />
                <div className="flex flex-col items-start text-left ml-1">
                  <span className="text-[10px] uppercase font-medium opacity-70 leading-none mb-1">Get it on</span>
                  <span className="text-lg font-bold leading-none">Google Play</span>
                </div>
              </Button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;