import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { storage } from "../constants";
import FirebaseService from "../services/FirebaseService";
import ImageMarker from './ImageMarker';

export const ImageComponent = forwardRef((props, ref) => {
    const [imgFile, setImgFile] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [enableMapEditor, setEnableMapEditor] = useState(false);

    const firebaseService = new FirebaseService(storage);

    useImperativeHandle(ref, () => ({
        saveImage, deleteImage
    }));

    useEffect(() => {
        if (props.imgName != null && props.imgName != "")
            loadImg();
    }, [props.imgName]);

    const handleFileChange = async (event) => {
        // Handle file input change for the img
        var file = event.target.files[0];
        setImgFile(file);
        setImgURL(URL.createObjectURL(file))
    };

    const loadImg = async () => {
        var response = await firebaseService.loadImage(props.path + "/" + props.imgName);

        if (response.success){
            setImgURL(response.url);
        }else{
            console.log(response.msg);
        }
    };

    const saveImage = async () => {
        if (imgFile == null || imgFile == "")
            return props.imgName;

        // Delete img if it exists and its not the same name
        if (props.imgName != imgFile.name && props.imgName != "" && props.imgName != null)
            await firebaseService.deleteFile(props.path + "/" + props.imgName);

        // Save img to firebase, replace if its the same name
        var saveResponse = await firebaseService.saveImage(props.path + "/" + imgFile.name, imgFile);
        if (!saveResponse.success){
            return null;
        }

        return imgFile.name;
    }

    const deleteImage = async () => {
        if (props.imgName == null || props.imgName == "")
            return;

        await firebaseService.deleteFile(props.path + "/" + props.imgName);
    }

    const handleMapUpload = (file) => 
    {
        setImgFile(file);
        setImgURL(URL.createObjectURL(file))
        setEnableMapEditor(false)
    }

    return (
        <div>
            <img className='img' src={imgURL}></img>
            { props.type == "img" ? <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} /> : null}
            { props.type == "map" ? <button onClick={() => setEnableMapEditor(true)}>Upload Map</button> : null}
            { enableMapEditor ? <ImageMarker onNewImage={handleMapUpload} closeThis={() => setEnableMapEditor(false)} /> : null}
        </div>
    );
})