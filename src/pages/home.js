import React from 'react';
import'./home.css';
import banner from '../images/WebsiteBanner.png';
import Carousel from 'react-bootstrap/Carousel';
import CarouselPage from '../components/carouselPage';

const Home = () => {
  const fakeCarouselImage = {image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", description: "Placeholder image", caption: "Placeholder caption"}
  return (
    <div className='homePage'>
      <div className='bannerContainer'>
        <img className="banner" src={banner} alt=""/>
      </div>
      <div className='carouselContainer'>
        <Carousel>
          <Carousel.Item>
            <CarouselPage {...fakeCarouselImage}/>
          </Carousel.Item>
          <Carousel.Item>
          <CarouselPage {...fakeCarouselImage}/>
          </Carousel.Item>
          <Carousel.Item>
          <CarouselPage {...fakeCarouselImage}/>
          </Carousel.Item>
        </Carousel>
      </div>
      <h1>What is "Smile and Nod"</h1>
      <input defaultValue="Current Description" type="text"></input>
      <h2>When/Where Can I Watch a Show?</h2>
      <input defaultValue='Current Description'></input>
      <h2>What Does An Improv Show Look Like?</h2>
      <div className='carouselContainer'>
        <Carousel>
          <Carousel.Item>
            <CarouselPage {...fakeCarouselImage}/>
          </Carousel.Item>
          <Carousel.Item>
            <CarouselPage {...fakeCarouselImage}/>
          </Carousel.Item>
        </Carousel>
      </div>    
      <h2>Don't Trust We're Funny? Check Out These "Real" Reviews!</h2>
      <div className="reviewContainer">
        <input defaultValue="Review 1"></input>
        <input defaultValue="Review 2"></input>
        <input defaultValue="Review 3"></input>
      </div>
      <div className='buttonContainer'>
        <button>Save?</button>
      </div>
    </div>
  );
};

export default Home;
