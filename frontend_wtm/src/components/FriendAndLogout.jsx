
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import {submitLogOut} from '../AxiosCalls'



function FriendAndLogout({user, setUser}) {
    const [friends, setFriends] = useState(null)
    useEffect(()=> {
        whoAmI(user, setUser)
    }, [])


    return (
        <div>
            <h3>Friend List</h3>
            
        </div>
    )
}

export default FriendAndLogout