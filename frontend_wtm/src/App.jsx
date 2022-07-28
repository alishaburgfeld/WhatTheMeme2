// added a "watch" script in package.json so that any time we change our javascript the sytem will automatically run the "build" script so taht we can see updates in our react output
import { useEffect, useState } from 'react'
// use {thing to be imported} when there are a lot of things to be imported from that file.
//when using the "export default" this allows you n ot to use the {} on the thing you're importing
import './App.css'
import axios from 'axios'

import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'




function App() {
  
    
 
  
  

  return (
    <div className="App">
      <HomePage />
      <LoginPage />
      <br></br>
      <GamePage />
    </div>
  )
}

export default App
