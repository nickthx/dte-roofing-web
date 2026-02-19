import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Navigation } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';

export default function Worthington() {
  const { reviewData } = useReviewData();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Roofers Worthington, OH | DTE Roofing — Owner-Led Roof Inspections"
        description="DTE Roofing serves Worthington, OH from our Columbus HQ at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Roof repair, replacement, storm damage, gutters. Call 614-971-6028."
        keywords="roofers worthington, roof repair worthington, roof replacement worthington, roofing company worthington, storm damage worthington, gutter services worthington, roofer near me worthington, roofers columbus"
        canonical="https://www.dteroofingllc.com/locations/worthington"
      />
      <SchemaMarkup
        type="location"
        locationName="Worthington"
        pageTitle="Roofers in Worthington, OH | DTE Roofing"
        pageDescription="DTE Roofing serves Worthington, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Detail-first roof repair and replacement with owners personally involved in every project."
        pageUrl="https://www.dteroofingllc.com/locations/worthington"
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Worthington, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roofers Worthington, OH | DTE Roofing</h1>
            <p className="text-xl text-gray-200 mb-6">
              Expert roof repair, replacement, and storm damage services for Worthington homeowners—from Historic Old Worthington and Village Green to High Street corridor neighborhoods. Based at 615 Hilliard Rome Rd, Columbus, OH 43228, our owners work with every customer and deliver detail-first craftsmanship.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              ⭐ {reviewData?.totalReviews || 92} verified reviews • {reviewData?.averageRating?.toFixed(1) || '5.0'} average rating
            </p>
            <a
              href="tel:614-971-6028"
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
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Trusted Roofers in Worthington</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We're based in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228, and serve Worthington regularly north of downtown. With easy access via <strong>I-270</strong>, <strong>US-23</strong>, and the <strong>High Street corridor</strong>, we reach Worthington efficiently—from <strong>Historic Old Worthington</strong> and <strong>Village Green</strong> to <strong>Worthington Farmers Market</strong> areas, from <strong>Wilson Hill</strong> to neighborhoods near the <strong>Olentangy River corridor</strong>. Our owners are personally involved in every project—ensuring quality and direct communication throughout.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Worthington features distinctive housing—older homes with character and history alongside mid-century neighborhoods and newer construction. This architectural variety creates specific roofing challenges: chimney flashing and step flashing failures common in older homes with complex rooflines and multiple penetrations, mature tree canopy throughout much of Worthington dropping debris that clogs gutters and causes overflow damage to fascia and soffit, wind-driven rain and storm damage that can strip shingles and ridge caps requiring careful documentation for insurance, and harsh winter freeze-thaw cycles that demand proper ventilation and ice and water shield to prevent ice dams.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Many Worthington homes have older roofing assemblies that may need careful assessment. We don't make claims about specialized capabilities with slate, wood shake, or unusual systems—if we encounter those during inspection, we assess honestly and recommend the best path forward, which may include referral to specialists if needed. Our detail-first approach means thorough cleanup around mature landscaping, property protection on tight lots common in established neighborhoods, and meticulous craftsmanship on every project. Whether you need emergency storm repairs, honest diagnostics on repair vs replacement decisions, or a planned roof replacement, we treat your home with care and respect it deserves.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Worthington Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Owners personally involved in every project",
                    "Based in Columbus—serving Worthington regularly",
                    "Great attention to detail on every project",
                    "Experience with older homes and chimney/step flashing",
                    "Understanding of tree canopy and gutter challenges",
                    "Expert at storm damage documentation for insurance",
                    "Knowledge of freeze-thaw cycles and ventilation needs",
                    "Honest diagnostics—repair vs replacement guidance",
                    "Work clean around mature landscaping and tight lots",
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
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for Worthington</h3>
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
                    { name: "Chimney Flashing Repair", link: "/services/roof-repair" },
                    { name: "Ventilation Upgrades", link: "/services/roof-repair" }
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
                  Our owners personally oversee every roofing project in Worthington—just honest assessments and fair pricing.
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Worthington Areas We Serve</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Old Worthington / Village Green",
                "High Street Corridor",
                "Near Worthington Farmers Market",
                "Wilson Hill Area",
                "North Worthington Area",
                "South Worthington Area",
                "Near Olentangy River Corridor",
                "Near US-23",
                "Near I-270 Exits",
                "Linworth Area",
                "Worthington Hills Area",
                "Near Colonial Hills Border",
                "Near Beechwold / Clintonville",
                "Near Polaris / Worthington Border",
                "Worthington Estates Area",
                "Perry Run Area",
                "Smoky Row Area",
                "McCord Park Area"
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Common Roofing Issues in Worthington</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Chimney and Step Flashing Failures in Older Homes</h3>
                <p className="text-charcoal-600">
                  Many Worthington homes feature older construction with complex rooflines, dormers, and chimneys. Chimney flashing—the metal barrier between brick and shingles—and step flashing along wall intersections are critical leak-prevention points that degrade over time. Wind-driven rain common in Central Ohio forces water under compromised flashing seals, leading to interior leaks that damage ceilings and walls. We inspect all flashing carefully during assessments and repair or replace with high-quality materials designed for decades of protection. Proper flashing work is essential for older homes with multiple roof penetrations.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Mature Tree Canopy: Gutters and Drainage Issues</h3>
                <p className="text-charcoal-600">
                  Worthington is known for its mature tree canopy—beautiful and valuable, but challenging for roofing systems. Constant leaf debris and organic matter clog gutters, causing overflow during rains that damages fascia, soffit, and foundation drainage. Dense shade also encourages moss and algae growth on north-facing roof slopes. We address these challenges through algae-resistant shingles, gutter cleaning and maintenance programs, gutter guard installation in high-debris areas, and regular preventative maintenance. If tree debris has already caused damage to your fascia, soffit, or drainage systems, we assess and repair all related issues comprehensively.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Storm and Wind Damage: Insurance Documentation</h3>
                <p className="text-charcoal-600">
                  Central Ohio's severe weather brings high winds that can strip shingles and ridge caps, and hail that damages roofing materials. After storm events, thorough documentation is essential for successful insurance claims. We provide detailed photo evidence, measurements, shingle samples showing wind or hail damage, and written reports that meet insurance requirements. With insurers tightening claim requirements in 2025-2026, proper documentation has never been more important. We help navigate the claims process, meet with adjusters on-site if needed, and advocate for fair settlements covering all legitimate damage to protect your home and investment.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Winter Freeze-Thaw: Ventilation and Ice Dam Prevention</h3>
                <p className="text-charcoal-600">
                  Ohio winters bring harsh freeze-thaw cycles that stress roofing systems. Poor attic ventilation—common in older homes where insulation has been added over the years without ventilation upgrades—causes warm air to melt snow unevenly on the roof, leading to ice dams at eaves where water backs up under shingles. We assess ventilation during every inspection, install ice and water shield at vulnerable areas during replacements, and recommend ventilation improvements when needed. Proper ventilation prevents winter damage, reduces energy costs year-round, and extends shingle lifespan. This is especially important in Worthington's diverse housing stock.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Proximity Proof: Serving Worthington from our Columbus HQ</h2>
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
                  We're based on the west side of Columbus and serve Worthington regularly to the north. Access from Worthington: I-270 connections, US-23, or High Street routes. Whether you're in Historic Old Worthington, Village Green, near Worthington Farmers Market, Wilson Hill, or anywhere in the Worthington area, we provide prompt, professional service with the same attention to detail you'd expect from a local contractor who cares about every project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Worthington,+OH&destination=615+Hilliard+Rome+Rd,+Columbus,+OH+43228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center"
                  >
                    <Navigation className="mr-2 w-5 h-5" />
                    Get Directions from Worthington
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Map: DTE Roofing Serving Worthington</h2>
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.google.com/maps?q=615+Hilliard+Rome+Rd,+Columbus,+OH+43228&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DTE Roofing serving Worthington - 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Worthington Roofing FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you serve Worthington if you're based in Columbus?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. We're based at 615 Hilliard Rome Rd, Columbus, OH 43228, and serve Worthington regularly to the north. Distance has never been an issue—we know the routes (I-270, US-23, High Street) and respond efficiently to all Worthington areas from Historic Old Worthington and Village Green to Wilson Hill and neighborhoods throughout the area. We treat every Worthington project with the same care and attention to detail as we do for all our customers.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What causes leaks around chimneys and step flashing in older homes?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Chimney flashing (the metal barrier between brick and shingles) and step flashing along wall intersections and dormers are designed to direct water away from these vulnerable roof penetrations. Over time, flashing seals degrade from weather exposure—caulking dries out, metal fatigues, and seams separate. Wind-driven rain common in Central Ohio forces water under compromised seals, leading to leaks that damage interior ceilings and walls. Many older Worthington homes have complex rooflines with multiple leak points. We inspect all flashing carefully during assessments and repair or replace with high-quality materials that provide decades of protection.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you handle storm damage and insurance documentation?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. If your roof damage is from wind, hail, or storm events, your homeowner's insurance may cover repairs or replacement. We document storm damage with detailed photos, measurements, shingle samples showing wind or hail damage, and written reports that meet insurance requirements. We can meet with adjusters on-site if needed and advocate for fair settlements. With insurers tightening claim requirements in 2025-2026, proper documentation has never been more important. Call 614-971-6028 immediately after storm events, and we'll schedule you as quickly as possible to document damage before evidence fades.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you handle gutters and drainage issues?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. Worthington's mature tree canopy means constant leaf and debris accumulation in gutters. Clogged gutters overflow during rains, damaging fascia, soffit, and foundation drainage. We provide gutter cleaning, repairs, and full gutter replacement. We can also install gutter guards in areas with heavy tree debris. If tree debris has caused damage to your fascia or soffit, we assess and repair all related issues comprehensively. Regular gutter maintenance is essential in tree-heavy neighborhoods throughout Worthington.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Is ice and water shield worth it in this climate?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. Ice and water shield is a self-sealing underlayment installed at vulnerable areas like eaves, valleys, and around penetrations. Ohio winters bring harsh freeze-thaw cycles that can cause ice dams when poor ventilation allows uneven snow melting on the roof. Ice and water shield provides critical protection against water backup under shingles. We recommend it for all roof replacements in this climate—it's an affordable upgrade that prevents expensive water damage and extends roof lifespan. This is especially important for older Worthington homes where ventilation may not be optimal.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How fast can you inspect after storms?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  We prioritize emergency calls and storm damage inspections. For active leaks or visible damage, we often respond same-day or next-day. After major storm events affecting Worthington and the Columbus area, we work through our queue as quickly as possible—typically within 2-3 days. Call 614-971-6028 immediately after storms, and we'll schedule you as soon as possible to document damage for insurance claims before evidence fades. Emergency situations always get priority response.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you work clean around tight lots and mature landscaping?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. Many Worthington neighborhoods feature mature landscaping, tight lot lines, and property that homeowners have invested years cultivating. We protect landscaping with tarps and plywood, use magnetic tools to collect nails and metal debris, and ensure thorough cleanup before considering the job complete. We respect your property as we would our own. Detailed cleanup isn't just professional courtesy—it's a reflection of the care we bring to every aspect of the work. Clean job sites are part of our commitment to quality craftsmanship.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What's the fastest way to schedule an inspection?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Call us directly at 614-971-6028. You'll speak with one of our owners—no phone trees or call centers. We'll ask a few questions about your roof, schedule an inspection at your convenience, and one of our owners will come personally to assess your roof and discuss your options. Most inspections are scheduled within 2-3 days, and emergency situations get same-day or next-day priority response. Direct communication means faster service and better outcomes.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Should I repair or replace my aging roof?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  The repair vs replacement decision depends on roof age, extent of damage, overall condition, and cost-effectiveness. Roofs under 15 years with isolated damage often benefit from targeted repairs that can extend serviceable lifespan 5-10 years. Roofs approaching or exceeding 20 years, showing widespread deterioration, or requiring repeated repairs often prove more cost-effective to replace entirely. We provide honest assessments and explain the reasoning behind our recommendations—sometimes repairs are the right call, other times replacement proves better value. Our recommendations prioritize your long-term interests over maximizing short-term revenue.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How long does a typical roof replacement take?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Most residential roof replacements in Worthington complete in 1-3 days, depending on home size, roof complexity, and weather conditions. A typical single-story ranch might complete in one long day, while a two-story home with dormers, valleys, or complex features may require 2-3 days. We protect your property throughout the project, work efficiently to minimize disruption, and ensure thorough cleanup before considering the job complete. Emergency weather situations never leave your home exposed overnight—we take all necessary precautions to protect your home and belongings.
                </p>
              </details>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Worthington Residents Choose Us</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Owner-Led Inspections",
                    description: "One of our owners personally inspects every roof and speaks with every customer"
                  },
                  {
                    title: "Local Knowledge",
                    description: "Understanding of Worthington's neighborhoods, older homes, and tree canopy challenges"
                  },
                  {
                    title: "Honest Diagnostics",
                    description: "We only recommend repairs that are actually needed—no upselling or unnecessary replacements"
                  },
                  {
                    title: "Quality Materials",
                    description: "Premium materials appropriate for Central Ohio weather and Worthington homes"
                  },
                  {
                    title: "Attention to Detail",
                    description: "Thorough cleanup around mature landscaping, property protection, meticulous craftsmanship"
                  },
                  {
                    title: "Storm Damage Expertise",
                    description: "We help document wind/hail damage and work with your insurance company for fair settlements"
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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Worthington Customer Reviews</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Patricia S.",
                    area: "Old Worthington",
                    text: "Our older home had chronic chimney leaks that three other contractors couldn't fix. DTE found the problem, explained it clearly, and fixed it right. No more leaks after heavy rains!"
                  },
                  {
                    name: "David & Karen L.",
                    area: "Wilson Hill",
                    text: "Very impressed with the attention to detail. They protected our landscaping, cleaned up meticulously, and the roof looks fantastic. Professional from start to finish."
                  },
                  {
                    name: "Mark H.",
                    area: "Near High Street",
                    text: "Honest and fair—they could have pushed for a full replacement but showed us how targeted repairs would extend our roof's life 7-10 years. Saved us thousands and earned our trust."
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
              <h2 className="text-3xl font-bold mb-4">Protect Your Worthington Home</h2>
              <p className="text-xl mb-4">
                Join satisfied Worthington homeowners who trust DTE Roofing for quality roofing and exceptional service.
              </p>
              <p className="text-lg mb-2 opacity-90">
                Serving Worthington from 615 Hilliard Rome Rd, Columbus, OH 43228
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
            Schedule Your Worthington Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Contact DTE Roofing today for expert roofing services in Worthington
          </p>
          <p className="text-lg text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Based at 615 Hilliard Rome Rd, Columbus, OH 43228 • Call 614-971-6028
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:614-971-6028"
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
