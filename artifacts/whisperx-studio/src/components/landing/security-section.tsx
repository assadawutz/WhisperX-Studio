import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { motion, useInView , Variants } from "framer-motion";

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
    <section id="security" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-background text-foreground">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24"
        >
          <span className="inline-flex items-center gap-4 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mb-8">
            <span className="w-12 h-px bg-foreground/30" />
            Security
          </span>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-display tracking-tight leading-[0.9]">
              Autonomous,
              <br />
              <span className="text-muted-foreground">not uncontrolled.</span>
            </h2>
            
            <div className="lg:pb-4">
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Your agents are powerful but constrained. Enterprise-grade security ensures they only do what you allow.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 flex flex-col gap-3 lg:gap-4 order-2 lg:order-1"
          >
            {securityFeatures.map((feature, index) => {
              const isActive = activeFeature === index;
              return (
                <motion.button
                  variants={itemVariants}
                  key={feature.title}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                  className={`text-left p-6 lg:p-8 rounded-xl border transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 relative overflow-hidden ${
                    isActive 
                      ? "border-foreground/40 bg-foreground/[0.06] shadow-[0_10px_30px_rgba(255,255,255,0.05)] scale-[1.02]" 
                      : "border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02]"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="securityHighlight"
                      className="absolute inset-0 bg-gradient-to-r from-foreground/[0.05] to-transparent pointer-events-none"
                    />
                  )}
                  <div className="flex items-center lg:items-start gap-4 lg:gap-6 relative z-10">
                    <div className={`shrink-0 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-sm transition-all duration-500 ${
                      isActive 
                        ? "bg-foreground text-background shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-110" 
                        : "bg-foreground/5 text-foreground border border-foreground/10"
                    }`}>
                      <feature.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-display mb-1 transition-colors duration-300 ${
                        isActive ? "text-foreground" : "text-foreground/80"
                      }`}>{feature.title}</h3>
                      <p className={`text-sm lg:text-base transition-colors duration-300 ${
                        isActive ? "text-muted-foreground" : "text-muted-foreground/60"
                      }`}>{feature.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 relative p-8 lg:p-14 border border-foreground/10 bg-black rounded-xl min-h-[400px] lg:min-h-[500px] overflow-hidden flex flex-col justify-between order-1 lg:order-2 shadow-2xl"
          >
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 mix-blend-screen">
               <div className="relative w-64 h-64 lg:w-96 lg:h-96 border border-white/10 rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite] group-hover:border-white/20 transition-colors duration-1000">
                 <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                 <div className="absolute inset-8 border border-dashed border-white/20 rounded-full animate-[spin_40s_linear_infinite]" />
                 
                 <div className="absolute inset-0 flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
                   <Shield className={`w-24 h-24 text-white/20 transition-all duration-500 absolute ${activeFeature === 0 ? 'opacity-100 scale-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'opacity-0 scale-50'}`} />
                   <Lock className={`w-24 h-24 text-white/20 transition-all duration-500 absolute ${activeFeature === 1 ? 'opacity-100 scale-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'opacity-0 scale-50'}`} />
                   <Eye className={`w-24 h-24 text-white/20 transition-all duration-500 absolute ${activeFeature === 2 ? 'opacity-100 scale-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'opacity-0 scale-50'}`} />
                   <FileCheck className={`w-24 h-24 text-white/20 transition-all duration-500 absolute ${activeFeature === 3 ? 'opacity-100 scale-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'opacity-0 scale-50'}`} />
                 </div>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            
            <div className="relative z-10 flex justify-between items-start">
              <span className="font-mono text-xs uppercase tracking-widest text-[#eca8d6] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#eca8d6] rounded-full animate-pulse shadow-[0_0_8px_rgba(236,168,214,0.8)]" />
                Active protection
              </span>
            </div>

            <div className="relative z-10 mt-auto pt-24 lg:pt-32">
              <div className="flex flex-col">
                <span className="text-8xl lg:text-[10rem] font-display leading-none tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:text-[#eca8d6] transition-colors duration-500 cursor-default">0</span>
                <span className="text-lg lg:text-xl text-muted-foreground mt-4 font-display">Security incidents this year</span>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-3"
              >
                {certifications.map((cert) => (
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    key={cert}
                    className="px-4 py-2 border border-white/20 rounded-full bg-white/5 text-xs font-mono text-white/70 transition-all duration-300 ease-out hover:bg-white/10 hover:text-white hover:border-white/40 cursor-default shadow-sm"
                  >
                    {cert}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
