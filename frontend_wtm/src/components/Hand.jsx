import axios from 'axios'
import {useState, useEffect} from 'react'
import Card from './Card'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

const startGame = async () => {
    console.log('I AM IN start game react')
    const response = await axios.post('/startgame' )
    console.log('startgame response', response)  
    return response
}

function Hand({whoAmI, round}) {
    const [hand, setHand] = useState(null)
    console.log('I AM AT THE HAND COMPONENT')
    
    useEffect(()=> {
        console.log('I AM IN HAND USE EFFECT')
        let cardResponse = startGame()
        cardResponse.then((response)=> {
            console.log('USE EFFECT RESPONSE IN .THEN', response)
            let newhand = response && response.data && response.data.user_cards
            console.log('HAND', newhand)
            setHand(newhand)
            whoAmI()
        })
        .catch((error)=> {
            console.log(error)
        })
    }, [])
    // can I do the "sethand" in my axios call? or do I have to do it in the use effect?

    return (
        <Container>
            <Row>
                {hand && hand.map((card) => (
                    <Card key = {card.id} {...card} setHand={setHand} hand={hand} round={round}/>
                ))
                }
            </Row>
        </Container>
    )
}

export {
    startGame,
    Hand
}