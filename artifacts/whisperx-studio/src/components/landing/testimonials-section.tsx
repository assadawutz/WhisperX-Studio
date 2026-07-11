import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";

const testimonials = [
  {
    quote: "Our agents handle 80% of our customer support tickets autonomously. The ROI was immediate.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Meridian Labs",
    metric: { value: "80%", label: "Ticket resolution" },
  },
  {
    quote: "We deployed research agents that work 24/7. They surface insights we'd never find manually.",
    author: "Marcus Webb",
    role: "Head of Research",
    company: "Flux Systems",
    metric: { value: "10x", label: "Research output" },
  },
  {
    quote: "The multi-agent orchestration is incredible. Complex workflows that took weeks now run in hours.",
    author: "Elena Rodriguez",
    role: "VP Engineering",
    company: "Beacon AI",
    metric: { value: "40x", label: "Faster workflows" },
  },
  {
    quote: "Security was our biggest concern. The sandboxing and audit trails gave us full confidence.",
    author: "James Liu",
    role: "CISO",
    company: "Prism Analytics",
    metric: { value: "0", label: "Security incidents" },
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 8000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    resetTimer();
  };

  const goPrev = () => {
    setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length);
    resetTimer();
  };

  const goNext = () => {
    setActiveIndex((activeIndex + 1) % testimonials.length);
    resetTimer();
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 bg-black text-white overflow-hidden border-t border-white/10">
      
      {/* Abstract glass shards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -right-[15%] top-[20%] w-[45vw] h-[75vh] glass-shard transform rotate-12 opacity-30 mix-blend-screen" 
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 lg:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-4 text-[10px] font-mono text-white/50 uppercase tracking-widest mb-8">
              <span className="w-8 h-px bg-white/30" />
              Testimonials
            </span>
            <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black tracking-tighter uppercase leading-[0.85]">
              <span className="block text-white chromatic-text-hover">Trusted by</span>
              <span className="block text-white/40 chromatic-text-hover">the best.</span>
            </h2>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex items-center gap-2"
          >
            <button
              onClick={goPrev}
              className="p-4 border border-white/20 text-white/50 hover:text-white hover:bg-white/5 active:scale-95 transition-all outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              className="p-4 border border-white/20 text-white/50 hover:text-white hover:bg-white/5 active:scale-95 transition-all outline-none"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-8 relative"
          >
            <div className="relative min-h-[300px] lg:min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <blockquote 
                    className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-medium leading-[1.1] tracking-tight text-white mb-12 uppercase"
                  >
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-6 mt-16">
                    <div className="w-16 h-16 bg-white text-black flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-3xl uppercase">
                        {activeTestimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold uppercase text-white tracking-tight">{activeTestimonial.author}</p>
                      <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest mt-1">
                        {activeTestimonial.role}, {activeTestimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div className="p-10 lg:p-14 border border-white/10 relative overflow-hidden group h-full flex flex-col justify-center glass-shard-strong">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeIndex}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.05 }}
                   transition={{ duration: 0.5 }}
                   className="relative z-10 flex flex-col items-start"
                 >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-6 block">
                      {activeTestimonial.metric.label}
                    </span>
                    <span className="text-[6rem] lg:text-[8rem] font-display font-black leading-none tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      {activeTestimonial.metric.value}
                    </span>
                 </motion.div>
               </AnimatePresence>
            </div>

            <div className="mt-12 flex flex-col gap-8">
              <div className="flex gap-1">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className="flex-1 h-1 bg-white/10 overflow-hidden outline-none group cursor-pointer"
                  >
                    <div 
                      className={`h-full transition-all duration-300 ${
                        idx === activeIndex 
                          ? "bg-white" 
                          : idx < activeIndex 
                            ? "bg-white/40" 
                            : "bg-transparent group-hover:bg-white/20"
                      }`}
                      style={idx === activeIndex ? { 
                        width: '100%', 
                        animation: 'progress 8s linear forwards' 
                      } : {
                        width: idx < activeIndex ? '100%' : '0%'
                      }}
                    />
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 lg:gap-3">
                {testimonials.map((t, idx) => (
                  <button
                    key={t.company}
                    onClick={() => goTo(idx)}
                    className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 outline-none border ${
                      idx === activeIndex 
                        ? "bg-white text-black border-white" 
                        : "border-white/20 text-white/50 hover:text-white hover:border-white/40 hover:bg-white/5"
                    }`}
                  >
                    {t.company}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
