import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence , Variants } from "framer-motion";

const navLinks = [
  { name: "Capabilities",  href: "#features"      },
  { name: "Process",       href: "#how-it-works"  },
  { name: "Infra",         href: "#infra"         },
  { name: "Integrations",  href: "#integrations"  },
  { name: "Security",      href: "#security"      },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      let current = "";
      for (const link of navLinks) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? "top-4 left-4 right-4" 
          : "top-0 left-0 right-0"
      }`}
    >
      <nav 
        className={`mx-auto transition-all duration-500 ease-out relative ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 ease-out px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 rounded relative overflow-hidden">
            <span className={`font-display tracking-tight transition-all duration-500 ${isScrolled ? "text-xl text-foreground" : "text-2xl text-white"}`}>COMPUTE</span>
            <span className={`font-mono transition-all duration-500 ${isScrolled ? "text-[10px] mt-0.5 text-muted-foreground" : "text-xs mt-1 text-white/60"}`}>TM</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition-all duration-300 relative group outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 rounded-full px-4 py-2 ${
                    isActive 
                      ? "text-foreground font-medium" 
                      : isScrolled ? "text-foreground/60 hover:text-foreground focus-visible:text-foreground" : "text-white/60 hover:text-white focus-visible:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navActiveBg"
                      className="absolute inset-0 bg-foreground/10 border border-foreground/20 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveGlow"
                      className="absolute inset-0 rounded-full z-[-1] shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className={`transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 rounded px-2 py-1 ${isScrolled ? "text-xs text-foreground/70 hover:text-foreground" : "text-sm text-white/70 hover:text-white"}`}>
              Sign in
            </a>
            <Button
              size="sm"
              className={`relative overflow-hidden rounded-full transition-all duration-300 active:scale-95 group ${isScrolled ? "bg-foreground hover:bg-foreground/90 text-background px-5 h-9 text-xs" : "bg-white hover:bg-white/90 text-black px-6"}`}
            >
              <span className="relative z-10 font-medium">Deploy agent</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 -mr-2 transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 rounded-lg active:scale-95 ${isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"}`}
            aria-label="Toggle menu"
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-3xl z-40"
            style={{ top: 0 }}
          >
            <div className="flex flex-col h-full px-8 pt-32 pb-12">
              <div className="flex-1 flex flex-col justify-center gap-6">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                      className={`text-4xl sm:text-5xl font-display outline-none focus-visible:text-muted-foreground flex items-center gap-4 ${
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {isActive && <motion.span layoutId="mobileActive" className="w-2 h-2 rounded-full bg-[#eca8d6] shadow-[0_0_10px_rgba(236,168,214,0.8)]" />}
                      {link.name}
                    </motion.a>
                  );
                })}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="flex flex-col gap-4 pt-8 border-t border-foreground/10"
              >
                <Button 
                  className="w-full bg-foreground text-background rounded-full h-14 text-base active:scale-95 transition-transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Deploy agent
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full rounded-full h-14 text-base active:scale-95 transition-transform border-foreground/20 hover:bg-foreground/5 hover:border-foreground/40"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
