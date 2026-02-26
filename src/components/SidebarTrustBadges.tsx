import { Star, Shield, Award, Phone, Mail, MapPin } from 'lucide-react';
import { useReviewData } from '../hooks/useReviewData';

export default function SidebarTrustBadges() {
  const { reviewData } = useReviewData();

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
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

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-charcoal-600 mb-3 font-semibold">Or contact us directly:</p>
        <div className="space-y-2">
          <a href="tel:6149716028" className="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-semibold transition-colors text-sm">
            <Phone className="w-4 h-4" />
            614-971-6028
          </a>
          <a href="mailto:experience@dteroofingllc.com" className="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-semibold transition-colors text-sm">
            <Mail className="w-4 h-4" />
            experience@dteroofingllc.com
          </a>
          <div className="flex items-start gap-2 text-charcoal-600 text-xs">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>615 Hilliard Rome Rd<br />Columbus, OH 43228</span>
          </div>
        </div>
      </div>
    </div>
  );
}
