import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

//making an array of cards
const cardImages=[
  {"src":"/img/bag.jpg" , matched: false }, //adding 'matched' property
  {"src":"/img/dino.jpg" , matched: false },
  {"src":"/img/katja.jpg" , matched: false },
  {"src":"/img/leaves.jpg" , matched: false },
  {"src":"/img/lhota.jpg" , matched: false },  
  {"src":"/img/miqi.jpg" , matched: false }, 
  {"src":"/img/shoe.jpg" , matched: false },
  {"src":"/img/stars.jpg" , matched: false },
  {"src":"/img/tram.jpg" , matched: false }  
]


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  //storing user choice
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]  //duplicating cards - .sort -> neg. or pos.?
    .sort(() => Math.random() -0.5)
    .map((card) => ({ ...card, id: Math.random() }))
    console.log(cards)      //return random id for each item;
                                                          
    setChoiceOne(null)                                    //resetting the card choices
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    }

    const handleChoice = (card) =>{                                                
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)  
    }                                                     //dont compare cards here -> state need to be finished updating first!
  

    const resetTurn = () =>{
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns+1)
      setDisabled(false)

    }
   
    useEffect(() => {
                                      
      if (choiceOne && choiceTwo){
        setDisabled(true)                                 //disables clicking other cards
        if (choiceOne.src === choiceTwo.src){
        setCards(prevCards => {                           //matching the cards
          return prevCards.map(card=>{                    //fire the following fct for each card
            if (card.src === choiceOne.src){
              return{...card, matched:true}               //spread out the card properties and set matched to true
            }else{
              return card
            }
          })
        }) 
        resetTurn();
      }else{
        
        setTimeout(() => resetTurn(), 
        1000);                                    //resetting the turn
      }
      }

    }, [choiceOne, choiceTwo])
    console.log(cards)

    //start game automatically
    useEffect(() =>{
      shuffleCards()                            
    }, [])

  return (
    <div className="App">
      <div className="intro">
          <h1>Memory</h1>
          <p>Turns: {turns}</p>
          <button onClick={shuffleCards}>New Game</button>
      </div>
      
      

        <div className="card-grid">
        {cards.map(card => (
        <SingleCard 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped={card===choiceOne || card===choiceTwo || card.matched}
        disabled={disabled}/>     
        ))}</div>
     </div>   

  );
}

export default App;


