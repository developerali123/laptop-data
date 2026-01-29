import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/about', label: 'About us' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/integration', label: 'Integration' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
    { to: '/waitlist', label: 'Waitlist' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ opacity: navbarOpacity }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-background" />
            </motion.div>
            <span className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
              Fusion AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link 
                  to={link.to} 
                  className={`text-sm relative group transition-colors duration-300 ${
                    location.pathname === link.to 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:block"
          >
            <Button 
              className="bg-primary hover:bg-primary/90 text-background font-semibold hover-glow transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 border-t border-border/50"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 ${
                    location.pathname === link.to
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-background">
              Get Started
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
