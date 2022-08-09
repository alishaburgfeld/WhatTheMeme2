import {useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {leaveGame } from '../AxiosCalls/GameAxiosCalls'
import {Hand} from '../components/Hand'
import MemeCard from '../components/MemeCard'
import SelectedCards from '../components/SelectedCards'


// https://stackoverflow.com/questions/51199077/request-header-field-x-csrf-token-is-not-allowed-by-access-control-allow-headers
function GamePage ({user, whoAmI}){

    const [memes, setMemes] = useState(null)
    const [drawnCard, setDrawnCard] = useState(null)
    const [round, setRound] = useState(null)
    const [selectedCards, setSelectedCards] = useState([])
    
    // const [usedCards, setUsedCards] = useState(null)

    useEffect(()=> {
        whoAmI()
    }, [])

    async function fetchMemes(){
        // the CSRF token was blocking my API call, this is the fix
        let instance = axios.create()
        delete instance.defaults.headers.common["X-CSRFToken"];
        let response = await instance({
            method: 'get',
            url: 'https://api.imgflip.com/get_memes',
        });
        return response
    }
    //runs on mount
    useEffect(()=>{
        fetchMemes()
            .then((response)=>{
                setMemes(response.data.data.memes)
            })
    },[])

    function getSelectedCards() {
        console.log('IN GET CARDs')
        axios.get('/selectedcards/view')
        .then((response)=> {
          console.log('GET CARDS RESPONSE IN .THEN', response)
        })
        .catch((error)=> {
          console.log(error)
        })
    }
    useEffect(()=>{
        getSelectedCards()
        // need to set interval to do this every 5 seconds
    },[])

        // function consoletest() {
        //     console.log(memes[10])
        //     console.log(typeof(memes[10]))
        // }

    return (
        <div>
            <h2> Welcome {user}</h2>
            {/* I had to set it up like this because app.jsx was rendering these components before my use effect was called so memes wasn't showing up as having been set yet */}
            
            {/* {memes != null ? <img src={memes[10].url}></img> : ""} */}
            
            <div>
                <MemeCard setRound={setRound} round = {round}/>
            </div>
            <div>
                <Hand whoAmI={whoAmI} round={round}/>
            </div>    
            <Button onClick={leaveGame}>Leave Game</Button>
            {selectedCards && <SelectedCards selectedCards={selectedCards} />}
        </div>
    )
}

export default GamePage