import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Navigation } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';

export default function Westerville() {
  const { reviewData } = useReviewData();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Roofers Westerville, OH | DTE Roofing — Owner-Led Inspections, Columbus HQ"
        description="Roofers serving Westerville, OH. DTE Roofing owners personally involved in every project. Based at 615 Hilliard Rome Rd, Columbus, OH 43228. Expert roof repair, replacement, storm damage, gutters. Call 614-971-6028."
        keywords="roofers westerville, roof repair westerville, roof replacement westerville, roofing company westerville, storm damage westerville, gutter services westerville, roofers columbus, roofer near me westerville"
        canonical="https://www.dteroofingllc.com/locations/westerville"
      />
      <SchemaMarkup
        type="location"
        locationName="Westerville"
        pageTitle="Roofers in Westerville, OH | DTE Roofing"
        pageDescription="Serving Westerville, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Detail-first roof repair and replacement with owners personally involved in every project."
        pageUrl="https://www.dteroofingllc.com/locations/westerville"
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Westerville, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roofers Westerville, OH | DTE Roofing</h1>
            <p className="text-xl text-gray-200 mb-6">
              Expert roof repair, replacement, and storm damage services for Westerville homeowners—from Uptown Westerville to Huber Village, near Otterbein University to Hoover Reservoir areas. Based at 615 Hilliard Rome Rd, Columbus, OH 43228, our owners work with every customer and deliver detail-first craftsmanship.
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
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Westerville's Trusted Roofing Professionals</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We're based in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228, and serve Westerville regularly—typically 15-30 minutes depending on traffic and route. From historic <strong>Uptown Westerville</strong> and <strong>State Street's</strong> vibrant corridor to established neighborhoods near <strong>Otterbein University</strong>, from <strong>Hoover Reservoir</strong> areas to <strong>Blendon Woods</strong> edges, we understand Westerville's community character and diverse housing stock. Our owners are personally involved in every project—ensuring quality and direct communication throughout.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Founded in 1858, Westerville features remarkable architectural diversity—from Victorian-era homes in Uptown dating to the late 1800s, to mid-century ranches and colonials from the 1960s-70s, to newer subdivisions throughout. This mix of older housing stock with complex rooflines and mature trees creates specific roofing challenges: original flashing that may need updating, constant debris accumulation requiring gutter maintenance, moss growth from shade, and aging roofs from 1970s-1990s development cycles now reaching replacement age.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Common roofing challenges in Westerville include: mature trees causing debris and gutter clogs, older homes with chimney and step flashing leaks, wind-driven rain testing seals during storms, ventilation issues leading to ice dams in winter, and community standards requiring quality materials and careful aesthetics. We work efficiently, respect your property, and understand that Westerville homeowners expect professional service with minimal disruption around school zones and commute windows.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Westerville Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Owners personally involved in every project",
                    "Based nearby—15-30 minutes from Westerville",
                    "Great attention to detail on every project",
                    "Experience with historic Uptown preservation and diverse architectural styles",
                    "Understanding of mature tree canopy impact on roof health",
                    "Help with HOAs and community standards where needed",
                    "Expert at documenting storm damage for insurance",
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
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for Westerville</h3>
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
                  Our owners personally oversee every roofing project in Westerville—just honest assessments and fair pricing.
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Westerville Neighborhoods We Serve</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Uptown Westerville",
                "Annehurst",
                "Huber Village",
                "Cooper Woods",
                "Highland Lakes Area",
                "Polaris/Westerville Edge",
                "Maxtown/County Line",
                "Hoover Reservoir Area",
                "Near Otterbein Area",
                "Blendon Woods Edge",
                "Spring Run",
                "Windsor Park",
                "Cherry Bottom",
                "Stoneridge",
                "Foxfire",
                "Heritage Club",
                "Liberty Woods",
                "Westar"
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Common Roofing Issues in Westerville</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Mature Trees: Debris and Gutter Overflow</h3>
                <p className="text-charcoal-600">
                  Westerville's established neighborhoods feature magnificent mature oaks, maples, and ash trees that define the community's character but create constant roofing challenges. Heavy leaf accumulation clogs gutters causing overflow that damages fascia and soffit. Dense shade encourages moss and algae growth on north-facing slopes. Overhanging branches scrape protective granules from shingles and occasionally drop during storms causing punctures. We address these challenges through algae-resistant shingles, gutter maintenance, and regular debris removal.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Older Housing: Chimney and Step Flashing Leaks</h3>
                <p className="text-charcoal-600">
                  Many Westerville homes—especially in Uptown and 1960s-70s neighborhoods—feature complex rooflines with chimneys, dormers, and valleys. Original flashing around these vulnerable areas degrades over decades of exposure to weather. Wind-driven rain tests compromised seals during storms, leading to leaks that damage interior ceilings and walls. We inspect flashing carefully during every assessment and repair or replace it with high-quality materials designed for decades of protection.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Storm and Hail Exposure: Insurance Documentation</h3>
                <p className="text-charcoal-600">
                  Central Ohio's weather patterns bring frequent storms with wind-driven rain, hail, and occasional severe events. Older roofs in Westerville neighborhoods require thorough documentation after storms for successful insurance claims. We provide detailed photo evidence, shingle samples showing hail impact, measurements, and written reports that meet insurance requirements. As insurers tighten claim requirements in 2025-2026, proper documentation has never been more important for protecting your investment.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Ventilation Issues and Ice Dam Prevention</h3>
                <p className="text-charcoal-600">
                  Ohio winters bring harsh freeze-thaw cycles that stress roofing systems. Poor attic ventilation—common in older Westerville homes—causes warm air to melt snow unevenly, leading to ice dams at eaves and water backup under shingles. We assess ventilation during every inspection, install ice and water shield at vulnerable areas during replacements, and recommend ventilation improvements when needed to prevent winter damage and improve energy efficiency.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Proximity Proof: Serving Westerville from our Columbus HQ</h2>
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
                  We're based on the west side of Columbus and serve Westerville regularly—typically 15-30 minutes depending on traffic and route. Access from Westerville: I-270 east side exits, I-71 north/south corridors, SR-3/State Street routes, or via Polaris area. Whether you're in Uptown, Huber Village, near Otterbein, or anywhere in Westerville, we provide prompt, professional service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Westerville,+OH&destination=615+Hilliard+Rome+Rd,+Columbus,+OH+43228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center"
                  >
                    <Navigation className="mr-2 w-5 h-5" />
                    Get Directions from Westerville
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Map: DTE Roofing Serving Westerville</h2>
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
                  title="DTE Roofing serving Westerville - 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Westerville Roofing FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you serve Westerville if your HQ is in Columbus?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. We're based at 615 Hilliard Rome Rd, Columbus, OH 43228, and Westerville is typically 15-30 minutes away depending on traffic and route. We serve Westerville regularly and understand the community's mix of historic Uptown architecture, mature neighborhoods, and diverse housing stock. Distance has never been an issue, and our scheduling is efficient and reliable for all Westerville areas.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How do you protect landscaping and driveways during work?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  We use tarps to protect landscaping, position dumpsters on driveways with protective boards underneath, and conduct thorough cleanup with magnetic rollers to collect nails and debris. We make multiple passes across your driveway, walkways, and yard before we leave. Clean job sites and property protection are part of our detail-first approach—you shouldn't have to worry about damage to your landscaping or nails in your driveway after we're done.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you work with HOAs or community standards?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. Some Westerville neighborhoods have HOA requirements or architectural guidelines for exterior work. We're experienced in matching existing shingle styles and colors, providing documentation for HOA submissions where needed, and ensuring work meets community standards. We can help you understand what approvals may be required and provide the information necessary. Our goal is to make the process smooth while respecting Westerville's community character.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What causes chimney and step flashing leaks?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Flashing around chimneys, skylights, and dormers (step flashing) is designed to direct water away from these vulnerable intersections. Over time, flashing seals degrade from weather exposure—especially wind-driven rain common in Central Ohio. Many older Westerville homes have original flashing from decades ago that has lost its seal. We inspect flashing carefully during every assessment and repair or replace it with high-quality materials that provide decades of protection.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Is ice and water shield worth it in this climate?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. Ice and water shield is a self-sealing underlayment installed at vulnerable areas like eaves, valleys, and around penetrations. Ohio winters bring harsh freeze-thaw cycles that can cause ice dams, especially on north-facing slopes or homes with inadequate ventilation. Ice and water shield provides critical protection against water backup under shingles. We recommend it for all roof replacements in this climate—it's an affordable upgrade that prevents expensive water damage.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you document storm damage for insurance?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. If your roof damage is from wind, hail, or storm events, your homeowner's insurance may cover repairs or replacement. We document storm damage with detailed photos, shingle samples showing hail impact, measurements, and written reports that meet insurance requirements. We can meet with adjusters on-site if needed and explain the claims process. With insurers tightening claim requirements in 2025-2026, proper documentation has never been more important. We work with all major insurance companies.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you offer emergency tarping and response?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. We provide 24/7 emergency services including temporary tarping after storms or sudden damage. If you experience a leak or visible damage, call 614-971-6028 immediately. We prioritize emergency calls and often respond same-day for active leaks. Emergency tarping prevents additional water intrusion while permanent repairs are scheduled, protecting your home's interior and valuable belongings from further damage.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you handle gutters and fascia/soffit?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. Westerville's mature tree canopy means constant debris accumulation in gutters. Clogged gutters overflow during rains, damaging fascia, soffit, and foundation drainage. We provide gutter cleaning, repairs, and full gutter replacement. We can also install gutter guards in areas with heavy leaf accumulation. If tree debris has caused damage to your fascia or soffit, we assess and repair all related issues comprehensively.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What's the fastest way to schedule?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Call us directly at 614-971-6028. You'll speak with one of our owners—no phone trees or call centers. We'll ask a few questions about your roof, schedule an inspection at your convenience, and one of our owners will come personally to assess your roof and discuss your options. Most inspections are scheduled within 2-3 days, and emergency situations get same-day or next-day priority response.
                </p>
              </details>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Westerville Residents Choose Us</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Owner-Led Inspections",
                    description: "One of our owners personally inspects every roof and speaks with every customer"
                  },
                  {
                    title: "Historic Uptown Experience",
                    description: "Expertise with older architecture, Victorian-era homes, and preservation"
                  },
                  {
                    title: "Honest Diagnostics",
                    description: "We only recommend repairs that are actually needed—no upselling"
                  },
                  {
                    title: "Quality Materials",
                    description: "Premium materials appropriate for Westerville homes and Ohio weather"
                  },
                  {
                    title: "Attention to Detail",
                    description: "Thorough cleanup, property protection, and meticulous craftsmanship"
                  },
                  {
                    title: "Community Respect",
                    description: "Scheduling sensitivity around school zones and minimal disruption"
                  },
                  {
                    title: "Insurance Expertise",
                    description: "We help document storm damage and work with your insurance company"
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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Westerville Customer Reviews</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Jennifer & Mark T.",
                    area: "Uptown Westerville",
                    text: "Our Victorian home needed careful attention to preserve its character. DTE did excellent work with our complex roof and historic details."
                  },
                  {
                    name: "Brian S.",
                    area: "Huber Village",
                    text: "After hail damage, they documented everything thoroughly for our insurance claim and completed the replacement quickly. Very professional!"
                  },
                  {
                    name: "Sarah M.",
                    area: "Near Otterbein",
                    text: "Honest pricing, quality work, and great communication. They worked around our schedule and left the property spotless!"
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
              <h2 className="text-3xl font-bold mb-4">Protect Your Westerville Home</h2>
              <p className="text-xl mb-4">
                Join satisfied Westerville homeowners who trust DTE Roofing for quality roofing and exceptional service.
              </p>
              <p className="text-lg mb-2 opacity-90">
                Serving Westerville from 615 Hilliard Rome Rd, Columbus, OH 43228
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
            Schedule Your Westerville Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Contact DTE Roofing today for expert roofing services in Westerville
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
