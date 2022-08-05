import 'axios'
import {useNavigate } from 'react-router-dom'


function Logout() {

    const nav= useNavigate()

    const submitLogOut = function(event) {
        // console.log('REACT LOGOUT REQUEST')
        event.preventDefault()
        axios.post('/logout').then((response)=> {
          whoAmI()
          nav("/");
        })
    }
    return (
        <Button onClick={submitLogOut}>Log Out</Button>
    )
}
  
export default Logout
