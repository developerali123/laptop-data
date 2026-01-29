import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    title: 'The Future of AI Automation in Business',
    excerpt: 'Discover how AI is transforming the way teams work and the key trends to watch in 2024.',
    author: 'Sarah Chen',
    date: 'Nov 15, 2024',
    readTime: '5 min read',
    category: 'AI Trends',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
  },
  {
    title: '10 Ways to Boost Productivity with AI Workflows',
    excerpt: 'Practical tips and strategies to supercharge your team\'s efficiency using intelligent automation.',
    author: 'Michael Rodriguez',
    date: 'Nov 10, 2024',
    readTime: '7 min read',
    category: 'Productivity',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
  },
  {
    title: 'Building Your First AI Agent: A Complete Guide',
    excerpt: 'Step-by-step tutorial on creating custom AI agents to handle repetitive tasks automatically.',
    author: 'Emily Watson',
    date: 'Nov 5, 2024',
    readTime: '10 min read',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
  },
  {
    title: 'Case Study: How Company X Saved 40 Hours Per Week',
    excerpt: 'Real-world success story of a team that transformed their workflow with AI automation.',
    author: 'David Kim',
    date: 'Oct 28, 2024',
    readTime: '6 min read',
    category: 'Case Study',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  },
  {
    title: 'Understanding AI Ethics in the Workplace',
    excerpt: 'Important considerations for implementing AI responsibly and maintaining trust.',
    author: 'Sarah Chen',
    date: 'Oct 20, 2024',
    readTime: '8 min read',
    category: 'Ethics',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
  },
  {
    title: 'Top 5 AI Integrations Every Team Needs',
    excerpt: 'Essential AI tools and integrations that can transform your daily operations.',
    author: 'Michael Rodriguez',
    date: 'Oct 15, 2024',
    readTime: '5 min read',
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
  },
];

const Blog = () => {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Blog</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Insights & Updates
            </h1>
            <p className="text-base text-gray-400 leading-relaxed">
              Learn about AI, productivity, and the future of work from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-12 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img
              src={blogPosts[0].image}
              alt={blogPosts[0].title}
              className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-12 z-20">
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-background text-xs font-semibold mb-4">
                {blogPosts[0].category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-base text-gray-300 mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>{blogPosts[0].author}</span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {blogPosts[0].date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {blogPosts[0].readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-background text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <Button variant="ghost" className="mt-4 p-0 h-auto text-primary hover:bg-transparent">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
