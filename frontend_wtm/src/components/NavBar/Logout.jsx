import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';


function Logout({whoAmI, user}) {

    const nav= useNavigate()
    const [userEmail, setUserEmail] = useState(null)

    const submitLogOut = function() {
        // console.log('REACT LOGOUT REQUEST')
        let nowUser= user
        console.log('NOW USER LINE 15 ON LOGOUT', nowUser)
        setUserEmail(nowUser)
        axios.post('/logout').then((response)=> {
            console.group('LOGOUT RESPONSE', response)
          whoAmI()
          nav("/");
        //   set game to null
        // set all states to null
        })
    }
    const delete_game_user= function () {
        // setTimeout(code, delay)
        console.log('IN DELETE GAME USER FUNCTION, USER EMAIL SHOULD BE TRUE', userEmail)
        if (userEmail) {

            axios.put('/gameuser/delete', {user:userEmail}).then((response)=>console.log(response))
        }
    }

    return (
        // <Button onClick={submitLogOut}>Log Out</Button>
        <Button className="card-btn" onClick={()=>{submitLogOut(); delete_game_user();}}>Log Out</Button>
    )
}
  
export default Logout
