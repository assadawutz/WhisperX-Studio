import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-40 overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground/20 bg-foreground/[0.02] transition-all duration-1000 ease-out overflow-hidden ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
            style={{
              opacity: isHovering ? 0.15 : 0,
              background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, var(--foreground), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 px-8 py-16 lg:p-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
              {/* Left content */}
              <div className="flex-1 w-full text-center lg:text-left">
                <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">
                  <span className="w-8 h-px bg-foreground/30 hidden lg:block" />
                  Get Started
                </span>
                
                <h2 className="text-[clamp(3.5rem,7vw,6.5rem)] font-display tracking-tight mb-8 leading-[0.95]">
                  Ready to delegate
                  <br className="hidden md:block" />
                  to AI agents?
                </h2>

                <p className="text-lg lg:text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Join teams automating complex workflows with COMPUTE agents. 
                  Deploy your first agent in minutes.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-foreground hover:bg-foreground/90 text-background px-8 h-14 lg:h-16 text-base rounded-full group transition-all duration-300 active:scale-95"
                  >
                    Deploy your first agent
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-14 lg:h-16 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300 active:scale-95"
                  >
                    Book a demo
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-8 font-mono uppercase tracking-widest">
                  1,000 free tasks with COMPUTE
                </p>
              </div>

              {/* Right image */}
              <div className="w-full max-w-[500px] lg:w-[600px] lg:-mr-16 xl:-mr-24 shrink-0 transition-transform duration-1000 ease-out hover:scale-105">
                <div className="relative aspect-square">
                  <img
                    src="/images/bridge.png"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain mix-blend-screen"
                    onError={(e) => {
                      // Fallback visual if bridge.png is missing
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if(parent) {
                        parent.innerHTML = `
                          <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-full h-full rounded-full border border-foreground/10 animate-[spin_40s_linear_infinite] relative">
                               <div class="absolute inset-8 rounded-full border border-dashed border-foreground/20 animate-[spin_30s_linear_infinite_reverse]"></div>
                               <div class="absolute inset-16 rounded-full border border-foreground/10 animate-[spin_20s_linear_infinite]"></div>
                            </div>
                            <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-0 right-0 w-24 lg:w-32 h-24 lg:h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-24 lg:w-32 h-24 lg:h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
