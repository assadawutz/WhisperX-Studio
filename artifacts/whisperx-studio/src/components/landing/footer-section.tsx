import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useInView , Variants } from "framer-motion";

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
    <footer ref={footerRef} className="relative bg-black text-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden"
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
          alt="Bioluminescent landscape"
          className="w-full h-full object-cover object-center animate-[float_20s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 -mt-24 lg:-mt-40">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16 lg:mb-24 flex justify-center lg:justify-start"
        >
          <a href="#" className="inline-flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">
            <span className="text-5xl lg:text-[8rem] font-display text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#eca8d6] transition-all duration-700">COMPUTE</span>
            <span className="text-sm lg:text-xl text-white/40 font-mono self-start mt-2 lg:mt-6">TM</span>
          </a>
        </motion.div>

        <div className="py-12 lg:py-16 border-t border-white/10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8"
          >
            <motion.div variants={itemVariants} className="col-span-2 md:col-span-2">
              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm lg:text-base">
                Autonomous AI agents for distributed computing. Delegate complex tasks to intelligent workers securely and reliably.
              </p>

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
            </motion.div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <motion.div variants={itemVariants} key={title} className="col-span-1">
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
                          <span className="absolute -bottom-1 left-0 w-full h-px bg-[#eca8d6] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                        </span>
                        {"badge" in link && link.badge && (
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#eca8d6]/10 border border-[#eca8d6]/20 text-[#eca8d6] rounded-sm ml-1 group-hover:bg-[#eca8d6] group-hover:text-black transition-colors">
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
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="py-8 border-t border-white/10 flex flex-col-reverse md:flex-row items-center justify-between gap-6"
        >
          <p className="text-xs font-mono text-white/30">
            &copy; {new Date().getFullYear()} COMPUTE. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/40">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6] shadow-[0_0_8px_rgba(236,168,214,0.8)] animate-pulse" />
              All systems operational
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
