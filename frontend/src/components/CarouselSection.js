import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselPage from './carouselPage';

const CarouselSection = ({ images, onImageClick, source }) => (
  <div className="carouselContainer">
    <Carousel>
      {images.map((item, idx) => (
        <Carousel.Item key={idx}>
          <CarouselPage {...item} onClick={() => onImageClick(source, idx)} />
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
);

export default CarouselSection;
