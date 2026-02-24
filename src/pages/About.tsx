import { Link } from 'react-router-dom';
import { CheckCircle, Award, Users, Target, Heart, ChevronRight, Mail } from 'lucide-react';
import MobileStickyCall from '../components/MobileStickyCall';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
        description="Learn about DTE Roofing, Columbus's most trusted roofing company. Quality workmanship, honest service, and dedication to excellence."
        keywords="about DTE Roofing, Columbus roofing company, local roofer, family-owned roofing business"
        canonical="https://www.dteroofingllc.com/about"
      />
      <MobileStickyCall />
      <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About DTE Roofing</h1>
            <p className="text-xl text-gray-200">
              Building trust and excellence in roofing services since 2023
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">
               More Than a Roof — A Commitment to Excellence
              </h2>
              <p className="text-lg md:text-xl text-charcoal-600 leading-relaxed">
                At DTE Roofing LLC, we believe a roof is more than just shingles and nails—it's protection,
                peace of mind, and a lasting investment in your home. Built on our core value of Dedication
                to Excellence, we are committed to delivering top-tier roofing solutions with quality
                workmanship and a customer-first approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-6 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-charcoal-600 leading-relaxed">
              <p>
                DTE Roofing was founded with a simple mission: to provide honest,
                high-quality roofing services to our community. What started as a small family business
                has grown into one of the most trusted roofing companies in the region.
              </p>
              <p>
                We've built our reputation on integrity, craftsmanship, and exceptional customer service.
                Every project we undertake is treated with the same care and attention to detail as if it
                were our own home.
              </p>
              <p>
                Today, we continue to serve homeowners and businesses with the same dedication that made
                us successful, backed by our experienced team of skilled professionals who are committed
                to delivering excellence on every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Quality Craftsmanship</h3>
              <p className="text-charcoal-600 leading-relaxed">
                We never compromise on quality. Every project receives our full attention and expertise,
                ensuring results that last.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Customer First</h3>
              <p className="text-charcoal-600 leading-relaxed">
                Your satisfaction is our priority. We listen to your needs and work tirelessly to exceed
                your expectations.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Integrity</h3>
              <p className="text-charcoal-600 leading-relaxed">
                Honest communication and transparent pricing. We believe in doing the right thing,
                every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-8 text-center">
              Why Choose DTE Roofing?
            </h2>
            <ul className="space-y-4">
              {[
                'Quality workmanship guaranteed on every project',
                'Premium materials from trusted manufacturers',
                'Transparent pricing with no hidden fees',
                'Licensed, bonded, and fully insured',
                'Excellent customer service from start to finish',
                'Comprehensive warranty on all work performed',
                'Local family-owned business serving the community',
                'Emergency services available 24/7',
                'Free detailed estimates and consultations',
                'Experienced and professional team members'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary-700 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            {/* Accreditation badges */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-sm font-semibold text-charcoal-500 uppercase tracking-wide text-center mb-6">Recognized & Accredited By</p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                  <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-extrabold text-sm leading-none">BBB</span>
                  </div>
                  <div>
                    <p className="font-bold text-charcoal-900 text-sm leading-tight">BBB Accredited</p>
                    <p className="text-charcoal-500 text-xs">Better Business Bureau</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-extrabold text-sm leading-none">ND</span>
                  </div>
                  <div>
                    <p className="font-bold text-charcoal-900 text-sm leading-tight">Nextdoor Verified</p>
                    <p className="text-charcoal-500 text-xs">Neighborhood Recommended</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                  <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-extrabold text-sm leading-none">GAF</span>
                  </div>
                  <div>
                    <p className="font-bold text-charcoal-900 text-sm leading-tight">GAF Certified</p>
                    <p className="text-charcoal-500 text-xs">Factory Certified Contractor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">
                Our Story & Mission
              </h2>
            </div>

            {/* Mission Statement */}
            <div className="relative bg-primary-700 rounded-2xl px-8 py-10 mb-12 text-center shadow-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-200 mb-4">Our Mission</p>
              <blockquote className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                "To set the standard for the roofing industry by delivering quality you can see, transparency you can feel, and a company culture that lifts people higher — inside and outside our walls."
              </blockquote>
            </div>

            <div className="space-y-6 text-lg text-charcoal-600 leading-relaxed">
              <p>
                Founded in Columbus, DTE Roofing has grown from a small, family-run operation
                into one of the area's most trusted roofing companies. We've built our reputation one roof at a time,
                earning the trust of local homeowners through honest work and exceptional results.
                Our deep roots in the Columbus community mean we understand the unique challenges that Ohio weather
                brings, and we're committed to protecting our neighbors' homes with solutions that truly last.
              </p>

              <p>
                "Dedication to Excellence" isn't just our name—it's the principle that guides every decision we make.
                This philosophy means using only premium materials, employing skilled craftsmen who take pride in
                their work, and standing behind every project with comprehensive warranties. We believe excellence
                means showing up on time, communicating clearly, and treating your property with the same care we'd
                give our own homes.
              </p>

              <p>
                Transparency and craftsmanship are at the heart of what we do for Columbus homeowners. We provide
                detailed, honest estimates with no hidden fees, and we'll walk you through every step of the process
                so you know exactly what to expect. Whether it's a simple repair or a complete roof replacement,
                you can count on DTE Roofing to deliver quality workmanship, fair pricing, and the kind of
                personalized service that only a local, family-owned business can provide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              The dedicated professionals behind DTE Roofing LLC
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-48 h-48 rounded-lg mb-6 mx-auto overflow-hidden">
                <img
                  src="/Screenshot 2025-11-17 204715.png"
                  alt="Donovan Davis - DTE Roofing Owner inspecting roof shingles"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-2 text-center">Donovan Davis</h3>
              <p className="text-primary-700 font-semibold mb-4 text-center">Owner & Construction Expert</p>
              <p className="text-charcoal-600 leading-relaxed mb-6">
                Donovan, a passionate outdoorsman, thrives on sporting clays, golf, boating, and grilling the best smoked meats you've ever tasted. In his downtime, he cherishes time with family and close friends—sharing bourbon or short motorcycle rides. Donovan takes immense pride in excelling at everything he does and is eager to deliver top-tier roofing expertise for all your needs.
              </p>
              <Link
                to="/contact"
                className="w-full bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Donovan
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-48 h-48 rounded-lg mb-6 mx-auto overflow-hidden">
                <img
                  src="/Screenshot 2025-11-17 204702.png"
                  alt="Mitchell Davis - DTE Roofing Owner performing roof inspection"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-2 text-center">Mitchell Davis</h3>
              <p className="text-primary-700 font-semibold mb-4 text-center">Owner & Project Manager</p>
              <p className="text-charcoal-600 leading-relaxed mb-6">
                Mitchell, a proud Hilliard native, co-founded DTE Roofing to bring top-quality roofing solutions to his local community. When he's not climbing steep roofs, he enjoys cooking, riding motorcycles, spending time with family, and helping others achieve their fitness goals. Mitchell's passion for excellence and service drives everything he does at DTE Roofing.
              </p>
              <Link
                to="/contact"
                className="w-full bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Mitchell
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-48 h-48 rounded-lg mb-6 mx-auto overflow-hidden">
                <img
                  src="/Screenshot 2025-11-17 204544.png"
                  alt="Andrew Watts - DTE Roofing Consultant on residential roof"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-2 text-center">Andrew Watts</h3>
              <p className="text-primary-700 font-semibold mb-4 text-center">Roof Consultant</p>
              <p className="text-charcoal-600 leading-relaxed mb-6">
                Andrew is a dedicated professional committed to helping homeowners protect their investment with expert roofing solutions. Outside of work, he enjoys spending quality time with his wife and family and helping others achieve their fitness goals. Andrew's focus on customer service and attention to detail reflect his passion for serving the local community.
              </p>
              <Link
                to="/contact"
                className="w-full bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Andrew
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* See Us In Action — job site photos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">See Us In Action</h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              From start to finish — real jobs, real craftsmanship, real Columbus homeowners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/PXL_20241126_192222147.jpg" alt="DTE Roofing team on the job site" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/DTE IMAGE 1.webp" alt="DTE Roofing project in Columbus OH" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/PXL_20240910_193642307.jpg" alt="DTE Roofing crew working on residential roof" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/PXL_20241117_184811431.jpg" alt="DTE Roofing roof repair project" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            {/* TODO: Replace placeholder with actual job site photo */}
            <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-200 flex items-center justify-center">
              <div className="text-center text-charcoal-400">
                <div className="text-3xl mb-1">📷</div>
                <div className="text-sm font-medium">Photo coming soon</div>
              </div>
            </div>
            {/* TODO: Replace placeholder with actual job site photo */}
            <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-200 flex items-center justify-center">
              <div className="text-center text-charcoal-400">
                <div className="text-3xl mb-1">📷</div>
                <div className="text-sm font-medium">Photo coming soon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight max-w-4xl mx-auto">
            Ready for a Reliable Roofing Solution? Get a Free, No-Obligation Roof Inspection Today.
          </h2>
          <Link
            to="/contact"
            className="bg-white text-primary-700 px-10 py-5 rounded-lg hover:bg-gray-100 transition-all font-bold text-xl inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Schedule Your Free Inspection <ChevronRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
