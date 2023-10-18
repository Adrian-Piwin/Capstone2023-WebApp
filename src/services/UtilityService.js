class UtilityService{
    getImageData(image) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            const blob = new Blob([image]);
            reader.readAsArrayBuffer(blob);
            reader.onload = () => {
                const data = new Uint8Array(reader.result);
                resolve(data);
            };
            reader.onerror = reject;
        });
    }
}

export default UtilityService;