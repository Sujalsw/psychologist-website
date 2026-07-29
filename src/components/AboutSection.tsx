import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Brain, Heart, Star } from "lucide-react";
import drPhoto from "@/assets/dr-amit-about.png";

const qualifications = [
  { icon: Brain, title: "M.Phil. in Psychology", desc: "Advanced research in psychological sciences" },
  { icon: BookOpen, title: "Ph.D. in Philosophy", desc: "Doctoral research bridging philosophy & healing" },
  { icon: Heart, title: "Clinical Hypnotherapy", desc: "Certified practitioner for deep therapeutic work" },
  { icon: Star, title: "NLP Practitioner", desc: "Neuro-Linguistic Programming expert" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">About</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            A Journey of Healing & Knowledge
          </h2>
        </motion.div>

        {/* Photo + Bio row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-8 mb-16"
        >
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/30 shadow-gold flex-shrink-0">
            <img src={drPhoto} alt="Dr. Amit Kumar Ram" className="w-full h-full object-cover object-top" />
          </div>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-center md:text-left">
            With over 14 years as a University Psychological Counsellor, Dr. Amit Kumar "Ram" has dedicated his life to 
            integrating psychology, philosophy, spirituality, and holistic healing for transformative well-being.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualifications.map((q, i) => (
            <motion.div
              key={q.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-gold transition-shadow duration-500 border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center mb-4">
                <q.icon className="text-secondary" size={22} />
              </div>
              <h3 className="font-serif font-semibold text-foreground text-lg mb-2">{q.title}</h3>
              <p className="text-muted-foreground text-sm">{q.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 bg-secondary rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-serif font-bold text-gold mb-2">105+</div>
              <div className="text-secondary-foreground/70 text-sm">NLP Workshops Conducted</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-gold mb-2">110+</div>
              <div className="text-secondary-foreground/70 text-sm">Astrology Workshops Across India</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-gold mb-2">1,000+</div>
              <div className="text-secondary-foreground/70 text-sm">Cancer Patients Supported</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
