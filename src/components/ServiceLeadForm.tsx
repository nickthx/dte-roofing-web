import { useState } from 'react';
import { Phone, Mail, MapPin, Star, Shield, Award } from 'lucide-react';
import { useReviewData } from '../hooks/useReviewData';

export default function ServiceLeadForm() {
  const { reviewData } = useReviewData();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://n8n.whitflow.com/webhook/dte-form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'service-lead-form',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-xl border-2 border-primary-600 shadow-xl">
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-charcoal-900 mb-3">Thank You!</h3>
          <p className="text-charcoal-700 mb-4">
            We've received your request and will contact you within 24 hours to schedule your free inspection.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-charcoal-700 font-semibold mb-2">Next Steps:</p>
            <ol className="text-sm text-charcoal-600 text-left space-y-1">
              <li>1. We'll review your request</li>
              <li>2. Call to schedule your free inspection</li>
              <li>3. Meet you at your property</li>
              <li>4. Provide honest recommendations</li>
            </ol>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-charcoal-600 mb-2">Need immediate assistance?</p>
            <a href="tel:6149716028" className="text-primary-700 hover:text-primary-800 font-bold text-lg">
              Call 614-971-6028
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl border-2 border-gray-200 shadow-xl">
      <h3 className="text-2xl font-bold text-charcoal-900 mb-2">Get Your Free Inspection</h3>
      <p className="text-charcoal-600 mb-6">Fill out the form and we'll contact you within 24 hours</p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-charcoal-900 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-charcoal-900 mb-1">
            Property Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
            placeholder="123 Main St, Columbus, OH"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-charcoal-900 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
            placeholder="(614) 555-0123"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoal-900 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-charcoal-900 mb-1">
            Service Needed *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all bg-white"
          >
            <option value="">Select a service...</option>
            <option value="inspection">Roof Inspection</option>
            <option value="repair">Roof Repair</option>
            <option value="replacement">Roof Replacement</option>
            <option value="emergency">Emergency Services</option>
            <option value="gutters">Gutter Services</option>
            <option value="maintenance">Maintenance Plan</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-charcoal-900 mb-1">
            Additional Details (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all resize-none"
            placeholder="Tell us about your roofing needs..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-700 text-white px-6 py-4 rounded-lg hover:bg-primary-800 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Request Free Inspection
        </button>
      </form>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2 text-charcoal-700">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
            <span className="font-semibold">{reviewData?.totalReviews || 92} Five-Star Reviews</span>
          </div>
          <div className="flex items-center gap-2 text-charcoal-700">
            <Shield className="w-5 h-5 text-primary-600 flex-shrink-0" />
            <span className="font-semibold">Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 text-charcoal-700">
            <Award className="w-5 h-5 text-primary-600 flex-shrink-0" />
            <span className="font-semibold">Locally Owned</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-charcoal-600 mb-3 font-semibold">Or contact us directly:</p>
          <div className="space-y-2">
            <a href="tel:6149716028" className="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-semibold transition-colors">
              <Phone className="w-4 h-4" />
              614-971-6028
            </a>
            <a href="mailto:experience@dteroofingllc.com" className="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-semibold transition-colors">
              <Mail className="w-4 h-4" />
              experience@dteroofingllc.com
            </a>
            <div className="flex items-start gap-2 text-charcoal-600 text-sm">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>615 Hilliard Rome Rd<br />Columbus, OH 43228</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
