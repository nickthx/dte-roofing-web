import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Navigation } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';
import reviewStats from '../../data/review-stats.json';
import LocationBreadcrumb from '../../components/LocationBreadcrumb';
import NearbyAreas from '../../components/NearbyAreas';
import RecentWork from '../../components/RecentWork';
import { HQ_MAP_EMBED_SRC } from '../../data/business';

const DOCUMENT_TITLE = 'Roofers in Pickerington, OH | Roof Repair | DTE Roofing';

export default function Pickerington() {
  const { reviewData } = useReviewData();

  const pickeringtonFaqs = [
    {
      question: "Why does my Pickerington home leak around a valley or dormer when the shingles look fine?",
      answer: "Because the shingles are rarely the problem in those spots. Leaks on complex rooflines usually start where two planes meet or where a wall rises through the roof. If the valley was cut short, its membrane was skipped, or step flashing along a dormer has no counter flashing, water can travel several feet before it shows inside. We trace the stain to its source and fix that detail."
    },
    {
      question: "Do I need a permit in Pickerington or Violet Township for a new roof?",
      answer: "It depends on where your house sits. Pickerington is surrounded by Violet Township, and many homes with a Pickerington mailing address are actually in the township. Whether a permit is needed, and which office issues it, differs on each side of that line. We confirm your jurisdiction from the parcel record, pull any permit that is required and schedule inspections, so you never have to call the offices yourself."
    },
    {
      question: "Should I replace my skylights when I replace the roof?",
      answer: "If they are original to a 1990s or 2000s home, it is usually the right time. Skylight seals and flashing kits wear out, and replacing a skylight later means cutting into a brand-new roof. We check the glass, the frame and any staining on the drywall around the shaft. Sound units get new flashing kits. Worn ones are replaced, or the opening is closed if you no longer want it."
    },
    {
      question: "How do I know if my two-story attic is ventilated properly?",
      answer: "Warning signs include an upstairs that is hard to cool, frost or dark staining on the underside of the roof deck in winter, shingles that blister on the back slopes, and heavy icicles at the eaves. We go into the attic, measure intake and exhaust openings, make sure insulation is not blocking the soffit vents, and look for bath fans venting into the attic instead of outdoors."
    },
    {
      question: "My builder-grade roof is around 15 to 20 years old. What should I expect?",
      answer: "That is when entry-level shingles start to show their age. Look for granules in the gutters, edges that curl or cup, bare patches on the sunniest slope, and tabs that lift in the wind. On a two-story home, valleys and flashing may leak before the field shingles look tired. Some roofs have a few more years with targeted repairs, and others are better replaced before winter. You see the photos either way."
    },
    {
      question: "Are open-metal valleys or closed-cut valleys better?",
      answer: "Both work when installed over ice and water shield. In a closed-cut valley, shingles from one side run through and the other side is trimmed along a chalk line, which gives a clean look common in Pickerington subdivisions. An open-metal valley uses a strip of prefinished metal down the center, shedding leaves and heavy runoff faster. We recommend one based on pitch, tree cover and how much upper roof drains into it."
    },
    {
      question: "How do trees along Sycamore Creek affect my roof?",
      answer: "Creek-side lots get more leaves, seeds and shade than the open subdivisions. Debris settles in valleys and behind chimneys and holds water against the shingles, gutters overflow onto the fascia, and damp north slopes grow moss. Branches that reach the roof scuff shingles whenever the wind blows. We clean valleys and gutters, treat moss, and point out which limbs to trim."
    },
    {
      question: "Can you replace just the flashing without a whole new roof?",
      answer: "Often, yes. If the shingles have useful life left, we remove the courses around a chimney, wall or dormer, install new step and counter flashing, and weave matching shingles back in. Sometimes a course of siding has to come off so the flashing can tuck behind it. If the shingles are brittle enough to crack when lifted, we tell you, because new flashing on a failing roof will not hold up for long."
    },
    {
      question: "Do you work on homes near the Canal Winchester border and in Violet Township?",
      answer: "Yes. Our Pickerington trips cover subdivisions south toward Canal Winchester, rural Violet Township properties and homes along Refugee Road on the Franklin County side. Larger lots outside the city sometimes include outbuildings or detached garages, and we can look at those roofs during the same visit. Scheduling and pricing stay the same no matter which side of a city or county line you live on."
    },
    {
      question: "What happens on the day of a roof replacement on a two-story home?",
      answer: "We start by covering landscaping, laying tarps along the foundation and placing the dumpster where it will not damage the driveway. The crew tears off one section at a time and dries it in before moving on, so the house is never left open. Two-story homes need extra fall protection, and roofs with several valleys can run into a second day. At the end, we sweep with magnets and an owner walks the finished roof with you."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={DOCUMENT_TITLE}
        description="DTE Roofing serves Pickerington, OH with owner-led roof repair, replacement, gutters, storm damage & hail repair. Call 614-971-6028."
        keywords="roofers pickerington, roof repair pickerington, roof replacement pickerington, roofing company pickerington, storm damage pickerington, gutter services pickerington, roofer near me pickerington, roofers columbus"
        canonical="https://www.dteroofingllc.com/locations/pickerington"
        geoPlacename="Pickerington, OH"
      />
      <SchemaMarkup
        type="location"
        documentTitle={DOCUMENT_TITLE}
        locationSlug="pickerington"
        locationName="Pickerington"
        pageTitle="Roofers in Pickerington, OH | DTE Roofing"
        pageDescription="DTE Roofing serves Pickerington, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Detail-first roof repair and replacement with owners personally involved in every project."
        pageUrl="https://www.dteroofingllc.com/locations/pickerington"
        faqs={pickeringtonFaqs}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Pickerington, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roof Repair & Replacement in Pickerington, OH</h1>
            <p className="text-xl text-gray-200 mb-6">
              Valley, flashing and full roof replacement work for Pickerington's two-story homes, from Olde Pickerington Village to the subdivisions off Hill Road, Refugee Road and OH-256. We know where the city ends and Violet Township begins, and we fix the complicated rooflines where leaks usually start.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              ⭐ {reviewData?.totalReviews || reviewStats.reviewCount} verified reviews • {reviewData?.averageRating?.toFixed(1) || '5.0'} average rating
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

      <LocationBreadcrumb cityName="Pickerington" />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Gutter Installation, Storm Damage, Hail Damage & Insurance Claims in Pickerington</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Pickerington is a Fairfield County city with a portion in Franklin County, and it is surrounded by <strong>Violet Township</strong>, so two houses on the same road can answer to different offices. Crews leaving our <strong>615 Hilliard Rome Rd, Columbus, OH 43228</strong> shop arrive by <strong>I-270</strong>, <strong>I-70</strong> or <strong>US-33</strong> and <strong>OH-256</strong>, working in <strong>Olde Pickerington Village</strong>, along <strong>Hill Road</strong> and <strong>Refugee Road</strong>, near <strong>Pickerington Ponds Metro Park</strong> and down to the <strong>Canal Winchester</strong> border.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Most local housing went up between the 1990s and the 2010s, and much of it is two stories with busy rooflines: several valleys, dormers over bonus rooms, skylights, and walls meeting the roof at a dozen points. Each of those intersections depends on flashing. As builder-grade shingles reach 15 to 20 years, those spots fail first, often before the open field of the roof looks worn.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Two-story attics also run hot, especially over vaulted ceilings and bonus rooms that leave little space for air to move. Weak ventilation ages shingles from underneath and feeds ice dams at the eaves. Add the wooded lots along <strong>Sycamore Creek</strong>, where leaves settle into valleys, and you have the three things we check first on every Pickerington roof: valleys and flashing, attic airflow, and debris.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Pickerington Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Owners inspect every valley, dormer and skylight up close",
                    "Step, counter and chimney flashing rebuilt instead of caulked",
                    "Closed-cut and open-metal valley options for complex rooflines",
                    "Skylight resealing or replacement during reroofing",
                    "Attic ventilation checks on two-story and bonus-room homes",
                    "Permits handled inside city limits and in Violet Township",
                    "Valley and gutter clean-outs for wooded Sycamore Creek lots",
                    "Straight talk on builder-grade shingles at 15 to 20 years"
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
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for Pickerington</h3>
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
                  Seeing a stain below a valley or skylight? An owner will trace the leak to its source and give you a written price to fix it, free of charge.
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Pickerington Neighborhoods We Serve</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Olde Pickerington Village",
                "Hill Road Corridor",
                "OH-256 Corridor",
                "Near Refugee Rd / East Side",
                "Near Pickerington Ponds",
                "Sycamore Creek Area",
                "Towne Center Area",
                "North Pickerington Area",
                "South Pickerington Area",
                "Violet Township Area",
                "Near Reynoldsburg Border",
                "Near Canal Winchester Border",
                "Near Blacklick / East Columbus",
                "Turnberry Area",
                "Stonecreek Area",
                "Heritage Area",
                "Victory Commons Area",
                "Winchester Trails Area"
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Common Roofing Issues in Pickerington</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Valley Leaks on Complex Two-Story Rooflines</h3>
                <p className="text-charcoal-600">
                  Valleys carry more water than any other part of a roof, and on a Pickerington two-story with several intersecting gables they also catch leaves. If the valley shingles were cut short or the membrane underneath was thin, water travels sideways and appears as a stain on an upstairs ceiling. We open the valley, check the ice and water shield, and rebuild it closed-cut or open-metal to suit the pitch.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Step Flashing, Dormers and Skylights</h3>
                <p className="text-charcoal-600">
                  Wherever a wall, dormer or skylight meets the roof, the seal depends on flashing layered correctly the day it went in. On many 1990s and 2000s homes, counter flashing was skipped or skylight kits were sealed with caulk alone. Those shortcuts hold for a while and then leak. We open up the trim needed to reach the flashing, replace it piece by piece, and reseal or replace aging skylights.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Hot Attics in Two-Story Homes</h3>
                <p className="text-charcoal-600">
                  Bonus rooms, vaulted ceilings and hip roofs leave little room for air to move through a Pickerington attic. Without enough intake at the soffits and exhaust at the ridge, heat builds in summer and moisture condenses in winter. Shingles blister and curl early, the deck underside grows mold, and ice dams form at the eaves. We measure the vent area you have against what the attic needs and correct it.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Creek-Side Trees and Pickerington Ponds Debris</h3>
                <p className="text-charcoal-600">
                  Lots along Sycamore Creek and near Pickerington Ponds Metro Park are shadier than the open subdivisions. Leaves and seeds collect in valleys and behind chimneys, shade keeps north slopes damp, and branches rub shingles in the wind. We clear valleys and gutters, recommend guards where the leaf load is heavy, treat moss and algae, and flag branches that should be cut back.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Proximity Proof: Serving Pickerington from our Columbus HQ</h2>
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
                  From Hilliard Rome Road we take I-270 around the south side or I-70 east, then US-33 or OH-256 into Pickerington without crossing downtown. Violet Township homes and those near the Canal Winchester line are on the same trip. Before starting, we confirm whether your address is inside city limits so the right permit is in place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Pickerington,+OH&destination=615+Hilliard+Rome+Rd,+Columbus,+OH+43228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center"
                  >
                    <Navigation className="mr-2 w-5 h-5" />
                    Get Directions from Pickerington
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Map: DTE Roofing Serving Pickerington</h2>
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
              <div className="aspect-video w-full">
                <iframe
                  src={HQ_MAP_EMBED_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DTE Roofing serving Pickerington - 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>

          <RecentWork projectIds={[14, 18, 15]} heading="Recent Roofing Work Near Pickerington" className="mb-16" />
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Pickerington Roofing FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {pickeringtonFaqs.map((faq, index) => (
                <details key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                  <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-charcoal-600 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Pickerington Residents Choose Us</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Owner-Led Inspections",
                    description: "An owner gets up close to every valley, dormer and skylight before writing your estimate"
                  },
                  {
                    title: "Local Knowledge",
                    description: "We know Pickerington's two-story subdivisions and where the township line falls"
                  },
                  {
                    title: "Honest Diagnostics",
                    description: "If one rebuilt flashing detail stops the leak, that is all we quote"
                  },
                  {
                    title: "Quality Materials",
                    description: "Ice and water shield in every valley and new metal flashing on every job"
                  },
                  {
                    title: "Attention to Detail",
                    description: "Flashing layered the right way, valleys cut clean, landscaping protected"
                  },
                  {
                    title: "Storm Damage Expertise",
                    description: "Clear hail and wind documentation across every slope of a large, cut-up roof"
                  },
                  {
                    title: "Emergency Response",
                    description: "Quick tarping when a storm opens up a valley or skylight"
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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Pickerington Customer Reviews</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Jennifer M.",
                    area: "Sycamore Creek",
                    text: "Excellent work! They were professional, punctual, and the cleanup was perfect. Our roof looks fantastic and we finally have peace of mind."
                  },
                  {
                    name: "Tom & Lisa K.",
                    area: "Near Pickerington Ponds",
                    text: "Honest and fair—they could have sold us a full replacement but recommended targeted repairs instead. Saved us thousands and earned our trust for the future."
                  },
                  {
                    name: "Robert H.",
                    area: "Olde Pickerington Village",
                    text: "After the storm damage last year, they documented everything perfectly for insurance. New roof installed quickly, looks great, and passed inspection with no issues!"
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

          <NearbyAreas locationSlug="pickerington" />

          <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-8 rounded-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Protect Your Pickerington Home</h2>
              <p className="text-xl mb-4">
                Stop chasing the same stain on your ceiling. Have an owner check the valleys, flashing and attic on your Pickerington home.
              </p>
              <p className="text-lg mb-2 opacity-90">
                Serving Pickerington from 615 Hilliard Rome Rd, Columbus, OH 43228
              </p>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.averageRating?.toFixed(1) || '5.0'}</div>
                  <div className="text-gray-100">Google Rating</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.totalReviews || reviewStats.reviewCount}</div>
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
            Schedule Your Pickerington Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Free valley, flashing and ventilation check for Pickerington homeowners
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
