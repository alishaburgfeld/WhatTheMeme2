function Card({id, phrase, votes, face_up}) {
    return (
        <div class="maincontainer">
            <div class="thecard">
                <div class="thefront"><h1>Front of Card</h1><p>{phrase}</p></div>
                <div class="theback"><h1>Back of Card</h1><p>What the Me^^e?!</p>
          <button>Submit</button></div>
        </div>
      </div>
    )
}

export default Card