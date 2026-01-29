import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 29, yearly: 290 },
    description: 'Perfect for individuals and small teams',
    features: [
      '1,000 tasks per month',
      '5 active workflows',
      'Basic integrations',
      'Email support',
      '30-day history',
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 99, yearly: 990 },
    description: 'For growing teams and businesses',
    features: [
      '10,000 tasks per month',
      'Unlimited workflows',
      'Advanced integrations',
      'Priority support',
      'Unlimited history',
      'Custom AI models',
      'Team collaboration',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 299, yearly: 2990 },
    description: 'For large organizations',
    features: [
      'Unlimited tasks',
      'Unlimited workflows',
      'All integrations',
      'Dedicated support',
      'Custom SLAs',
      'Advanced security',
      'On-premise deployment',
    ],
  },
];

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 relative" id="pricing">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base text-gray-400 mb-8 leading-relaxed">
            Choose the perfect plan for your needs
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1 rounded-full bg-secondary">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly ? 'bg-primary text-background' : 'text-muted-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isYearly ? 'bg-primary text-background' : 'text-muted-foreground'
              }`}
            >
              Yearly <span className="text-xs">(Save 20%)</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? 'border-2 border-primary bg-card'
                  : 'border border-white/10 bg-card/50'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-background text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className="text-sm text-gray-400">
                  /{isYearly ? 'year' : 'month'}
                </span>
              </div>

              <Button
                className={`w-full mb-6 ${
                  plan.highlighted
                    ? 'bg-primary hover:bg-primary/90 text-background'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Get Started
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
