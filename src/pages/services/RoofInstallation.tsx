import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Shield, Award, Clock } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { CANONICAL_DOMAIN } from '../../seo/constants';

// Mirrors the page's existing visible FAQ section so the FAQPage JSON-LD matches on-page content.
const faqs = [
  { question: "How long does a typical roof installation take?", answer: "Most residential roof installations in Columbus take 2-4 days from start to completion. A typical 1,500-2,500 square foot home with standard complexity usually requires 2-3 days. Factors that extend timelines include larger homes (3,000+ sq ft may take 4-5 days), complex roof designs with multiple levels and valleys, steep pitches requiring additional safety measures, extensive deck repairs discovered during tear-off, and weather delays. Metal roofing installations typically add 1-2 days compared to asphalt shingles due to more precise installation requirements. We provide project-specific timelines during your estimate and keep you informed of progress throughout. For urgent situations requiring immediate protection, we also offer emergency roofing services." },
  { question: "What warranties should I expect with a new roof?", answer: "Quality roof installations include two types of warranties. First, manufacturer material warranties cover defects in the roofing materials themselves. These vary by product: standard asphalt shingles typically carry 20-30 year warranties, architectural shingles offer 30-50 year coverage, and metal roofing often includes 50-year to lifetime material warranties. These warranties protect against manufacturing defects, premature granule loss, and material failure. Second, our workmanship warranty covers installation quality, ensuring that labor-related issues are addressed at no cost to you. We offer comprehensive workmanship warranties that typically range from 5-10 years depending on the project scope. This covers installation errors, improper flashing, ventilation issues, and other installation-related concerns. Some premium manufacturers offer enhanced warranties when installations meet their certification requirements, and we're certified installers for leading brands who can help you access these extended protections. All warranties are fully explained and provided in writing before your project begins." },
  { question: "What's the optimal time of year for roof installation in Ohio?", answer: "Late spring through early fall (May through October) offers the most favorable conditions for roof installation in Central Ohio. Late spring (May-June) provides moderate temperatures ideal for shingle adhesive activation, typically dry weather reducing delay risks, and comfortable working conditions for optimal craftsmanship. Early fall (September-October) similarly offers mild temperatures, lower humidity, and reduced storm frequency compared to summer months. Summer installations (July-August) are certainly possible and we complete many projects during these months, but extreme heat can make materials more pliable and working conditions more challenging. We can install roofs year-round in Columbus, including winter months, using cold-weather techniques and specialized materials when necessary, though temperatures below 40°F affect shingle adhesive properties and may require hand-sealing until warmer weather allows proper bonding. Our busiest seasons are spring and fall, so scheduling 3-4 weeks in advance during these peak periods ensures your preferred timeline." }
];

