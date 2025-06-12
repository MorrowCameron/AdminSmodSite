import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselPage from './carouselPage';

interface CarouselSectionProps {
  images: Array<{ [key: string]: any }>; // Adjust the type according to the structure of your image objects
  onImageClick: (source: string, index: number) => void;
  source: string;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ images, onImageClick, source }) => (
  <div className="carouselContainer">
    <Carousel>
      {images.map((item, idx) => (
        <Carousel.Item key={idx}>
            <CarouselPage image={item.image} {...item} onClick={() => onImageClick(source, idx)} />
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
);

export default CarouselSection;
