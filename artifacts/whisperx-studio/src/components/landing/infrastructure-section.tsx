import { useEffect, useState, useRef } from "react";

const regions = [
  { name: "North America", nodes: 12, status: "operational" },
  { name: "Europe", nodes: 8, status: "operational" },
  { name: "Asia Pacific", nodes: 6, status: "operational" },
  { name: "South America", nodes: 3, status: "operational" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRegion, setActiveRegion] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRegion((prev) => (prev + 1) % regions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="infra" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mb-8 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/30" />
            Global infrastructure
          </span>
          
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-center lg:items-stretch">
            {/* Image globe — colonne gauche */}
            <div className={`w-32 md:w-48 lg:w-72 xl:w-80 shrink-0 transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png"
                alt="Global network sphere"
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Titre + description empilés */}
            <div className="flex flex-col justify-center">
              <h2 className={`text-[clamp(3.5rem,8vw,8rem)] font-display tracking-tight leading-[0.9] transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}>
                Global by
                <br />
                <span className="text-muted-foreground">default.</span>
              </h2>

              <p className={`mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg transition-all duration-1000 ease-out delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
                Your agents run on distributed infrastructure across 29 regions.
                Sub-50ms latency to 99% of the world.
              </p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Large stat card */}
          <div className={`lg:col-span-2 relative p-8 lg:p-14 border border-foreground/10 bg-foreground/[0.02] overflow-hidden transition-all duration-1000 ease-out hover:border-foreground/30 hover:bg-foreground/[0.04] group ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            {/* Animated dots background with connecting lines */}
            <div className="absolute inset-0 opacity-70 pointer-events-none">
              {/* SVG for connecting lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: "none" }}
              >
                <defs>
                  <style>{`
                    @keyframes drawLine {
                      0%   { stroke-dashoffset: 1000; opacity: 0; }
                      15%  { opacity: 1; }
                      70%  { opacity: 0.7; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .connecting-line {
                      stroke: #eca8d6;
                      stroke-width: 1.2;
                      fill: none;
                      stroke-dasharray: 1000;
                      animation: drawLine 4s ease-in-out infinite;
                    }
                  `}</style>
                </defs>
                {[...Array(19)].map((_, i) => {
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
                      className="connecting-line transition-opacity duration-500 group-hover:opacity-100"
                      style={{ animationDelay: `${i * 0.15}s`, opacity: 0.5 }}
                    />
                  );
                })}
              </svg>

              {/* Dots */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#eca8d6] transition-transform duration-500 group-hover:scale-150"
                  style={{
                    left: `${10 + (i % 5) * 20}%`,
                    top: `${10 + Math.floor(i / 5) * 25}%`,
                    animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[clamp(4rem,10vw,10rem)] font-display leading-none">29</span>
                <span className="text-xl lg:text-3xl text-muted-foreground font-display">regions</span>
              </div>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Compute nodes distributed globally for maximum redundancy and minimum latency.
              </p>
            </div>
          </div>

          {/* Stacked stat cards */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className={`p-8 lg:p-10 border border-foreground/10 bg-foreground/[0.02] transition-all duration-1000 ease-out hover:border-foreground/30 hover:bg-foreground/[0.04] group delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>
              <span className="text-5xl lg:text-6xl xl:text-7xl font-display group-hover:text-[#eca8d6] transition-colors duration-500">99.99%</span>
              <span className="block text-xs uppercase tracking-wider font-mono text-muted-foreground mt-4">Uptime SLA</span>
            </div>
            
            <div className={`p-8 lg:p-10 border border-foreground/10 bg-foreground/[0.02] transition-all duration-1000 ease-out hover:border-foreground/30 hover:bg-foreground/[0.04] group delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>
              <span className="text-5xl lg:text-6xl xl:text-7xl font-display group-hover:text-[#67e8f9] transition-colors duration-500">&lt;50ms</span>
              <span className="block text-xs uppercase tracking-wider font-mono text-muted-foreground mt-4">Global latency</span>
            </div>
          </div>
        </div>

        {/* Region list */}
        <div className={`mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 ease-out delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {regions.map((region, index) => (
            <button
              key={region.name}
              onClick={() => setActiveRegion(index)}
              onMouseEnter={() => setActiveRegion(index)}
              className={`text-left p-6 border transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 ${
                activeRegion === index 
                  ? "border-foreground/40 bg-foreground/[0.06] shadow-lg shadow-foreground/5" 
                  : "border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02]"
              }`}
              style={{
                transform: activeRegion === index ? "translateY(-2px)" : "translateY(0)"
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                  activeRegion === index ? "bg-[#eca8d6] shadow-[0_0_8px_rgba(236,168,214,0.8)]" : "bg-foreground/20"
                }`} />
                <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${
                  activeRegion === index ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {region.status}
                </span>
              </div>
              <span className={`font-display text-2xl block mb-1 transition-colors duration-300 ${
                activeRegion === index ? "text-foreground" : "text-foreground/80"
              }`}>{region.name}</span>
              <span className="text-sm text-muted-foreground font-mono">{region.nodes} nodes</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
