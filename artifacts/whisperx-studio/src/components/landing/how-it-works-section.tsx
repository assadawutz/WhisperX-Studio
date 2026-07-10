import { useEffect, useRef, useState } from "react";
import { motion, useInView , Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Define",
    subtitle: "your agent",
    description: "Describe what your agent should do. Set its capabilities, constraints, and goals in natural language or code.",
    code: `const researcher = new Agent({
  role: 'Research Analyst',
  capabilities: ['web', 'docs', 'api'],
  memory: true,
  autonomy: 'full'
})`,
  },
  {
    number: "02",
    title: "Assign",
    subtitle: "the task",
    description: "Give your agent a mission. It breaks down complex tasks into steps and executes them autonomously.",
    code: `await researcher.execute({
  task: 'Analyze competitor pricing',
  sources: ['public-data', 'news'],
  output: 'structured-report',
  deadline: '2h'
})`,
  },
  {
    number: "03",
    title: "Monitor",
    subtitle: "& scale",
    description: "Track progress in real-time. Spin up more agents as needed. Pay only for compute used.",
    code: `optimus.dashboard({
  agents: [researcher],
  metrics: ['tasks', 'latency', 'cost'],
  alerts: true
})
// 847 tasks completed today`,
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
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-[120px] pointer-events-none mix-blend-screen" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-purple-500/[0.02] blur-[150px] pointer-events-none mix-blend-screen" 
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative mb-12 lg:mb-0 grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
          <div className="overflow-hidden pb-0 lg:pb-32">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono text-white/40 uppercase tracking-wider mb-8">
                <span className="w-12 h-px bg-white/20" />
                Process
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[clamp(3.5rem,8vw,8rem)] font-display tracking-tight leading-[0.85]"
            >
              <span className="block hover:text-[#eca8d6] transition-colors duration-500 cursor-default">Define.</span>
              <span className="block text-white/40 hover:text-[#a78bfa] transition-colors duration-500 cursor-default">Deploy.</span>
              <span className="block text-white/10 hover:text-white transition-colors duration-500 cursor-default">Scale.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative h-[280px] lg:h-[640px] overflow-hidden"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tree-uAia6REvB137CQyHFCf0za3O6h2zKO.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-full lg:w-auto h-full object-contain object-bottom lg:object-right-bottom animate-[float_6s_ease-in-out_infinite]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.09_0.01_260)] via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.01_260)] via-transparent to-transparent pointer-events-none lg:hidden" />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="grid lg:grid-cols-3 gap-4"
        >
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`relative text-left p-8 lg:p-12 border rounded-xl transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white/50 overflow-hidden group ${
                  isActive 
                    ? "bg-[#000000] border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.5)] scale-[1.02] z-10" 
                    : "bg-[#000000] border-white/10 hover:border-white/30 hover:bg-[#000000]/80"
                }`}
              >
                {isActive && (
                   <motion.div 
                    layoutId="stepGlow"
                    className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" 
                   />
                )}
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <span className={`text-4xl lg:text-5xl font-display transition-colors duration-500 ${
                    isActive ? "text-[#eca8d6] drop-shadow-[0_0_10px_rgba(236,168,214,0.5)]" : "text-white/20 group-hover:text-white/40"
                  }`}>
                    {step.number}
                  </span>
                  <div className="flex-1 h-px bg-white/10 overflow-hidden">
                    {isActive && (
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-[#eca8d6]/60 to-[#a78bfa]/60 shadow-[0_0_5px_rgba(236,168,214,0.5)]" 
                      />
                    )}
                  </div>
                </div>

                <h3 className={`text-3xl lg:text-4xl font-display mb-2 relative z-10 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/60 group-hover:text-white/80"
                }`}>
                  {step.title}
                </h3>
                <span className={`text-xl lg:text-2xl font-display block mb-6 relative z-10 transition-colors duration-300 ${
                  isActive ? "text-white/60" : "text-white/30 group-hover:text-white/50"
                }`}>
                  {step.subtitle}
                </span>

                <p className={`text-base lg:text-lg leading-relaxed relative z-10 transition-all duration-300 ${
                  isActive ? "opacity-100 text-white/70" : "opacity-60 text-white/40 group-hover:text-white/60"
                }`}>
                  {step.description}
                </p>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#eca8d6] to-[#a78bfa] transition-transform duration-700 ease-out origin-left ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`} />
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
