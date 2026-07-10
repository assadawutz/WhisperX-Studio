import { useEffect, useRef } from "react";
import { motion, useInView , Variants } from "framer-motion";

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
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-40 overflow-hidden bg-black text-white">

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-0 right-0 w-full lg:w-[60%] h-1/2 lg:h-[90%] pointer-events-none mix-blend-screen"
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2813%29-OQ2DiR3ElVsUg8kTvTL1kC5A3Q6maM.png"
          alt="Abstract crystalline structure"
          aria-hidden="true"
          className="w-full h-full object-cover lg:object-left-top opacity-60 animate-[float_15s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="mb-12 lg:mb-16"
            >
              <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono text-white/50 uppercase tracking-wider mb-6 lg:mb-8">
                <span className="w-12 h-px bg-white/30" />
                Developer SDK
              </span>
              <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-display tracking-tight leading-[0.9]">
                Code your agents.
                <br />
                <span className="text-white/40">Or let them code.</span>
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p variants={itemVariants} className="text-lg lg:text-xl text-white/60 mb-12 leading-relaxed max-w-lg">
                A powerful SDK for building, deploying, and orchestrating AI agents. 
                Define behaviors in code or natural language. Drop it into any Node.js or Python environment.
              </motion.p>
              
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-2xl">
                {features.map((feature) => (
                  <motion.div
                    variants={itemVariants}
                    key={feature.title}
                    className="border-l border-white/10 pl-6 hover:border-[#eca8d6] transition-colors duration-300 group"
                  >
                    <h3 className="font-display text-xl lg:text-2xl mb-2 text-white group-hover:text-[#eca8d6] transition-colors">{feature.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={itemVariants} className="mt-16 flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-black font-medium text-sm rounded-full hover:bg-[#eca8d6] hover:text-black hover:shadow-[0_0_20px_rgba(236,168,214,0.5)] transition-all duration-300 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                  npm install @compute/sdk
                </button>
                <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium text-sm rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                  Read documentation
                </button>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
             initial={{ opacity: 0, y: 50, scale: 0.95 }}
             animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
             transition={{ duration: 1, delay: 0.4 }}
             className="hidden lg:flex items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-[#a78bfa]/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="w-full max-w-lg bg-[#0a0a0a]/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden group hover:border-white/20 transition-colors duration-500 relative z-10">
              <div className="flex items-center px-4 py-3 border-b border-white/5 bg-[#111]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-4 text-xs font-mono text-white/40">agent.ts</span>
              </div>
              <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed relative">
                <pre>
                  <code className="text-[#a78bfa]">import</code> <code className="text-white">{"{ Agent }"}</code> <code className="text-[#a78bfa]">from</code> <code className="text-[#eca8d6]">'@compute/sdk'</code><code className="text-white">;</code>
                  {"\n\n"}
                  <code className="text-[#a78bfa]">const</code> <code className="text-[#67e8f9]">reviewAgent</code> <code className="text-white">=</code> <code className="text-[#a78bfa]">new</code> <code className="text-[#fbbf24]">Agent</code><code className="text-white">({"{ "}</code>
                  {"\n"}
                  <code className="text-white">  name: </code><code className="text-[#eca8d6]">'CodeReviewer'</code><code className="text-white">,</code>
                  {"\n"}
                  <code className="text-white">  model: </code><code className="text-[#eca8d6]">'gpt-4-turbo'</code><code className="text-white">,</code>
                  {"\n"}
                  <code className="text-white">  tools: [github, linear],</code>
                  {"\n"}
                  <code className="text-white">  system: </code><code className="text-[#eca8d6]">'Review PRs for security flaws'</code>
                  {"\n"}
                  <code className="text-white">{"}"});</code>
                  {"\n\n"}
                  <code className="text-[#a78bfa]">await</code> <code className="text-[#67e8f9]">reviewAgent</code><code className="text-white">.</code><code className="text-[#fbbf24]">watch</code><code className="text-white">({"{ "}</code>
                  {"\n"}
                  <code className="text-white">  repo: </code><code className="text-[#eca8d6]">'acme/core'</code><code className="text-white">,</code>
                  {"\n"}
                  <code className="text-white">  events: [</code><code className="text-[#eca8d6]">'pull_request.opened'</code><code className="text-white">]</code>
                  {"\n"}
                  <code className="text-white">{"}"});</code>
                </pre>
                
                {/* Simulated typing/highlight overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-[40px] w-full animate-[scan_3s_ease-in-out_infinite] pointer-events-none" />
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
