import React, { useState} from "react";
import ImageMapper from "react-image-mapper";
import homeImage from '../assets/Images/all_300.png'
import {joinGame } from '../AxiosCalls/GameAxiosCalls';
import {startGame} from './Hand'
import { useNavigate } from "react-router-dom";


function LoggedInMapper() {
    // https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh
    // https://www.npmjs.com/package/react-image-mapper

    const nav = useNavigate()
    const [mapAreas, setMapAreas] = useState({
        name: "my-map",
        areas: [
        //   { id: 1, shape: "rect", coords: [1, 186, 188, 280]},
        //join:
          { id: 1, shape: "rect", coords: [1, 186, 90, 240]},
          //start:
          { id: 2, shape: "rect", coords: [345, 186, 435, 240]},
        ]
      });
    
    function myFunction(area) {
      if (area === 1) {
        joinGame()
      }
      else {
        startGame()
      }
      nav("/game")
    }

    return (
        <ImageMapper
        src={homeImage}
        // onClick={myFunction}
        onClick={(area) => myFunction(area.id)}
        map={mapAreas}
        width={500}
      />
    )
    
}

export default LoggedInMapper