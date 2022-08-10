import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import Card from './Card'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'



function Hand({whoAmI, round, setGameCode, hand, setHand, gameCode}) {

    const startGame = async () => {
        console.log('I AM IN START GAME ON REACT')
        const response = await axios.post('/startgame' )
        return response
    }

    let firstRender = useRef(true)

    console.log('I AM IN HAND COMPONENT')

    useEffect(()=> {
        if (firstRender.current) {
            console.log('I AM IN HAND USE EFFECT, HAND', hand)
            //if user joined game there is already a gamecode and they already have a hand
            if (hand) {
                whoAmI()
            }
            else {
            
                console.log('HAND LINE 28', hand)
                console.log('IN THE ELSE ON HAND USE EFFECT')
                // do I need await here?
                let cardResponse = startGame()
                cardResponse.then((response)=> {
                    console.log('HAND .THEN RESPONSE', response)
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
            firstRender.current= false
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
    Hand
}