import React, { useState, useEffect } from 'react';

export function PlayerItem(props) {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (props.item != null){
            setName(props.item.username)
            setStatus(props.item.status)
        }
    }, [props.item]);

    const getStatus = () => {
        console.log(props)
        if (status == null || status == ""){
            return "Ready"
        }else {
            return "Current Location Target: " + props.poiRef[status].name
        }
    }

    return(
        <div className='playerItem'>
            <label>{name}</label>
            <label>{getStatus()}</label>
        </div>
    )
}