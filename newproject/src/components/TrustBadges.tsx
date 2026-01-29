import { Shield, Award, Lock, CheckCircle } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'SOC 2 Compliant', description: 'Enterprise security' },
  { icon: Award, label: 'ISO 27001', description: 'Certified secure' },
  { icon: Lock, label: 'GDPR Ready', description: 'Privacy focused' },
  { icon: CheckCircle, label: '99.99% SLA', description: 'Guaranteed uptime' },
];

export const TrustBadges = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
            Trusted by industry leaders
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">{badge.label}</div>
                <div className="text-sm text-muted-foreground">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
