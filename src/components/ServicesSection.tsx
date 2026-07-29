import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Clock, Sparkles, Heart, Zap, Star } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Psychological Counselling",
    description: "Professional sessions for anxiety, depression, relationship issues, academic stress, and emotional trauma.",
    duration: "60 Minutes",
    prices: ["₹2,500 (Online)", "₹3,500 (In-Person)"],
    highlight: false,
  },
  {
    icon: Sparkles,
    title: "Past Life Regression",
    description: "Guided clinical hypnotherapy to access subconscious memories for emotional healing, phobia removal, and spiritual growth.",
    duration: "2–3 Hours",
    prices: ["₹15,000 per session"],
    highlight: true,
  },
  {
    icon: Heart,
    title: "Reiki Healing",
    description: "Energy healing to balance emotional, mental, and physical energy systems. Ideal for stress relief and spiritual alignment.",
    duration: "60–90 Minutes",
    prices: ["₹5,100 per session"],
    highlight: false,
  },
  {
    icon: Clock,
    title: "15-Day Cancer Healing Program",
    description: "Holistic support integrating counselling, guided meditation, Reiki, emotional detox, and family counselling.",
    duration: "15 Days · Daily 60–90 Min",
    prices: ["₹51,000 (Full Program)"],
    highlight: true,
  },
  {
    icon: Zap,
    title: "NLP Transformation",
    description: "Personal transformation for confidence building, fear removal, public speaking, and behavioral change.",
    duration: "90 Minutes",
    prices: ["₹7,500 per session"],
    highlight: false,
  },
  {
    icon: Star,
    title: "Astrology Consultation",
    description: "25+ years expertise in career guidance, marriage compatibility, business growth, and life path consultation.",
    duration: "60 Minutes",
    prices: ["₹5,100 per consultation"],
    highlight: false,
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Services</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Healing & Counselling Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            All sessions are conducted with strict confidentiality. Prior appointment is mandatory.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-xl p-6 border transition-all duration-500 hover:-translate-y-1 ${
                service.highlight
                  ? "bg-secondary border-gold/30 shadow-gold"
                  : "bg-background border-border shadow-elegant hover:shadow-gold"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  service.highlight ? "bg-gradient-gold" : "bg-primary/10"
                }`}
              >
                <service.icon
                  className={service.highlight ? "text-secondary" : "text-primary"}
                  size={22}
                />
              </div>
              <h3
                className={`font-serif font-semibold text-lg mb-2 ${
                  service.highlight ? "text-secondary-foreground" : "text-foreground"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`text-sm mb-4 leading-relaxed ${
                  service.highlight ? "text-secondary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {service.description}
              </p>
              <div
                className={`text-xs font-medium mb-3 ${
                  service.highlight ? "text-gold-light" : "text-primary"
                }`}
              >
                ⏱ {service.duration}
              </div>
              <div className="space-y-1">
                {service.prices.map((price) => (
                  <div
                    key={price}
                    className={`text-sm font-semibold ${
                      service.highlight ? "text-gold" : "text-foreground"
                    }`}
                  >
                    {price}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
