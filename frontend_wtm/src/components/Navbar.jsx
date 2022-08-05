import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

// import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import { leaveGame } from '../AxiosCalls/GameAxiosCalls'
import {getFriendList, getFriendRequests, createFriendRequest, acceptFriendRequest, removeFriend, declineFriendRequest} from '../AxiosCalls/FriendAxiosCalls'
import { useEffect, useState } from 'react'
import Logout from './Logout'


function NavBar({user,whoAmI, gameUser}) {

  // const nav= useNavigate()


  const [friends, setFriends] = useState(undefined)
  const [friendRequests, setFriendRequests] = useState(undefined)

  useEffect(()=> {
      let friendList = getFriendList(user)
      friendList.then((response)=>{
          console.log('.data.friends line 26' , response.data.friends)
          let newList = response.data.friends
          setFriends(newList)
      })
      // console.log('friend list newList', newList)
      
  }, [])

    useEffect(()=> {
        // console.log('friend request page user')
        let friendrequests = getFriendRequests(user)
        friendrequests.then((response)=> {
            let newList=response.data.friend_requests
            setFriendRequests(newList)
        })
    }, [])

  // const submitLogOut = function(event) {
  //     // console.log('REACT LOGOUT REQUEST')
  //     event.preventDefault()
  //     axios.post('/logout').then((response)=> {
  //       whoAmI()
  //       nav("/");
  //     })
  // }


  return (
    <>
      {user != null
      ?
      <div>
      {[false].map((expand) => (
        
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
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
                    {friends != undefined
                    ?
                    <div>
                    {friends.map((friend) => (
                        <NavDropdown.Item>{friend}<Button onClick={()=>{removeFriend(user,friend)}}>Delete</Button></NavDropdown.Item>
                        ))
                    }
                    </div>
                    : <NavDropdown.Item>"Please add a friend"</NavDropdown.Item>
                    }
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Form onSubmit={createFriendRequest}>
                          <Form.Group className="mb-3" controlId="formEmail" >
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" />
                          <Button  variant="primary" type="submit">Add Friend </Button>
                          </Form.Group>
                      </Form>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Friend Requests"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  > 
                    {friendRequests != undefined
                    ? 
                      <div>
                      {friendRequests.map((friendRequest) => (
                          <NavDropdown.Item>{friendRequest}<Button onClick={()=>{acceptFriendRequest(user,friendRequest)}}>Accept</Button><Button onClick={()=>{declineFriendRequest(user,friendRequest)}}>Decline </Button></NavDropdown.Item>
                          ))
                      }
                      </div>
                    : <NavDropdown.Item>No pending requests</NavDropdown.Item>
                    }
                  </NavDropdown>
                  {gameUser != null
                  ? <Nav.Link><Button onClick={leaveGame}>Leave Game</Button></Nav.Link>
                  : ""
                }
                <Nav.Link><Logout /></Nav.Link>
                {/* <Nav.Link><Button onClick={submitLogOut}>Log Out</Button></Nav.Link> */}
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