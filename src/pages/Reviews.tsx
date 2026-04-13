import { Link } from 'react-router-dom';
import { Star, ChevronRight, MessageCircle, ExternalLink } from 'lucide-react';
import { useReviewData } from '../hooks/useReviewData';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

export default function Reviews() {
  const { reviewData } = useReviewData();
  const reviews = [
    {
      name: 'Sarah M.',
      rating: 5,
      date: 'November 2025',
      text: 'Andrew was fantastic! He went above and beyond inspecting the cause of my leak on my roof. We weren\'t able to replace the roof at this time but he was more than willing to fix all areas of concern. Would high recommend them to do any roof work!',
      verified: true
    },
    {
      name: 'Ryan R.',
      rating: 5,
      date: 'November 2025',
      text: 'Wonderful experience with DTE and Mitch! The whole process was seamless start to finish. It\'s hard to make a decision when choosing a Roofing company and I am extremely happy I chose DTE. Would recommend to anyone who needs an honest opinion on anything on the exterior of your home.',
      verified: true
    },
    {
      name: 'Ron M.',
      rating: 5,
      date: 'November 2025',
      text: 'I had Mitch and Chandler from DTE roofing company come and do a free roof inspection. I had a new roof installed 2 years ago, they let me know what problems they have found. I am so glad I was able to get them repaired before it became a bigger problem. Thanks for your help.',
      verified: true
    },
    {
      name: 'Sean K.',
      rating: 5,
      date: 'November 2025',
      text: 'Great experience working with DTE - very responsive and helpful in explaining the necessary repairs, and were flexible and communicative on the timing of what ended up being a tricky project.',
      verified: true
    },
    {
      name: 'Tim H.',
      rating: 5,
      date: 'September 2025',
      text: 'I had an excellent experience with DTE Roofing. Very good communication, helped with Insurance claim and overall very knowledgeable and professional. I would recommend for my next roofing and gutter project. Andrew is honest and hardworking, would definitely use them again.',
      verified: true
    },
    {
      name: 'Kortnie Y.',
      rating: 5,
      date: 'September 2025',
      text: 'I had the pleasure of working with DTE and I cannot recommend them enough. They are a company that provides top notch customer service, quality work, and educates along the way. We will use their services again while selecting our next home.',
      verified: true
    }
  ];

  const averageRating = reviewData?.averageRating || 5.0;
  const totalReviews = reviewData?.totalReviews || 92;
  const fiveStarCount = reviewData?.ratingBreakdown[5] || 92;
  const fiveStarPercentage = 100;

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <SEO
        title="DTE Roofing Reviews | Central Ohio Homeowners Speak Out"
        description="Read verified reviews from DTE Roofing customers across Columbus and Central Ohio. Real feedback on roof repairs, replacements, and installations from local homeowners."
        keywords="DTE Roofing reviews, Columbus roofing reviews, customer testimonials, five-star roofer"
        canonical="https://www.dteroofingllc.com/reviews"
      />
      <SchemaMarkup
        type="general"
        reviews={reviews}
        pageTitle="DTE Roofing Reviews | Central Ohio Homeowners Speak Out"
        pageDescription="Read verified reviews from DTE Roofing customers across Columbus and Central Ohio."
        pageUrl="https://www.dteroofingllc.com/reviews"
      />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Don't Take Our Word for It — Hear From Our Customers</h1>
            <p className="text-xl text-gray-200">
              Real reviews from real customers who trusted DTE Roofing with their homes
            </p>
          </div>
        </div>
      </section>

      {/* Rating Summary Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Overall Rating */}
                <div className="text-center md:text-left">
                  <div className="text-6xl font-bold text-charcoal-900 mb-2">{averageRating.toFixed(1)}</div>
                  <div className="flex justify-center md:justify-start mb-3">
                    {renderStars(5)}
                  </div>
                  <p className="text-charcoal-600 text-lg">Based on {totalReviews} reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-charcoal-700 w-12">5 stars</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                    <span className="text-sm text-charcoal-600 w-12 text-right">{fiveStarCount}</span>
                  </div>
                  {[4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-sm text-charcoal-700 w-12">{stars} stars</span>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full"></div>
                      <span className="text-sm text-charcoal-600 w-12 text-right">0</span>
                    </div>
                  ))}
                </div>

                {/* Trust Badge */}
                <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-400">
                  <div className="text-5xl font-bold text-yellow-600 mb-2">100%</div>
                  <p className="text-charcoal-900 font-bold mb-2 text-lg">Perfect Rating!</p>
                  <div className="flex justify-center mb-2">
                    {renderStars(5)}
                  </div>
                  <p className="text-sm text-charcoal-700 font-semibold">All {totalReviews} Google reviews are 5 stars</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-12 text-center">
              Roof Repair, Replacement, Storm Damage & Gutter Service Reviews
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-900 mb-1">{review.name}</h3>
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-charcoal-500">{review.date}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-charcoal-700 leading-relaxed mb-4">
                    "{review.text}"
                  </p>

                  {/* Verified Badge */}
                  {review.verified && (
                    <div className="flex items-center text-primary-700 text-sm font-semibold">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified Customer
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-charcoal-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white px-6 py-2 rounded-full mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-lg">100% Five-Star Rating</span>
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              See All {totalReviews} Five-Star Reviews on Google
            </h2>
            <p className="text-xl mb-8 text-charcoal-800">
              Every single one of our {totalReviews} Google reviews is a perfect 5 stars. See what our customers are saying!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.google.com/maps/place/DTE+Roofing/@39.9637636,-83.1476323,17z/data=!3m1!4b1!4m6!3m5!1s0x883897c3548f20bf:0xdd1da18d4d7ccf43!8m2!3d39.9637636!4d-83.1476323!16s%2Fg%2F11vrcm8sdz"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-charcoal-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-bold text-lg inline-flex items-center justify-center shadow-xl"
              >
                Read All {totalReviews} Google Reviews
                <ExternalLink className="ml-2 w-5 h-5" />
              </a>

              <a
                href="https://g.page/r/CUPMfU2NGh3dEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-charcoal-900 border-2 border-charcoal-900 text-white px-8 py-4 rounded-lg hover:bg-charcoal-800 transition-all font-bold text-lg inline-flex items-center justify-center shadow-xl"
              >
                Leave Us a Review
                <MessageCircle className="ml-2 w-5 h-5" />
              </a>
            </div>

            <p className="mt-8 text-charcoal-800 font-semibold">
              Your feedback helps us maintain our perfect rating and helps others choose with confidence
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-charcoal-900 mb-6">
            Ready to Experience Our Perfect 5-Star Service?
          </h2>
          <p className="text-xl text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Join {totalReviews} customers who rated us 5 stars on Google. Experience the quality workmanship and exceptional service that earns perfect reviews.
          </p>
          <Link
            to="/contact"
            className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center shadow-lg"
          >
            Get Your Free Estimate <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
