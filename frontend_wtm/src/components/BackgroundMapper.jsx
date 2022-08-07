import React, { useState, useCallback, useEffect } from "react";
import ImageMapper from "react-image-mapper";
import homeImage from '../assets/Images/all_300.png'


function BackgroundMapper() {
    // https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh
    // https://www.npmjs.com/package/react-image-mapper
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
    
    const myFunction = ()=> {
        console.log("YAY ON CLICK WORKED")
    }

    return (
        <ImageMapper
        src={homeImage}
        onClick={myFunction}
        map={mapAreas}
        width={500}
      />
    )
    
}

export default BackgroundMapper