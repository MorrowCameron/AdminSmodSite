// src/pages/home.js
import React, { useState, useEffect } from 'react';
import './home.css';
import defaultBanner from '../images/WebsiteBanner.png';
import Carousel from 'react-bootstrap/Carousel';
import CarouselPage from '../components/carouselPage';
import ImageUploadModal from '../components/ImageUploadModal';
import SaveButton from '../components/SaveButton';

const placeholder = {
  image:
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  description: 'Placeholder image',
  caption: 'Placeholder caption',
};

const Home = () => {
  const [bannerImage, setBannerImage] = useState({
    src: defaultBanner,
    alt: 'Main Banner',
  });
  const [carouselImages, setCarouselImages] = useState([
    placeholder,
    placeholder,
    placeholder,
  ]);
  const [carousel2Images, setCarousel2Images] = useState([
    placeholder,
    placeholder,
  ]);
  const [modalState, setModalState] = useState({
    show: false,
    source: null,
    index: null,
  });

  const [aboutText, setAboutText] = useState('Current Description');
  const [showTimeText, setShowTimeText] = useState('Current Description');
  const [reviewTexts, setReviewTexts] = useState([
    'Review 1',
    'Review 2',
    'Review 3',
  ]);

  // Load text content from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('homeTextData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.aboutText) setAboutText(data.aboutText);
        if (data.showTimeText) setShowTimeText(data.showTimeText);
        if (data.reviewTexts) setReviewTexts(data.reviewTexts);
      } catch {
        console.warn('Failed to parse text data from localStorage');
      }
    }
  }, []);

  const openUploadModal = (source, index = null) =>
    setModalState({ show: true, source, index });
  const closeUploadModal = () =>
    setModalState({ show: false, source: null, index: null });

  const handleImageUpload = (imageDataUrl, imageName) => {
    if (modalState.source === 'banner') {
      setBannerImage({ src: imageDataUrl, alt: imageName });
    } else if (modalState.source === 'carousel1') {
      setCarouselImages((prev) => {
        const updated = [...prev];
        updated[modalState.index] = {
          ...updated[modalState.index],
          image: imageDataUrl,
          description: imageName,
        };
        return updated;
      });
    } else if (modalState.source === 'carousel2') {
      setCarousel2Images((prev) => {
        const updated = [...prev];
        updated[modalState.index] = {
          ...updated[modalState.index],
          image: imageDataUrl,
          description: imageName,
        };
        return updated;
      });
    }
    closeUploadModal();
  };

  const handleSave = () => {
    const textData = {
      aboutText,
      showTimeText,
      reviewTexts,
    };
    localStorage.setItem('homeTextData', JSON.stringify(textData));
    window.alert('Only text content saved. Images are not stored due to localStorage size limits.');
  };

  return (
    <div className="homePage">
      {/* Banner */}
      <div
        className="bannerContainer"
        onClick={() => openUploadModal('banner')}
        style={{ cursor: 'pointer' }}
      >
        <img className="banner" src={bannerImage.src} alt={bannerImage.alt} />
      </div>

      {/* Carousel 1 */}
      <div className="carouselContainer">
        <Carousel>
          {carouselImages.map((item, idx) => (
            <Carousel.Item key={idx}>
              <CarouselPage
                {...item}
                onClick={() => openUploadModal('carousel1', idx)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Text sections */}
      <h1>What is "Smile and Nod"</h1>
      <input
        value={aboutText}
        onChange={(e) => setAboutText(e.target.value)}
        type="text"
      />

      <h2>When/Where Can I Watch a Show?</h2>
      <input
        value={showTimeText}
        onChange={(e) => setShowTimeText(e.target.value)}
      />

      <h2>What Does An Improv Show Look Like?</h2>

      {/* Carousel 2 */}
      <div className="carouselContainer">
        <Carousel>
          {carousel2Images.map((item, idx) => (
            <Carousel.Item key={idx}>
              <CarouselPage
                {...item}
                onClick={() => openUploadModal('carousel2', idx)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Reviews */}
      <h2>Don't Trust We're Funny? Check Out These "Real" Reviews!</h2>
      <div className="reviewContainer">
        {reviewTexts.map((text, i) => (
          <input
            key={i}
            value={text}
            onChange={(e) => {
              const updated = [...reviewTexts];
              updated[i] = e.target.value;
              setReviewTexts(updated);
            }}
          />
        ))}
      </div>

      {/* Save button */}
      <div className="buttonContainer">
        <SaveButton
          onSave={handleSave}
          confirmText="Save only the text content of this page?"
          buttonLabel="Save Changes"
        />
      </div>

      {/* Image-upload modal */}
      <ImageUploadModal
        show={modalState.show}
        onHide={closeUploadModal}
        onUpload={handleImageUpload}
      />
    </div>
  );
};

export default Home;
