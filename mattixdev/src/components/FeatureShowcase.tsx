import { Sparkles, TrendingUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import featureAnalytics from '@/assets/feature-analytics.png';
import featureWorkflow from '@/assets/feature-workflow.png';

export const FeatureShowcase = () => {
  return (
    <section className="py-32 relative">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Feature 1 - Text Left, Image Right */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs uppercase tracking-wider font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              AI Powered
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Intelligent Data
              <br />
              <span className="gradient-text">Analysis at Scale</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Let AI handle complex data analysis, generate insights, and create 
              comprehensive reports automatically. Transform raw data into actionable 
              intelligence in seconds.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Real-time analytics with AI predictions',
                'Predictive insights from historical data',
                'Custom dashboards tailored to your needs'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div>
              <Button size="lg" variant="outline" className="group">
                Learn More
                <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Floating decorative elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl blur-xl opacity-50" />
              <img 
                src={featureAnalytics} 
                alt="Analytics Dashboard" 
                className="relative rounded-2xl border border-white/10 shadow-2xl hover:shadow-[0_0_80px_rgba(59,130,246,0.3)] transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Feature 2 - Image Left, Text Right */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            {/* Floating decorative elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50" />
              <img 
                src={featureWorkflow} 
                alt="Workflow Automation" 
                className="relative rounded-2xl border border-white/10 shadow-2xl hover:shadow-[0_0_80px_rgba(251,146,60,0.3)] transition-all duration-500"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs uppercase tracking-wider font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Automation
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Build Complex
              <br />
              <span className="gradient-text">Workflows Visually</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Design sophisticated automation workflows with our intuitive visual builder. 
              Connect multiple services, add conditional logic, and deploy in minutes 
              without writing code.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Drag & drop interface for easy building',
                'Pre-built templates for common workflows',
                'Advanced triggers with conditional logic'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div>
              <Button size="lg" variant="outline" className="group">
                Explore Features
                <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};