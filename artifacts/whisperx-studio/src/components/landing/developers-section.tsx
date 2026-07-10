import { useState, useEffect, useRef } from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-40 overflow-hidden bg-black text-white">

      {/* Image — absolute, bottom-right, behind all content */}
      <div
        className={`absolute bottom-0 right-0 w-full lg:w-[60%] h-1/2 lg:h-[90%] pointer-events-none transition-all duration-1000 ease-out delay-300 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        }`}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2813%29-OQ2DiR3ElVsUg8kTvTL1kC5A3Q6maM.png"
          alt="Abstract crystalline structure"
          aria-hidden="true"
          className="w-full h-full object-cover lg:object-left-top opacity-60 mix-blend-screen"
        />
        {/* Gradients to blend image smoothly */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
      </div>

      {/* All text content sits on top */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
          <div className="flex flex-col justify-center">
            {/* Header */}
            <div
              className={`mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
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
            </div>

            {/* Description + Features */}
            <div
              className={`transition-all duration-1000 ease-out delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-lg lg:text-xl text-white/60 mb-12 leading-relaxed max-w-lg">
                A powerful SDK for building, deploying, and orchestrating AI agents. 
                Define behaviors in code or natural language. Drop it into any Node.js or Python environment.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-2xl">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`transition-all duration-700 ease-out border-l border-white/10 pl-6 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    <h3 className="font-display text-xl lg:text-2xl mb-2 text-white">{feature.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              {/* SDK Buttons */}
              <div className={`mt-16 flex flex-wrap gap-4 transition-all duration-1000 ease-out delay-700 ${
                 isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
                <button className="px-6 py-3 bg-white text-black font-medium text-sm rounded-sm hover:bg-white/90 transition-colors active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                  npm install @compute/sdk
                </button>
                <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium text-sm rounded-sm hover:bg-white/10 hover:border-white/30 transition-colors active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                  Read documentation
                </button>
              </div>
            </div>
          </div>
          
          {/* Terminal / Code mockup representation (optional addition for visual balance) */}
          <div className={`hidden lg:flex items-center justify-center transition-all duration-1000 ease-out delay-500 ${
             isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <div className="w-full max-w-lg bg-[#0a0a0a] rounded-lg border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="flex items-center px-4 py-3 border-b border-white/5 bg-[#111]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <span className="ml-4 text-xs font-mono text-white/40">agent.ts</span>
              </div>
              <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
