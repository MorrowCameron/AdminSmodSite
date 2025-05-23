import React from 'react';
import './card.css';

const Card = ({ first_name, middle_name, last_name, img, onRemove }) => {
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
          <img src={img} alt={`${first_name} ${last_name}`} />
        </div>
      </div>
      <div className="textStyling">{first_name} {middle_name} {last_name}</div>
    </div>
  );
};

export default Card;
