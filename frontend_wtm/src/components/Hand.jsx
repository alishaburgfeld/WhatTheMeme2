import axios from 'axios'
import {useState, useEffect} from 'react'
import Card from './Card'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

const startGame = async () => {
    const response = await axios.post('/startgame' )
    return response
}

function Hand({whoAmI, round, setGameCode, hand, setHand, gameCode}) {

    useEffect(()=> {
        //if user joined game there is already a gamecode and they already have a hand
        if (hand) {
            whoAmI()
        }
        else {
            let cardResponse = startGame()
            cardResponse.then((response)=> {
            
                let new_game_code = response && response.data && response.data.game_code
            // console.log('START GAME .THEN RESPONSE', response)
                console.log('GAME CODE IS:', new_game_code)
                if (new_game_code) {
                    window.alert(`Your game code is ${new_game_code}, send this to your friends for them to join your game`)
                    setGameCode(new_game_code)
                }
                let newhand = response && response.data && response.data.user_cards
                setHand(newhand)
                whoAmI()
            })
            .catch((error)=> {
                console.log(error)
            })
        }
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