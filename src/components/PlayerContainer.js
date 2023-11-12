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

    const loadPlayers = async () => {
        var response = await dbService.getPlayers(lobbyID);
        if (response.success) {
            setPlayers(response.players);
        } else {
            console.log(response.msg);
        }
    }

    var items = Array.from({ length: players.length }, (_, i) => {
        return <PlayerItem key={i} item={players[i]} />
    });

    return (
        <div className="contentContainer">
            <div className='subContent'>
                <label>Lobby Code</label>
                <label>{lobbyID}</label>
            </div>
            <div className='subContent' style={{maxHeight: "400px", overflowY: "scroll"}}>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <label>Player</label>
                            </th>
                            <th>
                                <label>Location</label>
                            </th>
                        </tr>
                        {items}
                    </tbody>
                </table>
            </div>
            <button onClick={loadPlayers}>Refresh</button>
        </div>
    );
};