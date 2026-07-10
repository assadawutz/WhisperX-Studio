import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

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
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleTransition((activeIndex + 1) % testimonials.length);
    }, 8000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  const handleTransition = (newIndex: number) => {
    if (isAnimating || newIndex === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500); // match transition duration
  };

  const goTo = (index: number) => {
    handleTransition(index);
    resetTimer();
  };

  const goPrev = () => {
    handleTransition((activeIndex - 1 + testimonials.length) % testimonials.length);
    resetTimer();
  };

  const goNext = () => {
    handleTransition((activeIndex + 1) % testimonials.length);
    resetTimer();
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-foreground text-background overflow-hidden">
      {/* Abstract subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="dot-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono text-background/40 uppercase tracking-wider mb-6">
              <span className="w-12 h-px bg-background/20" />
              Testimonials
            </span>
            <h2 className="text-5xl lg:text-7xl font-display tracking-tight leading-[0.9]">
              Trusted by teams
              <br />
              <span className="text-background/40">worldwide.</span>
            </h2>
          </div>
          
          {/* Navigation arrows */}
          <div className={`flex items-center gap-3 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <button
              onClick={goPrev}
              disabled={isAnimating}
              className="p-4 border border-background/20 rounded-full hover:bg-background/10 hover:border-background/40 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-background/50 disabled:opacity-50"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              disabled={isAnimating}
              className="p-4 border border-background/20 rounded-full hover:bg-background/10 hover:border-background/40 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-background/50 disabled:opacity-50"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main content - Split layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Quote side */}
          <div className={`lg:col-span-7 relative transition-all duration-1000 ease-out delay-100 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}>
            <Quote className="absolute -left-2 sm:-left-8 -top-8 w-24 h-24 text-background/5 rotate-180 pointer-events-none" />
            
            <div className="relative min-h-[250px] lg:min-h-[300px] flex flex-col justify-center">
              <div 
                className={`transition-all duration-500 ease-out ${
                  isAnimating ? "opacity-0 translate-y-4 blur-sm" : "opacity-100 translate-y-0 blur-none"
                }`}
              >
                <blockquote 
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display leading-[1.1] tracking-tight text-background"
                >
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-12 lg:mt-16 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-background text-foreground flex items-center justify-center shrink-0">
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
              </div>
            </div>
          </div>

          {/* Metric cards side */}
          <div className={`lg:col-span-5 flex flex-col justify-center gap-8 transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            {/* Active metric - Large */}
            <div className="p-10 lg:p-14 border border-background/10 bg-background/5 rounded-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-background/5 to-transparent pointer-events-none" />
               <div className={`relative z-10 transition-all duration-500 ease-out ${
                 isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
               }`}>
                  <span className="text-7xl lg:text-8xl xl:text-[9rem] font-display block mb-4 leading-none tracking-tighter">
                    {activeTestimonial.metric.value}
                  </span>
                  <span className="text-sm font-mono uppercase tracking-widest text-background/60">
                    {activeTestimonial.metric.label}
                  </span>
               </div>
            </div>

            {/* Progress indicators and company selector */}
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
                          ? "bg-background" 
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
                        ? "bg-background text-foreground shadow-lg" 
                        : "border border-background/20 text-background/50 hover:text-background hover:border-background/40 hover:bg-background/5"
                    }`}
                  >
                    {t.company}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
