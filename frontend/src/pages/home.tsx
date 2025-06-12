import React, { useState, useEffect } from 'react';
import './home.css';
import defaultBanner from '../images/WebsiteBanner.png';
import ImageUploadModal from '../components/ImageUploadModal';
import SaveButton from '../components/SaveButton';
import DarkModeToggle from '../components/DarkModeToggle';
import BannerSection from '../components/BannerSection';
import TextSection from '../components/TextSection';
import CarouselSection from '../components/CarouselSection';
import ReviewInputs from '../components/ReviewInputs';

const placeholder = {
  image:
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  description: 'Placeholder image',
  caption: 'Placeholder caption',
};

interface ModalState {
  show: boolean;
  source: string | null;
  index: number | null;
}

const Home: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<{ src: string; alt: string }>({
    src: defaultBanner,
    alt: 'Main Banner',
  });
  const [carouselImages, setCarouselImages] = useState<typeof placeholder[]>([
    placeholder,
    placeholder,
    placeholder,
  ]);
  const [carousel2Images, setCarousel2Images] = useState<typeof placeholder[]>([
    placeholder,
    placeholder,
  ]);
  const [modalState, setModalState] = useState<ModalState>({
    show: false,
    source: null,
    index: null,
  });

  const [aboutText, setAboutText] = useState<string>('Current Description');
  const [showTimeText, setShowTimeText] = useState<string>('Current Description');
  const [reviewTexts, setReviewTexts] = useState<string[]>([
    'Review 1',
    'Review 2',
    'Review 3',
  ]);

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

  const openUploadModal = (source: string, index: number | null = null) =>
    setModalState({ show: true, source, index });
  const closeUploadModal = () =>
    setModalState({ show: false, source: null, index: null });

  const handleImageUpload = (imageDataUrl: string, imageName: string) => {
    if (modalState.source === 'banner') {
      setBannerImage({ src: imageDataUrl, alt: imageName });
    } else if (modalState.source === 'carousel1') {
      setCarouselImages((prev) => {
        const updated = [...prev];
        updated[modalState.index!] = {
          ...updated[modalState.index!],
          image: imageDataUrl,
          description: imageName,
        };
        return updated;
      });
    } else if (modalState.source === 'carousel2') {
      setCarousel2Images((prev) => {
        const updated = [...prev];
        updated[modalState.index!] = {
          ...updated[modalState.index!],
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
      <DarkModeToggle />

      <BannerSection
        bannerImage={bannerImage}
        onClick={() => openUploadModal('banner')}
      />

      <CarouselSection
        images={carouselImages}
        onImageClick={openUploadModal}
        source="carousel1"
      />

      <h1>What is "Smile and Nod"</h1>
      <TextSection
        title=""
        value={aboutText}
        onChange={(e) => setAboutText(e.target.value)}
      />

      <TextSection
        title="When/Where Can I Watch a Show?"
        value={showTimeText}
        onChange={(e) => setShowTimeText(e.target.value)}
      />

      <h2>What Does An Improv Show Look Like?</h2>

      <CarouselSection
        images={carousel2Images}
        onImageClick={openUploadModal}
        source="carousel2"
      />

      <h2>Don't Trust We're Funny? Check Out These "Real" Reviews!</h2>
      <ReviewInputs
        reviews={reviewTexts}
        setReviews={setReviewTexts}
      />

      <div className="buttonContainer">
        <SaveButton
          onSave={handleSave}
          confirmText="Save only the text content of this page?"
          buttonLabel="Save Changes"
        />
      </div>

      <ImageUploadModal
        show={modalState.show}
        onHide={closeUploadModal}
        onUpload={handleImageUpload}
      />
    </div>
  );
};

export default Home;
