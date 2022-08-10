// import Table from 'react-bootstrap/Table'

// function PlayerStatus({players, playersThatVoted, selectedCards}) {
//     return (
//                 <div>
//                     {players
//                     ?
//                     <div>
//                         <h2>Game: {gameCode}</h2>
//                         <h2>Player Status</h2>
//                         <Table striped size="sm">
//                         <thead>
//                             <tr>
//                             <th></th>
//                             {players && players.map((player) => (
//                                 <th>{player.email}</th>
//                             ))
//                             }
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                             <td>Selected a Card?</td>
//                             {players && players.map((player) => (
//                                 // logic for if the player has selected a card. "Y" if they have "N" if they havent
//                                 // maybe separate function/component?
//                                 <td>{player.___}</td>
//                             ))
//                             }
//                             </tr>
//                             <tr>
//                             <td>Voted?</td>
//                             {players && players.map((player) => (
//                                 //sort players that have voted and players to make sure they line up. then yes or no
//                                 <td>{player.email}</td>
//                             ))
//                             }
//                             </tr>
//                             <tr>
//                             {players && players.map((player) => (
//                                 <td>{player.points}</td>
//                             ))
//                             }
//                             </tr>
//                         </tbody>
//                         </Table>
//                     </div>
//                     :
//                     ""

//                     }
//                 </div>
//     )
// }

// export default PlayerStatus

// //                                         Player Status
// //                         player1         player 2
// // selected card?              Y
// // voted?                      N
// // points?                     2