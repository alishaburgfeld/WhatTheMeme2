import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react';


function Logout({whoAmI, user}) {

    const nav= useNavigate()
    const [userEmail, setUserEmail] = useState(null)

    useEffect(()=> {
        console.log('IN LOGOUT USE EFFECT')
        let nowUser= ""
        nowUser+=user
        setUserEmail(nowUser)
    }, [])
    

    const submitLogOut = function() {
        axios.post('/logout').then((response)=> {
            console.group('LOGOUT RESPONSE', response)
          whoAmI()
          nav("/");
        })
    }
    const delete_game_user= function () {
        // setTimeout(code, delay)
        console.log('IN DELETE GAME USER FUNCTION, USER EMAIL SHOULD BE A USERS EMAIL', userEmail)
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
