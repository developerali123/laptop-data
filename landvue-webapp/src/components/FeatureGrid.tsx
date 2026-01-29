import React from "react";
import { Map, Search, FileCheck, ShoppingBag, Mail, Calendar, Users, Database } from "lucide-react";
import { Card } from "@/components/ui/card";

// Features data wahi rahega...
const features = [
  {
    icon: Map,
    title: "Mapping",
    description: "Interactive property maps with layers",
    accentColor: "text-rose-500",
    hoverBorder: "hover:border-rose-500/50",
    hoverShadow: "hover:shadow-rose-500/20",
  },
  {
    icon: Search,
    title: "Builder Search",
    description: "Find builders and contractors",
    accentColor: "text-sky-500",
    hoverBorder: "hover:border-sky-500/50",
    hoverShadow: "hover:shadow-sky-500/20",
  },
  {
    icon: FileCheck,
    title: "Permitting",
    description: "Track and manage permits",
    accentColor: "text-emerald-500",
    hoverBorder: "hover:border-emerald-500/50",
    hoverShadow: "hover:shadow-emerald-500/20",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    description: "Buy and sell properties",
    accentColor: "text-amber-500",
    hoverBorder: "hover:border-amber-500/50",
    hoverShadow: "hover:shadow-amber-500/20",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Integrated communication",
    accentColor: "text-violet-500",
    hoverBorder: "hover:border-violet-500/50",
    hoverShadow: "hover:shadow-violet-500/20",
  },
  {
    icon: Calendar,
    title: "Calendar",
    description: "Schedule site visits",
    accentColor: "text-cyan-500",
    hoverBorder: "hover:border-cyan-500/50",
    hoverShadow: "hover:shadow-cyan-500/20",
  },
  {
    icon: Users,
    title: "CRM",
    description: "Manage relationships",
    accentColor: "text-fuchsia-500",
    hoverBorder: "hover:border-fuchsia-500/50",
    hoverShadow: "hover:shadow-fuchsia-500/20",
  },
  {
    icon: Database,
    title: "Property Data",
    description: "Comprehensive analytics",
    accentColor: "text-pink-500",
    hoverBorder: "hover:border-pink-500/50",
    hoverShadow: "hover:shadow-pink-500/20",
  }
];

const FeatureGrid = () => {
  return (
    // Updated: bg-black -> bg-background
    <section id="features" className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            An app for just about everything
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All the tools you need to research, evaluate, and transact land deals in one powerful platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              // Updated: bg-zinc-900 -> bg-card, border-zinc-800 -> border-border
              className={`bg-card border border-border shadow-sm aspect-square p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:bg-muted/50 ${feature.hoverBorder} hover:shadow-lg ${feature.hoverShadow}`}
            >
              <div className="space-y-4 flex flex-col items-center">
                {/* Updated: bg-zinc-800/50 -> bg-muted */}
                <div className={`p-3 rounded-xl bg-muted group-hover:bg-muted/80 transition-colors ${feature.accentColor}`}>
                  <feature.icon className="w-8 h-8" />
                </div>

                <h3 className="font-semibold text-lg md:text-xl text-foreground tracking-tight leading-none">
                  {feature.title}
                </h3>

                <p className="text-sm font-medium text-muted-foreground leading-snug px-2">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;