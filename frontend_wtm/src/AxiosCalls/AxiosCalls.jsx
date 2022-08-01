
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import getCSRFToken from "../utils"

const nav= useNavigate()

const submitLogIn = (event) => {
    event.preventDefault();
    console.log('submitted LOGIN: ' + event.target[0].value , event.target[1].value);
    // console.dir(event.target)
    axios.post('/login', {
    'email': event.target[0].value,
    'password': event.target[1].value
    }).then((response) => {
        console.log('YOU ARE IN THE REACT .THEN RESPONSE FROM LOGIN')
        console.log(response.data)
        // window.location.href= '/#/game'
        nav("/game");

        // reload so that we can get the CSRF token
        //need to add a catch or an "if not successful"
    })
}

axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();


const whoAmI = async (user, setUser) => {
  const response = await axios.get('/whoami')
  console.log('whoamI response.data:', response.data)
  let newUser = response.data && response.data[0] && response.data[0].fields
  console.log('user from whoami:', user)
  // console.log('response from whoami:', response)
  setUser(newUser)
}

const submitLogOut = function(event, user, setUser) {
    console.log('REACT LOGOUT REQUEST')
    event.preventDefault()
    axios.post('/logout').then((response)=> {
      console.log('REACT .THEN response from LOGOUT:', response)
      whoAmI()
      // whoAmI will set the user to undefined after logout
      //need to set up some sort of "you are logged out message, eventually will redirect to login"
      //also need to handle error
    })
}

const submitSignUp = (event) => {
    event.preventDefault();
    console.log('submitted: ' + event.target[0].value , event.target[1].value);
    // console.dir(event.target)
    axios.post('/signup', {
    'email': event.target[0].value,
    'password': event.target[1].value
    }).then((response) => {
        console.log('YOU ARE IN THE REACT .THEN RESPONSE FROM SIGN UP')
        console.log(response.data)
        nav("/login")
    })
}

export {
    submitLogOut,
    submitLogIn,
    whoAmI,
    submitSignUp
}