import './App.css';
import { useState } from 'react';
import SingleCard from './components/SingleCard';

//making an array of cards (not needed in the components, so here)
const cardImages=[
  {"src":"/img/helmet-1.png"},
  {"src":"/img/potion-1.png"},
  {"src":"/img/ring-1.png"},
  {"src":"/img/scroll-1.png"},
  {"src":"/img/shield-1.png"},
  {"src":"/img/sword-1.png"}
]


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);


  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]  //(1) duplicating cards, then .sort fires a fct for two items of the array
    .sort(() => Math.random() -0.5)                       //num negative? -> items will stay the same; num positiv? -> order will be swapped => random order
    .map((card) => ({ ...card, id: Math.random() }))      //return random id for each item;
                                                          //take properties (here just src) of the card and add random id number
    setCards(shuffledCards)
    setTurns(0)

    }
    console.log(cards, turns)
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
        {cards.map(card => (
        <SingleCard key={card.id} card={card} />
        ))}
    </div>
    </div>
  );
}

export default App;
