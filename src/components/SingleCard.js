import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }){


  const handleClick = () => {
    if(!disabled){
        handleChoice(card)                    /*only fire fct when card is not disabled*/
    }
  }
                                             /* mapping through cards and outputting them in a grid */
    return ( 
          <div className="card" > 
            <div className={flipped ? "flipped" : ""}> 
              <img                          //if it has prop flipped, apply class "flipped", if not, leave empty
              className="front" 
              src={card.src} 
              alt="card front" />
              <img 
              className="back" 
              src="/img/cover.jpg" 
              alt="card back"
              onClick={handleClick}          //click event at back of the card!
              />
            </div>
          </div>     
     );
}
 
