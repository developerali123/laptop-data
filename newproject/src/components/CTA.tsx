import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(217,91%,20%),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(25,95%,15%),transparent_60%)]" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-3xl mx-auto text-center rounded-3xl border border-white/10 bg-card/30 backdrop-blur-xl p-12 hover-lift relative overflow-hidden group">
          {/* Floating particles */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full" />
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-accent rounded-full" />

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Ready to Transform
            <br />
            <span className="gradient-text">Your Workflow?</span>
          </h2>
          
          <p className="text-base text-gray-400 mb-8 leading-relaxed">
            Join thousands of teams already automating with AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-background font-semibold text-lg px-8 group hover-glow"
            >
              Start Free Trial
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 hover:bg-white/5 text-lg px-8 hover:border-primary/50 transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 14-day free trial
          </p>

          {/* Shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};