import { Link } from 'react-router-dom';
import { Phone, Shield, Clock, Award, CheckCircle, Star, ChevronRight, BadgeCheck, Search, FileText, Wrench, CheckCircle2, MapPin, ExternalLink, Home as HomeIcon } from 'lucide-react';
import SEO from '../components/SEO';
import MobileStickyCall from '../components/MobileStickyCall';
import RoofQuoteButton from '../components/RoofQuoteButton';
import SchemaMarkup from '../components/SchemaMarkup';
import { useReviewData } from '../hooks/useReviewData';
import { CANONICAL_DOMAIN } from '../seo/constants';

export default function Home() {
  const { reviewData } = useReviewData();
  return (
    <>
      <MobileStickyCall />
      <div className="min-h-screen bg-white">
      <SEO
       title="BEST Roofer Columbus OH – Roof Repair & Replacement near me | DTE Roofing"
        description={`Founded by two brothers from Hilliard, Ohio. Honest inspections, precision repairs, and a perfect ${reviewData?.totalReviews || 92} five-star rating.`}
        keywords="roof inspection Columbus OH, Columbus roofing company, roof repair near me, roofing contractor Columbus, roof repair Columbus, roof replacement Columbus, residential roofing, commercial roofing, emergency roof repair"
        canonical={`${CANONICAL_DOMAIN}/`}
      />
      <SchemaMarkup
        type="home"
        pageTitle="DTE Roofing LLC - Columbus's Highest-Rated Roofing Contractor"
        pageDescription={`Founded by two brothers from Hilliard, Ohio. Honest inspections, precision repairs, and a perfect ${reviewData?.totalReviews || 92} five-star rating.`}
        pageUrl={`${CANONICAL_DOMAIN}/`}
      />
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-32 md:py-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hero-roofing-professional.jpg)',
          }}
          role="img"
          aria-label="DTE Roofing professional inspecting roof shingles at sunset in Columbus Ohio"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Columbus Roofers – Expert Roof Repair & Replacement
            </h1>
            <div className="w-24 h-1 bg-primary-600 mb-6"></div>
            <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-white drop-shadow-md font-light">
              Founded by two brothers from Hilliard, Ohio who built DTE Roofing to deliver honest diagnostics, precision repairs, and roofs that last.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                to="/contact"
                className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Get My Free Roof Inspection
              </Link>
              <RoofQuoteButton variant="secondary" />
            </div>
            <a
              href="tel:6149716028"
              className="inline-flex items-center gap-2 text-white hover:text-primary-300 transition-colors font-semibold text-lg mb-8 md:hidden"
            >
              <Phone className="w-5 h-5" />
              Call 614-971-6028
            </a>

            <div className="flex flex-col gap-4 mt-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/20 w-fit">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold text-lg">⭐ {reviewData?.totalReviews || 92} Verified 5-Star Reviews</span>
              </div>

              <div className="inline-flex items-center gap-2 text-white text-base">
                <BadgeCheck className="w-5 h-5 text-primary-400" />
                <span className="font-medium">Licensed & Insured • Locally Owned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/DTE-Roofing-Logo-two-Men.png"
                  alt="DTE Roofing founders Donovan and Mitchell inspecting roofs in Columbus OH"
                  className="w-full h-auto"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <p className="text-primary-700 font-semibold text-sm uppercase tracking-wider mb-3">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-6 leading-tight">
              We Started DTE Roofing to Do It Right.

              </h2>
              <p className="text-lg text-charcoal-700 leading-relaxed mb-6">
                DTE Roofing was founded by two brothers, Donovan and Mitchell, who were both raised in Hilliard Ohio and graduated from Hilliard Davidson High School. We built DTE Roofing to deliver honest diagnostics, <Link to="/services/roof-repair" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">precision repairs</Link>, and roofs that last. 
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-700 flex-shrink-0 mt-1" />
                  <p className="text-charcoal-700 font-medium">Honest diagnostics — fix only what's needed</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-700 flex-shrink-0 mt-1" />
                  <p className="text-charcoal-700 font-medium">Owner oversight on every project</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-700 flex-shrink-0 mt-1" />
                  <p className="text-charcoal-700 font-medium">Workmanship and material warranties</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Book My Free Inspection
                </Link>
                <Link
                  to="/reviews"
                  className="text-primary-700 hover:text-primary-800 px-8 py-4 rounded-lg hover:bg-primary-50 transition-all font-semibold text-lg inline-flex items-center justify-center border-2 border-primary-700"
                >
                  See Our 5-Star Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">Our Roofing Services</h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Comprehensive roofing solutions for residential and commercial properties in Columbus, OH
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {[
              {
                title: 'Roof Inspection',
                description: 'Hands-on inspections by expert roofers. We show you exactly what your roof needs—nothing more.',
                proof: 'Photos + written findings',
                link: '/services/roof-inspection',
                icon: Search
              },
              {
                title: 'Roof Repair',
                description: 'Precision repairs that solve the root cause—leaks, flashing, shingles, vents.',
                proof: 'Workmanship warranty',
                link: '/services/roof-repair',
                icon: Wrench
              },
              {
                title: 'Roof Replacement',
                description: 'Premium materials, clean installs, lifetime value. Done right the first time.',
                proof: 'Owner oversight',
                link: '/services/roof-replacement',
                icon: Shield
              },
              {
                title: 'Emergency Services',
                description: 'Storm damage, active leaks, tarping. We stabilize fast, then fix properly.',
                proof: 'Priority response',
                link: '/services/emergency-services',
                icon: Clock
              },
              {
                title: 'Siding Services',
                description: 'Professional siding installation and repair to protect and beautify your home.',
                proof: 'Quality materials',
                link: '/services/siding',
                icon: HomeIcon
              },
              {
                title: 'Maintenance Plans',
                description: 'Annual inspections and tune-ups to extend roof life and prevent surprises.',
                proof: 'Photo documentation',
                link: '/services/roof-maintenance',
                icon: CheckCircle2
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:border-primary-600 transition-all hover:shadow-xl flex flex-col group">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal-900 mb-4">{service.title}</h3>
                  <p className="text-charcoal-600 mb-4 leading-relaxed flex-grow">{service.description}</p>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg mb-6 border border-gray-200">
                    <p className="text-sm text-charcoal-700 font-medium flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-700 flex-shrink-0" />
                      {service.proof}
                    </p>
                  </div>
                  <Link
                    to={service.link}
                    className="inline-flex items-center justify-center text-primary-700 hover:text-primary-800 font-semibold transition-colors group-hover:gap-2 gap-1"
                  >
                    Learn More
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-lg text-charcoal-700">
              Not sure what you need?{' '}
              <Link
                to="/contact"
                className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2"
              >
                Book a free roof inspection
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">Our Expert Process</h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              A transparent, customer-focused approach to roofing excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-primary-700 transition-all hover:shadow-lg">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-red-600" aria-label="Inspection icon" />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-red-600">01</span>
                <h3 className="text-xl font-bold text-red-600 mt-2">Inspection</h3>
              </div>
              <p className="text-charcoal-600 leading-relaxed">
                We begin with a comprehensive roof inspection to identify hidden issues.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-primary-700 transition-all hover:shadow-lg">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-red-600" aria-label="Explanation icon" />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-red-600">02</span>
                <h3 className="text-xl font-bold text-red-600 mt-2">Clear Explanation</h3>
              </div>
              <p className="text-charcoal-600 leading-relaxed">
                You receive a detailed report and honest recommendation—no unnecessary upsells.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-primary-700 transition-all hover:shadow-lg">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8 text-red-600" aria-label="Repairs icon" />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-red-600">03</span>
                <h3 className="text-xl font-bold text-red-600 mt-2">High-Quality Repairs</h3>
              </div>
              <p className="text-charcoal-600 leading-relaxed">
                Our experts use premium materials and proven techniques to restore your roof.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-primary-700 transition-all hover:shadow-lg">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-red-600" aria-label="Final review icon" />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-red-600">04</span>
                <h3 className="text-xl font-bold text-red-600 mt-2">Final Review & Maintenance</h3>
              </div>
              <p className="text-charcoal-600 leading-relaxed">
                We walk you through the completed work and offer maintenance options to prolong your roof's life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">Our Reputation</h2>
            <p className="text-2xl text-charcoal-700 font-semibold mb-2">
              With <Link to="/reviews" className="text-primary-700 hover:text-primary-800 underline decoration-2 underline-offset-2">{reviewData?.totalReviews || 92} verified five-star reviews</Link>, DTE Roofing is Columbus's highest-rated roofing company.
            </p>
            <p className="text-lg text-charcoal-600">Hear from Columbus homeowners about our expert roofing services</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'James R.',
                location: 'Homeowner',
                text: 'After our inspection, DTE clearly explained what was wrong and only fixed what was needed. Our roof looks great and we saved money in the long run.',
                rating: 5,
                initials: 'JR'
              },
              {
                name: 'Michelle T.',
                location: 'Homeowner',
                text: 'The diagnostic was incredibly thorough. They pinpointed the exact leak source and gave us honest options. Their knowledgeable approach saved us thousands.',
                rating: 5,
                initials: 'MT'
              },
              {
                name: 'David K.',
                location: 'Homeowner',
                text: 'Professional team that knows roofing inside and out. They explained everything in terms I could understand and delivered precise repairs without any upselling.',
                rating: 5,
                initials: 'DK'
              },
              {
                name: 'Amanda S.',
                location: 'Homeowner',
                text: 'DTE\'s expertise made all the difference. Their thorough inspection found issues other companies missed, and they only recommended repairs that were actually necessary.',
                rating: 5,
                initials: 'AS'
              },
              {
                name: 'Robert M.',
                location: 'Homeowner',
                text: 'Knowledgeable crew who diagnosed our problem accurately on the first visit. No guesswork, just professional service and quality workmanship that fixed it right.',
                rating: 5,
                initials: 'RM'
              },
              {
                name: 'Lisa H.',
                location: 'Homeowner',
                text: 'Their precise diagnostic skills identified the real problem quickly. They explained our options clearly and completed only the necessary work. Honest and cost-effective.',
                rating: 5,
                initials: 'LH'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                    <span className="text-primary-700 font-bold text-lg">{testimonial.initials}</span>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-charcoal-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-charcoal-900">{testimonial.name}</div>
                  <div className="text-charcoal-600 text-sm">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="bg-white border-2 border-primary-200 rounded-xl p-6 max-w-md mx-auto mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-charcoal-900">0 Negative Reviews</span>
              </div>
              <p className="text-charcoal-600">Every customer has been satisfied with our work</p>
            </div>

            <a
              href="https://www.google.com/maps/place/DTE+Roofing/@39.9747532,-83.1279464,17z/data=!4m8!3m7!1s0x88388b12d7c38f87:0xd5db37a6e0a52af8!8m2!3d39.9747532!4d-83.1253715!9m1!1b1!16s%2Fg%2F11y3k5qw0y?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg hover:shadow-xl mb-4"
            >
              See All {reviewData?.totalReviews || 92} Five-Star Reviews <ExternalLink className="ml-2 w-5 h-5" />
            </a>

            <p className="text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
              We invite every homeowner to leave a review — it helps other families choose a roofer they can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Projects Photo Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">Our Recent Work</h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              See DTE Roofing in action — real projects, real results for Columbus homeowners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Existing job site photos */}
            <div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/DTE IMAGE 1.webp" alt="DTE Roofing job site — Columbus OH roofing project" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/IMG_20240614_162239.jpg" alt="DTE Roofing crew on the job in Columbus" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/PXL_20240223_174412521.jpg" alt="DTE Roofing roof replacement project" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/PXL_20240910_193642307.jpg" alt="DTE Roofing team working on residential roof" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/PXL_20241117_184811431.jpg" alt="DTE Roofing project — storm damage repair Columbus" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/PXL_20241123_193437816.jpg" alt="DTE Roofing completed roof installation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            {/* TODO: Replace placeholder below with actual job site photo */}
            <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-100 flex items-center justify-center">
              <div className="text-center text-charcoal-400">
                <div className="text-4xl mb-2">📷</div>
                <div className="text-sm font-medium">Photo coming soon</div>
              </div>
            </div>
            {/* TODO: Replace placeholder below with actual job site photo */}
            <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-100 flex items-center justify-center sm:col-span-2 lg:col-span-2">
              <div className="text-center text-charcoal-400">
                <div className="text-4xl mb-2">📷</div>
                <div className="text-sm font-medium">Photo coming soon</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center bg-charcoal-800 text-white px-8 py-3 rounded-lg hover:bg-charcoal-900 transition-all font-semibold"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for an Expert Roof Assessment?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule your free inspection and experience why we're Columbus's highest-rated roofer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-bold text-lg inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book Free Inspection
            </Link>
            <a
              href="tel:6149716028"
              className="text-white hover:text-gray-200 transition-all font-semibold text-lg inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call 614-971-6028
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-3">Trusted by Columbus Homeowners</h2>
            <p className="text-lg text-charcoal-600">Licensed, certified, and committed to excellence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-xl text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Shield className="w-10 h-10 text-primary-700" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">Licensed & Insured</h3>
              <p className="text-charcoal-600">Fully licensed and insured roofing contractor in Ohio</p>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-xl text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <BadgeCheck className="w-10 h-10 text-primary-700" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">GAF Certified</h3>
              <p className="text-charcoal-600">Certified by leading roofing manufacturers</p>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-xl text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Award className="w-10 h-10 text-primary-700" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">5-Star Rated</h3>
              <p className="text-charcoal-600">Highest customer satisfaction ratings in Columbus</p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">Visit Our Location</h2>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.5419919506203!2d-83.14945649272185!3d39.96345808424561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883897c3548f20bf%3A0xdd1da18d4d7ccf43!2sDTE%20Roofing!5e0!3m2!1sen!2sus!4v1763415438244!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DTE Roofing LLC Location - 615 Hilliard Rome Rd, Columbus, OH 43228"
                className="w-full"
              />
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://www.google.com/maps/place/DTE+Roofing+LLC/@39.9637636,-83.1476323,17z/data=!3m1!4b1!4m6!3m5!1s0x883897c3548f20bf:0xdd1da18d4d7ccf43!8m2!3d39.9637636!4d-83.1476323!16s%2Fg%2F11vrcm8sdz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold transition-colors mb-4"
              >
                <MapPin className="w-5 h-5 mr-2" />
                View on Google Maps
              </a>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Areas We Serve</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">
                  Hilliard
                </Link>
                <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">
                  Dublin
                </Link>
                <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">
                  Columbus
                </Link>
                <Link to="/locations/westerville" className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">
                  Westerville
                </Link>
                <Link to="/locations/powell" className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">
                  Powell
                </Link>
                <Link to="/locations/delaware" className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">
                  Delaware
                </Link>
                <Link to="/locations/gahanna" className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">
                  Gahanna
                </Link>
                <Link to="/locations/grove-city" className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">
                  Grove City
                </Link>
                <Link to="/locations/new-albany" className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">
                  New Albany
                </Link>
                <Link to="/locations/worthington" className="text-primary-700 hover:text-primary-800 font-semibold hover:underline transition-colors">
                  Worthington
                </Link>
                <Link to="/locations" className="text-primary-700 hover:text-primary-800 font-bold hover:underline transition-colors">
                  View All Areas →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-md max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-primary-700" />
              <h3 className="text-2xl font-bold text-charcoal-900">Visit Our Google Business Profile</h3>
            </div>
            <p className="text-charcoal-600 mb-6">
              See what Columbus homeowners are saying about our roofing services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.google.com/maps/search/?api=1&query=DTE+Roofing+Columbus+OH"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center shadow-md hover:shadow-lg"
              >
                View Our Reviews <ExternalLink className="ml-2 w-5 h-5" />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=DTE+Roofing+Columbus+OH"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all font-semibold inline-flex items-center justify-center border-2 border-primary-700"
              >
                Get Directions <MapPin className="ml-2 w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-charcoal-700 font-semibold text-lg">{reviewData?.averageRating || 5.0} Rating on Google</span>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
