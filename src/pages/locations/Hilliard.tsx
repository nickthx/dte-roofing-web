import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Navigation } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';

export default function Hilliard() {
  const { reviewData } = useReviewData();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Roofers Hilliard, OH | DTE Roofing — Near Hilliard, Owner-Led Inspections"
        description="Roofers serving Hilliard, OH. Founded by Hilliard Davidson grads, DTE Roofing owners work with every customer. Office at 615 Hilliard Rome Rd, Columbus, OH 43228. Roof repair, replacement, storm damage, gutters. Call 614-971-6028."
        keywords="roofers hilliard, roof repair hilliard, roof replacement hilliard, roofing company hilliard, roofers near hilliard, storm damage hilliard, gutter services hilliard, roofers columbus"
        canonical="https://www.dteroofingllc.com/locations/hilliard"
      />
      <SchemaMarkup
        type="location"
        locationName="Hilliard"
        pageTitle="Roofers in Hilliard, OH | DTE Roofing"
        pageDescription="Serving Hilliard, OH from our office on Hilliard Rome Rd (615 Hilliard Rome Rd, Columbus, OH 43228 mailing address). Detail-first roof repair and replacement with owners personally involved in every project."
        pageUrl="https://www.dteroofingllc.com/locations/hilliard"
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Hilliard, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roofers Hilliard, OH | DTE Roofing</h1>
            <p className="text-xl text-gray-200 mb-6">
              Expert roof repair, replacement, and storm damage services for Hilliard homeowners—from Old Hilliard to Britton Farms to Scioto Reserve. Founded by Hilliard Davidson graduates, our owners work with every customer. Based minutes from Hilliard at 615 Hilliard Rome Rd, Columbus, OH 43228, we deliver detail-first craftsmanship to our neighbors.
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
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Hilliard's Hometown Roofing Company</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                DTE Roofing is not just another contractor serving Hilliard—we are from here. Founders Donovan and Mitchell grew up in Hilliard and graduated from Hilliard Davidson High School. Our office at 615 Hilliard Rome Rd (Columbus mailing address, just off the west side) means we are minutes from anywhere in town, whether you are in Old Hilliard near the historic downtown and Center Street Market, the established neighborhoods off Cemetery Road, or the newer developments along Cosgray Road and Scioto Reserve.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Hilliard has grown tremendously over the years, transforming from a small town of a few thousand into one of Central Ohio's most desirable communities with a population of about 38,832 (2024 estimate). This growth means diverse housing stock with different roofing needs: historic homes in Old Hilliard requiring careful preservation approaches, 1980s-90s builds in neighborhoods like Hilliard Estates and Britton Farms now reaching the age where original roofs need replacement, and newer construction in areas like Scioto Reserve and Crossing at Scioto where builder-grade materials may already be showing wear.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We understand Hilliard's specific challenges: the wind exposure from open farmland to the west that drives wind-driven rain against flashing and seals, the mature tree canopy in older neighborhoods causing debris accumulation and shade-related moss growth, and the strict HOA requirements in many subdivisions. Hilliard's winters also bring freeze-thaw cycles that stress poor ventilation systems, and locals know parking gets tight around Station Park and during Freedom Fest at Roger A. Reynolds Municipal Park—we plan service schedules around community events to minimize disruption. As locals, we know the permitting process with the City of Hilliard and can navigate it efficiently for you.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Hilliard Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Founded by Hilliard Davidson graduates—we are your neighbors",
                    "Office on Hilliard Rome Rd—fastest response times in town",
                    "Owners personally involved in every project",
                    "Deep knowledge of Hilliard neighborhoods and housing styles",
                    "Experience with Hilliard HOA requirements and city permits",
                    "Honest diagnostics—we fix only what is needed"
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
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for Hilliard</h3>
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
                  As Hilliard locals, our owners personally oversee every roofing project—just honest assessments from your neighbors.
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Hilliard Neighborhoods We Serve</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Old Hilliard",
                "Hilliard Estates",
                "Britton Farms",
                "Heritage Lakes",
                "Hoffman Farms",
                "Hayden Run",
                "Scioto Reserve",
                "Bradley Farms",
                "Tanglewood",
                "Ridgewood",
                "Homestead",
                "Crossing at Scioto",
                "Darby Glen",
                "Schirm Farms",
                "Wellington",
                "Mill Run"
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Common Roofing Issues in Hilliard</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Wind-Driven Rain and Flashing Problems</h3>
                <p className="text-charcoal-600">
                  Hilliard's western exposure to open farmland means storms arrive with full force. Wind-driven rain tests flashing around chimneys, skylights, and step flashing along dormers. Older homes in Old Hilliard and established neighborhoods often have original flashing that has lost its seal, leading to leaks during heavy rains. We inspect and repair these vulnerable areas with great attention to detail.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Winter Freeze-Thaw and Ventilation</h3>
                <p className="text-charcoal-600">
                  Ohio winters create freeze-thaw cycles that stress roofing systems, especially in older homes with inadequate attic ventilation. Poor ventilation causes warm air to melt snow unevenly, leading to ice dams at eaves and water backup under shingles. We assess ventilation during every inspection and recommend improvements when needed to prevent winter damage.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Mature Tree Debris and Gutter Issues</h3>
                <p className="text-charcoal-600">
                  Hilliard's mature tree canopy is beautiful but causes constant debris accumulation in gutters, especially in neighborhoods like Britton Farms and Hilliard Estates. Clogged gutters overflow during rains, damaging fascia and soffit. Overhanging branches also scrape shingles and trap moisture, leading to premature wear and moss growth. We handle both gutter cleaning and roof repairs caused by tree-related issues.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Aging Roofs in Established Neighborhoods</h3>
                <p className="text-charcoal-600">
                  Many homes in Hilliard Estates, Britton Farms, and similar 1980s-90s developments have original roofs now 30-40 years old. These roofs are past their expected lifespan and often show curling shingles, granule loss, and compromised flashing. We help homeowners determine whether repairs can extend roof life or if replacement is the smarter investment.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Proximity Proof: Right by Hilliard</h2>
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
                  We're right on Hilliard Rome Rd on the west side of Columbus (Columbus mailing address) and just minutes from anywhere in Hilliard. Typical access from Hilliard: Hilliard Rome Rd / Cemetery Rd corridor, I-270 west side exits, Roberts Rd, or Scioto Darby Rd. Whether you're in Old Hilliard, Heritage Lakes, or Scioto Reserve, we're your closest full-service roofing team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Old+Hilliard,+OH&destination=615+Hilliard+Rome+Rd,+Columbus,+OH+43228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center"
                  >
                    <Navigation className="mr-2 w-5 h-5" />
                    Get Directions from Old Hilliard
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Map: DTE Roofing Near Hilliard (Hilliard Rome Rd)</h2>
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
                  title="DTE Roofing location near Hilliard - 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Hilliard Roofing FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you serve Hilliard if your address shows Columbus?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. Our office is at 615 Hilliard Rome Rd with a Columbus mailing address (43228 zip code), but we're right on the west side, minutes from Old Hilliard, Britton Farms, Scioto Reserve, and all Hilliard neighborhoods. Both founders are Hilliard Davidson graduates—this is our hometown. We serve Hilliard regularly with the same detail-first approach we bring to every customer conversation.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Can you schedule around Center Street Market weekends or Freedom Fest traffic?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. We're locals who know that parking around Station Park and Old Hilliard gets tight during Center Street Market weekends, and that Freedom Fest at Roger A. Reynolds Municipal Park draws big crowds. We plan service schedules to work around community events and minimize disruption to your neighborhood. Just let us know your timing preferences when you call.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you work with HOAs in Hilliard subdivisions?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes, we're experienced with HOA requirements in Hilliard neighborhoods. Many subdivisions have specific rules about shingle colors, architectural styles, and approval processes. We help you understand what approvals are needed and can provide documentation to your HOA board. We've worked successfully with HOAs throughout Heritage Lakes, Crossing at Scioto, Hayden Run, and other communities.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What causes leaks around chimneys and step flashing in older homes?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Flashing around chimneys, skylights, and along dormers (step flashing) is meant to direct water away from these vulnerable intersections. Over time, flashing seals degrade from weather exposure, especially with wind-driven rain common in Hilliard. Older homes in Old Hilliard and neighborhoods like Britton Farms often have original flashing that has lost its seal. We inspect flashing carefully during every roof assessment and repair or replace it with high-quality materials that last.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Is ice and water shield worth it here in Hilliard?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. Ice and water shield is a self-sealing underlayment installed at vulnerable areas like eaves, valleys, and around penetrations. Ohio winters bring freeze-thaw cycles that can cause ice dams, especially on north-facing slopes. Ice and water shield provides extra protection against water backup under shingles. We recommend it for all roof replacements in this climate—it's an affordable upgrade that prevents expensive water damage.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How fast can you inspect after wind or hail?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  We prioritize storm response for Hilliard customers. After major storms, we typically respond within 24-48 hours. If there's active leaking or emergency damage, we can often come same-day for temporary repairs or tarping. Once on-site, one of our owners inspects your roof thoroughly, documents any storm damage with photos for insurance purposes, and explains your options clearly. Call 614-971-6028 as soon as you suspect storm damage.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you handle gutters because of tree debris?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. Hilliard's mature tree canopy is beautiful but causes constant debris in gutters. Clogged gutters overflow during rains, damaging fascia, soffit, and even foundation drainage. We provide gutter cleaning, repairs, and full gutter replacement. We can also install gutter guards in areas with heavy leaf accumulation. If tree debris has caused damage to your roof or gutters, we assess and repair all related issues in one visit.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How do you keep nails out of driveways?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  We take cleanup seriously. During tear-off, we use tarps and magnetic sweepers to catch nails and debris. After the job, we make multiple passes with rolling magnets across your driveway, walkways, and yard. We inspect the entire property before we leave. Clean jobsites are part of our detail-first approach—you shouldn't have to worry about nails in your tires or your kids' feet.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you help with insurance documentation in 2025-2026?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. If your roof damage is from wind, hail, or storm events, your homeowner's insurance may cover repairs or replacement. We document storm damage with detailed photos and measurements, meet with adjusters on-site if needed, and provide written estimates that match insurance requirements. We explain the claims process and help you understand your policy coverage. We work with all major insurance companies and make the process as smooth as possible.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What's the fastest way to schedule?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Call us directly at 614-971-6028. You'll speak with one of our owners—no phone trees or call centers. We'll ask a few questions about your roof, schedule an inspection at your convenience, and one of our owners will come personally to assess your roof and discuss your options. Most inspections are scheduled within 2-3 days, and emergency situations get same-day or next-day priority.
                </p>
              </details>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Hilliard Residents Choose Us</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "We Are Your Neighbors",
                    description: "Founded by Hilliard Davidson grads with our office on Hilliard Rome Road"
                  },
                  {
                    title: "Owner Involvement",
                    description: "Our owners personally oversee every project and work closely with every customer"
                  },
                  {
                    title: "Honest Diagnostics",
                    description: "We only recommend repairs that are actually needed—no upselling"
                  },
                  {
                    title: "Quality Materials",
                    description: "GAF certified contractor using premium materials built for Ohio weather"
                  },
                  {
                    title: "Fair Pricing",
                    description: "Detailed written estimates with no hidden fees or surprises"
                  },
                  {
                    title: "Strong Warranties",
                    description: "Workmanship warranty plus manufacturer material warranties"
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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Hilliard Customer Reviews</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Tom & Karen S.",
                    area: "Britton Farms",
                    text: "DTE Roofing replaced our entire roof last year. The crew was professional, the cleanup was thorough, and the roof looks fantastic!"
                  },
                  {
                    name: "James P.",
                    area: "Hilliard Estates",
                    text: "After storm damage, they came out the same day to assess and tarp our roof. The permanent repair was completed quickly and professionally."
                  },
                  {
                    name: "Michelle T.",
                    area: "Old Hilliard",
                    text: "Honest, reliable, and fairly priced. They helped us through the insurance claim process and our new roof is beautiful!"
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
              <h2 className="text-3xl font-bold mb-4">Proud to Serve Our Hometown</h2>
              <p className="text-xl mb-4">
                Join satisfied Hilliard homeowners who trust DTE Roofing for quality roofing and exceptional service.
              </p>
              <p className="text-lg mb-2 opacity-90">
                Serving Hilliard from 615 Hilliard Rome Rd, Columbus, OH 43228
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
            Schedule Your Hilliard Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Contact DTE Roofing today for expert roofing services from your Hilliard neighbors
          </p>
          <p className="text-lg text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Office at 615 Hilliard Rome Rd, Columbus, OH 43228 • Call 614-971-6028
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
