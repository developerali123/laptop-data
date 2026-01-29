import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

const blogs = [
  {
    id: "1",
    title: "Building Scalable MERN Applications",
    thumbnail: "https://loremflickr.com/640/480/technology?random=1",
    description:
      "A deep dive into structuring and optimizing MERN stack apps for performance, maintainability, and scalability with modern patterns.",
    tags: ["React", "Node.js", "MongoDB", "Architecture"],
    author: "Muhammad Ali Mirza",
    publishedDate: "Jul 15, 2024",
  },
  {
    id: "2",
    title: "Automating CI/CD for Node.js Projects",
    thumbnail: "https://loremflickr.com/640/480/code?random=2",
    description:
      "Learn how to integrate CI/CD pipelines using GitHub Actions and Docker for your Node.js and React projects.",
    tags: ["DevOps", "CI/CD", "Docker", "GitHub Actions"],
    author: "Muhammad Ali Mirza",
    publishedDate: "Aug 10, 2024",
  },
  {
    id: "3",
    title: "Optimizing PostgreSQL for High Traffic Apps",
    thumbnail: "https://loremflickr.com/640/480/database?random=3",
    description:
      "Best practices for tuning PostgreSQL queries and indexes for full-stack apps handling large datasets.",
    tags: ["PostgreSQL", "Backend", "Performance"],
    author: "Muhammad Ali Mirza",
    publishedDate: "Sep 22, 2024",
  },
];


const BlogList = () => {
  return (
    <section className="relative flex flex-col px-5 justify-center overflow-hidden bg-[#FEFBF6] text-[#151515] dark:bg-gray-900 dark:text-white py-12">
      <h2 className="text-center md:text-4xl text-3xl mb-10 underline decoration-dotted decoration-[#3498db] text-[#3498db] font-bold">
        Blogs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-[#95a5a6] dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition hover:scale-105"
          >
            <div className="relative">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <Badge
                className="absolute top-4 left-4 bg-[#3498db] text-white px-2 py-1 rounded-md"
              >
                {blog.publishedDate}
              </Badge>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-[#3498db] mb-3">
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </h3>
              <p className="text-sm line-clamp-3">{blog.description}</p>

              <div className="mt-4 flex gap-2 flex-wrap">
                {blog.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
