import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import {useEffect} from 'react'
import LoggedInMapper from '../components/HomePage/LoggedInMapper';
import NoUserMapper from '../components/HomePage/NoUserMapper';
import {OffCanvas} from '../components/HomePage/OffCanvas';

function HomePage ({whoAmI, user, hand, setHand, show, setShow, startGame, game, setGame}){

    useEffect(()=> {
        whoAmI()
    }, [])
    return (
        <Container class='home-page-container'>
            {user
            ?   <div>
                    {/* <h2>game: {game['code']}</h2> */}
                    <LoggedInMapper setShow={setShow} startGame={startGame} game={game}/>
                    <OffCanvas whoAmI= {whoAmI} hand = {hand} setHand={setHand} setShow={setShow} show={show} setGame={setGame}/>
                </div>
            :   <NoUserMapper />
            }
        </Container>

    )
}

export default HomePage