import { Github, Twitter, Linkedin, Mail, Send, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Integrations', href: '/integration' },
    { label: 'API Docs', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '/contact' },
    { label: 'Press Kit', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Templates', href: '#' },
    { label: 'Tutorials', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Security', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 pt-20 pb-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Newsletter Section */}
        <div className="relative mb-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Stay ahead with <span className="gradient-text">AI insights</span>
              </h3>
              <p className="text-muted-foreground">
                Get the latest updates on AI automation, product news, and exclusive tips delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background/50 border-border/50 h-12 px-4"
              />
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-background font-semibold h-12 px-6 hover-glow">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold">Fusion AI</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Automate your workflows with AI-powered automation. Connect apps, set triggers, and let AI handle the rest.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Fusion AI. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              All systems operational
            </span>
            <Link to="/waitlist" className="text-sm text-primary hover:underline font-medium">
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
