import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  details: string[];
}

const PricingCard = ({ title, description, price, details }: PricingCardProps) => {
  return (
    <div className="flex flex-col p-8 bg-[#95a5a6] dark:bg-gray-800 rounded-xl shadow-md border border-[#3498db] hover:shadow-lg hover:scale-105 transition-transform duration-300">
      <h3 className="text-2xl font-bold text-[#3498db] mb-2 text-center">{title}</h3>
      <p className="text-center text-base mb-6">{description}</p>

      <div className="flex justify-center items-baseline mb-6">
        <span className="text-4xl font-extrabold text-[#3498db]">${price}</span>
        <span className="ml-2 text-gray-700 dark:text-gray-300">/project</span>
      </div>

      <ul className="mb-8 space-y-3 text-left">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-[#3498db]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <Button
        className="bg-[#3498db] hover:bg-[#2980b9] text-black font-medium py-2"
        onClick={() => alert(`Interested in ${title} plan`)}
      >
        Get Started
      </Button>
    </div>
  );
};

const plans = [
  {
    title: "Starter",
    description: "Ideal for personal projects or small-scale websites.",
    price: 299,
    details: [
      "1 Static Website or Landing Page",
      "Basic SEO optimization",
      "Responsive design",
      "3 Revisions included",
      "Delivery: 1 week",
    ],
  },
  {
    title: "Growth",
    description: "Perfect for startups and growing businesses.",
    price: 799,
    details: [
      "Custom Full-Stack Web App",
      "Frontend (React/Next.js)",
      "Backend (Node.js, Express)",
      "Database (MongoDB/PostgreSQL)",
      "API Integration",
      "5 Revisions included",
      "Delivery: 2–3 weeks",
    ],
  },
  {
    title: "Enterprise",
    description: "For large-scale, production-ready systems.",
    price: 1499,
    details: [
      "Complex Full-Stack Application",
      "Authentication & Role-based Access",
      "CI/CD Setup & Deployment",
      "Cloud Hosting (AWS/DigitalOcean)",
      "Performance Optimization",
      "Priority Support",
      "Delivery: 4–6 weeks",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="py-16 bg-[#FEFBF6] dark:bg-gray-900 text-[#151515] dark:text-white">
      <h2 className="text-center text-3xl md:text-4xl mb-10 underline decoration-dotted decoration-[#3498db] text-[#3498db] font-bold">
        Pricing Plans
      </h2>

      <div className="px-4 mx-auto max-w-screen-xl grid gap-8 lg:grid-cols-3">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
          >
            <PricingCard {...plan} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
