import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Services() {
  const services = [
    {
      title: 'Roof Repair',
      description: 'Fast, reliable repairs that restore your roof\'s integrity. From minor leaks to extensive damage, we address issues quickly and effectively.',
      features: ['Emergency Leak Repair', 'Shingle Replacement', 'Flashing Repair', 'Storm Damage', 'Structural Repairs', 'Same-Day Service'],
      link: '/services/roof-repair'
    },
    {
      title: 'Roof Replacement',
      description: 'Complete roof replacement with premium materials and expert installation. Transform your home with a new roof built to last decades.',
      features: ['Complete Tear-Off', 'Premium Materials', 'Architectural Shingles', 'Metal & Tile Options', 'Ventilation Systems', 'Extended Warranties'],
      link: '/services/roof-replacement'
    },
    {
      title: 'Storm Damage Restoration',
      description: '24/7 emergency response for storm damage. We secure your property immediately and handle the entire restoration process.',
      features: ['24/7 Emergency Service', 'Tarping & Temporary Repairs', 'Hail Damage', 'Wind Damage', 'Insurance Claims', 'Complete Restoration'],
      link: '/services/storm-damage'
    },
    {
      title: 'Preventative Maintenance',
      description: 'Protect your investment with regular maintenance programs. Extend your roof\'s lifespan and prevent costly emergency repairs.',
      features: ['Annual Inspections', 'Debris Removal', 'Gutter Cleaning', 'Minor Repairs', 'Detailed Reports', 'Priority Scheduling'],
      link: '/services/preventative-maintenance'
    },
    {
      title: 'Siding Installation & Repair',
      description: 'Transform your home\'s exterior with professional siding services. Enhance beauty, durability, and energy efficiency.',
      features: ['Vinyl & LP Smart Siding', 'Complete Installation', 'Siding Repair', 'Storm Damage', 'Custom Trim', 'Color Selection'],
      link: '/services/siding'
    },
    {
      title: 'Gutters',
      description: 'Protect your foundation with properly functioning gutters. Custom seamless gutters, repairs, and gutter guard systems.',
      features: ['Seamless Gutters', 'Gutter Guards', 'Installation & Repair', 'Custom Colors', 'Downspout Extensions', 'Professional Cleaning'],
      link: '/services/gutters'
    },
    {
      title: 'Commercial Roofing',
      description: 'Specialized commercial roofing solutions for businesses. Expert service that minimizes disruption and maximizes value.',
      features: ['TPO & EPDM Systems', 'Flat Roof Repair', 'Metal Roofing', 'Maintenance Programs', 'Emergency Service', 'New Construction'],
      link: '/services/commercial-roofing'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
        description="Complete roofing services in Columbus, OH. Roof repair, replacement, installation, inspections, emergency services. Residential & commercial. Licensed professionals. Free estimates available."
        keywords="roofing services Columbus, roof repair services, roof replacement, roof installation, commercial roofing, residential roofing, emergency roof repair, roof inspection"
        canonical="https://www.dteroofingllc.com/services"
      />
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Every Roofing Service Your Home Needs, Under One Roof</h1>
            <p className="text-xl text-gray-200">
              Comprehensive roofing solutions for residential and commercial properties
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-12 text-center">
            Residential Roofing, Commercial Roofing, Gutters & Siding Solutions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-primary-700 transition-all hover:shadow-lg">
                <h2 className="text-3xl font-bold text-charcoal-900 mb-4">{service.title}</h2>
                <p className="text-charcoal-600 mb-6 leading-relaxed text-lg">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-charcoal-700">
                      <CheckCircle className="w-5 h-5 text-primary-700 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold"
                >
                  Learn More <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-charcoal-600 mb-12 leading-relaxed">
              At DTE Roofing, we combine decades of experience with the latest techniques and materials
              to deliver exceptional results. Every project is backed by our satisfaction guarantee.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Quality Materials</h3>
                <p className="text-charcoal-600">We use only premium materials from trusted manufacturers for lasting results.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Expert Team</h3>
                <p className="text-charcoal-600">Our certified professionals bring years of experience to every project.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Warranty Backed</h3>
                <p className="text-charcoal-600">All our work is protected by comprehensive warranties for your peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free estimate on your roofing project
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg"
          >
            Get Free Estimate <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
