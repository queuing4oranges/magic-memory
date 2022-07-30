import './SingleCard.css'

export default function SingleCard({ card, handleChoice }){


  const handleClick = () => {
    handleChoice(card)
    console.log(card.src)
    
  }
                                             /* mapping through cards and outputting them in a grid */
    return ( 
          <div className="card" > 
            <div>
              <img 
              className="front" 
              src={card.src} 
              alt="card front" />
              <img 
              className="back" 
              src="/img/cover.png" 
              alt="card back"
              onClick={handleClick}          //click event at back of the card!
              />
            </div>
          </div>     
     );
}
 
