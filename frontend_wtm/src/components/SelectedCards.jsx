// import axios from 'axios'
import {useState, useEffect} from 'react'
import VotingCards from './VotingCards';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

function SelectedCards({selectedCards, players}) {

    const [isActive, setIsActive] = useState(true)

    function flipCards() {
        //flip cards once every player has selected one
        if (selectedCards.length === players.length) {
            setIsActive(false)
        }
        // const card = document.getElementByClassName('votingcards')
    }


    return (
        <Container>
            <Row>
                {selectedCards && selectedCards.map((card) => (
                    <VotingCards key = {card.id} {...card} isActive={isActive}/>
                ))
                }
            </Row>
        </Container>
    )
}



export default SelectedCards

