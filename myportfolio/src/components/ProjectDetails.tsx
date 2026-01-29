import React, { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const projectData = [
  {
    id: 1,
    name: "Ali Book Franchise",
    description:
      "A franchise management system for books with full CRUD operations, reporting, and analytics.",
    skills: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
    screenshots: ["/images/14.PNG", "/images/14-1.PNG", "/images/14-2.PNG"],
    demoLink: "https://demo-link.com",
    sourceCodeLink: "https://github.com/ali/book-franchise",
  },
  {
    id: 2,
    name: "Travel Agency Website",
    description:
      "Dynamic travel booking website with a responsive design and integrated payment system.",
    skills: ["Next.js", "Stripe API", "TailwindCSS"],
    screenshots: ["/images/15.PNG", "/images/15-1.PNG"],
    demoLink: "https://demo-link.com",
    sourceCodeLink: "https://github.com/ali/travel-agency",
  },
  // More...
];

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectData.find((p) => p.id === Number(id));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl">Project not found</p>
        <Button className="mt-4" onClick={() => navigate("/projects")}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <section className="bg-background text-foreground py-12 px-6 max-w-5xl mx-auto">
      <motion.h2
        className="text-center text-3xl mb-8 font-bold text-primary underline decoration-dotted"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {project.name}
      </motion.h2>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {project.screenshots.map((src, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] p-4 flex justify-center"
            >
              <Card className="bg-muted shadow-lg border border-primary">
                <CardContent className="flex justify-center items-center relative h-[400px]">
                  <img
                    src={src}
                    alt={`Screenshot ${index + 1}`}
                    className="object-contain max-h-full max-w-full rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Project Description */}
      <div className="mt-8 space-y-4">
        <p className="text-lg">{project.description}</p>

        <div>
          <h4 className="text-lg font-bold text-primary">Skills Used:</h4>
          <ul className="flex flex-wrap gap-2 mt-2">
            {project.skills.map((skill, i) => (
              <li
                key={i}
                className="bg-primary/20 text-primary px-3 py-1 rounded-md text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 mt-4">
          <Button asChild>
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
              Live Preview
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href={project.sourceCodeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          </Button>
        </div>

        <Button
          className="mt-6"
          variant="ghost"
          onClick={() => navigate("/projects")}
        >
          Back to Projects
        </Button>
      </div>
    </section>
  );
}
