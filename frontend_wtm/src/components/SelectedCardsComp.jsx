import axios from 'axios'
import {useEffect, useRef} from 'react'
import VotingCards from './VotingCards';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

function SelectedCardsComp({selectedCards, players, round, user, winnerAlerted, setWinnerAlerted, notAllSelected, setNotAllSelected, votingComplete, setVotingComplete, alerted, setAlerted, cardsTied, setCardsTied, winningCard, setWinningCard, roundWinner, setRoundWinner, notSent, setNotSent, userHasVoted, setUserHasVoted}) {

    let firstRender = useRef(true)

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
                console.log('all players have voted. total votes', totalVotes, '= total players', players.length)
                setVotingComplete(true)
                if (!alerted) {
                    window.alert('All players have voted!')
                    setAlerted(true)
                }
            }
        }
    }

    useEffect(()=> {
        // checks votes on render and whenever selectedCards is updated (which should be every 10sec interval)
        if (!notAllSelected && !votingComplete) {
            CountVotes()
        }
        if (votingComplete && notSent) {
            CheckWinningCard()
        }
        if (winningCard && notSent) {
            sendWinningCard()
        }
        if (!notSent) {
            alertWinner()
        }
    }, [selectedCards])

    //figures out which card won with the votes
    function CheckWinningCard() {
        let highestVotes = 0
        let highestCards = []
        let highestVotedCard
        if (votingComplete) {
            console.log('IN CHECK WINNING CARD and voting is complete')
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
                //this doesn't work because each user is running it and the tie breaker could change with each user. would need to do this in the database
                setCardsTied(true)
                let randomIndex = Math.floor(Math.random()*highestCards.length)
                highestVotedCard= highestCards[randomIndex]
                console.log('index', randomIndex, 'highest cards array', highestCards, 'highestvotedcard', highestVotedCard)
            }
            setWinningCard(highestVotedCard)
        }
    }   


    // this will send the winning card to DB so DB can give the owner a point
    function sendWinningCard() {
        if (winningCard && notSent) {
            let card_id = Number(winningCard.id)
            axios.post('/points', {'winningCard': card_id})
            .then((response)=> {
                console.log('sendwinningcard response', response)
                let winner = response && response.data && response.data.winningCardOwner
                setRoundWinner(winner)
                setNotSent(false)
            })
            .catch((error)=> {
                console.log(error)
            })
        }
    }
    
    //alerts who won the round
    function alertWinner() {
        if (!winnerAlerted) {
            console.log('IN ALERT WINNER')
            if (cardsTied && roundWinner) {
                if (round ===1) {

                    window.alert(`There was a tie! The winning card was randomly selected between them and ${roundWinner} won the round. Flip over the next meme to start the next round.`)
                }
                else {
                    window.alert(`There was a tie! The winning card was randomly selected between them and ${roundWinner} won the round.`)
                }
            }
            else if (roundWinner){
                if (round ===1) {

                    window.alert(`${roundWinner} won the round with the funniest meme! Flip over the next meme to start the next round.`)
                }
                else {
                    window.alert(`${roundWinner} won the round with the funniest meme!`)
                }
            }
            setWinnerAlerted(true)
        }    
    }
    
    
    //flip cards once every player has selected one
    function flipCards() {
        console.log('NOW IN FLIP CARDS, selected cards length', selectedCards.length, 'players length', players.length)
        if (selectedCards.length>0 && (selectedCards.length === players.length)) {
            // all cards have now been selected
            setNotAllSelected(false) 
            if (round===1) {
                window.alert('All players have selected a card, vote for the funniest meme-card pair!')
            }
        }
    }
    
    useEffect(()=>{
        if (user && notAllSelected) {
            console.log('IN SELECTED CARDS/FLIP CARDS USE EFFECT line 138-->flip cards checks if all cards have been selected')
            flipCards()
        }
    },[selectedCards])


    return (
        <Container>
            <Row className= 'd-flex justify-content-center'>
                {selectedCards && selectedCards.map((card) => (
                    <VotingCards key = {card.id} {...card} notAllSelected={notAllSelected} round={round} winningCard={winningCard} userHasVoted={userHasVoted} setUserHasVoted={setUserHasVoted}/>
                ))
                }
                {/* {notSent? <h2>Winning card hasn't been sent</h2> : <h2>Winning card has been sent</h2>} */}
            </Row>
        </Container>
    )
}


export default SelectedCardsComp

