import axios from 'axios'

// rememeber all asynch await returns promise so on actual page need to do a .then!



// const joinGame = async () => {
//     console.log('I AM IN JOIN game react')
//     const response = await axios.put('/joingame' )
//     console.log('JOINgame response', response)
//     return response
// }

const leaveGame = async (nav) => {
    console.log('I AM IN LEAVE game react')
    const response = await axios.put('/leavegame' )
    console.log('LEAVEgame response', response)
    return response
    
}


export {
    // joinGame,
    leaveGame
}