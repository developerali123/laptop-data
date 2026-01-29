import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const EmailSubscription = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }
    alert(`Subscribed successfully with ${email}`);
    setEmail("");
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#FEFBF6] text-[#151515] dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-[#3498db] shadow-xl p-10 max-w-lg w-full"
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Title */}
          <h1 className="font-bold text-3xl text-[#3498db] text-center">
            Email Subscription
          </h1>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Stay updated with my latest projects, blogs, and full stack tips!
          </p>

          {/* Input */}
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 px-4 rounded-lg border-gray-300 focus:border-[#3498db] focus:ring-2 focus:ring-[#3498db] transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Button */}
          <Button
            className="w-full h-12 bg-[#3498db] hover:bg-[#2980b9] text-white rounded-lg text-lg font-semibold transition-all"
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default EmailSubscription;
