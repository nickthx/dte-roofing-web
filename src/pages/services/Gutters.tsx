import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Shield, Droplets, Home } from 'lucide-react';
import SEO from '../../components/SEO';
import { CANONICAL_DOMAIN } from '../../seo/constants';

export default function Gutters() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
        description="Professional seamless gutter installation in Columbus, OH. Custom fabricated gutters, gutter guards, repairs. Protect your foundation. Licensed & insured. Call 614-971-6028."
        keywords="gutters Columbus, seamless gutters, gutter installation, gutter guards, custom gutters, aluminum gutters"
        canonical={`${CANONICAL_DOMAIN}/services/gutters`}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Gutter Installation Columbus OH</h1>
            <p className="text-xl text-gray-200">
              Custom seamless gutters and gutter guard systems to protect your home
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Seamless Gutters for Columbus Homes</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Serving <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus-area homes</Link>, <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link>, <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">families in Dublin</Link>, and Grove City, DTE Roofing specializes in custom seamless
                gutter systems that protect your home from Ohio's heavy rains and seasonal weather. Unlike
                sectional gutters that leak at the seams, our seamless gutters are fabricated on-site to fit
                your home perfectly—with no joints to fail and superior water management that protects your
                foundation, landscaping, and siding.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We use premium rust-resistant aluminum in a variety of colors to match your home's style.
                Our professional installation ensures proper pitch and secure mounting for decades of reliable
                performance, backed by our comprehensive workmanship warranty.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Droplets className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">No Leaks</h3>
                  <p className="text-xs text-charcoal-600">Seamless design</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Durable</h3>
                  <p className="text-xs text-charcoal-600">Rust-resistant aluminum</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Home className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Custom Fit</h3>
                  <p className="text-xs text-charcoal-600">Made for your home</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Benefits of Seamless Gutters</h3>
              <ul className="space-y-4">
                {[
                  'No seams means no leaks',
                  'Custom fabricated for perfect fit',
                  'Superior water management',
                  'Rust-resistant aluminum construction',
                  'Low maintenance requirements',
                  'Enhances curb appeal',
                  'Multiple color options',
                  'Stronger than sectional gutters',
                  'Longer lifespan',
                  'Professional installation',
                  'Warranty protection',
                  'Increases home value'
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Gutter Guard Systems</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Mesh Gutter Guards',
                  description: 'Fine mesh screens that keep out debris while allowing water to flow freely.',
                  features: [
                    'Keeps out leaves and debris',
                    'Allows water flow',
                    'Durable construction',
                    'Easy to maintain',
                    'Cost-effective solution'
                  ]
                },
                {
                  title: 'Reverse Curve Guards',
                  description: 'Water follows the curve into gutters while debris falls to the ground.',
                  features: [
                    'Surface tension technology',
                    'Handles heavy rain',
                    'Virtually maintenance-free',
                    'Professional appearance',
                    'Premium protection'
                  ]
                },
                {
                  title: 'Foam Insert Guards',
                  description: 'Porous foam blocks debris while allowing water to filter through.',
                  features: [
                    'Simple installation',
                    'Blocks all debris',
                    'Prevents ice dams',
                    'Budget-friendly',
                    'Easy to replace'
                  ]
                }
              ].map((guard, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-charcoal-900 mb-4">{guard.title}</h3>
                  <p className="text-charcoal-600 mb-4">{guard.description}</p>
                  <ul className="space-y-2">
                    {guard.features.map((feature, i) => (
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

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Available Colors</h2>
            <p className="text-center text-charcoal-600 mb-8 max-w-3xl mx-auto">
              Choose from a variety of colors to perfectly match or complement your home's exterior.
              All colors feature durable baked-on enamel finish that resists fading and weathering.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {[
                { name: 'White', color: '#FFFFFF' },
                { name: 'Black', color: '#000000' },
                { name: 'Brown', color: '#5C4033' },
                { name: 'Clay', color: '#B86B4D' },
                { name: 'Colonial White', color: '#F5F5DC' },
                { name: 'Gray', color: '#808080' },
                { name: 'Musket Brown', color: '#8B7355' },
                { name: 'Ivory', color: '#FFFFF0' },
                { name: 'Royal Brown', color: '#654321' },
                { name: 'Almond', color: '#EFDECD' },
                { name: 'Bronze', color: '#8C7853' },
                { name: 'Gallery Blue', color: '#4A5D6C' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-full h-16 rounded-lg border-2 border-gray-300 mb-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-charcoal-700">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Installation Process</h2>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Free Consultation',
                    description: 'Measure your home and discuss color options'
                  },
                  {
                    step: '2',
                    title: 'Custom Fabrication',
                    description: 'Create seamless gutters on-site for perfect fit'
                  },
                  {
                    step: '3',
                    title: 'Professional Installation',
                    description: 'Secure mounting with proper pitch for drainage'
                  },
                  {
                    step: '4',
                    title: 'Downspout Placement',
                    description: 'Strategic placement for optimal water management'
                  },
                  {
                    step: '5',
                    title: 'Quality Testing',
                    description: 'Test water flow and inspect all connections'
                  },
                  {
                    step: '6',
                    title: 'Final Walkthrough',
                    description: 'Review installation and answer questions'
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal-900 mb-1">{item.title}</h3>
                      <p className="text-charcoal-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Choose Our Gutters?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'On-Site Fabrication',
                    description: 'Custom made for your home with no seams to leak'
                  },
                  {
                    title: 'Quality Materials',
                    description: 'Heavy-gauge aluminum that won\'t rust or corrode'
                  },
                  {
                    title: 'Expert Installation',
                    description: 'Proper pitch and secure mounting for decades of service'
                  },
                  {
                    title: 'Color Selection',
                    description: 'Wide range of colors with fade-resistant finish'
                  },
                  {
                    title: 'Warranty Protection',
                    description: 'Comprehensive warranty on materials and workmanship'
                  },
                  {
                    title: 'Add-On Options',
                    description: 'Gutter guards, downspout extensions, and more'
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
        </div>
      </section>

      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            Need expert help? Get your free, no-obligation estimate today.
          </h2>
          <Link
            to="/contact"
            className="bg-white text-primary-700 px-10 py-5 rounded-lg hover:bg-gray-100 transition-all font-bold text-xl inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Request Estimate <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
