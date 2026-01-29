import { Headphones, Heart, TrendingUp, BookOpen, DollarSign } from 'lucide-react';

const useCases = [
  { icon: Headphones, label: 'Customer Support' },
  { icon: Heart, label: 'Healthcare' },
  { icon: TrendingUp, label: 'Marketing' },
  { icon: BookOpen, label: 'Education' },
  { icon: DollarSign, label: 'Finance' },
];

export const UseCases = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-wrap justify-center gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.label}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm min-w-[140px] hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-3">
                <useCase.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-center">{useCase.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};