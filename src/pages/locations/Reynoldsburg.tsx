import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Navigation } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';
import reviewStats from '../../data/review-stats.json';
import LocationBreadcrumb from '../../components/LocationBreadcrumb';
import NearbyAreas from '../../components/NearbyAreas';
import RecentWork from '../../components/RecentWork';

const DOCUMENT_TITLE = 'Roofers in Reynoldsburg, OH | Roof Repair | DTE Roofing';

export default function Reynoldsburg() {
  const { reviewData } = useReviewData();

  const reynoldsburgFaqs = [
    {
      question: "How soon after a hailstorm should I have my Reynoldsburg roof inspected?",
      answer: "As soon as it is safe to get on the roof. Hail bruises are clearest in the first few weeks. After that, sun and rain wash the loosened granules away and the marks start to look like ordinary wear, which gives an adjuster room to dispute them. Many policies also limit how long you have to report damage. An owner will inspect, photograph each slope and give you a written summary."
    },
    {
      question: "Will you meet the insurance adjuster at my house?",
      answer: "Yes, and we prefer to. One of our owners comes with the photos and notes from our inspection, walks the roof alongside the adjuster and points out every hit, lifted tab and dented vent we recorded. If a slope gets missed or the count comes up short, we raise it on the spot rather than after the estimate is written. You should not need to speak roofing to get a fair inspection."
    },
    {
      question: "My house has two layers of shingles. What does a tear-off involve?",
      answer: "Two layers is common on older Reynoldsburg ranches and split-levels, and codes do not allow a third, so both come off. We strip to the wood deck, haul the debris away and inspect every sheet of sheathing. Rotted or delaminated boards are replaced and photographed. Then we install ice and water shield, underlayment, flashing and shingles. We explain up front how decking repairs could affect the price."
    },
    {
      question: "Does it matter which county my Reynoldsburg home is in?",
      answer: "Reynoldsburg spans parts of Franklin, Licking and Fairfield counties, and some homes with a Reynoldsburg mailing address actually sit in a neighboring township. For a roof, that mostly affects which office handles any required permit. We look up your parcel before work starts and take care of the paperwork. Pricing, scheduling and our workmanship warranty stay the same from one county to the next."
    },
    {
      question: "Can you tell hail damage from normal wear on an older roof?",
      answer: "Usually, yes. Hail leaves random, roughly round impacts where granules are crushed into the mat and the spot feels soft. Aging looks different: granule loss along the drip edge or on the sunniest slope, curled corners, and cracking in a pattern. On a 1970s split-level both can appear together, so we separate them in our report. That keeps your claim honest and focused on what the storm did."
    },
    {
      question: "What should I do if a storm leaves my roof leaking overnight?",
      answer: "Move valuables away from the drip and set a bucket under it. If the ceiling is bulging, poke a small hole at the low point so water drains in one place instead of bringing the drywall down. Then call 614-971-6028. We tarp or make a temporary repair as soon as it is safe, which also protects your claim, since insurers expect you to prevent further damage."
    },
    {
      question: "Is it worth replacing a builder-grade roof off Taylor Road or Waggoner Road before it fails?",
      answer: "Sometimes. If the shingles are curling, shedding granules into the gutters, or you have had more than one leak, you are paying to patch a roof that is close to done. If they still lie flat and stay sealed, a few repairs can buy time. We show you photos of the worst slopes and price both paths. Replacing on your own schedule usually costs less than replacing in a rush after a storm."
    },
    {
      question: "Do the big trees near Blacklick Woods cause roof problems?",
      answer: "They can. Overhanging branches drop leaves and seed pods into gutters and valleys and keep shaded slopes damp enough for moss. In high wind a dead limb can puncture the deck. Trim branches back from the roofline, keep gutters clear in the fall, and have the roof checked after any storm that brings limbs down. If moss has taken hold, we treat it and test the shingles beneath."
    },
    {
      question: "Should I get impact-resistant shingles in Reynoldsburg?",
      answer: "It is worth considering on the more exposed east side lots, or if you have already replaced a roof after hail. Class 4 impact-rated shingles resist cracking from hailstones better than standard ones, and some insurers give a premium discount for them. They cost more up front, so ask your agent about a credit first. We can price both shingle types for you on the same visit."
    },
    {
      question: "How do I get a Reynoldsburg roof inspection scheduled?",
      answer: "Call 614-971-6028 or use the form on our contact page. An owner answers, asks about the roof and any recent storm, and sets a time that suits you. We inspect the roof, attic and gutters, take photos and walk you through what we found. If there is storm damage, you leave with documentation to start a claim. If there is none, you get an honest answer and no sales pressure."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={DOCUMENT_TITLE}
        description="DTE Roofing serves Reynoldsburg, OH with owner-led roof repair, replacement, gutters & storm damage. Free inspections. Call 614-971-6028."
        keywords="roofers reynoldsburg, roof repair reynoldsburg, roof replacement reynoldsburg, roofing company reynoldsburg, storm damage reynoldsburg, gutter services reynoldsburg, roofer near me reynoldsburg, roofers columbus"
        canonical="https://www.dteroofingllc.com/locations/reynoldsburg"
        geoPlacename="Reynoldsburg, OH"
      />
      <SchemaMarkup
        type="location"
        documentTitle={DOCUMENT_TITLE}
        locationSlug="reynoldsburg"
        locationName="Reynoldsburg"
        pageTitle="Roofers in Reynoldsburg, OH | DTE Roofing"
        pageDescription="DTE Roofing serves Reynoldsburg, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Detail-first roof repair and replacement with owners personally involved in every project."
        pageUrl="https://www.dteroofingllc.com/locations/reynoldsburg"
        faqs={reynoldsburgFaqs}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Reynoldsburg, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roof Repair & Replacement in Reynoldsburg, OH</h1>
            <p className="text-xl text-gray-200 mb-6">
              Roof repair, replacement and storm damage work for Reynoldsburg homes, from the ranches and split-levels of Old Reynoldsburg to the newer streets off Taylor Road and Waggoner Road. When hail or high wind crosses the east side, an owner comes out, photographs the damage and builds the record your insurer needs.
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

      <LocationBreadcrumb cityName="Reynoldsburg" />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Commercial Roofing, Gutter Installation, Storm Damage & Metal Roofing in Reynoldsburg</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Reynoldsburg sits on the eastern edge of the metro and crosses three county lines: Franklin, Licking and Fairfield. From our shop on the west side (<strong>615 Hilliard Rome Rd, Columbus, OH 43228</strong>) crews come in on <strong>I-70</strong> or the <strong>I-270</strong> east loop, often by the <strong>Brice Road</strong> exit, and work along <strong>East Main Street</strong>, <strong>Broad Street (US-40)</strong>, <strong>Livingston Ave</strong>, <strong>Taylor Road</strong> and the shaded streets around <strong>Blacklick Woods Metro Park</strong>.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                The city is proud to be the <strong>"Birthplace of the Tomato,"</strong> and the Tomato Festival still celebrates that farming heritage. Old Reynoldsburg and the blocks off East Main and Broad are full of 1960s and 1970s ranches and split-levels on their second or third roof, and some still carry two layers of shingles that force a full tear-off. Toward Taylor Road, Waggoner Road and Blacklick, 1990s and 2000s subdivisions have builder-grade roofs reaching replacement age.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Storms tie most of our Reynoldsburg calls together. Hail bruises are easy to miss from the driveway and harder to prove as weeks pass, so we document early with dated photos, slope-by-slope notes and the dents in gutters and vents. Minor damage gets an honest repair quote. Damage that supports a claim gets a file the adjuster can work from.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Reynoldsburg Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "An owner on every inspection, from the first ladder climb to the walk-around",
                    "Dated hail and wind photos, organized slope by slope",
                    "Available to meet your adjuster on the roof",
                    "Full tear-offs on two-layer roofs, with the decking checked",
                    "Familiar with the ranches and split-levels of Old Reynoldsburg",
                    "Replacement plans for builder-grade roofs off Taylor and Waggoner Road",
                    "Gutter and fascia repair for homes under heavy tree cover",
                    "A straight answer when damage does not justify a claim",
                    "Licensed and insured, working from our west side Columbus shop"
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
                  Not sure whether last night's storm did real damage? An owner will check the roof, show you the photos and tell you whether it is worth calling your insurer.
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
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Two-Layer Tear-Offs on Older Ranches and Split-Levels</h3>
                <p className="text-charcoal-600">
                  Many ranches and split-levels along East Main Street and in Old Reynoldsburg were reroofed by laying new shingles over the old ones. That shortcut adds weight, traps heat and hides soft decking, and building codes do not allow a third layer. We strip to the boards, replace rotted sheathing, and rebuild the step flashing where short split-level roofs meet the walls.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Hail and Wind on the Open Eastern Edge</h3>
                <p className="text-charcoal-600">
                  Toward Blacklick and the eastern city limits, lots are more exposed and storms arrive with little to break them up. Hail can crack a shingle mat without obvious granule loss, and gusts break seal strips so the next rain gets underneath. We chalk and photograph every hit, check vents, gutters and downspouts for dents, and write a report an adjuster can follow.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Builder-Grade Roofs Near Taylor, Waggoner and Blacklick</h3>
                <p className="text-charcoal-600">
                  The subdivisions along Taylor Road, Waggoner Road and around Blacklick went up with entry-level shingles that now show granule loss, curled edges and brittle seal strips together. We tell you whether targeted repairs will carry you for a while or replacement makes more sense, and on replacement we upgrade the underlayment and attic ventilation the original build skimped on.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Tree Canopy, Clogged Gutters and Limb Strikes</h3>
                <p className="text-charcoal-600">
                  The older streets near Blacklick Woods Metro Park sit under big oaks and maples. Leaves pack the gutters by late fall, water backs up behind the fascia, and shaded north slopes grow moss. We clean and repair gutters, replace rotted fascia, suggest guards where the leaf load justifies them, and tarp limb damage quickly.
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
                  Our shop is on the west side, but Reynoldsburg is a straight run east on I-70, and the Brice Road exit drops us into the south part of town. Old Reynoldsburg and East Main are reached by Broad Street, and the I-270 east loop gets us to the Taylor Road and Waggoner Road subdivisions. The Licking and Fairfield County sections get the same scheduling and the same owner at the door.
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

          <RecentWork projectIds={[18, 14, 6]} heading="Recent Roofing Work Near Reynoldsburg" className="mb-16" />
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Reynoldsburg Roofing FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {reynoldsburgFaqs.map((faq, index) => (
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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Reynoldsburg Residents Choose Us</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Owner-Led Inspections",
                    description: "An owner climbs your roof, takes the photos and explains them before any price comes up"
                  },
                  {
                    title: "Local Knowledge",
                    description: "We know which streets have two-layer ranches and which subdivisions have roofs coming due"
                  },
                  {
                    title: "Honest Diagnostics",
                    description: "If hail did not damage your roof, we say so and will not push a weak claim"
                  },
                  {
                    title: "Quality Materials",
                    description: "Impact-rated and wind-rated shingle options for exposed east side lots"
                  },
                  {
                    title: "Attention to Detail",
                    description: "Decking checked on every tear-off and flashing rebuilt, not reused"
                  },
                  {
                    title: "Storm Damage Expertise",
                    description: "Slope-by-slope documentation and a contractor on site when your adjuster inspects"
                  },
                  {
                    title: "Emergency Response",
                    description: "Round-the-clock tarping when a storm or falling limb opens your roof"
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

          <NearbyAreas locationSlug="reynoldsburg" />

          <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-8 rounded-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Protect Your Reynoldsburg Home</h2>
              <p className="text-xl mb-4">
                Had hail or high wind in Reynoldsburg? Call before the evidence weathers away and we will put an owner on your roof.
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
            Schedule Your Reynoldsburg Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Book a free roof check for your Reynoldsburg home, with storm photos included
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
