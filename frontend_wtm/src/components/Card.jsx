import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'


function Card({id, phrase, votes, face_up}) {
    return (
      <Col>
        <div class="maincontainer">
            <div class="thecard">
                <div class="thefront"><h1>{phrase}</h1></div>
                <div class="theback"></div>
                <Button class="card-btn">Select</Button>
            </div>
        </div>
      </Col>
    )
}

export default Card