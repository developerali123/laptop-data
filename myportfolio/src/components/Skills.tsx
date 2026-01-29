import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Skill type
interface Skill {
  title: string;
  percent: number;
}

// Skill categories
const skillsData: Record<string, Skill[]> = {
  frontend: [
    { title: "HTML & CSS", percent: 90 },
    { title: "Tailwind CSS", percent: 90 },
    { title: "JavaScript", percent: 85 },
    { title: "React.js", percent: 85 },
    { title: "Next.js", percent: 75 },
  ],
  backend: [
    { title: "Node.js", percent: 80 },
    { title: "Express.js", percent: 75 },
    { title: "RESTful APIs", percent: 80 },
  ],
  database: [
    { title: "MongoDB", percent: 70 },
    { title: "PostgreSQL", percent: 65 },
    { title: "MySQL", percent: 60 },
  ],
  deployment: [
    { title: "AWS", percent: 65 },
    { title: "Docker", percent: 60 },
  ],
  testing: [
    { title: "Jest", percent: 50 },
    { title: "Postman", percent: 75 },
  ],
  authentication: [
    { title: "JWT", percent: 80 },
    { title: "OAuth2", percent: 65 },
  ],
};

// Circular progress component
const CircularProgress = ({ percent }: { percent: number }) => {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      <svg className="transform -rotate-90 w-72 h-72">
        <circle
          cx="145"
          cy="145"
          r={radius}
          stroke="currentColor"
          strokeWidth="20"
          fill="transparent"
          className="text-muted-foreground"
        />
        <motion.circle
          cx="145"
          cy="145"
          r={radius}
          stroke="currentColor"
          strokeWidth="20"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          className="text-primary"
          animate={{
            strokeDashoffset: circumference - (percent / 100) * circumference,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      <span className="absolute text-4xl font-bold text-foreground">
        {percent}%
      </span>
    </div>
  );
};

// Skill Card
const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <Card className="flex flex-col justify-center items-center border border-primary bg-muted hover:scale-105 transition-transform duration-300">
      <CardContent className="flex flex-col items-center p-4">
        <p className="text-lg font-semibold text-foreground mb-2">
          {skill.title}
        </p>
        <CircularProgress percent={skill.percent} />
      </CardContent>
    </Card>
  );
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <section className="bg-background text-foreground py-12 px-4">
      <motion.h2
        className="text-center mb-8 md:text-3xl text-2xl font-bold underline decoration-dotted text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-5xl mx-auto"
      >
        {/* Tabs List */}
        <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(skillsData).map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        {Object.entries(skillsData).map(([category, skills]) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
