import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {useState } from 'react'


function Draft() {

    const [memes, setMemes] = useState([])
    const [round, setRound] = useState(null)


    const getMeme = async () => {
        console.log('I AM IN GET MEME react')
        const axiosResponse = await axios.get('/getmeme' )
        .then((response)=> {
            console.log('GETMEME .then response', response)
            let memesArray= response.data.memes
            let responseRound= response.data.round
            console.log('responseRound',responseRound, 'type', typeof(responseRound))
            setMemes(memesArray)
            // for some reason the first response isn't valid
            setRound(responseRound +1)
            return response
        })
        .catch((error)=> {
            console.log(error)
        })
        
    }

    


    return (
        <>
            <Button onClick={getMeme}>Button </Button>
            { memes && round && <img src={memes[round]} />}
        </>
    )
}

export default Draft