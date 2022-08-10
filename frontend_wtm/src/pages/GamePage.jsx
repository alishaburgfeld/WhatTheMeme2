import {useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {leaveGame } from '../AxiosCalls/GameAxiosCalls'
import {Hand} from '../components/Hand'
import MemeCard from '../components/MemeCard'
import SelectedCardsComp from '../components/SelectedCardsComp'


// https://stackoverflow.com/questions/51199077/request-header-field-x-csrf-token-is-not-allowed-by-access-control-allow-headers
function GamePage ({user, whoAmI, hand, setHand}){

    const [memes, setMemes] = useState(null)
    const [drawnCard, setDrawnCard] = useState(null)
    const [round, setRound] = useState(1)
    const [selectedCards, setSelectedCards] = useState([])
    const [players, setPlayers] = useState([])
    const [gameCode, setGameCode] = useState(null)
    const [playersThatVoted, setPlayersThatVoted] = useState(null)
    
    useEffect(()=> {
        whoAmI()
    }, [])

    function getPlayers() {
        axios.get('/players')
        .then((response)=> {
          let returned_players = response && response.data && response.data.players
          if (returned_players) {
            setPlayers(returned_players)
          } 
        })
        .catch((error)=> {
          console.log(error)
        })
    }

    function getPlayersThatVoted() {
        console.log('IN GET PLAYERS THAT VOTED')
        axios.put('/votes/view', {round: round, gameCode: gameCode})
        .then((response)=> {
            console.log('IN VOTED PLAYERS .THEN')
          let returned_players = response && response.data && response.data.players_that_voted
          if (returned_players) {
            console.log('VOTED PLAYERS', returned_players)
            setPlayersThatVoted(returned_players)
          } 
        })
        .catch((error)=> {
          console.log(error)
        })
    }

    useEffect(()=>{
        getPlayers()
        getPlayersThatVoted()
        setInterval(getPlayers, 100000)
        setInterval(getPlayersThatVoted, 100000)
    },[])

    function getSelectedCards() {
        axios.get('/selectedcards/view')
        .then((response)=> {
          let selected_cards = response && response.data && response.data.selected_cards
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

    return (
        <div className='gamepage'>
            <h2> Welcome {user}</h2>
            {players && gameCode &&<h2>All users playing on code {gameCode}: {players}</h2>}
            {/* I had to set it up like this because app.jsx was rendering these components before my use effect was called so memes wasn't showing up as having been set yet */}
            
            <div className='memeContainer'>
                <MemeCard setRound={setRound} round = {round}/>
            </div>
            <div>
                {selectedCards.length > 0
                ? 
                    <div>
                    <h2>Selected Cards</h2>
                    <SelectedCardsComp selectedCards={selectedCards} players={players} round= {round} playersThatVoted= {playersThatVoted} user={user}/>
                    <Hand whoAmI={whoAmI} round={round} setGameCode={setGameCode} hand={hand} setHand={setHand} gameCode={gameCode}/>
                    <Button onClick={leaveGame}>Leave Game</Button>
                    </div>
                :
                    <div>    
                        <Hand whoAmI={whoAmI} round={round} setGameCode={setGameCode} hand={hand} setHand={setHand} gameCode={gameCode}/>
                        <Button onClick={leaveGame}>Leave Game</Button>
                    </div>
                }
            </div>   
        </div>
    )
}

export default GamePage