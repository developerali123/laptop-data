import React, { useState } from "react";

const Skills = () => {
  const [skills] = useState([
    { title: "HTML & CSS", percent: 90 },
    { title: "Bootstrap", percent: 90 },
    { title: "Tailwind CSS", percent: 90 },
    { title: "JavaScript", percent: 80 },
    { title: "React.js", percent: 85 },
    { title: "Node.js", percent: 75 },
    { title: "Next.js", percent: 75 },
    { title: "Express.js", percent: 70 },
    { title: "MongoDB", percent: 65 },
    { title: "MySQL", percent: 60 },
    { title: "RESTful APIs", percent: 75 },
    { title: "Git", percent: 80 },
    { title: "AWS", percent: 60 },
    { title: "Docker", percent: 55 },
  ]);
  const [currentSkill, setCurrentSkill] = useState({
    title: "HTML & CSS",
    percent: 90,
  });

  const circumference = ((2 * 22) / 7) * 120;

  const handleClick = (skill:any) => {
    setCurrentSkill(skill);
  };
  return (
    <main className="grid w-full p-4 text-[#151515] bg-[#FEFBF6] place-content-center">
      <h2 className="text-center md:text-3xl text-2xl mb-5 underline decoration-dotted decoration-[#3498db] text-[#3498db] font-bold">
        Skills
      </h2>
      <section className="p-4 space-y-6 bg-[#95a5a6] rounded-xl md:grid md:grid-cols-2 md:gap-4 sm:space-y-0">
        <div className="grid grid-cols-12 gap-6">
          {skills.map((skill, index) => (
            <button
              key={index}
              onClick={() => handleClick(skill)}
              className={`px-4 py-2 md:col-span-4 col-span-6 md:text-xl text-sm text-[#151515] transition bg-[#3498db] rounded-md h-14 md:w-40 w-32 hover:bg-[#2980b9] ${
                currentSkill.title === skill.title &&
                "font-bold ring-2 ring-[#151515]"
              }`}
            >
              {skill.title}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <svg className="transform -rotate-90 w-72 h-72">
            <circle
              cx="145"
              cy="145"
              r="120"
              stroke="currentColor"
              strokeWidth="30"
              fill="transparent"
              className="text-[#151515]"
            />
            <circle
              cx="145"
              cy="145"
              r="120"
              stroke="currentColor"
              strokeWidth="30"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (currentSkill.percent / 100) * circumference
              }
              className="text-[#3498db]"
            />
          </svg>
          <span className="absolute text-5xl">{`${currentSkill.percent}%`}</span>
        </div>
      </section>
    </main>
  );
};

export default Skills;
