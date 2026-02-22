import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Navigation } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';

export default function Reynoldsburg() {
  const { reviewData } = useReviewData();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Roofers Reynoldsburg, OH | DTE Roofing — Owner-Led Roof Inspections"
        description="DTE Roofing serves Reynoldsburg, OH from our Columbus HQ at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Roof repair, replacement, storm damage, gutters. Call 614-971-6028."
        keywords="roofers reynoldsburg, roof repair reynoldsburg, roof replacement reynoldsburg, roofing company reynoldsburg, storm damage reynoldsburg, gutter services reynoldsburg, roofer near me reynoldsburg, roofers columbus"
        canonical="https://www.dteroofingllc.com/locations/reynoldsburg"
      />
      <SchemaMarkup
        type="location"
        locationName="Reynoldsburg"
        pageTitle="Roofers in Reynoldsburg, OH | DTE Roofing"
        pageDescription="DTE Roofing serves Reynoldsburg, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Detail-first roof repair and replacement with owners personally involved in every project."
        pageUrl="https://www.dteroofingllc.com/locations/reynoldsburg"
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Reynoldsburg, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roofers Reynoldsburg, OH | DTE Roofing</h1>
            <p className="text-xl text-gray-200 mb-6">
              Expert roof repair, replacement, and storm damage services for Reynoldsburg homeowners—from Livingston Ave corridors to Taylor Road, East Main Street to Blacklick Creek areas. Based at 615 Hilliard Rome Rd, Columbus, OH 43228, our owners work with every customer and deliver detail-first craftsmanship.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              ⭐ {reviewData?.totalReviews || 92} verified reviews • {reviewData?.averageRating?.toFixed(1) || '5.0'} average rating
            </p>
            <a
              href="tel:6149716028"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-xl"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call 614-971-6028
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Trusted Roofers in Reynoldsburg</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We're based in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228, and serve Reynoldsburg regularly on the east and southeast side of Columbus. With easy access via <strong>I-270</strong> and <strong>I-70</strong>, we reach Reynoldsburg efficiently—from <strong>Livingston Ave</strong> neighborhoods to <strong>East Main Street</strong> corridors, from <strong>Taylor Road</strong> to <strong>Broad Street (US-40)</strong> areas, and communities near <strong>Blacklick Creek</strong> and <strong>Blacklick Woods Metro Park</strong>. Our owners are personally involved in every project—ensuring quality and direct communication throughout.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Reynoldsburg, known as the <strong>"Birthplace of the Tomato,"</strong> features diverse housing—from older ranch homes and colonials to newer developments throughout the east side. This architectural variety creates specific roofing challenges: wind-driven rain stressing older flashing around chimneys and dormers, hail and severe thunderstorms common to Central Ohio requiring careful inspection and documentation, mature tree debris clogging gutters and causing overflow damage to fascia and soffit, and harsh winter freeze-thaw cycles that require proper ventilation and ice and water shield to prevent ice dams.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Our detail-first approach means thorough cleanup, property protection, and meticulous craftsmanship on every project. Whether you need emergency storm repairs, honest diagnostics on repair vs replacement decisions, or a planned roof replacement, we treat your home with the same care we'd expect for our own. We help homeowners make the right call—sometimes a targeted repair extends serviceable lifespan 5-10 years, other times replacement proves more cost-effective than ongoing repair cycles.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Reynoldsburg Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Owners personally involved in every project",
                    "Based in Columbus—serving Reynoldsburg regularly",
                    "Great attention to detail on every project",
                    "Experience with wind-driven rain and flashing issues",
                    "Expert at documenting hail/storm damage for insurance",
                    "Understanding of mature tree debris and gutter challenges",
                    "Knowledge of freeze-thaw cycles and ventilation needs",
                    "Honest diagnostics—repair vs replacement guidance",
                    "Licensed, insured, and committed to quality craftsmanship"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 mb-8">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for Reynoldsburg</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Free Roof Inspections", link: "/services/roof-inspection" },
                    { name: "Roof Repair", link: "/services/roof-repair" },
                    { name: "Roof Replacement", link: "/services/roof-replacement" },
                    { name: "24/7 Emergency Services", link: "/services/emergency-services" },
                    { name: "Storm Damage Repair", link: "/services/storm-damage" },
                    { name: "Insurance Claims Assistance", link: "/contact" },
                    { name: "Gutter Services", link: "/services/gutters" },
                    { name: "Siding Installation", link: "/services/siding" },
                    { name: "Preventative Maintenance", link: "/services/preventative-maintenance" },
                    { name: "Ventilation Upgrades", link: "/services/roof-repair" },
                    { name: "Flashing Repair", link: "/services/roof-repair" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-1" />
                      <Link to={item.link} className="text-charcoal-700 hover:text-primary-700 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <h3 className="font-bold text-charcoal-900 mb-2 text-lg">Free Roofing Estimates</h3>
                <p className="text-charcoal-700 mb-4">
                  Our owners personally oversee every roofing project in Reynoldsburg—just honest assessments and fair pricing.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold"
                >
                  Request Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Reynoldsburg Neighborhoods We Serve</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Downtown Reynoldsburg",
                "Old Reynoldsburg",
                "Rosehill Area",
                "East Main St Corridor",
                "Broad St (US-40) Corridor",
                "Taylor Rd Corridor",
                "Livingston Ave Corridor",
                "Blacklick Area",
                "Blacklick Creek Area",
                "Near I-70 / Brice Rd",
                "Near I-270 / East Belt",
                "Near Pickerington Border",
                "Near Whitehall Border",
                "Near Canal Winchester",
                "Near Pataskala",
                "Tussing",
                "Brice",
                "Mifflin Township"
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Common Roofing Issues in Reynoldsburg</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Wind-Driven Rain and Flashing Failures</h3>
                <p className="text-charcoal-600">
                  Central Ohio's weather patterns bring frequent wind-driven rain that stresses roof seals, especially around chimneys, skylights, and dormers. Older flashing around these vulnerable areas degrades over time, and wind forces water under compromised seals. Step flashing along rooflines and wall intersections is particularly vulnerable. We inspect flashing carefully during every assessment and repair or replace it with high-quality materials designed for decades of protection against Reynoldsburg's variable weather conditions.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Hail/Severe Thunderstorms: Insurance Documentation</h3>
                <p className="text-charcoal-600">
                  Reynoldsburg experiences frequent hail and severe thunderstorms as part of Central Ohio's weather patterns. After storm events, roofs require thorough documentation for successful insurance claims. We provide detailed photo evidence, shingle samples showing hail impact, measurements, and written reports that meet insurance requirements. With insurers tightening claim requirements in 2025-2026, proper documentation has never been more important. We help navigate the claims process and advocate for fair settlements covering all legitimate damage.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Mature Tree Debris and Gutter Overflow</h3>
                <p className="text-charcoal-600">
                  Many established Reynoldsburg neighborhoods feature mature trees that drop constant debris into gutters. Clogged gutters overflow during rains, damaging fascia, soffit, and foundation drainage. Dense shade also encourages moss and algae growth on north-facing slopes. We address these challenges through algae-resistant shingles, gutter maintenance and cleaning, gutter guard installation in high-debris areas, and regular preventative maintenance programs. If tree debris has caused damage to fascia or soffit, we assess and repair all related issues comprehensively.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Winter Freeze-Thaw and Ice Dam Prevention</h3>
                <p className="text-charcoal-600">
                  Ohio winters bring harsh freeze-thaw cycles that stress roofing systems. Poor attic ventilation—common in older homes—causes warm air to melt snow unevenly, leading to ice dams at eaves and water backup under shingles. We assess ventilation during every inspection, install ice and water shield at vulnerable areas during replacements, and recommend ventilation improvements when needed. Proper ventilation prevents winter damage, reduces energy costs, and extends shingle lifespan year-round.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Proximity Proof: Serving Reynoldsburg from our Columbus HQ</h2>
            <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <Navigation className="w-8 h-8 text-primary-700" />
                  <h3 className="text-2xl font-bold text-charcoal-900">Office Location</h3>
                </div>
                <p className="text-lg text-charcoal-600 mb-4">
                  <strong>615 Hilliard Rome Rd, Columbus, OH 43228</strong>
                </p>
                <p className="text-lg text-charcoal-600 mb-6">
                  We're based on the west side of Columbus and serve Reynoldsburg regularly on the east and southeast side. Access from Reynoldsburg: I-270 east side exits, I-70 corridors, East Main Street/US-40 routes, or Livingston Ave connectors. Whether you're near Taylor Road, Broad Street, Blacklick Creek, or anywhere in the Reynoldsburg area, we provide prompt, professional service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Reynoldsburg,+OH&destination=615+Hilliard+Rome+Rd,+Columbus,+OH+43228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center"
                  >
                    <Navigation className="mr-2 w-5 h-5" />
                    Get Directions from Reynoldsburg
                  </a>
                  <Link
                    to="/contact"
                    className="bg-charcoal-900 text-white px-6 py-3 rounded-lg hover:bg-charcoal-800 transition-all font-semibold inline-flex items-center justify-center"
                  >
                    Schedule Estimate <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Map: DTE Roofing Serving Reynoldsburg</h2>
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.8779986954747!2d-83.16920092346665!3d39.99827597151532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88388e4a4b0be8a3%3A0x6a7a18f7f4b7e8a0!2s615%20Hilliard%20Rome%20Rd%2C%20Columbus%2C%20OH%2043228!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DTE Roofing serving Reynoldsburg - 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Reynoldsburg Roofing FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you serve Reynoldsburg if you're based in Columbus?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. We're based at 615 Hilliard Rome Rd, Columbus, OH 43228, and serve Reynoldsburg regularly on the east and southeast side of Columbus. Distance has never been an issue—we know the routes (I-270, I-70, East Main/US-40, Livingston Ave corridors) and respond efficiently to all Reynoldsburg areas from downtown to Blacklick Creek to neighborhoods near Pickerington and Canal Winchester borders.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How fast can you inspect after wind/hail damage?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  We prioritize emergency calls and storm damage inspections. For active leaks or visible damage, we often respond same-day or next-day. After major storm events affecting Reynoldsburg, we work through our queue as quickly as possible—typically within 2-3 days. Call 614-971-6028 immediately after storms, and we'll schedule you as soon as possible to document damage for insurance claims before evidence fades.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you help with insurance documentation for storm damage?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. If your roof damage is from wind, hail, or storm events, your homeowner's insurance may cover repairs or replacement. We document storm damage with detailed photos, shingle samples showing hail impact, measurements, and written reports that meet insurance requirements. We can meet with adjusters on-site if needed and advocate for fair settlements. With insurers tightening claim requirements in 2025-2026, proper documentation has never been more important for protecting your investment.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What causes leaks around chimneys and step flashing?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Flashing around chimneys, skylights, and dormers (step flashing) is designed to direct water away from these vulnerable intersections. Over time, flashing seals degrade from weather exposure—especially wind-driven rain common in Central Ohio. Wind forces water under compromised seals, leading to leaks that damage interior ceilings and walls. We inspect flashing carefully during every assessment and repair or replace it with high-quality materials that provide decades of protection.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Is ice and water shield worth it in this climate?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. Ice and water shield is a self-sealing underlayment installed at vulnerable areas like eaves, valleys, and around penetrations. Ohio winters bring harsh freeze-thaw cycles that can cause ice dams when poor ventilation allows uneven snow melting. Ice and water shield provides critical protection against water backup under shingles. We recommend it for all roof replacements in this climate—it's an affordable upgrade that prevents expensive water damage and extends roof lifespan.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you handle gutters and drainage issues?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. Mature trees in many Reynoldsburg neighborhoods mean constant debris accumulation in gutters. Clogged gutters overflow during rains, damaging fascia, soffit, and foundation drainage. We provide gutter cleaning, repairs, and full gutter replacement. We can also install gutter guards in areas with heavy leaf accumulation. If tree debris has caused damage to your fascia or soffit, we assess and repair all related issues comprehensively.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you work with HOAs or community standards?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. Some Reynoldsburg neighborhoods have HOA requirements or architectural guidelines for exterior work. We're experienced in matching existing shingle styles and colors, providing documentation for HOA submissions where needed, and ensuring work meets community standards. We can help you understand what approvals may be required and provide the information necessary. Our goal is to make the process smooth while respecting Reynoldsburg's community character.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What's the fastest way to schedule an inspection?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Call us directly at 614-971-6028. You'll speak with one of our owners—no phone trees or call centers. We'll ask a few questions about your roof, schedule an inspection at your convenience, and one of our owners will come personally to assess your roof and discuss your options. Most inspections are scheduled within 2-3 days, and emergency situations get same-day or next-day priority response.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Should I repair or replace my aging roof?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  The repair vs replacement decision depends on roof age, extent of damage, overall condition, and cost-effectiveness. Roofs under 15 years with isolated damage often benefit from targeted repairs. Roofs approaching or exceeding 20 years, showing widespread deterioration, or requiring repeated repairs often prove more cost-effective to replace entirely. We provide honest assessments—sometimes recommending repairs that extend serviceable lifespan 5-10 years, other times advising replacement when repairs prove false economy. Our recommendations prioritize your long-term interests over maximizing short-term revenue.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How long does a typical roof replacement take?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Most residential roof replacements in Reynoldsburg complete in 1-3 days, depending on home size, roof complexity, and weather conditions. A typical single-story ranch might complete in one long day, while a two-story home with multiple dormers, valleys, or complex features may require 2-3 days. We protect your property throughout the project with tarps and magnetic tools to collect nails, work efficiently to minimize disruption, and ensure thorough cleanup before considering the job complete. Emergency weather situations never leave your home exposed overnight.
                </p>
              </details>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Reynoldsburg Residents Choose Us</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Owner-Led Inspections",
                    description: "One of our owners personally inspects every roof and speaks with every customer"
                  },
                  {
                    title: "Local Knowledge",
                    description: "Understanding of Reynoldsburg's neighborhoods, weather patterns, and housing characteristics"
                  },
                  {
                    title: "Honest Diagnostics",
                    description: "We only recommend repairs that are actually needed—no upselling or unnecessary replacements"
                  },
                  {
                    title: "Quality Materials",
                    description: "Premium materials appropriate for Central Ohio weather and Reynoldsburg homes"
                  },
                  {
                    title: "Attention to Detail",
                    description: "Thorough cleanup, property protection, and meticulous craftsmanship on every project"
                  },
                  {
                    title: "Storm Damage Expertise",
                    description: "We help document hail/wind damage and work with your insurance company for fair settlements"
                  },
                  {
                    title: "Emergency Response",
                    description: "24/7 availability for urgent repairs and storm damage"
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

            <div className="bg-primary-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Reynoldsburg Customer Reviews</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "James M.",
                    area: "Livingston Ave",
                    text: "After last year's hailstorm, they documented everything perfectly for our insurance claim. The new roof looks fantastic and we had no issues with the claim!"
                  },
                  {
                    name: "Karen & Steve D.",
                    area: "Taylor Road",
                    text: "Honest assessment—they told us our roof had 5-7 years left and just needed minor flashing repair. Saved us thousands we would have spent unnecessarily!"
                  },
                  {
                    name: "Robert C.",
                    area: "Near Blacklick Creek",
                    text: "Professional from start to finish. Great communication, quality work, and spotless cleanup. Highly recommend DTE Roofing to anyone in Reynoldsburg!"
                  }
                ].map((review, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                    <p className="text-charcoal-700 mb-4 italic">"{review.text}"</p>
                    <div className="font-bold text-charcoal-900">{review.name}</div>
                    <div className="text-charcoal-600 text-sm">{review.area}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-8 rounded-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Protect Your Reynoldsburg Home</h2>
              <p className="text-xl mb-4">
                Join satisfied Reynoldsburg homeowners who trust DTE Roofing for quality roofing and exceptional service.
              </p>
              <p className="text-lg mb-2 opacity-90">
                Serving Reynoldsburg from 615 Hilliard Rome Rd, Columbus, OH 43228
              </p>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.averageRating?.toFixed(1) || '5.0'}</div>
                  <div className="text-gray-100">Google Rating</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.totalReviews || 92}</div>
                  <div className="text-gray-100">Verified Reviews</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">Owner-Led</div>
                  <div className="text-gray-100">Every Estimate</div>
                </div>
              </div>
              <Link
                to="/contact"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg"
              >
                Get Your Free Estimate <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">
            Schedule Your Reynoldsburg Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Contact DTE Roofing today for expert roofing services in Reynoldsburg
          </p>
          <p className="text-lg text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Based at 615 Hilliard Rome Rd, Columbus, OH 43228 • Call 614-971-6028
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:6149716028"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg"
            >
              <Phone className="mr-2 w-5 h-5" />
              614-971-6028
            </a>
            <Link
              to="/contact"
              className="bg-charcoal-900 text-white px-8 py-4 rounded-lg hover:bg-charcoal-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg"
            >
              Request Estimate <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
