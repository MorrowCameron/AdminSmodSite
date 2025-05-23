import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './carouselPage.css';

const CarouselPage = ({ image, description, caption, onClick }) => {
  return (
    <div className="carouselPageContainer" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img className="carouselImageContainer" src={image} alt={description} />
    </div>
  );
};

export default CarouselPage;
