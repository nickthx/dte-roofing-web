import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, Palette, Shield } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { CANONICAL_DOMAIN } from '../../seo/constants';

export default function Siding() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Siding Installation & Repair in Central Ohio | DTE Roofing"
        description="Siding installation and repair across Central Ohio. Vinyl, fiber cement, and composite siding, plus storm damage repair and complete exterior packages. Call 614-971-6028."
        keywords="siding installation Columbus, vinyl siding, LP Smart Siding, siding repair, siding replacement, Columbus siding contractor"
        canonical={`${CANONICAL_DOMAIN}/services/siding`}
      />
      <SchemaMarkup
        type="service"
        service={{
          name: "Siding Installation & Repair",
          description: "Siding installation and repair across Central Ohio. Vinyl, fiber cement, and composite siding, plus storm damage repair and complete exterior packages. Call 614-971-6028.",
          url: "/services/siding"
        }}
        pageTitle="Siding Installation & Repair in Central Ohio | DTE Roofing"
        pageDescription="Siding installation and repair across Central Ohio. Vinyl, fiber cement, and composite siding, plus storm damage repair and complete exterior packages. Call 614-971-6028."
        pageUrl={`${CANONICAL_DOMAIN}/services/siding`}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Siding Installation & Repair in Central Ohio</h1>
            <p className="text-xl text-gray-200">
              Transform your home's exterior with quality siding installation and repair
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Vinyl Siding, Fiber Cement & Composite Siding Options</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Serving <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">across Columbus</Link>, <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link>, <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Dublin</Link>, and Grove City, DTE Roofing transforms
                homes with professional siding installation and repair. Your siding does more than look good—it's
                your home's first line of defense against Ohio's unpredictable weather, from summer storms to
                winter cold. Quality siding protects your home, improves energy efficiency, and significantly
                boosts curb appeal and property value.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Whether you're ready for a complete exterior makeover, need storm damage repairs, or want to
                replace worn-out siding, our experienced team delivers beautiful, long-lasting results using
                premium materials designed for Central Ohio's climate.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Home className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Curb Appeal</h3>
                  <p className="text-xs text-charcoal-600">Beautiful finish</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Protection</h3>
                  <p className="text-xs text-charcoal-600">Weather resistant</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Palette className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm mb-1">Customization</h3>
                  <p className="text-xs text-charcoal-600">Many colors & styles</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Our Siding Services</h3>
              <ul className="space-y-4">
                {[
                  'New siding installation',
                  'Complete siding replacement',
                  'Siding repair and restoration',
                  'Storm damage repair',
                  'Vinyl siding installation',
                  'LP Smart Siding',
                  'Wood siding repair',
                  'Trim and fascia work',
                  'Soffit and fascia installation',
                  'Color consultation',
                  'Insurance claim assistance',
                  'Warranty-backed installation'
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Types of Siding Available for Columbus Homes</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed max-w-4xl">
              Choosing the right siding for your Central Ohio home means considering our region's unique climate challenges—hot, humid summers, freezing winters with snow and ice, temperature swings that cause expansion and contraction, and severe storms. The ideal siding material withstands these conditions while maintaining its appearance and protecting your investment.
            </p>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Vinyl Siding</h3>
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  The most popular choice for Columbus homeowners, vinyl siding combines affordability with proven durability and minimal maintenance. Modern vinyl products feature improved impact resistance and fade protection compared to earlier generations.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Central Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Never needs painting, saving thousands over its lifespan</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Resists moisture and humidity without rotting or warping</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Excellent insect resistance—termites won't damage vinyl</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Wide range of colors to match any Columbus neighborhood style</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Most budget-friendly option with 20-40 year lifespan</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Can crack in extreme cold if impacted</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Lower-grade vinyl may fade over time in direct sun</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Cannot be painted if you want to change colors later</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Budget-conscious Columbus homeowners seeking low maintenance and reliable protection
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Fiber Cement Siding (James Hardie)</h3>
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  Fiber cement siding, with James Hardie being the leading brand, offers premium performance that excels in Ohio's climate. Increasingly popular in Dublin and Hilliard's upscale neighborhoods, it provides the beauty of wood without the maintenance concerns.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Central Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Exceptional durability withstands Ohio's temperature extremes</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Fire resistant—won't ignite, burn, or release toxic smoke</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Impervious to termites and wood-boring insects</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Won't rot, crack, or delaminate from moisture exposure</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Can be painted any color with long-lasting results</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>30-50 year lifespan with proper maintenance</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Higher upfront cost than vinyl siding</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Requires repainting every 10-15 years to maintain appearance</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Heavier material requires professional installation</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Columbus homeowners prioritizing durability, fire safety, and premium appearance with excellent ROI
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Engineered Wood Siding (LP SmartSide)</h3>
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  LP SmartSide engineered wood siding delivers authentic wood appearance with enhanced durability. Treated to resist moisture, insects, and fungal decay, it performs well in Central Ohio's humid conditions.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages for Central Ohio Climate:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Authentic wood grain texture and appearance</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>SmartGuard process resists moisture damage and fungal decay</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Zinc borate treatment prevents termite infestation</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Holds paint exceptionally well, reducing maintenance frequency</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Impact resistant for hail-prone areas</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>50-year limited warranty coverage</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Mid-to-upper price range</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Requires periodic painting to maintain warranty and appearance</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Not as maintenance-free as vinyl</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Homeowners in Grove City and Columbus wanting wood aesthetics with improved durability
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Natural Wood Siding</h3>
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  Cedar, redwood, and pine offer timeless beauty and traditional charm. While requiring more maintenance, natural wood provides unmatched character for historic Columbus homes and custom builds.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Advantages:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Authentic, natural beauty that ages gracefully</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Environmentally friendly, renewable resource</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Can be painted or stained in unlimited colors</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Excellent insulation properties</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Adds significant character and curb appeal</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Requires regular painting or staining (every 3-7 years)</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Susceptible to moisture damage in humid Ohio summers</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Can attract insects without proper treatment</span>
                      </li>
                      <li className="flex items-start text-charcoal-600">
                        <span className="text-primary-700 mr-2 font-bold">•</span>
                        <span>Higher maintenance time and cost commitment</span>
                      </li>
                    </ul>
                    <p className="text-charcoal-600 mt-4 italic">
                      Best for: Historic home restoration projects and homeowners committed to ongoing maintenance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-700 p-6 rounded-r-lg mt-8">
              <h4 className="font-bold text-charcoal-900 mb-2">Need Help Deciding?</h4>
              <p className="text-charcoal-700 leading-relaxed">
                We provide personalized consultations to help you select the ideal siding material for your Columbus home's architecture, your budget, and your maintenance preferences. When planning exterior updates, many homeowners also consider coordinating <Link to="/services/roof-replacement" className="text-primary-700 hover:text-primary-800 font-semibold">roof replacement</Link> and <Link to="/services/gutters" className="text-primary-700 hover:text-primary-800 font-semibold">gutter installation</Link> for a complete transformation.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Signs Your Columbus Home Needs Siding Replacement</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed">
              Recognizing when your siding needs attention protects your home from costly structural damage. Central Ohio's weather accelerates siding deterioration through freeze-thaw cycles, humidity, and storm impacts. Here are clear indicators that it's time to address your siding:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Warping, Buckling, or Cracking</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Visible warping occurs when siding panels no longer lie flat against your home. Buckling creates waves or ripples across the surface. Cracks allow moisture penetration that leads to interior damage. These issues stem from temperature fluctuations, improper installation, or material failure, and indicate compromised protection.
                </p>
                <p className="text-charcoal-600 leading-relaxed text-sm italic">
                  What to do: Schedule a thorough <Link to="/services/roof-inspection" className="text-primary-700 hover:text-primary-800 font-semibold">exterior inspection</Link> to assess the extent of damage.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Fading and Discoloration</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  While some gradual fading is normal, dramatic color loss or uneven discoloration signals UV degradation and material breakdown. Faded siding not only impacts curb appeal but indicates the material has lost protective properties. If your Columbus home's siding color looks washed out or patchy, replacement improves both appearance and protection.
                </p>
                <p className="text-charcoal-600 leading-relaxed text-sm italic">
                  Timeline concern: Once significant fading appears, material integrity continues declining rapidly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Moisture Damage and Mold Growth</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Water stains, soft spots, or visible mold on siding indicate moisture infiltration. Central Ohio's humidity exacerbates these issues. Interior signs include wall stains, peeling wallpaper, or musty odors. Moisture behind siding causes rot, structural damage, and health concerns. This requires immediate attention to prevent expensive repairs.
                </p>
                <p className="text-charcoal-600 leading-relaxed text-sm italic">
                  Critical issue: Moisture damage worsens quickly and affects insulation and framing.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Pest Damage and Holes</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Woodpeckers create holes searching for insects, while carpenter bees bore into wood siding. Termites and carpenter ants cause internal damage that weakens structural integrity. Small holes in siding provide entry points for water and additional pests. Wood and engineered wood siding in Grove City and Columbus are particularly vulnerable without proper treatment.
                </p>
                <p className="text-charcoal-600 leading-relaxed text-sm italic">
                  Prevention: Fiber cement and vinyl siding eliminate pest vulnerability entirely.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Increasing Energy Bills</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  If your heating or cooling costs have risen without explanation, failing siding may be the culprit. Damaged or deteriorated siding reduces your home's insulation efficiency, forcing HVAC systems to work harder. Air leaks around siding panels create drafts and temperature inconsistencies. Replacing old siding with modern insulated options often reduces energy costs by 20-30%.
                </p>
                <p className="text-charcoal-600 leading-relaxed text-sm italic">
                  ROI benefit: Energy savings help offset the cost of new siding over time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Age and Frequent Repairs</h3>
                <p className="text-charcoal-600 leading-relaxed mb-3">
                  Siding approaching or exceeding 20 years old typically nears the end of its effective lifespan. If you're making frequent repairs—replacing panels, repainting, or addressing recurring issues—replacement becomes more cost-effective than continued maintenance. Older siding also lacks modern energy efficiency features and weather resistance.
                </p>
                <p className="text-charcoal-600 leading-relaxed text-sm italic">
                  Smart timing: Replace aging siding before minor issues escalate to structural damage.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Understanding Siding Costs in Columbus</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed">
              Siding replacement represents a significant investment that protects your home and enhances its value. Several factors influence project costs for Columbus-area homeowners, and understanding these helps you budget appropriately and make informed material selections.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Vinyl Siding</h3>
                <p className="text-3xl font-bold text-green-700 mb-2">$</p>
                <p className="text-charcoal-700 font-semibold mb-3">Most Affordable</p>
                <p className="text-charcoal-600 text-sm leading-relaxed">
                  Budget-friendly option offering excellent value. Installation costs vary based on home size and style complexity but remain the most economical choice for Columbus homeowners.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Engineered Wood</h3>
                <p className="text-3xl font-bold text-blue-700 mb-2">$$</p>
                <p className="text-charcoal-700 font-semibold mb-3">Mid-Range</p>
                <p className="text-charcoal-600 text-sm leading-relaxed">
                  LP SmartSide and similar products fall in the mid-price range. Higher upfront cost than vinyl but offers enhanced durability and premium appearance with good long-term value.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Fiber Cement</h3>
                <p className="text-3xl font-bold text-purple-700 mb-2">$$$</p>
                <p className="text-charcoal-700 font-semibold mb-3">Premium</p>
                <p className="text-charcoal-600 text-sm leading-relaxed">
                  James Hardie and fiber cement represent the premium option. Higher initial investment delivers exceptional durability, fire resistance, and excellent ROI through longevity and increased home value.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Key Cost Factors for Central Ohio Projects</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Home Size and Height</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                      Square footage directly impacts material and labor costs. Two-story homes require scaffolding and additional safety equipment, increasing installation expense. Typical Columbus homes range from 1,500 to 3,000 square feet of siding area.
                    </p>

                    <h4 className="font-semibold text-charcoal-900 mb-2">Material Selection</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                      Material choice represents the largest cost variable. Premium materials like fiber cement cost 2-3 times more than vinyl per square foot but last significantly longer and offer superior performance in Ohio weather.
                    </p>

                    <h4 className="font-semibold text-charcoal-900 mb-2">Removal of Existing Siding</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      Removing old siding adds to project cost but is essential for proper installation. Multiple existing layers, asbestos-containing materials (common in older Columbus homes), or damaged sheathing requiring repair increase this expense.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-2">Architectural Complexity</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                      Homes with intricate details, multiple peaks and valleys, bay windows, or decorative trim require more labor and precision cutting. Simple ranch-style homes in Grove City cost less per square foot than complex Victorian designs in German Village.
                    </p>

                    <h4 className="font-semibold text-charcoal-900 mb-2">Trim, Soffit, and Fascia Work</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                      Replacing trim boards, soffit, and fascia ensures a complete, coordinated appearance and addresses hidden damage. This additional work adds cost but delivers a professional, finished look and comprehensive protection.
                    </p>

                    <h4 className="font-semibold text-charcoal-900 mb-2">Insulation Upgrades</h4>
                    <p className="text-charcoal-600 text-sm leading-relaxed">
                      Adding insulated siding or house wrap improves energy efficiency but increases material costs. For Columbus homes with high energy bills, this upgrade often pays for itself through reduced heating and cooling expenses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 border-l-4 border-primary-700 p-6 rounded-r-lg">
                <h4 className="font-bold text-charcoal-900 mb-2">Getting Accurate Estimates</h4>
                <p className="text-charcoal-700 leading-relaxed">
                  We provide detailed, written estimates after inspecting your home in person. This allows us to assess all factors affecting your project—existing siding condition, necessary repairs, material requirements, and labor complexity. Our estimates include itemized costs, material specifications, timeline expectations, and warranty details, so you have complete information for your investment decision.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Energy Efficiency and Home Value Benefits</h2>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed">
              New siding delivers substantial returns beyond improved appearance, offering measurable benefits that impact your daily comfort and long-term home value.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Energy Efficiency Improvements</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-2">Reduced Heating and Cooling Costs</h4>
                    <p className="text-charcoal-700 leading-relaxed">
                      Modern insulated siding creates a thermal barrier that reduces heat transfer. Columbus homeowners typically see 15-25% reduction in energy bills after siding replacement with insulated products. This translates to hundreds of dollars in annual savings, particularly during Ohio's hot summers and cold winters.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-2">Improved Home Comfort</h4>
                    <p className="text-charcoal-700 leading-relaxed">
                      New siding eliminates drafts and air leaks that create cold spots in winter and hot zones in summer. Better temperature consistency throughout your Hilliard or Dublin home means more comfortable living spaces and reduced strain on HVAC systems.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-2">Moisture Control</h4>
                    <p className="text-charcoal-700 leading-relaxed">
                      Properly installed siding with modern moisture barriers prevents condensation and water infiltration. This protects insulation effectiveness, prevents mold growth, and maintains indoor air quality—critical concerns in Central Ohio's humid climate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border-2 border-green-200">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Increased Property Value</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-2">Excellent Return on Investment</h4>
                    <p className="text-charcoal-700 leading-relaxed">
                      Siding replacement consistently ranks among the top home improvements for ROI. Columbus homeowners typically recoup 75-85% of siding costs at resale, with premium materials often returning even more. Fresh siding dramatically improves first impressions for potential buyers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-2">Enhanced Curb Appeal</h4>
                    <p className="text-charcoal-700 leading-relaxed">
                      New siding transforms your home's exterior, creating instant curb appeal that stands out in any Columbus neighborhood. Updated appearance increases perceived home value and attracts more interested buyers if you decide to sell.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-2">Faster Sales at Premium Prices</h4>
                    <p className="text-charcoal-700 leading-relaxed">
                      Homes with new siding sell faster and command higher prices than comparable properties with aging exteriors. Buyers appreciate move-in-ready homes without deferred maintenance, and new siding signals overall property care and quality.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-2">Long-Term Protection Value</h4>
                    <p className="text-charcoal-700 leading-relaxed">
                      Beyond immediate resale value, new siding protects your investment by preventing costly structural damage from moisture, pests, and weather. This protection preserves your home's value over decades of ownership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Frequently Asked Questions About Siding</h2>
            <div className="space-y-4">
              <details className="bg-white p-6 rounded-xl border-2 border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer text-lg flex items-center justify-between">
                  How long does siding typically last?
                  <ArrowRight className="w-5 h-5 text-primary-700 transform group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  Siding lifespan depends primarily on material choice and maintenance. Vinyl siding typically lasts 20-40 years with minimal maintenance, making it the most popular choice for Columbus homeowners seeking long-term value. Fiber cement siding (James Hardie) offers exceptional durability with a lifespan of 30-50 years when properly maintained, including repainting every 10-15 years. Engineered wood siding like LP SmartSide can last 30-40 years with periodic painting and proper care. Natural wood siding varies considerably—with diligent maintenance (painting/staining every 3-7 years), cedar can last 20-40 years, but neglect significantly shortens lifespan. Central Ohio's climate impacts all materials through temperature extremes, humidity, and storm exposure. Premium materials with proper installation and maintenance provide the best longevity. Regular inspections, prompt repairs, and keeping gutters clean extend any siding's effective lifespan. If your Columbus home's siding approaches 20+ years and shows deterioration signs, replacement typically offers better value than continued repairs.
                </p>
              </details>

              <details className="bg-white p-6 rounded-xl border-2 border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer text-lg flex items-center justify-between">
                  Can you install siding in winter?
                  <ArrowRight className="w-5 h-5 text-primary-700 transform group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  Yes, we install siding year-round in Columbus, though winter installations require additional considerations. Most modern siding materials can be installed in cold weather with proper techniques. Vinyl siding requires special attention—when temperatures drop below 40°F, vinyl becomes more brittle and requires careful handling to prevent cracking during cutting and nailing. We allow vinyl to acclimate to outdoor temperatures before installation and adjust fastening techniques for cold-weather expansion. Fiber cement and engineered wood siding install well in winter since these materials don't become brittle in cold temperatures. However, extremely cold days (below 20°F) or frozen ground creating difficult working conditions may require schedule adjustments. Winter advantages include shorter lead times since it's our slower season, often more flexible scheduling, and typically lower humidity reducing moisture-related delays. Spring and fall remain ideal for Columbus siding projects with moderate temperatures and comfortable working conditions, but winter installation is certainly viable when proper cold-weather protocols are followed. If you need winter siding replacement, we'll assess conditions and ensure quality installation regardless of season.
                </p>
              </details>

              <details className="bg-white p-6 rounded-xl border-2 border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer text-lg flex items-center justify-between">
                  Should I replace siding and roof at the same time?
                  <ArrowRight className="w-5 h-5 text-primary-700 transform group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  Coordinating siding and roofing projects offers significant advantages for Columbus homeowners. If both need replacement within a few years of each other, simultaneous installation makes practical and financial sense. Key benefits include cost savings—bundling projects often reduces overall costs through shared mobilization, equipment, and labor efficiency. You'll also achieve aesthetic coordination by selecting complementary colors and styles for a cohesive exterior transformation. Project efficiency is another advantage—completing both at once minimizes disruption to your daily life versus two separate projects. There's also potential for improved warranties when the same contractor handles comprehensive exterior work. However, considerations include larger upfront investment requiring more significant financing, and extended project timelines compared to single projects. If your Columbus home's roof and siding are both aging (15-20+ years old), showing deterioration, or you're planning to sell within a few years, simultaneous replacement maximizes ROI and creates a completely refreshed exterior. We offer comprehensive exterior assessments to evaluate both your <Link to="/services/roof-replacement" className="text-primary-700 hover:text-primary-800 font-semibold">roof</Link> and siding condition, helping you make informed decisions about timing and prioritization. Many Hilliard and Dublin homeowners choose complete exterior makeovers that include roof, siding, and gutters for maximum impact and value.
                </p>
              </details>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Our Installation Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Consultation',
                  description: 'Free estimate and material selection guidance'
                },
                {
                  step: '2',
                  title: 'Preparation',
                  description: 'Remove old siding and prepare surface'
                },
                {
                  step: '3',
                  title: 'Installation',
                  description: 'Expert installation with attention to detail'
                },
                {
                  step: '4',
                  title: 'Inspection',
                  description: 'Quality check and final walkthrough'
                }
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

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-r-xl">
            <h3 className="font-bold text-charcoal-900 mb-4 text-xl">Color & Style Options</h3>
            <p className="text-charcoal-700 mb-4">
              Choose from dozens of colors and styles to perfectly match your home's architecture and
              your personal taste. We offer free color consultations to help you select the perfect
              combination for your home.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-charcoal-900 mb-2">Popular Styles:</h4>
                <ul className="space-y-1">
                  {['Traditional lap siding', 'Vertical board & batten', 'Shake and shingle style', 'Dutch lap', 'Scalloped'].map((style, i) => (
                    <li key={i} className="text-charcoal-700 text-sm flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-700 rounded-full mr-2"></span>
                      {style}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal-900 mb-2">Popular Colors:</h4>
                <ul className="space-y-1">
                  {['Classic whites and creams', 'Earth tones (browns, tans)', 'Cool grays', 'Bold blues and greens', 'Custom colors available'].map((color, i) => (
                    <li key={i} className="text-charcoal-700 text-sm flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-700 rounded-full mr-2"></span>
                      {color}
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
