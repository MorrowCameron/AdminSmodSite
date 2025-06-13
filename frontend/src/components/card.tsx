import React from 'react';
import './card.css';

interface CardProps {
  first_name: string;
  middle_name?: string;
  last_name: string;
  src?: string;
  onRemove?: () => void;
}

const Card: React.FC<CardProps> = ({ first_name, middle_name, last_name, src, onRemove }) => {
  return (
    <div className="cardContainer" style={{ position: 'relative' }}>
      {onRemove && (
        <button
          onClick={onRemove}
          className="closeButton"
          aria-label="Remove member"
        >
          ×
        </button>
      )}
      <div className="subcardContainer">
        <div className="imageContainer">
          <img src={src} alt={`${first_name} ${last_name}`} />
        </div>
      </div>
      <div className="textStyling">{first_name} {middle_name} {last_name}</div>
    </div>
  );
};

export default Card;
