import { createContext, useContext, useState } from 'react';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState({});

  const addReview = (productId, review) => {
    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), review]
    }));
  };

  const updateReview = (productId, reviewId, updatedReview) => {
    setReviews(prev => ({
      ...prev,
      [productId]: prev[productId].map((r, idx) => 
        idx === reviewId ? updatedReview : r
      )
    }));
  };

  const deleteReview = (productId, reviewId) => {
    setReviews(prev => ({
      ...prev,
      [productId]: prev[productId].filter((_, idx) => idx !== reviewId)
    }));
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, updateReview, deleteReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewContext);