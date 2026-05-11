import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import reviewStats from '../data/review-stats.json';

const DEFAULT_REVIEW_COUNT = reviewStats.reviewCount;
const DEFAULT_AVERAGE_RATING = reviewStats.averageRating;

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

export const useReviewData = () => {
  const [reviewData, setReviewData] = useState<ReviewData | null>({
    totalReviews: DEFAULT_REVIEW_COUNT,
    averageRating: DEFAULT_AVERAGE_RATING,
    ratingBreakdown: { 5: DEFAULT_REVIEW_COUNT, 4: 0, 3: 0, 2: 0, 1: 0 },
    lastUpdated: '',
    businessName: 'DTE Roofing',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const { data: dbData, error: dbError } = await supabase
          .from('review_data')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (dbData && !dbError) {
          setReviewData({
            totalReviews: dbData.total_reviews,
            averageRating: dbData.average_rating,
            ratingBreakdown: {
              5: dbData.five_star_count,
              4: dbData.four_star_count,
              3: dbData.three_star_count,
              2: dbData.two_star_count,
              1: dbData.one_star_count
            },
            lastUpdated: dbData.updated_at,
            businessName: 'DTE Roofing'
          });
          setLoading(false);
          return;
        }

        const res = await fetch('https://docs.google.com/spreadsheets/d/1ZZ3-sLfyRXhls8tPGe6hxK_W5vEfkO0XnHCxbwBNtCY/gviz/tq?tqx=out:json&range=A2:D2');
        const text = await res.text();
        const parsed = JSON.parse(text.slice(47, -2));
        const row = parsed.table.rows[0].c;

        const totalReviews = row[1]?.v || DEFAULT_REVIEW_COUNT;
        const averageRating = row[2]?.v || DEFAULT_AVERAGE_RATING;

        setReviewData({
          totalReviews: totalReviews,
          averageRating: averageRating,
          ratingBreakdown: { 5: totalReviews, 4: 0, 3: 0, 2: 0, 1: 0 },
          lastUpdated: new Date().toISOString(),
          businessName: 'DTE Roofing'
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to load reviews:', err);
        setError(true);
        setLoading(false);
        setReviewData({
          totalReviews: DEFAULT_REVIEW_COUNT,
          averageRating: DEFAULT_AVERAGE_RATING,
          ratingBreakdown: { 5: DEFAULT_REVIEW_COUNT, 4: 0, 3: 0, 2: 0, 1: 0 },
          lastUpdated: '',
          businessName: 'DTE Roofing'
        });
      }
    };

    fetchReviewData();
  }, []);

  return { reviewData, loading, error };
};
