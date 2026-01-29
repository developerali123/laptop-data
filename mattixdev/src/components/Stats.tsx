import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 10_000_000, label: 'Tasks Automated', description: 'Every single month', suffix: '+' },
  { value: 99.9, label: 'Uptime', description: 'Enterprise reliability', suffix: '%' },
  { value: 500, label: 'Integrations', description: 'Connect everything', suffix: '+' },
  { value: 50_000, label: 'Active Users', description: 'Growing community', suffix: '+' },
];

const AnimatedNumber = ({ value, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration, stiffness: 100, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    spring.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [spring]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref}>
      {value % 1 !== 0
        ? displayValue.toFixed(1) + suffix
        : Math.floor(displayValue).toLocaleString() + suffix}
    </span>
  );
};

export const Stats = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
