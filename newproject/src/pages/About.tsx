import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Target, Users, Zap, Award } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We believe AI should empower everyone to work smarter, not harder.',
  },
  {
    icon: Users,
    title: 'Customer-First',
    description: 'Your success is our success. We build tools that solve real problems.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Pushing the boundaries of what\'s possible with AI technology.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering the highest quality products and support.',
  },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Emily Watson',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    name: 'David Kim',
    role: 'Lead Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
];

const About = () => {
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
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">About Us</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Building the Future of Work
            </h1>
            <p className="text-base text-gray-400 leading-relaxed">
              We're on a mission to democratize AI and help teams around the world work smarter, faster, and more creatively.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Our Story</h2>
              <p className="text-base text-gray-400 mb-4 leading-relaxed">
                Founded in 2023, we started with a simple observation: teams were drowning in repetitive tasks while AI technology sat idle in research labs.
              </p>
              <p className="text-base text-gray-400 mb-4 leading-relaxed">
                We set out to bridge that gap, creating intuitive AI-powered tools that anyone can use, regardless of technical expertise.
              </p>
              <p className="text-base text-gray-400 leading-relaxed">
                Today, we're trusted by over 10,000 teams worldwide, automating millions of tasks and freeing people to focus on what truly matters.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Our Values</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">What Drives Us</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Our Team</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Meet the Minds Behind the Magic</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
