import React, { useState} from "react";
import ImageMapper from "react-image-mapper";
import homeImage from '../assets/Images/all_300.png'
// import {joinGame } from '../AxiosCalls/GameAxiosCalls';
import { useNavigate } from "react-router-dom";


function LoggedInMapper({setShow}) {
    // https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh
    // https://www.npmjs.com/package/react-image-mapper

    const nav = useNavigate()
    // const [gameUser, setGameUser] = useState(null)
    
    const [mapAreas, setMapAreas] = useState({
        name: "my-map",
        areas: [
        //   { id: 1, shape: "rect", coords: [1, 186, 188, 280]},
        //join:
          { id: 1, shape: "rect", coords: [0, 185, 91, 241]},
          //start:
          { id: 2, shape: "rect", coords: [345, 186, 435, 240]},
        ]
      });
    
    function myFunction(area) {
      if (area.coords == [0, 185, 91, 241]) {
        // set the coords 1 point off from the "not logged in mapper" so that it wouldn't open the offcanvas when I clicked it when not logged in
        setShow(true)
      }
      else if (area.id ===2){
        // if 
        nav("/game")
      }
      
    }

    return (
        <ImageMapper
        src={homeImage}
        // onClick={myFunction}
        onClick={(area) => myFunction(area)}
        map={mapAreas}
        width={500}
      />
    )
    
}

export default LoggedInMapper