import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import axios from 'axios';


function Card({id, phrase, votes, face_up, hand, setHand, round}) {
  // console.log('CARD COMPONENT ID:', id, 'TYPE', typeof(id) )

  // const [selectedCard, setSelectedCard] = useState(null)

  function sendSelectedCard() {
    console.log('IN SEND SELECTED CARD...ID:', id, 'ID TYPE', typeof(id), 'ROUND', round, 'TYPE ROUND', typeof(round))
    axios.put('/selectedcard', {id:id, round: round})
    .then((response)=> {
      console.log(response)
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  function selectCard() {
    console.log('ID IN SELECT CARD IS', id)
    //remove card from the hand
    // console.log(Object.keys(hand[0]))
    
    for (let card of hand) {
      // if (card['id']=== id) {
        // console.log('ID IS!', id)
        //these are not working
      if (card.id=== id) {
        let index = hand.indexOf(card)
        console.log('INDEX IS ===', index)
        let handslice= hand.slice()
        handslice.splice(index,1)
        setHand(handslice)
        // console.log('HAND AFTER SPLICE', hand)
        // need to sethand
      }
    }
    // let database know which card was Selected - complete
    // database queries for selected cards and places them face down on the board
    //after flip and votes and winner then another card is drawn
  }
  

  return (
    <Col>
      <div class="maincontainer">
      {/* <div class="cardcontainer"> */}
          {/* <div className={isActive ?'thecard is-flipped' : 'thecard'} id = {`${id}`} onClick={(id)=>{selectCard(id)}}> */}
          <div className='thecard' id = {`${id}`} >
              <div className="thefront" ><h1>{phrase}</h1></div>
              <div className="theback"></div>
            </div>
          {/* <Button className="card-btn" onClick={(id, round)=>{selectCard(id); sendSelectedCard(id, round);}}>Select</Button> */}
          <Button className="card-btn" onClick={()=>{selectCard(); sendSelectedCard();}}>Select</Button>
      </div>
    </Col>
  )
}

export default Card