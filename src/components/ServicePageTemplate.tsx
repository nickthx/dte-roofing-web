import { Link } from 'react-router-dom';
import { Phone, CheckCircle, Star, Shield, Award, ChevronRight } from 'lucide-react';
import SEO from './SEO';
import ServiceLeadForm from './ServiceLeadForm';
import MobileStickyCall from './MobileStickyCall';
import { useReviewData } from '../hooks/useReviewData';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ServicePageProps {
  serviceName: string;
  slug: string;
  subheadline: string;
  metaDescription: string;
  keywords: string;
  problemPromise: string;
  whatWeDo: string[];
  processSteps: ProcessStep[];
  faqs: FAQ[];
  relatedServices?: { name: string; link: string }[];
}

export default function ServicePageTemplate({
  serviceName,
  slug,
  subheadline,
  metaDescription,
  keywords,
  problemPromise,
  whatWeDo,
  processSteps,
  faqs,
  relatedServices = []
}: ServicePageProps) {
  const { reviewData } = useReviewData();
  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <MobileStickyCall />
      <div className="min-h-screen bg-white">
        <SEO
          title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
          description={metaDescription}
          keywords={keywords}
          canonical={`https://www.dteroofingllc.com/services/${slug}`}
        />

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <section className="bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {serviceName} in Columbus, OH
            </h1>
            <div className="w-20 h-1 bg-primary-600 mb-6"></div>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
              {subheadline}
            </p>
            <button
              onClick={scrollToForm}
              className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Book My Free Inspection
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
                The Problem → Our Promise
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-charcoal-700 leading-relaxed text-lg whitespace-pre-line">
                  {problemPromise}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
                What We Do
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {whatWeDo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <CheckCircle className="w-6 h-6 text-primary-700 flex-shrink-0 mt-0.5" />
                    <span className="text-charcoal-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
                Our Process
              </h2>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-charcoal-900 mb-2">{step.title}</h3>
                        <p className="text-charcoal-700 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-primary-50 border-l-4 border-primary-700 p-6 rounded-r-lg">
                <p className="text-charcoal-700 leading-relaxed">
                  <strong className="text-charcoal-900">Owner Involvement:</strong> Donovan and Mitchell personally meet homeowners on inspections and oversee all major projects to ensure quality standards are met.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
                Proof & Guarantees
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border-2 border-gray-200 text-center">
                  <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 mx-auto mb-3" />
                  <h3 className="font-bold text-charcoal-900 mb-2">{reviewData?.totalReviews || 92} Verified Reviews</h3>
                  <p className="text-sm text-charcoal-600 mb-3">Perfect 5-star rating on Google</p>
                  <Link to="/reviews" className="text-primary-700 hover:text-primary-800 font-semibold text-sm">
                    Read Reviews →
                  </Link>
                </div>
                <div className="bg-white p-6 rounded-xl border-2 border-gray-200 text-center">
                  <Shield className="w-12 h-12 text-primary-700 mx-auto mb-3" />
                  <h3 className="font-bold text-charcoal-900 mb-2">Licensed & Insured</h3>
                  <p className="text-sm text-charcoal-600">Fully licensed and insured in Ohio</p>
                </div>
                <div className="bg-white p-6 rounded-xl border-2 border-gray-200 text-center">
                  <Award className="w-12 h-12 text-primary-700 mx-auto mb-3" />
                  <h3 className="font-bold text-charcoal-900 mb-2">Comprehensive Warranties</h3>
                  <p className="text-sm text-charcoal-600">Workmanship & material warranties included</p>
                </div>
              </div>
              <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="text-charcoal-700 leading-relaxed">
                  <strong className="text-charcoal-900">Our Guarantee:</strong> We stand behind every job with comprehensive warranties. Founded by two brothers from Hilliard, Ohio who built DTE Roofing to deliver honest diagnostics, precision repairs, and roofs that last. Learn more <Link to="/about" className="text-primary-700 hover:text-primary-800 font-semibold underline">about our story</Link>.
                </p>
              </div>
            </section>

            {/* Our Recent Work — job site photos */}
            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
                Our Recent Work
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* TODO: Replace placeholders with actual job site photos */}
                <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-charcoal-400">
                    <div className="text-3xl mb-1">📷</div>
                    <div className="text-xs font-medium">Photo coming soon</div>
                  </div>
                </div>
                <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-charcoal-400">
                    <div className="text-3xl mb-1">📷</div>
                    <div className="text-xs font-medium">Photo coming soon</div>
                  </div>
                </div>
                <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-charcoal-400">
                    <div className="text-3xl mb-1">📷</div>
                    <div className="text-xs font-medium">Photo coming soon</div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all group">
                    <summary className="font-bold text-charcoal-900 cursor-pointer text-lg list-none flex items-center justify-between">
                      {faq.question}
                      <ChevronRight className="w-5 h-5 text-primary-700 transform group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="text-charcoal-700 leading-relaxed mt-4 pl-0">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {relatedServices.length > 0 && (
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
                  Related Services
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedServices.map((service, index) => (
                    <Link
                      key={index}
                      to={service.link}
                      className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-lg group flex items-center justify-between"
                    >
                      <span className="font-semibold text-charcoal-900 group-hover:text-primary-700">
                        {service.name}
                      </span>
                      <ChevronRight className="w-5 h-5 text-primary-700 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
                We Serve These Areas
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  to="/locations/hilliard"
                  className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-lg group flex items-center justify-between"
                >
                  <span className="font-semibold text-charcoal-900 group-hover:text-primary-700">
                    Hilliard
                  </span>
                  <ChevronRight className="w-5 h-5 text-primary-700 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/locations/dublin"
                  className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-lg group flex items-center justify-between"
                >
                  <span className="font-semibold text-charcoal-900 group-hover:text-primary-700">
                    Dublin
                  </span>
                  <ChevronRight className="w-5 h-5 text-primary-700 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/locations/columbus"
                  className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-lg group flex items-center justify-between"
                >
                  <span className="font-semibold text-charcoal-900 group-hover:text-primary-700">
                    Columbus
                  </span>
                  <ChevronRight className="w-5 h-5 text-primary-700 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/locations/westerville"
                  className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-lg group flex items-center justify-between"
                >
                  <span className="font-semibold text-charcoal-900 group-hover:text-primary-700">
                    Westerville
                  </span>
                  <ChevronRight className="w-5 h-5 text-primary-700 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/locations/powell"
                  className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all hover:shadow-lg group flex items-center justify-between"
                >
                  <span className="font-semibold text-charcoal-900 group-hover:text-primary-700">
                    Powell
                  </span>
                  <ChevronRight className="w-5 h-5 text-primary-700 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

            <section className="bg-gradient-to-r from-primary-700 to-primary-800 text-white p-8 md:p-12 rounded-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready for an Expert Roof Assessment?
              </h2>
              <p className="text-xl mb-8 text-gray-100">
                Schedule your free inspection and experience why we're Columbus's highest-rated roofer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToForm}
                  className="bg-white text-primary-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-bold text-lg inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Book Free Inspection
                </button>
                <a
                  href="tel:6149716028"
                  className="text-white hover:text-gray-200 transition-all font-semibold text-lg inline-flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 614-971-6028
                </a>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8" id="lead-form">
              <ServiceLeadForm />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary-600 shadow-2xl z-40">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={scrollToForm}
            className="w-full bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-bold text-lg shadow-lg"
          >
            Get Free Inspection
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
