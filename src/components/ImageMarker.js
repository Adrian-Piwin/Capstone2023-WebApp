import React, { useState, useRef, useEffect } from 'react';

function ImageMarker({ onNewImage, closeThis }) {
    const [imageSrc, setImageSrc] = useState(null);
    const [markers, setMarkers] = useState([]);
    const imageRef = useRef(null);
    const markerLayerRef = useRef(null);

    const handleImageUpload = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => setImageSrc(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleImageClick = event => {
        if (markers.length >= 2) return; // Limit to 2 markers

        const rect = imageRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setMarkers(currentMarkers => [...currentMarkers, { x, y }]);
    };

    const clearMarkers = () => {
        setMarkers([]);
    };

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleGenerateImage = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            drawMarkers(ctx, 0);
            const newImageSrc = canvas.toDataURL('image/png');
            const newFile = dataURLtoFile(newImageSrc, 'marked-image.png');
            onNewImage(newFile);
        };
    };

    const drawMarkers = (ctx, yAdjustment) => 
    {
        markers.forEach((marker, index) => {
            // Markers
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(marker.x, marker.y + yAdjustment, 10, 0, 2 * Math.PI); // Bigger dot
            ctx.fill();

            // Preparing to draw text with background
            const text = index === 0 ? "You are here" : "Target location";
            const fontSize = 16;
            ctx.font = `${fontSize}px Arial`;
            const textWidth = ctx.measureText(text).width;
            const textHeight = fontSize * 1.2; // Approximate height of text

            // Draw black background rectangle for text
            ctx.fillStyle = 'black';
            ctx.fillRect(marker.x - 50 - 5, marker.y + yAdjustment - 20 - fontSize, textWidth + 10, textHeight);

            // Draw text over the rectangle
            ctx.fillStyle = 'white';
            ctx.fillText(text, marker.x - 50, marker.y + yAdjustment - 20);
        });
    }

    useEffect(() => {
        if (imageSrc && markerLayerRef.current && imageRef.current) {
            const canvas = markerLayerRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = imageRef.current.clientWidth;
            canvas.height = imageRef.current.clientHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawMarkers(ctx, 70);
        }
    }, [markers, imageSrc]);



    const btnStyle =
    {
        zIndex: 3
    }

    const btnBlock =
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: "25px"
    }

    const containerStyle = 
    {
        position: "fixed", 
        width: "80%", 
        minHeight: "80%", 
        top: "10%", 
        left: "10%", 
        backgroundColor: "#828282",
        display: 'flex',
        flexDirection: 'column',
        gap: "25px"
    }

    return (
        <div style={containerStyle}>
            <div style={{ position: 'relative', width: '100%' }}>
                <input type="file" onChange={handleImageUpload} />
                {imageSrc && (
                    <>
                        <img ref={imageRef} src={imageSrc} alt="Uploaded" onClick={handleImageClick} onLoad={() => setMarkers([])} style={{ display: 'block', maxWidth: '100%', height: 'auto', position: 'relative', zIndex: 1 }} />
                        <canvas ref={markerLayerRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 2 }}></canvas>
                    </>
                )}
            </div>

            <div style={btnBlock}>
                <button onClick={handleGenerateImage} style={btnStyle}>Generate Image with Markers</button>
                <button onClick={clearMarkers} style={btnStyle}>Clear Markers</button>
                <button onClick={closeThis} style={btnStyle}>Close</button>
            </div>
    </div>
    );
}

export default ImageMarker;