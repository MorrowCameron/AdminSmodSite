import React from 'react';

interface BannerImage {
  src: string;
  alt?: string;
}

interface BannerSectionProps {
  bannerImage: BannerImage;
  onClick: () => void;
}

const BannerSection: React.FC<BannerSectionProps> = ({ bannerImage, onClick }) => (
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
