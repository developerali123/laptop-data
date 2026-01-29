//@ts-nocheck
import React, { useState, useEffect } from "react";
import { FaComment, FaDesktop, FaTrophy, FaUser } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const StatItem = ({ icon, count, label }) => (
  <div className="md:col-span-3 col-span-6 border-4 border-[#95a5a6] rounded-lg p-8 bg-[#3498db] hover:bg-[#2980b9] mx-4 flex justify-center items-center flex-col">
    {icon}
    <h2 className="text-3xl font-bold mt-4">{count}</h2>
    <p>{label}</p>
  </div>
);

const Stats = () => {
  const [counters, setCounters] = useState({
    clients: 0,
    websites: 0,
    awards: 0,
    support: 0,
  });
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger when 20% of the component is in view
    triggerOnce: true, // Only trigger once
  });

  useEffect(() => {
    let interval;
    if (inView) {
      interval = setInterval(() => {
        setCounters((prevCounters) => ({
          clients: prevCounters.clients < 190 ? prevCounters.clients + 1 : 190,
          websites:
            prevCounters.websites < 374 ? prevCounters.websites + 1 : 374,
          awards: prevCounters.awards < 935 ? prevCounters.awards + 1 : 935,
          support: prevCounters.support < 427 ? prevCounters.support + 1 : 427,
        }));
      }, 10); // Increase the count every 10 milliseconds for a smoother effect
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div className="bg-[#FEFBF6] text-[#151515] py-3 text-center" ref={ref}>
      <h2 className="text-center md:text-3xl text-2xl mb-5 text-[#3498db] font-bold underline decoration-dotted decoration-[#3498db]">
        Stats
      </h2>
      <div className="grid grid-cols-12 gap-6">
        <StatItem
          icon={<FaUser className="text-4xl" />}
          count={counters.clients}
          label="Happy Clients"
        />
        <StatItem
          icon={<FaDesktop className="text-4xl" />}
          count={counters.websites}
          label="Modern Websites"
        />
        <StatItem
          icon={<FaTrophy className="text-4xl" />}
          count={counters.awards}
          label="WINNING AWARDS"
        />
        <StatItem
          icon={<FaComment className="text-4xl" />}
          count={counters.support}
          label="Fast Support"
        />
      </div>
    </div>
  );
};

export default Stats;
