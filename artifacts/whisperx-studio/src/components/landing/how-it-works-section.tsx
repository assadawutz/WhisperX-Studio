import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Define",
    subtitle: "your agent",
    description: "Describe what your agent should do. Set its capabilities, constraints, and goals in natural language or code.",
    code: `const researcher = new Agent({
  role: 'Research Analyst',
  capabilities: ['web', 'docs', 'api'],
  memory: true,
  autonomy: 'full'
})`,
  },
  {
    number: "02",
    title: "Assign",
    subtitle: "the task",
    description: "Give your agent a mission. It breaks down complex tasks into steps and executes them autonomously.",
    code: `await researcher.execute({
  task: 'Analyze competitor pricing',
  sources: ['public-data', 'news'],
  output: 'structured-report',
  deadline: '2h'
})`,
  },
  {
    number: "03",
    title: "Monitor",
    subtitle: "& scale",
    description: "Track progress in real-time. Spin up more agents as needed. Pay only for compute used.",
    code: `optimus.dashboard({
  agents: [researcher],
  metrics: ['tasks', 'latency', 'cost'],
  alerts: true
})
// 847 tasks completed today`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header — titre + image cerisier */}
        <div className="relative mb-12 lg:mb-0 grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
          {/* Titre colonne gauche */}
          <div className="overflow-hidden pb-0 lg:pb-32">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono text-white/40 uppercase tracking-wider mb-8">
                <span className="w-12 h-px bg-white/20" />
                Process
              </span>
            </div>
            
            <h2 className={`text-[clamp(3.5rem,8vw,8rem)] font-display tracking-tight leading-[0.85] transition-all duration-1000 ease-out delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}>
              <span className="block">Define.</span>
              <span className="block text-white/30">Deploy.</span>
              <span className="block text-white/10">Scale.</span>
            </h2>
          </div>

          {/* Image cerisier — se colle en bas sur les blocs */}
          <div className={`relative h-[280px] lg:h-[640px] overflow-hidden transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tree-uAia6REvB137CQyHFCf0za3O6h2zKO.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-full lg:w-auto h-full object-contain object-bottom lg:object-right-bottom"
            />
            {/* Fade sur le bord gauche */}
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.09_0.01_260)] via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.01_260)] via-transparent to-transparent pointer-events-none lg:hidden" />
          </div>
        </div>

        {/* Horizontal Steps Layout */}
        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`relative text-left p-8 lg:p-12 border transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                activeStep === index 
                  ? "bg-[#000000] border-white/60 shadow-2xl" 
                  : "bg-[#000000] border-white/10 hover:border-white/30 hover:bg-[#000000]/80"
              }`}
              style={{
                transform: activeStep === index ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              {/* Step number with animated line */}
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-4xl lg:text-5xl font-display transition-colors duration-500 ${
                  activeStep === index ? "text-[#eca8d6]" : "text-white/20"
                }`}>
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-white/10 overflow-hidden">
                  {activeStep === index && (
                    <div className="h-full bg-[#eca8d6]/60 animate-progress" />
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className={`text-3xl lg:text-4xl font-display mb-2 transition-colors duration-300 ${
                activeStep === index ? "text-white" : "text-white/60"
              }`}>
                {step.title}
              </h3>
              <span className={`text-xl lg:text-2xl font-display block mb-6 transition-colors duration-300 ${
                activeStep === index ? "text-white/60" : "text-white/30"
              }`}>
                {step.subtitle}
              </span>

              {/* Description */}
              <p className={`text-base lg:text-lg leading-relaxed transition-all duration-300 ${
                activeStep === index ? "opacity-100 text-white/70" : "opacity-60 text-white/40"
              }`}>
                {step.description}
              </p>

              {/* Active indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#eca8d6] to-[#a78bfa] transition-transform duration-700 ease-out origin-left ${
                activeStep === index ? "scale-x-100" : "scale-x-0"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
