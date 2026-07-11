import { useState, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";

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
    <section id="pricing" ref={sectionRef} className="relative py-32 lg:py-40 bg-black text-white border-t border-white/10 overflow-hidden">
      
      {/* Abstract glass shards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, 10, 0], y: [0, -10, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute right-[20%] top-[10%] w-[20vw] h-[40vh] glass-shard transform rotate-6 opacity-20" 
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20 lg:mb-32"
        >
          <div>
            <span className="inline-flex items-center gap-4 text-[10px] font-mono text-white/50 uppercase tracking-widest mb-8">
              <span className="w-8 h-px bg-white/30" />
              Pricing
            </span>
            <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black tracking-tighter uppercase leading-[0.85]">
              <span className="block text-white chromatic-text-hover">Pay for</span>
              <span className="block text-white/40 chromatic-text-hover">results.</span>
            </h2>
          </div>
          
          <div className="flex items-center border border-white/20 p-1">
            <button 
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 outline-none ${
                !isAnnual ? "bg-white text-black" : "text-white/50 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 outline-none flex items-center gap-2 ${
                isAnnual ? "bg-white text-black" : "text-white/50 hover:text-white"
              }`}
            >
              Annually 
              <span className={`px-1.5 py-0.5 border ${isAnnual ? 'border-black/20 text-black/60' : 'border-white/20 text-white/40'}`}>-15%</span>
            </button>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10"
        >
          {plans.map((plan, index) => (
            <motion.div
              variants={itemVariants}
              key={plan.name}
              className={`relative bg-transparent transition-all duration-500 flex flex-col h-full group border-b lg:border-b-0 border-white/10 last:border-b-0 lg:border-r lg:last:border-r-0 ${
                plan.highlight 
                  ? "bg-white/5 backdrop-blur-md z-10 shadow-2xl" 
                  : "hover:bg-white/5"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-white text-black text-[9px] font-mono uppercase tracking-widest px-3 py-1 z-20">
                  Most Popular
                </div>
              )}

              <div className="p-8 lg:p-12 flex flex-col flex-1 relative z-10">
                <div className="mb-12">
                  <span className={`font-mono text-[10px] uppercase tracking-widest opacity-50 block mb-4`}>
                    0{index + 1}
                  </span>
                  <h3 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">{plan.name}</h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40">{plan.description}</p>
                </div>

                <div className="mb-16">
                  {plan.price.monthly !== null ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-display font-black tracking-tighter">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">/mo</span>
                    </div>
                  ) : (
                    <span className="text-5xl font-display font-black tracking-tighter block py-1.5">Custom</span>
                  )}
                  {plan.price.monthly !== null && plan.price.monthly > 0 && (
                    <p className="text-[9px] text-white/30 mt-2 font-mono uppercase tracking-widest">
                      {isAnnual ? "Billed annually" : "Billed monthly"}
                    </p>
                  )}
                  {(plan.price.monthly === null || plan.price.monthly === 0) && (
                    <p className="h-3 mt-2"></p>
                  )}
                </div>

                <ul className="space-y-4 mb-16 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-white/50" strokeWidth={1.5} />
                      <span className="text-xs font-mono uppercase tracking-wide text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 outline-none border ${
                    plan.highlight
                      ? "bg-white text-black border-white hover:bg-black hover:text-white"
                      : "border-white/20 text-white hover:bg-white hover:text-black hover:border-white"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
        >
          <div className="flex flex-wrap gap-8 text-[10px] font-mono uppercase tracking-widest text-white/40">
            <span className="flex items-center gap-3 cursor-default">
              <Check className="w-3 h-3" />
              Encrypted execution
            </span>
            <span className="flex items-center gap-3 cursor-default">
              <Check className="w-3 h-3" />
              Full audit logs
            </span>
            <span className="flex items-center gap-3 cursor-default">
              <Check className="w-3 h-3" />
              Multi-model routing
            </span>
          </div>
          <a href="#" className="text-[10px] font-mono uppercase tracking-widest group inline-flex items-center gap-4 text-white/60 hover:text-white transition-colors">
            Compare all features
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
