import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from 'react'
import FriendAndLogout from '../components/FriendAndLogout'
import {joinGame } from '../AxiosCalls/GameAxiosCalls';
import {startGame} from '../components/Hand'

function HomePage ({whoAmI, user, setHand}){

    useEffect(()=> {
        whoAmI()
    }, [])
    console.log('line 12 homepage user', user)
    return (
        <Container>
            <Row>
                <Col>
                    <div>
                        <h1>What the Me^^e?!</h1>
                        <h2>
                            {user != null  || user != undefined 
                            ? <div>
                                <Link to={"/game"} onClick={joinGame}>Join Game!</Link>
                                <br></br>
                                <Link to={"/game"} onClick={()=>{startGame(setHand, whoAmI)}} >Start Game!</Link>
                                {/* <FriendAndLogout user={user} whoAmI = {whoAmI}/> */}
                                
                            </div>
                            : <Link to={"/login"} >Log in!</Link>}
                        </h2>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

export default HomePage