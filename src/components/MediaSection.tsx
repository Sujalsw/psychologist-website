import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { mediaImages } from "@/config/images";
import ImageCarousel from "./ImageCarousel";
import Lightbox from "./Lightbox";

const MediaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="media" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Press Coverage
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Featured in Media
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Recognized by leading publications for contributions to psychology and holistic healing.
          </p>
        </motion.div>

        <ImageCarousel images={mediaImages} onImageClick={openLightbox} />
      </div>

      <Lightbox
        images={mediaImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
};

export default MediaSection;
