import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import Card from './Card'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'



function Hand({whoAmI, round, hand, setHand}) {

    return (
        <Container>
            <Row>
                {hand && hand.map((card) => (
                    <Card key = {card.id} {...card} setHand={setHand} hand={hand} round={round}/>
                ))
                }
            </Row>
        </Container>
    )
}

export {
    Hand
}