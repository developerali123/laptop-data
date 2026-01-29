import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const allModules = [
  { id: 1, name: "Mapping & Visualization", price: 29, category: "core", defaultSelected: true },
  { id: 2, name: "Property Search", price: 19, category: "core", defaultSelected: true },
  { id: 3, name: "Site Qualification", price: 39, category: "core", defaultSelected: true },
  { id: 4, name: "Marketplace Access", price: 19, category: "addon", defaultSelected: false },
  { id: 5, name: "CRM & Communication", price: 29, category: "addon", defaultSelected: false },
  { id: 6, name: "Advanced Analytics", price: 49, category: "addon", defaultSelected: false },
];

const PricingSection = () => {
  const [selectedModules, setSelectedModules] = useState(
    allModules.filter(m => m.defaultSelected).map(m => m.id)
  );

  const toggleModule = (id) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const monthlyTotal = useMemo(() => {
    return allModules.filter((module) => selectedModules.includes(module.id)).reduce((sum, module) => sum + module.price, 0);
  }, [selectedModules]);

  const renderModuleItem = (module) => {
    const isSelected = selectedModules.includes(module.id);

    return (
      <div
        key={module.id}
        onClick={() => toggleModule(module.id)}
        // Updated colors for light/dark modes
        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 cursor-pointer select-none
          ${isSelected
            ? "bg-emerald-500/10 border-emerald-500 shadow-sm"
            : "bg-background border-border hover:border-foreground/20"
          }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
            ${isSelected ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground bg-transparent"}
          `}>
            {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
          </div>
          <span className={`font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
            {module.name}
          </span>
        </div>
        <span className={`font-semibold ${isSelected ? "text-emerald-500" : "text-muted-foreground"}`}>
          ${module.price}/mo
        </span>
      </div>
    );
  };

  return (
    // Updated background
    <section id="pricing" className="py-24 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">
            Build your own subscription
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose only the features you need. Add or remove modules anytime. No hidden fees.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Card background updated */}
          <Card className="p-8 md:p-12 bg-card border border-border shadow-2xl rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Choose Your Modules</h3>
                <div className="space-y-4">{allModules.slice(0, 3).map(renderModuleItem)}</div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Additional Features</h3>
                <div className="space-y-4">{allModules.slice(3).map(renderModuleItem)}</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-muted/50 rounded-2xl border border-border">
              <div>
                <div className="text-sm text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                  Your monthly total
                </div>
                <div className="text-5xl font-bold text-emerald-500 flex items-baseline gap-1">
                  ${monthlyTotal}
                  <span className="text-lg text-muted-foreground font-normal">/month</span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 text-white font-bold px-10 py-5 rounded-full uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 w-full md:w-auto">
                Start Free Trial
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;