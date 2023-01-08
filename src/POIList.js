import * as React from "react";
import { useState } from "react";

import { POIItem } from "./POIItem";
import { getDatabase, ref, set } from "firebase/database";

export function POIList()
{
    const [poiItems, setPoiItems] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        
        for (let i = 0; i < poiItems.length; i++){
            if (poiItems[i].name != "" && poiItems[i].desc != "" && poiItems[i].lat != "" && poiItems[i].long != "" 
            && poiItems[i].img != "" ){
                savePOI(poiItems[i].id, poiItems[i].name, poiItems[i].desc, poiItems[i].lat, poiItems[i].long, poiItems[i].img)
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
            return <POIItem key={i} id={i} onItemChange={handleItemChange} item={{name: "", desc: "", lat: "", long: "", img: ""}}/>
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

function savePOI(id, name, desc, lat, long, img){
    const db = getDatabase();
    set(ref(db, 'POI/' + id), {
        name: name,
        desc: desc,
        lat: lat,
        long: long,
        img: img
    });
}