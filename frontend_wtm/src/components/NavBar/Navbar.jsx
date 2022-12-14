import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
// use navigate needs to be inside the component that is in the router
import { leaveGame } from '../../AxiosCalls/GameAxiosCalls'
import Logout from './Logout'
import FriendRequests from './FriendRequests';
import FriendList from './FriendList';


function NavBar({user, whoAmI, gameUser, setHand, game}) {
  const nav= useNavigate()
  // const [expanded, setExpanded] = useState(true)

  // https://stackoverflow.com/questions/40580788/dropdown-menu-closes-when-i-click-it-anywhere
  
  // const stopClick= function (e) {
  //   document.getElementsByClassName('dropdown').on('click',function(e) {
  //   e.stopPropagation();
  // })
  // }

  const stopClick= function (e) {
    e.stopPropagation()
  }


  return (
    <>
      {user != null
      ?
      <div>
      {[false].map((expand) => (
        
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 navbar friend-off-canvas" fixed="top">
          <Container fluid className='friend-off-canvas'>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className='friend-off-canvas'
            >
              <Offcanvas.Header className='off-nav-header' closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className='off-canvas-title'>
                  What the Meme?!
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className= 'friend-off-canvas'>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown
                    title="Friends"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    // aria-haspopup="true"
                    className='friend-title mb-5' 
                  >
                    <FriendList user = {user} game={game} stopClick={stopClick}/>
                  </NavDropdown>
                  <NavDropdown
                    title="Friend Requests"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className='friendrequest-title mb-5'
                  > 
                    <FriendRequests user = {user} stopClick = {stopClick}/>
                  </NavDropdown>
                  {gameUser
                  ? <Nav.Item ><Button className = 'mb-5' onClick={()=>leaveGame().then((response)=> {
                    console.log('LEAVEgame response', response)
                    nav('/')
                  })}>Leave Game</Button></Nav.Item>
                  : ""
                }
                <Nav.Item><Logout whoAmI={whoAmI} user={user} setHand={setHand}/></Nav.Item>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        
      ))}
      </div>
      : ""
      }
    </>
  );
}

export default NavBar;