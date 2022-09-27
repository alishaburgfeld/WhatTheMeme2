
// import getCSRFToken from "../utils"
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'

function SignUpPage (){
    const nav= useNavigate()
    const submitSignUp = (event) => {
        event.preventDefault();
        // console.dir(event.target)
        axios.post('/signup', {
        'email': event.target[0].value,
        'password': event.target[1].value
        }).then((response) => {
            if (response.data.success==='False') {
                window.alert(response.data.reason)
            }
            else {    
                nav("/login");
            }
        })
    }

    return(
        <div>
            <h2 className='fs-lg mb-3'>Sign up!</h2>
            <Form onSubmit={submitSignUp}>
                <Form.Group className="mb-3" controlId="formEmail" >
                    <Form.Label className='fs-md'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" className='fs-sm'/>
                    <Form.Text className="text-muted fs-sm">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label className='fs-md'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" className='fs-sm'/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p className='fs-sm mt-4'><Link to='/login'>Log in Here!</Link></p>
        </div>
    )
}

export default SignUpPage