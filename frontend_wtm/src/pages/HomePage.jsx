import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import {useEffect} from 'react'
import LoggedInMapper from '../components/LoggedInMapper';
import NoUserMapper from '../components/NoUserMapper';
import {OffCanvas} from '../components/OffCanvas';

function HomePage ({whoAmI, user, hand, setHand, show, setShow}){

    useEffect(()=> {
        whoAmI()
    }, [])
    return (
        <Container class='home-page-container'>
            {user
            ?   <div>
                    <LoggedInMapper setShow={setShow}/>
                    <OffCanvas whoAmI= {whoAmI} hand = {hand} setHand={setHand} setShow={setShow} show={show}/>
                </div>
            :   <NoUserMapper />
            }
        </Container>

    )
}

export default HomePage