const companies = [
  'Acme Corp', 'GlobalTech', 'InnovateCo', 'FutureLabs', 
  'TechVision', 'DataFlow', 'CloudBase', 'AI Systems'
];

export const LogoTicker = () => {
  return (
    <section className="py-20 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-12">
          Trusted by 150,000+ users worldwide
        </p>

        <div className="relative overflow-hidden">
          {/* Gradient masks on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex gap-16 animate-scroll">
            {[...companies, ...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-2xl font-bold text-muted-foreground/30 whitespace-nowrap"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};