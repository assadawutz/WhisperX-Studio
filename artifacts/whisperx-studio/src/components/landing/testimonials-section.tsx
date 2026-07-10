import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion, AnimatePresence, useInView , Variants } from "framer-motion";

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
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="dot-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono text-background/40 uppercase tracking-wider mb-6">
              <span className="w-12 h-px bg-background/20" />
              Testimonials
            </span>
            <h2 className="text-5xl lg:text-7xl font-display tracking-tight leading-[0.9]">
              Trusted by teams
              <br />
              <span className="text-background/40">worldwide.</span>
            </h2>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex items-center gap-3"
          >
            <button
              onClick={goPrev}
              className="p-4 border border-background/20 rounded-full hover:bg-background/10 hover:border-background/40 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-background/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="p-4 border border-background/20 rounded-full hover:bg-background/10 hover:border-background/40 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-background/50"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-7 relative"
          >
            <Quote className="absolute -left-2 sm:-left-8 -top-8 w-24 h-24 text-background/5 rotate-180 pointer-events-none" />
            
            <div className="relative min-h-[250px] lg:min-h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <blockquote 
                    className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display leading-[1.1] tracking-tight text-background"
                  >
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </blockquote>

                  <div className="mt-12 lg:mt-16 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-background text-foreground flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      <span className="font-display text-2xl">
                        {activeTestimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-background">{activeTestimonial.author}</p>
                      <p className="text-sm font-mono text-background/50 uppercase tracking-widest mt-1">
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
            className="lg:col-span-5 flex flex-col justify-center gap-8"
          >
            <div className="p-10 lg:p-14 border border-background/10 bg-background/5 rounded-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent pointer-events-none group-hover:from-background/20 transition-colors duration-500" />
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeIndex}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.1 }}
                   transition={{ duration: 0.5 }}
                   className="relative z-10"
                 >
                    <span className="text-7xl lg:text-8xl xl:text-[9rem] font-display block mb-4 leading-none tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      {activeTestimonial.metric.value}
                    </span>
                    <span className="text-sm font-mono uppercase tracking-widest text-background/60">
                      {activeTestimonial.metric.label}
                    </span>
                 </motion.div>
               </AnimatePresence>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className="flex-1 h-1.5 bg-background/10 rounded-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-background/50 group"
                  >
                    <div 
                      className={`h-full transition-all duration-300 ${
                        idx === activeIndex 
                          ? "bg-background shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                          : idx < activeIndex 
                            ? "bg-background/40" 
                            : "bg-transparent group-hover:bg-background/20"
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
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-background/50 active:scale-95 ${
                      idx === activeIndex 
                        ? "bg-background text-foreground shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                        : "border border-background/20 text-background/50 hover:text-background hover:border-background/40 hover:bg-background/10"
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
