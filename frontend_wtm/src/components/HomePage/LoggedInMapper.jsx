import React, { useState} from "react";
import ImageMapper from "react-image-mapper";
// import homeImage from '/Users/alishahome/Documents/Software_Engineering/Code_Platoon/Assessments/Personal_Project/frontend_wtm/src/assets/Images/all_300.png'
import homeImage from '../../assets/Images/all_300.png'
// import {joinGame } from '../AxiosCalls/GameAxiosCalls';
import { useNavigate } from "react-router-dom";


function LoggedInMapper({setShow, startGame, game}) {
    // DON'T DELETE THESE COMMENTS -- THIS SHOWS HOW TO IMPORT THE MAP REACTOR WITH OLDER DEPENDENCY
    // npm install react-image-mapper --legacy-peer-deps
    // https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh
    // https://www.npmjs.com/package/react-image-mapper

    const nav = useNavigate()
    // const [gameUser, setGameUser] = useState(null)
    
    const [mapAreas, setMapAreas] = useState({
        name: "my-map",
        areas: [
        //   { id: 1, shape: "rect", coords: [1, 186, 188, 280]},
        //join:
          { id: 3, shape: "rect", coords: [1, 255, 120, 345]},
          //start:
          { id: 4, shape: "rect", coords: [485, 255, 605, 345]},
        ]
      });
    
    async function MapperFunction(area) {
      console.log('AREA COORDS', area.coords)
      if (area.id===3) {
        console.log('IN AREA 1 IF STATEMENT')
        // set the coords 1 point off from the "not logged in mapper" so that it wouldn't open the offcanvas when I clicked it when not logged in
        setShow(true)
      }
      else if (area.id ===4){
        await startGame()
        console.log('GAME LINE 33', game)
        // if (game) {
          // console.log('GAME LINE 36', game)
          // nav("/game")
        // }
      }
      
    }

    return (
        <ImageMapper
        src={homeImage}
        // onClick={myFunction}
        onClick={(area) => MapperFunction(area).then((response)=> {
          if(area.id===4) {
            nav('/game')
          }
        })
        }
        map={mapAreas}
        width={700}
      />
    )
    
}

export default LoggedInMapper


// background image credit: <a href="https://www.freepik.com/vectors/emoji">Emoji vector created by rawpixel.com - www.freepik.com</a>