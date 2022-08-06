import React, { useState, useCallback, useEffect } from "react";
import ImageMapper from "react-image-mapper";


function Draft() {

    const [mapAreas, setMapAreas] = useState({
        name: "my-map",
        areas: [
          { id: 1, shape: "rect", coords: [170, 100, 10], preFillColor: "#fff" }
        ]
      });

    return (
        <ImageMapper
        src={`https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg?&q=${query}`}
        //onClick={area => getTipPosition(area)}
        onImageClick={handleUpdateMapArea}
        map={mapAreas}
        width={500}
      />
    )
}