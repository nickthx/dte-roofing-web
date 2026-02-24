import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, Phone, Calculator, DollarSign } from 'lucide-react';

export default function Navigation() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const services = [
    { name: 'Roof Repair', path: '/services/roof-repair' },
    { name: 'Roof Replacement', path: '/services/roof-replacement' },
    { name: 'Storm Damage Restoration', path: '/services/storm-damage' },
    { name: 'Preventative Maintenance', path: '/services/preventative-maintenance' },
    { name: 'Siding', path: '/services/siding' },
    { name: 'Gutters', path: '/services/gutters' },
    { name: 'Commercial Roofing', path: '/services/commercial-roofing' },
  ];

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/images/DTE-Roofing-Logo-two-Men.png"
              alt="DTE Roofing - Columbus Ohio Roofing Contractor"
              className="h-16 w-auto"
              width="120"
              height="64"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            <a href="tel:6149716028" className="text-primary-700 hover:text-primary-800 font-semibold transition-colors flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              614-971-6028
            </a>
            <Link to="/" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors">
              About
            </Link>

            {/*
              FIXED DROPDOWN IMPLEMENTATION:
              1. Removed mt-2 gap that caused menu to close when cursor moves to dropdown
              2. Added 150ms delay before closing to improve UX and prevent accidental closes
              3. Used pt-2 padding inside dropdown wrapper to create hoverable bridge area
              4. Added useRef and setTimeout for proper delay handling
              5. Cleanup timeout on unmount to prevent memory leaks
            */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors flex items-center">
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <Link
                      to="/services"
                      className="block px-4 py-2 text-charcoal-700 hover:bg-primary-50 hover:text-primary-700 font-medium"
                    >
                      All Services
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block px-4 py-2 text-charcoal-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/gallery" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors">
              Gallery
            </Link>
            <Link to="/reviews" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors">
              Reviews
            </Link>
            <Link to="/blog" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors">
              Blog
            </Link>
            <Link to="/locations" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors">
              Service Areas
            </Link>
            <Link to="/faq" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors">
              FAQ
            </Link>
            <Link to="/get-a-quote-consultation" className="bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Instant Quote
            </Link>
            <Link to="/financing" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold inline-flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Financing
            </Link>
            <Link
              to="/contact"
              className="bg-charcoal-800 text-white px-6 py-2.5 rounded-lg hover:bg-charcoal-900 transition-colors font-semibold"
            >
              Contact
            </Link>
          </div>

          <button
            className="lg:hidden text-charcoal-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <a href="tel:6149716028" className="text-primary-700 hover:text-primary-800 font-bold transition-colors py-2 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Call/Text: 614-971-6028
              </a>
              <Link to="/" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/about" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>

              <div>
                <button
                  className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors flex items-center py-2 w-full"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Services <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServicesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    <Link to="/services" className="block text-charcoal-700 hover:text-primary-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                      All Services
                    </Link>
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block text-charcoal-700 hover:text-primary-700 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/gallery" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Gallery
              </Link>
              <Link to="/reviews" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Reviews
              </Link>
              <Link to="/blog" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Blog
              </Link>
              <Link to="/locations" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Service Areas
              </Link>
              <Link to="/faq" className="text-charcoal-700 hover:text-primary-700 font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                FAQ
              </Link>
              <Link
                to="/get-a-quote-consultation"
                className="bg-primary-700 text-white px-6 py-2.5 rounded-lg hover:bg-primary-800 transition-colors font-semibold text-center mt-2 flex items-center justify-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Calculator className="w-4 h-4" />
                Instant Quote
              </Link>
              <Link
                to="/financing"
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center flex items-center justify-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <DollarSign className="w-4 h-4" />
                Financing
              </Link>
              <Link
                to="/contact"
                className="bg-charcoal-800 text-white px-6 py-2.5 rounded-lg hover:bg-charcoal-900 transition-colors font-semibold text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
