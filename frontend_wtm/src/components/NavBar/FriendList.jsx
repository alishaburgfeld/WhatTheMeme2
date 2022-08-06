import axios from 'axios'
import { useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FriendList ({user}) {

    const [friends, setFriends] = useState(undefined)

    const getFriendList = async (user_email) => {
        // console.log('I AM IN get Friend List', user_email)
        const response = await axios.get('/friendlist' )
        // console.log('friendlist response.data:', response.data)
        return response
    }


    useEffect(()=> {
        let friendList = getFriendList(user)
        friendList.then((response)=>{
            console.log('.data.friends line 26' , response.data.friends)
            let newList = response.data.friends
            setFriends(newList)
        })
        // console.log('friend list newList', newList)
        
    }, [])

    const removeFriend = async (user_email, friend_email) => {
        // console.log('I AM IN REMOVE Friend on react', user_email, 'friend:', friend_email)
        const response = await axios.put('/removefriend/', {friend_email: friend_email})
        // console.log('remove friend response', response)
        // console.log('request emails', response.data.friend_requests)
        return response
    }

    const createFriendRequest = async (event) => {
        let friend_email = event.target[0].value
        // console.log('I AM IN CREATE  Friend Requests on react', 'friend:', friend_email)
        const response = await axios.put('/friendrequests/create', {friend_email: friend_email})
        // console.log('friend Requests response', response)
        // console.log('request emails', response.data.friend_requests)
        return response.data.friend_requests
    }

    return (
        <div>
        {friends != undefined
            ?
            <div>
            {friends.map((friend) => (
                <NavDropdown.Item>{friend}<Button onClick={()=>{removeFriend(user,friend)}}>Delete</Button></NavDropdown.Item>
                ))
            }
            </div>
            : <NavDropdown.Item>"Please add a friend"</NavDropdown.Item>
            }
            <NavDropdown.Divider />
            <NavDropdown.Item>
                <Form onSubmit={createFriendRequest}>
                    <Form.Group className="mb-3" controlId="formEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Button  variant="primary" type="submit">Add Friend </Button>
                    </Form.Group>
                </Form>
            </NavDropdown.Item>
        </div>
    )
}

export default FriendList