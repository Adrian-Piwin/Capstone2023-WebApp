// server/models/Campus.js
const mongoose = require('mongoose');

const campusSchema = new mongoose.Schema({
    lobbyID: String,
    name: String
});

module.exports = mongoose.model('Campus', campusSchema);
