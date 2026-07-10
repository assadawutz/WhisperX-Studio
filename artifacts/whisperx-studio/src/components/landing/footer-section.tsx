import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const footerLinks = {
  Product: [
    { name: "Agent capabilities", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Integrations", href: "#integrations" },
  ],
  Developers: [
    { name: "Documentation", href: "#developers" },
    { name: "Agent SDK", href: "#" },
    { name: "API Reference", href: "#developers" },
    { name: "Status", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#", badge: "Hiring" },
    { name: "Contact", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#security" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function FooterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-black text-white overflow-hidden">
      {/* Panoramic banner image */}
      <div className={`relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
          alt="Bioluminescent landscape"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient fade to black at bottom and top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        {/* Subtle dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Footer content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 -mt-24 lg:-mt-40">
        
        {/* Large Logo display overlaying image */}
        <div className={`mb-16 lg:mb-24 flex justify-center lg:justify-start transition-all duration-1000 ease-out delay-100 ${
           isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <a href="#" className="inline-flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">
            <span className="text-5xl lg:text-[8rem] font-display text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500">COMPUTE</span>
            <span className="text-sm lg:text-xl text-white/40 font-mono self-start mt-2 lg:mt-6">TM</span>
          </a>
        </div>

        {/* Main Footer Links */}
        <div className="py-12 lg:py-16 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className={`col-span-2 md:col-span-2 transition-all duration-700 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm lg:text-base">
                Autonomous AI agents for distributed computing. Delegate complex tasks to intelligent workers securely and reliably.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-1 group outline-none focus-visible:text-white"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links], index) => (
              <div 
                key={title} 
                className={`col-span-1 transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group outline-none focus-visible:text-white"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute -bottom-1 left-0 w-full h-px bg-white origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                        </span>
                        {"badge" in link && link.badge && (
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-white/10 border border-white/20 text-white rounded-sm ml-1 group-hover:bg-white group-hover:text-black transition-colors">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`py-8 border-t border-white/10 flex flex-col-reverse md:flex-row items-center justify-between gap-6 transition-all duration-1000 ease-out delay-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <p className="text-xs font-mono text-white/30">
            &copy; {new Date().getFullYear()} COMPUTE. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/40">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6] shadow-[0_0_8px_rgba(236,168,214,0.8)] animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
