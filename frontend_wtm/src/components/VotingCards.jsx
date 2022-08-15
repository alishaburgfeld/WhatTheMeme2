import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect } from 'react'



function VotingCards({id, phrase, notAllSelected, round, players_that_voted, votes, winningCard, userHasVoted, setUserHasVoted}) {

  function vote() {
    console.log('vote function activated')
    
    axios.post('/vote', {id:id, round: round})
    .then((response)=> {
      setUserHasVoted(true)
      //probably want to add some sort of css when voting
      console.log('USER JUST VOTED RESPONSE', response)
    })
    .catch((error)=> {
      console.log(error)
    })
  }

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
        <>
        <div className="maincontainer">
          <div className={notAllSelected ?'thecard is-flipped votingcards mb-3' : 'thecard votingcards mb-2'} id = {`voting${id}`}>
              <div className="thefront" ><h1>{phrase}</h1></div>
              <div className="theback"></div>
            </div>
          {/* <Button className="card-btn" onClick={()=>{selectCard(); sendSelectedCard();}}>Select</Button> */}
          {/* if the user hasn't voted and if the card is flipped over then allow them to vote on it */}
          {!notAllSelected && (!userHasVoted) ? <Button className="card-btn" onClick={vote}>Vote</Button> : null}
          {votes && <h4>Votes: {votes}</h4>}
          {/* {isWinningCard && <h4 className ='mb-5'>Winning Card!</h4>} */}
          {winningCard && checkIfWinningCard()}
          
        </div>
        </>
    )
}

export default VotingCards