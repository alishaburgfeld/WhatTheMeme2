import axios from 'axios'
import {useState, useEffect } from 'react'


function MemeCard({round, memeIsActive, setMemeIsActive}) {

    const [memes, setMemes] = useState([])
    
    //Gets a list of memes for the meme card
    const getMeme = async () => {
        const axiosResponse = await axios.get('/getmeme' )
        .then((response)=> {
            let memesArray= response.data.memes
            setMemes(memesArray)
        })
        .catch((error)=> {
            console.log(error)
        })
        
    }

    //flips the meme over
  function flipMemeCard() {
    setMemeIsActive(false)
    const card = document.getElementById(`meme${round}`)
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