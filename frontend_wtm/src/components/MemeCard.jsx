import axios from 'axios'
import {useState, useEffect } from 'react'


function MemeCard({setRound, round}) {

    const [memes, setMemes] = useState([])
    
    const [isActive, setIsActive] = useState(true)
    

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
            setRound(responseRound)
            return response
        })
        .catch((error)=> {
            console.log(error)
        })
        
    }

  function flipMemeCard() {
    setIsActive(false)
    const card = document.getElementById(`meme${round}`)
    console.log('flip card activated')
  }

  useEffect(()=> {
    getMeme()
    }, [])

    return (
        <>
        <div>
            <div className = 'memecard'>
                <div className={isActive ?'thecard is-flipped' : 'thecard'} id={`${round}`} onClick={flipMemeCard}>
                    <div className ='face-up-meme' >{ memes && round && <img src={memes[round]} id="memeImage"/>}</div>
                    <div className ='face-down-meme'></div>
                </div>
            </div>
            {/* <Button onClick={getMeme}>Button </Button> */}
        </div>
            {/* { memes && round && <img src={memes[round]} />} */}
        </>
    )
}

export default MemeCard