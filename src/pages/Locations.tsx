import { Link } from 'react-router-dom';
import { MapPin, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

const locations = [
  {
    name: 'Columbus',
    slug: 'columbus',
    description: 'Central Ohio\'s capital city',
    highlight: 'Downtown & Surrounding Areas'
  },
  {
    name: 'Hilliard',
    slug: 'hilliard',
    description: 'Our home base',
    highlight: 'Fast Local Response'
  },
  {
    name: 'Dublin',
    slug: 'dublin',
    description: 'Northwest Columbus suburbs',
    highlight: 'Premier Neighborhoods'
  },
  {
    name: 'New Albany',
    slug: 'new-albany',
    description: 'Upscale eastern community',
    highlight: 'Luxury Home Specialists'
  },
  {
    name: 'Upper Arlington',
    slug: 'upper-arlington',
    description: 'Prestigious western suburb',
    highlight: 'Historic Home Experts'
  },
  {
    name: 'Westerville',
    slug: 'westerville',
    description: 'Northeastern Columbus area',
    highlight: 'Tree-Lined Communities'
  },
  {
    name: 'Gahanna',
    slug: 'gahanna',
    description: 'City of Character',
    highlight: 'Creek Corridor Specialists'
  },
  {
    name: 'Reynoldsburg',
    slug: 'reynoldsburg',
    description: 'Eastern Franklin County',
    highlight: 'Storm Protection Experts'
  },
  {
    name: 'Grove City',
    slug: 'grove-city',
    description: 'Southwest Columbus suburbs',
    highlight: 'Rapid Growth Area'
  },
  {
    name: 'Pickerington',
    slug: 'pickerington',
    description: 'Southeast suburbs',
    highlight: 'Dual-County Service'
  },
  {
    name: 'Worthington',
    slug: 'worthington',
    description: 'Historic northern suburb',
    highlight: 'Preservation Specialists'
  },
  {
    name: 'Delaware',
    slug: 'delaware',
    description: 'Delaware County seat',
    highlight: 'Northern Expansion'
  },
  {
    name: 'Powell',
    slug: 'powell',
    description: 'Growing northern community',
    highlight: 'Premium Developments'
  }
];

export default function Locations() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Central Ohio Service Areas - DTE Roofing Locations | Columbus & Surrounding Cities"
        description="DTE Roofing serves 13+ Central Ohio locations including Columbus, Hilliard, Dublin, New Albany, Westerville, Gahanna, and more. Find your local roofing experts."
        keywords="roofing Central Ohio, Columbus area roofer, roofing service areas, local roofing contractor, Ohio roofing locations"
        canonical="https://www.dteroofingllc.com/locations"
      />
      <SchemaMarkup
        type="service"
        serviceName="Roofing Services"
        serviceDescription="Professional roofing services throughout Central Ohio including Columbus, Hilliard, Dublin, and surrounding communities."
        areaServed={locations.map(loc => loc.name).join(', ')}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-8 h-8 text-primary-500" />
              <span className="text-lg font-semibold text-primary-500">Serving Central Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Local Roofing Experts Across Central Ohio
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              DTE Roofing proudly serves 13+ communities throughout the Columbus metropolitan area. From our Hilliard headquarters, we deliver fast, reliable roofing services to homeowners across Franklin, Delaware, and Fairfield counties.
            </p>
            <a
              href="tel:6149716028"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-xl"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call 614-971-6028
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
              Comprehensive Coverage Throughout Central Ohio
            </h2>
            <p className="text-lg text-charcoal-600 leading-relaxed">
              DTE Roofing has built a reputation for excellence across the Columbus metropolitan area. We understand the unique roofing challenges each community faces—from historic preservation requirements in established neighborhoods to storm protection needs in exposed areas. Our local expertise means we respond quickly, understand your community's specific needs, and deliver solutions that protect your home investment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {locations.map((location, index) => (
              <Link
                key={index}
                to={`/locations/${location.slug}`}
                className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-700 hover:shadow-xl transition-all duration-300"
                aria-label={`View ${location.name} roofing services`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal-900 group-hover:text-primary-700 transition-colors mb-1">
                      {location.name}
                    </h3>
                    <p className="text-sm text-charcoal-500 mb-2">{location.description}</p>
                  </div>
                  <MapPin className="w-6 h-6 text-primary-700 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                </div>
                <div className="bg-primary-50 px-3 py-2 rounded-lg mb-3">
                  <p className="text-sm font-semibold text-primary-700">{location.highlight}</p>
                </div>
                <div className="flex items-center text-primary-700 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  View {location.name} Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white p-8 rounded-xl border-2 border-primary-200 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">
                  Why Choose DTE Roofing?
                </h3>
                <ul className="space-y-3">
                  {[
                    'Based in Hilliard - Quick response throughout Central Ohio',
                    'Expert local roofing knowledge and experience',
                    'Fully licensed, bonded, and insured',
                    'Expert knowledge of local building codes',
                    'Understanding of regional weather challenges',
                    'Free estimates and inspections'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">
                  Services We Provide
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Roof Replacement', link: '/services/roof-replacement' },
                    { name: 'Roof Repair', link: '/services/roof-repair' },
                    { name: 'Roof Installation', link: '/services/roof-installation' },
                    { name: 'Storm Damage Repair', link: '/services/storm-damage' },
                    { name: 'Emergency Services', link: '/services/emergency-services' },
                    { name: 'Maintenance Programs', link: '/services/roof-maintenance' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                      <Link
                        to={item.link}
                        className="text-charcoal-700 hover:text-primary-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
              Local Expertise, Regional Coverage
            </h2>
            <p className="text-lg text-charcoal-600 leading-relaxed mb-8">
              Each Central Ohio community has unique characteristics—from historic preservation requirements in Worthington and Upper Arlington, to moisture management in Big Darby and Big Walnut Creek watersheds, to storm exposure in eastern suburbs. Our experience across all these areas means we understand your neighborhood's specific challenges and deliver solutions that work.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-700 mb-2">13+</div>
                <div className="text-charcoal-600">Communities Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-700 mb-2">100%</div>
                <div className="text-charcoal-600">Customer Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-12 rounded-xl max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not Sure If We Serve Your Area?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Even if your city isn't listed above, we may still serve your area. Contact us to discuss your roofing needs—we're often able to extend service to neighboring communities throughout Central Ohio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:6149716028"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call 614-971-6028
              </a>
              <Link
                to="/contact"
                className="bg-charcoal-900 text-white px-8 py-4 rounded-lg hover:bg-charcoal-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg border-2 border-white"
              >
                Request Free Estimate <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">
              Understanding Central Ohio's Roofing Environment
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-charcoal-900 mb-3">Weather Challenges</h3>
                <p className="text-charcoal-600 leading-relaxed">
                  Central Ohio experiences four distinct seasons with harsh winters bringing heavy snow and ice dams, spring severe weather including hail and high winds, hot humid summers accelerating shingle aging, and fall temperature swings stressing materials. Our roofing solutions account for these environmental factors.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-charcoal-900 mb-3">Local Building Codes</h3>
                <p className="text-charcoal-600 leading-relaxed">
                  We maintain expertise with Franklin, Delaware, and Fairfield County building codes, understand permitting requirements across jurisdictions, work with multiple city inspection departments, and ensure all installations meet or exceed local standards for your complete protection and peace of mind.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-charcoal-900 mb-3">Historic Preservation</h3>
                <p className="text-charcoal-600 leading-relaxed">
                  Many Central Ohio communities feature historic districts requiring specialized approaches. We understand architectural review board processes, source period-appropriate materials, and balance authentic aesthetics with modern performance standards protecting your historic home investment.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-charcoal-900 mb-3">HOA Compliance</h3>
                <p className="text-charcoal-600 leading-relaxed">
                  Newer developments throughout Powell, Dublin, New Albany, and other growth areas maintain HOAs with architectural guidelines. We assist with approval processes, recommend compliant materials, and ensure installations meet community standards while maximizing performance and aesthetics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
            Find Your Local DTE Roofing Services
          </h2>
          <p className="text-xl text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Select your city above to learn about specific roofing challenges in your area and discover why your neighbors trust DTE Roofing
          </p>
          <Link
            to="/contact"
            className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg"
          >
            Schedule Your Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
