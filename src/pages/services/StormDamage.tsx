import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, Cloud, Shield } from 'lucide-react';
import SEO from '../../components/SEO';
import { CANONICAL_DOMAIN } from '../../seo/constants';

export default function StormDamage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
        description="Expert storm damage roof repair in Columbus, OH. Wind damage, hail damage restoration. Insurance claim assistance. 24/7 emergency service. Call 614-971-6028."
        keywords="storm damage repair, hail damage, wind damage, storm roof repair, insurance claims, Columbus storm damage"
        canonical={`${CANONICAL_DOMAIN}/services/storm-damage`}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Storm Damage Restoration</h1>
            <p className="text-xl text-gray-200">
              Expert repair and restoration for wind, hail, and storm damage
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12">
            <div className="flex items-start gap-3">
              <Cloud className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-charcoal-900 mb-2">After the Storm</h3>
                <p className="text-charcoal-700 mb-3">
                  Recent storm in your area? We offer free storm damage inspections and work directly with
                  insurance companies to streamline your claim process.
                </p>
                <a href="tel:6149716028" className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 614-971-6028 for Free Inspection
                </a>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Storm Damage Restoration in Columbus & Surrounding Areas</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Central Ohio's unpredictable weather—from severe thunderstorms to damaging hail—can take a serious
                toll on your roof. Serving <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link>, <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link>, <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Dublin</Link>, and <Link to="/locations/grove-city" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Grove City</Link>, DTE Roofing has helped
                hundreds of local homeowners recover from storm damage and navigate the insurance claims process.
                We know Ohio weather, and we know exactly what to look for after a storm passes through.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Our team provides free storm damage inspections and works directly with your insurance company
                to ensure you get a fair settlement. We document everything thoroughly, meet with adjusters on
                your behalf, and handle all repairs professionally—so you can get back to normal life as quickly
                as possible.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Insurance Experts</h3>
                  <p className="text-xs text-charcoal-600">We work with all insurers</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Free Inspections</h3>
                  <p className="text-xs text-charcoal-600">No cost damage assessment</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Types of Storm Damage</h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Wind Damage',
                    description: 'Missing, lifted, or torn shingles from high winds',
                    signs: ['Missing shingles', 'Lifted edges', 'Torn materials', 'Damaged flashing']
                  },
                  {
                    title: 'Hail Damage',
                    description: 'Impact damage from hailstones',
                    signs: ['Dented shingles', 'Granule loss', 'Bruising', 'Cracked shingles']
                  },
                  {
                    title: 'Tree Damage',
                    description: 'Impact from fallen branches or trees',
                    signs: ['Punctured roof', 'Broken shingles', 'Structural damage', 'Debris buildup']
                  },
                  {
                    title: 'Water Damage',
                    description: 'Leaks from compromised areas',
                    signs: ['Interior stains', 'Ceiling damage', 'Attic moisture', 'Mold growth']
                  }
                ].map((type, index) => (
                  <div key={index}>
                    <h4 className="font-bold text-charcoal-900 mb-2">{type.title}</h4>
                    <p className="text-charcoal-600 mb-2">{type.description}</p>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-charcoal-600">
                      {type.signs.map((sign, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-700 rounded-full mr-2"></span>
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Insurance Claim Process</h2>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: '1', title: 'Free Inspection', description: 'We assess all storm damage' },
                { step: '2', title: 'Documentation', description: 'Photos and detailed report' },
                { step: '3', title: 'File Claim', description: 'Contact your insurance' },
                { step: '4', title: 'Adjuster Meeting', description: 'We meet with adjuster' },
                { step: '5', title: 'Restoration', description: 'Complete the repairs' }
              ].map((item) => (
                <div key={item.step} className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-primary-700 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-charcoal-900 mb-2">{item.title}</h3>
                  <p className="text-charcoal-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-primary-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Signs of Storm Damage</h2>
              <p className="text-charcoal-600 mb-6">
                Not all storm damage is immediately obvious. Look for these warning signs:
              </p>
              <ul className="space-y-3">
                {[
                  'Shingles missing or in yard',
                  'Granules in gutters or downspouts',
                  'Dented or damaged roof vents',
                  'Cracked or broken shingles',
                  'Damaged or missing flashing',
                  'Dents on metal surfaces',
                  'Interior water stains',
                  'Damaged gutters or siding',
                  'Damaged window screens',
                  'Bruising on shingles (dark spots)',
                  'Exposed nail heads',
                  'Debris on roof'
                ].map((sign, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-1" />
                    <span className="text-charcoal-700">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Our Storm Damage Services</h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Free Inspection',
                    description: 'Comprehensive assessment of all storm-related damage to your roof and property'
                  },
                  {
                    title: 'Documentation',
                    description: 'Detailed photos and written reports for your insurance claim'
                  },
                  {
                    title: 'Insurance Assistance',
                    description: 'We work directly with adjusters and help navigate the claims process'
                  },
                  {
                    title: 'Emergency Repairs',
                    description: 'Immediate tarping and temporary repairs to prevent further damage'
                  },
                  {
                    title: 'Complete Restoration',
                    description: 'Full repair or replacement to restore your roof to pre-storm condition'
                  },
                  {
                    title: 'Warranty Protection',
                    description: 'All repairs backed by our workmanship warranty'
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

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-r-xl">
            <h3 className="font-bold text-charcoal-900 mb-4 text-xl">Working With Your Insurance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-charcoal-900 mb-3">We Handle:</h4>
                <ul className="space-y-2">
                  {[
                    'Initial damage assessment',
                    'Complete photo documentation',
                    'Detailed damage reports',
                    'Meeting with insurance adjuster',
                    'Explaining all damages found',
                    'Ensuring fair settlement'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-charcoal-700">
                      <CheckCircle className="w-4 h-4 text-primary-700 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal-900 mb-3">You Get:</h4>
                <ul className="space-y-2">
                  {[
                    'Expert representation',
                    'Fair claim evaluation',
                    'Professional documentation',
                    'Stress-free process',
                    'Quality repairs',
                    'Warranty protection'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-charcoal-700">
                      <CheckCircle className="w-4 h-4 text-primary-700 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
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
