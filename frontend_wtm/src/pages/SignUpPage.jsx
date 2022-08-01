
// import getCSRFToken from "../utils"
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import {submitSignUp} from '../AxiosCalls/AxiosCalls'

function SignUpPage (){
  
    

    return(
        <div>
            <Form onSubmit={submitSignUp}>
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
            <p><Link to='/login'>Log in Here!</Link></p>
        </div>
    )
}

export default SignUpPage