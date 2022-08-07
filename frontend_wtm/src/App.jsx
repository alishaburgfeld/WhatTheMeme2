// added a "watch" script in package.json so that any time we change our javascript the sytem will automatically run the "build" script so taht we can see updates in our react output
import { useEffect, useState } from 'react'
// use {thing to be imported} when there are a lot of things to be imported from that file.
//when using the "export default" this allows you n ot to use the {} on the thing you're importing
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import NavBar from './components/NavBar/Navbar'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import getCSRFToken from './utils'
import BackgroundMapper from './components/BackgroundMapper'



function App() {
  const [user, setUser] = useState(null)  
  const [gameUser, setGameUser] = useState(null)  
  axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();

  const whoAmI = async () => {
    console.log('I AM IN WHO AM I')
    const response = await axios.get('/whoami')
    const newUser = response.data && response.data.email
    console.log('USER EMAIL in WHO AM I:', newUser)
    // console.log('response from whoami:', response)
    if (response.data.game_user==='True') {
      setGameUser(newUser)
    }
    setUser(newUser)
  }


  return (
    <div className="App">
      
      <Router> 
        <NavBar whoAmI={whoAmI} user = {user} gameUser = {gameUser}/>
        <Routes>
          <Route path='/' element={<HomePage whoAmI={whoAmI} user = {user}/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element = {<SignUpPage />} />
          <Route path='/game' element = {<GamePage user={user} whoAmI={whoAmI}/>} />
          <Route path='/draft' element = {<BackgroundMapper/>} />
        </Routes>
      </Router> 
    </div>
  )
}

export default App
