import * as React from "react";
import { useState } from "react";

export function POIItem(props) {

    function onItemUpdate(){
        let tempObj = {}
        tempObj.id = [props.id]
        tempObj.name = document.getElementsByClassName("itemName")[props.id].value
        tempObj.desc = document.getElementsByClassName("itemDesc")[props.id].value
        tempObj.lat = document.getElementsByClassName("itemLat")[props.id].value
        tempObj.long = document.getElementsByClassName("itemLong")[props.id].value
        tempObj.img = document.getElementsByClassName("itemImg")[props.id].value

        props.onItemChange(tempObj)
    }

    return(
        <tr className="itemContainer">
            <td>
                <input className="itemName" onChange={onItemUpdate} value={props.item.name}></input>
            </td>
            <td>
                <input className="itemDesc" onChange={onItemUpdate} value={props.item.desc}></input>
            </td>
            <td>
                <input className="itemLat" onChange={onItemUpdate} value={props.item.lat}></input>
            </td>
            <td>
                <input className="itemLong" onChange={onItemUpdate} value={props.item.long}></input>
            </td>
            <td>
                <input className="itemImg" onChange={onItemUpdate} value={props.item.img}></input>
            </td>
        </tr>
    )
}