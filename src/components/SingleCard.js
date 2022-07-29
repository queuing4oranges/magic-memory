import './SingleCard.css'

export default function SingleCard({ card }){

                                             /* mapping through cards and outputting them in a grid */
    return ( 
          <div className="card" > 
            <div>
              <img className="front" src={card.src} alt="card front" />
              <img className="back" src="/img/cover.png" alt="card back" />
            </div>
          </div>     
     );
}
 
