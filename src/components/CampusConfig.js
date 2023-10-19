// client/src/components/CampusConfig.js
import React, { useState, useEffect, useRef } from 'react';
import { apiURL } from "../constants";
import DBService from "../services/DBService";
import { POIContainer } from './POIContainer';

export function CampusConfig({ lobbyID }) {
    const [campusID, setCampusID] = useState('');
    const [name, setName] = useState('');
    const [sendMsg, setSendMsg] = useState("");

    const dbService = new DBService(apiURL);

    // Fetch Campus data by lobbyID when the component mounts
    useEffect(() => {
        loadCampus();
    }, []);

    const loadCampus = async () => {
        var response = await dbService.getCampus(lobbyID);
        if (response.success){
            setCampusID(response.campus.id);
            setName(response.campus.name);
        }else{
            setSendMsg(response.msg);
        }
    };

    const handleSubmit = async () => {
        // Save data to database
        var updateResponse = await dbService.updateCampus(lobbyID, name);
        if (!updateResponse.success){
            setSendMsg(updateResponse.msg);
        }

        setSendMsg("Updated successfully!");
    }

    return (
        <div id="configContainer">
            <div className="contentContainer">
                <div className='subContent'>
                    <div>Name</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <p className="sendMsg">{sendMsg} &#8203;</p>
                <button onClick={handleSubmit}>Save</button>
            </div>
            <POIContainer campusID={campusID} />
        </div>
        
    );
};
