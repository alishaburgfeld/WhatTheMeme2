
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { Link} from 'react-router-dom'
import {submitLogOut, submitLogIn} from '../AxiosCalls/AxiosCalls'

function LoginPage ({setUser, user}){
    
    return (
        <div>
            <Form onSubmit={()=>{submitLogIn()}}>
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
            <Button onClick={()=>{submitLogOut(user,setUser)}}>Log Out!</Button>
            
        </div>
    )
}
// { user && <p>Welcome, {user.email}</p>}
// <button onClick = {submitSignupForm}> Sign up</button>
{/* <button onClick = {submitLogin}> Login</button>
            <button onClick = {submitLogOut}> Log out</button> */}

export default LoginPage

