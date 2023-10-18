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

    async updateCampus(lobbyID, name, map) {
        try {
            const response = await axios.post(this.connectionString + '/api/campus', {
                lobbyID,
                name,
                map
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
}

export default DBService;