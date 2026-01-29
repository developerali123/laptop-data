import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
];

export const FAQ = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            Got any Questions?
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-2xl px-6 bg-card/30 backdrop-blur-sm"
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
        </div>
      </div>
    </section>
  );
};