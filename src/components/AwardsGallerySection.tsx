import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { awardImages } from "@/config/images";
import ImageCarousel from "./ImageCarousel";
import Lightbox from "./Lightbox";

const AwardsGallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="awards-gallery" className="py-24 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">
            Recognition
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary-foreground mb-6">
            Awards & Recognition
          </h2>
          <p className="text-secondary-foreground/70 max-w-xl mx-auto">
            A collection of moments celebrating excellence in psychology, healing, and service.
          </p>
        </motion.div>

        <ImageCarousel images={awardImages} onImageClick={openLightbox} />
      </div>

      <Lightbox
        images={awardImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
};

export default AwardsGallerySection;
