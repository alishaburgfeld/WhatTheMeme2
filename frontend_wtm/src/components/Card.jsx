import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import axios from 'axios';


function Card({id, phrase, votes, face_up, hand, setHand, round, userSelected, setUserSelected}) {
  

  // console.log('USER SELECTED LINE 10, SHOULD BE FALSE', userSelected)
  // tells database this card was selected
  function sendSelectedCard() {
    axios.put('/selectedcard', {id:id, round: round})
    .then((response)=> {
      console.log('SEND SELECTED CARD RESPONSE', response)
      setUserSelected(true)
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  function selectCard() {
    
    // removes this card from your hand
    for (let card of hand) {
      if (card.id=== id) {
        console.log('I HAVE SELECTED CARD ID', card.id, id)
        let index = hand.indexOf(card)
        let handslice= hand.slice()
        handslice.splice(index,1)
        setHand(handslice)
      }
    }
  }
  //after flip and votes and winner then another card is drawn
  

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
          {/* {!notAllSelected && !userHasVoted? <Button className="card-btn" onClick={vote}>Vote</Button> : ""} */}
          {!userSelected ? <Button className="card-btn" onClick={()=>{selectCard(); sendSelectedCard();}}>Select</Button> : ""}
      </div>
      <div><h6>UserSelected true or false: {userSelected}</h6></div>
    </Col>
  )
}

export default Card