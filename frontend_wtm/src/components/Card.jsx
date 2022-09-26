import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import axios from 'axios';


function Card({id, phrase, hand, setHand, round, userSelected, setUserSelected}) {
  
  // tells database this card was selected
  function sendSelectedCard() {
    console.log('ROUND IN SEND SELECTED CARD', round)
    axios.put('/selectedcard', {id:id, round: round})
    .then((response)=> {
      console.log('SEND SELECTED CARD RESPONSE', response)
      setUserSelected(true)
    })
    .catch((error)=> {
      console.log(error)
    })
  }


  // removes this card from your hand
  function selectCard() {
    for (let card of hand) {
      if (card.id=== id) {
        let index = hand.indexOf(card)
        let handslice= hand.slice()
        handslice.splice(index,1)
        setHand(handslice)
      }
    }
  }
  

  return (
    <Col>
      <div class="maincontainer">
          {/* <div className={isActive ?'thecard is-flipped' : 'thecard'} id = {`${id}`} onClick={(id)=>{selectCard(id)}}> */}
          <div className='thecard mb-2' id = {`${id}`} >
              <div className="thefront" ><h1>{phrase}</h1></div>
              <div className="theback"></div>
            </div>
          {/* <Button className="card-btn" onClick={(id, round)=>{selectCard(id); sendSelectedCard(id, round);}}>Select</Button> */}
          {/* {!notAllSelected && !userHasVoted? <Button className="card-btn" onClick={vote}>Vote</Button> : ""} */}
          {!userSelected ? <Button className="card-btn" onClick={()=>{selectCard(); sendSelectedCard();}}>Select</Button> : ""}
      </div>
    </Col>
  )
}

export default Card