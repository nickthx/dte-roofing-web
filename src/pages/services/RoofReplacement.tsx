import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, DollarSign, Calendar } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { CANONICAL_DOMAIN } from '../../seo/constants';

export default function RoofReplacement() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
        description="Expert roof replacement services in Columbus, OH. Complete tear-off and installation with premium materials. Financing available. Licensed & insured. Free estimates. Call 614-971-6028."
        keywords="roof replacement Columbus, complete roof replacement, tear off replacement, new roof, roof replacement cost, residential roof replacement"
        canonical={`${CANONICAL_DOMAIN}/services/roof-replacement`}
      />
      <SchemaMarkup
        type="service"
        service={{
          name: 'Roof Replacement',
          description: 'Complete roof replacement services in Columbus, OH. Professional tear-off and installation with premium materials. Transform your property with a new roof built to last decades. Licensed, insured, and financing available.',
          url: '/services/roof-replacement'
        }}
        pageTitle="Roof Replacement Columbus OH - Complete Roof Installation"
        pageDescription="Expert roof replacement services in Columbus, OH. Complete tear-off and installation with premium materials. Financing available. Licensed & insured."
        pageUrl="https://www.dteroofingllc.com/services/roof-replacement"
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roof Replacement Columbus OH</h1>
            <p className="text-xl text-gray-200">
              Transform your property with a new roof built to last decades
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Full Tear-Off, Architectural Shingles, Metal Roofing & Ventilation Upgrades</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Serving homeowners throughout <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link>, <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link>, <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Dublin</Link>, and <Link to="/locations/grove-city" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Grove City</Link>, DTE Roofing specializes in
                installing beautiful, long-lasting roofs. We understand that a new roof is a
                major investment—that's why we focus on quality workmanship, premium materials designed for Ohio's
                climate, and transparent pricing with no surprises.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                From the initial consultation to the final cleanup, our experienced local team handles every
                detail with care. We work efficiently to minimize disruption to your daily life while delivering
                a roof that protects your home for decades. Every installation is backed by comprehensive
                manufacturer and workmanship warranties for your complete peace of mind. Not every roof needs
                full replacement—sometimes <Link to="/services/roof-repair" className="text-primary-700 hover:text-primary-800 font-semibold">targeted repairs</Link> can extend your roof's life by several years, which is
                why we always provide honest assessments of your options.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Home className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Enhanced Protection</h3>
                  <p className="text-xs text-charcoal-600">Superior weather resistance</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Increased Value</h3>
                  <p className="text-xs text-charcoal-600">Boost property worth</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Long Lifespan</h3>
                  <p className="text-xs text-charcoal-600">Decades of protection</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Signs You Need Replacement</h3>
              <ul className="space-y-3">
                {[
                  'Roof is 20+ years old',
                  'Multiple leaks or recurring problems',
                  'Widespread shingle damage',
                  'Curling, cracking, or missing shingles',
                  'Significant granule loss',
                  'Sagging or structural concerns',
                  'Daylight visible through roof boards',
                  'High energy bills from poor insulation',
                  'Extensive storm or hail damage',
                  'Failed previous repairs',
                  'Preparing to sell your property',
                  'Outdated roofing materials'
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Understanding Roof Replacement Costs in Columbus, OH</h2>
            <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
              One of the first questions homeowners ask is about cost. In <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> and throughout Central Ohio,
              residential roof replacement typically ranges from $8,000 to $25,000 or more, depending on several key factors.
              Understanding these variables helps you budget appropriately and make informed decisions about your investment.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Primary Cost Factors</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-charcoal-800 mb-2">Roof Size</h4>
                    <p className="text-charcoal-600 text-sm">
                      Measured in squares (100 square feet each), most Columbus homes range from 15-30 squares.
                      A typical 2,000 square foot home with a standard pitched roof usually requires 20-22 squares of material.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-800 mb-2">Pitch Complexity</h4>
                    <p className="text-charcoal-600 text-sm">
                      Steeper roofs require additional safety equipment and take longer to complete. Complex designs with
                      multiple valleys, dormers, or skylights increase labor time and material waste, affecting overall cost.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-800 mb-2">Material Selection</h4>
                    <p className="text-charcoal-600 text-sm">
                      Basic 3-tab shingles are the most affordable option, while architectural shingles offer better
                      durability and aesthetics at a moderate price increase. Premium materials like metal roofing or
                      designer shingles command higher costs but provide extended lifespans.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Additional Considerations</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-charcoal-800 mb-2">Tear-Off Layers</h4>
                    <p className="text-charcoal-600 text-sm">
                      Columbus building codes allow a maximum of two shingle layers. If your home has multiple existing
                      layers, removal costs increase due to additional labor and disposal fees. Single-layer tear-offs
                      are more straightforward and economical.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-800 mb-2">Deck Repairs</h4>
                    <p className="text-charcoal-600 text-sm">
                      During tear-off, we may discover damaged decking that requires replacement. While this adds to the
                      project cost, addressing deck issues is essential for long-term roof performance and cannot be
                      postponed without risking structural problems.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-800 mb-2">Permits and Inspections</h4>
                    <p className="text-charcoal-600 text-sm">
                      In <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link>, <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link>, and <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Dublin</Link>, residential roof replacements require building permits,
                      typically costing $100-300. We handle all permitting and inspections to ensure your project
                      meets local code requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg text-charcoal-600 leading-relaxed">
              Before committing to a full replacement, consider scheduling a <Link to="/services/roof-inspection" className="text-primary-700 hover:text-primary-800 font-semibold">professional roof inspection</Link> to
              assess your roof's true condition. Sometimes what appears to be replacement-level damage might be
              addressable with targeted repairs, saving you thousands. If you've experienced recent severe weather,
              our <Link to="/services/storm-damage" className="text-primary-700 hover:text-primary-800 font-semibold">storm damage assessment</Link> can help you understand whether insurance might cover some or all of the replacement cost.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Our Replacement Process</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { step: '1', title: 'Free Inspection', description: 'Thorough assessment' },
                { step: '2', title: 'Material Selection', description: 'Choose your style' },
                { step: '3', title: 'Schedule Work', description: 'Convenient timing' },
                { step: '4', title: 'Complete Tear-Off', description: 'Remove old roof' },
                { step: '5', title: 'Professional Install', description: 'Expert craftsmanship' },
                { step: '6', title: 'Final Inspection', description: 'Quality assurance' }
              ].map((item) => (
                <div key={item.step} className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="w-10 h-10 bg-primary-700 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-charcoal-600 text-xs">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Best Roofing Materials for Ohio Weather</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed">
              Central Ohio's climate presents unique challenges for roofing materials. Our region experiences hot, humid
              summers with temperatures reaching the 90s, cold winters that can drop below zero, significant temperature
              fluctuations between seasons, and severe weather including hail storms, high winds, and heavy snow loads.
              Choosing the right material means selecting one that can handle all these conditions while providing decades
              of reliable protection.
            </p>

            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-primary-700">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Asphalt Shingles (3-Tab)</h3>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  The most economical option, 3-tab asphalt shingles have served <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> homeowners for decades.
                  These single-layer shingles provide basic protection at an accessible price point, making them
                  popular for rental properties and budget-conscious homeowners.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-green-700 mb-3">Pros for Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Most affordable initial investment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Readily available and easy to match for repairs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Adequate performance in moderate weather conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Lightweight design reduces structural load</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 mb-3">Cons for Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Shorter lifespan (15-20 years) in Ohio's temperature extremes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Less wind resistance, vulnerable to storm damage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">More susceptible to algae growth in humid conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Lower impact resistance against hail</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Basic appearance may limit curb appeal</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-primary-700">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Architectural Shingles</h3>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Also called dimensional or laminated shingles, architectural shingles are the most popular choice
                  among Columbus area homeowners. These multi-layer shingles offer enhanced durability, attractive
                  dimensional appearance, and excellent value for their performance characteristics.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-green-700 mb-3">Pros for Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Extended lifespan (25-35 years) withstands seasonal extremes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Superior wind resistance (110+ mph ratings) protects against Ohio storms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Better impact resistance for hail protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Enhanced thermal performance reduces energy costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Algae-resistant options prevent staining in humidity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Attractive appearance increases home value</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 mb-3">Cons for Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Moderate price increase over 3-tab shingles (typically 20-40% more)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Slightly heavier weight requires adequate structural support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Still susceptible to damage in extreme hail events</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                  <p className="text-charcoal-700 text-sm">
                    <strong>Our recommendation:</strong> For most <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> area homes, architectural shingles offer
                    the best balance of performance, longevity, and value. They handle our climate extremes well and
                    typically pay for themselves through extended service life and reduced maintenance needs.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-primary-700">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Metal Roofing</h3>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Metal roofing has gained popularity in Central Ohio for its exceptional durability and energy
                  efficiency. Available in standing seam, metal shingles, or corrugated panels, metal roofs represent
                  a premium investment that can outlast multiple asphalt roof replacements.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-green-700 mb-3">Pros for Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Exceptional lifespan (40-70 years) outlasts other materials significantly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Superior performance in extreme weather including heavy snow loads</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Excellent hail and impact resistance protects against storm damage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Highly wind resistant (up to 140 mph)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Reflective properties reduce cooling costs in summer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Snow sheds easily, reducing ice dam formation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">Fire resistant and environmentally friendly</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 mb-3">Cons for Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Higher upfront cost (2-3 times more than architectural shingles)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Can be noisy during heavy rain or hail without proper insulation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Requires specialized installation expertise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">Limited color options compared to shingles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-700 font-bold flex-shrink-0">•</span>
                        <span className="text-charcoal-600 text-sm">May dent in severe hail (though still functional)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                  <p className="text-charcoal-700 text-sm">
                    <strong>Best suited for:</strong> Homeowners planning long-term ownership who want minimal
                    maintenance and maximum durability. Metal roofing's higher initial cost is offset by its
                    exceptional lifespan and energy savings over time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">What's Included</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Complete Tear-Off',
                  items: ['Remove all old materials', 'Dispose of debris properly', 'Protect landscaping', 'Daily cleanup']
                },
                {
                  title: 'Deck Inspection & Repair',
                  items: ['Inspect roof deck', 'Replace damaged boards', 'Ensure structural integrity', 'Add reinforcement if needed']
                },
                {
                  title: 'Premium Underlayment',
                  items: ['Synthetic underlayment', 'Ice and water shield', 'Valley protection', 'Enhanced waterproofing']
                },
                {
                  title: 'Flashing & Trim',
                  items: ['New drip edge', 'Step flashing', 'Chimney flashing', 'Pipe boot replacement']
                },
                {
                  title: 'Ventilation System',
                  items: ['Ridge vent installation', 'Soffit vents', 'Proper airflow', 'Energy efficiency']
                },
                {
                  title: 'Quality Installation',
                  items: ['Premium shingles', 'Expert craftsmanship', 'Manufacturer specs', 'Final inspection']
                }
              ].map((section, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Common Questions About Roof Replacement</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">How long does a roof replacement take?</h3>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Most residential roof replacements in <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> take 1-3 days to complete, depending on roof size,
                  complexity, and weather conditions. A typical single-family home with a straightforward design
                  usually takes 1-2 days from tear-off to final cleanup.
                </p>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Factors that can extend the timeline include complex roof designs with multiple levels, valleys,
                  or dormers, larger square footage requiring more material and labor, significant deck repair needs
                  discovered during tear-off, or weather delays due to rain or extreme temperatures. Homes in
                  <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link> and <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Dublin</Link> with multi-story designs or steep pitches may require an additional day for
                  safe, quality installation.
                </p>
                <p className="text-charcoal-600 leading-relaxed">
                  We complete the work in continuous days whenever possible to minimize disruption to your daily
                  routine. Your home remains fully weatherproofed each night, and we maintain thorough communication
                  throughout the process. If unexpected repairs are needed, we discuss options and timeline impacts
                  with you before proceeding. For projects requiring more extensive work, such as addressing
                  structural issues, we provide detailed schedules upfront.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">What's the best time of year for roof replacement in Columbus?</h3>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Late spring through early fall (May through October) represents the ideal window for roof
                  replacement in Central Ohio. During these months, moderate temperatures allow roofing materials
                  to seal properly, crews can work efficiently without weather interruptions, and extended daylight
                  hours maximize productivity.
                </p>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Fall (September-October) is particularly popular among <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> homeowners. Cooler temperatures
                  make for comfortable working conditions, there's typically less rain than spring, and completing
                  the project before winter ensures your home is protected from snow and ice. However, this
                  increased demand means scheduling requires more advance notice.
                </p>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  While winter installations are possible in Ohio, cold temperatures below 40°F can affect shingle
                  adhesion and require special installation techniques. Snow and ice on the roof create safety
                  concerns and work delays. If you need emergency replacement during winter months due to
                  <Link to="/services/storm-damage" className="text-primary-700 hover:text-primary-800 font-semibold ml-1">storm damage</Link> or critical leaks, we take extra precautions to ensure proper installation despite
                  challenging conditions.
                </p>
                <p className="text-charcoal-600 leading-relaxed">
                  Spring (April-May) offers another excellent window, though April showers can cause occasional
                  scheduling adjustments. Summer installations work well too, though extremely hot days may require
                  early morning start times to protect both workers and materials from excessive heat.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Do I need a permit for roof replacement?</h3>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Yes, most municipalities in Central Ohio require building permits for roof replacement projects.
                  <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link>, <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link>, <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Dublin</Link>, and surrounding communities mandate permits to ensure work meets
                  current building codes and safety standards. Permit costs typically range from $100-300 depending
                  on your specific location and project scope.
                </p>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  The good news: we handle all permitting on your behalf. Our team submits the necessary
                  applications, provides required documentation, schedules inspections, and ensures your project
                  complies with all local codes. You don't need to visit municipal offices or navigate the
                  permitting process yourself.
                </p>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  The permitting process typically takes 1-3 business days for approval in most <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> area
                  municipalities. Once work begins, a building inspector will visit to verify proper installation
                  methods, material quality, and code compliance. This inspection protects your investment by
                  ensuring everything meets official standards.
                </p>
                <p className="text-charcoal-600 leading-relaxed">
                  Some homeowners wonder about skipping permits to save money or time. We strongly advise against
                  this approach. Unpermitted work can create serious problems when selling your home, void
                  manufacturer warranties, complicate insurance claims, and expose you to fines if discovered. As a
                  licensed contractor, we always obtain proper permits to protect both you and the integrity of
                  your investment.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Will insurance cover my roof replacement?</h3>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Insurance coverage depends primarily on the cause of damage. Storm-related damage from wind, hail,
                  fallen trees, or severe weather events is typically covered under standard homeowners policies,
                  subject to your deductible. <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> area homes frequently experience hail damage and wind events
                  that qualify for insurance claims.
                </p>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Age-related wear, gradual deterioration, and lack of maintenance are generally not covered.
                  Insurance companies expect homeowners to maintain their roofs and replace them at the end of their
                  useful life as a normal ownership expense. However, if recent storm damage has compromised a roof
                  already nearing replacement age, you may still have valid claim potential.
                </p>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  We have extensive experience working with insurance companies and can help you navigate the claims
                  process. After <Link to="/services/roof-inspection" className="text-primary-700 hover:text-primary-800 font-semibold">inspecting your roof</Link>, we document any storm damage with detailed photos and measurements.
                  We can attend your insurance adjuster's inspection, provide comprehensive repair estimates, and
                  communicate directly with your insurance company to ensure all damage is properly documented.
                </p>
                <p className="text-charcoal-600 mb-4 leading-relaxed">
                  Many <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> area homeowners don't realize they have covered damage. If you've experienced recent
                  severe weather, it's worth having us conduct a thorough inspection. We identify storm damage that
                  may not be obvious from the ground, including hail impacts, wind damage, and related issues. Our
                  detailed documentation helps support valid insurance claims.
                </p>
                <p className="text-charcoal-600 leading-relaxed">
                  For more information about insurance claims and storm damage, visit our <Link to="/faq" className="text-primary-700 hover:text-primary-800 font-semibold">FAQ page</Link> or
                  <Link to="/contact" className="text-primary-700 hover:text-primary-800 font-semibold ml-1">contact us</Link> for a free inspection. We'll provide honest assessment of whether your damage likely
                  qualifies for coverage and guide you through next steps if you have a valid claim.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Why Choose DTE Roofing?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Premium Materials',
                  description: 'We use only top-quality materials from trusted manufacturers, backed by industry-leading warranties.'
                },
                {
                  title: 'Expert Installation',
                  description: 'Our certified installers follow manufacturer specifications precisely for optimal performance and warranty coverage.'
                },
                {
                  title: 'Complete Protection',
                  description: 'Every replacement includes comprehensive underlayment, flashing, and ventilation for maximum protection.'
                },
                {
                  title: 'Warranty Coverage',
                  description: 'Dual warranties cover both materials and workmanship for complete peace of mind.'
                },
                {
                  title: 'Minimal Disruption',
                  description: 'We work efficiently to complete your project quickly while maintaining the highest quality standards.'
                },
                {
                  title: 'Financing Available',
                  description: 'Flexible financing options make it easier to invest in your property\'s protection.'
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
