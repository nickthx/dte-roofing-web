import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Shield, TrendingUp, DollarSign } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { CANONICAL_DOMAIN } from '../../seo/constants';

const faqs = [
  { question: "How often should I have my roof inspected in Central Ohio?", answer: "It depends on the age of your roof. A newer roof in good shape usually needs an annual inspection, while roofs past 15 years do better with bi-annual or even quarterly checks as the materials age. Ohio weather runs hard on roofs, so we'd rather look twice a year and catch a problem early than wait for a leak. Call us at 614-971-6028 and we'll set up a free inspection to see where your roof stands." },
  { question: "What does a roof maintenance visit actually include?", answer: "We do a full inspection of the shingles, flashing, vent boots, chimney seals, and valleys, plus we clean out and check the gutters and downspouts. You get photo documentation and a written condition report so you can see exactly what we found. Minor repairs like a loose shingle or worn sealant are handled during the visit, and we keep records that help with warranty compliance. It's the same owner-led crew on your roof, so nothing gets glossed over." },
  { question: "Can preventative maintenance really make my roof last longer?", answer: "Yes. Staying on top of small issues, keeping water moving off the roof, and making sure the attic ventilates properly can add years to a roof's life. Proper maintenance can stretch a roof's lifespan by 5 to 10 years, which usually means pushing back the cost of a full replacement. That's the whole point of catching things early instead of paying for emergency work later." },
  { question: "Why do clogged gutters matter for my roof and home?", answer: "When gutters and downspouts clog up, water backs up and stops draining the way it should. That standing water can work its way under shingles and flashing, and overflow at the foundation can lead to bigger structural problems down the line. During a maintenance visit we clean the gutters, clear roof debris, and check the drainage so water keeps moving away from the house. It's a small thing that prevents some of the most expensive damage we see." },
  { question: "Do you offer maintenance plans, and is financing available?", answer: "We offer regular maintenance on a schedule that fits your roof, whether that's an annual visit or a bi-annual one for older roofs. Every plan includes the inspection, gutter cleaning, minor repairs, and documentation, plus priority scheduling if larger work ever comes up. Financing is available if you'd rather spread out a bigger repair, and we're licensed, bonded, and insured here in Ohio. Reach us at 614-971-6028 or experience@dteroofing.com to talk through what makes sense for your roof." }
];

