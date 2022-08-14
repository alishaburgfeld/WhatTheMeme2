import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
// import {leaveGame, sendResetRound } from '../AxiosCalls/GameAxiosCalls'
import {leaveGame} from '../AxiosCalls/GameAxiosCalls'
import {Hand} from '../components/Hand'
import MemeCard from '../components/MemeCard'
import SelectedCardsComp from '../components/SelectedCardsComp'
import PlayerPoints from '../components/PlayersPoints'


// https://stackoverflow.com/questions/51199077/request-header-field-x-csrf-token-is-not-allowed-by-access-control-allow-headers
function GamePage ({user, whoAmI, hand, setHand, game}){


    const [round, setRound] = useState(1)
    const [selectedCards, setSelectedCards] = useState([])
    // array of arrays. for player of players--->player[0] is their email player [1] is their points
    const [players, setPlayers] = useState([])
    const [playersThatVoted, setPlayersThatVoted] = useState(null)
    const [game_users, setGame_users] = useState(null)
    //checks if the users have been alerted of the round winner
    const [winnerAlerted,setWinnerAlerted] = useState(false)
    const [memeIsActive, setMemeIsActive] = useState(true)
    const [userSelected, setUserSelected] = useState(false)
    const [userHasVoted, setUserHasVoted] = useState(false)
    const [isWinningCard, setIsWinningCard] = useState(false)
    const [notAllSelected, setNotAllSelected] = useState(true)
    const [votingComplete, setVotingComplete] = useState(false)
    //checks if users have been alerted that all players have finished voting
    const [alerted,setAlerted] = useState(false)
    //checks if there was a tie between the winning cards
    const [cardsTied,setCardsTied] = useState(null)
    //checks for the winning card
    const [winningCard, setWinningCard] = useState(null)
    const [roundWinner, setRoundWinner] = useState(null)
    // checks if the winning card has been set up
    const [notSent, setNotSent] = useState(true)    
    let firstRender = useRef(true)

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

    useEffect(()=> {
      if (firstRender.current) {
        console.log("resetround first render")
        firstRender.current=false
      }
      else {
        console.log('IN RESET ROUND USE EFFECT ELSE')
        if (winnerAlerted) {
          console.log('in reset round use effect 2nd render - should be based on winnerAlerted')
          resetRound()
          firstRender.current=true
          // I'm not sure if I would set this to false or true at this point
        }
      }
    }, [winnerAlerted])

    

    //resets the round in the DB, gets a new card, and resets all states
    function resetRound() {
      console.log('IN RESET ROUND')
      //this resets the round in the DB and gets a new card
      let game_code = game.code
        if (game) {
          // sendReset.then(()=> console.log('SEND RESET ROUND AXIOS response', sendReset))
          axios.post('/round/reset',{code:game_code})
          .then((response)=> {
            console.log('SEND RESET ROUND AXIOS response', response)
            let drawn_card = response.data.drawn_card
            console.log('DRAWN CARD IS HERE', drawn_card)
            let new_hand = [...hand, drawn_card]
            getRound(game_code)
            setHand(new_hand)
            setSelectedCards([])
            setPlayers([])
            setPlayersThatVoted(null)
            setWinnerAlerted(false)
            setMemeIsActive(true)
            setUserSelected(false)
            setNotAllSelected(true)
            setVotingComplete(false)
            setAlerted(false)
            setCardsTied(null)
            setWinningCard(null)
            setRoundWinner(null)
            setNotSent(true)
            setUserHasVoted(false)
            setIsWinningCard(false)
            setNotAllSelected(true)
            
          })
          
        }
    }
    

    return (
      <>
        {game && user
          ?
          (
        <div className='gamepage'>
            <h2 className='welcome m-3'> Welcome {user}</h2>
            {/* {players && game &&<h2>All users playing on code {JSON.stringify(game)}: {players}</h2>} */}
            {players && game && <div> <h3>All users playing on code {JSON.stringify(game.code)}:</h3> <PlayerPoints players={players} /></div>}
            {/* I had to set it up like this because app.jsx was rendering these components before my use effect was called so memes wasn't showing up as having been set yet */}
            
            <div className='memeContainer mt-5 d-flex justify-content-center align-text-center'>
                <MemeCard setRound={setRound} round = {round} memeIsActive={memeIsActive} setMemeIsActive={setMemeIsActive}/>
            </div>
            <div>
                {selectedCards.length > 0
                ? 
                    <div>
                    <h2 className='selected-title'>Selected Cards</h2>
                    <SelectedCardsComp selectedCards={selectedCards} players={players} round= {round} playersThatVoted= {playersThatVoted} user={user} winnerAlerted={winnerAlerted} setWinnerAlerted={setWinnerAlerted}
                    notAllSelected={notAllSelected} setNotAllSelected={setNotAllSelected} votingComplete={votingComplete} setVotingComplete={setVotingComplete} alerted={alerted} setAlerted={setAlerted} cardsTied={cardsTied} setCardsTied={setCardsTied} winningCard={winningCard} setWinningCard={setWinningCard} 
                    roundWinner={roundWinner} setRoundWinner={setRoundWinner} notSent={notSent} setNotSent={setNotSent} userHasVoted={userHasVoted} setUserHasVoted={setUserHasVoted} isWinningCard={isWinningCard} setIsWinningCard={setIsWinningCard}/>
                    <Hand whoAmI={whoAmI} round={round} hand={hand} setHand={setHand} user={user} userSelected={userSelected} setUserSelected={setUserSelected}/>
                    <Button onClick={leaveGame}>Leave Game</Button>
                    {!winnerAlerted ? <h4>Winner is NOT alerted</h4> : <h4>Winner IS alerted</h4>}
                    </div>
                :
                    <div>    
                        <Hand whoAmI={whoAmI} round={round} hand={hand} setHand={setHand} user={user} userSelected={userSelected} setUserSelected={setUserSelected}/>
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