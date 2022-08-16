import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import Card from './Card'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'



function Hand({whoAmI, round, hand, setHand, userSelected, setUserSelected}) {

    return (
        <Container>
            <Row>
                <h3 className='hand-title mb-3 mt-4'>Your hand</h3>
                {hand && hand.map((card) => (
                    <Card key = {card.id} {...card} setHand={setHand} hand={hand} round={round} userSelected={userSelected} setUserSelected= {setUserSelected}/>
                ))
                }
            </Row>
        </Container>
    )
}

export {
    Hand
}