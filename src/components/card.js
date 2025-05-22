import React from "react";
import './card.css';

const Card = ({first_name, middle_name, last_name, img}) => {
    const alt = "Headshot of "+ first_name +" "+ last_name
    return(
    <div className="cardContainer">
        <div className="subcardContainer">
            <img src={img} alt={alt} className="imageContainer"/>
        </div>
        <div className="subcardContainer">
          <p className="textStyling">{first_name} "{middle_name}" {last_name}</p>
        </div>
    </div>
    )
}

export default Card;