import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Isolated execution",
    description: "Each agent runs in its own secure sandbox.",
    image: "/images/isolated.jpg", // Placeholder - gracefully handles missing images via styling
  },
  {
    icon: Lock,
    title: "Encrypted memory",
    description: "Data encrypted at rest and in transit.",
    image: "/images/encrypted.jpg",
  },
  {
    icon: Eye,
    title: "Full audit trails",
    description: "Every action logged and inspectable.",
    image: "/images/audit.jpg",
  },
  {
    icon: FileCheck,
    title: "Permission boundaries",
    description: "Principle of least privilege by design.",
    image: "/images/permissions.jpg",
  },
];

const certifications = ["SOC 2", "ISO 27001", "HIPAA", "GDPR"];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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

  // Cycle features slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % securityFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="security" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-background text-foreground">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className={`inline-flex items-center gap-4 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mb-8 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <span className="w-12 h-px bg-foreground/30" />
            Security
          </span>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <h2 className={`text-[clamp(3.5rem,8vw,8rem)] font-display tracking-tight leading-[0.9] transition-all duration-1000 ease-out delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Autonomous,
              <br />
              <span className="text-muted-foreground">not uncontrolled.</span>
            </h2>
            
            <div className={`transition-all duration-1000 ease-out delay-200 lg:pb-4 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Your agents are powerful but constrained. Enterprise-grade security ensures they only do what you allow.
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Feature cards stack - Reordered to be on the left for better reading flow */}
          <div className="lg:col-span-5 flex flex-col gap-3 lg:gap-4 order-2 lg:order-1">
            {securityFeatures.map((feature, index) => (
              <button
                key={feature.title}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
                className={`text-left p-6 lg:p-8 border transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 ${
                  activeFeature === index 
                    ? "border-foreground/40 bg-foreground/[0.04] shadow-lg shadow-foreground/5" 
                    : "border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02]"
                } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transform: activeFeature === index ? "translateX(4px)" : "translateX(0)" 
                }}
              >
                <div className="flex items-center lg:items-start gap-4 lg:gap-6">
                  <div className={`shrink-0 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-sm transition-all duration-500 ${
                    activeFeature === index 
                      ? "bg-foreground text-background shadow-[0_0_15px_rgba(255,255,255,0.15)]" 
                      : "bg-foreground/5 text-foreground border border-foreground/10"
                  }`}>
                    <feature.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-display mb-1 transition-colors duration-300 ${
                      activeFeature === index ? "text-foreground" : "text-foreground/80"
                    }`}>{feature.title}</h3>
                    <p className={`text-sm lg:text-base transition-colors duration-300 ${
                      activeFeature === index ? "text-muted-foreground" : "text-muted-foreground/60"
                    }`}>{feature.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Large visual card */}
          <div className={`lg:col-span-7 relative p-8 lg:p-14 border border-foreground/10 bg-black min-h-[400px] lg:min-h-[500px] overflow-hidden flex flex-col justify-between order-1 lg:order-2 transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            {/* Dynamic Abstract Visual instead of missing images */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
               {/* A subtle animated geometric shape acting as the "security" visual */}
               <div className="relative w-64 h-64 lg:w-96 lg:h-96 border border-white/10 rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite]">
                 <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                 <div className="absolute inset-8 border border-dashed border-white/20 rounded-full animate-[spin_40s_linear_infinite]" />
                 
                 {/* Center icon based on active feature */}
                 <div className="absolute inset-0 flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
                   <Shield className={`w-24 h-24 text-white/20 transition-opacity duration-500 absolute ${activeFeature === 0 ? 'opacity-100' : 'opacity-0'}`} />
                   <Lock className={`w-24 h-24 text-white/20 transition-opacity duration-500 absolute ${activeFeature === 1 ? 'opacity-100' : 'opacity-0'}`} />
                   <Eye className={`w-24 h-24 text-white/20 transition-opacity duration-500 absolute ${activeFeature === 2 ? 'opacity-100' : 'opacity-0'}`} />
                   <FileCheck className={`w-24 h-24 text-white/20 transition-opacity duration-500 absolute ${activeFeature === 3 ? 'opacity-100' : 'opacity-0'}`} />
                 </div>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            
            <div className="relative z-10 flex justify-between items-start">
              <span className="font-mono text-xs uppercase tracking-widest text-[#eca8d6] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#eca8d6] rounded-full animate-pulse" />
                Active protection
              </span>
            </div>

            <div className="relative z-10 mt-auto pt-24 lg:pt-32">
              <div className="flex flex-col">
                <span className="text-8xl lg:text-[10rem] font-display leading-none tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">0</span>
                <span className="text-lg lg:text-xl text-muted-foreground mt-4 font-display">Security incidents this year</span>
              </div>
              
              {/* Certification badges */}
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <span
                    key={cert}
                    className={`px-4 py-2 border border-white/20 bg-white/5 text-xs font-mono text-white/70 transition-all duration-700 ease-out hover:bg-white/10 hover:text-white ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 150 + 600}ms` }}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
