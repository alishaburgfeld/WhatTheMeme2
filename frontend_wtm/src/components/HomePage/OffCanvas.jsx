import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { useState} from "react";
import {useNavigate } from 'react-router-dom'
import axios from 'axios'

// function handleShow() {
//     setShow(true);
// } 

function OffCanvas ({hand, setHand, setShow, show, whoAmI, setGame}) {
    const handleClose = () => setShow(false);
    
    const nav= useNavigate()

    const joinGame = (event) => {
        console.log('NOW IN JOINGAME')
        event.preventDefault()
        const game_code = document.getElementById('formCode').value
        console.log('FORM CODE IS', game_code)
        axios.post('/joingame', {game_code: game_code})
            .then((response) => {
                console.log('response from joingame: ', response)
                console.log('SUCCESS TYPE', typeof(response.data.success), 'success?', response.data.success)
                if (response.data.success=='True') {
                    // === wasn't working here
                    let game = response && response.data && response.data.game
                    setGame(game)
                    let newhand = response && response.data && response.data.user_cards
                    setHand(newhand)
                    whoAmI()
                    if (game) {
                        nav('/game')
                    }
                }
                else {
                    window.alert('There is nobody playing on that game code, please try again or start a game')
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }


    return (
        <Offcanvas show={show} onHide={handleClose} className='join-game-off-canvas'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='off-canvas-title'>Game Code</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Form.Group className="mb-3 fs-sm" controlId="formCode">
                        <Form.Label>Enter Game Code to Join</Form.Label>
                    <Form.Control type="text" placeholder="Enter Game Code" className = 'mb-4'/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={joinGame}>
                    Join Game!
                    </Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export {
    OffCanvas
}


