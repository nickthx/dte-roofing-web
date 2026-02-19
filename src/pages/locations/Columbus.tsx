import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';

export default function Columbus() {
  const { reviewData } = useReviewData();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Roofers Columbus, OH | DTE Roofing — Roof Repair & Replacement"
        description="Looking for roofers in Columbus, OH? DTE Roofing is based at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Free inspections, detail-first repairs & replacements. Call 614-971-6028."
        keywords="roofers columbus, roofers columbus oh, roofing company columbus, roof repair columbus, roof replacement columbus, storm damage columbus, gutter services columbus, roofer near me columbus"
        canonical="https://www.dteroofingllc.com/locations/columbus"
      />
      <SchemaMarkup
        type="location"
        locationName="Columbus"
        pageTitle="Roofers in Columbus, OH | DTE Roofing (Columbus HQ)"
        pageDescription="DTE Roofing serves Columbus, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Detail-first roof repair, replacement, and storm damage help."
        pageUrl="https://www.dteroofingllc.com/locations/columbus"
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Columbus, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Columbus Roofers – Expert Roof Repair & Replacement</h1>
            <p className="text-xl text-gray-200 mb-6">
              Your trusted local roofing contractor serving all Columbus neighborhoods with honest diagnostics and expert craftsmanship.
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
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Columbus's Trusted Roofing Company</h2>
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
                    `Highly rated by Columbus homeowners (${reviewData?.totalReviews || 92}+ reviews)`
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

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Visit Our Columbus HQ</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.4428715447744!2d-83.15987!3d39.957915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU3JzI4LjUiTiA4M8KwMDknMzUuNSJX!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus"
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
                  <div className="text-4xl font-bold mb-2">{reviewData?.totalReviews || 92}+</div>
                  <div className="text-gray-100">Customer Reviews</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.totalReviews || 92}</div>
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
