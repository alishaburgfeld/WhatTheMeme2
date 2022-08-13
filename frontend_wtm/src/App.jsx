// added a "watch" script in package.json so that any time we change our javascript the sytem will automatically run the "build" script so taht we can see updates in our react output
import { useEffect, useState, useRef } from 'react'
// use {thing to be imported} when there are a lot of things to be imported from that file.
//when using the "export default" this allows you n ot to use the {} on the thing you're importing
// import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import NavBar from './components/NavBar/Navbar'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import getCSRFToken from './utils'
// import Draft from './components/Draft'
import { useNavigate } from "react-router-dom";




function App() {
  const [user, setUser] = useState(null)  
  const [gameUser, setGameUser] = useState(null)  
  const [hand, setHand] = useState(null)
  const [show, setShow] = useState(false);
  const [game, setGame] = useState(null)

  // const nav = useNavigate()

  let firstRender = useRef(true)

  axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();

  const whoAmI = async () => {
    const response = await axios.get('/whoami')
    const newUser = response.data && response.data.email
    if (response.data.game_user==='True') {
      setGameUser(newUser)
    }
    setUser(newUser)
  }

  const startGame = async function () {
    console.log('I AM IN START GAME ON REACT')
    axios.post('/startgame' )
    .then((response)=> {
      if (firstRender.current) {
        //if user joined game there is already a gamecode and they already have a hand
        if (hand) {
            whoAmI()
        }
        else {
            console.log('START GAME .THEN RESPONSE', response)
            let returned_game= response && response.data && response.data.game
            let new_game_code = returned_game.code
            console.log('GAME CODE IS: LINE 71 APPJSX', new_game_code)
            if (new_game_code) {
                window.alert(`Your game code is ${new_game_code}, send this to your friends for them to join your game`)
                setGame(returned_game)
            }
            let newhand = response && response.data && response.data.user_cards
            setHand(newhand)
            whoAmI()
            // nav('/game')
          }
        firstRender.current= false
      }
    })
  }


  return (
    <div className="App">
      
      <Router> 
        <NavBar whoAmI={whoAmI} user = {user} gameUser = {gameUser} setHand={setHand}/>
        <Routes>
          <Route path='/' element={<HomePage whoAmI={whoAmI} user = {user} hand={hand} setHand={setHand} setShow={setShow} show={show} startGame={startGame} game={game} setGame={setGame}/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element = {<SignUpPage />} />
          <Route path='/game' element = {<GamePage user={user} whoAmI={whoAmI} hand={hand} setHand={setHand} game={game}/>} />
          {/* <Route path='/draft' element = {<Draft/>} /> */}
        </Routes>
      </Router> 
    </div>
  )
}

export default App
