import { motion } from "framer-motion";
import drPhoto from "@/assets/dr-amit-kumar-ram.png";

const stats = [
  { value: "14+", label: "Years Experience" },
  { value: "20,000+", label: "Counselling Sessions" },
  { value: "5,000+", label: "Past Life Regressions" },
  { value: "450+", label: "Research Articles" },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background - Doctor's photo */}
      <div className="absolute inset-0">
        <img src={drPhoto} alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold font-medium tracking-widest uppercase text-sm mb-4"
          >
            Psychologist · Healer · Counsellor
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-cream mb-6 leading-tight"
          >
            Dr. Amit Kumar{" "}
            <span className="text-gradient-gold italic">"Ram"</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-cream/70 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
          >
            Integrating modern psychology with ancient spiritual wisdom for holistic 
            human transformation and emotional healing. Padma Shri Nominee 2026.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#contact"
              className="bg-gradient-gold text-secondary px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-gold"
            >
              Book a Session
            </a>
            <a
              href="#services"
              className="border border-gold/40 text-gold px-8 py-3.5 rounded-lg font-semibold hover:bg-gold/10 transition-colors"
            >
              Explore Services
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-gold/40 pl-4">
                <div className="text-2xl md:text-3xl font-serif font-bold text-gold">
                  {stat.value}
                </div>
                <div className="text-cream/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
