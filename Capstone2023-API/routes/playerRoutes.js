// routes/playerRoutes.js
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

// Login route
router.get('/player/getPlayers', playerController.getPlayers);

module.exports = router;
