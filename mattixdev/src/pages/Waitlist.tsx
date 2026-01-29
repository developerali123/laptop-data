import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Sparkles, Zap, Users, Bell, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" }),
});

const benefits = [
  {
    icon: Gift,
    title: 'Exclusive Early Access',
    description: 'Be the first to experience our AI-powered automation platform before the official launch.',
  },
  {
    icon: Zap,
    title: 'Special Launch Pricing',
    description: 'Lock in discounted pricing for life. Save up to 40% compared to regular rates.',
  },
  {
    icon: Sparkles,
    title: 'Priority Support',
    description: 'Get dedicated onboarding assistance and priority customer support.',
  },
  {
    icon: Bell,
    title: 'Beta Features',
    description: 'Access exclusive beta features and provide feedback to shape the product.',
  },
];

const stats = [
  { number: '15,000+', label: 'People on waitlist' },
  { number: '500+', label: 'Companies interested' },
  { number: '40%', label: 'Discount for early birds' },
];

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const result = emailSchema.safeParse({ email });
    
    if (!result.success) {
      toast({
        title: "Invalid Email",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll notify you when we launch. Check your email for confirmation.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section with Form */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
            >
              <Users className="w-10 h-10 text-primary" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Join the Future of AI Automation
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Be among the first to experience Fusion AI. Join 15,000+ professionals already on the waitlist.
            </p>

            {/* Email Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 rounded-full px-6 bg-card border-border"
                required
              />
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-12 px-8 rounded-full"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground"
            >
              No credit card required. Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card/30 border border-border/50"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Benefits</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Why Join Now?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Early members get exclusive perks and lifetime benefits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card/30 border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - What You'll Get */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">What's Included</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                Everything You Need to Succeed
              </h2>
            </div>

            <div className="space-y-4">
              {[
                'Priority access when we launch',
                'Exclusive 40% discount on all plans',
                'Free 3-month Pro plan trial',
                'Dedicated onboarding session',
                'Early access to new features',
                'Direct line to our founders',
                'Exclusive community access',
                'Lifetime insider status',
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background border border-primary/20"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Don't Miss Out
              </h2>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Join thousands of professionals who are already on the waitlist. Spots are limited.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 rounded-full px-6 bg-card border-border"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-12 px-8 rounded-full"
                >
                  {isSubmitting ? 'Joining...' : 'Join Now'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Waitlist;
