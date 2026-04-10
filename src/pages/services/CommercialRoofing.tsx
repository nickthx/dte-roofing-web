import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Building2, Clock, Shield } from 'lucide-react';
import SEO from '../../components/SEO';
import { CANONICAL_DOMAIN } from '../../seo/constants';

export default function CommercialRoofing() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Commercial Roofing Contractor Columbus, OH | DTE Roofing"
        description="Expert commercial roofing in Columbus, OH. TPO, EPDM, metal roofing, flat roof repair, and maintenance programs. Licensed and insured. Call 614-971-6028 for a free estimate."
        keywords="commercial roofing Columbus, business roofing, flat roof repair, TPO roofing, EPDM roofing, commercial roof replacement"
        canonical={`${CANONICAL_DOMAIN}/services/commercial-roofing`}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Commercial Roofing in Columbus, OH</h1>
            <p className="text-xl text-gray-200">
              Professional roofing solutions for businesses and commercial properties
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Commercial Flat Roof Systems: TPO, EPDM & Modified Bitumen</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus-area businesses</Link> trust DTE Roofing for their commercial
                roofing needs. From small retail shops <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">in Hilliard</Link> to large industrial facilities <Link to="/locations/grove-city" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">in Grove City</Link>,
                we understand that your roof protects more than just a building—it protects your business,
                inventory, employees, and operations. Commercial roofing requires specialized expertise, quality
                materials, and careful planning to avoid disrupting your daily business.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We work around your schedule—including evenings and weekends when needed—to minimize downtime.
                Our team provides detailed project planning, transparent communication, and expert installation
                of TPO, EPDM, metal roofing, and coating systems designed for Ohio's commercial applications.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Building2 className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Commercial Expertise</h3>
                  <p className="text-xs text-charcoal-600">Business-focused service</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Flexible Scheduling</h3>
                  <p className="text-xs text-charcoal-600">Minimize disruption</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Fully Insured</h3>
                  <p className="text-xs text-charcoal-600">Complete protection</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Commercial Services</h3>
              <ul className="space-y-4">
                {[
                  'New commercial roof installation',
                  'Flat roof repair and restoration',
                  'TPO and EPDM roofing systems',
                  'Metal roofing installation',
                  'Roof coating systems',
                  'Emergency repair services',
                  'Preventative maintenance programs',
                  'Roof inspections and assessments',
                  'Storm damage restoration',
                  'Leak detection and repair',
                  'Tenant improvement projects',
                  'Multi-property management'
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Commercial Roofing Systems for Central Ohio Businesses</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed max-w-4xl">
              Selecting the right commercial roofing system for your Columbus business requires understanding how each material performs in Central Ohio's demanding climate—hot, humid summers, cold winters with freeze-thaw cycles, heavy snow loads, and severe storm exposure. We'll help you choose the optimal system for your building type, budget, and operational requirements.
            </p>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">TPO (Thermoplastic Polyolefin) Roofing</h3>
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  TPO has become the fastest-growing commercial roofing material in Columbus, offering outstanding energy efficiency through its reflective white surface. This single-ply membrane features heat-welded seams that create watertight bonds stronger than the material itself, making it ideal for Ohio's weather extremes.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Columbus Businesses:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Reflective white surface reduces cooling costs during hot Ohio summers</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Heat-welded seams remain secure through freeze-thaw cycles</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Excellent resistance to UV radiation, ozone, and chemical exposure</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Remains flexible in cold weather without cracking</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Competitive pricing with 15-30 year lifespan</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Requires skilled installation for proper seam welding</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Can be punctured by sharp objects or heavy foot traffic</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>White surface shows dirt more readily than darker membranes</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Office buildings, retail centers, warehouses prioritizing energy efficiency and long-term value
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">EPDM (Rubber) Roofing</h3>
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  EPDM rubber roofing has protected Columbus commercial buildings for decades with proven reliability. This durable synthetic rubber membrane excels in low-slope and flat roof applications, offering straightforward installation and dependable performance through Central Ohio's seasonal extremes.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Columbus Businesses:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Outstanding weather resistance handles Ohio's temperature fluctuations</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Proven track record with 20-30+ year lifespan</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Lower initial cost compared to TPO and metal systems</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Simple repairs minimize business disruption</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Available in black (standard) or white (energy efficient)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Black EPDM absorbs heat, increasing summer cooling costs</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Seams are glued rather than welded, requiring careful installation</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Can shrink slightly over time with temperature changes</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Industrial facilities, warehouses, and budget-conscious property owners seeking reliable performance
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Modified Bitumen Roofing</h3>
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  Modified bitumen combines traditional built-up roofing technology with modern polymer enhancements, creating a tough, flexible system well-suited for Columbus businesses with rooftop equipment or moderate foot traffic. The reinforced layers provide redundancy and self-healing properties valuable in commercial applications.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Columbus Businesses:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Multi-layer construction provides excellent protection</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Self-healing properties seal minor punctures automatically</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Withstands foot traffic from HVAC maintenance</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Flexible in cold Ohio winters without brittleness</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Multiple installation methods suit various project needs</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Torch-applied installation requires experienced contractors</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Heavier than single-ply membranes</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Dark surfaces absorb heat unless topped with reflective coating</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Restaurants, retail buildings with rooftop HVAC, properties requiring durable high-traffic surfaces
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Metal Roofing Systems</h3>
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  Metal roofing delivers unmatched longevity for Columbus commercial properties, with properly installed systems lasting 40-70 years. Standing seam and structural panel systems provide superior weather protection, excellent drainage, and energy efficiency—critical factors for protecting business operations through Ohio's severe weather.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Columbus Businesses:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Exceptional lifespan (40-70 years) maximizes investment</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Sheds snow and ice efficiently, reducing load concerns</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Fire resistant—important for insurance and safety</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Reflective coatings reduce cooling costs significantly</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Minimal maintenance requirements save long-term costs</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Sustainable—typically contains 25-95% recycled content</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Higher upfront investment than membrane systems</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Requires specialized installation expertise</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Can be noisy during heavy rain or hail (less issue for commercial)</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Office buildings, warehouses, manufacturing facilities prioritizing longevity and sustainability
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Built-Up Roofing (BUR)</h3>
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  Built-up roofing represents time-tested technology that has protected Columbus commercial buildings for over a century. Multiple alternating layers of bitumen and reinforcing fabric create a robust, redundant waterproofing system particularly effective for low-slope applications with minimal foot traffic.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Columbus Businesses:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Multiple layers provide redundant waterproofing protection</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Proven performance track record in Ohio climate</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Seamless installation eliminates weak points</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Cost-effective for larger commercial buildings</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Gravel top layer provides UV and impact protection</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Heavy system requires adequate structural support</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Installation odors may affect adjacent businesses temporarily</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Gravel complicates leak detection and some repairs</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Large warehouses, industrial facilities, properties with adequate structural capacity
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-700 p-6 rounded-r-lg mt-8">
              <h4 className="font-bold text-charcoal-900 mb-2">Need Expert Guidance?</h4>
              <p className="text-charcoal-700 leading-relaxed">
                We provide comprehensive <Link to="/services/roof-inspection" className="text-primary-700 hover:text-primary-800 font-semibold">roof assessments</Link> to evaluate your current system and recommend the optimal solution for your Columbus business. Our analysis considers your building structure, operational requirements, budget, and long-term maintenance planning.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-primary-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Choose DTE for Commercial Roofing?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Minimal Business Disruption',
                    description: 'We work around your schedule, including evenings and weekends if needed'
                  },
                  {
                    title: 'Experienced Commercial Team',
                    description: 'Specialized training and equipment for commercial projects'
                  },
                  {
                    title: 'Safety First',
                    description: 'Comprehensive safety protocols and fully insured crews'
                  },
                  {
                    title: 'Quality Materials',
                    description: 'Premium commercial-grade materials from trusted manufacturers'
                  },
                  {
                    title: 'Detailed Planning',
                    description: 'Thorough project planning and transparent communication'
                  },
                  {
                    title: 'Warranty Protection',
                    description: 'Comprehensive warranties on materials and workmanship'
                  },
                  {
                    title: 'Maintenance Programs',
                    description: 'Proactive maintenance to extend roof life and prevent issues'
                  },
                  {
                    title: 'Emergency Service',
                    description: '24/7 availability for urgent commercial roofing needs'
                  }
                ].map((item, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-charcoal-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0" />
                      {item.title}
                    </h3>
                    <p className="text-charcoal-600 pl-7">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Commercial Maintenance Programs</h2>
              <p className="text-charcoal-600 mb-6">
                Protect your investment with a customized maintenance program designed for your property
                and business needs.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-charcoal-900 mb-3">Program Includes:</h3>
                  <ul className="space-y-2">
                    {[
                      'Bi-annual roof inspections',
                      'Detailed photo documentation',
                      'Immediate minor repairs',
                      'Gutter and drain cleaning',
                      'Debris removal',
                      'Preventive maintenance',
                      'Priority emergency service',
                      'Long-term budget planning',
                      'Compliance documentation',
                      'Multi-property discounts'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                        <span className="text-charcoal-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-300">
                  <h4 className="font-bold text-charcoal-900 mb-2">Benefits:</h4>
                  <ul className="space-y-1 text-sm text-charcoal-700">
                    <li>• Extend roof lifespan by years</li>
                    <li>• Prevent costly emergency repairs</li>
                    <li>• Maintain warranty coverage</li>
                    <li>• Budget predictability</li>
                    <li>• Peace of mind</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Industries and Property Types We Serve</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed">
              Each industry has unique roofing challenges and operational requirements. Our commercial roofing experience across Columbus's diverse business landscape means we understand your specific needs and deliver solutions that protect your operations.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Retail Establishments & Shopping Centers</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Retail properties in Columbus and Hilliard require roofing that maintains customer-facing aesthetics while protecting valuable inventory. We schedule installations during off-hours to avoid disrupting foot traffic and sales. Flat or low-slope roofs common in retail benefit from TPO or EPDM systems that resist ponding water. For strip malls and shopping centers, we coordinate with multiple tenants to minimize impact on individual businesses.
                </p>
                <p className="text-charcoal-600 text-sm italic">
                  Key consideration: Leak-free protection for temperature-sensitive merchandise and climate-controlled environments
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Warehouses & Distribution Centers</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Large warehouses throughout Columbus demand cost-effective roofing across extensive square footage. Metal roofing and EPDM systems provide excellent protection for these typically flat or low-slope buildings. We understand the critical importance of preventing inventory damage from leaks, especially for temperature-controlled storage. Projects are planned around receiving and shipping schedules to maintain operational flow.
                </p>
                <p className="text-charcoal-600 text-sm italic">
                  Key consideration: Cost per square foot efficiency with reliable long-term performance for large roof areas
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Office Buildings</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Dublin and Columbus office buildings require professional-grade roofing that projects quality while delivering energy efficiency to control operating costs. TPO roofing's white reflective surface reduces cooling expenses significantly—a major factor in multi-story office environments. We work around business hours, utilize building service elevators appropriately, and maintain clean, professional job sites that reflect well on property management.
                </p>
                <p className="text-charcoal-600 text-sm italic">
                  Key consideration: Energy efficiency to reduce tenant operating costs and professional project management
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Restaurants & Food Service</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Columbus restaurants face unique challenges with grease-laden exhaust, numerous rooftop penetrations for ventilation, and kitchen equipment requiring regular HVAC servicing. Modified bitumen systems withstand the foot traffic from frequent equipment maintenance. We understand the absolute necessity of preventing leaks that could shut down operations, contaminate food areas, or trigger health department concerns. Evening and overnight installations keep your restaurant serving customers.
                </p>
                <p className="text-charcoal-600 text-sm italic">
                  Key consideration: Durable systems that accommodate frequent roof access for kitchen equipment maintenance
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Churches & Religious Facilities</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Churches throughout Columbus often feature distinctive architecture with steep-slope sections, flat additions, and varied roof planes. Metal roofing complements traditional architecture beautifully while providing exceptional longevity—important for nonprofit budgets. We work around service schedules, weddings, and community events. Many congregations benefit from our maintenance programs that extend roof life and provide budget predictability for building committees.
                </p>
                <p className="text-charcoal-600 text-sm italic">
                  Key consideration: Long-lasting solutions that maximize stewardship of donated funds
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Apartment Complexes & Multi-Family</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Property managers in Columbus and Hilliard depend on us for tenant-friendly roofing solutions. Apartment roofs require systems that minimize noise disruption during installation while providing lasting protection that maintains property value. TPO and EPDM systems offer cost-effective solutions across multiple buildings. Our <Link to="/services/preventative-maintenance" className="text-primary-700 hover:text-primary-800 font-semibold">maintenance programs</Link> work perfectly for multi-property portfolios, providing regular inspections and preventing tenant complaints from leaks.
                </p>
                <p className="text-charcoal-600 text-sm italic">
                  Key consideration: Minimal tenant disruption and multi-building project efficiency
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Industrial & Manufacturing Facilities</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Industrial facilities in Grove City and throughout Central Ohio require heavy-duty roofing that withstands chemical exposure, high interior temperatures, and substantial rooftop equipment loads. Metal roofing and built-up systems provide the durability these demanding environments require. We understand production schedules can't stop, so projects are phased to maintain operations. Specialized safety protocols address the unique hazards present in manufacturing environments.
                </p>
                <p className="text-charcoal-600 text-sm italic">
                  Key consideration: Robust systems resistant to industrial conditions with flexible scheduling around production
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Why Commercial Roof Maintenance Matters</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed">
              Regular maintenance represents the single most cost-effective investment in your commercial roof's longevity and performance. Columbus business owners who implement structured maintenance programs avoid costly emergency repairs, extend roof lifespan by years, and protect their operations from unexpected disruptions.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Extending Roof Lifespan</h3>
                <p className="text-charcoal-700 leading-relaxed mb-4">
                  Commercial roofs that receive bi-annual professional inspections and prompt minor repairs consistently outlast neglected roofs by 30-50%. Small issues like loose flashing, minor membrane damage, or clogged drains escalate into major problems when ignored. A $500 repair caught early prevents a $15,000 emergency restoration project.
                </p>
                <p className="text-charcoal-700 leading-relaxed">
                  Central Ohio's freeze-thaw cycles make maintenance particularly critical—water infiltration in fall becomes ice expansion damage in winter. Our maintenance programs identify and address vulnerabilities before seasonal weather extremes cause expensive failures.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border-2 border-green-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Preventing Business Disruption</h3>
                <p className="text-charcoal-700 leading-relaxed mb-4">
                  Emergency roof failures don't wait for convenient times. A major leak during business hours means water-damaged inventory, disrupted operations, lost revenue, and urgent repair costs at premium rates. For restaurants, retail stores, or any customer-facing business, visible roof problems damage your professional image and customer confidence.
                </p>
                <p className="text-charcoal-700 leading-relaxed">
                  Scheduled maintenance catches problems during planned service visits when repairs can be coordinated around your operations. This predictability allows you to budget appropriately and avoid the chaos and expense of crisis management.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-6">What Our Maintenance Programs Include</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-3">Comprehensive Inspections</h4>
                  <ul className="space-y-2 text-charcoal-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Membrane condition assessment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Flashing and penetration examination</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Drainage system evaluation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Detailed photo documentation</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal-900 mb-3">Preventive Services</h4>
                  <ul className="space-y-2 text-charcoal-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Debris and leaf removal</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Drain and gutter cleaning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Minor leak repairs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sealant reapplication where needed</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal-900 mb-3">Long-Term Planning</h4>
                  <ul className="space-y-2 text-charcoal-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Lifespan projections</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Repair vs replacement analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Budget forecasting assistance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Warranty compliance documentation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-gray-300 mt-6">
                <p className="text-charcoal-700 leading-relaxed">
                  Property managers and business owners with multiple Columbus-area locations benefit from our portfolio approach—coordinated maintenance schedules, consolidated reporting, and volume pricing that makes professional roof care remarkably affordable compared to emergency repair costs.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Commercial Roofing Costs and Pricing Factors</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed">
              Commercial roofing investments vary significantly based on multiple project-specific factors. Understanding what influences costs helps Columbus business owners and property managers budget appropriately and make informed decisions that balance upfront expense with long-term value.
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Roof Size and Building Square Footage</h3>
                <p className="text-charcoal-600 leading-relaxed">
                  Roof area represents the most obvious cost factor—larger roofs require more materials and labor. However, commercial roofing benefits from economies of scale. Per-square-foot costs typically decrease as roof size increases, meaning a 50,000 square foot warehouse roof costs less per square foot than a 5,000 square foot retail building. Columbus property owners replacing multiple buildings simultaneously often negotiate better overall pricing through project consolidation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Roofing System and Material Selection</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Material choice creates the largest cost variation in commercial roofing. EPDM rubber roofing typically offers the lowest initial cost—excellent for budget-conscious property owners needing reliable protection. TPO systems cost moderately more but deliver energy savings that offset higher upfront investment. Modified bitumen falls in the mid-range with excellent durability. Metal roofing commands premium pricing but provides 40-70 year lifespan and virtually eliminates replacement costs for decades. Built-up roofing costs vary based on the number of plies specified.
                </p>
                <p className="text-charcoal-600 leading-relaxed italic">
                  Smart decision: Consider total cost of ownership over the roof's lifespan, not just installation price. Lower-cost materials may require more frequent replacement.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Existing Roof Removal and Disposal</h3>
                <p className="text-charcoal-600 leading-relaxed">
                  Removing and disposing of existing roofing adds significant labor and hauling costs but is often necessary for proper installation. Single-layer tear-offs cost less than removing multiple layers of built-up roofing. Some commercial projects qualify for roof-over applications where new membrane installs directly over existing systems—this approach saves tear-off costs but adds weight requiring structural evaluation. Columbus properties with gravel-surfaced roofs face higher disposal costs due to weight and volume.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Roof Accessibility and Building Height</h3>
                <p className="text-charcoal-600 leading-relaxed">
                  Single-story buildings with clear surrounding access allow straightforward material delivery and installation. Multi-story buildings, cramped urban locations, or properties with landscaping restrictions require cranes, hoists, or additional equipment that increases project costs. Downtown Columbus buildings may need street closure permits and after-hours work to avoid disrupting traffic—factors that add expense but are necessary for project success. Properties with limited parking require planning for material staging and equipment placement.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Roof Complexity and Penetrations</h3>
                <p className="text-charcoal-600 leading-relaxed">
                  Simple rectangular roofs cost less per square foot than complex configurations with multiple levels, skylights, rooftop HVAC equipment, vents, and other penetrations. Each penetration requires careful flashing and waterproofing detail work. Restaurants with extensive exhaust systems or manufacturing facilities with process equipment create more complex installations. Parapet walls, expansion joints, and unusual architectural features add labor but are necessary for proper installation. Detailed inspection helps identify complexity factors affecting your project cost.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Business Disruption Considerations</h3>
                <p className="text-charcoal-600 leading-relaxed">
                  Businesses requiring minimal operational disruption may choose premium installation methods or scheduling that adds project cost but protects revenue. Evening, weekend, or overnight installation keeps your Columbus business running normally during the day. Phased installations allow partial building operations to continue. For sensitive operations like medical facilities or food service, enhanced dust control and contamination prevention measures add expense but are essential. These considerations factor into project planning and pricing.
                </p>
              </div>

              <div className="bg-primary-50 border-l-4 border-primary-700 p-6 rounded-r-lg">
                <h4 className="font-bold text-charcoal-900 mb-2">Comprehensive Project Estimates</h4>
                <p className="text-charcoal-700 leading-relaxed">
                  We provide detailed written estimates after thorough on-site evaluation of your Columbus property. Our proposals itemize material specifications, labor requirements, project timeline, warranty coverage, and any special considerations affecting your investment. This transparency helps you compare options accurately and make confident decisions about protecting your commercial property. <Link to="/contact" className="text-primary-700 hover:text-primary-800 font-semibold">Contact us</Link> for a no-obligation assessment and proposal.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white p-6 rounded-xl border-2 border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer text-lg flex items-center justify-between">
                  How long does commercial roofing last?
                  <ArrowRight className="w-5 h-5 text-primary-700 transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="text-charcoal-700 leading-relaxed mt-4 space-y-3">
                  <p>
                    Commercial roof lifespan depends primarily on the roofing system installed, installation quality, maintenance practices, and Central Ohio's weather exposure. EPDM rubber membranes typically last 20-30 years with proper maintenance, making them a reliable mid-term solution for Columbus businesses. TPO roofing systems provide 15-30 year lifespans—newer TPO formulations show improved durability compared to earlier generations. Modified bitumen systems deliver 15-25 years of dependable protection, particularly effective for high-traffic roofs with regular equipment access.
                  </p>
                  <p>
                    Metal roofing represents the longevity champion, with properly installed standing seam systems lasting 40-70 years—often outlasting the building itself. Built-up roofing (BUR) provides 15-30 year lifespan depending on the number of plies and maintenance. Roof coating systems extend aging commercial roofs by 10-15 years when applied correctly to suitable substrates.
                  </p>
                  <p>
                    Critical factors affecting lifespan include regular professional inspections and maintenance—roofs receiving bi-annual inspections and prompt <Link to="/services/roof-repair" className="text-primary-700 hover:text-primary-800 font-semibold">minor repairs</Link> consistently outlast neglected roofs by years. Columbus's freeze-thaw cycles, summer heat, and storm exposure accelerate deterioration, making maintenance particularly important in our climate. Proper drainage prevents ponding water that dramatically shortens membrane life. Quality installation by experienced commercial roofers ensures systems reach their full potential lifespan—poor installation can cut expected life in half regardless of material quality.
                  </p>
                </div>
              </details>

              <details className="bg-white p-6 rounded-xl border-2 border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer text-lg flex items-center justify-between">
                  Can you work around our business hours?
                  <ArrowRight className="w-5 h-5 text-primary-700 transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="text-charcoal-700 leading-relaxed mt-4 space-y-3">
                  <p>
                    Absolutely—minimizing disruption to your Columbus business operations is fundamental to our commercial roofing approach. We understand that business continuity directly affects your revenue, so project scheduling is planned around your operational requirements rather than just our crew availability. Many of our commercial projects occur during evenings, overnight hours, or weekends when your business is closed or operating at reduced capacity.
                  </p>
                  <p>
                    For retail establishments, we typically schedule work during overnight hours to avoid disrupting customer foot traffic during peak shopping times. Restaurants and food service operations often prefer Monday closures or post-dinner service start times. Office buildings in Dublin and Columbus can sometimes accommodate daytime work if we coordinate with property management to notify tenants, but evening projects eliminate concerns about noise, parking, or building access. Warehouses and distribution centers work with us to schedule around receiving and shipping peaks, often choosing weekend installations.
                  </p>
                  <p>
                    During initial project consultation, we discuss your operational schedule, peak business times, special events, and any specific timing constraints. This information drives our project timeline and crew scheduling. For extensive projects requiring multiple days or weeks, we often phase work to maintain partial operations—completing one section before moving to the next. Emergency repairs receive immediate response regardless of time, as we understand roof leaks during business hours create urgent situations requiring prompt resolution. Our 24/7 emergency availability ensures Columbus businesses get help when unexpected roof failures occur.
                  </p>
                </div>
              </details>

              <details className="bg-white p-6 rounded-xl border-2 border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer text-lg flex items-center justify-between">
                  Do you handle roof inspections for property managers?
                  <ArrowRight className="w-5 h-5 text-primary-700 transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="text-charcoal-700 leading-relaxed mt-4 space-y-3">
                  <p>
                    Yes—property managers represent a significant portion of our Columbus commercial client base, and we've developed services specifically addressing their needs. We conduct comprehensive roof inspections that provide detailed documentation property managers need for ownership reporting, capital planning, and maintenance decisions. Our inspection reports include detailed photo documentation showing roof condition, written assessments of remaining useful life, identification of immediate concerns requiring attention, and long-term recommendations with budget estimates.
                  </p>
                  <p>
                    Many Hilliard and Columbus property managers utilize our scheduled inspection services for multi-property portfolios. We'll visit each property on a coordinated schedule, inspect all roofing, and provide consolidated reporting across your entire portfolio. This approach gives you clear visibility into which properties need immediate attention versus those that can wait, helping prioritize capital expenditures effectively. Our reports provide the documentation needed when requesting maintenance or capital improvement approvals from ownership.
                  </p>
                  <p>
                    For property acquisitions or due diligence, we provide independent roof assessments evaluating condition, estimating remaining life, identifying deferred maintenance, and projecting replacement costs. These pre-purchase inspections help investors and property managers understand roof-related financial obligations before closing. We're experienced working with property management companies, institutional owners, and real estate investment groups who need professional, objective roof assessments for business decision-making. Our property manager clients appreciate our responsive communication, detailed documentation, and understanding that they're managing multiple stakeholder relationships. We can coordinate directly with tenants when needed, work within established vendor protocols, and provide the professionalism property managers need from their contractor partners.
                  </p>
                </div>
              </details>
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
