// added a "watch" script in package.json so that any time we change our javascript the sytem will automatically run the "build" script so taht we can see updates in our react output
import { useEffect, useState } from 'react'
// use {thing to be imported} when there are a lot of things to be imported from that file.
//when using the "export default" this allows you n ot to use the {} on the thing you're importing
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'

import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import getCSRFToken from './utils'



function App() {
  const [user, setUser] = useState(null)  
  axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();

  const whoAmI = async () => {
    console.log('I AM IN WHO AM I')
    const response = await axios.get('/whoami')
    console.log('whoamI response.data:', response.data)
    let newUser = response.data && response.data[0] && response.data[0].fields
    console.log('user from whoami:', newUser)
    // console.log('response from whoami:', response)
    setUser(newUser)
  }
  
  useEffect(()=> {
    console.log('IN USE EFFECT')
      whoAmI()
  }, [])

  return (
    <div className="App">
      <div> Hello </div>
      <Router> 
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage setUser = {setUser} user = {user} whoAmI= {whoAmI}/>} />
          <Route path='/signup' element = {<SignUpPage />} />
          <Route path='/game' element = {<GamePage whoAmI = {whoAmI}/>} />
        </Routes>
      </Router> 
    </div>
  )
}

export default App
