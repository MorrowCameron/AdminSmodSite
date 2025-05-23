// src/components/BannerSection.jsx
import React from 'react';

const BannerSection = ({ bannerImage, onClick }) => (
  <div
    className="bannerContainer"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <img className="banner" src={bannerImage.src} alt={bannerImage.alt} />
  </div>
);

export default BannerSection;
