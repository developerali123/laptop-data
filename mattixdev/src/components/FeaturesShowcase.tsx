import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import featureIntegrations from '@/assets/feature-integrations.png';
import featureWorkflows from '@/assets/feature-workflows.png';
import { motion } from 'framer-motion';

export const FeaturesShowcase = () => {
  const features = [
    {
      title: "Seamless Integrations",
      description: "Integrate Slack, HubSpot, Zendesk & more—automate data flow instantly.",
      image: featureIntegrations,
      gradient: "from-blue-900/40 via-blue-800/20 to-orange-900/40"
    },
    {
      title: "Conversational Actions",
      description: "Create records, assign tasks & queue emails with a simple prompt in seconds flat.",
      image: featureIntegrations,
      gradient: "from-orange-900/40 via-orange-800/20 to-blue-900/40"
    },
    {
      title: "Visual Workflow Designer",
      description: "Drag & drop AI actions to build workflows visually—no coding required.",
      image: featureWorkflows,
      gradient: "from-blue-900/40 via-orange-800/20 to-orange-900/40"
    },
    {
      title: "Multi-Channel Automation",
      description: "Trigger email, SMS & chat messages automatically on schedule.",
      image: featureWorkflows,
      gradient: "from-orange-900/40 via-blue-800/20 to-blue-900/40"
    }
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(217,91%,15%),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(25,95%,12%),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge 
            variant="outline" 
            className="mb-6 px-6 py-2 text-sm font-medium border-2 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/50 backdrop-blur-sm"
          >
            AI-DRIVEN FEATURES
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Build, scale and manage
            <br />
            entire AI workforce
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fusion AI helps you tackle data bottlenecks, streamline analysis, and make smarter decisions with ease.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden border-2 border-white/10 bg-black/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(251,146,60,0.2)]"
            >
              <CardContent className="p-0">
                {/* Feature Image with Gradient Background */}
                <motion.div 
                  className={`relative overflow-hidden bg-gradient-to-br ${feature.gradient} p-8`}
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 to-accent/10" />
                </motion.div>
                
                {/* Feature Details */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
