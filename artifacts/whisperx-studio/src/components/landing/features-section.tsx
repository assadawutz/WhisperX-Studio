import { useEffect, useRef, useState } from "react";
import { motion, useInView , Variants } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Autonomous Execution",
    description: "Deploy AI agents that work independently. They analyze, decide, and execute complex multi-step tasks without human intervention.",
    stats: { value: "99.7%", label: "task completion" },
  },
  {
    number: "02",
    title: "Distributed Computing",
    description: "Offload compute-heavy tasks to our global network. Your agents run on optimized infrastructure across 50+ regions worldwide.",
    stats: { value: "50+", label: "global regions" },
  },
  {
    number: "03",
    title: "Multi-Agent Orchestration",
    description: "Coordinate teams of specialized agents. They communicate, delegate, and collaborate to solve complex problems together.",
    stats: { value: "1000x", label: "parallel execution" },
  },
  {
    number: "04",
    title: "Secure Sandboxing",
    description: "Each agent runs in isolated environments. Full audit trails, encrypted execution, and zero data leakage between tasks.",
    stats: { value: "0", label: "data breaches" },
  },
];

// Floating dot particles visualization
function ParticleVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset before scaling
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const COUNT = 70;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx: ((seed * 127.1) % 1),
        by: ((seed * 311.7) % 1),
        phase: seed * Math.PI * 2,
        speed: 0.4 + (seed % 0.4),
        radius: 1.2 + (seed % 2.2),
      };
    });

    let time = 0;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 38;
        const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 24;

        const bx = p.bx * w;
        const by = p.by * h;
        const dx = p.bx - mx;
        const dy = p.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist * 2.8);

        const x = bx + flowX + influence * Math.cos(time + p.phase) * 36;
        const y = by + flowY + influence * Math.sin(time + p.phase) * 36;

        const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.18 + influence * 0.3;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 168, 214, ${alpha})`; // Hint of #eca8d6
        ctx.fill();
        
        // Connect nearby particles
        particles.forEach(other => {
          const ox = other.bx * w + Math.sin(time * other.speed * 0.4 + other.phase) * 38;
          const oy = other.by * h + Math.cos(time * other.speed * 0.3 + other.phase * 0.7) * 24;
          const d2 = Math.sqrt((x-ox)**2 + (y-oy)**2);
          if (d2 < 60) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(ox, oy);
            ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - d2/60)})`;
            ctx.stroke();
          }
        });
      });

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto transition-opacity duration-1000 ease-in-out mix-blend-screen"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mb-16 lg:mb-24"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <motion.span variants={itemVariants} className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Capabilities
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-[clamp(3rem,8vw,8rem)] font-display tracking-tight leading-[0.9]"
              >
                Intelligent
                <br />
                <span className="text-muted-foreground">workers.</span>
              </motion.h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Deploy autonomous AI agents that execute complex tasks across distributed infrastructure. No supervision required.
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="grid lg:grid-cols-12 gap-4 lg:gap-6"
        >
          <div className="lg:col-span-8 xl:col-span-9 relative bg-black border border-foreground/10 rounded-xl min-h-[500px] lg:min-h-[600px] overflow-hidden group flex flex-col lg:flex-row hover:border-foreground/30 transition-colors duration-500 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] to-transparent pointer-events-none" />
            
            <div className="relative flex-1 p-8 lg:p-14 bg-black flex flex-col justify-center">
              <ParticleVisualization />
              <div className="relative z-10">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, filter: "blur(10px)", x: -20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <span className="font-mono text-sm text-[#eca8d6] drop-shadow-[0_0_8px_rgba(236,168,214,0.5)]">
                    {features[activeFeature].number}
                  </span>
                  <h3 className="text-4xl lg:text-5xl font-display mt-4 mb-6">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md mb-10">
                    {features[activeFeature].description}
                  </p>
                  <div>
                    <span className="text-5xl lg:text-7xl font-display text-white">{features[activeFeature].stats.value}</span>
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground font-mono mt-3">{features[activeFeature].stats.label}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="hidden lg:block relative w-[45%] shrink-0 overflow-hidden bg-black">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[10s] ease-linear group-hover:scale-110"
                style={{ transform: "scaleX(-1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[#eca8d6]" />
            </div>
          </div>

          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-3">
            {features.map((feature, idx) => {
              const isActive = activeFeature === idx;
              return (
                <button
                  key={feature.number}
                  onMouseEnter={() => setActiveFeature(idx)}
                  onClick={() => setActiveFeature(idx)}
                  className={`relative flex flex-col items-start text-left p-6 lg:p-8 rounded-xl border transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 overflow-hidden ${
                    isActive
                      ? "bg-foreground/[0.04] border-foreground/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] scale-[1.02]"
                      : "bg-transparent border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02]"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="featureHighlight"
                      className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"
                    />
                  )}
                  <div className="flex items-center gap-4 w-full mb-2 relative z-10">
                    <span className={`font-mono text-xs transition-colors duration-300 ${
                      isActive ? "text-[#eca8d6]" : "text-muted-foreground"
                    }`}>
                      {feature.number}
                    </span>
                    {isActive && (
                      <motion.span 
                        layoutId="featureLine"
                        className="h-px flex-1 bg-gradient-to-r from-[#eca8d6] to-transparent" 
                      />
                    )}
                  </div>
                  <h4 className={`text-xl lg:text-2xl font-display relative z-10 transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {feature.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
