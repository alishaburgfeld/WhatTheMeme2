import React, { useState} from "react";
import ImageMapper from "react-image-mapper";
import { useNavigate } from "react-router-dom";
// import noUserImage from '.../assets/Images/home_login_signup.png'
import noUserImage from '/Users/alishahome/Documents/Software_Engineering/Code_Platoon/Assessments/Personal_Project/frontend_wtm/src/assets/Images/home_login_signup.png'



function NoUserMapper() {
    // https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh
    // https://www.npmjs.com/package/react-image-mapper

    const nav = useNavigate()
    const [mapAreas, setMapAreas] = useState({
        name: "my-map",
        areas: [
        //   { id: 1, shape: "rect", coords: [1, 186, 188, 280]},
        //login:
          { id: 1, shape: "rect", coords: [1, 186, 90, 240]},
          //sign-up:
          { id: 2, shape: "rect", coords: [345, 186, 435, 240]},
        ]
      });
    
    function myFunction(area) {
      if (area === 1) {
        nav("/login")
      }
      else {
        nav("/signup")
      }
    }

    return (
        <ImageMapper
        src={noUserImage}
        // onClick={myFunction}
        onClick={(area) => myFunction(area.id)}
        map={mapAreas}
        width={700}
      />
    )
    
}

export default NoUserMapper