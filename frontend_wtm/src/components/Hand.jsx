import 'axios'
import {useState, useEffect} from 'react'
import Card from './Card'

const startGame = async (setHand) => {
    console.log('I AM IN start game react')
    const response = await axios.post('/startgame' )
    console.log('startgame response', response)
    .then((response)=> {
        let newhand = response.data.user_cards
        console.log('HAND', newhand)
        setHand(newhand)
    })
}

function Hand(hand) {
    return (
        <div>
            {hand.map((card) => (
                <Card key = {card.id} card={...card}/>
            ))
            }
        </div>
    )
    
    

}

export {
    startGame,
    Hand
}