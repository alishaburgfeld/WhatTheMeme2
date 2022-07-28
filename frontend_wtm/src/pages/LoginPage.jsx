
import { useEffect, useState } from 'react'
import getCSRFToken from "../utils"
import axios from 'axios'

function LoginPage (){
    axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();
    const [user, setUser] = useState(null)

    const submitSignupForm = function(event) {
        event.preventDefault()
        axios.post('/signup', {email: 'jeff@amazon.com', password: 'dragons'}).then((response)=> {
        console.log('response from server:', response)
        })
    }

   // normally wouldn't hardcode the values like this
   const submitLogin = function(event) {
    event.preventDefault()
    axios.post('/login', {email: 'jeff@amazon.com', password: 'dragons'}).then((response)=> {
      console.log('response from server:', response)
      window.location.reload()
      // so that we can get the CSRF token
    })
    
  }
  const submitLogOut = function(event) {
    event.preventDefault()
    axios.post('/logout').then((response)=> {
      console.log('response from server:', response)
      whoAmI()
      // this will set the user to undefined after logout
    })
  }

  const whoAmI = async () => {
    const response = await axios.get('/whoami')
    // accessing the first element b/c he knows his response is only sending the one back
    const user = response.data && response.data[0] && response.data[0].fields
    // the && will make it so it doesn't throw an error, so if their isn't any response.data and response.data.fields it will just make user undefined
    console.log('user from whoami:', user)
    console.log('response from whoami:', response)
    setUser(user)
    }

  // on page load we run whoAmI to set the user
  useEffect(()=> {
    whoAmI()
  }, [])

  // better to use async await, but he was lazy above so didn't

    return (
        <div>
            { user && <p>Welcome, {user.email}</p>}
            <button onClick = {submitSignupForm}> Sign up</button>
            <button onClick = {submitLogin}> Login</button>
            <button onClick = {submitLogOut}> Log out</button>
        </div>
    )
}

export default LoginPage