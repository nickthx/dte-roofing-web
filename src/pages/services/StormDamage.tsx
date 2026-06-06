import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, Cloud, Shield } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { CANONICAL_DOMAIN } from '../../seo/constants';

const STORM_FAQS = [
  {
    question: 'How do I tell hail damage from wind damage on my roof?',
    answer:
      'Hail damage shows up as random, scattered bruises, dented vents, and granule loss with no clear pattern. Wind damage is directional — missing, lifted, or creased shingles concentrated along edges, ridges, and the side the storm hit. Most of the time you need a close-up inspection to tell them apart, because hail bruising is rarely visible from the ground.',
  },
  {
    question: 'Is storm damage roof repair covered by insurance in Ohio?',
    answer:
      'Often, yes. Damage from a covered event like hail or high wind is typically covered by your homeowner\'s policy minus your deductible, while normal age and wear is not. We provide free inspections, document the damage to insurer standards, and meet the adjuster on your roof to make sure the claim reflects the full scope.',
  },
  {
    question: 'How quickly should I get my roof inspected after a storm?',
    answer:
      'Within a few weeks. Filing promptly while the date of loss is clear makes the claim far easier to prove, and catching damage early prevents a small leak from becoming interior water damage. After any storm with hail or high wind, a free inspection is worth it even if the roof looks fine from the ground.',
  },
  {
    question: 'What is emergency roof tarping and do I need it?',
    answer:
      'Emergency tarping is a temporary waterproof cover installed over storm damage to stop water from getting in until permanent repairs are made. You need it any time the roof is breached — missing shingles over the deck, a puncture, or an active leak — because the interior damage from one more rainfall often costs more than the tarp.',
  },
  {
    question: 'Should I pay my deductible, or will the roofer "waive" it?',
    answer:
      'You pay your deductible — that is how insurance claims work. Any contractor offering to waive or absorb your deductible is committing insurance fraud and putting you at risk too. A reputable local roofer charges the deductible as the policy requires and handles the rest of the approved scope with your insurer.',
  },
];

export default function StormDamage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Storm Damage Roof Repair in Central Ohio | DTE Roofing"
        description="Storm, hail & wind damage roof repair across Central Ohio. Free inspections, insurance claim support & emergency tarping. Call 614-971-6028."
        keywords="storm damage repair, hail damage, wind damage, storm roof repair, insurance claims, Columbus storm damage"
        canonical={`${CANONICAL_DOMAIN}/services/storm-damage`}
      />
      <SchemaMarkup
        type="service"
        service={{
          name: "Storm Damage Repair",
          description: "Storm, hail, and wind damage roof repair across Central Ohio. Free inspections, insurance claim support, and emergency tarping. Licensed and insured. Call 614-971-6028.",
          url: "/services/storm-damage"
        }}
        pageTitle="Storm Damage Roof Repair in Central Ohio | DTE Roofing"
        pageDescription="Storm, hail, and wind damage roof repair across Central Ohio. Free inspections, insurance claim support, and emergency tarping. Licensed and insured. Call 614-971-6028."
        pageUrl={`${CANONICAL_DOMAIN}/services/storm-damage`}
        faqs={STORM_FAQS}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Storm Damage Roof Repair in Central Ohio</h1>
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
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Storm Damage, Hail & Wind Damage Roof Repair</h2>
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
                as possible. We proudly serve homeowners across <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> and <Link to="/locations/westerville" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Westerville</Link>, along with other Central Ohio communities impacted by severe weather.
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

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Hail Damage vs. Wind Damage: How to Tell Them Apart</h2>
            <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
              The two most common kinds of storm damage we see in Central Ohio look very different once
              you're up close. Hail damage is random and scattered — bruised shingles, dented vents and
              flashing, and granule loss with no real pattern, because hail falls everywhere at once. The
              tricky part is that hail bruising is rarely visible from the ground, so a roof can look fine
              from the driveway while it's quietly aged years in a single afternoon.
            </p>
            <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
              Wind damage, on the other hand, is directional. You'll see missing, lifted, or creased
              shingles concentrated along the edges, ridges, and whichever side took the brunt of the
              storm. Wind tends to peel shingles back and break their seal, which leaves them flapping and
              lets water under the next rain. Knowing which one you're dealing with matters, because it
              changes both the repair and how the damage gets documented for your insurer. When you're not
              sure, a free <Link to="/services/roof-inspection" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">roof inspection</Link> settles it quickly.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-900 mb-6 mt-12">What Ohio's Storm Season Actually Looks Like</h2>
            <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
              Central Ohio gets the full menu. Spring and early summer bring the most damaging weather —
              severe thunderstorms, hail, and the occasional straight-line wind event or derecho that can
              push 60 to 80 mph gusts across whole counties at once. Summer adds fast-moving storms that
              drop hail with little warning, and winter piles on with ice, heavy snow load, and the
              freeze-thaw cycles that pry open any weakness a storm already created.
            </p>
            <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
              Because these events often hit a wide area at the same time, a single storm can damage
              hundreds of roofs across communities like <Link to="/locations/westerville" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Westerville</Link> and <Link to="/locations/reynoldsburg" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Reynoldsburg</Link> in
              an afternoon. That's also when out-of-town storm chasers show up knocking on doors, so it
              pays to work with a local company that will still be here next winter if something needs
              attention.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-900 mb-6 mt-12">From Inspection to Insurance Claim to Repair</h2>
            <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
              The order you do things in makes a real difference to how a claim turns out. We start with a
              free, thorough inspection and document everything — dated photos, a damage map, and a written
              report that meets insurer standards. That documentation is what turns "I think my roof is
              damaged" into a claim an adjuster takes seriously.
            </p>
            <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
              From there you file the claim and the insurer sends an adjuster to inspect the roof. This is
              the step that decides most claims, so we meet the adjuster on your roof and walk the damage
              with them — the issues we documented get seen and counted instead of missed. If the insurer's
              first scope leaves something out, we submit a supplement with the backup to get it corrected.
              Once the claim is approved, we complete the repairs or full <Link to="/services/roof-replacement" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">roof replacement</Link> and
              handle the final paperwork. We've written a full step-by-step guide to{' '}
              <Link to="/blog/hail-damage-roof-insurance-claim-ohio" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">filing a hail damage insurance claim in Ohio</Link>{' '}
              if you want the details before you call your insurer.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-900 mb-6 mt-12">Emergency Tarping: Stopping the Damage Before It Spreads</h2>
            <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
              When a storm actually breaches the roof — shingles torn off over the bare deck, a puncture
              from a fallen branch, or an active leak — waiting even a day or two can be costly. Every
              rainfall that gets in adds to the interior damage: soaked insulation, stained ceilings, and
              the start of mold. That's why we offer emergency tarping to cover the breach with a
              waterproof barrier and buy time until permanent repairs can be scheduled.
            </p>
            <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
              Tarping is a temporary fix, not the repair itself, but it protects what's underneath and
              often costs far less than the water damage it prevents. If a tree or limb came through, a
              fast emergency response paired with a proper <Link to="/services/roof-repair" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">roof repair</Link> afterward
              keeps a bad night from turning into a much bigger project.
            </p>

            <section aria-labelledby="storm-faq-heading" className="mt-12 pt-8 border-t border-gray-200">
              <h2 id="storm-faq-heading" className="text-3xl font-bold text-charcoal-900 mb-8">Storm Damage FAQ</h2>
              <div className="space-y-8">
                {STORM_FAQS.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-xl font-bold text-charcoal-900 mb-2">{faq.question}</h3>
                    <p className="text-lg text-charcoal-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
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
