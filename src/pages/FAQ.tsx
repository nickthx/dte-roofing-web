import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Phone, Mail, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSections = [
    {
      title: 'General Questions',
      icon: '💭',
      faqs: [
        {
          question: 'How long does a typical roof last?',
          answer: 'The lifespan of your roof depends on the material used. Asphalt shingles typically last 20-30 years, architectural shingles 25-35 years, metal roofing 40-70 years, and tile or slate roofing can last 50-100 years. Proper maintenance and Ohio\'s weather conditions also play significant roles in determining your roof\'s actual lifespan.'
        },
        {
          question: 'How often should I have my roof inspected?',
          answer: 'We recommend professional roof inspections at least once per year, ideally in the spring or fall. Additionally, you should schedule an inspection after any severe weather event such as hailstorms, high winds, or heavy snowfall. Regular inspections help identify minor issues before they become costly repairs.'
        },
        {
          question: 'What are the signs that I need a new roof?',
          answer: 'Common warning signs include missing or curling shingles, granule loss in gutters, water stains on ceilings or walls, sagging roof deck, visible light through the roof boards, and a roof age exceeding 20-25 years. If you notice multiple signs, it\'s time to schedule a professional inspection to assess whether repair or replacement is needed.'
        },
        {
          question: 'Are you licensed and insured?',
          answer: 'Yes, DTE Roofing LLC is fully licensed, bonded, and insured in Ohio. We carry comprehensive general liability insurance and workers\' compensation coverage to protect both our team and your property. We\'re happy to provide proof of insurance and our license information upon request.'
        }
      ]
    },
    {
      title: 'Services',
      icon: '🛠️',
      faqs: [
        {
          question: 'What roofing services do you offer?',
          answer: 'We offer comprehensive roofing services including roof repairs, complete roof replacements, storm damage restoration, preventative maintenance programs, emergency repairs, roof inspections, gutter installation and repair, siding installation, and commercial roofing services. Our team handles both residential and commercial projects of all sizes.'
        },
        {
          question: 'Do you offer emergency roofing services?',
          answer: 'Yes, we provide 24/7 emergency roofing services for urgent situations such as storm damage, fallen trees, severe leaks, or structural damage. Our emergency response team can quickly assess the damage, provide temporary repairs or tarping to prevent further damage, and develop a plan for permanent restoration.'
        },
        {
          question: 'Do you handle both residential and commercial projects?',
          answer: 'Absolutely. Our experienced team handles both residential and commercial roofing projects throughout Columbus and surrounding areas. We have expertise with various commercial roofing systems including TPO, EPDM, modified bitumen, built-up roofing, and metal roofing for flat and low-slope commercial buildings.'
        }
      ]
    },
    {
      title: 'Process & Timeline',
      icon: '⏱️',
      faqs: [
        {
          question: 'How long does a roof replacement take?',
          answer: 'Most residential roof replacements take 1-3 days depending on the size and complexity of your roof, weather conditions, and the type of material being installed. Larger homes or complex roof designs may take longer. Commercial projects vary based on building size and can take several days to weeks. We provide a detailed timeline during your consultation.'
        },
        {
          question: 'What happens during a free estimate?',
          answer: 'During your free estimate, one of our experienced roofing professionals will thoroughly inspect your roof, take measurements and detailed photos, discuss your needs and preferences, answer all your questions, and provide material options. You\'ll receive a comprehensive written estimate with transparent pricing and no obligation. We never pressure customers into making immediate decisions.'
        },
        {
          question: 'What should I expect during installation?',
          answer: 'During installation, our crew will arrive early, protect your property and landscaping, set up safety equipment, and begin work efficiently. You can expect noise and vibration throughout the day. We maintain a clean and organized job site, communicate regularly about progress, and perform thorough cleanup each day including using magnetic tools to collect nails.'
        },
        {
          question: 'How do you handle weather delays?',
          answer: 'Safety and quality are our priorities. If weather conditions aren\'t suitable for roofing work, we\'ll reschedule to ensure proper installation. We monitor forecasts closely and communicate any necessary schedule changes immediately. Your roof will be properly protected if we must stop work due to weather. We work diligently to minimize delays while never compromising quality or safety.'
        }
      ]
    },
    {
      title: 'Financing & Insurance',
      icon: '💰',
      faqs: [
        {
          question: 'How much does a new roof cost?',
          answer: 'Roof replacement costs vary widely based on roof size, pitch, complexity, material choice, and extent of any underlying repairs needed. On average, residential roof replacements in Columbus range from $8,000 to $25,000 or more. We provide free, detailed estimates with transparent pricing and no hidden fees so you know exactly what to expect.'
        },
        {
          question: 'Do you offer financing options?',
          answer: 'Yes, we offer flexible financing options to make your roofing project more affordable. We work with reputable lenders to provide various payment plans that fit different budgets. During your consultation, we can discuss financing options and help you find a solution that works for your situation.'
        },
        {
          question: 'Do you work with insurance companies?',
          answer: 'Yes, we have extensive experience working with insurance companies on storm damage claims. We can help document damage, provide detailed estimates for adjusters, attend insurance inspections, and communicate directly with your insurance company to streamline the claims process. We\'re here to advocate for you and ensure you receive fair compensation for covered damages.'
        },
        {
          question: 'What warranties do you provide?',
          answer: 'We provide comprehensive workmanship warranties on all our installations and repairs, typically ranging from 5-10 years depending on the project. Additionally, the roofing materials we use come with manufacturer warranties that vary by product, often ranging from 25 years to lifetime coverage. We explain all warranty details and register your roof with manufacturers to ensure full protection.'
        }
      ]
    }
  ];

  const toggleFAQ = (sectionIndex: number, faqIndex: number) => {
    const index = sectionIndex * 100 + faqIndex;
    setOpenIndex(openIndex === index ? null : index);
  };

  const allFAQs = faqSections.flatMap(section => section.faqs);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
        description="Get answers to common roofing questions. Learn about costs, timelines, warranties, insurance claims, and more. Expert guidance from Columbus's trusted roofing contractor."
        keywords="roofing FAQ, roof repair questions, roof cost, roofing warranty, insurance claims, how long does roof last, Columbus roofer FAQ"
        canonical="https://www.dteroofingllc.com/faq"
      />
      <SchemaMarkup
        type="faq"
        faqs={allFAQs}
        pageTitle="Frequently Asked Questions"
        pageDescription="Get answers to common roofing questions. Learn about costs, timelines, warranties, insurance claims, and more."
        pageUrl="https://www.dteroofingllc.com/faq"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-200">
              Find answers to common questions about roofing services, processes, and what to expect when working with DTE Roofing LLC
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-16">
                {/* Section Header */}
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white w-14 h-14 rounded-xl flex items-center justify-center text-2xl mr-4 shadow-lg">
                    {section.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-charcoal-900">General Questions</h2>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {section.faqs.map((faq, faqIndex) => {
                    const index = sectionIndex * 100 + faqIndex;
                    const isOpen = openIndex === index;

                    return (
                      <div
                        key={faqIndex}
                        className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-primary-300 transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleFAQ(sectionIndex, faqIndex)}
                          className="w-full px-6 py-5 text-left flex items-center justify-between group"
                          aria-expanded={isOpen}
                        >
                          <h3 className="font-bold text-charcoal-900 text-lg pr-4 group-hover:text-primary-700 transition-colors">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            className={`w-6 h-6 text-primary-700 flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? 'max-h-96' : 'max-h-0'
                          }`}
                        >
                          <div className="px-6 pb-5">
                            <p className="text-charcoal-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-primary-100">
              <MessageCircle className="w-16 h-16 text-primary-700 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-charcoal-900 mb-4">
                Have Additional Questions?
              </h2>
              <p className="text-xl text-charcoal-600 mb-8">
                Contact our team for personalized assistance. We're here to help with all your roofing needs and answer any questions you may have.
              </p>

              {/* Contact Information */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <a
                  href="tel:6149716028"
                  className="flex items-center justify-center gap-3 text-charcoal-700 hover:text-primary-700 transition-colors"
                >
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Phone className="w-5 h-5 text-primary-700" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-charcoal-500 font-medium">Call/Text</div>
                    <div className="font-bold text-lg">614-971-6028</div>
                  </div>
                </a>

                <a
                  href="mailto:experience@dteroofingllc.com"
                  className="flex items-center justify-center gap-3 text-charcoal-700 hover:text-primary-700 transition-colors"
                >
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-primary-700" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-charcoal-500 font-medium">Email Us</div>
                    <div className="font-bold text-lg">experience@dteroofingllc.com</div>
                  </div>
                </a>
              </div>

              {/* CTA Button */}
              <Link
                to="/contact"
                className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                Get Your Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Can't Find What You're Looking For?</h3>
              <p className="text-primary-100 mb-6">
                Our knowledgeable team is ready to provide the answers and guidance you need
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-primary-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all font-semibold inline-flex items-center justify-center"
                >
                  Contact Us
                </Link>
                <Link
                  to="/services"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-500 transition-all font-semibold inline-flex items-center justify-center border-2 border-white"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
