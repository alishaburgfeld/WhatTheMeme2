import axios from 'axios'
import { useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button';

function FriendRequests({user, stopClick}) {

    const [friendRequests, setFriendRequests] = useState(undefined)

    const getFriendRequests = async () => {
        // console.log('I AM IN get Friend Requests on react', user_email)
        const response = await axios.get('/friendrequests/view')
        // console.log('friend Requests response:', response)
        return response
    
        //is array
    }
    const acceptFriendRequest = async (user_email, friend_email) => {
        // console.log('I AM IN ACCEPT Friend Requests on react', user_email, 'friend:', friend_email)
        const response = await axios.put('/addfriend/', {friend_email: friend_email})
        // console.log('add friend response', response)
        // console.log('request emails', response.data.friend_requests)
        return response
    }
    
    const declineFriendRequest = async (user_email, friend_email) => {
        // console.log('I AM IN DECLINE Friend Requests on react', user_email, 'friend:', friend_email)
        const response = await axios.put('/friendrequests/decline', {friend_email: friend_email})
        // console.log('decline friend response', response)
        // console.log('request emails', response.data.friend_requests)
        return response
    }

    useEffect(()=> {
        // console.log('friend request page user')
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