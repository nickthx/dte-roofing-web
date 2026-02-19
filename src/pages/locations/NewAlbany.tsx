import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MapPin, Shield, Home, Wrench, CloudRain, Droplets, Navigation } from 'lucide-react';
import SEO from '../../components/SEO';
import SchemaMarkup from '../../components/SchemaMarkup';
import { useReviewData } from '../../hooks/useReviewData';

export default function NewAlbany() {
  const { reviewData } = useReviewData();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Roofers New Albany, OH | DTE Roofing — Columbus HQ, Serving New Albany"
        description="Looking for roofers in New Albany, OH? DTE Roofing (615 Hilliard Rome Rd, Columbus, OH 43228) serves New Albany with expert roof repair & replacement. Owners personally involved in every project. Call 614-971-6028."
        keywords="roofers new albany oh, roofers near new albany, best roofers in new albany, roof repair new albany, roof replacement new albany, storm damage new albany, gutter services new albany, roofers columbus"
        canonical="https://www.dteroofingllc.com/locations/new-albany"
      />
      <SchemaMarkup
        type="location"
        locationName="New Albany"
        pageTitle="Roofers in New Albany, OH | DTE Roofing (Columbus HQ)"
        pageDescription="DTE Roofing serves New Albany, OH from 615 Hilliard Rome Rd, Columbus, OH 43228. Expert roof repair and replacement with owners personally involved in every project."
        pageUrl="https://www.dteroofingllc.com/locations/new-albany"
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Serving New Albany, Ohio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roofers New Albany, OH | DTE Roofing</h1>
            <p className="text-xl text-gray-200 mb-6">
              Expert roof repair, replacement, and storm damage services for New Albany homeowners—from Village Center to Rose Run Park to New Albany Country Club. We're based in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228 and serve New Albany regularly with the same attention to detail our owners bring to every project.
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
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Roofers Columbus Serving New Albany's Premier Community</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                We're based in Columbus at 615 Hilliard Rome Rd, Columbus, OH 43228, and serve New Albany regularly—approximately 20 miles, roughly 25-35 minutes depending on route and traffic. From the <strong>Village Center / Market Square</strong> area to <strong>Rose Run Park</strong>, from the elegant estates of <strong>New Albany Country Club</strong> to family neighborhoods near <strong>Jeanne B. McCoy Community Center for the Arts</strong>, we understand New Albany's distinctive community standards. Our owners are personally involved in every project—ensuring quality and clear communication—just direct communication and genuine care for your home.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                New Albany's master-planned excellence demands careful attention. Developed primarily by The New Albany Company beginning in the 1990s, this community features rigorous architectural review processes, comprehensive design guidelines, and exceptional attention to aesthetic detail. Whether it's a historic home near Market Square or a modern estate in Hampstead, each property requires careful coordination with HOA standards, premium materials, and meticulous craftsmanship. We've successfully navigated New Albany's architectural review requirements and understand what's needed for compliant, high-quality installations.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Common roofing challenges in New Albany include: wind-driven rain testing flashing around complex architectural details, tight scheduling around community events like <strong>New Albany Founders Day</strong> at Rose Run Park and the <strong>Independence Day Parade</strong>, noise sensitivity in dense neighborhoods near Village Center, and protecting premium landscaping and driveways during work. We schedule thoughtfully, work efficiently, and treat every property with respect.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                <strong>2025–2026 local trends:</strong> New Albany's continued growth and ongoing development have led to increased demand for roofing inspections, storm damage documentation for insurance claims, and HOA compliance assistance. As insurers tighten claim requirements and community standards remain high, homeowners need contractors who can document damage thoroughly, work with adjusters, and deliver installations that meet New Albany's elevated expectations. As experienced <Link to="/locations/columbus" className="text-primary-700 hover:underline font-semibold">Roofers Columbus</Link> serving the broader region, we bring this expertise to every New Albany project.
              </p>

              <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-700" />
                  <h3 className="font-bold text-charcoal-900 text-xl">Why New Albany Homeowners Choose DTE Roofing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Owners personally involved in every project',
                    'Great attention to detail on every project',
                    'Experience with New Albany HOAs and architectural review',
                    'Premium materials appropriate for luxury homes',
                    'Scheduling flexibility around Founders Day, parade, and event weekends',
                    'Storm damage documentation for insurance claims',
                    'Careful protection of landscaping, driveways, and property',
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
                <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Complete Roofing Services for New Albany</h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Premium Roof Replacement', link: '/services/roof-replacement' },
                    { name: 'Roof Repair & Maintenance', link: '/services/roof-repair' },
                    { name: 'Luxury Home Roof Installation', link: '/services/roof-installation' },
                    { name: 'Comprehensive Roof Inspections', link: '/services/roof-inspection' },
                    { name: 'Storm Damage Restoration', link: '/services/storm-damage' },
                    { name: '24/7 Emergency Services', link: '/services/emergency-services' },
                    { name: 'Premium Gutter Systems', link: '/services/gutters' },
                    { name: 'Designer Siding Installation', link: '/services/siding' },
                    { name: 'Preventative Maintenance Programs', link: '/services/roof-maintenance' },
                    { name: 'Architectural Review Board Assistance', link: '/contact' },
                    { name: 'Insurance Claim Management', link: '/contact' }
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
                <h3 className="font-bold text-charcoal-900 mb-2 text-lg">Free Premium Roofing Estimates</h3>
                <p className="text-charcoal-700 mb-4">
                  We provide detailed consultations and no-obligation estimates for all New Albany roofing projects, including architectural review assistance.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold"
                >
                  Request Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">New Albany Neighborhoods We Serve</h2>
            <p className="text-center text-charcoal-600 mb-8 max-w-3xl mx-auto">
              From New Albany Country Club's premier estates to Fenway's family neighborhoods, DTE Roofing provides expert premium roofing services throughout New Albany's distinctive community.
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'New Albany Country Club',
                'Village Center',
                'Hampstead',
                'Fenway',
                'Central College',
                'Kitzmiller',
                'York Woods',
                'Market Street',
                'Bevelhymer',
                'Rocky Fork-Blacklick',
                'Forest Park',
                'Central New Albany',
                'Learning Campus',
                'Business Park',
                'New Albany Farms',
                'Columbus Metro Area'
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all">
                  <span className="text-charcoal-700 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Roofing Services Tailored to New Albany Homes</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="w-8 h-8 text-primary-700" />
                  <h3 className="text-xl font-bold text-charcoal-900">Roof Repair in New Albany</h3>
                </div>
                <p className="text-charcoal-600 mb-4">
                  New Albany's complex architecture and premium materials require expert repair services:
                </p>
                <ul className="space-y-2">
                  {[
                    'Missing or damaged architectural shingles from storms',
                    'Chimney and skylight flashing leaks',
                    'Step flashing repairs on luxury home rooflines',
                    'Emergency leak repairs and tarping',
                    'Valley and ridge repairs on complex roof planes'
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
                  <h3 className="text-xl font-bold text-charcoal-900">Premium Roof Replacement</h3>
                </div>
                <p className="text-charcoal-600 mb-4">
                  New Albany homes demand premium materials and meticulous installation:
                </p>
                <ul className="space-y-2">
                  {[
                    'Premium architectural shingles appropriate for luxury homes',
                    'HOA and architectural review board compliance',
                    'High-quality underlayment and ice/water shield',
                    'Expert installation on complex roof lines',
                    'Clean job sites and thorough protection of property'
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
                  Thorough documentation for insurance claims and storm damage assessment:
                </p>
                <ul className="space-y-2">
                  {[
                    'Comprehensive roof and siding damage documentation',
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
                  <h3 className="text-xl font-bold text-charcoal-900">Premium Gutter Systems</h3>
                </div>
                <p className="text-charcoal-600 mb-4">
                  High-quality gutter solutions for New Albany homes:
                </p>
                <ul className="space-y-2">
                  {[
                    'Premium gutter installation and replacement',
                    'Gutter cleaning and debris removal',
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Proximity Proof: How We Get to New Albany</h2>
            <div className="bg-primary-50 p-8 rounded-xl border-2 border-primary-200">
              <p className="text-lg text-charcoal-700 mb-4">
                <strong>Our Columbus headquarters:</strong> 615 Hilliard Rome Rd, Columbus, OH 43228
              </p>
              <p className="text-lg text-charcoal-700 mb-4">
                <strong>Distance to New Albany:</strong> Approximately 20 miles, roughly 25-35 minutes depending on route and traffic
              </p>
              <p className="text-lg text-charcoal-700 mb-6">
                We routinely serve New Albany, whether you're in Village Center, Rose Run Park area, New Albany Country Club, or any New Albany neighborhood. Our team knows the routes, understands the architectural review processes, and respects the community's high standards. We schedule efficiently around community events like the Healthy New Albany Farmers Market at Market Square, Founders Day, and the Independence Day Parade, arrive on time, and treat your property with the utmost care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&origin=New+Albany,+OH&destination=615+Hilliard+Rome+Rd,+Columbus,+OH+43228"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center shadow-lg"
                >
                  <Navigation className="mr-2 w-5 h-5" />
                  Get Directions from New Albany
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Map: DTE Roofing (Columbus HQ) Serving New Albany</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d98580.45321567892!2d-83.0!3d40.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x88388f3f3f3f3f3f%3A0x3e3e3e3e3e3e3e3e!2sNew%20Albany%2C%20OH!3m2!1d40.08!2d-82.8088!4m5!1s0x8838f36c5f8d7f45%3A0x7b4d8f8f8f8f8f8f!2s615%20Hilliard%20Rome%20Rd%2C%20Columbus%2C%20OH%2043228!3m2!1d39.957915!2d-83.1577!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map showing route from New Albany, OH to DTE Roofing headquarters at 615 Hilliard Rome Rd, Columbus, OH 43228"
                  className="rounded-lg"
                ></iframe>
              </div>
              <p className="text-sm text-charcoal-600 mt-4 text-center">
                Serving New Albany, OH from our Columbus headquarters
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">New Albany Roofing FAQs</h2>
            <div className="space-y-4">
              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you serve New Albany if you're based in Columbus?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. We're based at 615 Hilliard Rome Rd, Columbus, OH 43228, and New Albany is approximately 20 miles away—roughly 25-35 minutes depending on route and traffic. We serve New Albany regularly and understand the community's architectural standards, HOA requirements, and permitting processes. Distance has never been an issue, and our scheduling is efficient and reliable for all New Albany neighborhoods.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Can you work with HOAs in New Albany neighborhoods?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. New Albany has some of the most active and detailed architectural review processes in Central Ohio. Many neighborhoods require submissions showing material specifications, color samples, manufacturer information, and installation plans before approval. We're experienced in navigating these requirements, recommending pre-approved materials, preparing comprehensive submission packages, and ensuring installations meet approved specifications exactly. We can handle the paperwork and communication with your HOA or architectural review board to streamline the process.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you schedule around Founders Day / Farmers Market / parade traffic?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. We understand that events like New Albany Founders Day at Rose Run Park, the Healthy New Albany Farmers Market at Market Square, and the Independence Day Parade create traffic congestion and parking challenges. We schedule around these event weeks when possible, coordinate arrival times carefully, keep job sites organized, and avoid blocking driveways or creating unnecessary disruption. We work with you to find the best timing for your project.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Are architectural shingles preferred in New Albany communities?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. New Albany's luxury home market typically demands premium architectural shingles or designer roofing products that complement high-end construction and meet architectural review standards. Basic three-tab shingles are rarely appropriate. We recommend premium manufacturers' top-tier collections featuring impact resistance (Class 4 hail protection), distinctive dimensional profiles, sophisticated color palettes, and extended warranties (30-50 year or lifetime coverage) appropriate for luxury property investments. During your consultation, we'll recommend specific products matching your home's architecture and meeting review board standards.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>What's the most common cause of leaks on newer homes?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  In newer New Albany homes, leaks most commonly occur around flashing—especially at chimneys, skylights, dormers, and where different roof planes meet. Complex architectural designs with multiple roof planes, custom features, and steep pitches require expert flashing installation. Wind-driven rain, freeze-thaw cycles, and aging sealant all contribute to flashing failures. We inspect flashing carefully during every assessment and repair or replace it with high-quality materials that last.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you help with insurance claim documentation?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Absolutely. With insurers tightening claim rules in 2025–2026, thorough documentation is critical. We take detailed photos, collect shingle samples showing hail impact, measure damaged areas, and provide written reports. We can also meet with your adjuster on-site if needed and speak directly with your insurance company. Proper documentation improves your chances of claim approval and fair settlement, which is especially important for New Albany's premium properties.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you offer emergency tarping?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. We provide 24/7 emergency services including temporary tarping to prevent further damage after storms. If you experience a leak or visible damage, call us at 614-971-6028 immediately. We'll respond quickly, assess the damage, install temporary protection, and schedule permanent repairs as soon as possible. Emergency tarping prevents water intrusion from causing additional damage to your home's interior and valuable belongings.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How do you protect landscaping and driveways?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  New Albany homes typically feature premium landscaping and hardscaping that require careful protection. We use tarps to protect plantings, install plywood walkways over delicate areas, position dumpsters on driveways with protective boards underneath, and conduct thorough cleanup with magnetic rollers to collect nails and debris. We treat every property with respect and understand that protecting your investment extends beyond the roof itself.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Do you do gutters and fascia/soffit?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Yes. We handle complete <Link to="/services/gutters" className="text-primary-700 hover:underline font-semibold">gutter installation</Link>, replacement, cleaning, and fascia/soffit repair. Premium gutter systems are essential for protecting your roof, siding, and foundation from water damage. We install high-quality gutters that complement New Albany's architectural standards and provide reliable performance for years.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-xl border border-gray-200 group">
                <summary className="font-bold text-charcoal-900 cursor-pointer list-none flex items-center justify-between">
                  <span>How do I book the fastest inspection?</span>
                  <span className="text-primary-700 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-charcoal-600 mt-4 leading-relaxed">
                  Call us at <a href="tel:614-971-6028" className="text-primary-700 hover:underline font-semibold">614-971-6028</a> or visit our <Link to="/contact" className="text-primary-700 hover:underline font-semibold">Contact page</Link>. Our team ensures direct communication from the start. We'll schedule a convenient time, inspect your roof thoroughly, and provide a detailed estimate with no pressure or sales tactics. Most inspections are scheduled within 2-3 days, and emergency situations get priority response.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-8 rounded-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Protect Your New Albany Investment</h2>
              <p className="text-xl mb-4">
                Join satisfied New Albany homeowners who trust DTE Roofing for premium quality, meticulous craftsmanship, and exceptional service.
              </p>
              <p className="text-lg mb-2 opacity-90">
                Serving New Albany, OH from 615 Hilliard Rome Rd, Columbus, OH 43228
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div>
                  <div className="text-4xl font-bold mb-2">{reviewData?.averageRating?.toFixed(1) || '5.0'}</div>
                  <div className="text-gray-100">Google Rating</div>
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
            Schedule Your New Albany Roofing Consultation
          </h2>
          <p className="text-xl text-charcoal-600 mb-4 max-w-2xl mx-auto">
            Contact DTE Roofing today for premium roofing services throughout New Albany, OH
          </p>
          <p className="text-lg text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Serving New Albany from 615 Hilliard Rome Rd, Columbus, OH 43228 • Call 614-971-6028
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
              Request Premium Estimate <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