export default function RoofInstallation() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="New Roof Installation in Columbus, OH | DTE Roofing"
        description="New roof installation in Columbus, OH. Asphalt, metal & flat systems for homes and businesses. Warranty-backed installs. Call 614-971-6028."
        keywords="roof installation Columbus, new roof installation, residential roof installation, commercial roof installation, asphalt shingle installation, metal roof installation"
        canonical={`${CANONICAL_DOMAIN}/services/roof-installation`}
      />
      <SchemaMarkup
        type="service"
        service={{
          name: "New Roof Installation",
          description: "Expert new roof installation in Columbus, OH. Asphalt, metal, and flat roofing systems for residential and commercial projects. Warranty-backed installs. Call 614-971-6028.",
          url: "/services/roof-installation"
        }}
        pageTitle="New Roof Installation in Columbus, OH | DTE Roofing"
        pageDescription="Expert new roof installation in Columbus, OH. Asphalt, metal, and flat roofing systems for residential and commercial projects. Warranty-backed installs. Call 614-971-6028."
        pageUrl={`${CANONICAL_DOMAIN}/services/roof-installation`}
        faqs={faqs}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">New Roof Installation in Columbus, OH</h1>
            <p className="text-xl text-gray-200">
              Expert new roof installations with premium materials and superior craftsmanship
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Roofing Systems We Install (Asphalt, Metal, Flat)</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                A new roof is a significant investment that protects your property for decades. At DTE Roofing,
                we specialize in professional roof installations using premium materials and proven techniques.
                Our experienced team ensures your new roof is installed correctly the first time.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Whether you're building new construction or replacing an old roof, we guide you through material
                selection, design options, and installation timelines. Every project is backed by our workmanship
                warranty and manufacturer guarantees.
              </p>

              <h3 className="text-2xl font-bold text-charcoal-900 mb-4 mt-8">New Construction vs. Re-roofing</h3>
              <p className="text-lg text-charcoal-600 mb-4 leading-relaxed">
                Understanding the differences between new construction roofing and re-roofing helps Columbus homeowners
                set appropriate expectations for their project.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h4 className="font-bold text-charcoal-900 mb-3">New Construction Installation</h4>
                <p className="text-charcoal-600 mb-3 leading-relaxed">
                  Installing roofs on new builds in growing <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus suburbs</Link> like <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Dublin</Link> and <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link> involves working
                  on fresh decking without the complexities of removal. We coordinate with builders to ensure proper
                  ventilation design, integrate with new gutter systems, and align with construction timelines. New
                  construction allows us to implement ideal ventilation systems and ensure perfect integration with
                  other building components from the start.
                </p>
                <p className="text-charcoal-600 leading-relaxed">
                  The process is more predictable, with fewer surprises since we're working with new materials throughout.
                  However, it requires precise coordination with other trades and adherence to construction schedules that
                  may be affected by weather or permitting timelines.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-charcoal-900 mb-3">Re-roofing Existing Homes</h4>
                <p className="text-charcoal-600 mb-3 leading-relaxed">
                  Re-roofing projects throughout Central Ohio involve removing existing materials, inspecting deck
                  condition, and addressing any structural issues discovered during tear-off. Older Columbus homes
                  may have multiple existing roof layers, outdated ventilation systems, or deck damage that becomes
                  apparent only after removal begins.
                </p>
                <p className="text-charcoal-600 leading-relaxed">
                  These projects require careful property protection, managing occupied homes, and often involve
                  unexpected repairs when we discover hidden damage. We excel at minimizing disruption to your daily
                  life while ensuring comprehensive repairs. The advantage of re-roofing is the opportunity to upgrade
                  ventilation, improve energy efficiency, and modernize your home's protection with current materials
                  and techniques. For homes needing extensive updates, consider our <Link to="/services/roof-replacement" className="text-primary-700 hover:text-primary-800 font-semibold">roof replacement services</Link>.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <Shield className="w-12 h-12 text-primary-700 mx-auto mb-3" />
                  <h3 className="font-bold text-charcoal-900 mb-2">Warranty Protected</h3>
                  <p className="text-sm text-charcoal-600">Comprehensive coverage</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <Award className="w-12 h-12 text-primary-700 mx-auto mb-3" />
                  <h3 className="font-bold text-charcoal-900 mb-2">Expert Installation</h3>
                  <p className="text-sm text-charcoal-600">Skilled professionals</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <Clock className="w-12 h-12 text-primary-700 mx-auto mb-3" />
                  <h3 className="font-bold text-charcoal-900 mb-2">On-Time Completion</h3>
                  <p className="text-sm text-charcoal-600">Reliable scheduling</p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Our Installation Process</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: '1',
                      title: 'Initial Consultation',
                      description: 'Free estimate and material selection guidance'
                    },
                    {
                      step: '2',
                      title: 'Site Preparation',
                      description: 'Protect landscaping and prepare work area'
                    },
                    {
                      step: '3',
                      title: 'Professional Installation',
                      description: 'Expert installation with quality materials'
                    },
                    {
                      step: '4',
                      title: 'Quality Inspection',
                      description: 'Thorough review and cleanup'
                    },
                    {
                      step: '5',
                      title: 'Final Walkthrough',
                      description: 'Review work and answer questions'
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-700 text-white rounded-full flex items-center justify-center font-bold">
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
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Roofing Material Selection for Columbus Homes</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed max-w-4xl">
              Central Ohio's climate demands roofing materials that withstand temperature extremes, severe summer storms,
              winter ice, and high humidity. Choosing the right material for your Columbus home involves balancing
              performance, aesthetics, longevity, and budget considerations.
            </p>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Asphalt Shingles</h3>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  The most popular choice for Columbus homeowners, asphalt shingles offer proven performance at an
                  accessible price point. Modern asphalt shingles feature significant improvements in wind resistance
                  and impact protection compared to earlier generations.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Cost-effective initial investment suitable for most budgets</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Wide variety of colors to match Columbus architectural styles</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Proven performance in Midwest weather conditions</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Easy to repair if storm damage occurs</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Readily available replacement shingles for future needs</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Shorter lifespan than premium options (20-30 years)</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Less energy efficient than reflective materials</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>May show granule loss over time in harsh sun exposure</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Budget-conscious homeowners in <Link to="/locations/grove-city" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Grove City</Link> and Columbus seeking reliable protection
                      with good value
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Architectural Shingles</h3>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Also called dimensional or laminate shingles, these premium asphalt products offer superior
                  performance and enhanced curb appeal. They're increasingly popular in Hilliard and Dublin
                  neighborhoods where homeowners prioritize aesthetics and longevity.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Superior wind resistance (up to 130 mph ratings) for severe storms</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Enhanced impact resistance against hail common in Central Ohio</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Dimensional appearance adds depth and sophistication</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Longer lifespan (30-50 years) reduces replacement frequency</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Better warranties, often including algae resistance</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Higher upfront cost than standard asphalt shingles</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Heavier weight may require structural assessment on older homes</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Columbus homeowners seeking premium appearance and enhanced storm protection with
                      better long-term value
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Metal Roofing</h3>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Metal roofing continues gaining popularity in Central Ohio for its exceptional durability and
                  energy efficiency. Available in standing seam or metal shingle profiles, these roofs excel in
                  our variable climate.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Exceptional lifespan (50+ years) outlasts other materials</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Superior energy efficiency reduces cooling costs in summer</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Snow and ice slide off easily, reducing winter load and ice dams</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Extremely low maintenance requirements</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Fire resistant and environmentally sustainable</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Highest initial investment among roofing materials</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Requires specialized installation expertise</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>May not suit all Columbus neighborhood architectural styles</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Can be noisier during heavy rain (though attic insulation minimizes this)</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Long-term homeowners in Dublin and Hilliard prioritizing durability, energy savings,
                      and lifetime value
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-700 p-6 rounded-r-lg mt-8">
              <h4 className="font-bold text-charcoal-900 mb-2">Need Help Choosing?</h4>
              <p className="text-charcoal-700 leading-relaxed">
                Our team provides personalized material consultations based on your home's architecture, budget,
                and long-term goals. We'll help you weigh the options and make an informed decision. We also offer
                complementary <Link to="/services/gutters" className="text-primary-700 hover:text-primary-800 font-semibold">gutter installation</Link> and <Link to="/services/siding" className="text-primary-700 hover:text-primary-800 font-semibold">siding services</Link> to complete your home's exterior protection.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Complete Installation Process: What to Expect</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed">
              Understanding the roof installation timeline helps Columbus homeowners prepare for their project and
              know what to expect at each phase. While every project is unique, here's the typical process from
              initial consultation to completion.
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal-900 mb-2">Permits and Scheduling (1-2 weeks before)</h3>
                    <p className="text-charcoal-600 leading-relaxed mb-3">
                      We handle all necessary permits with Columbus and Franklin County building departments. This
                      typically takes 3-7 business days. Simultaneously, we order your chosen materials and schedule
                      your installation date. Spring and fall are our busiest seasons, so scheduling 2-4 weeks ahead
                      is common during peak periods.
                    </p>
                    <p className="text-charcoal-600 leading-relaxed">
                      <strong>Your role:</strong> Confirm material selections, notify neighbors about upcoming work,
                      and ensure clear driveway access for our equipment and dumpster placement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal-900 mb-2">Preparation Day (Day 1 morning)</h3>
                    <p className="text-charcoal-600 leading-relaxed mb-3">
                      Our crew arrives early to set up protection for your landscaping, gardens, and outdoor features.
                      We place tarps over plants, move outdoor furniture, and position ground protection. The dumpster
                      is strategically placed for efficient debris disposal. We also protect your home's siding and
                      cover swimming pools or sensitive areas.
                    </p>
                    <p className="text-charcoal-600 leading-relaxed">
                      <strong>Your role:</strong> Move vehicles from the driveway, secure pets indoors, and remove wall
                      decorations inside your home (roof work creates vibration that can shift items).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal-900 mb-2">Tear-Off and Deck Inspection (Day 1)</h3>
                    <p className="text-charcoal-600 leading-relaxed mb-3">
                      We systematically remove existing roofing materials, working in sections to minimize your home's
                      exposure. This is the noisiest phase—expect significant sound as old shingles are removed. Once
                      a section is clear, we inspect the roof deck for soft spots, rot, or damage. Any necessary deck
                      repairs are addressed before proceeding.
                    </p>
                    <p className="text-charcoal-600 leading-relaxed">
                      <strong>Timeline:</strong> Most Central Ohio homes (1,500-2,500 sq ft) complete tear-off in
                      4-8 hours. Larger homes or multiple layers may extend into a second day.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal-900 mb-2">Installation Phase (Days 1-3)</h3>
                    <p className="text-charcoal-600 leading-relaxed mb-3">
                      We install underlayment, ice and water shield in valleys and eaves, drip edge, and flashing
                      around all penetrations. Then we begin shingle installation from bottom to top, ensuring proper
                      overlap and secure fastening. Ridge vents and ridge caps complete the installation. Each evening,
                      we ensure your home is completely weathertight.
                    </p>
                    <p className="text-charcoal-600 leading-relaxed">
                      <strong>Timeline:</strong> Average Columbus home: 2-3 days. Complex designs, steep pitches,
                      or weather delays may extend this. Metal roofing typically adds 1-2 days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal-900 mb-2">Cleanup and Final Inspection (Final afternoon)</h3>
                    <p className="text-charcoal-600 leading-relaxed mb-3">
                      We perform meticulous cleanup using magnetic sweepers to collect nails from your yard, driveway,
                      and surrounding areas. All debris is removed, ground protection is lifted, and landscaping is
                      restored. Our project manager conducts a final quality inspection, then walks you through the
                      completed work, answering questions and providing warranty documentation.
                    </p>
                    <p className="text-charcoal-600 leading-relaxed">
                      <strong>Your role:</strong> Walk the property with us, ask questions, and receive your warranty
                      and maintenance information. Building inspection occurs within 1-2 weeks (we coordinate this).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-8">
              <h4 className="font-bold text-charcoal-900 mb-2">Weather Considerations in Central Ohio</h4>
              <p className="text-charcoal-700 leading-relaxed">
                Columbus weather can be unpredictable. We monitor forecasts closely and may adjust schedules for
                severe weather, high winds, or heavy rain. Your home's protection is never compromised—if we must
                pause work, we ensure everything is weathertight. Spring and summer thunderstorms occasionally cause
                short delays, but we communicate proactively and resume work as soon as conditions are safe.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Understanding Installation Costs in Central Ohio</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed">
              Roof installation represents a significant investment in your home's protection and value. Several
              factors influence project costs for Columbus-area homeowners.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Primary Cost Factors</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Roof Size and Complexity</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      Square footage is the primary driver, but complexity matters significantly. A simple gable roof
                      costs less per square foot than a multi-level hip roof with dormers, valleys, and numerous
                      penetrations common in older <Link to="/locations/grove-city" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Grove City</Link> and Hilliard homes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Roof Pitch and Accessibility</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      Steep-pitch roofs require additional safety equipment, take longer to install, and increase
                      labor costs. Similarly, multi-story homes or properties with limited access present logistical
                      challenges that affect pricing.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Material Selection</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      Material costs vary considerably. Basic asphalt shingles are the most economical, architectural
                      shingles fall in the mid-range, and metal roofing represents the premium option with higher
                      upfront costs but longer lifespan.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Existing Roof Condition</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      Multiple existing layers increase disposal costs. Damaged decking, rotted fascia, or structural
                      issues discovered during removal require additional repairs. We provide transparent estimates
                      and communicate any unexpected findings immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Additional Considerations</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Ventilation Upgrades</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      Many Columbus homes have inadequate attic ventilation. Adding or upgrading ridge vents, soffit
                      vents, or gable vents extends roof lifespan and improves energy efficiency but affects project cost.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Chimney and Skylight Work</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      Proper flashing around chimneys, skylights, and vent pipes requires skilled workmanship and
                      quality materials. These penetrations are common leak points and warrant careful attention.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Warranty Coverage</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      Premium manufacturers offer extended warranties that provide additional protection. We explain
                      warranty options and help you determine appropriate coverage for your situation and budget.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Seasonal Considerations</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      While we work year-round, spring and fall are optimal for installations in Central Ohio. These
                      moderate seasons offer ideal temperatures for material adhesion and comfortable working conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-700 p-6 rounded-r-lg mt-8">
              <h4 className="font-bold text-charcoal-900 mb-2">Getting an Accurate Estimate</h4>
              <p className="text-charcoal-700 leading-relaxed mb-3">
                We provide detailed, written estimates after inspecting your roof in person. This allows us to assess
                all factors affecting your project and provide accurate pricing without surprises. Our estimates
                include material specifications, labor breakdown, timeline expectations, and warranty information.
              </p>
              <p className="text-charcoal-700 leading-relaxed">
                Before starting any installation, we recommend a thorough <Link to="/services/roof-inspection" className="text-primary-700 hover:text-primary-800 font-semibold">roof inspection</Link> to identify all necessary work and ensure you have complete information for your investment decision.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white p-6 rounded-xl border-2 border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer text-lg flex items-center justify-between">
                  How long does a typical roof installation take?
                  <ArrowRight className="w-5 h-5 text-primary-700 transform group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  Most residential roof installations in Columbus take 2-4 days from start to completion. A typical
                  1,500-2,500 square foot home with standard complexity usually requires 2-3 days. Factors that extend
                  timelines include: larger homes (3,000+ sq ft may take 4-5 days), complex roof designs with multiple
                  levels and valleys, steep pitches requiring additional safety measures, extensive deck repairs
                  discovered during tear-off, and weather delays. Metal roofing installations typically add 1-2 days
                  compared to asphalt shingles due to more precise installation requirements. We provide project-specific
                  timelines during your estimate and keep you informed of progress throughout. For urgent situations
                  requiring immediate protection, we also offer <Link to="/services/emergency-services" className="text-primary-700 hover:text-primary-800 font-semibold">emergency roofing services</Link>.
                </p>
              </details>

              <details className="bg-white p-6 rounded-xl border-2 border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer text-lg flex items-center justify-between">
                  What warranties should I expect with a new roof?
                  <ArrowRight className="w-5 h-5 text-primary-700 transform group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  Quality roof installations include two types of warranties. First, manufacturer material warranties
                  cover defects in the roofing materials themselves. These vary by product: standard asphalt shingles
                  typically carry 20-30 year warranties, architectural shingles offer 30-50 year coverage, and metal
                  roofing often includes 50-year to lifetime material warranties. These warranties protect against
                  manufacturing defects, premature granule loss, and material failure. Second, our workmanship warranty
                  covers installation quality, ensuring that labor-related issues are addressed at no cost to you. We
                  offer comprehensive workmanship warranties that typically range from 5-10 years depending on the
                  project scope. This covers installation errors, improper flashing, ventilation issues, and other
                  installation-related concerns. Some premium manufacturers offer enhanced warranties when installations
                  meet their certification requirements—we're certified installers for leading brands and can help you
                  access these extended protections. All warranties are fully explained and provided in writing before
                  your project begins. We stand behind our work completely and remain available for any post-installation
                  questions or concerns.
                </p>
              </details>

              <details className="bg-white p-6 rounded-xl border-2 border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer text-lg flex items-center justify-between">
                  What's the optimal time of year for roof installation in Ohio?
                  <ArrowRight className="w-5 h-5 text-primary-700 transform group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  Late spring through early fall (May through October) offers the most favorable conditions for roof
                  installation in Central Ohio. Late spring (May-June) provides moderate temperatures ideal for shingle
                  adhesive activation, typically dry weather reducing delay risks, and comfortable working conditions
                  for optimal craftsmanship. Early fall (September-October) similarly offers mild temperatures, lower
                  humidity, and reduced storm frequency compared to summer months. Summer installations (July-August)
                  are certainly possible and we complete many projects during these months, but extreme heat can make
                  materials more pliable and working conditions more challenging. However, longer daylight hours allow
                  extended work days when needed. We can install roofs year-round in Columbus, including winter months,
                  using cold-weather techniques and specialized materials when necessary. However, temperatures below
                  40°F affect shingle adhesive properties and may require hand-sealing or temporary measures until
                  warmer weather allows proper bonding. Our busiest seasons are spring and fall, so scheduling 3-4
                  weeks in advance during these peak periods ensures your preferred timeline. Winter installations
                  often have shorter lead times and can be ideal for homeowners with urgent needs or scheduling
                  flexibility. We work closely with Columbus weather patterns and provide honest recommendations about
                  timing for your specific project.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">What's Included in Every Installation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Complete tear-off and disposal of old roofing',
                'Deck inspection and repairs if needed',
                'Premium underlayment installation',
                'Ice and water shield in critical areas',
                'New drip edge and flashing',
                'Ridge vent or proper ventilation system',
                'Professional shingle installation',
                'Complete cleanup and debris removal',
                'Final inspection and quality assurance',
                'Workmanship warranty',
                'Manufacturer material warranty',
                'Post-installation support'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-700 flex-shrink-0 mt-1" />
                  <span className="text-charcoal-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for a New Roof?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and estimate on your new roof installation
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
