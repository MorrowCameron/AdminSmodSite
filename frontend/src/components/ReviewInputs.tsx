import React from 'react';

interface ReviewInputsProps {
  reviews: string[];
  setReviews: (reviews: string[]) => void;
}

const ReviewInputs: React.FC<ReviewInputsProps> = ({ reviews, setReviews }) => {
  const handleChange = (index: number, value: string) => {
    const updated = [...reviews];
    updated[index] = value;
    setReviews(updated);
  };

  return (
    <div className="reviewContainer">
      {reviews.map((text, i) => (
        <div key={i}>
          <label htmlFor={`review-${i}`} className="visually-hidden">
            Review {i + 1}
          </label>
          <input
            id={`review-${i}`}
            value={text}
            onChange={(e) => handleChange(i, e.target.value)}
            aria-label={`Review ${i + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewInputs;
