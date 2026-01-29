import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  title: string;
  description: string;
}

function ServiceCard({ title, description }: Props) {
  return (
    <Card className="h-full hover:scale-105 transition-transform duration-300 bg-muted text-foreground border border-primary shadow-md">
      <CardHeader>
        <CardTitle className="text-primary text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}


const services = [
  {
    title: "Full Stack Web Development",
    description:
      "Building dynamic, scalable, and responsive web applications using React, Node.js, Express, and databases like MongoDB and PostgreSQL.",
  },
  {
    title: "API Development",
    description:
      "Designing RESTful and GraphQL APIs to connect frontend and backend systems, ensuring seamless data flow and integration.",
  },
  {
    title: "Database Design & Optimization",
    description:
      "Structuring and optimizing relational (PostgreSQL) and NoSQL (MongoDB) databases for performance and scalability.",
  },
  {
    title: "Cloud Deployment",
    description:
      "Deploying and hosting applications on cloud platforms like AWS, Render, or Vercel with production-grade configuration.",
  },
  {
    title: "Performance Optimization",
    description:
      "Improving frontend and backend performance for faster load times, efficient queries, and smoother user experience.",
  },
  {
    title: "CI/CD & DevOps Basics",
    description:
      "Setting up automated testing, continuous integration, and deployment pipelines to streamline project delivery.",
  },
  {
    title: "Website Maintenance & Bug Fixing",
    description:
      "Providing ongoing support, fixing bugs, and adding enhancements to keep projects running smoothly.",
  },
];

export default function Services() {
  return (
    <section className="bg-background text-foreground py-12">
      <motion.h2
        className="text-center mb-8 md:text-3xl text-2xl text-primary font-bold underline decoration-dotted"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Services
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="w-full sm:w-1/2 lg:w-1/3"
          >
            <ServiceCard title={service.title} description={service.description} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
