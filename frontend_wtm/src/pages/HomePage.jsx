import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from 'react'
import {joinGame } from '../AxiosCalls/GameAxiosCalls';
import {startGame} from '../components/Hand'

function HomePage ({whoAmI, user, setHand}){

    useEffect(()=> {
        whoAmI()
    }, [])

    // useEffect(()=> {
    //     let friendList = getFriendList(user)
    //     friendList.then((response)=>{
    //         console.log('.data.friends line 26' , response.data.friends)
    //         let newList = response.data.friends
    //         setFriends(newList)
    //     })
    //     // console.log('friend list newList', newList)
        
    // }, [])

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
                                <Link to={"/game"} onClick={()=>{startGame(setHand)}} >Start Game!</Link>
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