export default function PreventativeMaintenance() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Preventative Roof Maintenance Columbus OH | DTE Roofing"
        description="Preventative roof maintenance in Central Ohio. Annual plans, seasonal inspections, gutter & vent care. Catch issues early. Call 614-971-6028."
        keywords="preventative maintenance, preventive roof care, roof maintenance program, annual roof service, proactive roof care"
        canonical={`${CANONICAL_DOMAIN}/services/preventative-maintenance`}
      />
      <SchemaMarkup
        type="service"
        service={{
          name: "Preventative Maintenance",
          description: "Preventative roof maintenance in Columbus and Central Ohio. Annual plans, seasonal inspections, gutter and vent care. Catch issues early and save money. Call 614-971-6028.",
          url: "/services/preventative-maintenance"
        }}
        pageTitle="Preventative Roof Maintenance Columbus OH | DTE Roofing"
        pageDescription="Preventative roof maintenance in Columbus and Central Ohio. Annual plans, seasonal inspections, gutter and vent care. Catch issues early and save money. Call 614-971-6028."
        pageUrl={`${CANONICAL_DOMAIN}/services/preventative-maintenance`}
        faqs={faqs}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Preventative Roof Maintenance in Central Ohio</h1>
            <p className="text-xl text-gray-200">
              Proactive care to prevent problems and maximize your roof's lifespan
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-charcoal-900 mb-6">
              Annual Preventative Maintenance Plans
            </h2>
            <p className="text-xl text-charcoal-600 leading-relaxed">
              Serving <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link>, <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard homeowners</Link>, <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Dublin</Link>, and <Link to="/locations/grove-city" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Grove City</Link>, DTE Roofing helps local homeowners protect
              their investment through regular maintenance. Ohio's harsh weather—from winter ice to summer
              storms—takes a toll on roofs. Our proactive approach catches small issues before they become
              expensive emergencies, extending your roof's lifespan and saving you thousands in the long run.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-primary-50 p-8 rounded-xl text-center">
              <Shield className="w-16 h-16 text-primary-700 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-charcoal-900 mb-3">Prevent Damage</h3>
              <p className="text-charcoal-600">
                Regular inspections catch minor issues before they become major problems requiring costly repairs
              </p>
            </div>
            <div className="bg-primary-50 p-8 rounded-xl text-center">
              <TrendingUp className="w-16 h-16 text-primary-700 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-charcoal-900 mb-3">Extend Lifespan</h3>
              <p className="text-charcoal-600">
                Proper maintenance can add 5-10 years to your roof's life, maximizing your investment
              </p>
            </div>
            <div className="bg-primary-50 p-8 rounded-xl text-center">
              <DollarSign className="w-16 h-16 text-primary-700 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-charcoal-900 mb-3">Save Money</h3>
              <p className="text-charcoal-600">
                Small repairs cost pennies compared to emergency repairs or premature replacement
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">The Cost of Neglect</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Many homeowners wait until there's a visible problem before calling a roofer. By then,
                what could have been a simple $200 repair has turned into thousands in water damage,
                structural issues, and emergency service costs.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
                <h3 className="font-bold text-charcoal-900 mb-3">Common Scenarios Without Maintenance:</h3>
                <ul className="space-y-2">
                  {[
                    'A loose shingle becomes a major leak during the next storm',
                    'Minor flashing issues lead to extensive water damage',
                    'Small areas of granule loss expand, requiring replacement',
                    'Clogged gutters cause foundation damage',
                    'Unnoticed damage voids manufacturer warranty',
                    'Small leaks create mold and structural damage'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">✗</span>
                      <span className="text-charcoal-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">The Value of Prevention</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                With regular preventative maintenance, minor issues are identified and corrected during
                routine visits. You avoid emergency situations, maintain warranty coverage, and get
                maximum value from your roofing investment.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">Benefits of Regular Maintenance:</h3>
                <ul className="space-y-2">
                  {[
                    'Issues caught and fixed before causing damage',
                    'Lower repair costs over roof\'s lifetime',
                    'Maintained manufacturer warranty coverage',
                    'No surprise emergency expenses',
                    'Extended roof lifespan saves replacement costs',
                    'Documentation for insurance and property value',
                    'Peace of mind during severe weather'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">What We Check During Maintenance</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  category: 'Roofing Materials',
                  items: [
                    'Shingle condition',
                    'Granule loss',
                    'Curling or buckling',
                    'Missing pieces',
                    'Cracking or damage',
                    'General wear'
                  ]
                },
                {
                  category: 'Water Management',
                  items: [
                    'Gutter condition',
                    'Downspout function',
                    'Drainage patterns',
                    'Standing water',
                    'Ice dam potential',
                    'Valley integrity'
                  ]
                },
                {
                  category: 'Seals & Flashing',
                  items: [
                    'Flashing condition',
                    'Sealant integrity',
                    'Chimney seals',
                    'Vent pipe boots',
                    'Skylight seals',
                    'Edge sealing'
                  ]
                },
                {
                  category: 'Structure & Ventilation',
                  items: [
                    'Deck condition',
                    'Ventilation adequacy',
                    'Attic moisture',
                    'Structural integrity',
                    'Soffit condition',
                    'Fascia boards'
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-charcoal-900 mb-4">{section.category}</h3>
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

          <div className="mb-16 bg-gray-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Return on Investment</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  scenario: 'Without Maintenance',
                  timeline: '15-20 Year Roof Life',
                  costs: [
                    'Emergency repairs: $3,000-$8,000',
                    'Interior damage: $2,000-$15,000',
                    'Early replacement: $8,000-$20,000',
                    'Lost warranties: Priceless'
                  ],
                  total: '$13,000 - $43,000+',
                  color: 'red'
                },
                {
                  scenario: 'With Basic Maintenance',
                  timeline: '20-25 Year Roof Life',
                  costs: [
                    'Annual maintenance: $200-$400/year',
                    'Minor repairs: $500-$1,500 total',
                    'Avoided emergencies: Savings!',
                    'Extended lifespan: 5 years'
                  ],
                  total: '$4,500 - $11,500',
                  color: 'yellow'
                },
                {
                  scenario: 'With Premium Maintenance',
                  timeline: '25-30 Year Roof Life',
                  costs: [
                    'Bi-annual maintenance: $400-$700/year',
                    'Preventive repairs: Included',
                    'Priority service: Peace of mind',
                    'Extended lifespan: 10 years'
                  ],
                  total: '$8,000 - $17,500',
                  color: 'green'
                }
              ].map((option, index) => (
                <div key={index} className={`bg-${option.color}-50 p-6 rounded-xl border-2 border-${option.color}-200`}>
                  <h3 className="text-xl font-bold text-charcoal-900 mb-2">{option.scenario}</h3>
                  <p className="text-charcoal-600 mb-4 font-semibold">{option.timeline}</p>
                  <ul className="space-y-2 mb-4">
                    {option.costs.map((cost, i) => (
                      <li key={i} className="text-sm text-charcoal-700">{cost}</li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-300">
                    <div className="text-sm text-charcoal-600 mb-1">Total Investment:</div>
                    <div className="text-xl font-bold text-charcoal-900">{option.total}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-charcoal-600 mt-8 text-lg">
              Note: Costs are estimates. Your actual costs may vary based on roof size, pitch, and materials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Our Maintenance Includes</h2>
              <ul className="space-y-3">
                {[
                  'Complete roof inspection',
                  'Gutter cleaning and inspection',
                  'Minor repairs (shingles, sealant, etc.)',
                  'Debris removal from roof and gutters',
                  'Detailed photo documentation',
                  'Written condition report',
                  'Recommendations for future care',
                  'Priority scheduling for major work',
                  'Warranty compliance documentation',
                  'Year-over-year condition tracking'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-1" />
                    <span className="text-charcoal-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Recommended Schedule</h2>
              <div className="space-y-6">
                {[
                  {
                    age: 'New Roofs (0-5 years)',
                    schedule: 'Annual inspection',
                    reason: 'Catch installation issues early, maintain warranty'
                  },
                  {
                    age: 'Mature Roofs (5-15 years)',
                    schedule: 'Annual or bi-annual',
                    reason: 'Peak performance period with minimal issues'
                  },
                  {
                    age: 'Aging Roofs (15-20 years)',
                    schedule: 'Bi-annual inspection',
                    reason: 'More frequent monitoring as materials age'
                  },
                  {
                    age: 'Older Roofs (20+ years)',
                    schedule: 'Bi-annual or quarterly',
                    reason: 'Close monitoring to maximize remaining life'
                  }
                ].map((item, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-charcoal-900 mb-2">{item.age}</h3>
                    <p className="text-primary-700 font-semibold mb-1">{item.schedule}</p>
                    <p className="text-charcoal-600 text-sm">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white p-6 rounded-xl border border-gray-200 group">
                  <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-charcoal-600 mt-4 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
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
