import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Home, Wrench, CloudRain, Droplets } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';
import reviewStats from '../../data/review-stats.json';
import LocationBreadcrumb from '../../components/LocationBreadcrumb';
import NearbyAreas from '../../components/NearbyAreas';
import RecentWork from '../../components/RecentWork';
import { HQ_MAP_EMBED_SRC } from '../../data/business';

const DOCUMENT_TITLE = 'Roofers in Columbus, OH | Repair & Replacement | DTE Roofing';

export default function Columbus() {
  const { reviewData } = useReviewData();

  const columbusFaqs = [
    {
      question: "Where is DTE Roofing located in Columbus, and which areas do you reach fastest?",
      answer: "Our headquarters is at 615 Hilliard Rome Rd, Columbus, OH 43228, on the west side of Columbus near I-270. That puts our crews close to Hilltop, Westgate, Franklinton, Grandview Heights and Upper Arlington, with a short drive on I-70 or I-670 to downtown, German Village and the Short North. We serve every Columbus neighborhood and the surrounding Franklin County suburbs, so call to confirm scheduling for your street."
    },
    {
      question: "Do you pull City of Columbus permits for a roof replacement?",
      answer: "Yes. When a re-roof requires a permit from the City of Columbus, we pull it under our company and schedule the required inspections, so you do not have to handle the paperwork yourself. Suburbs such as Bexley, Upper Arlington and Grandview Heights run their own building departments with their own rules, and we follow whichever jurisdiction your address falls in. Permit and inspection records stay with your project file."
    },
    {
      question: "Can you replace a roof in German Village, Italian Village or Victorian Village?",
      answer: "Yes. These are historic districts, and exterior changes there, including some roofing work, may need approval from the historic commission that oversees the district before work starts. We help by photographing the existing roof, specifying materials that match its original look and profile, and preparing the details commissions typically ask for. Contact the commission early, because approval timing can affect when your project can begin."
    },
    {
      question: "Do you work on rental properties near Ohio State and the University District?",
      answer: "We do. Many University District, Weinland Park and Old North Columbus homes are tenant-occupied, so we coordinate access with landlords and property managers, give tenants advance notice and clear driveways and yards at the end of each day. The turnaround between leases is a good window for a replacement, and we send photos and a written report to owners who live out of town so they can approve work remotely."
    },
    {
      question: "Do you repair flat or low-slope roofs on downtown and older Columbus buildings?",
      answer: "Yes. Older mixed-use buildings downtown, in the Short North and along corridors such as High Street often have flat or low-slope sections that drain very differently from a pitched roof. Ponding water, open seams and worn flashing at parapet walls are the usual trouble spots. We inspect drainage, membrane condition and flashing, then recommend a targeted repair or a replacement through our commercial roofing service."
    },
    {
      question: "Why do older Columbus homes get ice dams, and how do you fix them?",
      answer: "Many Columbus houses built between the 1950s and 1970s have thin attic insulation and limited ventilation. Heat escaping into the attic melts snow on the upper roof, and the water refreezes at the colder eaves, backing up under the shingles. The lasting fix is improving attic ventilation and insulation, then installing ice-and-water shield along the eaves when the roof is replaced, instead of chipping away ice every winter."
    },
    {
      question: "What should I do after a hail or wind storm damages my Columbus roof?",
      answer: "First make sure everyone is safe, stay off the roof and catch any interior leaks with buckets or towels. Take dated photos of visible damage from the ground, then call us for an inspection. We document what we find with photos and a written report, and we can meet your insurance adjuster on the roof so nothing is missed. Be cautious about signing with door-to-door crews that appear right after a storm."
    },
    {
      question: "How long does a roof replacement take in Columbus?",
      answer: "Most single-family roof replacements take one to a few days, depending on the size and pitch of the roof, how many old layers come off and the weather. If we find rotted decking once the old shingles are removed, replacing those boards adds time, and rain or high wind can pause work. We give you a schedule before we start and keep you updated each day until cleanup is done."
    },
    {
      question: "Should I repair or replace my Columbus roof?",
      answer: "It depends on the roof's age, how widespread the damage is and whether problems keep coming back. A few missing shingles or one leaking flashing on an otherwise sound roof is usually a repair. Widespread granule loss, curling shingles, soft decking or repeated leaks on an older roof often make replacement the better investment. We show you photos of what we find and only recommend replacement when it is actually necessary."
    },
    {
      question: "What is the fastest way to schedule a roof inspection in Columbus?",
      answer: "Call us at 614-971-6028 or send a request through our contact form. Roof inspections are free, and we walk you through what we find with photos so you understand your roof's condition before deciding anything. Tell us if you have an active leak or storm damage so we can prioritize your visit. We serve every Columbus neighborhood from our west-side headquarters on Hilliard Rome Rd."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={DOCUMENT_TITLE}
        description="DTE Roofing is a Columbus, OH roofing contractor at 615 Hilliard Rome Rd. Owner-led roof repair, replacement, storm damage & gutters. Call 614-971-6028."
        keywords="roofers columbus, roofers columbus oh, roofing company columbus, roof repair columbus, roof replacement columbus, storm damage columbus, gutter services columbus, roofer near me columbus"
        canonical="https://www.dteroofingllc.com/locations/columbus"
        geoPlacename="Columbus, OH"
      />
      <SchemaMarkup
        type="location"
        documentTitle={DOCUMENT_TITLE}
        locationSlug="columbus"
        locationName="Columbus"
        pageTitle="Roofers in Columbus, OH | DTE Roofing (Columbus HQ)"
        pageDescription="DTE Roofing serves Columbus, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Detail-first roof repair, replacement, and storm damage help."
        pageUrl="https://www.dteroofingllc.com/locations/columbus"
        faqs={columbusFaqs}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Columbus, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roof Repair & Replacement in Columbus, OH</h1>
            <p className="text-xl text-gray-200 mb-6">
              Your trusted local roofing contractor serving all Columbus neighborhoods with honest diagnostics and expert craftsmanship.
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

      <LocationBreadcrumb cityName="Columbus" />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Storm Damage, Commercial Roofing, Gutter Installation & Metal Roofing in Columbus</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                DTE Roofing is headquartered in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228. Founded by two brothers from Hilliard, we built our business on a simple principle: honest diagnostics and quality work. Our owners are personally involved in every project—ensuring quality and clear communication from start to finish. We serve homeowners throughout Columbus and Franklin County with great attention to detail and the same care we would give our own homes.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Columbus weather demands quality roofing. From hot, humid summers that accelerate shingle aging to harsh winters with ice dams and freeze-thaw cycles, your roof faces constant challenges. We understand these local conditions and install roofs built to handle them for decades, with careful attention to flashing, ventilation, and proper installation details.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Whether you live in a historic German Village home, a Clintonville bungalow near The Ohio State University campus, a downtown loft in the Arena District, or a newer build in Franklinton or any Columbus neighborhood, we have the expertise to handle your roofing needs. Columbus has diverse housing stock—from older homes that need careful assessment to newer construction requiring warranty-compliant work. We only recommend work that is actually necessary—no upselling, no unnecessary replacements.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We understand Columbus homeowners lead busy lives—commuting on I-270, I-71, or US-33, juggling work and family. That's why we provide clear communication, reliable arrival windows, and efficient scheduling. We respect your time and your property, completing work professionally with thorough cleanup.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Columbus Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Owners personally involved in every project",
                    "Great attention to detail on flashing, ventilation, and cleanup",
                    "Honest diagnostics—we fix only what is needed",
                    "Fast response times across all Columbus neighborhoods",
                    "Deep understanding of local building codes",
                    "GAF certified with premium material options",
                    `Highly rated by Columbus homeowners (${reviewData?.totalReviews || reviewStats.reviewCount}+ reviews)`
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
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for Columbus</h3>
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
                    { name: "Commercial Roofing", link: "/services/commercial-roofing" },
                    { name: "Historic Home Roofing", link: "/services/roof-repair" }
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
                  Our owners personally oversee every roofing project—just honest assessments and fair pricing.
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Columbus Neighborhoods We Serve</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "German Village",
                "Short North",
                "Clintonville",
                "Victorian Village",
                "Brewery District",
                "Arena District",
                "Franklinton",
                "Italian Village",
                "Grandview Heights",
                "Upper Arlington",
                "Bexley",
                "Whitehall",
                "Gahanna",
                "Reynoldsburg",
                "Westerville",
                "Grove City",
                "Worthington",
                "New Albany",
                "Powell",
                "Dublin"
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-charcoal-600 mt-6">
              Do not see your neighborhood? We serve all of Columbus and surrounding areas. Call to confirm service in your area.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Common Roofing Issues in Columbus</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Summer Heat and Humidity</h3>
                <p className="text-charcoal-600">
                  Columbus summers bring high heat and humidity that accelerate shingle aging and cause thermal expansion. We see cracked shingles, failing sealant strips, and premature granule loss. Proper ventilation is critical to extend roof life in our climate.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Winter Ice Dams</h3>
                <p className="text-charcoal-600">
                  Ohio winters create ice dam risks, especially on north-facing slopes and in older homes with inadequate attic insulation. Ice dams force water under shingles, causing leaks and interior damage. We assess ventilation and insulation during every inspection.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Storm Damage</h3>
                <p className="text-charcoal-600">
                  Central Ohio sees severe thunderstorms, high winds, and occasional hail. We respond quickly to storm damage, document issues for insurance claims, and provide permanent repairs—not just temporary patches. Our Xactimate expertise helps ensure fair claim settlements.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Aging Roofs in Established Neighborhoods</h3>
                <p className="text-charcoal-600">
                  Many Columbus neighborhoods have homes built in the 1950s-1990s with roofs now at or past their expected lifespan. We help homeowners determine whether repairs make sense or if replacement is the smarter long-term investment.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Roofing Services Tailored to Columbus Homes</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="w-8 h-8 text-primary-700" />
                  <h3 className="text-xl font-bold text-charcoal-900">Roof Repair in Columbus</h3>
                </div>
                <p className="text-charcoal-600 mb-4">
                  Columbus's mix of century-old brick homes and post-war ranches creates its own repair patterns. We handle:
                </p>
                <ul className="space-y-2">
                  {[
                    'Chimney flashing leaks on Clintonville and Old North brick bungalows',
                    'Steep-slope repairs on German Village and Victorian Village homes',
                    'Wind-lifted and missing shingles after summer storms',
                    'Valley, vent boot and skylight leaks',
                    'Emergency tarping to stop active leaks'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/services/roof-repair" className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold mt-4">
                  Learn More About Roof Repair <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-8 h-8 text-primary-700" />
                  <h3 className="text-xl font-bold text-charcoal-900">Roof Replacement</h3>
                </div>
                <p className="text-charcoal-600 mb-4">
                  When a Columbus roof is past saving, we replace it with a complete system built for Ohio freeze-thaw winters:
                </p>
                <ul className="space-y-2">
                  {[
                    'Full tear-offs on ranches and split-levels inside the I-270 ring',
                    'Deck inspection and rotted-board replacement',
                    'Ice-and-water shield at eaves and valleys',
                    'Balanced intake and ridge ventilation',
                    'GAF shingle options with manufacturer warranties'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/services/roof-replacement" className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold mt-4">
                  Learn More About Roof Replacement <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <CloudRain className="w-8 h-8 text-primary-700" />
                  <h3 className="text-xl font-bold text-charcoal-900">Storm & Hail Inspections</h3>
                </div>
                <p className="text-charcoal-600 mb-4">
                  Severe Central Ohio storms can leave damage you cannot see from the street. Our storm inspections include:
                </p>
                <ul className="space-y-2">
                  {[
                    'Slope-by-slope check for hail bruising and wind creasing',
                    'Gutter, downspout and soft-metal damage review',
                    'Dated photos and a written report for your insurer',
                    'Meeting your adjuster on the roof',
                    'Permanent repairs, not just temporary patches'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/services/storm-damage" className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold mt-4">
                  Learn More About Storm Damage <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="w-8 h-8 text-primary-700" />
                  <h3 className="text-xl font-bold text-charcoal-900">Gutters & Drainage</h3>
                </div>
                <p className="text-charcoal-600 mb-4">
                  Mature trees in Clintonville, Bexley and Olde Towne East fill gutters fast and push water where it does not belong. We provide:
                </p>
                <ul className="space-y-2">
                  {[
                    'Seamless gutters sized for your roof',
                    'Downspouts routed away from older foundations',
                    'Gutter guard options for tree-heavy streets',
                    'Fascia and soffit repair behind failed gutters',
                    'Drip edge to protect the roof edge'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/services/gutters" className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold mt-4">
                  Learn More About Gutters <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Permits, Historic Districts & Columbus Housing Stock</h2>
            <p className="text-charcoal-600 mb-4 leading-relaxed">
              Roof replacements inside Columbus city limits fall under City of Columbus building permit rules, and we handle the permit and inspection scheduling as part of the job. Columbus is also home to several historic districts. In German Village, Italian Village and Victorian Village, exterior changes may need approval from the commission that oversees the district, so matching the original materials and providing clear documentation matter before work begins. Whether you need a targeted <Link to="/services/roof-repair" className="text-primary-700 hover:underline font-semibold">historic home roof repair</Link> or a full re-roof, we photograph the existing roof and specify materials that respect the street's character.
            </p>
            <p className="text-charcoal-600 mb-4 leading-relaxed">
              Housing near Ohio State tells a different story. Many University District and campus-area homes are rentals, and landlords need work finished between leases with minimal disruption to tenants. Downtown and along older commercial corridors, mixed-use buildings often have flat or low-slope roofs where ponding water and parapet flashing are the usual problems, and our <Link to="/services/commercial-roofing" className="text-primary-700 hover:underline font-semibold">commercial and low-slope roofing services</Link> cover membrane repair and replacement for those buildings.
            </p>
            <p className="text-charcoal-600 mb-4 leading-relaxed">
              Across the I-270 ring, from Hilltop and Westgate to Northland and the Far East Side, Columbus neighborhoods are full of suburban ranches and two-stories built between the 1950s and 1990s. Many of those roofs are near the end of their service life and are good candidates for a <Link to="/services/roof-replacement" className="text-primary-700 hover:underline font-semibold">complete Columbus roof replacement with upgraded ventilation</Link>. The same neighborhoods take the brunt of spring wind and hail, and our <Link to="/services/storm-damage" className="text-primary-700 hover:underline font-semibold">storm damage inspections and insurance documentation</Link> help homeowners file with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Columbus Weather and Your Roof</h2>
              <p className="text-charcoal-600 mb-6">
                Columbus experiences four distinct seasons, each presenting unique challenges for your roof:
              </p>
              <div className="space-y-4">
                {[
                  {
                    season: "Summer",
                    challenge: "High heat and humidity can accelerate shingle aging and cause thermal expansion"
                  },
                  {
                    season: "Fall",
                    challenge: "Falling leaves can clog gutters and trap moisture, requiring regular cleaning"
                  },
                  {
                    season: "Winter",
                    challenge: "Ice dams, snow load, and freeze-thaw cycles can cause significant damage"
                  },
                  {
                    season: "Spring",
                    challenge: "Heavy rain and severe storms can reveal or create leaks and damage"
                  }
                ].map((item, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-charcoal-900 mb-2">{item.season}:</h3>
                    <p className="text-charcoal-600 text-sm">{item.challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">What Columbus Homeowners Say</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Mike R.",
                    neighborhood: "German Village",
                    text: "DTE Roofing did an excellent job on our historic home. They were respectful of the neighborhood and the quality is outstanding."
                  },
                  {
                    name: "Lisa M.",
                    neighborhood: "Clintonville",
                    text: "Fast response after storm damage, worked with our insurance, and had our roof repaired quickly. Very professional!"
                  },
                  {
                    name: "David K.",
                    neighborhood: "Upper Arlington",
                    text: "From estimate to completion, the entire process was smooth. Our new roof looks great and we had no issues."
                  }
                ].map((review, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                    <p className="text-charcoal-700 mb-4 italic">"{review.text}"</p>
                    <div className="font-bold text-charcoal-900">{review.name}</div>
                    <div className="text-charcoal-600 text-sm">{review.neighborhood}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <RecentWork projectIds={[1, 12, 19]} heading="Recent Roofing Work in Columbus" className="mb-16" />

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Columbus Roofing FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {columbusFaqs.map((faq, index) => (
                <details key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                  <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-charcoal-600 mt-4 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Visit Our Columbus HQ</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={HQ_MAP_EMBED_SRC}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map showing DTE Roofing headquarters at 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
              <p className="text-sm text-charcoal-600 mt-4 text-center">
                DTE Roofing headquarters — 615 Hilliard Rome Rd, Columbus, OH 43228
              </p>
            </div>
          </div>

          <NearbyAreas locationSlug="columbus" />

          <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-8 rounded-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Serving Columbus with Excellence</h2>
              <p className="text-xl mb-6">
                Your neighbors trust us—see why DTE Roofing is Columbus's choice for quality roofing
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.averageRating?.toFixed(1) || '5.0'}</div>
                  <div className="text-gray-100">Google Rating</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.totalReviews || reviewStats.reviewCount}+</div>
                  <div className="text-gray-100">Customer Reviews</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.totalReviews || reviewStats.reviewCount}</div>
                  <div className="text-gray-100">Verified Reviews</div>
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
            Schedule Your Columbus Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Contact DTE Roofing today for expert roofing services throughout Columbus
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
