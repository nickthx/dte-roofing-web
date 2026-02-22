import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Home, Wrench, CloudRain, Droplets, Navigation } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';

export default function Delaware() {
  const { reviewData } = useReviewData();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Roofers Delaware, OH | DTE Roofing — Based in Columbus, Serving Delaware (~30 Miles)"
        description="Need roofers in Delaware, OH? DTE Roofing (615 Hilliard Rome Rd, Columbus, OH 43228) serves Delaware (~30 miles) with detail-first roof repair & replacement. Owners speak with every customer. Call 614-971-6028."
        keywords="roofers delaware oh, roofers near delaware, best roofers in delaware, roof repair delaware, roof replacement delaware, delaware ohio roofing contractor, roofers columbus"
        canonical="https://www.dteroofingllc.com/locations/delaware"
      />
      <SchemaMarkup
        type="location"
        locationName="Delaware"
        pageTitle="Roofers in Delaware, OH | DTE Roofing (Columbus HQ at 615 Hilliard Rome Rd)"
        pageDescription="DTE Roofing serves Delaware, OH (~30 miles) from 615 Hilliard Rome Rd, Columbus, OH 43228. Detail-first roof repair and replacement with owners speaking to every customer."
        pageUrl="https://www.dteroofingllc.com/locations/delaware"
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Delaware, Ohio (~30 Miles from Columbus)</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roofers Delaware, OH | DTE Roofing</h1>
            <p className="text-xl text-gray-200 mb-6">
              Expert roof repair, replacement, and storm damage services for Delaware homeowners. Based in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228, we serve Delaware and all surrounding neighborhoods with the same attention to detail our owners bring to every customer conversation.
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
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Best Roofers in Delaware, OH — Columbus-Based, Delaware-Trusted</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We're based in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228, and routinely serve Delaware (about 30 miles north). Whether you're near <strong>Historic Downtown Delaware</strong> along <strong>Sandusky Street</strong>, close to <strong>Ohio Wesleyan University (OWU)</strong>, or in one of the newer neighborhoods expanding north and east, we bring the same detail-first approach that sets DTE Roofing apart. Our owners personally speak with every customer—no sales teams, no runaround—just direct communication and genuine care for your home.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Delaware's roofing environment is unique. With a current population estimate around <strong>46,521 (2024)</strong> and Delaware County projected to grow roughly <strong>85% from 2020 to 2050</strong>, the city is seeing rapid development alongside historic preservation. From Victorian-era homes Downtown to mid-century properties in Berkshire and Glenmoor, to brand-new builds in Liberty Township and Presidential Parkway, each home demands a tailored roofing strategy. Whether it's ventilation for ice dam prevention, wind-driven rain protection on older flashing, or quality oversight for new construction, we understand Delaware's housing diversity.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Delaware's northern position means harsher winters—heavier snow loads, longer freezing periods that accelerate shingle aging, and higher ice dam risk compared to southern Columbus suburbs. Wind-driven rain can penetrate older chimney flashing, tree debris from mature neighborhoods clogs gutters faster, and hail events require thorough <Link to="/services/storm-damage" className="text-primary-700 hover:underline font-semibold">storm damage</Link> inspections. We also navigate Delaware County's distinct building codes and permitting processes, ensuring every job meets local requirements.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                <strong>Local context matters:</strong> During busy event weeks like the <strong>Delaware County Fair</strong> or <strong>Little Brown Jug</strong> harness racing week, traffic increases and parking becomes tight. We schedule around these events, keep job sites clean and organized, avoid blocking driveways, and maintain respect for your neighbors. As <Link to="/locations/columbus" className="text-primary-700 hover:underline font-semibold">Roofers Columbus</Link> serving the broader region, we understand how local calendars and community events shape daily life in Delaware.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                <strong>Insurance trends in 2025–2026:</strong> Insurers are tightening roof claim rules due to increased storm, hail, and wind damage frequency. Having thorough documentation—photos, measurements, shingle samples—can be the difference between a smooth claim and a denial. We help homeowners document damage properly and work directly with adjusters when needed.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Delaware Locals Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Owners speak with every customer—no sales teams',
                    'Great attention to detail on every project',
                    'Clean, organized job sites with neighbor respect',
                    'Storm damage documentation for insurance claims',
                    'Scheduling flexibility around Delaware County Fair, Little Brown Jug, and event weeks',
                    'Expertise with Delaware County codes and permits',
                    'Understanding of northern exposure winter challenges (ice dams, ventilation)',
                    'Licensed, insured, and committed to quality craftsmanship'
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
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for Delaware</h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Roof Replacement', link: '/services/roof-replacement' },
                    { name: 'Roof Repair', link: '/services/roof-repair' },
                    { name: 'Historic Home Roofing', link: '/services/roof-installation' },
                    { name: 'Roof Inspections', link: '/services/roof-inspection' },
                    { name: 'Ice Dam Prevention', link: '/services/roof-maintenance' },
                    { name: '24/7 Emergency Services', link: '/services/emergency-services' },
                    { name: 'Storm Damage Repair', link: '/services/storm-damage' },
                    { name: 'Gutter Services', link: '/services/gutters' },
                    { name: 'Siding Installation', link: '/services/siding' },
                    { name: 'Insurance Claims', link: '/contact' },
                    { name: 'Preventative Maintenance', link: '/services/roof-maintenance' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-1" />
                      {item.link ? (
                        <Link to={item.link} className="text-charcoal-700 hover:text-primary-700 transition-colors">
                          {item.name}
                        </Link>
                      ) : (
                        <span className="text-charcoal-700">{item.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <h3 className="font-bold text-charcoal-900 mb-2 text-lg">Free Roofing Estimates</h3>
                <p className="text-charcoal-700 mb-4">
                  We provide comprehensive estimates for all Delaware roofing projects. Delaware County permitting assistance included.
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Delaware Neighborhoods We Serve</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'Historic Downtown',
                'Ohio Wesleyan Area',
                'Berkshire',
                'Cobblestone',
                'Glenmoor',
                'Liberty Park',
                'Oak Creek',
                'Pebble Run',
                'Presidential Parkway',
                'Turnberry',
                'Villages at Glenmoor',
                'Southpointe',
                'North Delaware',
                'Olentangy River',
                'Berlin Township',
                'Radnor'
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Roofing Services Tailored to Delaware Homes</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="w-8 h-8 text-primary-700" />
                  <h3 className="text-xl font-bold text-charcoal-900">Roof Repair in Delaware</h3>
                </div>
                <p className="text-charcoal-600 mb-4">
                  Delaware's wind-driven rain, hail, and winter ice can create leaks around chimneys, valleys, and flashing. We handle:
                </p>
                <ul className="space-y-2">
                  {[
                    'Missing or damaged shingles from wind storms',
                    'Chimney flashing leaks (common in older Downtown homes)',
                    'Ice dam damage and attic ventilation improvements',
                    'Emergency leak repairs and tarping',
                    'Valley and step flashing replacement'
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
                  When your Delaware roof reaches the end of its lifespan, a full replacement done right protects your home for decades:
                </p>
                <ul className="space-y-2">
                  {[
                    'Proper ventilation design to prevent ice dams',
                    'High-quality underlayment and ice/water shield',
                    'Architectural shingles rated for northern climates',
                    'Drip edge, starter strips, and ridge vents installed correctly',
                    'Clean job sites and thorough nail cleanup'
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
                  Delaware sees its share of severe weather. After storms, we provide:
                </p>
                <ul className="space-y-2">
                  {[
                    'Thorough roof and siding damage documentation',
                    'Photo evidence for insurance adjusters',
                    'Shingle samples showing hail impact',
                    'Written reports detailing all damage',
                    'Direct communication with insurance companies'
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
                  Delaware's mature trees and seasonal storms demand reliable gutter systems:
                </p>
                <ul className="space-y-2">
                  {[
                    'Gutter cleaning and debris removal',
                    'Gutter replacement and installation',
                    'Fascia and soffit repair from overflow damage',
                    'Downspout extensions and drainage solutions',
                    'Seasonal maintenance programs'
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Proximity Proof: How We Get to Delaware</h2>
            <div className="bg-primary-50 p-8 rounded-xl border-2 border-primary-200">
              <p className="text-lg text-charcoal-700 mb-4">
                <strong>Our Columbus headquarters:</strong> 615 Hilliard Rome Rd, Columbus, OH 43228
              </p>
              <p className="text-lg text-charcoal-700 mb-4">
                <strong>Distance to Delaware:</strong> Approximately 30 miles (via US-23 North)
              </p>
              <p className="text-lg text-charcoal-700 mb-6">
                We routinely serve Delaware, whether you're near Historic Downtown, OWU, the Fairgrounds, or newer developments off US-36/SR-37. Our team knows the routes, the neighborhoods, and the local building codes. We schedule efficiently, arrive on time, and treat your property with the same respect we'd give our own homes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=615+Hilliard+Rome+Rd,+Columbus,+OH+43228&origin=Delaware,+OH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center shadow-lg"
                >
                  <Navigation className="mr-2 w-5 h-5" />
                  Get Directions from Delaware
                </a>
                <Link
                  to="/contact"
                  className="bg-charcoal-900 text-white px-6 py-3 rounded-lg hover:bg-charcoal-800 transition-all font-semibold inline-flex items-center justify-center shadow-lg"
                >
                  Schedule Your Inspection <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Map: DTE Roofing (Columbus HQ) Serving Delaware</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d196754.5897144285!2d-83.1577!3d40.1945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x883889c1b990de71%3A0x351d61f8b3555634!2sDelaware%2C%20OH!3m2!1d40.298683!2d-83.067938!4m5!1s0x8838f36c5f8d7f45%3A0x7b4d8f8f8f8f8f8f!2s615%20Hilliard%20Rome%20Rd%2C%20Columbus%2C%20OH%2043228!3m2!1d39.957915!2d-83.1577!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map showing route from Delaware, OH to DTE Roofing headquarters at 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
              <p className="text-sm text-charcoal-600 mt-4 text-center">
                Serving Delaware, OH from our Columbus headquarters — approximately 30 miles
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Delaware Roofing FAQs</h2>
            <div className="space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you actually serve Delaware if you're based in Columbus?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Absolutely. We're based at 615 Hilliard Rome Rd, Columbus, OH 43228, and Delaware is about 30 miles north via US-23. We routinely serve Delaware homeowners, from Historic Downtown to OWU to the newer neighborhoods. Distance has never been an issue, and our scheduling is efficient and reliable.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How do you handle roofing during Delaware County Fair / Little Brown Jug week?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  We schedule around major Delaware events when traffic increases and parking becomes tight. Our team coordinates arrival times, keeps job sites organized, and avoids blocking driveways or creating unnecessary disruption. We understand that community events are important, and we work with you to find the best timing.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What causes leaks near chimneys in older Downtown Delaware homes?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Chimney flashing is a common leak point, especially in Historic Downtown's older homes. Wind-driven rain, freeze-thaw cycles, and aging sealant all contribute. We inspect the step flashing, counter flashing, and cricket (if present), then replace or repair as needed. Proper flashing installation prevents future leaks and protects your masonry.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Is ice dam protection worth it in Delaware?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Yes. Delaware's northern location means heavier snow and longer freezing periods, increasing ice dam risk. We install ice and water shield along eaves and valleys, ensure proper attic ventilation, and check insulation levels. These measures prevent melt-water from backing up under shingles and leaking into your home.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you help document storm damage for insurance?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Absolutely. With insurers tightening claim rules in 2025–2026, thorough documentation is critical. We take detailed photos, collect shingle samples showing hail impact, measure damaged areas, and provide written reports. We can also speak directly with your adjuster if needed. Proper documentation improves your chances of claim approval.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How soon can you inspect after a storm?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  We prioritize storm response. Call us at <a href="tel:6149716028" className="text-primary-700 hover:underline font-semibold">614-971-6028</a>, and we'll schedule an inspection as quickly as possible—often within 24–48 hours. If you have active leaks, we offer emergency tarping to prevent further interior damage while we assess the full scope of repairs needed.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you replace gutters too?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Yes. We handle <Link to="/services/gutters" className="text-primary-700 hover:underline font-semibold">gutter installation</Link>, replacement, cleaning, and fascia/soffit repair. Delaware's mature trees mean gutters fill with debris fast. Properly functioning gutters protect your roof, siding, and foundation from water damage.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you work on historic/older homes near Downtown/OWU?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Yes. Historic and older homes require specialized approaches—matching shingle profiles, working with existing ventilation limitations, and respecting architectural details. We've worked on Victorian-era properties Downtown and near Ohio Wesleyan University, and we understand the balance between preservation and modern performance.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How do you keep nails out of driveways?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  We use magnetic rollers and conduct multiple cleanup passes during and after the job. Our team sweeps driveways, walkways, and landscaping thoroughly. Clean job sites aren't just professional—they're essential for safety and protecting your property. Attention to detail includes cleanup, not just installation.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What's the best way to schedule a roof inspection?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Call us at <a href="tel:6149716028" className="text-primary-700 hover:underline font-semibold">614-971-6028</a> or visit our <Link to="/contact" className="text-primary-700 hover:underline font-semibold">Contact page</Link>. Our owners speak with every customer, so you'll get direct communication from the start. We'll schedule a convenient time, inspect your roof thoroughly, and provide a detailed estimate with no pressure or sales tactics.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-8 rounded-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Delaware Home?</h2>
              <p className="text-xl mb-4">
                Join satisfied Delaware homeowners who trust DTE Roofing for quality roofing and exceptional service.
              </p>
              <p className="text-lg mb-6 opacity-90">
                Serving Delaware, OH from 615 Hilliard Rome Rd, Columbus, OH 43228 (~30 miles)
              </p>
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
            Schedule Your Delaware Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Contact DTE Roofing today for expert roofing services throughout Delaware, OH
          </p>
          <p className="text-lg text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Serving Delaware, OH from 615 Hilliard Rome Rd, Columbus, OH 43228 (~30 miles)
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
