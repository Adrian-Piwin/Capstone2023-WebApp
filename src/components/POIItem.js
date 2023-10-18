import * as React from "react";

export function POIItem(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imgName, setImgName] = useState('');

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
        <div className="container">
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <input style={{height: '100px'}} type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <ImageComponent ref={childRef} path={lobbyID + "/map"} imgName={mapName}></ImageComponent>
            <p className="sendMsg">{sendMsg} &#8203;</p>
            <button onClick={handleSubmit}>Save</button>
        </div>
    )
}