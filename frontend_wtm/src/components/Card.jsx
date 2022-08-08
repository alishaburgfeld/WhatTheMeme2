import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'


function Card({id, phrase, votes, face_up}) {

  function flipCard(id) {
    console.log(id)
    // const card = document.getElementById(`${id}`)
    //for the card in the middle of the board being flipped up
    // card.classList.toggle('is-flipped')
    console.log('flip card activated')
  }

  function selectCard(id) {
    console.log(id)
    // const card = document.getElementById(`${id}`)
    console.log('select card activated')
  }

  return (
    <Col>
      <div class="maincontainer">
          <div class="thecard" id = {id} onClick={(id)=>{selectCard(id); flipCard(id);}}>
              <div class="thefront" ><h1>{phrase}</h1></div>
              <div class="theback"></div>
              <Button class="card-btn">Select</Button>
          </div>
      </div>
    </Col>
  )
}

export default Card