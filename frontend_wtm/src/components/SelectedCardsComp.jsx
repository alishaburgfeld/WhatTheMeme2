import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import VotingCards from './VotingCards';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

function SelectedCardsComp({selectedCards, players, round, user, winnerAlerted, setWinnerAlerted, notAllSelected, setNotAllSelected, votingComplete, setVotingComplete, alerted, setAlerted, cardsTied, setCardsTied, winningCard, setWinningCard, roundWinner, setRoundWinner, notSent, setNotSent, userHasVoted, setUserHasVoted}) {

    let firstRender = useRef(true)
    console.log(selectedCards, 'line 10')

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
        if (!notSent) {
            alertWinner()
            console.log('IN LINE 49 !notsent alert winner')
        }
    }, [selectedCards])
    // its giving the players a point every time it calls send winning card.

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
        if (winningCard && notSent) {
            console.log('IN SEND WINNING CARD ID:', winningCard.id)
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
    
    
    function flipCards() {
        //flip cards once every player has selected one
        console.log('NOW IN FLIP CARDS')
        console.log(selectedCards.length, 'players length', players.length)
        console.log(selectedCards, 'selectedCards line 145')

        if (selectedCards.length>0 && (selectedCards.length === players.length)) {
            // all cards have now been selected
            setNotAllSelected(false) 
            if (round===1) {
                window.alert('All players have selected a card, vote for the funniest meme-card pair!')
            }

        }
        // const card = document.getElementByClassName('votingcards')
    }
    
    useEffect(()=>{
        if (user && notAllSelected) {
            console.log('IN SELECTED CARDS USE EFFECT')
            flipCards()
            // running setInterval wasn't working b/c flipCards function for some reason wasn't getting the updated selectedCards values. so changed it to run when selectedcards value changed
            // setInterval(flipCards, 10000)
        }
        // need to set interval to do this every 5 seconds
    },[selectedCards])


    return (
        <Container>
            <Row className= 'd-flex justify-content-center'>
                {selectedCards && selectedCards.map((card) => (
                    <VotingCards key = {card.id} {...card} notAllSelected={notAllSelected} round={round} winningCard={winningCard} userHasVoted={userHasVoted} setUserHasVoted={setUserHasVoted}/>
                ))
                }
            </Row>
        </Container>
    )
}

// pass voting complete to this element... or may need to start here. 
// if there is a tie notify the user a tie on the vote so randomly selected a winner between the (2, 3)


export default SelectedCardsComp

