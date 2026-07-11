import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const footerLinks = {
  Product: [
    { name: "Capabilities", href: "#features" },
    { name: "Process", href: "#how-it-works" },
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
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer ref={footerRef} className="relative bg-black text-white overflow-hidden border-t border-white/10">

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 lg:pt-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8 mb-24"
        >
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-2 flex flex-col justify-between">
            <div>
              <a href="#" className="inline-flex items-start gap-1 group outline-none focus-visible:ring-2 focus-visible:ring-white/50 mb-8">
                <span className="text-3xl font-display font-black uppercase tracking-tight text-white group-hover:text-white/80 transition-colors">COMPUTE</span>
                <span className="text-[8px] font-mono text-white/40 mt-1">TM</span>
              </a>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 leading-relaxed max-w-xs mb-12">
                Autonomous AI agents for distributed computing. Delegate complex tasks securely.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2 group w-fit"
                >
                  {link.name}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out" />
                </a>
              ))}
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div variants={itemVariants} key={title} className="col-span-1">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/20 mb-8">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                      {"badge" in link && link.badge && (
                        <span className="px-1.5 border border-white/20 text-white/40 group-hover:border-white group-hover:text-black group-hover:bg-white transition-colors">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-widest text-white/30">
            <span>&copy; {new Date().getFullYear()} COMPUTE.</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="italic font-sans lowercase text-white/40 text-[10px]">Monumental scale.</span>
          </div>

          <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            All systems operational
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
