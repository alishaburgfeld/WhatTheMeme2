import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomePage (){

    return (
        <Container>
            <Row>
                <Col>
                    <div>
                        <h1>What the Me^^e?!</h1>
                        <h2>
                            <Link to={"/login"} >Log in!</Link>
                        </h2>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

export default HomePage