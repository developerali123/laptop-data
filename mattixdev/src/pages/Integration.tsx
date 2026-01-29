import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Mail, Video, Phone, Calendar,
  Users, Briefcase, TrendingUp, Target, FileText,
  ShoppingCart, CreditCard, Package, DollarSign, Store,
  Share2, Instagram, Linkedin, Twitter, Youtube,
  Database, Cloud, Server, Lock, Settings,
  BarChart, PieChart, LineChart, Activity, Zap,
  Cpu, Bot, Sparkles, Brain, Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface App {
  name: string;
  icon: React.ElementType;
  description: string;
  color?: string;
}

interface Category {
  name: string;
  apps: App[];
}

const categories: Category[] = [
  {
    name: 'Communication',
    apps: [
      { name: 'Slack', icon: MessageSquare, description: 'Team messaging and collaboration', color: '#4A154B' },
      { name: 'Gmail', icon: Mail, description: 'Email communication', color: '#EA4335' },
      { name: 'Zoom', icon: Video, description: 'Video conferencing', color: '#2D8CFF' },
      { name: 'Microsoft Teams', icon: Phone, description: 'Team collaboration platform', color: '#6264A7' },
      { name: 'WhatsApp', icon: MessageSquare, description: 'Instant messaging', color: '#25D366' },
      { name: 'Telegram', icon: MessageSquare, description: 'Cloud messaging', color: '#0088CC' },
    ],
  },
  {
    name: 'CRM & Sales',
    apps: [
      { name: 'Salesforce', icon: Users, description: 'Customer relationship management', color: '#00A1E0' },
      { name: 'HubSpot', icon: Briefcase, description: 'Marketing & sales platform', color: '#FF7A59' },
      { name: 'Pipedrive', icon: TrendingUp, description: 'Sales pipeline management', color: '#1A1A1A' },
      { name: 'Zendesk', icon: Target, description: 'Customer service platform', color: '#03363D' },
      { name: 'Intercom', icon: MessageSquare, description: 'Customer messaging', color: '#1F8DED' },
      { name: 'Freshdesk', icon: FileText, description: 'Customer support software', color: '#23C1E8' },
    ],
  },
  {
    name: 'E-commerce',
    apps: [
      { name: 'Shopify', icon: ShoppingCart, description: 'E-commerce platform', color: '#96BF48' },
      { name: 'WooCommerce', icon: Store, description: 'WordPress e-commerce', color: '#96588A' },
      { name: 'Stripe', icon: CreditCard, description: 'Payment processing', color: '#635BFF' },
      { name: 'PayPal', icon: DollarSign, description: 'Digital payments', color: '#00457C' },
      { name: 'Square', icon: Package, description: 'Commerce solutions', color: '#3E4348' },
      { name: 'BigCommerce', icon: Store, description: 'E-commerce software', color: '#121118' },
    ],
  },
  {
    name: 'Social Media',
    apps: [
      { name: 'Facebook', icon: Share2, description: 'Social networking', color: '#1877F2' },
      { name: 'Instagram', icon: Instagram, description: 'Photo & video sharing', color: '#E4405F' },
      { name: 'LinkedIn', icon: Linkedin, description: 'Professional networking', color: '#0A66C2' },
      { name: 'Twitter/X', icon: Twitter, description: 'Microblogging platform', color: '#1DA1F2' },
      { name: 'YouTube', icon: Youtube, description: 'Video sharing', color: '#FF0000' },
      { name: 'TikTok', icon: Share2, description: 'Short-form video', color: '#000000' },
    ],
  },
  {
    name: 'Productivity',
    apps: [
      { name: 'Google Workspace', icon: Mail, description: 'Productivity suite', color: '#4285F4' },
      { name: 'Microsoft 365', icon: FileText, description: 'Office applications', color: '#D83B01' },
      { name: 'Notion', icon: FileText, description: 'All-in-one workspace', color: '#000000' },
      { name: 'Asana', icon: Target, description: 'Project management', color: '#F06A6A' },
      { name: 'Trello', icon: Workflow, description: 'Task management', color: '#0052CC' },
      { name: 'Monday.com', icon: Calendar, description: 'Work operating system', color: '#FF3D57' },
    ],
  },
  {
    name: 'Marketing',
    apps: [
      { name: 'Mailchimp', icon: Mail, description: 'Email marketing', color: '#FFE01B' },
      { name: 'Hootsuite', icon: Share2, description: 'Social media management', color: '#000000' },
      { name: 'Buffer', icon: Calendar, description: 'Social scheduling', color: '#168EEA' },
      { name: 'Canva', icon: Sparkles, description: 'Graphic design', color: '#00C4CC' },
      { name: 'Google Ads', icon: Target, description: 'Online advertising', color: '#4285F4' },
      { name: 'Facebook Ads', icon: TrendingUp, description: 'Social advertising', color: '#1877F2' },
    ],
  },
  {
    name: 'Analytics',
    apps: [
      { name: 'Google Analytics', icon: BarChart, description: 'Web analytics', color: '#E37400' },
      { name: 'Mixpanel', icon: LineChart, description: 'Product analytics', color: '#7856FF' },
      { name: 'Amplitude', icon: PieChart, description: 'Digital analytics', color: '#0070F3' },
      { name: 'Hotjar', icon: Activity, description: 'User behavior analytics', color: '#FD3A63' },
      { name: 'Segment', icon: BarChart, description: 'Customer data platform', color: '#52BD95' },
      { name: 'Tableau', icon: LineChart, description: 'Business intelligence', color: '#E97627' },
    ],
  },
  {
    name: 'Cloud & Storage',
    apps: [
      { name: 'Google Drive', icon: Cloud, description: 'Cloud storage', color: '#4285F4' },
      { name: 'Dropbox', icon: Database, description: 'File hosting', color: '#0061FF' },
      { name: 'OneDrive', icon: Cloud, description: 'Microsoft cloud storage', color: '#0078D4' },
      { name: 'AWS S3', icon: Server, description: 'Object storage', color: '#FF9900' },
      { name: 'Box', icon: Package, description: 'Content management', color: '#0061D5' },
      { name: 'iCloud', icon: Cloud, description: 'Apple cloud storage', color: '#3693F3' },
    ],
  },
  {
    name: 'AI & Automation',
    apps: [
      { name: 'Zapier', icon: Zap, description: 'Workflow automation', color: '#FF4A00' },
      { name: 'OpenAI', icon: Brain, description: 'AI models & APIs', color: '#10A37F' },
      { name: 'Make', icon: Workflow, description: 'Visual automation', color: '#6B4FBB' },
      { name: 'ChatGPT', icon: Bot, description: 'Conversational AI', color: '#74AA9C' },
      { name: 'Claude', icon: Cpu, description: 'AI assistant', color: '#D97706' },
      { name: 'GitHub Copilot', icon: Bot, description: 'AI pair programmer', color: '#000000' },
    ],
  },
];

const Integration = () => {
  const totalApps = categories.reduce((sum, category) => sum + category.apps.length, 0);

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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
            >
              <Workflow className="w-10 h-10 text-primary" />
            </motion.div>

            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Integrations</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Connect Your Favorite Apps
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Fusion AI integrates seamlessly with {totalApps}+ popular tools and services. 
              Automate workflows across your entire tech stack.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full">
                Browse All Integrations
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Request Integration
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: `${totalApps}+`, label: 'Integrations' },
              { number: '10M+', label: 'Tasks automated' },
              { number: '99.9%', label: 'Uptime' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card/30 border border-border/50"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.map((category, categoryIndex) => (
        <section key={category.name} className="py-16 relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                {category.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {category.apps.length} integrations available
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.apps.map((app, appIndex) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: appIndex * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-2xl bg-card/30 border border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 group-hover:scale-110 transition-transform"
                    >
                      <app.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-1 truncate">{app.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {app.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background border border-primary/20"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Can't Find Your App?
              </h2>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                We're constantly adding new integrations. Request the apps you need and we'll prioritize them.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full">
                  Request Integration
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  View API Documentation
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Integration;
