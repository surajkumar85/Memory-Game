import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
const cardImages = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);
  const suffleCard = function () {
    const suffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: Math.random() };
      });
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(suffleCards);
    setTurns(0);
  };
  //Handle Coice
  const handleChoice = function (card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  //Compare two cards
  useEffect(() => {
    const isSame = choiceOne && choiceTwo;
    if (isSame) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  //reset the value
  const resetTurn = function () {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisable(false);
  };
  useEffect(() => {
    suffleCard();
  }, []);
  return (
    <div className="app">
      <div className="app__upper">
        <h1>Memory Game</h1>
        <button className="app__newgame--btn" onClick={suffleCard}>
          New Game
        </button>
      </div>
      <div className="app__gamecard">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disable={disable}
          />
        ))}
      </div>
      <div className="app__turn">
        <h2>Turns</h2>
        <p>{turns}</p>
      </div>
    </div>
  );
}

export default App;
