import {useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {leaveGame } from '../AxiosCalls/GameAxiosCalls'
import {Hand} from '../components/Hand'
import MemeCard from '../components/MemeCard'
import SelectedCards from '../components/SelectedCards'


// https://stackoverflow.com/questions/51199077/request-header-field-x-csrf-token-is-not-allowed-by-access-control-allow-headers
function GamePage ({user, whoAmI}){

    const [memes, setMemes] = useState(null)
    const [drawnCard, setDrawnCard] = useState(null)
    const [round, setRound] = useState(null)
    const [selectedCards, setSelectedCards] = useState([])
    const [players, setPlayers] = useState([])
    
    // const [usedCards, setUsedCards] = useState(null)
    // console.log('SELECTED CARDS AT START OF GAME', selectedCards)
    useEffect(()=> {
        whoAmI()
    }, [])

    function getPlayers() {
        console.log('IN GET PLAYERs')
        axios.get('/players')
        .then((response)=> {
          console.log('GET PLAYERS RESPONSE IN .THEN', response)
          let returned_players = response && response.data && response.data.players
          if (returned_players) {
            setPlayers(returned_players)
          } 
        })
        .catch((error)=> {
          console.log(error)
        })
    }
    useEffect(()=>{
        getPlayers()
        // setInterval(getSelectedCards, 100000)
    },[])

    function getSelectedCards() {
        console.log('IN GET CARDs')
        axios.get('/selectedcards/view')
        .then((response)=> {
          console.log('GET CARDS RESPONSE IN .THEN', response)
          let selected_cards = response && response.data && response.data.selected_cards
          console.log('line 48', selected_cards)
          if (selected_cards) {
            setSelectedCards(selected_cards)
          }
          
        })
        .catch((error)=> {
          console.log(error)
        })
    }
    useEffect(()=>{
        getSelectedCards()
        setInterval(getSelectedCards, 10000)
        // need to set interval to do this every 5 seconds
    },[])

        // function consoletest() {
        //     console.log(memes[10])
        //     console.log(typeof(memes[10]))
        // }

    return (
        <div>
            <h2> Welcome {user}</h2>
            {players && <h2>All users playing: {players}</h2>}
            {/* I had to set it up like this because app.jsx was rendering these components before my use effect was called so memes wasn't showing up as having been set yet */}
            
            {/* {memes != null ? <img src={memes[10].url}></img> : ""} */}
            
            <div>
                <MemeCard setRound={setRound} round = {round}/>
            </div>
            <div>
                {selectedCards.length > 0
                ? 
                    <div>
                    <h2>Selected Cards</h2>
                    <SelectedCards selectedCards={selectedCards} players={players}/>
                    <Hand whoAmI={whoAmI} round={round}/>
                    <Button onClick={leaveGame}>Leave Game</Button>
                    </div>
                :
                    <div>    
                        <Hand whoAmI={whoAmI} round={round}/>
                        <Button onClick={leaveGame}>Leave Game</Button>
                    </div>
                }
            </div>   
        </div>
    )
}

export default GamePage