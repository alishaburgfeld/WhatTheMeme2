import axios from 'axios'
import {useNavigate } from 'react-router-dom'
// rememeber all asynch await returns promise so on actual page need to do a .then!

// const nav= useNavigate()

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
    nav("/")
    return response
    
}


export {
    startGame,
    joinGame,
    leaveGame
}