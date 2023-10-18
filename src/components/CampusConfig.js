// client/src/components/CampusConfig.js
import React, { useState, useEffect, useRef } from 'react';
import { apiURL } from "../constants";
import DBService from "../services/DBService";
import { ImageComponent } from './ImageComponent';

export function CampusConfig({ lobbyID }) {
    const [name, setName] = useState('');
    const [mapName, setMapName] = useState('');
    const [sendMsg, setSendMsg] = useState("");
    const mapRef = useRef();

    const dbService = new DBService(apiURL);

    // Fetch Campus data by lobbyID when the component mounts
    useEffect(() => {
        loadCampus();
    }, []);

    const loadCampus = async () => {
        var response = await dbService.getCampus(lobbyID);
        if (response.success){
            setName(response.campus.name);
            setMapName(response.campus.map);
        }else{
            setSendMsg(response.msg);
        }
    };

    const handleSubmit = async () => {
        // Call saveImg here
        const map = await mapRef.current.saveImage();

        // Save data to database
        var updateResponse = await dbService.updateCampus(lobbyID, name, map);
        if (!updateResponse.success){
            setSendMsg(updateResponse.msg);
        }

        setSendMsg("Updated successfully!");
    }

    return (
        <div className="container">
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <ImageComponent ref={mapRef} path={lobbyID + "/map"} imgName={mapName}></ImageComponent>
            <p className="sendMsg">{sendMsg} &#8203;</p>
            <button onClick={handleSubmit}>Save</button>
        </div>
    );
};
