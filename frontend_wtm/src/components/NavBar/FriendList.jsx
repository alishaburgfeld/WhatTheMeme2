import axios from 'axios'
import { useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FriendList ({user, stopClick}) {

    const [friends, setFriends] = useState(undefined)

    const getFriendList = async (user_email) => {
        const response = await axios.get('/friendlist' )
        return response
    }


    useEffect(()=> {
        let friendList = getFriendList(user)
        friendList.then((response)=>{
            let newList = response.data.friends
            setFriends(newList)
        })
        
    }, [])

    const removeFriend = async (user_email, friend_email) => {
        const response = await axios.put('/removefriend/', {friend_email: friend_email})
        return response
    }

    const createFriendRequest = async (event) => {
        let friend_email = event.target[0].value
        const response = await axios.put('/friendrequests/create', {friend_email: friend_email})
        return response.data.friend_requests
    }

    return (
        <>
        {friends != undefined
            ?
            <>
            {friends.map((friend) => (
                <NavDropdown.Item  onClick = {stopClick}>{friend}<Button onClick={()=>{removeFriend(user,friend)}}>Delete</Button></NavDropdown.Item>
                ))
            }
            </>
            : <NavDropdown.Item  onClick = {stopClick}>"Please add a friend"</NavDropdown.Item>
            }
            <NavDropdown.Divider />
            <NavDropdown.Item  onClick = {stopClick}>
                <Form onSubmit={createFriendRequest} >
                    <Form.Group className="mb-3" controlId="formEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Button  variant="primary" type="submit"  onClick = {stopClick}>Add Friend </Button>
                    </Form.Group>
                </Form>
            </NavDropdown.Item>
        </>
    )
}

export default FriendList