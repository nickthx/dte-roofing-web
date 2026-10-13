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

const DOCUMENT_TITLE = 'Roofers in Grove City, OH | Roofing Experts | DTE Roofing';

export default function GroveCity() {
  const { reviewData } = useReviewData();

  const groveCityFaqs = [
    {
      question: "My Grove City subdivision roof is the same age as my neighbors'. Does mine need replacing too?",
      answer: "Not necessarily. Houses built in the same phase often share a shingle, but they do not age at the same rate. A south-facing back slope bakes faster, a poorly vented attic cooks shingles from below, and a lot backing open fields takes more wind. We inspect your roof and attic on their own and photograph the worst areas. If minor repairs buy you a few good years, we tell you."
    },
    {
      question: "Will you handle HOA approval for a new roof?",
      answer: "We do most of it. We check your HOA's approved shingle list, bring samples to the house, and prepare the product sheet, color name and manufacturer details that committees usually want. You submit or sign the request if the HOA requires the homeowner to do so, and we wait for approval before scheduling. In Hoover Crossing, Indian Run, Derby Hill and Pinnacle this is routine for us."
    },
    {
      question: "Can you match the shingles on the rest of my roof after a repair?",
      answer: "We can usually get close with Grove City builder-grade shingles, because the color names stay in production for years. Shingles fade in the sun, though, so a new bundle looks brighter than a roof that has weathered for a decade or more. If you kept spares in the garage or attic, we use them. If a near match is not possible, we tell you before starting and look for a less visible place to work."
    },
    {
      question: "Why do shingles keep blowing off the back of my house?",
      answer: "It is usually exposure plus installation. Lots backing farmland catch wind with nothing to slow it, and the back slope takes the brunt. Builder-grade shingles nailed too high, or whose seal strips never bonded, lift first. We replace the missing pieces, hand-seal loose tabs nearby and check the nailing. If the nailing is the real problem, repairs will keep recurring, and a wind-rated replacement is the better fix."
    },
    {
      question: "Do older ranches near the Broadway Town Center need special treatment?",
      answer: "Often, yes. Many were built with plank decking, few attic vents and, in some cases, low-slope additions that were shingled at a pitch too flat for shingles. On replacement we check every board and replace damaged sections with plywood, add soffit and ridge venting where the framing allows, and put a proper membrane on flat sections. These homes are solid, but they reward a careful tear-off."
    },
    {
      question: "Do newer Grove City homes need ice and water shield on a replacement?",
      answer: "Yes. Many builder roofs had ice and water shield only where code required it, with felt everywhere else. On a replacement we install it along the eaves, in every valley and around vents and chimneys, then lay synthetic underlayment over the rest. On low-pitch porch roofs and additions we often cover the whole section. It is an inexpensive layer that does a lot to stop winter leaks."
    },
    {
      question: "What does builder-grade mean, and should I upgrade when I replace?",
      answer: "Builder-grade usually means the entry-level shingle, felt underlayment and the minimum ventilation needed to pass inspection when the house was built. It is not defective, just chosen for cost. When you replace, you can step up to a thicker architectural shingle with a higher wind rating, synthetic underlayment and balanced vents. We price each upgrade separately so you can choose what is worth it to you."
    },
    {
      question: "Do you install gutters and guards on newer Grove City homes?",
      answer: "Yes. Builder gutters in many newer subdivisions were sized for the minimum and overflow at inside corners where two roof planes empty into one run. We replace them with larger seamless gutters and downspouts, add guards where trees are close, and carry water away from the foundation. Doing gutters with a roof replacement saves a second setup and lets us tie the drip edge in properly."
    },
    {
      question: "How do I know if hail hit my roof in Grove City?",
      answer: "From the ground, look for dents in gutters, downspouts, mailbox lids and the metal vents on the roof, and for piles of granules at downspout outlets. Those signs suggest the shingles took hits as well. Bruised shingles often look normal from below, so the only reliable check is a close inspection. We mark and photograph impacts on every slope and tell you plainly whether a claim makes sense."
    },
    {
      question: "What is the best way to reach DTE Roofing from Grove City?",
      answer: "Call 614-971-6028 and an owner picks up, not a call center. We ask about your roof, your HOA and anything you have noticed, then set a time to come out. If you prefer, send a request through our contact page. Inspections and written estimates are free, and the person who inspects your roof is the same person who explains the quote and answers questions later."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={DOCUMENT_TITLE}
        description="DTE Roofing serves Grove City, OH with owner-led roof repair, replacement, gutters, gutter guards & storm damage. Call 614-971-6028."
        keywords="roofers grove city, roof repair grove city, roof replacement grove city, roofing company grove city, storm damage grove city, gutter services grove city, roofer near me grove city, roofers columbus"
        canonical="https://www.dteroofingllc.com/locations/grove-city"
        geoPlacename="Grove City, OH"
      />
      <SchemaMarkup
        type="location"
        documentTitle={DOCUMENT_TITLE}
        locationSlug="grove-city"
        locationName="Grove City"
        pageTitle="Roofers in Grove City, OH | DTE Roofing"
        pageDescription="DTE Roofing serves Grove City, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Detail-first roof repair and replacement with owners personally involved in every project."
        pageUrl="https://www.dteroofingllc.com/locations/grove-city"
        faqs={groveCityFaqs}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Grove City, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roof Repair & Replacement in Grove City, OH</h1>
            <p className="text-xl text-gray-200 mb-6">
              Roof replacement and repair across Grove City, from the older ranches near the Broadway Town Center to Hoover Crossing, Indian Run, Derby Hill and Pinnacle, where first roofs are wearing out on the same timetable. We match HOA colors, prepare the approval paperwork and fasten shingles to hold against wind off the open fields.
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

      <LocationBreadcrumb cityName="Grove City" />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Gutter Installation, Gutter Guards, Storm Damage & Hail Repair in Grove City</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Grove City lies southwest of downtown in Jackson Township, Franklin County. Our home base, <strong>615 Hilliard Rome Rd, Columbus, OH 43228</strong>, is a quick drive away by the <strong>I-270</strong> south loop or <strong>I-71</strong>, with <strong>US-62</strong> and <strong>Stringtown Road</strong> taking us to <strong>Hoover Road</strong>, <strong>Buckeye Parkway</strong>, <strong>Fryer Park</strong> and the streets out toward <strong>Scioto Grove Metro Park</strong>.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                The city has two distinct kinds of housing. Around the historic <strong>Town Center on Broadway</strong> are 1950s through 1970s ranches, many with plank decking, small attics and low-slope additions. Beyond that core, Grove City grew quickly: Hoover Crossing, Indian Run, Derby Hill and the Pinnacle golf community filled in during the 2000s and 2010s, and the former Beulah Park racetrack site is now being redeveloped.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                That growth left whole streets with roofs from the same builders, the same entry-level shingles and the same install dates, now aging out together. Replacing them well comes down to matching the color your HOA approved, getting the paperwork in before work starts, and nailing properly on lots that back up to farmland where nothing breaks the wind. An owner handles those details on every Grove City job.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Grove City Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Owners write every estimate and stay involved through cleanup",
                    "Color and profile matching for Grove City subdivisions",
                    "Samples and product sheets prepared for your HOA",
                    "Wind-rated shingles and careful edge nailing on exposed lots",
                    "Upgrades over builder-grade underlayment and attic vents",
                    "Experience with older ranches and additions near Broadway",
                    "Free roof checks after hail and wind on the southwest side",
                    "Gutters and guards sized for two-story subdivision homes",
                    "Quotes that separate needed work from optional upgrades"
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
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for Grove City</h3>
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
                  Wondering if your subdivision roof is due? An owner will look it over, check what your HOA allows and give you a written quote at no charge.
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Grove City Neighborhoods We Serve</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Historic Downtown / Broadway",
                "Stringtown Rd Corridor",
                "Westgrove Area",
                "Hoover Rd Area",
                "Buckeye Pkwy Corridor",
                "Near Fryer Park",
                "Near Scioto Grove",
                "Near Beulah Park Area",
                "Southwest Columbus Border",
                "Near Urbancrest Border",
                "Near Galloway Border",
                "Near Obetz Border",
                "Near Canal Winchester",
                "Jackson Pike Corridor",
                "White Oak Area",
                "Derby Hill Area",
                "Hoover Crossing Area",
                "Indian Run Area"
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Common Roofing Issues in Grove City</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Subdivision Roofs Aging Out Together</h3>
                <p className="text-charcoal-600">
                  Hoover Crossing, Indian Run, Derby Hill and Pinnacle were built over a fairly short span, so many roofs went on with similar builder-grade shingles at about the same time. Those shingles are now losing granules and letting go of their seal strips. We still inspect each house on its own, because orientation, attic venting and tree cover make identical homes age differently.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">HOA Color Matching and Approval Paperwork</h3>
                <p className="text-charcoal-600">
                  Most Grove City subdivisions have rules on shingle color, style and sometimes brand, and getting it wrong can mean a violation letter after the roof is on. Before scheduling, we check the approved list, bring physical samples and prepare the product sheets the architectural committee asks for.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Wind Lift on Lots Backing Farmland</h3>
                <p className="text-charcoal-600">
                  Plenty of newer Grove City streets end where the farm fields begin. Wind crosses that open ground without a break and hits the back slopes of the first row of houses hardest, creasing tabs and peeling shingles along ridges and rakes. We replace blow-offs with matching product, hand-seal loose tabs, and on full replacements use wind-rated shingles and starter strips nailed to the manufacturer's pattern.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Older Ranches and Low-Slope Additions Near Broadway</h3>
                <p className="text-charcoal-600">
                  The ranches around the Town Center predate current ventilation standards, and many have porches, sunrooms or garage conversions added with very little pitch. Shingles do not shed water well on those sections, so leaks start where the addition meets the main roof. We check the decking, add intake and exhaust vents where the attic allows, and use a low-slope membrane where shingles do not belong.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Proximity Proof: Serving Grove City from our Columbus HQ</h2>
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
                  The trip to Grove City is a run south on I-270 to the Stringtown Road or US-62 exit. Broadway and the Town Center are a few minutes from there, and Hoover Road and Buckeye Parkway lead to the newer subdivisions. Homes near Scioto Grove and the south end of town come off I-71.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Grove+City,+OH&destination=615+Hilliard+Rome+Rd,+Columbus,+OH+43228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center"
                  >
                    <Navigation className="mr-2 w-5 h-5" />
                    Get Directions from Grove City
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Map: DTE Roofing Serving Grove City</h2>
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
                  title="DTE Roofing serving Grove City - 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>

          <RecentWork projectIds={[10, 26, 19]} heading="Recent Roofing Work Near Grove City" className="mb-16" />
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Grove City Roofing FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {groveCityFaqs.map((faq, index) => (
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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Grove City Residents Choose Us</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Owner-Led Inspections",
                    description: "An owner measures your roof, checks the attic and explains the quote in person"
                  },
                  {
                    title: "Local Knowledge",
                    description: "We know the Grove City subdivisions and their HOA color rules"
                  },
                  {
                    title: "Honest Diagnostics",
                    description: "Your roof is judged on its condition, not on the fact that the house next door was replaced"
                  },
                  {
                    title: "Quality Materials",
                    description: "Architectural and wind-rated shingles in HOA-approved colors over upgraded underlayment"
                  },
                  {
                    title: "Attention to Detail",
                    description: "Straight rake edges, matched ridge caps and a yard swept for nails"
                  },
                  {
                    title: "Storm Damage Expertise",
                    description: "Photo reports after hail or wind so your insurer sees what the storm did"
                  },
                  {
                    title: "Emergency Response",
                    description: "Fast tarping when wind strips shingles off an exposed back slope"
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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Grove City Customer Reviews</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Linda T.",
                    area: "Stringtown Road",
                    text: "Professional from start to finish. They explained everything clearly, completed the work quickly, and the cleanup was immaculate. Highly recommend DTE Roofing!"
                  },
                  {
                    name: "Mike & Sarah P.",
                    area: "Near Fryer Park",
                    text: "Honest assessment—they told us we only needed flashing repair, not a full replacement. Saved us thousands! That's integrity you don't see often."
                  },
                  {
                    name: "David R.",
                    area: "Historic Downtown",
                    text: "After the hailstorm last spring, they documented everything perfectly for our insurance claim. New roof looks great and the whole process was smooth!"
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

          <NearbyAreas locationSlug="grove-city" />

          <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-8 rounded-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Protect Your Grove City Home</h2>
              <p className="text-xl mb-4">
                If your subdivision roof is showing its age, get an owner's opinion and an HOA-ready quote before the next windstorm.
              </p>
              <p className="text-lg mb-2 opacity-90">
                Serving Grove City from 615 Hilliard Rome Rd, Columbus, OH 43228
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
            Schedule Your Grove City Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Get a free, no-pressure roof assessment for your Grove City home
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
