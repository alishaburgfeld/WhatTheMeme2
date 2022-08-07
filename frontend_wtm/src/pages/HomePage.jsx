import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import {useEffect} from 'react'
import LoggedInMapper from '../components/LoggedInMapper';
import NoUserMapper from '../components/NoUserMapper';

function HomePage ({whoAmI, user}){

    useEffect(()=> {
        whoAmI()
    }, [])
    return (
        <Container class='home-page-container'>
            {user
            ?   <LoggedInMapper />
            :   <NoUserMapper />
            }
        </Container>

    )
}

export default HomePage