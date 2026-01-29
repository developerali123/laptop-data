import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

const navLinks = [
  "Home",
  "About",
  "Education",
  "Experience",
  "Skills",
  "Services",
  "Stats",
  "Certificates",
  "Projects",
  "Testinominals",
  "Pricing",
  "Contact",
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Side - Logo/Name */}
        <div className="text-2xl font-bold text-primary">Muhammad Ali Mirza</div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link}
              to={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {link}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground hover:text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="flex flex-col space-y-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
