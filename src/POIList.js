import * as React from "react";
import { useState, useEffect } from "react";

import { POIItem } from "./POIItem";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { ref as refS, uploadBytes, listAll, deleteObject } from "firebase/storage"
import { storage } from "./constants";
import { Toast } from "./Utility";

export function POIList() {
    const [poiItems, setPoiItems] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const poiRef = ref(db, 'POI');
        onValue(poiRef, (snapshot) => {
            if (snapshot.val() != null) {
                setPoiItems(snapshot.val())
            }
        });
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        for (let i = 0; i < poiItems.length; i++) {
            if (poiItems[i].name != "" && poiItems[i].description != "" && poiItems[i].latitude != "" && poiItems[i].longitude != "" && poiItems[i].imageObject != null) {
                // Save text data
                savePOI(i, poiItems[i].name, poiItems[i].description, poiItems[i].latitude, poiItems[i].longitude, poiItems[i].imageName)

                // Delete previous images
                deleteFolder(poiItems[i].name, poiItems[i].imageName);

                // Save image
                saveImage(poiItems[i].name, poiItems[i].imageName, poiItems[i].imageObject)
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
            return <POIItem key={i} id={i} onItemChange={handleItemChange} item={{ name: "", description: "", latitude: "", longitude: "", imageObject: null, imageName: "" }} />
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

async function saveImage(name, imageName, image) {
    var imageRef = refS(storage, name + "/" + imageName)
    var data = await getImageData(image)
    uploadBytes(imageRef, data, { contentType: 'image/png' }).then((snapshot) => {
        console.log('Uploaded!');
    }).catch((error) => {
        console.log(error);
    });
}

function getImageData(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const blob = new Blob([image]);
        reader.readAsArrayBuffer(blob);
        reader.onload = () => {
            const data = new Uint8Array(reader.result);
            resolve(data);
        };
        reader.onerror = reject;
    });
}


function savePOI(id, name, description, latitude, longitude, imageName) {
    const db = getDatabase();
    set(ref(db, 'POI/' + id), {
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude,
        imageName: imageName
    });
}

function deleteFolder(path, dontDelete) {
    const deleteRef = refS(storage, path)
    listAll(deleteRef)
        .then(dir => {
            dir.items.forEach(fileRef => deleteFile(deleteRef.fullPath, fileRef.name, dontDelete));
        })
        .catch(error => console.log(error));
}

function deleteFile(pathToFile, fileName, dontDelete) {
    if (fileName == dontDelete) return;
    const deleteRef = refS(storage, pathToFile + "/" + fileName);
    deleteObject(deleteRef)
    console.log("deleteing " + pathToFile + "/" + fileName);
}