import { motion } from "framer-motion";
import Lottie from "lottie-web";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const ListItem = ({ date, title, institution }: { date: string; title: string; institution: string }) => (
  <li className="border-l-2 border-primary pl-6 relative mb-6">
    <span className="absolute -left-3 top-0 bg-primary w-6 h-6 rounded-full" />
    <div className="bg-muted p-4 rounded-lg shadow-sm">
      <p className="text-primary text-sm font-medium">{date}</p>
      <p className="text-primary text-sm font-medium">{title}</p>
      <p className="text-foreground">{institution}</p>
    </div>
  </li>
);

const ExperienceItem = ({ dateRange, position, company }: { dateRange: string; position: string; company: string }) => (
  <li className="border-l-2 border-primary pl-6 relative mb-6">
    <span className="absolute -left-3 top-0 bg-primary w-6 h-6 rounded-full" />
    <div className="bg-muted p-4 rounded-lg shadow-sm">
      <p className="text-primary text-sm font-medium">{dateRange}</p>
      <p className="text-foreground">{position} at {company}</p>
    </div>
  </li>
);

export function About() {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "Animations/Animation - 1712834381884.json", // Put your JSON file in /public/animations
    });

    return () => anim.destroy();
  }, []);

  const animationContainer1 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: animationContainer1.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "Animations/Animation - 1712922589360.json", // Put JSON in public/animations
    });
    return () => anim.destroy();
  }, []);

  const animationContainer2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: animationContainer2.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "Animations/Animation - 1712923206507.json", // JSON in public/animations
    });
    return () => anim.destroy();
  }, []);
  return (
    <section className="bg-background text-foreground py-12 px-4">
      <motion.h2
        className="text-center mb-8 md:text-3xl text-2xl text-primary font-bold underline decoration-dotted"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>
      <motion.div
      className="grid grid-cols-12 gap-6 px-4 py-6"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="col-span-12 md:col-span-6 space-y-3">
        <h3 className="text-lg">
          I am <span className="text-primary font-bold">Muhammad Ali Mirza</span>
        </h3>
        <p>
          Full-stack Software Developer and JavaScript Enthusiast who loves building
          things in JavaScript. Visit my channel for awesome stuff.
        </p>
        <p>
          <span className="text-primary">Date of Birth: </span>13 February 2012
        </p>
        <p>
          <span className="text-primary">Languages: </span>English - Urdu
        </p>
        <p>
          <span className="text-primary">Nationality: </span>Pakistan
        </p>
        <p>
          <span className="text-primary">Interests: </span>Music - Reading - Travel
        </p>
        <Button
          asChild
          className="mt-4 border border-primary text-primary hover:bg-primary hover:text-background"
        >
          <a href="/Muhammad Ali Mirza_DLG.pdf" download>
            Download CV
          </a>
        </Button>
      </div>
      <div className="col-span-12 md:col-span-6 flex justify-center">
        <div ref={animationContainer} className="w-full max-w-md h-[300px]" />
      </div>
    </motion.div>
    <motion.div
          className="py-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center mb-8 md:text-3xl text-2xl text-primary font-bold underline decoration-dotted">
            Education
          </h2>
          <div className="grid grid-cols-12 gap-6 px-4">
            <div className="col-span-12 md:col-span-6 flex justify-center">
              <div ref={animationContainer1} className="w-full max-w-md h-[400px]" />
            </div>
            <div className="col-span-12 md:col-span-6">
              <ol>
                <ListItem date="2015-2017" title="Matric" institution="Army Public School Mangla Cantt" />
                <ListItem date="2017-2019" title="Intermediate" institution="FG Inter College Mangla Cantt" />
                <ListItem date="2020-Present" title="Bachelor of Computer Science" institution="PMAS Arid Agriculture University Rawalpindi" />
              </ol>
            </div>
          </div>
        </motion.div>
        <motion.div
              className="py-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-center mb-8 md:text-3xl text-2xl text-primary font-bold underline decoration-dotted">
                Experience
              </h2>
              <div className="grid grid-cols-12 gap-6 px-4">
                <div className="col-span-12 md:col-span-6 order-2 md:order-1">
                  <ol>
                    <ExperienceItem dateRange="Jan 2023 - Jun 2023" position="MERN Stack Developer" company="Secure Startup" />
                    <ExperienceItem dateRange="Oct 2022 - Dec 2022" position="Web Developer" company="LetsGrowMore" />
                    <ExperienceItem dateRange="Jul 2022 - Sep 2022" position="Web Developer" company="Oasis Infobytes" />
                    <ExperienceItem dateRange="Oct 2023 - Jan 2024" position="MERN Stack Developer" company="Crown Intl Technology" />
                    <ExperienceItem dateRange="Feb 2024 - Present" position="MERN Stack Developer" company="TMRC Consultant" />
                  </ol>
                </div>
                <div className="col-span-12 md:col-span-6 flex justify-center order-1 md:order-2">
                  <div ref={animationContainer2} className="w-full max-w-md h-[400px]" />
                </div>
              </div>
            </motion.div>
    </section>
  );
}
