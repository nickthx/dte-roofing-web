import { Link } from 'react-router-dom';
import { Home as HomeIcon, Wrench, MapPin, FileText, Phone, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Page Not Found | DTE Roofing"
        description="That page doesn't exist or has moved. Find roofing services, service areas, and free inspection booking from DTE Roofing in Columbus, OH."
        noindex
      />
      <section className="bg-charcoal-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-500 font-bold text-6xl md:text-8xl mb-4">404</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            This Page Has Blown Off the Roof
          </h1>
          <div className="w-24 h-1 bg-primary-600 mb-6 mx-auto"></div>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has moved. Here's how to get back to solid ground:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center gap-2 shadow-xl"
            >
              <HomeIcon className="w-5 h-5" />
              Back to Home
            </Link>
            <a
              href="tel:6149716028"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg hover:bg-white hover:text-charcoal-900 transition-all font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call 614-971-6028
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-8 text-center">
            Popular Pages
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link to="/services" className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow group">
              <Wrench className="w-8 h-8 text-primary-700 mb-3" />
              <h3 className="font-bold text-charcoal-900 mb-1">Roofing Services</h3>
              <p className="text-charcoal-600 text-sm mb-3">Repair, replacement, inspections, gutters &amp; more.</p>
              <span className="text-primary-700 font-semibold text-sm inline-flex items-center">
                View Services <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/locations" className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow group">
              <MapPin className="w-8 h-8 text-primary-700 mb-3" />
              <h3 className="font-bold text-charcoal-900 mb-1">Service Areas</h3>
              <p className="text-charcoal-600 text-sm mb-3">Columbus, Hilliard, Dublin &amp; 10 more Central Ohio cities.</p>
              <span className="text-primary-700 font-semibold text-sm inline-flex items-center">
                Find Your City <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/blog" className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow group">
              <FileText className="w-8 h-8 text-primary-700 mb-3" />
              <h3 className="font-bold text-charcoal-900 mb-1">Roofing Blog</h3>
              <p className="text-charcoal-600 text-sm mb-3">Costs, materials, insurance claims &amp; maintenance guides.</p>
              <span className="text-primary-700 font-semibold text-sm inline-flex items-center">
                Read Articles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/contact" className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow group">
              <Phone className="w-8 h-8 text-primary-700 mb-3" />
              <h3 className="font-bold text-charcoal-900 mb-1">Free Inspection</h3>
              <p className="text-charcoal-600 text-sm mb-3">Honest diagnostics from owner-led local experts.</p>
              <span className="text-primary-700 font-semibold text-sm inline-flex items-center">
                Get In Touch <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
