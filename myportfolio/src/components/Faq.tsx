import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) and also work extensively with NestJS, Prisma, PostgreSQL, and microservices architecture. I build both frontend and backend systems for scalable web apps.",
  },
  {
    question: "Can you develop and deploy full-scale applications?",
    answer:
      "Yes! From UI/UX design to API development, database architecture, and cloud deployment (AWS, Render, or Vercel), I handle the full lifecycle of application development.",
  },
  {
    question: "Do you offer API and backend integration?",
    answer:
      "Absolutely. I design and build REST and GraphQL APIs, integrate third-party services, and develop scalable microservices with event-driven architecture using RabbitMQ or Kafka.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes. I provide continuous maintenance, bug fixes, and performance optimization to ensure your application runs smoothly post-launch.",
  },
  {
    question: "Can you build real-time features?",
    answer:
      "Yes! I implement real-time features using WebSockets, Socket.IO, or Firebase for chat systems, live notifications, and dashboards.",
  },
];

const FaqComp = () => {
  return (
    <section className="bg-[#FEFBF6] dark:bg-gray-900 text-[#151515] dark:text-gray-100 py-16">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4"
      >
        <h2 className="text-4xl font-bold underline decoration-dotted decoration-[#3498db] text-[#3498db]">
          FAQ
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Frequently Asked Questions about my Full Stack Development Services
        </p>
      </motion.div>

      {/* Accordion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-10 px-6"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-gray-300 dark:border-gray-700"
            >
              <AccordionTrigger className="text-lg font-medium hover:text-[#3498db]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default FaqComp;