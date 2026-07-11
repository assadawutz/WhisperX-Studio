import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";

const securityFeatures = [
  {
    icon: Shield,
    title: "Isolated execution",
    description: "Each agent runs in its own secure sandbox.",
  },
  {
    icon: Lock,
    title: "Encrypted memory",
    description: "Data encrypted at rest and in transit.",
  },
  {
    icon: Eye,
    title: "Full audit trails",
    description: "Every action logged and inspectable.",
  },
  {
    icon: FileCheck,
    title: "Permission boundaries",
    description: "Principle of least privilege by design.",
  },
];

const certifications = ["SOC 2", "ISO 27001", "HIPAA", "GDPR"];

export function SecuritySection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % securityFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="security" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-black text-white border-t border-white/10">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-32 flex flex-col lg:flex-row justify-between items-end gap-12"
        >
          <div>
            <span className="inline-flex items-center gap-4 text-[10px] font-mono text-white/50 uppercase tracking-widest mb-8">
              <span className="w-8 h-px bg-white/30" />
              Security
            </span>
            
            <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black tracking-tighter uppercase leading-[0.85]">
              <span className="block text-white chromatic-text-hover">Autonomous,</span>
              <span className="block text-white/40 chromatic-text-hover">not uncontrolled.</span>
            </h2>
          </div>
          
          <div className="lg:pb-4">
            <p className="text-sm md:text-base font-mono uppercase tracking-wide text-white/50 leading-relaxed max-w-sm">
              Your agents are powerful but constrained. Enterprise-grade security ensures they only do what you allow.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-0 border border-white/10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10"
          >
            {securityFeatures.map((feature, index) => {
              const isActive = activeFeature === index;
              return (
                <motion.button
                  variants={itemVariants}
                  key={feature.title}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                  className={`text-left p-8 lg:p-10 border-b border-white/10 last:border-b-0 transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white/50 relative overflow-hidden flex flex-col justify-center h-full ${
                    isActive 
                      ? "bg-white text-black" 
                      : "bg-transparent text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start gap-6 relative z-10">
                    <div className={`shrink-0 w-12 h-12 flex items-center justify-center transition-all duration-500 ${
                      isActive ? "text-black" : "text-white/40"
                    }`}>
                      <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-display font-bold uppercase tracking-tight mb-2 transition-colors duration-300 ${
                        isActive ? "text-black" : "text-white/80"
                      }`}>{feature.title}</h3>
                      <p className={`text-xs font-mono uppercase tracking-widest transition-colors duration-300 ${
                        isActive ? "text-black/60" : "text-white/40"
                      }`}>{feature.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 relative p-8 lg:p-16 bg-black min-h-[500px] overflow-hidden flex flex-col justify-between"
          >
            {/* Visualizer */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
               <div className="relative w-[150%] aspect-square border border-white/5 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite] group-hover:border-white/20 transition-colors duration-1000">
                 <div className="absolute inset-12 border border-white/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                 <div className="absolute inset-24 border border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />
                 
                 <div className="absolute inset-0 flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
                   <Shield className={`w-32 h-32 text-white transition-all duration-700 absolute ${activeFeature === 0 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-50 blur-md'}`} strokeWidth={1} />
                   <Lock className={`w-32 h-32 text-white transition-all duration-700 absolute ${activeFeature === 1 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-50 blur-md'}`} strokeWidth={1} />
                   <Eye className={`w-32 h-32 text-white transition-all duration-700 absolute ${activeFeature === 2 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-50 blur-md'}`} strokeWidth={1} />
                   <FileCheck className={`w-32 h-32 text-white transition-all duration-700 absolute ${activeFeature === 3 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-50 blur-md'}`} strokeWidth={1} />
                 </div>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
               <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
            </div>
            
            <div className="relative z-10 flex justify-end items-start w-full">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 border border-white/20 px-3 py-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Active protection
              </span>
            </div>

            <div className="relative z-10 mt-auto flex flex-col lg:flex-row justify-between items-end gap-12">
              <div className="flex flex-col">
                <span className="text-[8rem] lg:text-[12rem] font-display font-black leading-[0.8] tracking-tighter text-white">0</span>
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 mt-4">Security incidents this year</span>
              </div>
              
              <div className="flex flex-col items-start lg:items-end gap-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Certifications</span>
                <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                  {certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1 border border-white/20 bg-white/5 text-[10px] font-mono text-white/70 uppercase tracking-widest"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
