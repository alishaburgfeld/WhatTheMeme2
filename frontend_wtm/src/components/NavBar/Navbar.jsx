import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {useNavigate } from 'react-router-dom'
// use navigate needs to be inside the component that is in the router
import { leaveGame } from '../../AxiosCalls/GameAxiosCalls'
import Logout from './Logout'
import FriendRequests from './FriendRequests';
import FriendList from './FriendList';


function NavBar({user, whoAmI, gameUser}) {
  const nav= useNavigate()

  return (
    <>
      {user != null
      ?
      <div>
      {[false].map((expand) => (
        
        <Navbar key={expand} bg="light" expand={expand} className="mb-3" fixed="top">
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
                  >
                  <FriendList user = {user} />
                  </NavDropdown>
                  <NavDropdown
                    title="Friend Requests"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  > 
                  <FriendRequests user = {user}/>
                  </NavDropdown>
                  {gameUser
                  ? <Nav.Link><Button onClick={()=>{leaveGame(nav)}}>Leave Game</Button></Nav.Link>
                  : ""
                }
                <Nav.Link><Logout whoAmI={whoAmI}/></Nav.Link>
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