import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

//making an array of cards (not needed in the components, so here)
const cardImages=[
  {"src":"/img/bag.jpg" , matched: false }, //adding 'matched' property, so to begin with none of the cards are matched
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
  //storing the choice the user makes:, when user clicks, we'll update state of card
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]  //(1) duplicating cards, then .sort fires a fct for two items of the array
    .sort(() => Math.random() -0.5)                       //num negative? -> items will stay the same; num positiv? -> order will be swapped => random order
    .map((card) => ({ ...card, id: Math.random() }))      //return random id for each item;
                                                          //take properties (here just src) of the card and add random id number

    setChoiceOne(null)                                    //resetting the card choices - just in case
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    }

    //handle a choice
    const handleChoice = (card) =>{
                                                          //if it has no value -> card1 if it already has a value -> card2
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)  //if choiceOne is null - set choiceOne to be the card, otherwise, set choiceTwo
    }                                                     //dont compare cards here -> state need to be finished updating first!
  

    const resetTurn = () =>{
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns+1)
      setDisabled(false)

    }
    //compare 2 selected cards
    useEffect(() => {
                                      
      if (choiceOne && choiceTwo){
        setDisabled(true)                                 //disables clicking other cards when two clicked but before being compared
        if (choiceOne.src === choiceTwo.src){
        setCards(prevCards => {                           //matching the cards - set prevState to matched / true / false
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
        1000);                                    //resetting the turn: 2nd card flips over immediately after not being a match -> use a timer
      }
      }

    }, [choiceOne, choiceTwo])
    console.log(cards)

    //start game automatically
    useEffect(() =>{
      shuffleCards()                            //shuffleCards is the fct that starts the game (cant use useEff as it would start a game after every choice)
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

//SingleCard handleChoice={handleChoice} -> passing fcts in as props
//3 possible scearios for flipped props: if choiceOne is equal to the card we're just outputting -> flipped=true, same for choiceTwo OR has been previously matched, so must stay flipped
//make 'disabled' prop so the rest of the cards isnt clickable - should be true or false
//final touches: count turns, start game automatically
