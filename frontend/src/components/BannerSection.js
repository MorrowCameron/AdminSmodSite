import React from 'react';

const BannerSection = ({ bannerImage, onClick }) => (
  <div
    className="bannerContainer clickable"
    onClick={onClick}
    role="button"
    aria-label="Upload banner image"
    tabIndex={0}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
  >
    <img className="banner" src={bannerImage.src} alt={bannerImage.alt || 'Banner image'} />
  </div>
);

export default BannerSection;
