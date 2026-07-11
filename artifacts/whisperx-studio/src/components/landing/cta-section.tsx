import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 overflow-hidden bg-black text-white border-t border-white/10">
      
      {/* Intense glass shard background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute left-[10%] top-[10%] w-[80vw] h-[80vh] glass-shard-strong transform -rotate-12 opacity-40 mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-4 text-[10px] font-mono text-white/50 uppercase tracking-widest mb-12">
            <span className="w-8 h-px bg-white/30" />
            Get Started
            <span className="w-8 h-px bg-white/30" />
          </span>
          
          <h2 className="text-[clamp(4rem,10vw,12rem)] font-display font-black tracking-tighter uppercase leading-[0.8] mb-12">
            <span className="block text-white chromatic-text-hover">Ready</span>
            <span className="block text-white/60 chromatic-text-hover">to</span>
            <span className="block text-white/20 chromatic-text-hover">delegate?</span>
          </h2>

          <p className="text-sm md:text-base font-mono uppercase tracking-wide text-white/50 mb-16 leading-relaxed max-w-2xl mx-auto">
            Join teams automating complex workflows with COMPUTE agents. 
            Deploy your first agent in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-white text-black px-12 py-5 text-[10px] font-mono uppercase tracking-widest hover:bg-white/80 transition-colors flex items-center justify-center gap-4 group">
              Deploy your first agent
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </button>
            <button className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-12 py-5 text-[10px] font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Book a demo
            </button>
          </div>

          <p className="text-[9px] text-white/30 mt-12 font-mono uppercase tracking-widest">
            1,000 free tasks with COMPUTE
          </p>
        </motion.div>
      </div>
    </section>
  );
}
