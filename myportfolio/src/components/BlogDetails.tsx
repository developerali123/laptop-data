import { useParams, Link } from "react-router-dom";
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

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="text-center py-20 text-lg">
        Blog not found. <Link to="/blogs" className="text-[#3498db]">Go back</Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto p-6 bg-[#FEFBF6] dark:bg-gray-900 text-[#151515] dark:text-white rounded-lg shadow-md mt-12">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-md"
      />

      <div className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold text-[#3498db]">{blog.title}</h1>
        <Badge className="bg-[#3498db] text-white">{blog.publishedDate}</Badge>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        {blog.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {blog.tags.map((tag, idx) => (
          <Badge key={idx} variant="outline">
            #{tag}
          </Badge>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <span>Written by <span className="font-semibold">{blog.author}</span></span>
      </div>
    </article>
  );
};

export default BlogDetails;
