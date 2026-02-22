import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import MobileStickyCall from '../components/MobileStickyCall';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  projectDescription: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  projectDescription?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectDescription: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');

    // Format as (XXX)-XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters and check for exactly 10 digits
    const phoneNumber = phone.replace(/\D/g, '');
    return phoneNumber.length === 10;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Property address is required';
    }

    if (formData.projectDescription.trim() && formData.projectDescription.trim().length < 10) {
      newErrors.projectDescription = 'Project description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://n8n.whitflow.com/webhook/dte-form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'contact-page',
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        projectDescription: ''
      });
      setErrors({});

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Apply phone formatting if it's the phone field
    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

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

                  {submitStatus === 'success' && (
                    <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-green-900 mb-1">Thank you for contacting us!</h3>
                        <p className="text-green-800">We'll review your request and get back to you within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-lg p-4 flex items-start">
                      <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-red-900 mb-1">Something went wrong</h3>
                        <p className="text-red-800">Please try again or call us directly at 614-971-6028.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-charcoal-900 font-semibold mb-2">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:border-primary-700 focus:ring-2 focus:ring-primary-700 focus:outline-none text-charcoal-900 transition-colors`}
                        placeholder="John Smith"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-charcoal-900 font-semibold mb-2">
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 rounded-lg border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'
                            } focus:border-primary-700 focus:ring-2 focus:ring-primary-700 focus:outline-none text-charcoal-900 transition-colors`}
                          placeholder="john@email.com"
                          aria-invalid={errors.email ? 'true' : 'false'}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-charcoal-900 font-semibold mb-2">
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          maxLength={14}
                          className={`w-full px-4 py-3 rounded-lg border-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                            } focus:border-primary-700 focus:ring-2 focus:ring-primary-700 focus:outline-none text-charcoal-900 transition-colors`}
                          placeholder="(614)-971-6028"
                          aria-invalid={errors.phone ? 'true' : 'false'}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Address Field */}
                    <div>
                      <label htmlFor="address" className="block text-charcoal-900 font-semibold mb-2">
                        Property Address <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={2}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${errors.address ? 'border-red-500' : 'border-gray-300'
                          } focus:border-primary-700 focus:ring-2 focus:ring-primary-700 focus:outline-none text-charcoal-900 transition-colors resize-none`}
                        placeholder="123 Main St, Columbus, OH 43026"
                        aria-invalid={errors.address ? 'true' : 'false'}
                        aria-describedby={errors.address ? 'address-error' : undefined}
                      />
                      {errors.address && (
                        <p id="address-error" className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Project Description Field */}
                    <div>
                      <label htmlFor="projectDescription" className="block text-charcoal-900 font-semibold mb-2">
                        Project Description
                      </label>
                      <textarea
                        id="projectDescription"
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${errors.projectDescription ? 'border-red-500' : 'border-gray-300'
                          } focus:border-primary-700 focus:ring-2 focus:ring-primary-700 focus:outline-none text-charcoal-900 transition-colors resize-none`}
                        placeholder="Tell us about your roofing needs... (optional)"
                        aria-invalid={errors.projectDescription ? 'true' : 'false'}
                        aria-describedby={errors.projectDescription ? 'project-error' : undefined}
                      />
                      <div className="flex justify-between items-start mt-2">
                        <div className="flex-1">
                          {errors.projectDescription && (
                            <p id="project-error" className="text-sm text-red-600 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.projectDescription}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-charcoal-500 ml-2">
                          {formData.projectDescription.length} characters
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-700 text-white px-6 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Free Estimate'}
                    </button>

                    <p className="text-sm text-charcoal-500 text-center">
                      <span className="text-red-600">*</span> Required fields
                    </p>
                  </form>
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
