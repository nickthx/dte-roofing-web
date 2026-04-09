import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, ClipboardCheck, Camera, FileText } from 'lucide-react';
import SEO from '../../components/SEO';
import { CANONICAL_DOMAIN } from '../../seo/constants';

export default function RoofInspection() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Free Roof Inspection in Central Ohio | DTE Roofing"
        description="Free, thorough roof inspections across Central Ohio. Pre-purchase, post-storm, and insurance claim reports with photos and honest assessments. Call DTE Roofing at 614-971-6028."
        keywords="roof inspection Columbus, roof inspection service, home inspection, pre-purchase inspection, insurance roof inspection, annual roof inspection"
        canonical={`${CANONICAL_DOMAIN}/services/roof-inspection`}
      />

      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Free Roof Inspection in Central Ohio</h1>
            <p className="text-xl text-gray-200">
              Thorough inspections to identify issues before they become major problems
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6">What's Included in Our Free Roof Inspection</h2>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Serving <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">central Ohio including Columbus</Link>, <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link>, <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Dublin homeowners</Link>, and <Link to="/locations/grove-city" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Grove City</Link>, DTE Roofing provides thorough, honest roof
                inspections that help local homeowners make informed decisions about their biggest investment.
                Regular inspections catch minor problems before they become costly emergencies, extend your roof's
                lifespan, and provide critical documentation for insurance claims, home sales, or warranty
                compliance.
              </p>
              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                Our experienced inspectors examine every aspect of your roofing system—from shingles to structure—
                and provide detailed reports with photos, honest assessments, and clear recommendations. No
                pressure, no surprises—just the facts you need to protect your home.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <ClipboardCheck className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm">Thorough Assessment</h3>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Camera className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm">Photo Documentation</h3>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-10 h-10 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-bold text-charcoal-900 text-sm">Detailed Reports</h3>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Types of Inspections</h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Annual Maintenance Inspection',
                    description: 'Regular checkups to catch issues early and maintain warranty coverage'
                  },
                  {
                    title: 'Pre-Purchase Inspection',
                    description: 'Detailed assessment for home buyers to understand roof condition and value'
                  },
                  {
                    title: 'Post-Storm Inspection',
                    description: 'Document storm damage for insurance claims and emergency repairs'
                  },
                  {
                    title: 'Insurance Inspection',
                    description: 'Meet insurance requirements and document current condition'
                  },
                  {
                    title: 'Pre-Sale Inspection',
                    description: 'Identify issues before listing to avoid surprises during negotiations'
                  },
                  {
                    title: 'Warranty Inspection',
                    description: 'Maintain manufacturer and installer warranty requirements'
                  }
                ].map((type, index) => (
                  <div key={index}>
                    <h4 className="font-bold text-charcoal-900 mb-2">{type.title}</h4>
                    <p className="text-charcoal-600">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">What We Inspect</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: 'Roofing Materials',
                  items: ['Shingle condition', 'Missing or damaged pieces', 'Granule loss', 'Curling or buckling', 'Age assessment', 'Manufacturer defects']
                },
                {
                  category: 'Structural Components',
                  items: ['Roof deck condition', 'Sagging or deformation', 'Water damage', 'Ventilation adequacy', 'Attic insulation', 'Structural integrity']
                },
                {
                  category: 'Flashing & Seals',
                  items: ['Chimney flashing', 'Valley flashing', 'Pipe boots', 'Vent flashing', 'Drip edge', 'Sealant condition']
                },
                {
                  category: 'Drainage System',
                  items: ['Gutter condition', 'Downspout function', 'Debris buildup', 'Water flow', 'Ice dam potential', 'Drainage effectiveness']
                },
                {
                  category: 'Interior Indicators',
                  items: ['Water stains', 'Mold or mildew', 'Attic moisture', 'Daylight through boards', 'Insulation issues', 'Ventilation problems']
                },
                {
                  category: 'Additional Elements',
                  items: ['Skylights', 'Vents and fans', 'Solar panels', 'Satellite dishes', 'Tree overhang', 'Moss or algae growth']
                }
              ].map((section, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-charcoal-900 mb-4">{section.category}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary-700 flex-shrink-0 mt-1" />
                        <span className="text-charcoal-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-primary-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Our Inspection Process</h2>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Exterior Examination',
                    description: 'Visual inspection from the ground and roof surface'
                  },
                  {
                    step: '2',
                    title: 'Roof Surface Assessment',
                    description: 'Detailed examination of all roofing materials and components'
                  },
                  {
                    step: '3',
                    title: 'Interior Inspection',
                    description: 'Attic and ceiling examination for signs of damage'
                  },
                  {
                    step: '4',
                    title: 'Photo Documentation',
                    description: 'Comprehensive photos of all findings and concerns'
                  },
                  {
                    step: '5',
                    title: 'Detailed Report',
                    description: 'Written report with findings, recommendations, and estimates'
                  },
                  {
                    step: '6',
                    title: 'Review & Consultation',
                    description: 'Discuss findings and answer all your questions'
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal-900 mb-1">{item.title}</h3>
                      <p className="text-charcoal-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Benefits of Regular Inspections</h2>
              <ul className="space-y-4">
                {[
                  'Catch problems early when repairs are less expensive',
                  'Extend your roof\'s lifespan through proactive maintenance',
                  'Maintain manufacturer and installer warranty coverage',
                  'Document condition for insurance purposes',
                  'Peace of mind knowing your roof is in good condition',
                  'Prevent emergency repairs and water damage',
                  'Identify energy efficiency improvements',
                  'Plan for future replacement needs',
                  'Increase property value with documentation',
                  'Avoid surprises during real estate transactions',
                  'Meet insurance company requirements',
                  'Protect your investment'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-700 flex-shrink-0 mt-1" />
                    <span className="text-charcoal-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="font-bold text-charcoal-900 mb-2">Annual Inspections Recommended</h3>
            <p className="text-charcoal-700">
              We recommend having your roof professionally inspected at least once per year, and after any
              major storm. Regular inspections can save you thousands in emergency repairs and extend your
              roof's lifespan by decades.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            Need expert help? Get your free, no-obligation estimate today.
          </h2>
          <Link
            to="/contact"
            className="bg-white text-primary-700 px-10 py-5 rounded-lg hover:bg-gray-100 transition-all font-bold text-xl inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Request Estimate <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
