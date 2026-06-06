import reviewStats from '../data/review-stats.json';

interface ReviewData {
  totalReviews: number;
  averageRating: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  lastUpdated: string;
  businessName: string;
}

// Review counts come from src/data/review-stats.json, committed weekly by an
// n8n workflow — the former Supabase/Google-Sheets runtime fetches are gone.
// The hook shape ({ reviewData, loading, error }) is preserved so the 20+
// consumers need no changes; data is static so loading is always false.
const STATIC_REVIEW_DATA: ReviewData = {
  totalReviews: reviewStats.reviewCount,
  averageRating: reviewStats.averageRating,
  ratingBreakdown: { 5: reviewStats.reviewCount, 4: 0, 3: 0, 2: 0, 1: 0 },
  lastUpdated: '',
  businessName: 'DTE Roofing',
};

export const useReviewData = () => {
  return { reviewData: STATIC_REVIEW_DATA, loading: false, error: false };
};
