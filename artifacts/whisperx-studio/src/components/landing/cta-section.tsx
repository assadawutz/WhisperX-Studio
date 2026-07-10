import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView , Variants } from "framer-motion";

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

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
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative border border-foreground/20 bg-foreground/[0.02] overflow-hidden rounded-3xl group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
            style={{
              opacity: isHovering ? 0.2 : 0,
              background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, var(--foreground), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 px-8 py-16 lg:p-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
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
                    className="w-full sm:w-auto bg-foreground hover:bg-foreground/90 text-background px-8 h-14 lg:h-16 text-base rounded-full group/btn transition-all duration-300 active:scale-95 relative overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  >
                    <span className="relative z-10 flex items-center">
                      Deploy your first agent
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#eca8d6] to-[#a78bfa] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-14 lg:h-16 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/10 hover:border-foreground/40 transition-all duration-300 active:scale-95"
                  >
                    Book a demo
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-8 font-mono uppercase tracking-widest">
                  1,000 free tasks with COMPUTE
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: -5 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="w-full max-w-[500px] lg:w-[600px] lg:-mr-16 xl:-mr-24 shrink-0 transition-transform duration-[10s] ease-linear group-hover:scale-105"
              >
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-[#eca8d6]/10 blur-[100px] rounded-full mix-blend-screen" />
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bridge-x3K8aF4XF9bU2vY9G3fD5rW6Y4Z7c.png"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_20px_rgba(236,168,214,0.3)]"
                    onError={(e) => {
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
              </motion.div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-24 lg:w-32 h-24 lg:h-32 border-b border-l border-foreground/10 rounded-bl-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 lg:w-32 h-24 lg:h-32 border-t border-r border-foreground/10 rounded-tr-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
