import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { storage } from "../constants";
import FirebaseService from "../services/FirebaseService";

export const ImageComponent = forwardRef((props, ref) => {
    const [imgFile, setImgFile] = useState('');
    const [imgURL, setImgURL] = useState('');

    const firebaseService = new FirebaseService(storage);

    useImperativeHandle(ref, () => ({
        saveImage
    }));

    useEffect(() => {
        if (props.imgName != null && props.imgName != "")
            loadImg();
    }, [props.imgName]);

    const loadImg = async () => {
        var response = await firebaseService.loadImage(props.path + "/" + props.imgName);

        if (response.success){
            setImgURL(response.url);
        }else{
            console.log(response.msg);
        }
    };

    const handleFileChange = async (event) => {
        // Handle file input change for the img
        var file = event.target.files[0];
        setImgFile(file);
        setImgURL(URL.createObjectURL(file))
    };

    const saveImage = async () => {
        if (imgFile == null || imgFile == "")
            return props.imgName;

        // Delete img if it exists
        if (props.imgName != imgFile.name && props.imgName != "" && props.imgName != null)
            await firebaseService.deleteFile(props.path + "/" + props.imgName);

        // Save img to firebase
        var saveResponse = await firebaseService.saveImage(props.path + "/" + imgFile.name, imgFile);
        if (!saveResponse.success){
            console.log(saveResponse.msg);
            return null;
        }

        return imgFile.name;
    }

    return (
        <div>
            <img className='img' src={imgURL}></img>
            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
        </div>
    );
})