import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Explorer",
    description: "For tinkering and small automations",
    price: { monthly: 0, annual: 0 },
    features: [
      "3 concurrent agents",
      "1,000 tasks/month",
      "Community support",
      "Basic logging",
      "Public integrations",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Builder",
    description: "For teams shipping with agents",
    price: { monthly: 79, annual: 65 },
    features: [
      "25 concurrent agents",
      "50,000 tasks/month",
      "Priority support",
      "Full audit trails",
      "Private integrations",
      "Team workspaces",
      "Custom agent roles",
    ],
    cta: "Start trial",
    highlight: true,
  },
  {
    name: "Scale",
    description: "For agent-first organizations",
    price: { monthly: null, annual: null },
    features: [
      "Unlimited agents",
      "Unlimited tasks",
      "24/7 dedicated support",
      "On-premise deployment",
      "SLA guarantee",
      "Custom LLM routing",
      "Advanced security",
      "Dedicated compute",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section id="pricing" ref={sectionRef} className="relative py-32 lg:py-40 bg-[oklch(0.06_0.008_260)] text-foreground">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Dramatic offset */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20 lg:mb-32">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              Pricing
            </span>
            <h2 className={`text-[clamp(3.5rem,8vw,8rem)] font-display tracking-tight leading-[0.9] transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>
              Pay for
              <br />
              <span className="text-stroke">results.</span>
            </h2>
          </div>
          
          <div className="lg:col-span-4 flex items-end justify-start lg:justify-end pb-4">
             {/* Toggle switch for Annual / Monthly */}
             <div className={`flex items-center p-1 bg-foreground/5 border border-foreground/10 rounded-full transition-all duration-1000 ease-out delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
               <button 
                 onClick={() => setIsAnnual(false)}
                 className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 ${
                   !isAnnual ? "bg-foreground text-background shadow-md" : "text-muted-foreground hover:text-foreground"
                 }`}
               >
                 Monthly
               </button>
               <button 
                 onClick={() => setIsAnnual(true)}
                 className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 ${
                   isAnnual ? "bg-foreground text-background shadow-md" : "text-muted-foreground hover:text-foreground"
                 }`}
               >
                 Annually <span className="ml-1 text-[#eca8d6] font-mono text-[10px] uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">-15%</span>
               </button>
             </div>
          </div>
        </div>

        {/* Pricing cards - Horizontal layout with overlap */}
        <div className="relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0 lg:items-center">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-background border transition-all duration-700 ease-out flex flex-col h-full ${
                  plan.highlight 
                    ? "border-foreground lg:z-10 lg:scale-[1.03] shadow-[0_0_40px_rgba(0,0,0,0.3)] min-h-[600px] rounded-sm" 
                    : "border-foreground/10 lg:first:rounded-l-sm lg:last:rounded-r-sm bg-foreground/[0.01]"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Popular badge */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-foreground text-background text-[10px] font-mono uppercase tracking-widest shadow-md">
                      <Zap className="w-3 h-3 text-[#eca8d6]" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`p-8 lg:p-10 flex flex-col flex-1 ${plan.highlight ? 'pt-12' : ''}`}>
                  {/* Plan header */}
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <span className={`font-mono text-xs ${plan.highlight ? 'text-[#eca8d6]' : 'text-muted-foreground'}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-display mt-3">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-3 h-10">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-10">
                    {plan.price.monthly !== null ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl lg:text-7xl font-display tracking-tight transition-all duration-300">
                          ${isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="text-muted-foreground text-sm font-mono">/mo</span>
                      </div>
                    ) : (
                      <span className="text-5xl lg:text-6xl font-display tracking-tight block py-1.5">Custom</span>
                    )}
                    {plan.price.monthly !== null && plan.price.monthly > 0 && (
                      <p className="text-[10px] text-muted-foreground mt-3 font-mono uppercase tracking-widest h-4">
                        {isAnnual ? "Billed annually" : "Billed monthly"}
                      </p>
                    )}
                    {(plan.price.monthly === null || plan.price.monthly === 0) && (
                      <p className="h-4 mt-3"></p> // spacer
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-12 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-[#eca8d6]' : 'text-foreground/50'}`} />
                        <span className={`text-sm ${plan.highlight ? 'text-foreground' : 'text-muted-foreground'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-4 px-6 flex items-center justify-center gap-3 text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background group active:scale-[0.98] ${
                      plan.highlight
                        ? "bg-foreground text-background hover:bg-[#eca8d6] hover:text-black focus-visible:ring-foreground"
                        : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5 focus-visible:ring-foreground/50"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note with icons */}
        <div className={`mt-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 ease-out delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex flex-wrap gap-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-3">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Encrypted execution
            </span>
            <span className="flex items-center gap-3">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Full audit logs
            </span>
            <span className="flex items-center gap-3">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Multi-model routing
            </span>
          </div>
          <a href="#" className="text-sm font-medium group inline-flex items-center gap-2 hover:text-[#eca8d6] transition-colors">
            Compare all features
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

    </section>
  );
}
