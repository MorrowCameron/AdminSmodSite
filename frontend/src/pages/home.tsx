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
import { IAPIImageData, IAPITextData } from '../../../backend/src/shared/DatabaseHelper';

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

interface HomeProps {
  authToken: string;
}

const Home: React.FC<HomeProps> = ({ authToken }) => {
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    const textData = {
      aboutText,
      showTimeText,
      reviewTexts,
    };

    try {
      const response = await fetch("/api/home/texts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(textData),
      });

      if (!response.ok) {
        throw new Error("Failed to update text content");
      }

      window.alert("Changes saved! Text and images stored.");
    } catch (err) {
      console.error(err);
      window.alert("Error saving text content.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const imageRes = await fetch('/api/home/images', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!imageRes.ok) throw new Error('Failed to fetch images');
        const imageData: IAPIImageData[] = await imageRes.json();

        const imageMap = Object.fromEntries(
          imageData.map((img) => [img.name.toLowerCase(), img])
        );

        const banner = imageMap["banner"];
        if (banner) {
          setBannerImage({ src: banner.src, alt: banner.alt ?? banner.name });
        }

        setCarouselImages(
          ["carousel1a", "carousel1b", "carousel1c"].map((key) => {
            const img = imageMap[key];
            return img
              ? {
                  image: img.src,
                  description: img.name,
                  caption: img.alt ?? "",
                }
              : placeholder;
          })
        );

        setCarousel2Images(
          ["carousel2a", "carousel2b"].map((key) => {
            const img = imageMap[key];
            return img
              ? {
                  image: img.src,
                  description: img.name,
                  caption: img.alt ?? "",
                }
              : placeholder;
          })
        );

        const textRes = await fetch('/api/home/texts', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!textRes.ok) throw new Error('Failed to fetch text content');
        const texts: IAPITextData[] = await textRes.json();

        const map = Object.fromEntries(texts.map((t) => [t.name.toLowerCase(), t.value]));

        if (map["about"]) setAboutText(map["about"]);
        if (map["showtime"]) setShowTimeText(map["showtime"]);
        setReviewTexts([
          map["review1"] ?? "Review 1",
          map["review2"] ?? "Review 2",
          map["review3"] ?? "Review 3",
        ]);
      } catch (err: any) {
        console.error("Home page fetch error:", err);
        setError(err.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const openUploadModal = (source: string, index: number | null = null) =>
    setModalState({ show: true, source, index });
  const closeUploadModal = () =>
    setModalState({ show: false, source: null, index: null });

  const handleImageUpload = (imageFile: File, imageAlt: string) => {
    let imageKey: string | null = null;

    if (modalState.source === "banner") {
      imageKey = "banner";
      setBannerImage({ src: URL.createObjectURL(imageFile), alt: imageAlt });
    } else if (modalState.source === "carousel1") {
      imageKey = `carousel1${String.fromCharCode(65 + modalState.index!)}`;
      setCarouselImages((prev) => {
        const updated = [...prev];
        updated[modalState.index!] = {
          ...updated[modalState.index!],
          image: URL.createObjectURL(imageFile),
          description: imageAlt,
        };
        return updated;
      });
    } else if (modalState.source === "carousel2") {
      imageKey = `carousel2${String.fromCharCode(65 + modalState.index!)}`;
      setCarousel2Images((prev) => {
        const updated = [...prev];
        updated[modalState.index!] = {
          ...updated[modalState.index!],
          image: URL.createObjectURL(imageFile),
          description: imageAlt,
        };
        return updated;
      });
    }

    if (imageKey) {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("alt", imageAlt);

      fetch(`/api/home/images/${imageKey}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      }).then((res) => {
        if (!res.ok) {
          console.error("Image upload failed");
          alert("Failed to upload image to server.");
        }
      });
    }

    closeUploadModal();
  };

  if (loading) return <p className="status">Loading home page content...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

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
