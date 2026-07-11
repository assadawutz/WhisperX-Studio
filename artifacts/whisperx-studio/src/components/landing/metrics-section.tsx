import { useEffect, useState, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

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
      <span className="text-white/40 mr-1 font-display font-light">{prefix}</span>
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
      <span className="text-white/40 ml-1 font-display font-light">{suffix}</span>
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
      const gridSize = 80;
      const time = timeRef.current;
      
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const pulseY = (time * 40) % height;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
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
      const cols = Math.floor(W / 4); // Denser

      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        const raw = baseline + amplitude * Math.sin(i * freq1 + t) * Math.cos(i * freq2 + t * freqT);
        const v = Math.max(0, Math.min(1, raw));
        const dotY = H - v * H;
        const x = i * 4;
        
        if (i === 0) ctx.moveTo(x, dotY);
        else ctx.lineTo(x, dotY);
      }
      ctx.strokeStyle = color === "pink" ? "rgba(236,168,214,0.4)" : "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

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
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-black text-white border-t border-white/10">
      <GridBackground />

      {/* Abstract glass shards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, -20, 0], y: [0, 30, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute right-[5%] bottom-[10%] w-[35vw] h-[50vh] glass-shard transform rotate-12 opacity-40" 
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24"
        >
          <div>
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <span className="flex items-center gap-2 px-3 py-1 bg-white/10 text-white text-[10px] font-mono tracking-widest uppercase border border-white/20">
                <span className="w-1.5 h-1.5 bg-white animate-pulse" />
                LIVE
              </span>
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                {time ? `${time.toLocaleTimeString("en-GB")} UTC` : ""}
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black tracking-tighter uppercase leading-[0.85] w-full">
              <span className="block text-white chromatic-text-hover">Real-time</span>
              <span className="block text-white/40 chromatic-text-hover">metrics.</span>
            </motion.h2>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="w-full mb-0 relative lg:h-[400px] bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden flex items-center justify-center p-8"
        >
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
           <div className="absolute inset-0 flex items-center justify-center opacity-60">
             <DotGraph color="pink" height={200} freq1={0.05} freq2={0.02} freqT={0.1} speed={0.01} baseline={0.5} amplitude={0.4} />
           </div>
           <div className="relative z-20 text-center">
             <span className="text-xl md:text-3xl font-display font-light text-white/60 tracking-tight uppercase">System Throughput</span>
           </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-0 border-x border-b border-white/10 relative z-20 bg-black/60 backdrop-blur-md"
        >
          <motion.div variants={itemVariants} className="lg:col-span-1 border-r border-white/10 p-8 lg:p-12 transition-all duration-500 ease-out hover:bg-white group flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-white/50 font-mono uppercase tracking-widest mb-4 group-hover:text-black/50 transition-colors">{metrics[0].sublabel}</div>
              <div className="text-2xl font-display font-bold uppercase tracking-tight text-white mb-12 group-hover:text-black transition-colors">{metrics[0].label}</div>
            </div>
            
            <div className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-white group-hover:text-black transition-colors duration-500">
              <AnimatedNumber end={metrics[0].value} suffix={metrics[0].suffix} prefix={metrics[0].prefix} />
            </div>
          </motion.div>

          {metrics.slice(1).map((metric, index) => (
            <motion.div
              variants={itemVariants}
              key={metric.label}
              className="border-r last:border-r-0 border-white/10 p-8 lg:p-12 flex flex-col items-start justify-between transition-all duration-500 ease-out hover:bg-white group"
            >
              <div className="w-full">
                <div className="text-[10px] text-white/50 font-mono uppercase tracking-widest mb-4 group-hover:text-black/50 transition-colors">{metric.sublabel}</div>
                <div className="text-2xl font-display font-bold uppercase tracking-tight text-white mb-12 group-hover:text-black transition-colors">{metric.label}</div>
              </div>
              <div className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-white group-hover:text-black transition-colors duration-500 w-full">
                <AnimatedNumber end={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-6 text-[10px] font-mono text-white/30 uppercase tracking-widest"
        >
          <span className="hover:text-white transition-colors cursor-default">OpenAI GPT-4 Turbo</span>
          <span className="hover:text-white transition-colors cursor-default">Anthropic Claude 3.5</span>
          <span className="hover:text-white transition-colors cursor-default">Mistral Large</span>
          <span className="hover:text-white transition-colors cursor-default">Llama 3.1</span>
          <span className="text-white/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white animate-pulse" />
            +12 more models
          </span>
        </motion.div>
      </div>
    </section>
  );
}
