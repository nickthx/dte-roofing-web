import { useState } from 'react';
import { CheckCircle, DollarSign, Shield, Clock, TrendingDown, Users, Loader2, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useLeadTracking } from '../hooks/useLeadTracking';
import { validateEmail, validatePhone, validateRequired } from '../utils/formValidation';

const WEBHOOK_URL = 'https://n8n.whitflow.com/webhook/dte-financing-submissions';

const financingProducts = [
  { value: 'Promotional Financing', label: 'Promotional Financing', tagline: '0% for 12–24 months' },
  { value: 'Personal Loans', label: 'Personal Loans', tagline: 'Fixed rate, fixed term' },
  { value: 'Secured Loans', label: 'Secured Loans', tagline: 'Lower rates, home equity' },
  { value: 'Second Look Options', label: 'Second Look Options', tagline: 'For credit-challenged customers' },
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  financingProduct?: string;
}

export default function Financing() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    financingProduct: '',
    projectDescription: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const tracking = useLeadTracking();

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    const nameErr = validateRequired(formData.name);
    if (nameErr) errs.name = 'Name is required';
    const emailErr = validateEmail(formData.email);
    if (emailErr) errs.email = emailErr;
    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) errs.phone = phoneErr;
    if (!formData.financingProduct) errs.financingProduct = 'Please select a financing product';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const payload = {
        ...formData,
        source: 'financing-page',
        currentPage: window.location.pathname,
        pageTitle: document.title,
        ...tracking,
        formCompletedAt: new Date().toISOString(),
        timestamp: new Date().toISOString(),
        formVersion: '1.0',
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Submission failed');
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      clearTimeout(timeout);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleProductSelect = (value: string) => {
    setFormData(prev => ({ ...prev, financingProduct: value }));
    if (errors.financingProduct) {
      setErrors(prev => ({ ...prev, financingProduct: undefined }));
    }
  };

  const products = [
    {
      icon: <TrendingDown className="w-8 h-8 text-green-600" />,
      title: 'Promotional Financing',
      tagline: '0% for 12–24 months',
      description:
        'Take advantage of our promotional financing options with 0% interest for 12 to 24 months. Get your roof done now and pay over time — no interest if paid in full within the promotional period.',
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: 'Personal Loans',
      tagline: 'Fixed rate, fixed term',
      description:
        'Straightforward personal loan options with a fixed interest rate and fixed monthly payment. Know exactly what you owe every month from day one — no surprises.',
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Secured Loans',
      tagline: 'Lower rates, home equity',
      description:
        'Use your home equity to access lower interest rates through our secured loan options. Often the most affordable long-term solution for larger roofing and exterior projects.',
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Second Look Options',
      tagline: 'For credit-challenged customers',
      description:
        'We believe everyone deserves a safe roof over their head. Our second-look financing options are designed to help families who may not qualify through traditional channels.',
    },
  ];

  return (
    <>
      <SEO
        title="DTE Consumer Credit Center | Financing for Roofing — DTE Roofing"
        description="DTE Roofing's Consumer Credit Center offers affordable financing solutions for roof repair and replacement. 0% promotional options, personal loans, secured loans, and second-look programs. See if you qualify today."
        keywords="roofing financing, roof replacement financing, roofing payment plans, consumer credit center, affordable roofing, roof loan columbus ohio"
        canonical="https://www.dteroofingllc.com/financing"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600/20 rounded-full mb-6">
              <DollarSign className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              A New Roof Shouldn't Break the Bank
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Our financing platform. Your home, your budget.
            </p>
            <a
              href="#qualify"
              className="inline-block bg-green-600 text-white px-10 py-4 rounded-lg hover:bg-green-700 transition-all font-semibold text-lg shadow-xl"
            >
              See If You Qualify
            </a>
          </div>
        </div>
      </section>

      {/* Differentiator Quote */}
      <section className="py-16 bg-green-50 border-y border-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <blockquote className="relative">
              <div className="text-green-600 text-6xl font-serif leading-none mb-4">&ldquo;</div>
              <p className="text-xl md:text-2xl text-charcoal-800 leading-relaxed font-medium">
                One thing that makes us different from every other contractor you will talk to is that we have our own Consumer Credit Center. That means we have the ability to help you find the most affordable way to get this project done, without you having to drain your savings or put this on a high interest credit card. We help families every single week protect their home on a budget that works for them.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-12 h-1 bg-green-600 rounded"></div>
                <span className="text-charcoal-600 font-semibold">DTE Roofing</span>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-4">
              Roof Replacement, Installation & Siding Financing Options
            </h2>
            <p className="text-lg text-charcoal-600">
              Behind the scenes, our Consumer Credit Center is powered by a lending ecosystem of multiple lenders and products. But you never see that complexity — you only see our platform offering you the most affordable solutions for your project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {[
              { icon: <Clock className="w-7 h-7 text-green-600" />, step: '1', title: 'Get a Quote', desc: 'Start with a free estimate on your roofing project.' },
              { icon: <CheckCircle className="w-7 h-7 text-green-600" />, step: '2', title: 'See Your Options', desc: 'We present affordable payment solutions tailored to you.' },
              { icon: <Shield className="w-7 h-7 text-green-600" />, step: '3', title: 'Protect Your Home', desc: 'Get the work done on a budget that works for your family.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal-900 mb-2">{item.title}</h3>
                <p className="text-charcoal-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-4">
              Our Affordable Payment Solutions
            </h2>
            <p className="text-lg text-charcoal-600">
              Our financing platform offers four categories of products so we can find the right fit for nearly every homeowner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {products.map((product) => (
              <div key={product.title} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center">
                    {product.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900 mb-1">{product.title}</h3>
                    <p className="text-green-700 font-semibold text-sm mb-3">{product.tagline}</p>
                    <p className="text-charcoal-600 leading-relaxed">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See If You Qualify Form */}
      <section id="qualify" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-charcoal-900 mb-4">See If You Qualify</h2>
              <p className="text-lg text-charcoal-600">
                Fill out the form below and a member of our team will reach out to walk you through our affordable payment solutions — no commitment required.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-10 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-charcoal-900 mb-2">We Got Your Request!</h3>
                <p className="text-charcoal-600">
                  A member of our team will be in touch shortly to discuss your financing options. We look forward to helping you protect your home on a budget that works for you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 border border-gray-200 space-y-5">
                {/* Financing Product Selection */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal-800 mb-2">
                    Which financing option interests you? *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {financingProducts.map((product) => (
                      <button
                        key={product.value}
                        type="button"
                        onClick={() => handleProductSelect(product.value)}
                        className={`text-left p-4 rounded-lg border-2 transition-all ${
                          formData.financingProduct === product.value
                            ? 'border-green-500 bg-green-50 ring-1 ring-green-500'
                            : 'border-gray-200 bg-white hover:border-green-300'
                        }`}
                      >
                        <p className={`font-semibold text-sm ${
                          formData.financingProduct === product.value ? 'text-green-700' : 'text-charcoal-800'
                        }`}>
                          {product.label}
                        </p>
                        <p className="text-xs text-charcoal-500 mt-0.5">{product.tagline}</p>
                      </button>
                    ))}
                  </div>
                  {errors.financingProduct && (
                    <p className="text-red-600 text-sm mt-1">{errors.financingProduct}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-800 mb-1" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={`w-full border rounded-lg px-4 py-3 text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.name ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-800 mb-1" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="614-555-0100"
                      className={`w-full border rounded-lg px-4 py-3 text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.phone ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-800 mb-1" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className={`w-full border rounded-lg px-4 py-3 text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.email ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-800 mb-1" htmlFor="projectDescription">
                    Tell us about your project
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    rows={4}
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="e.g. Full roof replacement needed, storm damage, about 2,000 sq ft home..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">Something went wrong. Please try again or call us at (614) 971-6028.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-all font-bold text-lg shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'See If You Qualify'
                  )}
                </button>
                <p className="text-xs text-charcoal-500 text-center">
                  No commitment required. We'll reach out to discuss your options.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-charcoal-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { label: 'Licensed & Insured', icon: <Shield className="w-6 h-6 text-green-400 mx-auto mb-1" /> },
              { label: 'No Bank Names. No Bank Logos.', icon: <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-1" /> },
              { label: 'Flexible Terms Available', icon: <Clock className="w-6 h-6 text-green-400 mx-auto mb-1" /> },
              { label: 'Families Helped Every Week', icon: <Users className="w-6 h-6 text-green-400 mx-auto mb-1" /> },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                {item.icon}
                <span className="text-sm font-semibold text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
