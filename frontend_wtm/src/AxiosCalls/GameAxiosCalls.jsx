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
    // nav=('/')
    
}

// const sendResetRound = function (code) {
//     console.log('I AM IN SEND RESET ROUND, CODE IS', code)
//     const response =axios.post('/round/reset',{code:code})
//     // console.log('RESET ROUND response', response)
//     // nav=('/')
//     return response
    
// }

// const sendResetRound = async (code) => {
//     console.log('I AM IN SEND RESET ROUND, CODE IS', code)
//     const response = await axios.post('/round/reset',{code:code})
//     // console.log('RESET ROUND response', response)
//     // nav=('/')
//     return response
    
// }



export {
    // joinGame,
    leaveGame,
    // sendResetRound
}