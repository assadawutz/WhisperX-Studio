import { useEffect, useState, useRef } from "react";
import { motion, useInView , Variants } from "framer-motion";

const regions = [
  { name: "North America", nodes: 12, status: "operational" },
  { name: "Europe", nodes: 8, status: "operational" },
  { name: "Asia Pacific", nodes: 6, status: "operational" },
  { name: "South America", nodes: 3, status: "operational" },
];

export function InfrastructureSection() {
  const [activeRegion, setActiveRegion] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRegion((prev) => (prev + 1) % regions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="infra" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.span variants={itemVariants} className="inline-flex items-center gap-4 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mb-8">
            <span className="w-12 h-px bg-foreground/30" />
            Global infrastructure
          </motion.span>
          
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-center lg:items-stretch">
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.8, rotate: -10 },
                visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.2, ease: "easeOut" } }
              }}
              className="w-32 md:w-48 lg:w-72 xl:w-80 shrink-0 relative"
            >
              <div className="absolute inset-0 bg-[#eca8d6]/10 blur-[80px] rounded-full mix-blend-screen" />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png"
                alt="Global network sphere"
                className="w-full h-full object-contain object-center animate-[float_8s_ease-in-out_infinite]"
              />
            </motion.div>

            <div className="flex flex-col justify-center">
              <motion.h2 variants={itemVariants} className="text-[clamp(3.5rem,8vw,8rem)] font-display tracking-tight leading-[0.9]">
                Global by
                <br />
                <span className="text-muted-foreground">default.</span>
              </motion.h2>

              <motion.p variants={itemVariants} className="mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Your agents run on distributed infrastructure across 29 regions.
                Sub-50ms latency to 99% of the world.
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-4 lg:gap-6"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2 relative p-8 lg:p-14 border border-foreground/10 bg-foreground/[0.02] rounded-xl overflow-hidden group hover:border-foreground/30 hover:bg-foreground/[0.04] transition-colors duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]">
            <div className="absolute inset-0 opacity-70 pointer-events-none">
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                <defs>
                  <style>{`
                    @keyframes drawLine {
                      0%   { stroke-dashoffset: 1000; opacity: 0; }
                      15%  { opacity: 1; }
                      70%  { opacity: 0.7; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .connecting-line {
                      stroke: #eca8d6;
                      stroke-width: 1.2;
                      fill: none;
                      stroke-dasharray: 1000;
                      animation: drawLine 4s ease-in-out infinite;
                    }
                  `}</style>
                </defs>
                {[...Array(19)].map((_, i) => {
                  const x1 = 10 + (i % 5) * 20;
                  const y1 = 10 + Math.floor(i / 5) * 25;
                  const x2 = 10 + ((i + 1) % 5) * 20;
                  const y2 = 10 + Math.floor((i + 1) / 5) * 25;
                  return (
                    <line
                      key={`line-${i}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      className="connecting-line transition-opacity duration-500 group-hover:opacity-100"
                      style={{ animationDelay: `${i * 0.15}s`, opacity: 0.3 }}
                    />
                  );
                })}
              </svg>

              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#eca8d6] transition-transform duration-500 group-hover:scale-[2] group-hover:shadow-[0_0_10px_#eca8d6]"
                  style={{
                    left: `${10 + (i % 5) * 20}%`,
                    top: `${10 + Math.floor(i / 5) * 25}%`,
                    animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 pointer-events-none">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[clamp(4rem,10vw,10rem)] font-display leading-none text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#eca8d6] transition-all duration-700">29</span>
                <span className="text-xl lg:text-3xl text-muted-foreground font-display">regions</span>
              </div>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed group-hover:text-foreground/80 transition-colors">
                Compute nodes distributed globally for maximum redundancy and minimum latency.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 lg:gap-6">
            <motion.div variants={itemVariants} className="p-8 lg:p-10 border border-foreground/10 bg-foreground/[0.02] rounded-xl transition-all duration-500 hover:border-foreground/30 hover:bg-foreground/[0.04] group hover:-translate-y-1 hover:shadow-xl">
              <span className="text-5xl lg:text-6xl xl:text-7xl font-display text-foreground group-hover:text-[#eca8d6] group-hover:drop-shadow-[0_0_15px_rgba(236,168,214,0.4)] transition-all duration-500">99.99%</span>
              <span className="block text-xs uppercase tracking-wider font-mono text-muted-foreground mt-4 group-hover:text-foreground/60 transition-colors">Uptime SLA</span>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-8 lg:p-10 border border-foreground/10 bg-foreground/[0.02] rounded-xl transition-all duration-500 hover:border-foreground/30 hover:bg-foreground/[0.04] group hover:-translate-y-1 hover:shadow-xl">
              <span className="text-5xl lg:text-6xl xl:text-7xl font-display text-foreground group-hover:text-[#67e8f9] group-hover:drop-shadow-[0_0_15px_rgba(103,232,249,0.4)] transition-all duration-500">&lt;50ms</span>
              <span className="block text-xs uppercase tracking-wider font-mono text-muted-foreground mt-4 group-hover:text-foreground/60 transition-colors">Global latency</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {regions.map((region, index) => {
            const isActive = activeRegion === index;
            return (
              <motion.button
                variants={itemVariants}
                key={region.name}
                onClick={() => setActiveRegion(index)}
                onMouseEnter={() => setActiveRegion(index)}
                className={`text-left p-6 border rounded-xl transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 relative overflow-hidden ${
                  isActive 
                    ? "border-foreground/40 bg-foreground/[0.06] shadow-[0_10px_30px_rgba(255,255,255,0.05)] scale-[1.02]" 
                    : "border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.03]"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="regionHighlight"
                    className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent pointer-events-none"
                  />
                )}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <span className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    isActive ? "bg-[#eca8d6] shadow-[0_0_10px_rgba(236,168,214,0.8)] scale-125" : "bg-foreground/20"
                  }`} />
                  <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {region.status}
                  </span>
                </div>
                <span className={`font-display text-2xl block mb-1 relative z-10 transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-foreground/80"
                }`}>{region.name}</span>
                <span className="text-sm text-muted-foreground font-mono relative z-10">{region.nodes} nodes</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
