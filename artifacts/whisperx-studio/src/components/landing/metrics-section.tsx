import { useEffect, useState, useRef } from "react";
import { motion, useInView , Variants } from "framer-motion";

const metrics = [
  { 
    value: 12847392, 
    suffix: "", 
    prefix: "",
    label: "Tasks completed today",
    sublabel: "by 23,847 active agents",
  },
  { 
    value: 99, 
    suffix: ".99%", 
    prefix: "",
    label: "Availability",
    sublabel: "across all regions",
  },
  { 
    value: 340, 
    suffix: "ms", 
    prefix: "<",
    label: "Average execution",
    sublabel: "p99 latency",
  },
];

function AnimatedNumber({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [isScrambling, setIsScrambling] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2500;
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(eased * end));
        setIsScrambling(progress < 0.8);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [end, isInView]);

  const displayValue = count.toLocaleString();

  return (
    <div ref={ref} className="inline-flex items-baseline">
      <span className="text-muted-foreground mr-1">{prefix}</span>
      <span className="tabular-nums tracking-tighter">
        {displayValue.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block transition-all duration-150 ${
              isScrambling && char !== "," ? "blur-[2px] opacity-70" : "blur-0 opacity-100"
            }`}
          >
            {char}
          </span>
        ))}
      </span>
      <span className="text-muted-foreground ml-1">{suffix}</span>
    </div>
  );
}

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);
      const gridSize = 60;
      const time = timeRef.current;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const wave = Math.sin(x * 0.01 + y * 0.01 + time) * 0.5 + 0.5;
          const size = 1 + wave * 2;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
          ctx.fill();
        }
      }
      const pulseY = (time * 30) % height;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(width, pulseY);
      ctx.stroke();
      timeRef.current += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function DotGraph({
  color = "white",
  height = 32,
  freq1 = 0.35,
  freq2 = 0.12,
  freqT = 0.7,
  speed = 0.025,
  baseline = 0.3,
  amplitude = 0.5,
}: {
  color?: string;
  height?: number;
  freq1?: number;
  freq2?: number;
  freqT?: number;
  speed?: number;
  baseline?: number;
  amplitude?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(Math.random() * 100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth || 300;
    const H = height;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      const t = timeRef.current;
      const cols = Math.floor(W / 8);

      for (let i = 0; i < cols; i++) {
        const raw = baseline + amplitude * Math.sin(i * freq1 + t) * Math.cos(i * freq2 + t * freqT);
        const v = Math.max(0, Math.min(1, raw));
        const dotY = H - 4 - v * (H - 8);
        const x = i * 8 + 4;
        const alpha = 0.15 + v * 0.55;
        const r = 1.5 + v * 1.2;

        ctx.beginPath();
        ctx.arc(x, dotY, r, 0, Math.PI * 2);
        ctx.fillStyle = color === "pink"
          ? `rgba(236, 168, 214, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      timeRef.current += speed;
      frameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameRef.current);
  }, [color, height, freq1, freq2, freqT, speed, baseline, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: `${height}px`, display: "block" }}
    />
  );
}

export function MetricsSection() {
  const [time, setTime] = useState<Date | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-black">
      <GridBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-24"
        >
          <div className="lg:col-span-8 lg:col-start-1">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <span className="flex items-center gap-2 px-3 py-1 bg-[#eca8d6]/10 text-[#eca8d6] text-xs font-mono rounded-sm border border-[#eca8d6]/20 shadow-[0_0_15px_rgba(236,168,214,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#eca8d6] shadow-[0_0_8px_rgba(236,168,214,1)] animate-pulse" />
                LIVE
              </span>
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                {time ? `${time.toLocaleTimeString("en-GB")} UTC` : ""}
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-[clamp(3.5rem,8vw,9rem)] font-display tracking-tight leading-[0.95] text-white">
              Real-time
              <br />
              <span className="text-muted-foreground">agent metrics.</span>
            </motion.h2>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="w-full mb-0 relative"
        >
          <div className="absolute inset-0 bg-[#eca8d6]/5 blur-[100px] rounded-full mix-blend-screen" />
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/real-time-graph-INFmn3u0MlUwvNPynoIhwxtPaPjxM5.png"
            alt="Real-time visual graph"
            aria-hidden="true"
            className="w-full h-auto object-cover opacity-90 mix-blend-screen"
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:-mt-12 relative z-20"
        >
          <motion.div variants={itemVariants} className="lg:col-span-1 bg-black/80 backdrop-blur-xl border border-foreground/20 p-10 lg:p-14 transition-all duration-500 ease-out hover:bg-black hover:border-foreground/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group rounded-xl">
            <div className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight mb-6 whitespace-nowrap overflow-hidden group-hover:text-[#eca8d6] transition-colors duration-500 group-hover:drop-shadow-[0_0_20px_rgba(236,168,214,0.4)] text-white">
              <AnimatedNumber end={metrics[0].value} suffix={metrics[0].suffix} prefix={metrics[0].prefix} />
            </div>
            <div className="mb-8 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
              <DotGraph color="pink" height={40} freq1={0.28} freq2={0.09} freqT={0.5} speed={0.018} baseline={0.35} amplitude={0.55} />
            </div>
            <div className="text-xl lg:text-2xl font-display text-white mb-2">{metrics[0].label}</div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{metrics[0].sublabel}</div>
          </motion.div>

          {metrics.slice(1).map((metric, index) => (
            <motion.div
              variants={itemVariants}
              key={metric.label}
              className="bg-black/80 backdrop-blur-xl border border-foreground/10 p-8 flex flex-col items-start justify-between gap-8 transition-all duration-500 ease-out hover:bg-black hover:border-foreground/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-2 group rounded-xl"
            >
              <div className="w-full">
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-3">{metric.sublabel}</div>
                <div className="text-lg lg:text-xl font-display text-white mb-4">{metric.label}</div>
                <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <DotGraph
                    color="white"
                    height={28}
                    freq1={index === 0 ? 0.45 : 0.22}
                    freq2={index === 0 ? 0.18 : 0.07}
                    freqT={index === 0 ? 1.1 : 0.4}
                    speed={index === 0 ? 0.032 : 0.015}
                    baseline={index === 0 ? 0.4 : 0.25}
                    amplitude={index === 0 ? 0.45 : 0.6}
                  />
                </div>
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight w-full transition-transform duration-500 group-hover:-translate-y-1 text-white">
                <AnimatedNumber end={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-20 pt-8 border-t border-foreground/10 flex flex-wrap items-center gap-x-12 gap-y-6 text-xs font-mono text-muted-foreground uppercase tracking-widest"
        >
          <span className="hover:text-white transition-colors cursor-default">OpenAI GPT-4 Turbo</span>
          <span className="hover:text-white transition-colors cursor-default">Anthropic Claude 3.5</span>
          <span className="hover:text-white transition-colors cursor-default">Mistral Large</span>
          <span className="hover:text-white transition-colors cursor-default">Llama 3.1</span>
          <span className="text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            +12 more models
          </span>
        </motion.div>
      </div>
    </section>
  );
}
