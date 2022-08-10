import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'



function VotingCards({id, phrase, notAllSelected, round, players_that_voted, votes}) {

  const [userHasVoted, setUserHasVoted] = useState(false)

  function vote() {
    console.log('vote function activated')
    
    axios.post('/vote', {id:id, round: round})
    .then((response)=> {
      setUserHasVoted(true)
      //probably want to add some sort of css when voting
      console.log(response)
    })
    .catch((error)=> {
      console.log(error)
    })
}

    return (
        <>
        <div class="maincontainer">
          <div className={notAllSelected ?'thecard is-flipped votingcards' : 'thecard votingcards'} id = {`voting${id}`}>
              <div className="thefront" ><h1>{phrase}</h1></div>
              <div className="theback"></div>
            </div>
          {/* <Button className="card-btn" onClick={()=>{selectCard(); sendSelectedCard();}}>Select</Button> */}
          {/* if the user hasn't voted and if the card is flipped over then allow them to vote on it */}
          {!notAllSelected && !userHasVoted? <Button className="card-btn" onClick={vote()}>Vote</Button> : ""}
          {votes && <h4>Votes: {votes}</h4>}
          
        </div>
        </>
    )
}

export default VotingCards