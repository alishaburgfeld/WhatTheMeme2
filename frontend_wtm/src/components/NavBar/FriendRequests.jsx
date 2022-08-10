import axios from 'axios'
import { useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button';

function FriendRequests({user, stopClick}) {

    const [friendRequests, setFriendRequests] = useState(undefined)

    const getFriendRequests = async () => {
        const response = await axios.get('/friendrequests/view')
        return response
    
        //is array
    }
    const acceptFriendRequest = async (user_email, friend_email) => {
        const response = await axios.put('/addfriend/', {friend_email: friend_email})
        return response
    }
    
    const declineFriendRequest = async (user_email, friend_email) => {
        const response = await axios.put('/friendrequests/decline', {friend_email: friend_email})
        return response
    }

    useEffect(()=> {
        let friendrequests = getFriendRequests(user)
        friendrequests.then((response)=> {
            let newList=response.data.friend_requests
            setFriendRequests(newList)
        })
    }, [])


    return (
        <div>
        {friendRequests
        ? 
            <div>
            {friendRequests.map((friendRequest) => (
                <NavDropdown.Item>{friendRequest}<Button onClick={()=>{acceptFriendRequest(user,friendRequest)}} >Accept</Button><Button onClick={()=>{declineFriendRequest(user,friendRequest)}} >Decline </Button></NavDropdown.Item>
                ))
            }
            </div>
        : <NavDropdown.Item  onClick = {stopClick}>No pending requests</NavDropdown.Item>
        }
        </div>
    )
}

export default FriendRequests