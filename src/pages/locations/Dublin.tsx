import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Home, Wrench, CloudRain, Droplets, Navigation } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';

export default function Dublin() {
  const { reviewData } = useReviewData();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Roofers Dublin, OH | DTE Roofing — Columbus HQ, Serving Dublin"
        description="Looking for roofers in Dublin, OH? DTE Roofing (615 Hilliard Rome Rd, Columbus, OH 43228) serves Dublin with detail-first roof repair & replacement. Owners personally involved in every project. Call 614-971-6028."
        keywords="roofers dublin oh, roofers near dublin, best roofers in dublin, roof repair dublin, roof replacement dublin, storm damage dublin, gutter services dublin, roofers columbus"
        canonical="https://www.dteroofingllc.com/locations/dublin"
      />
      <SchemaMarkup
        type="location"
        locationName="Dublin"
        pageTitle="Roofers in Dublin, OH | DTE Roofing (Columbus HQ)"
        pageDescription="DTE Roofing serves Dublin, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Detail-first roof repair and replacement with owners personally involved in every project."
        pageUrl="https://www.dteroofingllc.com/locations/dublin"
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving Dublin, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roofers Dublin, OH | DTE Roofing</h1>
            <p className="text-xl text-gray-200 mb-6">
              Expert roof repair, replacement, and storm damage services for Dublin homeowners—from Historic Dublin to Bridge Park to Muirfield Village. We're based in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228 and serve Dublin regularly with the same attention to detail our owners bring to every project.
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
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Best Roofers in Dublin, OH — Columbus-Based, Dublin-Trusted</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We're based in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228, and routinely serve Dublin—from <strong>Bridge Park</strong> along the Scioto River to <strong>Historic Dublin</strong>, from <strong>Muirfield Village</strong> (home of the <strong>Memorial Tournament</strong>) to newer neighborhoods in every direction. Our owners are personally involved in every project—ensuring quality and clear communication from start to finish.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Dublin's roofing environment is unique. With a current population estimate around <strong>49,456 (2024)</strong>, Dublin has grown from a small historic crossroads into one of Central Ohio's most desirable communities. From Victorian-era homes in Historic Dublin to modern estates in Muirfield Village, from townhomes in Bridge Park to family homes near <strong>Coffman Park</strong>, each home demands a tailored roofing strategy. Whether it's ventilation for ice dam prevention, wind-driven rain protection on complex flashing, or quality oversight for new construction, we understand Dublin's housing diversity.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Dublin's exposure to western weather systems means stronger winds, more frequent hail events, and higher storm damage risk. Wind-driven rain can penetrate older chimney flashing, tree debris from mature neighborhoods clogs gutters faster, and hail events require thorough <Link to="/services/storm-damage" className="text-primary-700 hover:underline font-semibold">storm damage</Link> inspections. We also navigate Dublin's distinct building codes and permitting processes, ensuring every job meets local requirements.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                <strong>Local context matters:</strong> During busy weeks like the <strong>Memorial Tournament</strong> at Muirfield Village or the <strong>Dublin Irish Festival</strong> at Coffman Park, traffic increases dramatically and parking becomes tight. We schedule around these events, keep job sites clean and organized, avoid blocking driveways, and maintain respect for your neighbors. As <Link to="/locations/columbus" className="text-primary-700 hover:underline font-semibold">Roofers Columbus</Link> serving the broader region, we understand how local calendars and community events shape daily life in Dublin.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                <strong>Insurance trends in 2025–2026:</strong> Insurers are tightening roof claim rules due to increased storm, hail, and wind damage frequency. Having thorough documentation—photos, measurements, shingle samples—can be the difference between a smooth claim and a denial. We help homeowners document damage properly and work directly with adjusters when needed.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why Dublin Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Owners personally involved in every project',
                    'Great attention to detail on every project',
                    'Clean, organized job sites with neighbor respect',
                    'Scheduling flexibility around Memorial Tournament, Irish Festival, and event weeks',
                    'Storm damage documentation for insurance claims',
                    'Experience with Dublin HOAs and permitting',
                    'Careful protection of driveways, landscaping, and property',
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
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for Dublin</h3>
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
                  We provide comprehensive estimates for all Dublin roofing projects. Dublin permitting assistance included.
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Dublin Neighborhoods We Serve</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'Bridge Park / Downtown',
                'Historic Dublin',
                'Muirfield Village',
                'Tartan West',
                'Perimeter Center',
                'Wyndham Hills',
                'Coffman Park Area',
                'Indian Run Falls',
                'Riverside Drive',
                'Tartan Fields',
                'Ballantrae',
                'Amberleigh',
                'Asherton',
                'Bellepoint',
                'Brandon',
                'Donegal Cliffs'
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Roofing Services Tailored to Dublin Homes</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="w-8 h-8 text-primary-700" />
                  <h3 className="text-xl font-bold text-charcoal-900">Roof Repair in Dublin</h3>
                </div>
                <p className="text-charcoal-600 mb-4">
                  Dublin's wind-driven rain, hail, and storm exposure can create leaks around chimneys, valleys, and flashing. We handle:
                </p>
                <ul className="space-y-2">
                  {[
                    'Missing or damaged shingles from wind storms',
                    'Chimney flashing leaks (common in Historic Dublin homes)',
                    'Step flashing repairs on complex rooflines',
                    'Emergency leak repairs and tarping',
                    'Valley and ridge repairs'
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
                  When your Dublin roof reaches the end of its lifespan, a full replacement done right protects your home for decades:
                </p>
                <ul className="space-y-2">
                  {[
                    'Proper ventilation design to prevent ice dams',
                    'High-quality underlayment and ice/water shield',
                    'Premium architectural shingles for Dublin standards',
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
                  Dublin's western exposure means frequent storm activity. After storms, we provide:
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
                  Dublin's mature trees and seasonal storms demand reliable gutter systems:
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Proximity Proof: How We Get to Dublin</h2>
            <div className="bg-primary-50 p-8 rounded-xl border-2 border-primary-200">
              <p className="text-lg text-charcoal-700 mb-4">
                <strong>Our Columbus headquarters:</strong> 615 Hilliard Rome Rd, Columbus, OH 43228
              </p>
              <p className="text-lg text-charcoal-700 mb-4">
                <strong>Access to Dublin:</strong> Via I-270, US-33, and Riverside Drive corridor
              </p>
              <p className="text-lg text-charcoal-700 mb-6">
                We routinely serve Dublin, whether you're in Bridge Park, Historic Dublin, Muirfield Village, or the newer developments. Our team knows the routes, the neighborhoods, and the local building codes. We schedule efficiently, arrive on time, and treat your property with the same respect we'd give our own homes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=615+Hilliard+Rome+Rd,+Columbus,+OH+43228&origin=Dublin,+OH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center shadow-lg"
                >
                  <Navigation className="mr-2 w-5 h-5" />
                  Get Directions from Dublin
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Map: DTE Roofing (Columbus HQ) Serving Dublin</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d98580.45321567892!2d-83.1577!3d40.0992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x883889e3e3e3e3e3%3A0x3e3e3e3e3e3e3e3e!2sDublin%2C%20OH!3m2!1d40.0992!2d-83.1140!4m5!1s0x8838f36c5f8d7f45%3A0x7b4d8f8f8f8f8f8f!2s615%20Hilliard%20Rome%20Rd%2C%20Columbus%2C%20OH%2043228!3m2!1d39.957915!2d-83.1577!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map showing route from Dublin, OH to DTE Roofing headquarters at 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
              <p className="text-sm text-charcoal-600 mt-4 text-center">
                Serving Dublin, OH from our Columbus headquarters
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Dublin Roofing FAQs</h2>
            <div className="space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you serve Dublin if you're based in Columbus?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Absolutely. We're based at 615 Hilliard Rome Rd, Columbus, OH 43228, and Dublin is easily accessible via I-270, US-33, and Riverside Drive. We routinely serve Dublin homeowners throughout Bridge Park, Historic Dublin, Muirfield Village, and all Dublin neighborhoods. Distance has never been an issue, and our scheduling is efficient and reliable.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How do you schedule around Memorial Tournament / Irish Festival weeks?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  We understand that major Dublin events like the Memorial Tournament at Muirfield Village and the Dublin Irish Festival at Coffman Park create traffic congestion and parking challenges. We schedule around these event weeks when possible, coordinate arrival times carefully, keep job sites organized, and avoid blocking driveways or creating unnecessary disruption. We work with you to find the best timing for your project.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you work with HOAs in Dublin communities?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Yes. Many Dublin neighborhoods have active HOAs with specific architectural requirements. We're experienced in navigating HOA approval processes, matching existing shingle styles and colors, and ensuring all work meets community guidelines. We can handle the paperwork and communication with your HOA to make the process smooth for you.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Can you keep noise down near Bridge Park / dense neighborhoods?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  We're mindful of noise in dense residential areas and near commercial districts like Bridge Park. While roofing work inherently involves some noise, we schedule appropriately, work efficiently to minimize disruption, and communicate with neighbors as needed. We respect Dublin's community-oriented atmosphere and work to be good temporary neighbors during your project.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What causes leaks around chimneys and step flashing?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Chimney flashing is a common leak point, especially in Historic Dublin's older homes. Wind-driven rain, freeze-thaw cycles, and aging sealant all contribute. We inspect the step flashing, counter flashing, and cricket (if present), then replace or repair as needed. Proper flashing installation prevents future leaks and protects your masonry.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Is ice & water shield worth it in Dublin winters?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Yes. Dublin experiences cold winters with snow accumulation and ice dam risk. We install ice and water shield along eaves and valleys, ensure proper attic ventilation, and check insulation levels. These measures prevent melt-water from backing up under shingles and leaking into your home. It's a smart investment for long-term protection.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you help document storm damage for insurance?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Absolutely. With insurers tightening claim rules in 2025–2026, thorough documentation is critical. We take detailed photos, collect shingle samples showing hail impact, measure damaged areas, and provide written reports. We can also speak directly with your adjuster if needed. Proper documentation improves your chances of claim approval and fair settlement.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How do you keep nails out of driveways and sidewalks?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  We use magnetic rollers and conduct multiple cleanup passes during and after the job. Our team sweeps driveways, walkways, landscaping, and surrounding areas thoroughly. Clean job sites aren't just professional—they're essential for safety and protecting your property. Attention to detail includes cleanup, not just installation.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you replace gutters too?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Yes. We handle <Link to="/services/gutters" className="text-primary-700 hover:underline font-semibold">gutter installation</Link>, replacement, cleaning, and fascia/soffit repair. Dublin's mature trees mean gutters fill with debris quickly. Properly functioning gutters protect your roof, siding, and foundation from water damage.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What's the fastest way to schedule an inspection?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4">
                  Call us at <a href="tel:614-971-6028" className="text-primary-700 hover:underline font-semibold">614-971-6028</a> or visit our <Link to="/contact" className="text-primary-700 hover:underline font-semibold">Contact page</Link>. Our team ensures direct communication from the start. We'll schedule a convenient time, inspect your roof thoroughly, and provide a detailed estimate with no pressure or sales tactics.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-8 rounded-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Dublin Home?</h2>
              <p className="text-xl mb-4">
                Join satisfied Dublin homeowners who trust DTE Roofing for quality roofing and exceptional service.
              </p>
              <p className="text-lg mb-2 opacity-90">
                Serving Dublin, OH from 615 Hilliard Rome Rd, Columbus, OH 43228
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.averageRating?.toFixed(1) || '5.0'}</div>
                  <div className="text-gray-100">Google Rating</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.totalReviews || 92}+</div>
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
            Schedule Your Dublin Roof Inspection
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Contact DTE Roofing today for expert roofing services throughout Dublin, OH
          </p>
          <p className="text-lg text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Serving Dublin from 615 Hilliard Rome Rd, Columbus, OH 43228
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
