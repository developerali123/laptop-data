import React from "react";
import { Card } from "@/components/ui/card";
import { Search, CheckCircle, Store } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Advanced Search",
    description: "Filter properties by size, location, zoning, price, and dozens of other criteria. Save searches and get alerts.",
  },
  {
    icon: CheckCircle,
    title: "Site Qualification",
    description: "Instantly evaluate site suitability. Check zoning compliance, utility access, environmental constraints, and development potential.",
  },
  {
    icon: Store,
    title: "Marketplace",
    description: "No more 10 different platform subscriptions. Everything you need to research, evaluate, and transact land deals.",
  }
];

const FeatureCards = () => {
  return (
    // Updated: bg-black -> bg-background
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col space-y-4">

              {/* Title Text: text-white -> text-foreground */}
              <h3 className="text-2xl font-medium text-foreground text-center pl-2">
                {feature.title}
              </h3>

              {/* Green Card: Stays green */}
              <Card
                className="bg-[#95cba6] border-none rounded-3xl p-8 h-full min-h-[320px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center text-black">
                    <feature.icon className="w-7 h-7" />
                  </div>

                  <p className="text-black/80 leading-relaxed font-medium text-lg">
                    {feature.description}
                  </p>
                </div>
              </Card>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;