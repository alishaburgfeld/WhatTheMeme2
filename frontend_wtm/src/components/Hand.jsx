import axios from 'axios'
import {useState, useEffect} from 'react'
import Card from './Card'

const startGame = async () => {
    console.log('I AM IN start game react')
    const response = await axios.post('/startgame' )
    console.log('startgame response', response)
    
    
}

function Hand({whoAmI}) {
    const [hand, setHand] = useState(null)
    console.log('I AM AT THE HAND COMPONENT')
    useEffect(()=> {
        console.log('I AM IN HAND USE EFFECT')
        let cardResponse = startGame()
        cardResponse.then((response)=> {
            let newhand = response && response.data && response.data.user_cards
            console.log('HAND', newhand)
            setHand(newhand)
            whoAmI()
        })
    }, [])

    return (
        <div>
            {hand && hand.map((card) => (
                <Card key = {card.id} {...card}/>
            ))
            }
        </div>
    )
    
    

}

export {
    startGame,
    Hand
}