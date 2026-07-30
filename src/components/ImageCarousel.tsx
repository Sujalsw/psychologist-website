import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/config/images";

interface ImageCarouselProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

const ImageCarousel = ({ images, onImageClick }: ImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group/carousel">
      {/* Previous arrow */}
      <button
        onClick={scrollPrev}
        className="absolute -left-5 md:-left-14 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-secondary border border-gold/20 flex items-center justify-center text-gold hover:border-gold/40 hover:bg-gold/10 transition-all duration-300 hover:scale-110 opacity-0 group-hover/carousel:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next arrow */}
      <button
        onClick={scrollNext}
        className="absolute -right-5 md:-right-14 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-secondary border border-gold/20 flex items-center justify-center text-gold hover:border-gold/40 hover:bg-gold/10 transition-all duration-300 hover:scale-110 opacity-0 group-hover/carousel:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex -ml-4">
          {images.map((image, i) => {
            const isActive = i === selectedIndex;
            return (
              <div
                key={image.src}
                className="pl-4 shrink-0 grow-0 basis-[260px] sm:basis-[280px] md:basis-[320px]"
                onClick={() => onImageClick(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${image.alt}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onImageClick(i);
                  }
                }}
              >
                <div
                  className={`aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group/card transition-all duration-400 ease-out ${
                    isActive
                      ? "ring-2 ring-gold/40 shadow-gold scale-[1.03]"
                      : "shadow-elegant hover:shadow-gold hover:-translate-y-2"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isActive ? "" : "group-hover/card:scale-105"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
