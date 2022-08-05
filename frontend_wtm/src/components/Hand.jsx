import axios from 'axios'
import {useState, useEffect} from 'react'
import Card from './Card'

const startGame = async (whoAmI) => {
    console.log('I AM IN start game react')
    const response = await axios.post('/startgame' )
    console.log('startgame response', response)
    whoAmI()
    
}

function Hand() {
    const [hand, setHand] = useState(null)

    useEffect(()=> {
        let cardResponse = startGame()
        cardResponse.then((response)=> {
            let newhand = response && response.data && response.data.user_cards
            console.log('HAND', newhand)
            setHand(newhand)
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