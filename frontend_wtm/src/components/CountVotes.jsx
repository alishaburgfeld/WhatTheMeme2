// import axios from 'axios'
// import { useEffect, useState } from 'react'

// const [votingComplete, setVotingComplete] = useState(false)
// const [cardsTied,setCardsTied] = useState(null)
// const [winningCard, setWinningCard] = useState(null)
// const [roundWinner, setroundWinner] = useState(null)

// //checks if all users have voted
// function CountVotes() {
//     let totalVotes = 0
//     for (let card of selectedCards) {
//         totalVotes+= card.votes
//     }
//     if (totalVotes === players.length) {
//         setVotingComplete(true)
//          window.alert('All players have voted Here is the winning card!')
//     }
// }

// function WinningCard() {
//     let highestVotes = 0
//     let highestCards = []
//     let highestVotedCard
//     if (votingComplete) {
//         for (let card of selectedCards) {
//             if (card.votes > highestVotes) {
//                 highestVotes = card.votes
//             }
//         }
//         for (let card of selectedCards) {
//             if (card.votes===highestVotes) {
//                 highestCards.push(card)
//             }
//         }
//         if (highestCards.length === 1) {
//             highestVotedCard= highestCards[0]
//         }
//         else {
//             // will alert the user if there was a tie and that a winning card is randomly selected
//             setCardsTied(true)
//             let randomIndex = Math.random()*highestCards.length()
//             highestVotedCard= highestCards[randomIndex]
//         }
//         return highestVotedCard
//         setWinningCard(highestVotedCard)
//     }
// }

// // after assigning points this is the last thing that needs to happen before the round resets
// function sendWinningCard() {
//     // this will send the winning card to DB so DB can give the owner a point
//     console.log('IN SEND WINNING CARD', winningCard)
//     axios.post('/points', {'winningCard': winningCard})
//     .then((response)=> {
//         console.log('sendwinningcard response', response)
//         //grab the owner from the database and alert the users that that player has received a vote... later would add CSS to just show the winning card
//         //this is probably wrong:
//         // let winner = response.data.game_user.email
//         // setroundWinner(winner)
//     })
//     .catch((error)=> {
//         console.log(error)
//     })
// }



