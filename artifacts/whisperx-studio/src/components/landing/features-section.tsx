import { useEffect, useRef, useState } from "react";

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
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Only track if within or near canvas
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Generate stable particle positions
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
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
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
      className="absolute inset-0 pointer-events-auto transition-opacity duration-1000 ease-in-out"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Cycle features automatically if user doesn't hover
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Full width with diagonal layout */}
        <div className="relative mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Capabilities
              </span>
              <h2
                className={`text-[clamp(3rem,8vw,8rem)] font-display tracking-tight leading-[0.9] transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Intelligent
                <br />
                <span className="text-muted-foreground">workers.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className={`text-lg sm:text-xl text-muted-foreground leading-relaxed transition-all duration-1000 ease-out delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                Deploy autonomous AI agents that execute complex tasks across distributed infrastructure. No supervision required.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Feature Display */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Main Viewer */}
          <div 
            className={`lg:col-span-8 xl:col-span-9 relative bg-black border border-foreground/10 min-h-[500px] lg:min-h-[600px] overflow-hidden group transition-all duration-700 ease-out flex flex-col lg:flex-row ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Left: text content */}
            <div className="relative flex-1 p-8 lg:p-14 bg-black flex flex-col justify-center">
              <ParticleVisualization />
              <div className="relative z-10">
                <span className="font-mono text-sm text-[#eca8d6] transition-colors duration-300">
                  {features[activeFeature].number}
                </span>
                <h3 className="text-4xl lg:text-5xl font-display mt-4 mb-6 transition-all duration-500 ease-out">
                  {features[activeFeature].title}
                </h3>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md mb-10 transition-all duration-500 ease-out">
                  {features[activeFeature].description}
                </p>
                <div>
                  <span className="text-5xl lg:text-7xl font-display text-white transition-all duration-500">{features[activeFeature].stats.value}</span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground font-mono mt-3">{features[activeFeature].stats.label}</span>
                </div>
              </div>
            </div>

            {/* Right: mirrored image, hidden on mobile */}
            <div className="hidden lg:block relative w-[45%] shrink-0 overflow-hidden bg-black">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ transform: "scaleX(-1) scale(1.02)" }}
              />
              {/* Fade left edge into black */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </div>
          </div>

          {/* Feature Selectors */}
          <div className={`lg:col-span-4 xl:col-span-3 flex flex-col gap-3 transition-all duration-700 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            {features.map((feature, idx) => (
              <button
                key={feature.number}
                onMouseEnter={() => setActiveFeature(idx)}
                onClick={() => setActiveFeature(idx)}
                className={`relative flex flex-col items-start text-left p-6 lg:p-8 border transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 ${
                  activeFeature === idx
                    ? "bg-foreground/[0.04] border-foreground/40"
                    : "bg-transparent border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02]"
                }`}
              >
                <div className="flex items-center gap-4 w-full mb-2">
                  <span className={`font-mono text-xs transition-colors duration-300 ${
                    activeFeature === idx ? "text-[#eca8d6]" : "text-muted-foreground"
                  }`}>
                    {feature.number}
                  </span>
                  {activeFeature === idx && (
                    <span className="h-px flex-1 bg-gradient-to-r from-[#eca8d6] to-transparent" />
                  )}
                </div>
                <h4 className={`text-xl lg:text-2xl font-display transition-colors duration-300 ${
                  activeFeature === idx ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {feature.title}
                </h4>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
