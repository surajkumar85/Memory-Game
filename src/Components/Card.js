import React from "react";
import "./Card.css";
function Card({ card, handleChoice, flipped, disable }) {
  const handleClick = function () {
    !disable && handleChoice(card);
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="card__front" src={card.src} alt="card" />
        <img
          className="card__back"
          onClick={handleClick}
          src="./img/cover.png"
          alt="cardcover"
        />
      </div>
    </div>
  );
}

export default Card;
