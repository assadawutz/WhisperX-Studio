import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { number: "01", name: "Capabilities",  href: "#features"      },
  { number: "02", name: "Process",       href: "#how-it-works"  },
  { number: "03", name: "Infra",         href: "#infra"         },
  { number: "04", name: "Integrations",  href: "#integrations"  },
  { number: "05", name: "Security",      href: "#security"      },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed z-50 top-0 left-0 right-0 mix-blend-difference pointer-events-none">
      <div className="flex justify-between items-start p-6 lg:p-12">
        {/* Left: Minimal numbered navigation */}
        <nav className="flex flex-col gap-1 pointer-events-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-500 flex items-center gap-4 group ${
                  isActive ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                <span className="opacity-50">{link.number}</span>
                <span className={`transition-transform duration-300 ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>
                  {link.name}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Right: Actions / Logo */}
        <div className="flex flex-col items-end pointer-events-auto gap-4">
          <a href="#" className="text-xl sm:text-2xl font-display font-black tracking-tight text-white uppercase flex items-start gap-1">
            COMPUTE <span className="text-[8px] font-mono mt-1 opacity-50">TM</span>
          </a>
          
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="text-[10px] font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors">
              Sign in
            </a>
            <button className="text-[10px] font-mono tracking-widest text-black bg-white px-4 py-2 hover:bg-white/80 transition-colors uppercase">
              Deploy
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
