import React, { useState, useEffect, useRef } from 'react';
import { apiURL } from "../constants";
import DBService from "../services/DBService";
import { ImageComponent } from './ImageComponent';

export function POIItem(props) {
    const [campusID, setCampusID] = useState('');
    const [poiID, setPOIID] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState('');
    const [imgName, setImgName] = useState('');
    const [mapName, setMapName] = useState('');
    const [sendMsg, setSendMsg] = useState("");
    
    const imgRef = useRef();
    const mapRef = useRef();

    const dbService = new DBService(apiURL);

    useEffect(() => {
        if (props.item != null){
            setPOIID(props.item.id)
            setCampusID(props.item.campusID)
            setName(props.item.name)
            setDescription(props.item.description)
            setOrder(props.item.order)
            setImgName(props.item.image)
            setMapName(props.item.map)
        }
    }, [props.item]);

    const handleSubmit = async () => {
        // Call saveImg here
        const img = await imgRef.current.saveImage();
        const map = await mapRef.current.saveImage();

        // Save data to database
        var updateResponse = await dbService.updatePOI(campusID, poiID, order, name, description, img, map);
        if (!updateResponse.success){
            setSendMsg(updateResponse.msg);
        }

        setSendMsg("Updated successfully!");
    }

    return(
        <div className="contentContainer">
            <div className='subContent'>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='subContent'>
                <label>Description</label>
                <textarea style={{height: '100px', resize: 'none' }} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='subContent'>
                <label>Order</label>
                <input type="text" value={order} onChange={(e) => setOrder(e.target.value)} />
            </div>
            <ImageComponent ref={imgRef} path={campusID + "/" + poiID + "/img"} imgName={imgName}></ImageComponent>
            <ImageComponent ref={mapRef} path={campusID + "/" + poiID + "/map"} imgName={mapName}></ImageComponent>
            <p className="sendMsg">{sendMsg} &#8203;</p>
            <button onClick={handleSubmit}>Save</button>
        </div>
    )
}