import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Pricing } from '@/components/Pricing';
import { LogoTicker } from '@/components/LogoTicker';
import { Testimonials } from '@/components/Testimonials';
import { CTA } from '@/components/CTA';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, HeadphonesIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'What is Fusion AI and how does it work?',
    answer: 'Fusion AI is an advanced automation platform that uses artificial intelligence to streamline your workflow. It connects with your favorite apps and automates repetitive tasks, saving you time and reducing errors.',
  },
  {
    question: 'Which apps can I integrate?',
    answer: 'Fusion AI supports 50+ integrations, including Slack, HubSpot, Zendesk, Salesforce, Google Workspace, WhatsApp, Zapier, and more.',
  },
  {
    question: 'How does Fusion AI automate tasks?',
    answer: 'Our AI learns from your workflows and automatically handles routine tasks like data entry, follow-ups, scheduling, and more. You can customize automation rules to fit your specific needs.',
  },
  {
    question: 'Is my data secure with Fusion AI?',
    answer: 'Yes, we take security seriously. All data is encrypted in transit and at rest. We are SOC 2 compliant and follow industry best practices for data protection.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We offer 24/7 customer support via email and chat. Pro and Enterprise plans also include priority support and dedicated account managers.',
  },
];

const PricingPage = () => {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Pricing</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Choose Your Plan
            </h1>
            <p className="text-base text-gray-400 leading-relaxed">
              Start free, scale as you grow. No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Component */}
      <Pricing />

      {/* Logo Ticker */}
      <LogoTicker />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - FAQ Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">FAQ</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Frequently asked questions
              </h2>
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                Got any Questions?<br />
                Let us know! Reach out and our team will get right back to you.
              </p>
              <Button variant="outline" className="rounded-full">
                Contact us
              </Button>
            </motion.div>

            {/* Right Side - Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border/50 rounded-2xl px-6 bg-card/30"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="text-base font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTA />

      <Footer />
    </div>
  );
};

export default PricingPage;
