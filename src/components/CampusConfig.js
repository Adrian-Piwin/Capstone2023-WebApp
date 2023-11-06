// client/src/components/CampusConfig.js
import React, { useState, useEffect, useRef } from 'react';
import { apiURL } from "../constants";
import DBService from "../services/DBService";
import { POIContainer } from './POIContainer';
import { PlayerContainer } from './PlayerContainer';

export function CampusConfig({ lobbyID }) {
    const [campusID, setCampusID] = useState('');
    const [name, setName] = useState('');
    const [gameToggled, setGameToggled] = useState('');
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
            setGameToggled(response.campus.gameStarted);
        }else{
            setSendMsg(response.msg);
        }
    };

    const handleToggleGame = async () => {
        // Save data to database
        var updateResponse = await dbService.toggleGame(lobbyID, gameToggled == 1 ? '0' : '1');
        if (!updateResponse.success){
            setSendMsg(updateResponse.msg);
        }
        setGameToggled(!gameToggled)
        setSendMsg(!gameToggled ? "Game Started!" : "Game Stopped!");
    }

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
            <div id="configSubContainer">
                <div className="contentContainer">
                    <div className='subContent'>
                        <label>Campus Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <p className="sendMsg">{sendMsg} &#8203;</p>
                    <button onClick={handleToggleGame}>{!gameToggled ? "Start" : "End"} Game</button>
                    <button onClick={handleSubmit}>Save</button>
                </div>
                <PlayerContainer lobbyID={lobbyID} campusID={campusID} />
            </div>
            <POIContainer campusID={campusID} />
        </div>
        
    );
};
