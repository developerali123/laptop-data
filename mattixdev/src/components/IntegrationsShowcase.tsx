import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { 
  MessageSquare, Mail, Calendar, Database, 
  Cloud, FileText, Zap, Bot,
  Github, Trello, Chrome, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useEffect, useState } from 'react';

const integrations = [
  { icon: Users, name: 'Slack', category: 'Communication' },
  { icon: Github, name: 'GitHub', category: 'Development' },
  { icon: Mail, name: 'Gmail', category: 'Email' },
  { icon: Calendar, name: 'Calendar', category: 'Scheduling' },
  { icon: Database, name: 'Airtable', category: 'Database' },
  { icon: Cloud, name: 'Dropbox', category: 'Storage' },
  { icon: Trello, name: 'Trello', category: 'Project' },
  { icon: MessageSquare, name: 'Discord', category: 'Communication' },
  { icon: FileText, name: 'Notion', category: 'Docs' },
  { icon: Chrome, name: 'Chrome', category: 'Browser' },
  { icon: Zap, name: 'Zapier', category: 'Automation' },
  { icon: Bot, name: 'OpenAI', category: 'AI' },
];

// Counter component
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
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref} className="gradient-text">
      {Math.floor(displayValue).toLocaleString()}{suffix}
    </span>
  );
};

export const IntegrationsShowcase = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
              Seamless Integrations
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Connect with <br />
              <AnimatedNumber value={500} suffix="+" />
              <span className="ml-2 text-lg text-muted-foreground font-normal">apps</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Fusion AI integrates with all your favorite tools. From CRMs to communication 
              platforms, databases to AI services — connect everything in one place.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {['No-code setup', 'Real-time sync', 'Custom webhooks', 'API access'].map((feature, index) => (
                <motion.span 
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                >
                  {feature}
                </motion.span>
              ))}
            </div>
            
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-background font-semibold hover-glow"
            >
              Explore Integrations
            </Button>
          </motion.div>
          
          {/* Right - Integration grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-4 gap-4"
          >
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { delay: index * 0.05, duration: 0.4 } }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group relative p-4 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card/80 transition-all duration-300 flex flex-col items-center justify-center aspect-square cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <integration.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-center">{integration.name}</span>
                
                {/* Hover tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-card border border-border rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {integration.category}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
