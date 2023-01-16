import * as React from "react";
import { useState, useEffect } from "react";

import { POIItem } from "./POIItem";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { ref as ref2, uploadBytes, listAll, deleteObject } from "firebase/storage"
import { storage } from "./constants";
import { Toast } from "./Utility";

export function POIList() {
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

        for (let i = 0; i < poiItems.length; i++) {
            if (poiItems[i].name != "" && poiItems[i].description != "" && poiItems[i].latitude != "" && poiItems[i].longitude != "") {
                // Save text data
                savePOI(i, poiItems[i].name, poiItems[i].description, poiItems[i].latitude, poiItems[i].longitude)

                if (poiItems[i].image == undefined) continue;

                // Delete previous images
                deleteFolder(poiItems[i].name);

                // Save image
                const imageRef = ref2(storage, poiItems[i].name + "/" + poiItems[i].image.name)
                uploadBytes(imageRef, poiItems[i].image)
            }
        }

        Toast("Saved", 3);
    }

    function handleItemChange(newItem) {
        if (newItem.id < poiItems.length) {
            let tempItems = [...poiItems]
            tempItems[newItem.id] = newItem
            setPoiItems(tempItems)
        } else
            setPoiItems([...poiItems, newItem])
    }

    var items = Array.from({ length: poiItems.length + 1 }, (_, i) => {
        if (i > poiItems.length - 1)
            return <POIItem key={i} id={i} onItemChange={handleItemChange} item={{ name: "", description: "", latitude: "", longitude: "", image: "" }} />
        else {
            //console.log(poiItems[i])
            return <POIItem key={i} id={i} onItemChange={handleItemChange} item={poiItems[i]} />
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
            <button className="POIBtn" type="submit">Save</button>
        </form>
    )
}

function savePOI(id, name, description, latitude, longitude) {
    const db = getDatabase();
    set(ref(db, 'POI/' + id), {
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude
    });
}

function deleteFolder(path) {
    const deleteRef = ref2(storage, path)
    listAll(deleteRef)
        .then(dir => {
            dir.items.forEach(fileRef => deleteFile(deleteRef.fullPath, fileRef.name));
        })
        .catch(error => console.log(error));
}

function deleteFile(pathToFile, fileName) {
    const deleteRef = ref2(storage, pathToFile + "/" + fileName);
    deleteObject(deleteRef)
}