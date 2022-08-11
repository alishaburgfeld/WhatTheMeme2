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


function NavBar({user, whoAmI, gameUser}) {
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
        
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 navbar" fixed="top">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  What the Me^^e?!
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown
                    title="Friends"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    // aria-haspopup="true"
                     
                  >
                    <FriendList user = {user} stopClick={stopClick}/>
                  </NavDropdown>
                  <NavDropdown
                    title="Friend Requests"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    // aria-haspopup="true"
                  > 
                    <FriendRequests user = {user} stopClick = {stopClick}/>
                  </NavDropdown>
                  {gameUser
                  ? <Nav.Item ><Button onClick={()=>{leaveGame(nav)}}>Leave Game</Button></Nav.Item>
                  : ""
                }
                <Nav.Item><Logout whoAmI={whoAmI} user={user}/></Nav.Item>
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