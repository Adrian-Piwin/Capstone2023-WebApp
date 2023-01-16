import * as React from "react";

export function POIItem(props) {

    function onItemUpdate(){
        let tempObj = {}
        tempObj.id = [props.id]
        tempObj.name = document.getElementsByClassName("itemName")[props.id].value
        tempObj.description = document.getElementsByClassName("itemDescription")[props.id].value
        tempObj.latitude = document.getElementsByClassName("itemLatitude")[props.id].value
        tempObj.longitude = document.getElementsByClassName("itemLongitude")[props.id].value
        tempObj.imageObject = document.getElementsByClassName("itemImage")[props.id].files[0]
        tempObj.imageName = tempObj.imageObject == null ? "" :  tempObj.imageObject.name;

        props.onItemChange(tempObj)
    }

    return(
        <tr className="itemContainer">
            <td>
                <input className="itemName" onChange={onItemUpdate} value={props.item.name}></input>
            </td>
            <td>
                <input className="itemDescription" onChange={onItemUpdate} value={props.item.description}></input>
            </td>
            <td>
                <input className="itemLatitude" onChange={onItemUpdate} value={props.item.latitude}></input>
            </td>
            <td>
                <input className="itemLongitude" onChange={onItemUpdate} value={props.item.longitude}></input>
            </td>
            <td>
                <div style={{color: "white"}}>{props.item.imageName}</div>
                <input className="itemImage" name="test" onChange={onItemUpdate} type="file" style={{color: "white"}}></input>
            </td>
        </tr>
    )
}