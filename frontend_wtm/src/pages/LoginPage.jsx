import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


function LoginPage ({setUser, whoAmI}){
    const nav= useNavigate()

    const submitLogIn = (event) => {
    event.preventDefault();
    console.log('submitted LOGIN: ' + event.target[0].value , event.target[1].value);
    // console.dir(event.target)
    axios.post('/login', {
    'email': event.target[0].value,
    'password': event.target[1].value
    }).then((response) => {
        console.log('YOU ARE IN THE REACT .THEN RESPONSE FROM LOGIN')
        console.log(response.data)
        // window.location.href= '/#/game'
        nav("/");

        // reload so that we can get the CSRF token
        //need to add a catch or an "if not successful"
        })
    }

    const submitLogOut = function(event) {
        console.log('REACT LOGOUT REQUEST')
        event.preventDefault()
        axios.post('/logout').then((response)=> {
            console.log(response)
          whoAmI()
          nav("/");
          // whoAmI will set the user to undefined after logout
          //need to set up some sort of "you are logged out message, eventually will redirect to login"
          //also need to handle error
        })
    }


    return (
        <div>
            <h2>Login Here!</h2>
            <Form onSubmit={submitLogIn}>
                <Form.Group className="mb-3" controlId="formEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p><Link to='/signup'>No account? Sign up here</Link></p>
            <Button onClick={submitLogOut}>Log Out!</Button>
            
        </div>
    )
}
// { user && <p>Welcome, {user.email}</p>}
// <button onClick = {submitSignupForm}> Sign up</button>
{/* <button onClick = {submitLogin}> Login</button>
            <button onClick = {submitLogOut}> Log out</button> */}

export default LoginPage

