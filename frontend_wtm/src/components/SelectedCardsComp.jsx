// import axios from 'axios'
import {useState, useEffect} from 'react'
import VotingCards from './VotingCards';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

function SelectedCardsComp({selectedCards, players, round, user}) {

    const [notAllSelected, setNotAllSelected] = useState(true)
    const [votingComplete, setVotingComplete] = useState(false)
    const [alerted,setAlerted] = useState(false)
    // const [cardsTied,setCardsTied] = useState(null)
    const [winningCard, setWinningCard] = useState(null)
    // const [roundWinner, setroundWinner] = useState(null)

    
    //checks if all users have voted
    function CountVotes() {
        console.log('in count votes')
        if (!notAllSelected) {
            //only checks the votes if all cards have been selected
            let totalVotes = 0
            for (let card of selectedCards) {
                totalVotes+= card.votes
            }
            if (totalVotes === players.length) {
                console.log('all players have voted. total votes = total players', totalVotes)
                setVotingComplete(true)
                // window.alert('All players have voted Here is the winning card!')
                if (!alerted) {

                    window.alert('All players have voted!')
                    setAlerted(true)
                }
            }
        }
    }

    useEffect(()=> {
        console.log('IN COUNT VOTES USE EFFECT')
        // can I set up the useEffect like this?
        // checks votes on render and whenever selectedCards is updated (which should be every 10sec interval)
        if (!notAllSelected) {
            CountVotes()
        }
        if (votingComplete) {
            CheckWinningCard()
        }
        if (winningCard) {
            sendWinningCard()
        }
    }, [selectedCards])

    function CheckWinningCard() {
        console.log('IN CHECK WINNING CARD')
        let highestVotes = 0
        let highestCards = []
        let highestVotedCard
        if (votingComplete) {
            for (let card of selectedCards) {
                if (card.votes > highestVotes) {
                    highestVotes = card.votes
                }
            }
            for (let card of selectedCards) {
                if (card.votes===highestVotes) {
                    highestCards.push(card)
                }
            }
            if (highestCards.length === 1) {
                highestVotedCard= highestCards[0]
            }
            else {
                // will alert the user if there was a tie and that a winning card is randomly selected
                setCardsTied(true)
                let randomIndex = Math.random()*highestCards.length()
                highestVotedCard= highestCards[randomIndex]
            }
            setWinningCard(highestVotedCard)
        }
    }   

    function sendWinningCard() {
    // this will send the winning card to DB so DB can give the owner a point
        if (winningCard) {
            console.log('IN SEND WINNING CARD', winningCard)
            axios.post('/points', {'winningCard': winningCard})
            .then((response)=> {
                console.log('sendwinningcard response', response)
                //grab the owner from the database and alert the users that that player has received a point... later would add CSS to just show the winning card
                //this is probably wrong:
                // let winner = response.data.game_user.email
                // setroundWinner(winner)
            })
            .catch((error)=> {
                console.log(error)
            })
        }
    }


    
    function flipCards() {
        //flip cards once every player has selected one
        console.log('NOW IN FLIP CARDS')
        // console.log(selectedCards.length, 'players length', players.length)
        if (selectedCards.length === players.length) {
            setNotAllSelected(false)
        }
        // const card = document.getElementByClassName('votingcards')
    }
    
    useEffect(()=>{
        if (user && notAllSelected) {
            console.log('IN SELECTED CARDS USE EFFECT')
            flipCards()
            setInterval(flipCards, 10000)
            if (round===1) {
                window.alert('All players have selected a card, vote for the funniest meme-card pair!')
            }
        }
        // need to set interval to do this every 5 seconds
    },[])


    return (
        <Container>
            <Row>
                {selectedCards && selectedCards.map((card) => (
                    <VotingCards key = {card.id} {...card} notAllSelected={notAllSelected} round={round} winningCard={winningCard}/>
                ))
                }
            </Row>
        </Container>
    )
}

// pass voting complete to this element... or may need to start here. 
// if there is a tie notify the user a tie on the vote so randomly selected a winner between the (2, 3)


export default SelectedCardsComp

