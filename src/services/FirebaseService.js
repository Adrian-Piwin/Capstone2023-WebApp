import { ref as refS, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import UtilityService from "./UtilityService";

class FirebaseService {
    constructor(storage) {
        this.storage = storage;
        this.utilityService = new UtilityService();
    }

    async saveImage(path, image) {
        try {
            var imageRef = refS(this.storage, path)
            var data = await this.utilityService.getImageData(image)
            var response = await uploadBytes(imageRef, data, { contentType: 'image/png' })
            if (response.metadata != null)
                return { success: true }
            else
                return { success: false, msg: "Failed to save image" }
        } catch (error) {
            return { success: false, msg: error.message }
        }
    }

    async loadImage(path) {
        try{
            const imageRef = refS(this.storage, path);
            const url = await getDownloadURL(imageRef)
            if (url != null)
                return { success: true, url: url };
            else
                return { success: false, msg: "Failed to load image" };
        }catch(error){
            return { success: false, msg: error.message };
        }
    }

    async deleteFolder(path) {
        const deleteRef = refS(this.storage, path)
        listAll(deleteRef)
            .then(dir => {
                dir.items.forEach(fileRef => deleteFile(deleteRef.fullPath + "/" + fileRef.name));
            })
            .catch(error => console.log(error));
    }

    async deleteFile(path) {
        try{
            const deleteRef = refS(this.storage, path)
            deleteObject(deleteRef)
            return { success: true };
        }catch(error){
            return { success: false, msg: error.message };
        }
    }
}

export default FirebaseService;