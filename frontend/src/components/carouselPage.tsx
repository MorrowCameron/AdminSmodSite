import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './carouselPage.css';

interface CarouselPageProps {
  image: string;
  description?: string;
  caption?: string;
  onClick: () => void;
}

const CarouselPage: React.FC<CarouselPageProps> = ({ image, description, caption, onClick }) => {
  return (
    <div
      className="carouselPageContainer clickable"
      onClick={onClick}
      role="button"
      aria-label={caption || 'Carousel image'}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <img
        className="carouselImageContainer"
        src={image}
        alt={description || 'Slideshow image'}
        aria-label={caption || description || 'Carousel slide'}
      />
    </div>
  );
};

export default CarouselPage;
