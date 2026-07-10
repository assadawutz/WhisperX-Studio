import { useState, useRef } from "react";
import { ArrowRight, Check, Zap } from "lucide-react";
import { motion, useInView , Variants } from "framer-motion";

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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="pricing" ref={sectionRef} className="relative py-32 lg:py-40 bg-[oklch(0.06_0.008_260)] text-foreground overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-[#eca8d6]/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-12 gap-8 mb-20 lg:mb-32"
        >
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              Pricing
            </span>
            <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-display tracking-tight leading-[0.9]">
              Pay for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/40 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">results.</span>
            </h2>
          </div>
          
          <div className="lg:col-span-4 flex items-end justify-start lg:justify-end pb-4">
             <div className="flex items-center p-1.5 bg-foreground/5 border border-foreground/10 rounded-full">
               <button 
                 onClick={() => setIsAnnual(false)}
                 className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 ${
                   !isAnnual ? "text-background shadow-md" : "text-muted-foreground hover:text-foreground"
                 }`}
               >
                 {!isAnnual && (
                   <motion.div layoutId="pricingToggle" className="absolute inset-0 bg-foreground rounded-full z-[-1]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                 )}
                 Monthly
               </button>
               <button 
                 onClick={() => setIsAnnual(true)}
                 className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 flex items-center ${
                   isAnnual ? "text-background shadow-md" : "text-muted-foreground hover:text-foreground"
                 }`}
               >
                 {isAnnual && (
                   <motion.div layoutId="pricingToggle" className="absolute inset-0 bg-foreground rounded-full z-[-1]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                 )}
                 Annually 
                 <span className={`ml-2 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors duration-300 ${isAnnual ? 'bg-background/20 text-[#eca8d6]' : 'bg-foreground/10 text-[#eca8d6]/60'}`}>-15%</span>
               </button>
             </div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-0 lg:items-center">
            {plans.map((plan) => (
              <motion.div
                variants={itemVariants}
                key={plan.name}
                className={`relative bg-background border transition-all duration-500 flex flex-col h-full rounded-2xl lg:rounded-none group ${
                  plan.highlight 
                    ? "border-foreground/30 lg:z-10 lg:scale-[1.05] shadow-[0_0_50px_rgba(236,168,214,0.1)] min-h-[600px] lg:rounded-2xl bg-foreground/[0.02] hover:border-[#eca8d6]/50" 
                    : "border-foreground/10 lg:first:rounded-l-2xl lg:last:rounded-r-2xl bg-foreground/[0.01] hover:border-foreground/20 hover:bg-foreground/[0.03]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#eca8d6]/5 to-transparent rounded-2xl pointer-events-none" />
                )}

                {plan.highlight && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-foreground text-background text-[10px] font-mono uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      <Zap className="w-3 h-3 text-[#eca8d6] animate-pulse" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`p-8 lg:p-10 flex flex-col flex-1 relative z-10 ${plan.highlight ? 'pt-12' : ''}`}>
                  <div className="mb-8 pb-8 border-b border-foreground/10 group-hover:border-foreground/20 transition-colors">
                    <span className={`font-mono text-xs transition-colors ${plan.highlight ? 'text-[#eca8d6]' : 'text-muted-foreground group-hover:text-foreground/60'}`}>
                      {plan.name === "Explorer" ? "01" : plan.name === "Builder" ? "02" : "03"}
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-display mt-3">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-3 h-10">{plan.description}</p>
                  </div>

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
                      <p className="h-4 mt-3"></p>
                    )}
                  </div>

                  <ul className="space-y-4 mb-12 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-[#eca8d6]' : 'text-foreground/50 group-hover:text-foreground/80'} transition-colors`} />
                        <span className={`text-sm ${plan.highlight ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground/90'} transition-colors`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 px-6 flex items-center justify-center gap-3 text-sm font-medium transition-all duration-300 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 overflow-hidden relative group/btn ${
                      plan.highlight
                        ? "bg-foreground text-background hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
                    </span>
                    {plan.highlight && (
                      <span className="absolute inset-0 bg-gradient-to-r from-[#eca8d6] to-[#a78bfa] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pt-12 border-t border-foreground/10"
        >
          <div className="flex flex-wrap gap-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-3 hover:text-foreground transition-colors cursor-default">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Encrypted execution
            </span>
            <span className="flex items-center gap-3 hover:text-foreground transition-colors cursor-default">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Full audit logs
            </span>
            <span className="flex items-center gap-3 hover:text-foreground transition-colors cursor-default">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Multi-model routing
            </span>
          </div>
          <a href="#" className="text-sm font-medium group inline-flex items-center gap-2 hover:text-[#eca8d6] transition-colors">
            Compare all features
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
