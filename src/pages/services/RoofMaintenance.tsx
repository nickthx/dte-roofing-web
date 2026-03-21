import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, Wrench, FileText } from 'lucide-react';
import SEO from '../../components/SEO';
import { CANONICAL_DOMAIN } from '../../seo/constants';

export default function RoofMaintenance() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
        description="Professional roof maintenance services in Columbus, OH. Extend your roof's lifespan with regular inspections, cleaning, and preventive care. Maintenance plans available. Call 614-971-6028."
        keywords="roof maintenance, preventive roof care, roof cleaning, annual roof inspection, maintenance program, Columbus roof maintenance"
        canonical={`${CANONICAL_DOMAIN}/services/roof-maintenance`}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roof Maintenance Columbus OH</h1>
            <p className="text-xl text-gray-200">
              Protect your investment and extend your roof's lifespan with regular maintenance
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Why Roof Maintenance Matters</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Regular roof maintenance is the key to maximizing your roof's lifespan and avoiding costly
                emergency repairs. Whether you're <Link to="/locations/westerville" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">in Westerville</Link>, <Link to="/locations/powell" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Powell</Link>, or <Link to="/locations/gahanna" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">throughout Gahanna</Link>, just like your car needs oil changes, your roof needs regular care to
                perform at its best and protect your property for decades.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Our comprehensive maintenance program includes thorough inspections, minor repairs, cleaning,
                and detailed reporting. We catch small issues before they become expensive problems, helping
                you get the most value from your roofing investment.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Regular Schedule</h3>
                  <p className="text-xs text-charcoal-600">Annual or bi-annual</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Wrench className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Minor Repairs</h3>
                  <p className="text-xs text-charcoal-600">Included in service</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Detailed Reports</h3>
                  <p className="text-xs text-charcoal-600">Photo documentation</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Benefits of Regular Maintenance</h3>
              <ul className="space-y-4">
                {[
                  'Extend roof lifespan by 5-10 years',
                  'Prevent costly emergency repairs',
                  'Maintain warranty coverage',
                  'Catch issues early when repairs are cheaper',
                  'Improve energy efficiency',
                  'Protect your property value',
                  'Peace of mind knowing your roof is sound',
                  'Priority scheduling for repairs',
                  'Detailed maintenance records',
                  'Better insurance claim documentation',
                  'Avoid interior water damage',
                  'Reduce long-term roofing costs'
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Our Maintenance Service Includes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Comprehensive Inspection',
                  items: [
                    'Check all shingles and materials',
                    'Inspect flashing and seals',
                    'Examine valleys and penetrations',
                    'Check ventilation system',
                    'Inspect attic for signs of damage',
                    'Review previous repairs'
                  ]
                },
                {
                  title: 'Cleaning Services',
                  items: [
                    'Remove debris from roof surface',
                    'Clear gutters and downspouts',
                    'Remove moss and algae',
                    'Clean around vents and chimneys',
                    'Trim overhanging branches',
                    'Pressure wash if needed'
                  ]
                },
                {
                  title: 'Minor Repairs',
                  items: [
                    'Replace missing or damaged shingles',
                    'Seal minor cracks',
                    'Re-secure loose materials',
                    'Replace damaged sealant',
                    'Fix minor flashing issues',
                    'Address small leaks'
                  ]
                },
                {
                  title: 'Gutter Service',
                  items: [
                    'Clean all gutters',
                    'Flush downspouts',
                    'Check gutter slope',
                    'Tighten loose hangers',
                    'Seal minor leaks',
                    'Ensure proper drainage'
                  ]
                },
                {
                  title: 'Photo Documentation',
                  items: [
                    'Before and after photos',
                    'Document all findings',
                    'Track changes over time',
                    'Provide for insurance records',
                    'Show areas of concern',
                    'Digital photo library'
                  ]
                },
                {
                  title: 'Detailed Report',
                  items: [
                    'Written condition assessment',
                    'List of completed work',
                    'Recommendations for future',
                    'Estimated remaining lifespan',
                    'Budget planning guidance',
                    'Priority ranking of issues'
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-charcoal-900 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Maintenance Plans</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Annual Plan',
                  description: 'Perfect for most residential roofs',
                  frequency: 'Once per year',
                  bestFor: 'Roofs 5-15 years old',
                  features: [
                    'Annual comprehensive inspection',
                    'Cleaning and debris removal',
                    'Minor repairs included',
                    'Detailed report with photos',
                    'Priority scheduling',
                    '10% discount on major repairs'
                  ]
                },
                {
                  name: 'Bi-Annual Plan',
                  description: 'Enhanced protection for your roof',
                  frequency: 'Spring and Fall',
                  bestFor: 'Older roofs or harsh climates',
                  features: [
                    'Two inspections per year',
                    'Spring and fall cleaning',
                    'Seasonal preparations',
                    'Minor repairs included',
                    'Priority emergency service',
                    '15% discount on major repairs',
                    'Extended warranty protection'
                  ],
                  popular: true
                },
                {
                  name: 'Commercial Plan',
                  description: 'Tailored for business properties',
                  frequency: 'Customized schedule',
                  bestFor: 'Commercial buildings',
                  features: [
                    'Flexible scheduling',
                    'Off-hours availability',
                    'Multiple property discounts',
                    'Compliance documentation',
                    'Emergency response priority',
                    'Customized reporting',
                    'Budget planning assistance'
                  ]
                }
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`${
                    plan.popular ? 'bg-primary-50 border-2 border-primary-700 shadow-lg' : 'bg-gray-50 border border-gray-200'
                  } p-8 rounded-xl relative`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary-700 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-charcoal-900 mb-2">{plan.name}</h3>
                  <p className="text-charcoal-600 mb-4">{plan.description}</p>
                  <div className="mb-4 pb-4 border-b border-gray-300">
                    <div className="text-sm text-charcoal-600 mb-1">Frequency:</div>
                    <div className="font-semibold text-charcoal-900">{plan.frequency}</div>
                    <div className="text-sm text-charcoal-600 mt-2 mb-1">Best For:</div>
                    <div className="font-semibold text-charcoal-900">{plan.bestFor}</div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                        <span className="text-charcoal-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="block text-center bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold"
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-r-xl">
            <h3 className="font-bold text-charcoal-900 mb-4 text-xl">When to Schedule Maintenance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-charcoal-900 mb-3">Spring Maintenance (April-May)</h4>
                <ul className="space-y-2">
                  {[
                    'Inspect for winter damage',
                    'Check for ice dam damage',
                    'Clean gutters of debris',
                    'Prepare for storm season',
                    'Address drainage issues'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-charcoal-700">
                      <span className="w-1.5 h-1.5 bg-primary-700 rounded-full"></span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal-900 mb-3">Fall Maintenance (September-October)</h4>
                <ul className="space-y-2">
                  {[
                    'Prepare for winter weather',
                    'Clear leaves and debris',
                    'Check for storm damage',
                    'Ensure proper drainage',
                    'Prevent ice dam formation'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-charcoal-700">
                      <span className="w-1.5 h-1.5 bg-primary-700 rounded-full"></span>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Protect Your Investment</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start a maintenance plan today and extend your roof's lifespan while avoiding costly repairs
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg"
          >
            Start Maintenance Plan <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
