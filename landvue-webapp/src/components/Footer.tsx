import React from 'react';
import { Mountain, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    // Section: Dynamic Background (Black in Dark Mode, White in Light Mode)
    <footer className="bg-background border-t border-border pt-20 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
          
          {/* LEFT SIDE: Brand & Socials */}
          <div className="lg:w-1/3 flex flex-col space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                <Mountain className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-bold tracking-tight text-foreground">landvue</span>
            </div>

            {/* Social Icons - Circle Border Style */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-muted-foreground/30 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Links Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Column 1 */}
            <div className="space-y-6">
              <h4 className="font-bold text-foreground text-base">Platform</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Case Management</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Lead Management</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Document Mgmt</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contract Mgmt</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Billing</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <h4 className="font-bold text-foreground text-base">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">News</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-6">
              <h4 className="font-bold text-foreground text-base">Resources</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="space-y-6">
              <h4 className="font-bold text-foreground text-base">Support & Legal</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Subscription</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Subprocessors</a></li>
              </ul>
            </div>

          </div>
        </div>
        
        {/* Optional Copyright Text (if needed) */}
        {/* <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2024 LandVue.io. All rights reserved.
        </div> */}

      </div>
    </footer>
  );
};

export default Footer;