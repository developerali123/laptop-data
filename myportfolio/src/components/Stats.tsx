import { useState, useEffect, type JSX } from "react";
import { motion } from "framer-motion";
import { FaUser, FaDesktop, FaTrophy, FaComment } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./ui/card";

interface StatItemProps {
  icon: JSX.Element;
  count: number;
  label: string;
}

const StatItem = ({ icon, count, label }: StatItemProps) => {
  return (
    <Card className="flex flex-col justify-center items-center border border-primary shadow-md bg-muted hover:scale-105 transition-transform duration-300 p-6">
      <CardContent className="flex flex-col justify-center items-center text-center">
        <div className="text-primary text-4xl">{icon}</div>
        <motion.h2
          className="text-3xl font-bold mt-4 text-foreground"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          {count}
        </motion.h2>
        <p className="text-sm mt-2 text-foreground">{label}</p>
      </CardContent>
    </Card>
  );
};

export default function Stats() {
  const [counters, setCounters] = useState({
    clients: 0,
    websites: 0,
    awards: 0,
    support: 0,
  });

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inView) {
      interval = setInterval(() => {
        setCounters((prev) => ({
          clients: prev.clients < 190 ? prev.clients + 1 : 190,
          websites: prev.websites < 374 ? prev.websites + 1 : 374,
          awards: prev.awards < 935 ? prev.awards + 1 : 935,
          support: prev.support < 427 ? prev.support + 1 : 427,
        }));
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="bg-background text-foreground py-12 text-center">
      <motion.h2
        className="text-center mb-8 md:text-3xl text-2xl font-bold underline decoration-dotted text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Stats
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        <StatItem icon={<FaUser />} count={counters.clients} label="Happy Clients" />
        <StatItem icon={<FaDesktop />} count={counters.websites} label="Modern Websites" />
        <StatItem icon={<FaTrophy />} count={counters.awards} label="Winning Awards" />
        <StatItem icon={<FaComment />} count={counters.support} label="Fast Support" />
      </div>
    </section>
  );
}
