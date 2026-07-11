import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const features = [
  { 
    title: "TypeScript native", 
    description: "Full type safety for agent configs and responses."
  },
  { 
    title: "Streaming results", 
    description: "Watch your agents think and act in real-time."
  },
  { 
    title: "Multi-model support", 
    description: "OpenAI, Anthropic, Mistral, or bring your own."
  },
  { 
    title: "Local debugging", 
    description: "Test agents locally before deploying to cloud."
  },
];

export function DevelopersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="developers" ref={sectionRef} className="relative py-32 lg:py-48 overflow-hidden bg-black text-white border-t border-white/10">

      {/* Abstract glass shards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute right-[5%] top-[20%] w-[35vw] h-[80vh] glass-shard transform rotate-12 opacity-30 mix-blend-screen" 
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="mb-16 lg:mb-24"
            >
              <span className="inline-flex items-center gap-4 text-[10px] font-mono text-white/50 uppercase tracking-widest mb-8">
                <span className="w-8 h-px bg-white/30" />
                Developer SDK
              </span>
              <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black tracking-tighter uppercase leading-[0.85]">
                <span className="block text-white chromatic-text-hover">Code your</span>
                <span className="block text-white/40 chromatic-text-hover">agents.</span>
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p variants={itemVariants} className="text-sm md:text-base font-mono uppercase tracking-wide text-white/50 mb-16 leading-relaxed max-w-lg">
                A powerful SDK for building, deploying, and orchestrating AI agents. 
                Define behaviors in code or natural language. Drop it into any Node.js or Python environment.
              </motion.p>
              
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12 max-w-2xl border-t border-white/10 pt-12">
                {features.map((feature, i) => (
                  <motion.div
                    variants={itemVariants}
                    key={feature.title}
                    className="flex flex-col group"
                  >
                    <span className="text-[10px] font-mono text-white/30 mb-4 block">0{i+1}</span>
                    <h3 className="font-display font-bold uppercase tracking-tight text-xl mb-3 text-white transition-colors">{feature.title}</h3>
                    <p className="text-xs font-mono uppercase tracking-widest text-white/40 leading-relaxed transition-colors">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={itemVariants} className="mt-20 flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-white text-black font-mono text-[10px] uppercase tracking-widest hover:bg-white/80 transition-colors outline-none flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  npm install @compute/sdk
                </button>
                <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors outline-none">
                  Documentation
                </button>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
             transition={{ duration: 1, delay: 0.4 }}
             className="hidden lg:flex items-center justify-center relative"
          >
            <div className="w-full max-w-xl bg-black border border-white/20 overflow-hidden shadow-2xl relative z-10 glass-shard">
              <div className="flex items-center px-6 py-4 border-b border-white/10 bg-white/5">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 bg-white/20" />
                  <div className="w-2.5 h-2.5 bg-white/20" />
                  <div className="w-2.5 h-2.5 bg-white/20" />
                </div>
                <span className="ml-6 text-[10px] font-mono text-white/50 uppercase tracking-widest">agent.ts</span>
              </div>
              <div className="p-8 overflow-x-auto text-xs font-mono leading-loose relative text-white/70">
                <pre>
                  <code className="text-white/40">import</code> <code className="text-white">{"{ Agent }"}</code> <code className="text-white/40">from</code> <code className="text-white">'@compute/sdk'</code><code className="text-white/40">;</code>
                  {"\n\n"}
                  <code className="text-white/40">const</code> <code className="text-white">reviewAgent</code> <code className="text-white/40">=</code> <code className="text-white/40">new</code> <code className="text-white">Agent</code><code className="text-white/40">({"{ "}</code>
                  {"\n"}
                  <code className="text-white/40">  name: </code><code className="text-white">'CodeReviewer'</code><code className="text-white/40">,</code>
                  {"\n"}
                  <code className="text-white/40">  model: </code><code className="text-white">'gpt-4-turbo'</code><code className="text-white/40">,</code>
                  {"\n"}
                  <code className="text-white/40">  tools: [github, linear],</code>
                  {"\n"}
                  <code className="text-white/40">  system: </code><code className="text-white">'Review PRs for security flaws'</code>
                  {"\n"}
                  <code className="text-white/40">{"}"});</code>
                  {"\n\n"}
                  <code className="text-white/40">await</code> <code className="text-white">reviewAgent</code><code className="text-white/40">.</code><code className="text-white">watch</code><code className="text-white/40">({"{ "}</code>
                  {"\n"}
                  <code className="text-white/40">  repo: </code><code className="text-white">'acme/core'</code><code className="text-white/40">,</code>
                  {"\n"}
                  <code className="text-white/40">  events: [</code><code className="text-white">'pull_request.opened'</code><code className="text-white/40">]</code>
                  {"\n"}
                  <code className="text-white/40">{"}"});</code>
                </pre>
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent h-[60px] w-full animate-[scan_4s_ease-in-out_infinite] pointer-events-none mix-blend-screen" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(600%); }
        }
      `}</style>
    </section>
  );
}
