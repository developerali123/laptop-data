import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";

export const testimonials = [
  {
    title: "Amazing Work!",
    description:
      "Working with Muhammad was seamless. He built our web platform with clean, scalable code and delivered ahead of schedule.",
    author: "John Doe – CEO, TechCorp",
  },
  {
    title: "Highly Recommended",
    description:
      "The backend APIs were lightning-fast and perfectly documented. Our app performance improved drastically!",
    author: "Sarah Khan – CTO, FinStart",
  },
  {
    title: "Professional & Skilled",
    description:
      "Great experience! From frontend to backend, every aspect of the project was handled with expertise.",
    author: "Ahmed Ali – Product Manager",
  },
];


interface TestimonialProps {
  title: string;
  description: string;
  author: string;
}

const TestimonialCard = ({ title, description, author }: TestimonialProps) => {
  return (
    <blockquote className="bg-[#95a5a6] dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
      <div className="flex justify-center mb-4 space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-[#3498db]" size={18} />
        ))}
      </div>

      <h3 className="text-2xl font-bold text-[#3498db]">{title}</h3>
      <p className="mt-4 text-lg leading-relaxed">{description}</p>

      <footer className="mt-6 text-base font-medium">&mdash; {author}</footer>
    </blockquote>
  );
};

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#FEFBF6] dark:bg-gray-900 text-[#151515] dark:text-white py-12">
      <h2 className="text-center text-3xl md:text-4xl mb-6 underline decoration-dotted decoration-[#3498db] text-[#3498db] font-bold">
        Testimonials
      </h2>

      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard {...testimonials[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={prevSlide}
            className="rounded-full border border-[#3498db] text-[#3498db] hover:bg-[#3498db] hover:text-white"
          >
            &#8592;
          </Button>
          <Button
            variant="outline"
            onClick={nextSlide}
            className="rounded-full border border-[#3498db] text-[#3498db] hover:bg-[#3498db] hover:text-white"
          >
            &#8594;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
