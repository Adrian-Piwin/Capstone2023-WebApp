// server/models/Campus.js
const mongoose = require('mongoose');

const campusSchema = new mongoose.Schema({
    lobbyID: String,
    name: String,
    map: Buffer, // Use Buffer for storing binary data like images
});

module.exports = mongoose.model('Campus', campusSchema);
