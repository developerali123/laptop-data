import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

const projects = [
  {
    id: 1,
    name: "Ali Book Franchise",
    image: "/images/14.PNG",
    demoLink: "https://demo-link.com",
    sourceCodeLink: "https://github.com/ali/book-franchise",
    description:
      "A complete franchise management system with sales, inventory, and reporting features.",
    skills: ["React", "Node.js", "Express", "MongoDB"],
    screenshots: ["/images/14.PNG", "/images/14-1.PNG", "/images/14-2.PNG"],
  },
  {
    id: 2,
    name: "Travel Agency Website",
    image: "/images/15.PNG",
    demoLink: "https://demo-link.com",
    sourceCodeLink: "https://github.com/ali/travel-agency",
    description:
      "A responsive travel booking platform with dynamic packages and payment gateway integration.",
    skills: ["Next.js", "TailwindCSS", "Stripe API"],
    screenshots: ["/images/15.PNG", "/images/15-1.PNG"],
  },
  // Add more projects...
];

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section className="bg-background text-foreground py-12">
      <motion.h2
        className="text-center md:text-3xl text-2xl mb-8 font-bold underline decoration-dotted text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 px-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="bg-muted shadow-lg hover:scale-105 transition-transform cursor-pointer border border-primary"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <CardContent className="p-0">
                <img
                  src={project.image}
                  alt={project.name}
                  className="object-cover w-full h-48 rounded-t-md"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{project.name}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
