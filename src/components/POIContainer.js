import React, { useState, useEffect, useRef } from 'react';
import { apiURL } from "../constants";
import DBService from "../services/DBService";
import { POIItem } from './POIItem';

export function POIContainer({ campusID }) {
    const [poiItems, setPoiItems] = useState([]);
    const dbService = new DBService(apiURL);

    useEffect(() => {
        if (campusID != null && campusID != "")
            loadPOIs();
    }, [campusID]);

    const loadPOIs = async () => {
        var response = await dbService.getPOIs(campusID);
        if (response.success) {
            setPoiItems(response.pois);
        } else {
            console.log(response.msg);
        }
    }

    const addPOI = () => {
        setPoiItems([...poiItems, { campusID: campusID, poiID: "", name: "", description: "", order: "", imgName: "", mapName: "" }])
    }

    var items = Array.from({ length: poiItems.length }, (_, i) => {
        return <POIItem key={i} item={poiItems[i]} />
    });

    return (
        <div id='poiContainer'>
            <button style={{maxWidth: "200px", marginLeft: "50%", transform: "translateX(-50%)"}} onClick={addPOI}>Add Location</button>
            <div id='poiSubContainer'>
                {items}
            </div>
        </div>
    );
};