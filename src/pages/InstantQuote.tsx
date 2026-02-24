import SEO from '../components/SEO';
import { Calculator, CheckCircle, Clock, Shield } from 'lucide-react';
import { useReviewData } from '../hooks/useReviewData';
import { useEffect } from 'react';

export default function InstantQuote() {
  const { reviewData } = useReviewData();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.roofle.com/roof-quote-pro-embedded-widget.js?id=zEGtbFpfjh6Snz6t4Tz23';
    script.async = true;
    document.getElementById('roofle-embed-container')?.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <>
      <SEO
        title="BEST Roofer in Columbus – if you're looking for Honest Roofing Services near me or Expert Roof Repair & Replacement near me – DTE Roofing is the place to be."
        description="Get an accurate roof replacement quote in 30 seconds. Satellite imagery estimates with no inspection needed to get started."
        keywords="instant roof quote, roof cost calculator, roof estimate, roof replacement cost, free roof quote"
        canonical="https://www.dteroofingllc.com/get-a-quote-consultation"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                <Calculator className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get Your Instant Roof Quote
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Get an accurate estimate in 30 seconds using satellite imagery. See your price range before we even visit.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Clock className="w-8 h-8 mb-2 mx-auto" />
                  <div className="font-semibold">30 Seconds</div>
                  <div className="text-sm text-white/80">Instant results</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Shield className="w-8 h-8 mb-2 mx-auto" />
                  <div className="font-semibold">No Obligation</div>
                  <div className="text-sm text-white/80">Free to use</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-8 h-8 mb-2 mx-auto" />
                  <div className="font-semibold">Accurate</div>
                  <div className="text-sm text-white/80">Satellite-powered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div id="roofle-embed-container" className="bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[700px]">
              </div>

              <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">How It Works</h3>
                <ol className="space-y-2 text-charcoal-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-700 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <span>Enter your property address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-700 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <span>We use satellite imagery to analyze your roof</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-700 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <span>Get instant pricing for different roofing options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-700 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <span>Schedule a free in-person inspection to confirm details</span>
                  </li>
                </ol>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-charcoal-600 mb-4">
                  Trusted by homeowners across Columbus, Hilliard, and Dublin
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-charcoal-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>{reviewData?.totalReviews || 92}+ Five-Star Reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Locally Owned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
