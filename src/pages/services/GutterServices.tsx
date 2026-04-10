import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO';
import { CANONICAL_DOMAIN } from '../../seo/constants';

export default function GutterServices() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Gutter Services in Columbus, OH | DTE Roofing"
        description="Professional gutter services in Columbus, OH. Seamless gutter installation, repairs, cleaning, and gutter guards. Protect your foundation. Free estimates. Call 614-971-6028."
        keywords="gutter services Columbus, gutter installation, gutter repair, gutter cleaning, seamless gutters, gutter guards, downspouts"
        canonical={`${CANONICAL_DOMAIN}/services/gutter-services`}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sagging or Leaking Gutters? We Fix That</h1>
            <p className="text-xl text-gray-200">
              Professional gutter installation, repair, and maintenance to protect your property
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Gutter Repair, Gutter Cleaning, Gutter Guard Installation & Downspout Services</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Properly functioning gutters are essential for protecting your property from water damage.
                They channel water away from your foundation, prevent soil erosion, protect siding and windows,
                and help maintain your landscaping.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                At DTE Roofing, we provide comprehensive gutter services for <Link to="/locations/new-albany" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">New Albany</Link>, <Link to="/locations/worthington" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Worthington</Link>, and <Link to="/locations/delaware" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Delaware homeowners</Link> including installation of seamless
                gutters, repairs, cleaning, and gutter guard systems. Our expert team ensures your gutters
                function properly to protect your investment.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Our Gutter Services</h3>
              <ul className="space-y-4">
                {[
                  'Seamless gutter installation',
                  'Gutter guard systems',
                  'Gutter repair and replacement',
                  'Downspout installation',
                  'Gutter cleaning and maintenance',
                  'Custom gutter fabrication',
                  'Color matching and selection',
                  'Storm damage repairs',
                  'Fascia board repair',
                  'Downspout extensions',
                  'Underground drainage',
                  'Emergency gutter services'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-1" />
                    <span className="text-charcoal-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Gutter Solutions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Seamless Gutter Installation',
                  description: 'Custom-fabricated gutters with no seams to leak. Available in multiple colors to match your home.',
                  features: [
                    'Custom fit for your home',
                    'No seams means no leaks',
                    'Multiple color options',
                    'Durable aluminum construction',
                    'Professional installation',
                    '5" and 6" sizes available'
                  ]
                },
                {
                  title: 'Gutter Guard Systems',
                  description: 'Keep debris out while allowing water to flow freely. Reduce maintenance and protect your gutters.',
                  features: [
                    'Prevents clog buildup',
                    'Reduces maintenance needs',
                    'Extends gutter lifespan',
                    'Multiple system options',
                    'Professional installation',
                    'Warranty protection'
                  ]
                },
                {
                  title: 'Gutter Repair',
                  description: 'Fast, reliable repairs to restore proper function and prevent water damage to your property.',
                  features: [
                    'Leak repairs',
                    'Sagging gutter correction',
                    'Downspout repairs',
                    'End cap replacement',
                    'Hanger replacement',
                    'Storm damage repairs'
                  ]
                },
                {
                  title: 'Gutter Cleaning & Maintenance',
                  description: 'Regular cleaning prevents clogs, extends gutter life, and protects your foundation.',
                  features: [
                    'Complete debris removal',
                    'Downspout flushing',
                    'Minor repairs included',
                    'Seasonal service available',
                    'Full inspection',
                    'Professional cleanup'
                  ]
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-primary-700 transition-all">
                  <h3 className="text-2xl font-bold text-charcoal-900 mb-4">{service.title}</h3>
                  <p className="text-charcoal-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-charcoal-700">
                        <CheckCircle className="w-4 h-4 text-primary-700 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-primary-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Signs You Need Gutter Service</h2>
              <ul className="space-y-3">
                {[
                  'Water overflowing from gutters',
                  'Sagging or pulling away from house',
                  'Visible rust or holes',
                  'Peeling paint on gutters or fascia',
                  'Water stains on siding',
                  'Foundation cracks or erosion',
                  'Basement water problems',
                  'Mildew near foundation',
                  'Gutters filled with debris',
                  'Ice dams in winter',
                  'Separated gutter sections',
                  'Damaged or clogged downspouts'
                ].map((sign, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-1" />
                    <span className="text-charcoal-700">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Choose DTE Roofing?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Seamless Quality',
                    description: 'Custom-fabricated gutters made on-site for perfect fit and no leaks'
                  },
                  {
                    title: 'Expert Installation',
                    description: 'Proper pitch and secure mounting for optimal water flow and durability'
                  },
                  {
                    title: 'Color Selection',
                    description: 'Multiple colors available to complement your home\'s exterior'
                  },
                  {
                    title: 'Warranty Protection',
                    description: 'Both material and workmanship warranties for peace of mind'
                  },
                  {
                    title: 'Complete Service',
                    description: 'From installation to maintenance, we handle all your gutter needs'
                  },
                  {
                    title: 'Fair Pricing',
                    description: 'Competitive rates with no hidden fees or surprises'
                  }
                ].map((item, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-charcoal-900 mb-2">{item.title}</h3>
                    <p className="text-charcoal-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="font-bold text-charcoal-900 mb-2">Gutter Maintenance Tip</h3>
            <p className="text-charcoal-700">
              Gutters should be cleaned at least twice per year - in spring and fall. Regular maintenance
              prevents clogs, extends gutter life, and protects your foundation from water damage. Consider
              gutter guards to reduce maintenance needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Gutter Services?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for professional gutter installation, repair, or maintenance services
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg"
          >
            Get Free Estimate <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
