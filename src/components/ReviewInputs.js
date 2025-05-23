// src/components/ReviewInputs.jsx
import React from 'react';

const ReviewInputs = ({ reviews, setReviews }) => {
  const handleChange = (index, value) => {
    const updated = [...reviews];
    updated[index] = value;
    setReviews(updated);
  };

  return (
    <div className="reviewContainer">
      {reviews.map((text, i) => (
        <input
          key={i}
          value={text}
          onChange={(e) => handleChange(i, e.target.value)}
        />
      ))}
    </div>
  );
};

export default ReviewInputs;
