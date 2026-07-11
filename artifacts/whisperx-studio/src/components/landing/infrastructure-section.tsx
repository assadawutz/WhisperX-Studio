import { useEffect, useState, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

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
    <section id="infra" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-black text-white">
      
      {/* Abstract glass shards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, -30, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -right-[10%] top-[30%] w-[40vw] h-[60vh] glass-shard transform -rotate-12 opacity-30" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-24 lg:mb-40 flex flex-col items-start"
        >
          <motion.span variants={itemVariants} className="inline-flex items-center gap-4 text-[10px] font-mono text-white/50 uppercase tracking-widest mb-8">
            <span className="w-8 h-px bg-white/30" />
            Global infrastructure
          </motion.span>
          
          <motion.h2 variants={itemVariants} className="text-[clamp(3.5rem,8vw,9rem)] font-display font-black tracking-tighter uppercase leading-[0.85] w-full">
            <span className="block text-white chromatic-text-hover">Global</span>
            <span className="block text-white chromatic-text-hover">by default.</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-12 text-sm md:text-base font-mono uppercase tracking-wide text-white/50 leading-relaxed max-w-md">
            Your agents run on distributed infrastructure across 29 regions.
            Sub-50ms latency to 99% of the world.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-0 border-y border-white/10"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2 relative p-8 lg:p-16 flex flex-col justify-between border-r border-white/10 group bg-black/20 backdrop-blur-md hover:bg-white transition-colors duration-500">
            <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-5 transition-opacity">
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                <defs>
                  <style>{`
                    @keyframes drawLineWhite {
                      0%   { stroke-dashoffset: 1000; opacity: 0; }
                      15%  { opacity: 1; }
                      70%  { opacity: 0.7; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .connecting-line-white {
                      stroke: #ffffff;
                      stroke-width: 1;
                      fill: none;
                      stroke-dasharray: 1000;
                      animation: drawLineWhite 6s ease-in-out infinite;
                    }
                  `}</style>
                </defs>
                {[...Array(15)].map((_, i) => {
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
                      className="connecting-line-white"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  );
                })}
              </svg>

              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white transition-transform duration-500"
                  style={{
                    left: `${10 + (i % 5) * 20}%`,
                    top: `${10 + Math.floor(i / 5) * 25}%`,
                    animation: `pulse 3s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 pointer-events-none mb-24">
               <p className="text-sm font-mono uppercase tracking-widest text-white/50 group-hover:text-black/50 transition-colors">
                 Compute nodes distributed globally for maximum redundancy and minimum latency.
               </p>
            </div>

            <div className="relative z-10 flex items-baseline gap-4 mt-auto">
              <span className="text-[clamp(5rem,12vw,12rem)] font-display font-black leading-[0.8] tracking-tighter text-white group-hover:text-black transition-colors duration-500">29</span>
              <span className="text-sm md:text-base text-white/40 font-mono uppercase tracking-widest group-hover:text-black/40 transition-colors">regions</span>
            </div>
          </motion.div>

          <div className="flex flex-col">
            <motion.div variants={itemVariants} className="p-8 lg:p-12 border-b border-white/10 flex-1 flex flex-col justify-end transition-all duration-500 hover:bg-white group">
              <span className="text-xs uppercase tracking-widest font-mono text-white/50 mb-8 group-hover:text-black/50 transition-colors">Uptime SLA</span>
              <span className="text-5xl lg:text-7xl font-display font-black tracking-tighter text-white group-hover:text-black transition-all duration-500">99.99%</span>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-8 lg:p-12 flex-1 flex flex-col justify-end transition-all duration-500 hover:bg-white group">
              <span className="text-xs uppercase tracking-widest font-mono text-white/50 mb-8 group-hover:text-black/50 transition-colors">Global latency</span>
              <span className="text-5xl lg:text-7xl font-display font-black tracking-tighter text-white group-hover:text-black transition-all duration-500">&lt;50ms</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-b border-white/10"
        >
          {regions.map((region, index) => {
            const isActive = activeRegion === index;
            return (
              <motion.button
                variants={itemVariants}
                key={region.name}
                onClick={() => setActiveRegion(index)}
                onMouseEnter={() => setActiveRegion(index)}
                className={`text-left p-6 lg:p-8 border-r border-white/10 last:border-r-0 transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white/50 relative overflow-hidden h-40 flex flex-col justify-between ${
                  isActive 
                    ? "bg-white text-black" 
                    : "bg-transparent text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    isActive ? "bg-black" : "bg-white/20"
                  }`} />
                  <span className={`text-[9px] font-mono uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-black/50" : "text-white/40"
                  }`}>
                    {region.status}
                  </span>
                </div>
                <div>
                  <span className={`font-display font-bold uppercase tracking-tight text-xl block mb-1 relative z-10 transition-colors duration-300 ${
                    isActive ? "text-black" : "text-white/80"
                  }`}>{region.name}</span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest relative z-10 ${
                    isActive ? "text-black/50" : "text-white/40"
                  }`}>{region.nodes} nodes</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
