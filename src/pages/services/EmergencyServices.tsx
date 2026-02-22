import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, Clock, AlertTriangle } from 'lucide-react';
import SEO from '../../components/SEO';
import { CANONICAL_DOMAIN } from '../../seo/constants';

export default function EmergencyServices() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
        description="24/7 emergency roof repair in Columbus, OH. Immediate response for storm damage, leaks, and urgent roofing issues. Same-day service available. Call 614-971-6028 now!"
        keywords="emergency roof repair, 24/7 roofing, storm damage, emergency leak repair, urgent roof repair, Columbus emergency roofing"
        canonical={`${CANONICAL_DOMAIN}/services/emergency-services`}
      />

      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-12 h-12" />
              <span className="text-xl font-semibold">24/7 EMERGENCY SERVICE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Emergency Roofing Services</h1>
            <p className="text-xl text-gray-100 mb-6">
              Fast, reliable emergency response when you need it most
            </p>
            <a
              href="tel:6149716028"
              className="bg-white text-red-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-bold text-lg inline-flex items-center justify-center shadow-xl"
            >
              <Phone className="mr-2 w-5 h-5" />
              CALL 614-971-6028 NOW
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-12">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-charcoal-900 mb-2 text-xl">Available 24 Hours a Day, 7 Days a Week</h3>
                <p className="text-charcoal-700 text-lg">
                  Roof emergencies don't wait for business hours. Neither do we. Whether you're <Link to="/locations/pickerington" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">in Pickerington</Link>, <Link to="/locations/reynoldsburg" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Reynoldsburg</Link>, or <Link to="/locations/upper-arlington" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Upper Arlington</Link>, our team is standing by
                  around the clock to respond to your emergency roofing needs.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">When to Call for Emergency Service</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Some roofing issues require immediate attention to prevent further damage to your property.
                Don't wait if you're experiencing any of these emergency situations:
              </p>
              <ul className="space-y-3">
                {[
                  'Active roof leaks during rain or snow',
                  'Severe storm or wind damage',
                  'Large sections of shingles blown off',
                  'Tree fallen on your roof',
                  'Major structural damage or sagging',
                  'Hail damage requiring immediate tarping',
                  'Ice dam causing water backup',
                  'Exposed roof deck after storm',
                  'Fire or lightning damage',
                  'Missing or damaged flashing causing leaks',
                  'Vandalism or accident damage',
                  'Any situation threatening interior damage'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span className="text-charcoal-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Our Emergency Response</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: '1',
                      title: 'Immediate Response',
                      description: 'We answer your call 24/7 and dispatch a crew quickly'
                    },
                    {
                      step: '2',
                      title: 'Damage Assessment',
                      description: 'Thorough inspection to identify all issues and safety concerns'
                    },
                    {
                      step: '3',
                      title: 'Emergency Repairs',
                      description: 'Tarping, temporary repairs, or immediate fixes to stop damage'
                    },
                    {
                      step: '4',
                      title: 'Documentation',
                      description: 'Photos and documentation for insurance claims if needed'
                    },
                    {
                      step: '5',
                      title: 'Permanent Solution',
                      description: 'Schedule and complete permanent repairs or replacement'
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal-900 mb-1">{item.title}</h4>
                        <p className="text-charcoal-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-700 text-white p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Same-Day Service Available</h3>
                <p className="mb-6">
                  In most cases, we can provide same-day emergency service to protect your property
                  and prevent further damage. Don't wait - call us now!
                </p>
                <a
                  href="tel:6149716028"
                  className="bg-white text-primary-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all font-bold inline-flex items-center justify-center w-full"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  614-971-6028
                </a>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Emergency Services We Provide</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Emergency Tarping',
                  description: 'Secure tarping to protect your property until permanent repairs can be made'
                },
                {
                  title: 'Storm Damage Repair',
                  description: 'Fast response to wind, hail, and severe weather damage'
                },
                {
                  title: 'Emergency Leak Repair',
                  description: 'Stop active leaks to prevent interior water damage'
                },
                {
                  title: 'Tree Removal & Repair',
                  description: 'Safely remove trees and repair damage to your roof'
                },
                {
                  title: 'Structural Stabilization',
                  description: 'Emergency support for compromised roof structures'
                },
                {
                  title: 'Water Damage Mitigation',
                  description: 'Quick action to minimize interior water damage'
                },
                {
                  title: 'Ice Dam Removal',
                  description: 'Safe removal of ice dams causing water backup'
                },
                {
                  title: 'Board-Up Services',
                  description: 'Secure your property after severe damage'
                },
                {
                  title: 'Insurance Documentation',
                  description: 'Complete photo documentation for insurance claims'
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-charcoal-900 mb-3">{service.title}</h3>
                  <p className="text-charcoal-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-r-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">What to Do in a Roofing Emergency</h2>
              <ol className="space-y-4">
                {[
                  'Call us immediately at 614-971-6028',
                  'Move valuable items away from leaks',
                  'Place buckets to catch dripping water',
                  'Document damage with photos if safe',
                  'Do NOT attempt roof repairs yourself',
                  'Wait for our professional crew to arrive',
                  'Keep emergency contact info handy'
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <span className="text-charcoal-700 pt-1">{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Choose DTE Roofing?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: '24/7 Availability',
                    description: 'Always ready to respond, day or night, weekends and holidays'
                  },
                  {
                    title: 'Fast Response Time',
                    description: 'Quick dispatch to minimize damage and protect your property'
                  },
                  {
                    title: 'Experienced Team',
                    description: 'Skilled professionals who know how to handle emergencies safely'
                  },
                  {
                    title: 'Fully Equipped',
                    description: 'Emergency vehicles stocked with supplies for immediate action'
                  },
                  {
                    title: 'Insurance Expertise',
                    description: 'We help with claims documentation and work with adjusters'
                  },
                  {
                    title: 'Fair Pricing',
                    description: 'Honest emergency service rates with no price gouging'
                  }
                ].map((item, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-charcoal-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-700" />
                      {item.title}
                    </h3>
                    <p className="text-charcoal-600 pl-7">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Emergency Roof Repair?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait - roof emergencies get worse quickly. Call us now for immediate assistance!
          </p>
          <a
            href="tel:6149716028"
            className="bg-white text-red-700 px-10 py-5 rounded-lg hover:bg-gray-100 transition-all font-bold text-xl inline-flex items-center justify-center shadow-xl"
          >
            <Phone className="mr-3 w-6 h-6" />
            CALL 614-971-6028 NOW
          </a>
          <p className="mt-6 text-lg">Available 24/7 - We're Always Here to Help</p>
        </div>
      </section>
    </div>
  );
}
