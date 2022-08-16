import axios from 'axios'
import { useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import emailjs from '@emailjs/browser';
// npm install @emailjs/browser --legacy-peer-deps

function FriendList ({user, game, stopClick}) {

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
        window.location.reload(false);
        return response
        
    }

    const createFriendRequest = async (event) => {
        let friend_email = event.target[0].value
        const response = await axios.put('/friendrequests/create', {friend_email: friend_email})
        return response.data.friend_requests
    }

    const sendEmail = (event, email) => {
        event.preventDefault();
        if(!game) {
            window.alert('Start or join a game before sending the code')
        }
        else {

            // public key:
            emailjs.init('-RSYFCfcYI3BnHPn_');
            const friend_email = email
            const code = game.code
            const user_email = user
            console.log('IN SENDEMAIL-- FRIEND EMAIL:', friend_email, 'code:', code, 'user_email', user_email)
            emailjs.send('service_dxrbdej', 'WhatTheMemeEmail_form', {
                user_email: user_email,
                friend_email: friend_email,
                code: code
            })
            .then((response) => {
                console.log('send email response', response);
                window.alert('Email sent!')
            })
            .catch((error) => {
                console.log('ERROR:', error);
            })
        }
    }

    return (
        <>
        {friends != undefined
            ?
            <>
            {friends.map((friend) => (
                <NavDropdown.Item  onClick = {stopClick}>{friend}<br /><Button className='mx-1 small-button' onClick={(event)=>{sendEmail(event, friend)}}>Send Code</Button><Button className='small-button' onClick={()=>{removeFriend(user,friend)}}>Delete</Button></NavDropdown.Item>
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
                    <Button  variant="primary" type="submit"  className='small-button' onClick = {stopClick}>Add New Friend </Button>
                    </Form.Group>
                </Form>
            </NavDropdown.Item>
        </>
    )
}

export default FriendList