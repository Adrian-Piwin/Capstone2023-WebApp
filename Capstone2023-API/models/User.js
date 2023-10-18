// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  lobbyID: String,
});

module.exports = mongoose.model('User', userSchema);
