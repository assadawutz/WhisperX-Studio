import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Define",
    subtitle: "your agent",
    description: "Describe what your agent should do. Set its capabilities, constraints, and goals in natural language or code.",
    code: `const researcher = new Agent({\n  role: 'Research Analyst',\n  capabilities: ['web', 'docs', 'api'],\n  memory: true,\n  autonomy: 'full'\n})`,
  },
  {
    number: "02",
    title: "Assign",
    subtitle: "the task",
    description: "Give your agent a mission. It breaks down complex tasks into steps and executes them autonomously.",
    code: `await researcher.execute({\n  task: 'Analyze competitor pricing',\n  sources: ['public-data', 'news'],\n  output: 'structured-report',\n  deadline: '2h'\n})`,
  },
  {
    number: "03",
    title: "Monitor",
    subtitle: "& scale",
    description: "Track progress in real-time. Spin up more agents as needed. Pay only for compute used.",
    code: `optimus.dashboard({\n  agents: [researcher],\n  metrics: ['tasks', 'latency', 'cost'],\n  alerts: true\n})\n// 847 tasks completed today`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-black text-white overflow-hidden border-t border-white/10"
    >
      {/* Background shards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -left-[20%] top-[20%] w-[50vw] h-[80vh] glass-shard transform rotate-[30deg] opacity-40" 
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-4 text-[10px] font-mono text-white/50 uppercase tracking-widest mb-8">
                <span className="w-8 h-px bg-white/30" />
                Process
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black tracking-tighter uppercase leading-[0.85]"
            >
              <span className="block chromatic-text-hover text-white">Define.</span>
              <span className="block chromatic-text-hover text-white/50">Deploy.</span>
              <span className="block chromatic-text-hover text-white/20">Scale.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
             <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 -rotate-3 rounded-sm z-0" />
             <div className="relative bg-black border border-white/20 p-8 font-mono text-xs md:text-sm text-white/70 leading-relaxed overflow-x-auto shadow-2xl z-10">
               <pre><code>{steps[activeStep].code}</code></pre>
             </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="grid lg:grid-cols-3 gap-0 border-y border-white/10"
        >
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`relative text-left p-8 lg:p-12 transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white/50 overflow-hidden group border-r border-white/10 last:border-r-0 ${
                  isActive 
                    ? "bg-white text-black" 
                    : "bg-transparent text-white hover:bg-white/5"
                }`}
              >
                <div className="flex flex-col h-full justify-between gap-16 relative z-10">
                  <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-500 ${
                    isActive ? "text-black/50" : "text-white/30 group-hover:text-white/50"
                  }`}>
                    {step.number}
                  </span>

                  <div>
                    <h3 className={`text-3xl lg:text-4xl font-display font-black uppercase tracking-tight mb-2 transition-colors duration-300 ${
                      isActive ? "text-black" : "text-white group-hover:text-white"
                    }`}>
                      {step.title}
                    </h3>
                    <span className={`text-xl font-display uppercase tracking-tight block mb-6 transition-colors duration-300 ${
                      isActive ? "text-black/50" : "text-white/30 group-hover:text-white/50"
                    }`}>
                      {step.subtitle}
                    </span>

                    <p className={`text-sm font-mono uppercase tracking-wide leading-relaxed transition-all duration-300 ${
                      isActive ? "opacity-100 text-black/70" : "opacity-60 text-white/40 group-hover:text-white/60"
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
