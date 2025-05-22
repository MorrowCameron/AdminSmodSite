import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './carouselPage.css';

const CarouselPage = (props) => {
    return (
        <div className="carouselPageContainer">
            <img className="carouselImageContainer" src={props.image} alt={props.description}/>
            <p className="carouselCaptionText">{props.caption}</p>
        </div>
    );
}

export default CarouselPage;