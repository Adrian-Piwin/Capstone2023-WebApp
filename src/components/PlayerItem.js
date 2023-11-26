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
        if (status == 1){
            return "Start"
        }
        else {
            return status
        }
    }

    return(
        <tr>
            <td>
                <label>{name}</label>
            </td>
            <td>
                <label>{getStatus()}</label>
            </td>
        </tr>
    )
}