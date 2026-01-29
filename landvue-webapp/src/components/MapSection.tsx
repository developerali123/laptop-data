import React from "react";
import { ArrowRight, Check } from "lucide-react";
import landAerial from "@/assets/land-aerial.jpg";

const MapSection = () => {
  return (
    // Updated: bg-black -> bg-background
    <section className="py-24 bg-background overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-2 items-center">

          {/* Left Side: Tablet Mockup */}
          <div className="relative order-1">
            {/* Tablet Frame: border-zinc-800 -> border-foreground/10 or border-muted */}
            <div className="relative rounded-[2.5rem] border-[12px] border-muted bg-card shadow-2xl overflow-hidden aspect-[4/3]">

              <div className="absolute inset-0 bg-muted">
                <img
                  src={landAerial}
                  alt="Interactive Map Interface"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Button */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="bg-background text-foreground px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2.5 hover:scale-105 transition-transform cursor-pointer border border-border">
                  <div className="bg-emerald-500 rounded-[4px] w-5 h-5 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-semibold tracking-tight">Search as map moves</span>
                </div>
              </div>

              {/* Tablet Side Buttons */}
              <div className="absolute top-20 -left-[14px] w-[3px] h-10 bg-muted-foreground/30 rounded-l-lg"></div>
              <div className="absolute top-36 -left-[14px] w-[3px] h-10 bg-muted-foreground/30 rounded-l-lg"></div>

            </div>
          </div>

          {/* Right Side: Content */}
          <div className="space-y-8 order-2">
            <h2 className="text-3xl md:text-5xl font-medium text-foreground leading-tight tracking-tight">
              Unlimited property data at your fingertips
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Advanced routing engines, accurate traffic-aware travel times, and intuitive turn-by-turn directions for mobile and automotive.
            </p>

            <button className="group flex items-center gap-2 px-8 py-3 rounded-full border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
              <span className="font-medium">Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MapSection;