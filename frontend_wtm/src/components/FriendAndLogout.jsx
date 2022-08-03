import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import {getFriendList, getFriendRequests, createFriendRequest, acceptFriendRequest, removeFriend, declineFriendRequest} from '../AxiosCalls/AxiosCalls'
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form';



function FriendAndLogout({user, whoAmI}) {

    const nav= useNavigate()


    const [friends, setFriends] = useState(undefined)
    const [friendRequests, setFriendRequests] = useState(undefined)

    useEffect(()=> {
        let friendList = getFriendList(user)
        friendList.then((response)=>{
            console.log('.data.friends line 26' , response.data.friends)
            let newList = response.data.friends
            setFriends(newList)
        })
        // console.log('friend list newList', newList)
        
    }, [])

    useEffect(()=> {
        // console.log('friend request page user')
        let friendrequests = getFriendRequests(user)
        friendrequests.then((response)=> {
            let newList=response.data.friend_requests
            setFriendRequests(newList)
        })
    }, [])

    const submitLogOut = function(event) {
        // console.log('REACT LOGOUT REQUEST')
        event.preventDefault()
        axios.post('/logout').then((response)=> {
          whoAmI()
          nav("/");
        })
    }

    // console.log('FRIEND REQUESTS UPDATE', friendRequests)
    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Friends</Accordion.Header>
                    <Accordion.Body>
                    {friends != undefined
                    ? 
                    <ListGroup>
                        {friends.map((friend) => (
                            <ListGroupItem>{friend}<Button onClick={()=>{removeFriend(user,friend)}}>Delete</Button></ListGroupItem>
                            ))
                        }
                    </ListGroup>
                    : "Please add a friend"
                    }
                    <Form onSubmit={createFriendRequest}>
                        <Form.Group className="mb-3" controlId="formEmail" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Button  variant="primary" type="submit">Add Friend </Button>
                        </Form.Group>
                    </Form>
                    
                    {/* make a form for inputing the user */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Pending Friend Requests</Accordion.Header>
                    <Accordion.Body>
                    {friendRequests != undefined
                    ? 
                    <ListGroup>
                        {friendRequests.map((friendRequest) => (
                            <ListGroupItem>{friendRequest}<Button onClick={()=>{acceptFriendRequest(user,friendRequest)}}>Accept</Button><Button onClick={()=>{declineFriendRequest(user,friendRequest)}}>Decline </Button></ListGroupItem>
                            ))
                        }
                    </ListGroup>
                    : "No pending requests"
                    }
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Log Out</Accordion.Header>
                    <Accordion.Body><Button onClick={submitLogOut}>Log Out!</Button></Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Lobby</Accordion.Header>
                    <Accordion.Body><Link to={"/"} >Lobby</Link></Accordion.Body>
                </Accordion.Item>
            </Accordion> 
        </div>
    )
}

export default FriendAndLogout

