import * as React from "react";
import { useState, useEffect } from "react";

import { POIItem } from "./POIItem";
import { getDatabase, ref, set, onValue } from "firebase/database";

export function POIList()
{
    const [poiItems, setPoiItems] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const poiRef = ref(db, 'POI');
            onValue(poiRef, (snapshot) => {
                if (snapshot.val() != null)
                    setPoiItems(snapshot.val())
        });
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        
        for (let i = 0; i < poiItems.length; i++){
            if (poiItems[i].name != "" && poiItems[i].description != "" && poiItems[i].latitude != "" && poiItems[i].longitude != "" 
            && poiItems[i].image != "" ){
                savePOI(i, poiItems[i].name, poiItems[i].description, poiItems[i].latitude, poiItems[i].longitude, poiItems[i].image)
            }
        }
    }

    function handleItemChange(newItem) {
        if (newItem.id < poiItems.length)
        {
            let tempItems = [...poiItems]
            tempItems[newItem.id] = newItem
            setPoiItems(tempItems)
        }else
            setPoiItems([...poiItems, newItem])
    }

    var items = Array.from({length: poiItems.length + 1}, (_, i) => {
        if (i > poiItems.length-1)
            return <POIItem key={i} id={i} onItemChange={handleItemChange} item={{name: "", description: "", latitude: "", longitude: "", image: ""}}/>
        else{
            //console.log(poiItems[i])
            return <POIItem key={i} id={i} onItemChange={handleItemChange} item={poiItems[i]}/>
        }
    });

    return (
        <form id="POIContainer" onSubmit={handleSubmit}>
            <table id="POIList">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Image</th>
                </tr>

                {items}
                </tbody>
            </table>

            <button id="POISave" type="submit">Save</button>
        </form>
        
    )
}

function savePOI(id, name, description, latitude, longitude, image){
    const db = getDatabase();
    set(ref(db, 'POI/' + id), {
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude,
        image: image
    });
}

