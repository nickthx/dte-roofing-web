import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Navigation } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';

export default function Powell() {
  const { reviewData } = useReviewData();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Roofers Powell, OH | DTE Roofing — Owner-Led Roof Inspections"
        description="DTE Roofing serves Powell, OH from our Columbus HQ at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners speak with every customer. Roof repair, replacement, storm damage, gutters. Call 614-971-6028."
        keywords="roofers powell, roof repair powell, roof replacement powell, roofing company powell, storm damage powell, gutter services powell, roofer near me powell, roofers columbus"
        canonical="https://www.dteroofingllc.com/locations/powell"
      />
      <SchemaMarkup
        type="location"
        locationName="Powell"
        pageTitle="Roofers in Powell, OH | DTE Roofing"
        pageDescription="DTE Roofing serves Powell, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Detail-first roof repair and replacement with owners speaking to every customer."
        pageUrl="https://www.dteroofingllc.com/locations/powell"
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Powell, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roofers Powell, OH | DTE Roofing</h1>
            <p className="text-xl text-gray-200 mb-6">
              Expert roof repair, replacement, and storm damage services for Powell homeowners—from Downtown Powell and the Powell Rd corridor to Sawmill Parkway neighborhoods and Liberty Township border areas. Based at 615 Hilliard Rome Rd, Columbus, OH 43228, our owners speak with every customer and deliver detail-first craftsmanship.
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
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Trusted Roofers in Powell</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We're based in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228, and serve Powell regularly to the northwest. With convenient access via <strong>Sawmill Parkway</strong>, <strong>US-23</strong>, and <strong>I-270</strong>, we reach Powell efficiently—from <strong>Downtown Powell</strong> and the village core to neighborhoods along the <strong>Powell Rd (OH-750) corridor</strong>, from <strong>Liberty Township border</strong> areas to communities near the <strong>Olentangy River corridor</strong> and the zoo area. Our owners personally speak with every customer—no sales teams, no runaround—just direct communication and genuine care for your home.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Powell features newer subdivisions with complex rooflines, multiple dormers, and numerous roof penetrations where flashing details are critical for leak prevention. Many neighborhoods have architectural standards and HOA requirements that must be met for material selection and aesthetics. This combination of architectural complexity and community standards requires contractors who understand both technical roofing challenges and documentation processes. Common Powell roofing issues include: complex flashing at multiple penetration points on newer homes with intricate rooflines, wind-driven rain and storm damage stripping shingles and ridge caps requiring insurance documentation, winter freeze-thaw cycles demanding proper ventilation and ice and water shield to prevent ice dams, and tree cover throughout many areas causing gutter clogs and overflow damage to fascia and soffit.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Our detail-first approach means thorough cleanup on every job site, property protection appropriate for well-maintained Powell homes, and meticulous craftsmanship that reflects well on your property. If you're working with HOA architectural requirements, we understand the documentation and approval processes. Whether you need emergency storm repairs, honest diagnostics on repair vs replacement decisions, guidance on material upgrades, or a planned roof replacement that meets community standards, we treat your home with the care and professionalism it deserves. Our owners lead every estimate—no salespeople, just straight talk and quality workmanship.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Powell Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Owners speak with every customer—no salespeople",
                    "Based in Columbus—serving Powell regularly",
                    "Great attention to detail on every project",
                    "Experience with complex rooflines and flashing details",
                    "Understanding of HOA requirements and architectural standards",
                    "Expert at storm damage documentation for insurance",
                    "Knowledge of freeze-thaw cycles and ventilation needs",
                    "Honest diagnostics—repair vs replacement guidance",
                    "Material upgrade expertise beyond builder-grade",
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
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for Powell</h3>
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
                    { name: "Flashing Repair & Replacement", link: "/services/roof-repair" },
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
                  One of our owners personally inspects every roof in Powell. No salespeople, no pressure—just honest assessments and clear guidance.
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Powell Areas We Serve</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Downtown Powell / Village",
                "Near Powell Rd (OH-750)",
                "Sawmill Parkway Corridor",
                "Near US-23",
                "Liberty Township Border Area",
                "Olentangy River Area",
                "Near Zoo Area",
                "North Powell Area",
                "South Powell Area",
                "Powell / Dublin Border",
                "Powell / Lewis Center Border",
                "Powell / Worthington Border",
                "Near Community Parks",
                "Golf-Course Communities",
                "Near Sawmill Parkway Shopping",
                "Near Adventure Park Area",
                "East Powell Area",
                "West Powell Area"
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Common Roofing Issues in Powell</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Complex Rooflines: Flashing and Penetration Details</h3>
                <p className="text-charcoal-600">
                  Many Powell homes feature complex architectural designs with multiple roof planes, dormers, skylights, and penetrations for plumbing vents, exhaust fans, and HVAC systems. Each penetration point requires proper flashing—metal barriers that direct water away from vulnerable areas. Flashing failures are among the most common sources of roof leaks, especially where multiple roof planes intersect in valleys or where walls meet rooflines (step flashing). Wind-driven rain common in Central Ohio forces water under compromised flashing seals. We inspect all flashing carefully during assessments and use high-quality materials and proper installation techniques to ensure decades of leak-free protection at these critical areas.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Storm and Wind Damage: Insurance Documentation</h3>
                <p className="text-charcoal-600">
                  Central Ohio's severe weather brings high winds that strip shingles and ridge caps, and hail that damages roofing materials. After storm events, thorough documentation is essential for successful insurance claims. We provide detailed photo evidence, measurements, shingle samples showing wind or hail damage, and written reports that meet insurance requirements. With insurers tightening claim requirements in 2025-2026, proper documentation has never been more important. We help navigate the claims process, meet with adjusters on-site if needed, and advocate for fair settlements covering all legitimate damage. Call 614-971-6028 immediately after storm events, and we'll schedule inspections quickly to document damage before evidence fades.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Winter Freeze-Thaw: Ventilation and Ice Dam Prevention</h3>
                <p className="text-charcoal-600">
                  Ohio winters bring harsh freeze-thaw cycles that stress roofing systems. Poor attic ventilation causes warm air to melt snow unevenly on the roof, leading to ice dams at eaves where water backs up under shingles and causes interior leaks. Proper attic ventilation balances temperature and moisture, preventing ice dam formation while also reducing cooling costs in summer and extending shingle lifespan year-round. We assess ventilation during every inspection, install ice and water shield at vulnerable eave and valley areas during replacements, and recommend ventilation improvements when needed. This protection is especially important in Powell where HOA standards and property values make preventing water damage critical.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Gutters and Drainage: Overflow and Fascia Damage</h3>
                <p className="text-charcoal-600">
                  Tree coverage throughout many Powell neighborhoods means constant leaf and organic debris accumulation in gutters. Clogged gutters overflow during rains, sending water cascading down fascia and soffit, causing rot and damage to these critical structural and aesthetic components. Water pooling near foundations can also cause basement moisture issues. We provide gutter cleaning, repairs, and full gutter replacement services. We can also install gutter guards in areas with heavy tree debris to reduce maintenance frequency. If debris accumulation has already caused damage to your fascia, soffit, or drainage systems, we assess and repair all related issues comprehensively as part of complete roofing solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Proximity Proof: Serving Powell from our Columbus HQ</h2>
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
                  We're based on the west side of Columbus and serve Powell regularly to the northwest. Access from Powell: Sawmill Parkway, US-23, or I-270 connections. Whether you're in Downtown Powell, near Powell Rd (OH-750), along Sawmill Parkway, in Liberty Township border areas, near the Olentangy River corridor, or anywhere in the Powell area, we provide prompt, professional service with the same attention to detail you'd expect from a contractor who truly cares about every project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Powell,+OH&destination=615+Hilliard+Rome+Rd,+Columbus,+OH+43228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center"
                  >
                    <Navigation className="mr-2 w-5 h-5" />
                    Get Directions from Powell
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Map: DTE Roofing Serving Powell</h2>
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
                  title="DTE Roofing serving Powell - 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Powell Roofing FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you serve Powell if you're based in Columbus?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. We're based at 615 Hilliard Rome Rd, Columbus, OH 43228, and serve Powell regularly to the northwest. Distance has never been an issue—we know the efficient routes (Sawmill Parkway, US-23, I-270) and respond promptly to all Powell areas from Downtown Powell to Liberty Township border areas and throughout the region. We treat every Powell project with the same care and attention to detail we bring to all our work.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Can you help with HOA requirements and architectural standards?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. Many Powell neighborhoods have HOA architectural requirements for roofing materials, colors, and styles. We understand these processes and can provide documentation, material samples, and specifications needed for HOA approvals. We work with you to select compliant materials that meet community standards while delivering the performance and aesthetics you want. If your HOA requires pre-approval, we'll provide all necessary documentation to facilitate the process. Our goal is to make the approval process as smooth as possible while ensuring your roof meets all requirements.
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
                  <span>Is ice and water shield worth it in this climate?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. Ice and water shield is a self-sealing underlayment installed at vulnerable areas like eaves, valleys, and around penetrations. Ohio winters bring harsh freeze-thaw cycles that can cause ice dams when poor ventilation allows uneven snow melting on the roof. Ice and water shield provides critical protection against water backup under shingles. We recommend it for all roof replacements in this climate—it's an affordable upgrade that prevents expensive water damage and extends roof lifespan. This protection is especially important in Powell where property values and HOA standards make preventing water damage critical.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Why does flashing matter so much on complex rooflines?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Flashing is metal barrier material installed at vulnerable roof intersections—valleys where two roof planes meet, walls where rooflines intersect structures (step flashing), and around all penetrations like chimneys, skylights, vents, and pipes. Shingles alone cannot prevent water intrusion at these complex junctions. Proper flashing directs water away from seams and vulnerable areas. Many Powell homes have architectural complexity with multiple dormers, intersecting roof planes, and numerous penetrations. Each adds leak risk if flashing isn't installed correctly with quality materials. We inspect all flashing carefully during assessments and use proven installation techniques that provide decades of protection.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you handle gutters and drainage issues?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. Tree coverage throughout many Powell areas means constant leaf and debris accumulation in gutters. Clogged gutters overflow during rains, damaging fascia, soffit, and foundation drainage. We provide gutter cleaning, repairs, and full gutter replacement. We can also install gutter guards in areas with heavy tree debris. If debris accumulation has caused damage to your fascia or soffit, we assess and repair all related issues comprehensively. Proper drainage is essential for protecting your home and maintaining Powell property values.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How fast can you inspect after storms?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  We prioritize emergency calls and storm damage inspections. For active leaks or visible damage, we often respond same-day or next-day. After major storm events affecting Powell and the Columbus area, we work through our queue as quickly as possible—typically within 2-3 days. Call 614-971-6028 immediately after storms, and we'll schedule you as soon as possible to document damage for insurance claims before evidence fades. Emergency situations always get priority response.
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
                  Most residential roof replacements in Powell complete in 1-3 days, depending on home size, roof complexity, and weather conditions. A typical single-story ranch might complete in one long day, while a two-story home with dormers, valleys, or complex features may require 2-3 days. We protect your property throughout the project, work efficiently to minimize disruption, and ensure thorough cleanup before considering the job complete. Emergency weather situations never leave your home exposed overnight—we take all necessary precautions to protect your home and belongings.
                </p>
              </details>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Powell Residents Choose Us</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Owner-Led Inspections",
                    description: "One of our owners personally inspects every roof and speaks with every customer"
                  },
                  {
                    title: "Local Knowledge",
                    description: "Understanding of Powell neighborhoods, HOA requirements, and architectural standards"
                  },
                  {
                    title: "Honest Diagnostics",
                    description: "We only recommend repairs that are actually needed—no upselling or unnecessary replacements"
                  },
                  {
                    title: "Quality Materials",
                    description: "Premium materials appropriate for Central Ohio weather and Powell property values"
                  },
                  {
                    title: "Attention to Detail",
                    description: "Complex flashing work, thorough cleanup, property protection, meticulous craftsmanship"
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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Powell Customer Reviews</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Jennifer & Mike T.",
                    area: "Near Sawmill Parkway",
                    text: "DTE helped us navigate our HOA approval process and delivered exactly what they promised. Complex roofline with multiple dormers—they handled every detail perfectly. Very professional."
                  },
                  {
                    name: "Robert K.",
                    area: "Downtown Powell",
                    text: "After a storm damaged our roof, they documented everything thoroughly for our insurance claim. Adjuster approved the full replacement, and the work was excellent. Highly recommend."
                  },
                  {
                    name: "Sarah L.",
                    area: "Liberty Township Area",
                    text: "Honest assessment—they could have sold us a full replacement but showed us how targeted repairs would give us another 7-8 years. Saved us thousands and earned our trust for when we do need replacement."
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
              <h2 className="text-3xl font-bold mb-4">Protect Your Powell Home</h2>
              <p className="text-xl mb-4">
                Join satisfied Powell homeowners who trust DTE Roofing for quality roofing and exceptional service.
              </p>
              <p className="text-lg mb-2 opacity-90">
                Serving Powell from 615 Hilliard Rome Rd, Columbus, OH 43228
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
            Schedule Your Powell Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Contact DTE Roofing today for expert roofing services in Powell
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
