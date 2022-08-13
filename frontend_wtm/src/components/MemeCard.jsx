import axios from 'axios'
import {useState, useEffect } from 'react'


function MemeCard({setRound, round, memeIsActive, setMemeIsActive}) {

    const [memes, setMemes] = useState([])
    
    
    

    const getMeme = async () => {
        console.log('I AM IN GET MEME react')
        const axiosResponse = await axios.get('/getmeme' )
        .then((response)=> {
            let memesArray= response.data.memes
            // let responseRound= response.data.round
            setMemes(memesArray)
            // for some reason the first response isn't valid
            // setRound(responseRound)
        })
        .catch((error)=> {
            console.log(error)
        })
        
    }

  function flipMemeCard() {
    setMemeIsActive(false)
    const card = document.getElementById(`meme${round}`)
    console.log('flip card activated')
  }

  useEffect(()=> {
    getMeme()
    }, [])

    return (
        <>
            <div className = 'memecard'>
                <div className={memeIsActive ?'thecard is-flipped' : 'thecard'} id={`${round}`} onClick={flipMemeCard}>
                    <div className ='face-up-meme' >{ memes && round && <img src={memes[round]} id="memeImage"/>}</div>
                    <div className ='face-down-meme'></div>
                </div>
            </div>
        </>
    )
}

export default MemeCard