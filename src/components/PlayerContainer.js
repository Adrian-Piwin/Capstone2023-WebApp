import React, { useState, useEffect, useRef } from 'react';
import { apiURL } from "../constants";
import DBService from "../services/DBService";
import { PlayerItem } from './PlayerItem';

export function PlayerContainer({ lobbyID, campusID }) {
    const [players, setPlayers] = useState([]);
    const [poiItems, setPoiItems] = useState([]);

    const dbService = new DBService(apiURL);

    useEffect(() => {
        if (lobbyID != null && lobbyID != ""){
            loadPlayers();
        }
    }, [lobbyID]);

    useEffect(() => {
        if (campusID != null && campusID != ""){
            loadPOIs();
        }
    }, [campusID]);

    const loadPlayers = async () => {
        var response = await dbService.getPlayers(lobbyID);
        if (response.success) {
            setPlayers(response.players);
        } else {
            console.log(response.msg);
        }
    }

    const loadPOIs = async () => {
        var response = await dbService.getPOIs(campusID);
        if (response.success) {
            setPoiItems(response.pois);
        } else {
            console.log(response.msg);
        }
    }

    var items = Array.from({ length: players.length }, (_, i) => {
        return <PlayerItem key={i} item={players[i]} poiRef={poiItems} />
    });

    return (
        <div className="contentContainer">
            <div className='subContent'>
                <label>Lobby Code</label>
                <label>{lobbyID}</label>
            </div>
            <div className='subContent'>
                <label>Players</label>
                <div id='playerSubContainer'>
                    {items}
                </div>
            </div>
        </div>
    );
};