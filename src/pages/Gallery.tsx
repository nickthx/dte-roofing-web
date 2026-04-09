import { useState, useEffect, useRef } from 'react';
import { ChevronRight, X, MapPin, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import MobileStickyCall from '../components/MobileStickyCall';
import { projects } from '../data/projects';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'installations', label: 'Installations' },
    { value: 'repairs', label: 'Repairs' }
  ];

  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrevious();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  return (
    <>
      <MobileStickyCall />
      <div className="min-h-screen bg-white">
        <SEO
          title="Roofing Project Gallery | DTE Roofing Columbus, OH"
          description="Browse our portfolio of completed roof replacements, repairs, and commercial roofing projects across Columbus, Dublin, Hilliard, and Central Ohio. See the DTE Roofing difference."
          keywords="roofing gallery Columbus, roof installation photos, before after roofing, Columbus roofing projects, DTE Roofing portfolio"
          canonical="https://www.dteroofingllc.com/gallery"
        />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">See the Work That Speaks for Itself</h1>
              <p className="text-xl text-gray-200">
                Explore our portfolio of completed roofing projects across Columbus, Dublin, and Hilliard
              </p>
            </div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-primary-700 text-white shadow-lg scale-105'
                      : 'bg-white text-charcoal-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <p className="text-center mt-6 text-charcoal-600">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div
              ref={galleryRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer hover:scale-105"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                  aria-label={`View ${project.title} in lightbox`}
                >
                  {/* Image Container */}
                  <div className="relative h-64 md:h-72 overflow-hidden bg-gray-200">
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                      loading="lazy"
                    />

                    {/* Hover Overlay with Content */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-center">
                        <h3 className="text-white font-bold text-2xl mb-3">
                          {project.title}
                        </h3>
                        <div className="flex items-center justify-center text-white/90">
                          <MapPin className="w-5 h-5 mr-2" />
                          <span className="text-lg font-medium">{project.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 md:p-5">
                    <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {project.title}
                    </h3>

                    {/* Location Badge */}
                    <div className="flex items-center text-charcoal-600">
                      <MapPin className="w-4 h-4 mr-2 text-primary-700" />
                      <span className="text-sm font-medium">{project.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-charcoal-600">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary-700 to-primary-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Roof Replacement, Installation, Storm Damage & Siding Projects</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-95">
              Let's work together to create something amazing for your home or business. Get your free estimate today.
            </p>
            <Link
              to="/contact"
              className="bg-white text-primary-700 px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-gray-100 transition-all font-semibold text-base md:text-lg inline-flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 min-h-[48px]"
            >
              Get Free Estimate <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-3 z-10 min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          {filteredProjects.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-2 md:left-4 text-white hover:text-gray-300 transition-colors p-3 z-10 min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 md:w-10 h-8 md:h-10" />
            </button>
          )}

          {/* Next Button */}
          {filteredProjects.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 md:right-4 text-white hover:text-gray-300 transition-colors p-3 z-10 min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-8 md:w-10 h-8 md:h-10" />
            </button>
          )}

          {/* Image Container */}
          <div
            className="max-w-6xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredProjects[currentImageIndex].image}
              alt={filteredProjects[currentImageIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              loading="eager"
            />

            {/* Image Info */}
            <div className="mt-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">
                {filteredProjects[currentImageIndex].title}
              </h3>
              <div className="flex items-center justify-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{filteredProjects[currentImageIndex].location}</span>
              </div>
              <p className="text-sm text-gray-400 mt-3">
                {currentImageIndex + 1} / {filteredProjects.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
