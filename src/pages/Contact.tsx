import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import MobileStickyCall from '../components/MobileStickyCall';
import MultiStepLeadForm from '../components/lead-form/MultiStepLeadForm';

export default function Contact() {
  return (
    <>
      <MobileStickyCall />
      <div className="min-h-screen bg-white">
      <SEO
        title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
        description="Contact DTE Roofing for free estimates on roof repair, replacement & installation. Located at 615 Hilliard Rome Rd, Columbus OH. Call 614-971-6028. Fast response, 24/7 emergency service."
        keywords="contact roofer Columbus, free roof estimate, Columbus roofing company, Hilliard roofer, emergency roof repair, roofing contractor near me"
        canonical="https://www.dteroofingllc.com/contact"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-200">
              Get your free estimate today. We're here to answer your questions and discuss your roofing project.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form - Takes up 3 columns */}
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Get Your Free Estimate</h2>
                <p className="text-lg text-charcoal-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours with a detailed estimate.
                </p>

                <MultiStepLeadForm formSource="contact-page" />
              </div>

              {/* Company Information Sidebar - Takes up 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 mb-8 sticky top-4">
                  <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-3 rounded-lg mr-4 flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal-900 mb-1">Phone</div>
                        <a
                          href="tel:6149716028"
                          className="text-primary-700 hover:text-primary-800 text-lg font-medium transition-colors"
                        >
                          Call/Text: 614-971-6028
                        </a>
                        <p className="text-sm text-charcoal-600 mt-1">Available 24/7 for emergencies</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-3 rounded-lg mr-4 flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal-900 mb-1">Email</div>
                        <a
                          href="mailto:experience@dteroofingllc.com"
                          className="text-primary-700 hover:text-primary-800 transition-colors break-all"
                        >
                          experience@dteroofingllc.com
                        </a>
                        <p className="text-sm text-charcoal-600 mt-1">We respond within 24 hours</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-3 rounded-lg mr-4 flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal-900 mb-1">Address</div>
                        <address className="text-charcoal-700 not-italic">
                          615 Hilliard Rome Rd<br />
                          Columbus, OH 43228
                        </address>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-3 rounded-lg mr-4 flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal-900 mb-2">Business Hours</div>
                        <div className="text-charcoal-700 space-y-1 text-sm">
                          <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                          <p>Saturday: 8:00 AM - 4:00 PM</p>
                          <p>Sunday: Closed</p>
                          <p className="text-primary-700 font-semibold mt-2">Emergency Services: 24/7</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us Box */}
                <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Why Choose DTE Roofing?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Free detailed estimates with no obligation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Licensed, bonded, and fully insured</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span>24/7 emergency services available</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Comprehensive warranties</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span>100% customer satisfaction</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
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
              <p className="text-charcoal-600 mb-4">
                Serving Columbus, Hilliard, Dublin, and surrounding areas
              </p>
              <a
                href="https://www.google.com/maps/place/DTE+Roofing+LLC/@39.9637636,-83.1476323,17z/data=!3m1!4b1!4m6!3m5!1s0x883897c3548f20bf:0xdd1da18d4d7ccf43!8m2!3d39.9637636!4d-83.1476323!16s%2Fg%2F11vrcm8sdz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold transition-colors"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mt-12 bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4 text-center">Areas We Serve in Central Ohio</h3>
              <p className="text-charcoal-600 mb-6 text-center">
                DTE Roofing proudly serves homeowners and businesses throughout the Columbus metropolitan area.
              </p>
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
        </div>
      </section>
      </div>
    </>
  );
}
