
function SelectedCards() {

    function flipCard(id) {
        setIsActive(true)
        console.log(id)
        const card = document.getElementById(`${id}`)
        //for the card in the middle of the board being flipped up
        // card.classList.toggle('is-flipped')
        console.log('flip card activated')

    }

    return (
        // <Container>
        //     <Row>
        //         {hand && hand.map((card) => (
        //             <Card key = {card.id} {...card} setHand={setHand} hand={hand} round={round}/>
        //         ))
        //         }
        //     </Row>
        // </Container>
        // need them to be opposite as well
        <div>
            
        </div>
    )
}
const [isActive, setIsActive] = useState(false)


export default SelectedCards

