import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from 'react'

function HomePage ({whoAmI, user}){

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
                            {user != null  || user != undefined ? <Link to={"/game"} >Lets Play!</Link> : <Link to={"/login"} >Log in!</Link>}
                        </h2>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

export default HomePage