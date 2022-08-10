import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'


function Logout({whoAmI}) {

    const nav= useNavigate()

    const submitLogOut = function(event) {
        // console.log('REACT LOGOUT REQUEST')
        event.preventDefault()
        axios.post('/logout').then((response)=> {
          whoAmI()
          nav("/");
        //   set game to null
        // set all states to null
        })
    }
    return (
        <Button onClick={submitLogOut}>Log Out</Button>
    )
}
  
export default Logout
