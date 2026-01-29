import { motion } from 'framer-motion';

const companies = [
  'Microsoft', 'Google', 'Amazon', 'Meta', 'Apple', 
  'Netflix', 'Spotify', 'Uber', 'Airbnb', 'Stripe'
];

export const CompanyLogos = () => {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/30">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-center text-sm uppercase tracking-widest text-muted-foreground font-medium mb-10">
          Powering workflows at world-class companies
        </p>
        
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <motion.div 
            className="flex gap-16 items-center"
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...companies, ...companies].map((company, index) => (
              <div 
                key={`${company}-${index}`}
                className="flex-shrink-0 text-2xl font-bold text-muted-foreground/50 hover:text-foreground transition-colors duration-300 cursor-pointer"
              >
                {company}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
