'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Review } from '@/lib/trail-data';

const getReviewsKey = (trailId: number) => `reviews-${trailId}`;

// Mock some initial reviews for demonstration
const getInitialReviews = (trailId: number): Review[] => {
  const initial: { [key: number]: Review[] } = {
    1: [
      {
        id: '1-1', trailId: 1, author: 'Alex', rating: 5, comment: 'Absolutely breathtaking views! A tough climb but worth every step.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '1-2', trailId: 1, author: 'Sam', rating: 4, comment: 'Very challenging, make sure you bring enough water. The final scramble is intense.',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
    ],
    3: [
      {
        id: '3-1', trailId: 3, author: 'Maria', rating: 5, comment: 'One of the most beautiful walks I have ever done. Go on a clear day for the best experience!',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
    ],
  };
  return initial[trailId] || [];
};

export default function useReviews(trailId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    try {
      const reviewsKey = getReviewsKey(trailId);
      const storedReviews = localStorage.getItem(reviewsKey);
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      } else {
        // Load initial mock reviews if none in local storage
        setReviews(getInitialReviews(trailId));
      }
    } catch (error) {
      console.error('Failed to read reviews from localStorage', error);
      setReviews(getInitialReviews(trailId));
    }
  }, [trailId]);

  const addReview = useCallback((reviewData: { author: string; rating: number; comment: string }) => {
    const newReview: Review = {
      ...reviewData,
      id: crypto.randomUUID(),
      trailId,
      date: new Date().toISOString(),
    };

    setReviews((prevReviews) => {
      const updatedReviews = [newReview, ...prevReviews];
       try {
        localStorage.setItem(getReviewsKey(trailId), JSON.stringify(updatedReviews));
      } catch (error) {
         console.error('Failed to save reviews to localStorage', error);
      }
      return updatedReviews;
    });
  }, [trailId]);

  return { reviews, addReview };
}
