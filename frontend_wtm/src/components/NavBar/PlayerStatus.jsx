import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"

function PlayerStatus({players, playersThatVoted, selectedCards}) {
    return (
        <Container>
            <Row>
                <div>
                    {players && players.map((card) => (
                        // bootstrap table
                        <h2> </h2>
                    ))
                    }
                </div>
            </Row>
        </Container>
    )
}

export default PlayerStatus