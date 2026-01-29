import { Zap, Link2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '1.',
    title: 'Select a trigger',
    description: 'Choose an event or schedule that kicks off your workflow.',
    icon: Zap,
  },
  {
    number: '2.',
    title: 'Connect your apps',
    description: 'Sync Fusion AI with your tools—CRM, email, Slack, and more.',
    icon: Link2,
  },
  {
    number: '3.',
    title: 'Let AI do the work',
    description: 'Lets Fusion AI execute tasks automatically.',
    icon: CheckCircle,
  },
];

export const HowItWorks = () => {
  // Framer Motion variants for the container (stagger children)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variants for each step card
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
            AI-Driven Features
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Automate workflows in
            <br />
            three simple steps
          </h2>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="group relative p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
            >
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-6"
                >
                  <step.icon className="w-8 h-8 text-primary" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                  className="text-xl font-bold mb-3"
                >
                  {step.number} {step.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.15 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
