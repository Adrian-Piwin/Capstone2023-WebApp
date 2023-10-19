import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { storage } from "../constants";
import FirebaseService from "../services/FirebaseService";

export const ImageComponent = forwardRef((props, ref) => {
    const [imgFile, setImgFile] = useState('');
    const [imgURL, setImgURL] = useState('');

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

    return (
        <div>
            <img className='img' src={imgURL}></img>
            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
        </div>
    );
})