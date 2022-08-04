import axios from 'axios'
// rememeber all asynch await returns promise so on actual page need to do a .then!


const startGame = async () => {
    console.log('I AM IN start game react')
    const response = await axios.post('/startgame' )
    console.log('startgame response', response)
    return response
}

const joinGame = async () => {
    console.log('I AM IN JOIN game react')
    const response = await axios.put('/joingame' )
    console.log('JOINgame response', response)
    return response
}

const leaveGame = async () => {
    console.log('I AM IN LEAVE game react')
    const response = await axios.put('/leavegame' )
    console.log('LEAVEgame response', response)
    return response
}


export {
    startGame,
    joinGame,
    leaveGame
}