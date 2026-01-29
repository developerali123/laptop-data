import React from 'react';
import { Card } from "@/components/ui/card";
import { Star, TrendingUp, Clock, Shield } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Make Better Decisions",
    description: "Access comprehensive data and analytics to evaluate properties with confidence."
  },
  {
    icon: Clock,
    title: "Save Valuable Time",
    description: "All the information you need in one place. No more jumping between multiple websites."
  },
  {
    icon: Shield,
    title: "Trust the Data",
    description: "We aggregate data from official sources and verify accuracy so you can rely on what you see."
  },
  {
    icon: Star,
    title: "Stay Organized",
    description: "Track all your properties, communications, and deals in one centralized platform."
  }
];

const TestimonialSection = () => {
  return (
    // Updated: bg-black -> bg-background
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">

        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight">
            Your new all-in-one platform
          </h2>
          <p className="text-lg text-muted-foreground">
            See why customers love us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              // Green Card: Keep specific color bg-[#95cba6] as it is a design feature
              // Text color inside card stays black because background is green
              className="p-8 bg-[#95cba6] border-none rounded-3xl h-full flex flex-col items-start justify-between hover:scale-[1.02] transition-transform duration-300 shadow-sm"
            >
              <div className="space-y-4 w-full">
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center text-black mb-6">
                  <benefit.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-black leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-black/80 leading-relaxed text-sm font-medium">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;