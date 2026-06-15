import { useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { carouselProjects } from '../data/projects';
import Picture from './Picture';

export default function WorkCarousel() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.reset()}
    >
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {carouselProjects.map((project, idx) => (
            <div
              key={project.id}
              className="min-w-0 shrink-0 grow-0 basis-full relative aspect-[4/3] md:aspect-video"
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${carouselProjects.length}`}
            >
              <Picture
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                sizes="(min-width: 896px) 896px, 100vw"
              />

              {/* Persistent title/location overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent px-6 py-6">
                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-primary-300 text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={scrollPrev}
        aria-label="Previous project"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-charcoal-900/70 hover:bg-charcoal-900/90 text-white rounded-full p-2 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next arrow */}
      <button
        onClick={scrollNext}
        aria-label="Next project"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-charcoal-900/70 hover:bg-charcoal-900/90 text-white rounded-full p-2 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
