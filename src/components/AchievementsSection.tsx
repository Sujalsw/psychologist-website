import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Brain, Heart, Users, Building } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

const achievements = [
  { icon: BookOpen, value: 524, suffix: "+", label: "Research Publications" },
  { icon: Brain, value: 1069, suffix: "+", label: "Past Life Regression Sessions" },
  { icon: Heart, value: 548, suffix: "+", label: "De-addiction Cases" },
  { icon: Users, value: 65, suffix: "+", label: "Divorce Settlement Cases" },
  { icon: Building, value: 38, suffix: "+", label: "Organizations & Industries Consulted" },
];

const AchievementCard = ({
  icon: Icon,
  value,
  suffix,
  label,
  isInView,
  delay,
}: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  isInView: boolean;
  delay: number;
}) => {
  const count = useCountUp(value, 2000, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-background rounded-xl p-6 border border-border shadow-elegant text-center hover:shadow-gold transition-shadow duration-500"
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="text-primary" size={26} />
      </div>
      <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </motion.div>
  );
};

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Professional Achievements
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            A Legacy of Impact
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dedicated to transforming lives through research, healing, and compassionate service.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {achievements.map((item, i) => (
            <AchievementCard
              key={item.label}
              icon={item.icon}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              isInView={isInView}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
