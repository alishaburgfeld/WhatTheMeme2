import {useState, useEffect} from 'react'
import axios from 'axios'

// https://stackoverflow.com/questions/51199077/request-header-field-x-csrf-token-is-not-allowed-by-access-control-allow-headers
function GamePage (){
    async function fetchMeme(){
        // the CSRF token was blocking my API call, this is the fix
        let instance = axios.create()
        delete instance.defaults.headers.common["X-CSRFToken"];
        let response = await instance({
            method: 'get',
            url: 'https://api.imgflip.com/get_memes',
        });
        // let response = await axios.get("https://api.imgflip.com/get_memes")
        return response
    }
    //runs on mount
    
    const [memes, setMemes] = useState([])
    
        useEffect(()=>{
            fetchMeme()
                .then((response)=>{
                    // console.log(response.data.data.memes)
                    setMemes(response.data.data.memes)
                    
                })
        },[])
    
        function consoletest() {
            console.log(memes[10])
            // console.log(memes[10].id)
            // console.log('memes', memes)
            // console.log(memes[10].url)
        }

    return (
        <div>
            <h2>Game Page</h2>
            <h3>{consoletest()}</h3>
            {/* <img src={memes[10]['url']}></img> */}
        </div>
    )
}

export default GamePage