import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Medal, Trophy } from "lucide-react";

const awards = [
  { name: "Padma Shri Nominee", year: "2026", icon: Medal },
  { name: "Asia Gaurav Award", year: "", icon: Trophy },
  { name: "Life Time Achievement Award", year: "", icon: Award },
  { name: "Daivagya Shiromani Award", year: "", icon: Trophy },
  { name: "Maharshi Jaimini Samman", year: "", icon: Award },
  { name: "Swarn Bhart Samman", year: "", icon: Trophy },
  { name: "Shreshtha Vidwan Samman", year: "", icon: Award },
  { name: "Gold Medal", year: "", icon: Medal },
  { name: "Best Author Award", year: "", icon: Award },
];

const AwardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="awards" className="py-24 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Recognition</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary-foreground mb-6">
            Awards & Honours
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {awards.map((award, i) => (
            <motion.div
              key={award.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 bg-charcoal-light/50 rounded-xl p-5 border border-gold/10 hover:border-gold/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                <award.icon className="text-secondary" size={18} />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-secondary-foreground text-sm">
                  {award.name}
                </h3>
                {award.year && (
                  <span className="text-gold text-xs font-medium">{award.year}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
