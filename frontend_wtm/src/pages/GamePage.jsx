import {useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {leaveGame } from '../AxiosCalls/GameAxiosCalls'
import {Hand} from '../components/Hand'
import MemeCard from '../components/MemeCard'
import SelectedCardsComp from '../components/SelectedCardsComp'
import PlayerPoints from '../components/PlayersPoints'


// https://stackoverflow.com/questions/51199077/request-header-field-x-csrf-token-is-not-allowed-by-access-control-allow-headers
function GamePage ({user, whoAmI, hand, setHand, game}){


    const [drawnCard, setDrawnCard] = useState(null)
    const [round, setRound] = useState(1)
    const [selectedCards, setSelectedCards] = useState([])
    // array of arrays. for player of players--->player[0] is their email player [1] is their points
    const [players, setPlayers] = useState([])
    const [playersThatVoted, setPlayersThatVoted] = useState(null)
    const [game_users, setGame_users] = useState(null)
    //checks if the users have been alerted of the round winner
    const [winnerAlerted,setWinnerAlerted] = useState(false)
    
    useEffect(()=> {
        whoAmI()
        // getRound()
        // setTimeout(getRound(), 5000)
    }, [])

    // only way I could get round to work was to put it on an interval too
    const roundInterval = ""
    useEffect(() => {
      const roundTimer = setTimeout(getRound(), 5000);
      const roundInterval = setInterval(getRound(), 20000)
      return () => {
        clearTimeout(roundTimer)
        clearInterval(roundInterval)
      }
    }, [hand]);

  const getRound= function() {
    console.log('in get round')
    if (hand) {
      let code = game.code
      console.log('CODE HERE HERE HERE', code)
      axios.put('/round',{code:code})
      .then((response)=> {
        let newRound= response && response.data && response.data.round
        console.log('ROUND RESPONSE,', newRound)
        setRound(newRound)
      })
    }
  }

  // useEffect(()=>{
  //   if (game) {
  //     getRound()
  //     setInterval(getGame, 100000)
  //   }
  // },[])

    function getPlayers() {
      console.log('IN GET PLAYRS')
        axios.get('/players')
        .then((response)=> {
          let returned_players = response && response.data && response.data.players
          let game_user_array = response && response.data && response.data.game_user_array
          console.log('RETURNED PLAYERS', returned_players, 'GAME USER ARRAY', game_user_array)
          // just returnes the users emails
          if (returned_players) {
            setPlayers(returned_players)
          } 
          // sets game users so I can access their properties
          if (game_user_array) {
            setGame_users(game_user_array)
          } 

        })
        .catch((error)=> {
          console.log(error)
        })
    }

    function getPlayersThatVoted() {
        console.log('IN GET PLAYERS THAT VOTED')
        axios.put('/votes/view', {round: round, game_code: game.code})
        .then((response)=> {
          let returned_players = response && response.data && response.data.players_that_voted
          if (returned_players) {
            // console.log('VOTED PLAYERS', returned_players)
            setPlayersThatVoted(returned_players)
          } 
        })
        .catch((error)=> {
          console.log(error)
        })
    }

    function getSelectedCards() {
      if (!winnerAlerted) {

        console.log('IN GET SELECTED CARDS')
          axios.get('/selectedcards/view')
          .then((response)=> {
            let selected_cards = response && response.data && response.data.selected_cards
            console.log('SELECTED CARDS LINE 70', selected_cards)
            if (selected_cards) {
              setSelectedCards(selected_cards)
            }
            
          })
          .catch((error)=> {
            console.log(error)
          })
      }
      }

    const cardsInterval = ""
    const playerInterval = ""
    const votedInterval = ""

    useEffect(()=>{
      if (hand && user) {
        if (!winnerAlerted) {
          getSelectedCards()
          const cardsInterval = setInterval(getSelectedCards, 10000)
        }
        
        getPlayers()
        getPlayersThatVoted()
        const playerInterval = setInterval(getPlayers, 100000)
        const votedInterval = setInterval(getPlayersThatVoted, 10000)
      }
    else {
      if (playerInterval!= "") {
        
        clearInterval(playerInterval, votedInterval, cardsInterval)
      }
    }

    },[hand])

    return (
      <>
        {game
          ?
          (
        <div className='gamepage'>
            <h2> Welcome {user}</h2>
            {/* {players && game &&<h2>All users playing on code {JSON.stringify(game)}: {players}</h2>} */}
            {players && game && <div> <h2>All users playing on code {JSON.stringify(game.code)}:</h2> <PlayerPoints players={players} /></div>}
            {/* I had to set it up like this because app.jsx was rendering these components before my use effect was called so memes wasn't showing up as having been set yet */}
            
            <div className='memeContainer'>
                <MemeCard setRound={setRound} round = {round}/>
            </div>
            <div>
                {selectedCards.length > 0
                ? 
                    <div>
                    <h2>Selected Cards</h2>
                    <SelectedCardsComp selectedCards={selectedCards} players={players} round= {round} playersThatVoted= {playersThatVoted} user={user} winnerAlerted={winnerAlerted} setWinnerAlerted={setWinnerAlerted}/>
                    <Hand whoAmI={whoAmI} round={round} hand={hand} setHand={setHand} user={user}/>
                    <Button onClick={leaveGame}>Leave Game</Button>
                    </div>
                :
                    <div>    
                        <Hand whoAmI={whoAmI} round={round} hand={hand} setHand={setHand} user={user}/>
                        <Button onClick={leaveGame}>Leave Game</Button>
                    </div>
                }
            </div>   
        </div>
          )
          : null
          }
      </>
    )
}

export default GamePage