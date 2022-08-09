
function vote() {
    console.log('vote function activated')
}


function VotingCards({id, phrase, isActive}) {
    return (
        <>
        <div class="maincontainer">
          <div className={isActive ?'thecard is-flipped votingcards' : 'thecard votingcards'} id = {`voting${id}`}>
              <div className="thefront" ><h1>{phrase}</h1></div>
              <div className="theback"></div>
            </div>
          {/* <Button className="card-btn" onClick={()=>{selectCard(); sendSelectedCard();}}>Select</Button> */}
          {!isActive? <Button className="card-btn" onClick={vote()}>Vote for this card</Button> : ""}
          
        </div>
        </>
    )
}

export default VotingCards