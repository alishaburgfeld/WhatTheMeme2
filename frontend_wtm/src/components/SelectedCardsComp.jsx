// import axios from 'axios'
import {useState, useEffect} from 'react'
import VotingCards from './VotingCards';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

function SelectedCardsComp({selectedCards, players, round}) {

    const [notAllSelected, setNotAllSelected] = useState(true)

    
    function flipCards() {
        //flip cards once every player has selected one
        console.log('NOW IN FLIP CARDS')
        // console.log(selectedCards.length, 'players length', players.length)
        if (selectedCards.length === players.length) {
            setNotAllSelected(false)
        }
        // const card = document.getElementByClassName('votingcards')
    }
    console.log('HERE I AM LINE 21')
    useEffect(()=>{
        if (notAllSelected) {
            console.log('IN SELECTED CARDS USE EFFECT')
            flipCards()
            setInterval(flipCards, 10000)
            if (round===1) {
                window.alert('All players have selected a card, vote for the funniest one!')
            }
        }
        // need to set interval to do this every 5 seconds
    },[])


    return (
        <Container>
            <Row>
                {selectedCards && selectedCards.map((card) => (
                    <VotingCards key = {card.id} {...card} notAllSelected={notAllSelected} round={round}/>
                ))
                }
            </Row>
        </Container>
    )
}



export default SelectedCardsComp

