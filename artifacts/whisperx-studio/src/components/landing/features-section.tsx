import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Autonomous Execution",
    description: "Deploy AI agents that work independently. They analyze, decide, and execute complex multi-step tasks without human intervention.",
    stats: { value: "99.7%", label: "task completion" },
  },
  {
    number: "02",
    title: "Distributed Computing",
    description: "Offload compute-heavy tasks to our global network. Your agents run on optimized infrastructure across 50+ regions worldwide.",
    stats: { value: "50+", label: "global regions" },
  },
  {
    number: "03",
    title: "Multi-Agent Orchestration",
    description: "Coordinate teams of specialized agents. They communicate, delegate, and collaborate to solve complex problems together.",
    stats: { value: "1000x", label: "parallel execution" },
  },
  {
    number: "04",
    title: "Secure Sandboxing",
    description: "Each agent runs in isolated environments. Full audit trails, encrypted execution, and zero data leakage between tasks.",
    stats: { value: "0", label: "data breaches" },
  },
];

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-black text-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mb-16 lg:mb-32 flex flex-col lg:flex-row justify-between items-end gap-12"
        >
          <div>
            <motion.span variants={itemVariants} className="inline-flex items-center gap-4 text-[10px] font-mono text-white/50 uppercase tracking-widest mb-8">
              <span className="w-8 h-px bg-white/30" />
              Capabilities
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-[clamp(3rem,8vw,7rem)] font-display font-black tracking-tighter leading-[0.85] uppercase"
            >
              Intelligent
              <br />
              <span className="text-white/30 chromatic-text-hover">workers.</span>
            </motion.h2>
          </div>
          <motion.p variants={itemVariants} className="text-sm md:text-base font-mono text-white/50 leading-relaxed max-w-sm uppercase tracking-wide">
            Deploy autonomous AI agents that execute complex tasks across distributed infrastructure. No supervision required.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] glass-shard-strong rounded-full pointer-events-none mix-blend-screen opacity-50 z-0" />
          
          <div className="lg:col-span-4 flex flex-col gap-2 relative z-10">
            {features.map((feature, idx) => {
              const isActive = activeFeature === idx;
              return (
                <button
                  key={feature.number}
                  onMouseEnter={() => setActiveFeature(idx)}
                  onClick={() => setActiveFeature(idx)}
                  className={`relative flex items-center text-left p-6 transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white/50 group overflow-hidden ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-transparent text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono text-xs w-8 opacity-50">
                    {feature.number}
                  </span>
                  <h4 className={`text-xl font-display font-bold uppercase tracking-tight ${isActive ? "" : ""}`}>
                    {feature.title}
                  </h4>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 relative min-h-[500px] lg:min-h-[600px] flex flex-col justify-center p-8 lg:p-16 border border-white/10 z-10 bg-black/40 backdrop-blur-xl">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col h-full justify-between relative z-10"
            >
              <div>
                <span className="font-mono text-sm text-[#eca8d6] block mb-8">
                  {features[activeFeature].number}
                </span>
                <h3 className="text-4xl lg:text-6xl font-display font-black uppercase tracking-tighter mb-8">
                  {features[activeFeature].title}
                </h3>
                <p className="text-lg lg:text-2xl font-sans font-light text-white/60 leading-relaxed max-w-2xl">
                  {features[activeFeature].description}
                </p>
              </div>
              
              <div className="mt-16 flex items-baseline gap-4 border-t border-white/10 pt-8">
                <span className="text-6xl lg:text-8xl font-display font-black tracking-tighter">
                  {features[activeFeature].stats.value}
                </span>
                <span className="text-xs uppercase tracking-widest text-white/40 font-mono">
                  {features[activeFeature].stats.label}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
