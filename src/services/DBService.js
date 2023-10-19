import axios from "axios";

class DBService {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    async login(username, password) {
        try {
            const response = await axios.post(this.connectionString + '/api/login', {
                username,
                password,
            });

            if (response.data.success) {
                return { success: true, lobbyID: response.data.result.lobbyID }
            } else {
                return { success: false, msg: "Incorrect Login" }
            }
        } catch (error) {
            return { success: false, msg: "Failed to connect to server" }
        }
    };

    async getCampus(lobbyID) {
        try {
            const response = await axios.get(this.connectionString + `/api/campus?lobbyID=${lobbyID}`);
            if (response.data.success) {
                return { success: true, campus: response.data.result }
            }else{
                return { success: false, msg: "Failed to get campus" }
            }
        } catch (error) {
            return { success: false, msg: "Failed to connect to server" }
        }
    };

    async updateCampus(lobbyID, name) {
        try {
            const response = await axios.post(this.connectionString + '/api/campus', {
                lobbyID,
                name
            });

            if (response.data.success) {
                return { success: true }
            }else{
                return { success: false, msg: "Failed to update campus" }
            }
        } catch (error) {
            return { success: false, msg: "Failed to connect to server" }
        }
    }

    async getPOIs(campusID) {
        try {
            const response = await axios.get(this.connectionString + `/api/poi/getAllPOI?campusID=${campusID}`);
            if (response.data.success) {
                return { success: true, pois: response.data.result }
            }else{
                return { success: false, msg: "Failed to get POIs" }
            }
        } catch (error) {
            return { success: false, msg: "Failed to connect to server" }
        }
    };

    async updatePOI(campusID, poiID, order, name, description, image, map) {
        try {
            const response = await axios.post(this.connectionString + '/api/poi', {
                campusID,
                poiID,
                order,
                name,
                description,
                image,
                map
            });

            if (response.data.success) {
                return { success: true }
            }else{
                return { success: false, msg: "Failed to update POI" }
            }
        } catch (error) {
            return { success: false, msg: "Failed to connect to server" }
        }
    }

    async deletePOI(poiID) {
        try {
            const response = await axios.delete(this.connectionString + `/api/poi?poiID=${poiID}`);

            if (response.data.success) {
                return { success: true }
            }else{
                return { success: false, msg: "Failed to delete POI" }
            }
        } catch (error) {
            return { success: false, msg: "Failed to connect to server" }
        }
    }
}

export default DBService;