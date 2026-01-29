import { useEffect, useState } from "react";
import { Mountain, Menu, X, Sun, Moon } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Theme State (Default 'dark' rakha hai kyunki aapka design dark based tha)
  const [theme, setTheme] = useState("dark");

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  // Theme toggle logic
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Theme effect: Jab theme change ho, HTML tag par class lagao/hatao
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-zinc-200 dark:border-zinc-800 py-3" // Scrolled: Light/Dark Glassy
          : "bg-transparent border-transparent py-5" // Top: Transparent
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group-hover:border-cyan-500/50 transition-colors">
              <Mountain className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">landvue</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Side Actions (Theme Toggle + Button) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Get Started Button */}
            <button className="bg-black dark:bg-white text-white dark:text-black hover:opacity-80 font-semibold text-sm px-5 py-2.5 rounded-full transition-all">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle + Theme Toggle (Mobile) */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {open && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in slide-in-from-top-5">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold py-3 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;