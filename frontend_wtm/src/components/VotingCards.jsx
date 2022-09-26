import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect } from 'react'
import Col from 'react-bootstrap/Col';



function VotingCards({id, phrase, notAllSelected, round, votes, winningCard, userHasVoted, setUserHasVoted}) {

  //sends the vote to the server to add the vote to the game card
  function vote() {
    axios.post('/vote', {id:id, round: round})
    .then((response)=> {
      setUserHasVoted(true)
      console.log('USER JUST VOTED RESPONSE', response)
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  //checks if this particular card is the winning card
  function checkIfWinningCard() {
    if (winningCard) {
      if (winningCard.id === id) {
        return (
          <h4>Winning Card!</h4>
        )
      }
      else {
        return (
          <></>
        )
      }
    }
  }
  
  useEffect(()=>{
    if (winningCard) {
      checkIfWinningCard()
    }
  },[winningCard])

    return (
        <Col>
        <div className="maincontainer">
          <div className={notAllSelected ?'thecard is-flipped votingcards mb-3' : 'thecard votingcards mb-2'} id = {`voting${id}`}>
              <div className="thefront" ><h1>{phrase}</h1></div>
              <div className="theback"></div>
            </div>
          {/* if the user hasn't voted and if the card is flipped over then allow them to vote on it */}
          {!notAllSelected && (!userHasVoted) ? <Button className="card-btn" onClick={vote}>Vote</Button> : null}
          {votes && <h4>Votes: {votes}</h4>}
          {winningCard && checkIfWinningCard()}
          
        </div>
        </Col>
    )
}

export default VotingCards