import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const words = ["automate", "delegate", "execute", "scale"];

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const STAGGER = 45;      // ms between each letter
  const DURATION = 500;    // blur+opacity fade duration per letter
  const GRADIENT_HOLD = STAGGER * letters.length + DURATION + 200;

  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );
  const [showGradient, setShowGradient] = useState(true);
  const framesRef = useRef<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];

    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);

    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates(prev => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(tick);
            framesRef.current.push(id);
          }
        };
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      }, i * STAGGER);
      timersRef.current.push(t);
    });

    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD);
    timersRef.current.push(gt);

    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const gradientColors = ["#eca8d6", "#a78bfa", "#67e8f9", "#fbbf24", "#eca8d6"];

  return (
    <>
      {letters.map((char, i) => {
        const colorIndex = (i / Math.max(letters.length - 1, 1)) * (gradientColors.length - 1);
        const lower = Math.floor(colorIndex);
        const upper = Math.min(lower + 1, gradientColors.length - 1);
        const t = colorIndex - lower;

        const hex2rgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
        };
        const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
        const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return (
          <span
            key={i}
            className="chromatic-text-hover"
            style={{
              display: "inline-block",
              opacity: letterStates[i]?.opacity ?? 0,
              filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : "white",
              transition: "color 0.4s ease",
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-center items-start overflow-hidden bg-black text-white px-6 lg:px-12 pt-32 pb-24">
      {/* Abstract glass shards */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 1, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[30vw] h-[60vh] glass-shard transform rotate-12 -translate-x-1/2"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] right-[10%] w-[40vw] h-[50vh] glass-shard-strong transform -rotate-6 translate-x-1/4"
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full flex flex-col items-center justify-center flex-1 min-h-0">
        <div className="w-full flex justify-end pr-4 md:pr-12 mb-2 md:mb-4">
          <div className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/50 text-right space-y-1">
            <p>Agents that</p>
            <p className="italic font-sans lowercase text-white/40">dominate workflows</p>
          </div>
        </div>
        <div className="w-full relative">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-display font-black leading-[0.8] tracking-tighter uppercase w-full flex flex-col"
            style={{ fontSize: "clamp(3rem, 12vw, 14rem)" }}
          >
            <span className="block text-white chromatic-text-hover">
              Distributed
            </span>
            <span className="block text-white chromatic-text-hover">
              Compute
            </span>
            <span className="block relative">
              <span className="absolute inset-0 flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/0 pointer-events-none mix-blend-screen chromatic-text blur-[2px]">
                <BlurWord word={words[wordIndex]} trigger={wordIndex} />
              </span>
              <span className="relative z-10 flex justify-center">
                <BlurWord word={words[wordIndex]} trigger={wordIndex} />
              </span>
            </span>
          </motion.h1>
        </div>
      </motion.div>
      
      <div className="relative z-20 w-full mt-auto pt-16 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
        <div className="flex flex-col gap-1 max-w-sm">
          <p className="text-xs md:text-sm font-mono text-white/60 leading-relaxed uppercase tracking-widest">
            Autonomous AI agents for distributed computing.
          </p>
          <p className="text-[10px] md:text-xs font-mono text-white/30 italic">
            Fig. 1 — The scale of operation.
          </p>
        </div>

        <div className="flex items-center gap-8 lg:gap-16">
          {[
            { value: "3500+", label: "active agents" },
            { value: "99.7%", label: "uptime" },
            { value: "<50ms", label: "latency" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: "easeOut" }}
              className="flex flex-col gap-1 text-right"
            >
              <span className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tighter uppercase">
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/40 font-mono uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
